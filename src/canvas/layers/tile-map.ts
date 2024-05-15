import Two from "two.js";
import { Group } from "two.js/src/group";
import { Shape } from "two.js/src/shape";
import { ColorTile, Tile } from "../../domain/tile";
import { TILE_SIZE } from "../constants";
import { Vec2 } from "../types";

export default class TileMap {
  layer: Group;
  tiles: Map<string, Shape>;

  constructor() {
    this.layer = new Group();
    this.tiles = new Map();
  }

  getHash(pos: Vec2) {
    return pos.x + ":" + pos.y;
  }

  private createColorTile(pos: Vec2, tile: ColorTile): Shape {
    const rect = new Two.Rectangle(
      pos.x * TILE_SIZE + TILE_SIZE / 2,
      pos.y * TILE_SIZE + TILE_SIZE / 2,
      TILE_SIZE,
      TILE_SIZE,
    );
    rect.fill = tile.color;
    rect.stroke = "transparent";
    return rect;
  }

  private createTile(pos: Vec2, tile: Tile): Shape {
    switch (tile.type) {
      case "ColorTile":
        return this.createColorTile(pos, tile);
      case "ImageTile":
        return new Two.Shape(); // TODO: ImageTile not implemented
    }
  }

  draw(pos: Vec2, tile: Tile | undefined) {
    if (tile === undefined) return;

    const hash = this.getHash(pos);
    if (this.tiles.has(hash)) {
      this.erase(pos);
    }

    let tileShape = this.createTile(pos, tile);
    this.tiles.set(hash, tileShape);
    tileShape.addTo(this.layer);
  }

  drawRect(startPos: Vec2, endPos: Vec2, tile: Tile | undefined) {
    const sx = Math.min(startPos.x, endPos.x);
    const sy = Math.min(startPos.y, endPos.y);
    const ex = Math.max(startPos.x, endPos.x);
    const ey = Math.max(startPos.y, endPos.y);

    for (let x = sx; x <= ex; x++) {
      for (let y = sy; y <= ey; y++) {
        this.draw(new Vec2(x, y), tile);
      }
    }
  }

  erase(pos: Vec2) {
    const hash = this.getHash(pos);
    this.tiles.get(hash)?.remove();
    this.tiles.delete(hash);
  }

  eraseRect(startPos: Vec2, endPos: Vec2) {
    const sx = Math.min(startPos.x, endPos.x);
    const sy = Math.min(startPos.y, endPos.y);
    const ex = Math.max(startPos.x, endPos.x);
    const ey = Math.max(startPos.y, endPos.y);

    for (let x = sx; x <= ex; x++) {
      for (let y = sy; y <= ey; y++) {
        this.erase(new Vec2(x, y));
      }
    }
  }
}
