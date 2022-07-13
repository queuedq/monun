import { Tile } from "../../domain/tile";
import { Vec2 } from "../types";
import Scene from "../Scene";

export function getTilePos(scene: Scene, cursor: Vec2): Vec2 {
  const pos = scene.camera.toInnerCoordinates(cursor);
  return new Vec2(
    Math.floor(pos.x / scene.tileMap.tileSize),
    Math.floor(pos.y / scene.tileMap.tileSize),
  );
}

export function draw(scene: Scene, cursor: Vec2, tile: Tile | undefined) {
  scene.tileMap.draw(getTilePos(scene, cursor), tile);
}

export function erase(scene: Scene, cursor: Vec2) {
  scene.tileMap.erase(getTilePos(scene, cursor));
}
