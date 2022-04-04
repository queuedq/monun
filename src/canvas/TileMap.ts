import Two from 'two.js';
import { Group } from 'two.js/src/group';
import { Path } from 'two.js/src/path';

export default class TileMap {
  group: Group;
  size: number;
  tiles: Map<string, Path>;

  constructor(group, size) {
    this.group = group;
    this.size = size;
    this.tiles = new Map();
  }

  getHash(pos) {
    return pos.x + ':' + pos.y;
  }

  draw(pos, tile) {
    const hash = this.getHash(pos);
    if (this.tiles.has(hash)) { this.erase(pos); }

    // TODO: extract tile object creation logic
    const rect = new Two.Rectangle(
      pos.x * this.size + this.size / 2,
      pos.y * this.size + this.size / 2,
      this.size,
      this.size,
    );

    if (tile == 'BLUE') {
      rect.fill = 'rgba(0, 0, 255, 0.3)';
      rect.stroke = 'rgba(0, 0, 255, 0.8)';
    } else if (tile == 'RED') {
      rect.fill = 'rgba(255, 0, 0, 0.3)';
      rect.stroke = 'rgba(255, 0, 0, 0.8)';
    }

    this.tiles.set(hash, rect);
    rect.addTo(this.group);
  }

  erase(pos) {
    const hash = this.getHash(pos);
    if (this.tiles.has(hash)) {
      this.tiles.get(hash).remove();
      this.tiles.delete(hash);
    }
  }
}
