import { Tile } from "../../domain/tile";
import { Vec2 } from "../types";
import Scene from "../Scene";
import { TILE_SIZE } from "../constants";

export function getTilePos(scene: Scene, cursor: Vec2): Vec2 {
  const pos = scene.camera.toInnerCoordinates(cursor);
  return new Vec2(
    Math.floor(pos.x / TILE_SIZE),
    Math.floor(pos.y / TILE_SIZE),
  );
}

export function draw(scene: Scene, cursor: Vec2, tile: Tile | undefined) {
  scene.tileMap.draw(getTilePos(scene, cursor), tile);
}

export function erase(scene: Scene, cursor: Vec2) {
  scene.tileMap.erase(getTilePos(scene, cursor));
}
