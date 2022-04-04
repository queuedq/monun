import { Group } from "two.js/src/group";
import Camera from "./Camera";
import TileMap from "./TileMap";
import Viewport from "./Viewport";

export default class Scene {
  scene: Group;
  viewport: Viewport;
  camera: Camera;
  tileMap: TileMap;

  constructor(element: Element, scene: Group) {
    this.scene = scene;
    this.viewport = new Viewport(element);
    this.camera = new Camera(this.viewport);
    this.tileMap = new TileMap(scene, 50);
    
    this.attachCamera();
  }

  attachCamera() {
    this.camera.events.on('update', cam => {
      this.scene.scale = cam.scale;
      this.scene.translation.x = -cam.translation.x * cam.scale;
      this.scene.translation.y = -cam.translation.y * cam.scale;
    });
    this.camera.update();
  }
}
