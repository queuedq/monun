import Two from "two.js";
import TileStore from "../stores/tile-store";
import ToolStore from "../stores/tool-store";
import { addMouseEvents } from "./mouse-event";
import Scene from "./scene";
import { ToolBehavior } from "./tools/types";
import MoveTool from "./tools/move-tool";
import TileTool from "./tools/tile-tool";
import EraseTool from "./tools/erase-tool";

export const init = ({
  canvasElement,
  tools,
  tiles,
}: {
  canvasElement: HTMLElement;
  tools: ToolStore;
  tiles: TileStore;
}) => {
  const two = new Two({
    autostart: true,
    fullscreen: true,
    domElement: canvasElement,
  });

  const scene = new Scene(canvasElement, two.scene);

  // Tool behaviors
  const moveTool = new MoveTool();
  const tileTool = new TileTool(tools, tiles);
  const eraseTool = new EraseTool();

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
