import Two from 'two.js';
import TileStore from '../stores/TileStore';
import ToolStore from '../stores/ToolStore';
import { addMouseEvents } from './mouseEvents';
import Scene from './Scene';
import { createEraseTool, createMoveTool, createTileTool, ToolBehavior } from './tools';

export const init = ({ canvasElement, tools, tiles }: {
  canvasElement: HTMLElement,
  tools: ToolStore,
  tiles: TileStore,
}) => {
  const two = new Two({ autostart: true, fullscreen: true, domElement: canvasElement });
  
  const scene = new Scene(canvasElement, two.scene);
  
  // Tool behaviors
  const moveTool = createMoveTool();
  const tileTool = createTileTool(tools, tiles);
  const eraseTool = createEraseTool();

  function getCurrentTool(): ToolBehavior {
    switch (tools.currentTool) {
      case "MOVE":
        return moveTool;
      case "TILE_DRAW":
        return tileTool;
      case "TILE_ERASE":
        return eraseTool;
    }
  }

  addMouseEvents({ canvasElement, scene, tools, getCurrentTool });
};
