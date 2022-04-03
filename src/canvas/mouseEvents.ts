import ToolStore from '../stores/ToolStore';
import Scene from './Scene';
import { pan, zoom } from './tools/move';
import { draw, erase } from './tools/tile';
import { Vec2 } from './types';

export const addMouseEvents = ({ element, scene, tools }: {
  element: Element,
  scene: Scene,
  tools: ToolStore,
}) => {
  let dragging = false; // TODO: proper dragging state handling
  let prevCursor = undefined;

  function getCursorPos(event): Vec2 {
    const rect = element.getBoundingClientRect(); 
    const x = event.clientX - (rect.left);
    const y = event.clientY - (rect.top);
    return new Vec2(x, y);
  }

  function dragTools({ scene, event, cursor }) {
    const tool = tools.currentTool;
    if (tool == 'MOVE') {
      pan(scene, cursor, prevCursor);
    } else if (tool == 'TILE_DRAW') {
      if (event.buttons === 1) {
        draw({ scene, cursor, tile: tools.selectedTile });
      } else if (event.buttons === 2) {
        erase({ scene, cursor });
      }
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
    zoom(scene, event.deltaY * -0.003, getCursorPos(event));
  }

  element.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', () => { dragging = false; });
	element.addEventListener('wheel', onWheel, { passive: false });
  element.addEventListener('contextmenu', event => event.preventDefault());
}
