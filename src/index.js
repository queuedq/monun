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

let dragging = false;
let prevCursor = undefined;

rootElement.addEventListener('mousedown', event => {
	event.preventDefault();
	dragging = true;
	prevCursor = getCursorPosition(event);
	onMouseMove(event);
});

rootElement.addEventListener('contextmenu', event => event.preventDefault());
rootElement.addEventListener('mousemove', onMouseMove);
rootElement.addEventListener('mouseup', () => { dragging = false; });

function pan(cursor) {
	objects.camera.pan({
		x: cursor.x - prevCursor.x,
		y: cursor.y - prevCursor.y,
	});
}

function getInnerCoordinate(cursor) {
	const pos = objects.camera.toInnerCoordinate(cursor);
	return {
		x: Math.round(pos.x / objects.tileMap.size),
		y: Math.round(pos.y / objects.tileMap.size),
	};
}

function draw(cursor) {
	objects.tileMap.draw(getInnerCoordinate(cursor));
}

function erase(cursor) {
	objects.tileMap.erase(getInnerCoordinate(cursor));
}

function onMouseMove(event) {
	if (!dragging) return;
	const cursor = getCursorPosition(event);
	console.log(event);
	console.log(cursor);
	
	if (event.metaKey) {
		pan(cursor);
	} else if (event.buttons == 1) {
		draw(cursor);
	} else if (event.buttons == 2) {
		erase(cursor);
	}

	prevCursor = cursor;
}
