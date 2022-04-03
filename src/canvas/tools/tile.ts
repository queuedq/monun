import Scene from "../Scene";
import { Vec2 } from "../types";

export function getTilePos(scene: Scene, cursor: Vec2): Vec2 {
  const pos = scene.camera.toInnerCoordinates(cursor);
  return new Vec2(
    Math.round(pos.x / scene.tileMap.size),
    Math.round(pos.y / scene.tileMap.size),
  );
}

export function draw({ scene, cursor, tile }) {
  scene.tileMap.draw(getTilePos(scene, cursor), tile);
}

export function erase({ scene, cursor }) {
  scene.tileMap.erase(getTilePos(scene, cursor));
}
