import TileStore from '../stores/TileStore';
import ToolStore from '../stores/ToolStore';
import Scene from './Scene';
import { pan, zoom } from './tools/move';
import { draw, erase } from './tools/tile';
import { Vec2 } from './types';

export const addMouseEvents = ({ element, scene, tools, tiles }: {
  element: HTMLElement,
  scene: Scene,
  tools: ToolStore,
  tiles: TileStore,
}) => {
  let dragging = false; // TODO: proper dragging state handling
  let prevCursor = new Vec2(0, 0);

  function getCursorPos(event: MouseEvent): Vec2 {
    const rect = element.getBoundingClientRect(); 
    const x = event.clientX - (rect.left);
    const y = event.clientY - (rect.top);
    return new Vec2(x, y);
  }

  function dragTools(scene: Scene, event: MouseEvent, cursor: Vec2) {
    const tool = tools.currentTool;
    if (tool == 'MOVE') {
      pan(scene, cursor, prevCursor);
    } else if (tool == 'TILE_DRAW') {
      if (event.buttons === 1) {
        draw(scene, cursor, tiles.getTile(tools.selectedTile));
      } else if (event.buttons === 2) {
        erase(scene, cursor);
      }
    } else if (tool == 'TILE_ERASE') {
      erase(scene, cursor);
    }
  }

  function onMouseDown(event: MouseEvent) {
    event.preventDefault();
    dragging = true;
    prevCursor = getCursorPos(event);
    dragTools(scene, event, prevCursor);
  }

  function onMouseMove(event: MouseEvent) {
    event.preventDefault();
    if (!dragging) return;
    const cursor = getCursorPos(event);
    dragTools(scene, event, cursor);
    prevCursor = cursor;
  };

  function onWheel(event: WheelEvent) {
    event.preventDefault();
    zoom(scene, event.deltaY * -0.003, getCursorPos(event));
  }

  element.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', () => { dragging = false; });
	element.addEventListener('wheel', onWheel, { passive: false });
  element.addEventListener('contextmenu', event => event.preventDefault());
}
