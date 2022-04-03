import Scene from "../Scene";
import { Vec2 } from "../types";

export function pan(scene: Scene, cursor: Vec2, prevCursor: Vec2) {
  scene.camera.pan(cursor.sub(prevCursor));
}

export function zoom(scene: Scene, delta: number, cursor: Vec2) {
  scene.camera.zoom(delta, cursor);
}
