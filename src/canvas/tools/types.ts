import { Vec2 } from "../types";
import Scene from "../scene";

export interface ToolBehavior {
  onHover?(scene: Scene, context: DragContext): void;
  onDragStart?(scene: Scene, context: DragContext): void;
  onDragging?(scene: Scene, context: DragContext): void;
  onDragEnd?(scene: Scene, context: DragContext): void;
  onDoubleClick?(scene: Scene, context: DragContext): void;
}

export type DragContext = Readonly<MutableDragContext>;

export class MutableDragContext {
  cursor = new Vec2(0, 0);
  cursorTile = new Vec2(0, 0);
  prevCursor = new Vec2(0, 0);

  isDragging = false;
  dragButton: number = 0;
  dragStart = new Vec2(0, 0);
  dragStartTile = new Vec2(0, 0);
  scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  get delta() {
    return this.cursor.sub(this.prevCursor);
  }

  updateCursor(cursor: Vec2) {
    this.prevCursor = this.cursor;
    this.cursor = cursor;
    this.cursorTile = this.scene.getTilePos(this.cursor);
  }

  startDragging(event: MouseEvent) {
    this.isDragging = true;
    this.dragButton = event.button;
    this.dragStart = this.cursor;
    this.dragStartTile = this.cursorTile;
  }

  resetDragging() {
    this.isDragging = false;
  }
}
