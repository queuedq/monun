import { Group } from "two.js/src/group";

export default class Camera {
  scene: Group;
  minZoom: number;
  maxZoom: number;

  constructor(scene) {
    this.scene = scene;
    this.minZoom = 0.25;
    this.maxZoom = 10;
  }

  pan(delta) {
    this.scene.translation.x += delta.x;
    this.scene.translation.y += delta.y;
  }

  zoom(delta, at) {
    const { scale, translation } = this.scene;
    let newScale = scale + delta;
    newScale = Math.max(newScale, this.minZoom);
    newScale = Math.min(newScale, this.maxZoom);
    const ds = (newScale - scale) / scale;
    
    this.scene.scale = newScale;
    this.scene.translation.x -= (at.x - translation.x) * ds;
    this.scene.translation.y -= (at.y - translation.y) * ds;
  }

  toOuterCoordinate(pos) {
    return {
      x: pos.x * this.scene.scale + this.scene.translation.x,
      y: pos.y * this.scene.scale + this.scene.translation.y,
    };
  }

  toInnerCoordinate(pos) {
    return {
      x: (pos.x - this.scene.translation.x) / this.scene.scale,
      y: (pos.y - this.scene.translation.y) / this.scene.scale,
    };
  }
}
