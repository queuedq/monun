import Camera from "./Camera";
import TileMap from "./TileMap";

export default class Scene {
  target // Target group to draw inside
  camera
  tileMap

  constructor(target) {
    this.target = target;
    this.camera = new Camera(target);
    this.tileMap = new TileMap(target, 50);
  }
}
