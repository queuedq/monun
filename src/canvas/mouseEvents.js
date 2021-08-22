import { pan, zoom } from "./tools/move";
import { draw, erase } from "./tools/tile";

export const addMouseEvents = ({ element, scene }) => {
  let dragging = false; // TODO: proper dragging state handling
  let prevCursor = undefined;

  function getCursorPos(event) {
    const rect = element.getBoundingClientRect(); 
    const x = event.clientX - (rect.left);
    const y = event.clientY - (rect.top);
    return {x, y};
  }

  function dragTools({ event, cursor }) {
    if (event.metaKey) {
      pan({ scene, cursor, prevCursor });
    } else if (event.buttons == 1) {
      draw({ scene, cursor });
    } else if (event.buttons == 2) {
      erase({ scene, cursor });
    }
  }

  function onMouseDown(event) {
    event.preventDefault();
    dragging = true;
    prevCursor = getCursorPos(event);
    dragTools({ scene, event, cursor: prevCursor });
  }

  function onMouseMove(event) {
    event.preventDefault();
    if (!dragging) return;
    const cursor = getCursorPos(event);
    dragTools({ scene, event, cursor });
    prevCursor = cursor;
  };

  function onWheel(event) {
    event.preventDefault();
    zoom({
      scene,
      delta: event.deltaY * -0.01,
      cursor: getCursorPos(event),
    });
  }

  element.addEventListener('mousedown', onMouseDown);
  element.addEventListener('mousemove', onMouseMove);
  element.addEventListener('mouseup', () => { dragging = false; });
	element.addEventListener('wheel', onWheel, { passive: false });
  element.addEventListener('contextmenu', event => event.preventDefault());
}
