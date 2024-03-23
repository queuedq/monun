import TileStore from "../stores/TileStore";
import ToolStore from "../stores/ToolStore";
import Scene from "./scene";
import { Vec2 } from "./types";

export interface ToolBehavior {
  onHover?(scene: Scene, cursor: Vec2, event?: MouseEvent): void;
  onDragStart?(scene: Scene, context: DragContext, event?: MouseEvent): void;
  onDragging?(scene: Scene, context: DragContext, event?: MouseEvent): void;
  onDragEnd?(scene: Scene, context: DragContext, event?: MouseEvent): void;
}

export interface DragContext {
  cursor: Vec2;
  delta: Vec2;
  start: Vec2;
}

// Tool behaviors

export const createMoveTool = (): ToolBehavior => ({
  onHover(scene: Scene) {
    scene.selection.updateHover(undefined);
  },
  onDragging(scene: Scene, context: DragContext) {
    scene.pan(context.delta);
  },
});

export const createTileTool = (
  tools: ToolStore,
  tiles: TileStore,
): ToolBehavior => ({
  onHover(scene: Scene, cursor: Vec2) {
    scene.selection.updateHover(scene.getTilePos(cursor));
  },
  onDragging(scene: Scene, context: DragContext, event?: MouseEvent) {
    if (event?.buttons === 1) {
      scene.draw(context.cursor, tiles.getTile(tools.selectedTile));
    } else if (event?.buttons === 2) {
      scene.erase(context.cursor);
    }
  },
});

export const createEraseTool = (): ToolBehavior => ({
  onHover(scene: Scene, cursor: Vec2) {
    scene.selection.updateHover(scene.getTilePos(cursor));
  },
  onDragging(scene: Scene, context: DragContext) {
    scene.erase(context.cursor);
  },
});
