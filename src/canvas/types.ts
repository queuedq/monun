export class Vec2 {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vec2(this.x, this.y);
  }

  add(v: Vec2) {
    return new Vec2(this.x + v.x, this.y + v.y);
  }

  sub(v: Vec2) {
    return new Vec2(this.x - v.x, this.y - v.y);
  }

  scale(c: number) {
    return new Vec2(this.x * c, this.y * c);
  }

  static zero() {
    return new Vec2(0, 0);
  }
}
