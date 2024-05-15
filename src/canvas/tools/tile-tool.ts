import Scene from "../scene";
import TileStore from "../../stores/tile-store";
import ToolStore from "../../stores/tool-store";
import { DragContext, ToolBehavior } from "./types";

export default class TileTool implements ToolBehavior {
  tools: ToolStore;
  tiles: TileStore;

  constructor(tools: ToolStore, tiles: TileStore) {
    this.tools = tools;
    this.tiles = tiles;
  }

  onHover(scene: Scene, context: DragContext) {
    scene.selection.updateHover(context.cursorTile);
  }

  onDragging(scene: Scene, context: DragContext) {
    if (context.dragButton == 0) {
      scene.tileMap.draw(
        context.cursorTile,
        this.tiles.getTile(this.tools.selectedTile),
      );
    } else if (context.dragButton === 2) {
      scene.tileMap.erase(context.cursorTile);
    }
  }
}

export const createTileTool = (): ToolBehavior => ({});
