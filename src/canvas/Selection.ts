import Two from "two.js";
import { Group } from "two.js/src/group";
import { Shape } from "two.js/src/shape";
import { TILE_SIZE } from "./constants";
import { Vec2 } from "./types";

export default class Selection {
  layer: Group;
  hoverOutline: Shape | undefined;

  constructor() {
    this.layer = new Group();
  }

  update(pos: Vec2 | undefined) {
    this.hoverOutline?.remove();
    if (pos) {
      this.hoverOutline = this.createHoverOutline(pos);
      this.hoverOutline.addTo(this.layer);
    }
  }

  private createHoverOutline(pos: Vec2) {
    const rect = new Two.Rectangle(
      pos.x * TILE_SIZE + TILE_SIZE / 2,
      pos.y * TILE_SIZE + TILE_SIZE / 2,
      TILE_SIZE,
      TILE_SIZE,
    );
    rect.fill = 'transparent';
    rect.stroke = '#000';
    rect.linewidth = 2;
    return rect;
  }
}
