import Two from 'two.js'

const rootElement = document.getElementById('root');
const two = new Two({ autostart: true, fullscreen: true }).appendTo(rootElement);
const objects = {};

init();
two.bind("update", update);


function init() {
	two.scene.translation.set(two.width / 2, two.height / 2);

	objects.scene = two.makeGroup();
	objects.rect = two.makeRectangle(0, 0, 50, 50).addTo(objects.scene);

	two.bind('resize', () => two.scene.translation.set(two.width / 2, two.height / 2));
}

function update() {
	objects.rect.rotation += 0.01;
}

function getCursorPosition(event) {
	const rect = rootElement.getBoundingClientRect(); 
	const x = event.clientX - (rect.left + two.width / 2);
	const y = event.clientY - (rect.top + two.height / 2);
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

