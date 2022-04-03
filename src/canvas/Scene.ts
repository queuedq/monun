import { Group } from "two.js/src/group";
import Camera from "./Camera";
import TileMap from "./TileMap";

export default class Scene {
  scene: Group;
  camera: Camera;
  tileMap: TileMap;

  constructor(scene) {
    this.scene = scene;
    this.camera = new Camera();
    this.tileMap = new TileMap(scene, 50);

    this.camera.on('update', cam => {
      this.scene.scale = cam.scale;
      this.scene.translation.x = -cam.translation.x * cam.scale;
      this.scene.translation.y = -cam.translation.y * cam.scale;
    });
    this.camera.update();
  }
}
