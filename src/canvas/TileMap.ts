import Two from 'two.js';
import { Group } from 'two.js/src/group';
import { Shape } from 'two.js/src/shape';
import { ColorTile, Tile } from '../domain/tile';
import { TILE_SIZE } from './constants';
import { Vec2 } from './types';

export default class TileMap {
  layer: Group;
  tiles: Map<string, Shape>;

  constructor() {
    this.layer = new Group();
    this.tiles = new Map();
  }

  getHash(pos: Vec2) {
    return pos.x + ':' + pos.y;
  }

  private createColorTile(pos: Vec2, tile: ColorTile): Shape {
    const rect = new Two.Rectangle(
      pos.x * TILE_SIZE + TILE_SIZE / 2,
      pos.y * TILE_SIZE + TILE_SIZE / 2,
      TILE_SIZE,
      TILE_SIZE,
    );
    rect.fill = tile.color;
    rect.stroke = 'transparent';
    return rect;
  }

  private createTile(pos: Vec2, tile: Tile): Shape {
    switch (tile.type) {
      case 'ColorTile': return this.createColorTile(pos, tile);
      case 'ImageTile': return new Two.Shape(); // TODO: ImageTile not implemented
    }
  }

  draw(pos: Vec2, tile: Tile | undefined) {
    if (tile === undefined) return;

    const hash = this.getHash(pos);
    if (this.tiles.has(hash)) { this.erase(pos); }

    let tileShape = this.createTile(pos, tile);
    this.tiles.set(hash, tileShape);
    tileShape.addTo(this.layer);
  }

  erase(pos: Vec2) {
    const hash = this.getHash(pos);
    this.tiles.get(hash)?.remove();
    this.tiles.delete(hash);
  }
}
