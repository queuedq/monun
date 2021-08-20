import Two from 'two.js';
import TileMap from './TileMap';

const rootElement = document.getElementById('root');
const two = new Two({ autostart: true, fullscreen: true }).appendTo(rootElement);
const objects = {};

init();
two.bind("update", update);


function init() {
	objects.scene = two.makeGroup();
	objects.scene.translation.set(two.width / 2, two.height / 2);
	objects.tileMap = new TileMap(objects.scene, 50);
	objects.tileMap.draw({x:0, y:0});
	objects.tileMap.draw({x:0, y:1});
	objects.tileMap.draw({x:1, y:1});
}

function update() {

}

function getCursorPosition(event) {
	const rect = rootElement.getBoundingClientRect(); 
	const x = event.clientX - (rect.left);
	const y = event.clientY - (rect.top);
	return {x, y};
}

rootElement.addEventListener('wheel', event => {
	event.preventDefault();

	const scale = objects.scene.scale;
	let newScale = scale + event.deltaY * -0.01;
	newScale = Math.min(newScale, 10);
	newScale = Math.max(newScale, 0.25);
	
	const ds = (newScale - scale) / scale;
	const cursor = getCursorPosition(event);
	
	objects.scene.scale = newScale;
	objects.scene.translation.x -= (cursor.x - objects.scene.translation.x) * ds;
	objects.scene.translation.y -= (cursor.y - objects.scene.translation.y) * ds;
}, { passive: false });

rootElement.addEventListener('mousedown', event => {
	event.preventDefault();
	const startCursor = getCursorPosition(event);
	const startTranslation = objects.scene.translation.clone();

	function update(event) {
		const cursor = getCursorPosition(event);
		objects.scene.translation.x = startTranslation.x + cursor.x - startCursor.x;
		objects.scene.translation.y = startTranslation.y + cursor.y - startCursor.y;
	}

	rootElement.addEventListener('mousemove', update);
	
	rootElement.addEventListener('mouseup', () => {
		rootElement.removeEventListener('mousemove', update);
	}, { once: true });
});

