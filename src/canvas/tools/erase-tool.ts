import Scene from "../scene";
import { DragContext, ToolBehavior } from "./types";

export default class EraseTool implements ToolBehavior {
  onHover(scene: Scene, context: DragContext) {
    scene.selection.updateHover(context.cursorTile);
  }

  onDragging(scene: Scene, context: DragContext) {
    scene.tileMap.erase(context.cursor);
  }
}
