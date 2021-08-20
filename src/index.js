import Two from 'two.js';
import TileMap from './TileMap';
import Camera from './Camera';

const rootElement = document.getElementById('root');
const two = new Two({ autostart: true, fullscreen: true }).appendTo(rootElement);
const objects = {};

init();
two.bind("update", update);


function init() {
	objects.scene = two.makeGroup();
	objects.scene.translation.set(two.width / 2, two.height / 2);
	objects.camera = new Camera(objects.scene);

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
	objects.camera.zoom(
		event.deltaY * -0.01,
		getCursorPosition(event)
	);
}, { passive: false });

rootElement.addEventListener('mousedown', event => {
	event.preventDefault();
	let prevCursor = getCursorPosition(event);

	function update(event) {
		const cursor = getCursorPosition(event);
		objects.camera.pan({
			x: cursor.x - prevCursor.x,
			y: cursor.y - prevCursor.y,
		});
		prevCursor = cursor;
	}

	rootElement.addEventListener('mousemove', update);
	
	rootElement.addEventListener('mouseup', () => {
		rootElement.removeEventListener('mousemove', update);
	}, { once: true });
});

