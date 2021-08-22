import Two from 'two.js';

export default class TileMap {
  constructor(group, size) {
    this.group = group;
    this.size = size;
    this.tiles = new Map();
  }

  getHash(pos) {
    return pos.x + ':' + pos.y;
  }

  draw(pos) {
    const hash = this.getHash(pos);
    if (!this.tiles.has(hash)) {
      const rect = new Two.Rectangle(
        pos.x * this.size,
        pos.y * this.size,
        this.size,
        this.size,
      );
      rect.fill = 'rgba(0, 0, 255, 0.3)';
      rect.stroke = 'rgba(0, 0, 255, 0.8)';
      this.tiles.set(hash, rect);
      rect.addTo(this.group);
    }
  }

  erase(pos) {
    const hash = this.getHash(pos);
    if (this.tiles.has(hash)) {
      this.tiles.get(hash).remove();
      this.tiles.delete(hash);
    }
  }
}
