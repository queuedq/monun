import Two from "two.js";
import { Group } from "two.js/src/group";
import { Shape } from "two.js/src/shape";
import { TILE_SIZE } from "../constants";
import { Vec2 } from "../types";

export default class SelectionLayer {
  layer: Group;
  selectionOutline: Shape | undefined;

  constructor() {
    this.layer = new Group();
  }

  reset() {
    this.selectionOutline?.remove();
    this.selectionOutline = undefined;
  }

  /** @param pos - Tile position to show hover outline */
  updateHover(pos: Vec2) {
    this.reset();
    this.selectionOutline = this.createHoverOutline(pos);
    this.selectionOutline.addTo(this.layer);
  }

  /**
   * @param startPos - Tile position of selection start
   * @param endPos - Tile position of selection end
   */
  updateRect(startPos: Vec2, endPos: Vec2) {
    this.reset();
    this.selectionOutline = this.createRectOutline(startPos, endPos);
    this.selectionOutline.addTo(this.layer);
  }

  private createHoverOutline(pos: Vec2) {
    const rect = new Two.Rectangle(
      pos.x * TILE_SIZE + TILE_SIZE / 2,
      pos.y * TILE_SIZE + TILE_SIZE / 2,
      TILE_SIZE,
      TILE_SIZE,
    );
    rect.fill = "transparent";
    rect.stroke = "#000";
    rect.linewidth = 2;
    return rect;
  }

  private createRectOutline(startPos: Vec2, endPos: Vec2) {
    const sx = Math.min(startPos.x, endPos.x);
    const sy = Math.min(startPos.y, endPos.y);
    const ex = Math.max(startPos.x, endPos.x) + 1;
    const ey = Math.max(startPos.y, endPos.y) + 1;

    const rect = new Two.Rectangle(
      ((sx + ex) * TILE_SIZE) / 2,
      ((sy + ey) * TILE_SIZE) / 2,
      (ex - sx) * TILE_SIZE,
      (ey - sy) * TILE_SIZE,
    );
    rect.fill = "transparent";
    rect.stroke = "#000";
    rect.linewidth = 2;
    return rect;
  }
}
