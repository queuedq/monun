import Two from 'two.js';

export default class TileMap {
  constructor(group, size) {
    this.group = group;
    this.size = size;
    this.tiles = {};
  }

  getHash(pos) {
    return pos.x + ':' + pos.y;
  }

  draw(pos) {
    const hash = this.getHash(pos);
    if (this.tiles[hash] === undefined) {
      this.tiles[hash] = new Two.Rectangle(
        pos.x * this.size,
        pos.y * this.size,
        this.size,
        this.size,
      );
      this.tiles[hash].addTo(this.group);
    }
  }

  erase(pos) {
    const hash = this.getHash(pos);
    if (this.tiles[hash] !== undefined) {
      this.tiles[hash].remove();
      this.tiles[hash] = undefined;
    }
  }
}
