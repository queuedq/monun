import Scene from "../scene";
import TileStore from "../../stores/tile-store";
import ToolStore from "../../stores/tool-store";
import { DragContext, ToolBehavior } from "./types";

export default class TileRectTool implements ToolBehavior {
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
    scene.selection.updateRect(context.dragStartTile, context.cursorTile);
  }

  onDragEnd(scene: Scene, context: DragContext): void {
    if (context.dragButton == 0) {
      scene.tileMap.drawRect(
        context.dragStartTile,
        context.cursorTile,
        this.tiles.getTile(this.tools.selectedTile),
      );
    } else if (context.dragButton == 2) {
      scene.tileMap.eraseRect(
        context.dragStartTile,
        context.cursorTile,
      );
    }
  }
}

export const createTileTool = (): ToolBehavior => ({});
