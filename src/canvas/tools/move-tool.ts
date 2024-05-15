import Scene from "../scene";
import { DragContext, ToolBehavior } from "./types";

export default class MoveTool implements ToolBehavior {
  onHover(scene: Scene) {
    scene.selection.reset();
  }

  onDragging(scene: Scene, context: DragContext) {
    scene.camera.pan(context.delta);
  }
}
