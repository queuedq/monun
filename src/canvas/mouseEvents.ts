import TileStore from '../stores/TileStore';
import ToolStore from '../stores/ToolStore';
import Scene from './Scene';
import { Vec2 } from './types';

export const addMouseEvents = ({ canvasElement, scene, tools, tiles }: {
  canvasElement: HTMLElement,
  scene: Scene,
  tools: ToolStore,
  tiles: TileStore,
}) => {
  let dragging = false; // TODO: proper dragging state handling
  let prevCursor = new Vec2(0, 0);

  function getCursorPos(event: MouseEvent): Vec2 {
    const rect = canvasElement.getBoundingClientRect(); 
    const x = event.clientX - (rect.left);
    const y = event.clientY - (rect.top);
    return new Vec2(x, y);
  }

  function dragTools(scene: Scene, event: MouseEvent, cursor: Vec2) {
    const tool = tools.currentTool;
    if (tool == 'MOVE') {
      scene.pan(cursor, prevCursor);
    } else if (tool == 'TILE_DRAW') {
      if (event.buttons === 1) {
        scene.draw(cursor, tiles.getTile(tools.selectedTile));
      } else if (event.buttons === 2) {
        scene.erase(cursor);
      }
    } else if (tool == 'TILE_ERASE') {
      scene.erase(cursor);
    }
  }

  function updateHover(event: MouseEvent, cursor: Vec2) {
    const { selection } = scene;
    switch (tools.currentTool) {
      case 'MOVE':
        selection.updateHover(undefined);
        break;

      case 'TILE_DRAW':
      case 'TILE_ERASE':
        selection.updateHover(
          event.target === canvasElement ? scene.getTilePos(cursor) : undefined
        )
        break;
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
    const cursor = getCursorPos(event);

    // movement
    updateHover(event, cursor);

    // dragging
    if (dragging) {
      dragTools(scene, event, cursor);
      prevCursor = cursor;
    }
  };

  function onWheel(event: WheelEvent) {
    event.preventDefault();
    scene.zoom(event.deltaY * -0.003, getCursorPos(event));
  }

  canvasElement.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', () => { dragging = false; });
	canvasElement.addEventListener('wheel', onWheel, { passive: false });
  canvasElement.addEventListener('contextmenu', event => event.preventDefault());
}
