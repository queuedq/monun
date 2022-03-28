import { Group } from "two.js/src/group";
import Camera from "./Camera";
import TileMap from "./TileMap";

export default class Scene {
  target: Group;
  camera: Camera;
  tileMap: TileMap;

  constructor(target) {
    this.target = target;
    this.camera = new Camera(target);
    this.tileMap = new TileMap(target, 50);
  }
}
