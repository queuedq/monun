import { pan, zoom } from './tools/move';
import { draw, erase } from './tools/tile';

export const addMouseEvents = ({ element, scene, tools }) => {
  let dragging = false; // TODO: proper dragging state handling
  let prevCursor = undefined;

  function getCursorPos(event) {
    const rect = element.getBoundingClientRect(); 
    const x = event.clientX - (rect.left);
    const y = event.clientY - (rect.top);
    return {x, y};
  }

  function dragTools({ scene, event, cursor }) {
    const tool = tools.selectedTool;
    if (tool == 'MOVE') {
      pan({ scene, cursor, prevCursor });
    } else if (tool == 'TILE_DRAW') {
      draw({ scene, cursor, tile: tools.selectedTile });
    } else if (tool == 'TILE_ERASE') {
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
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', () => { dragging = false; });
	element.addEventListener('wheel', onWheel, { passive: false });
  element.addEventListener('contextmenu', event => event.preventDefault());
}
