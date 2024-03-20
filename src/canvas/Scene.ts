import { Group } from "two.js/src/group";
import Camera from "./Camera";
import Grid from "./Grid";
import TileMap from "./TileMap";
import Viewport from "./Viewport";

export default class Scene {
  scene: Group;
  viewport: Viewport;
  camera: Camera;
  tileMap: TileMap;
  grid: Grid;

  constructor(element: Element, scene: Group) {
    this.scene = scene;
    this.viewport = new Viewport(element);
    this.camera = new Camera(this.viewport);
    
    // Tile layer
    this.tileMap = new TileMap();
    this.tileMap.layer.addTo(this.scene);
    
    // Grid layer
    this.grid = new Grid();
    this.grid.layer.addTo(this.scene);
    
    // Camera
    this.attachCamera();
  }

  attachCamera() {
    this.camera.events.on('update', cam => {
      this.tileMap.layer.scale = cam.scale;
      this.tileMap.layer.translation.x = -cam.translation.x * cam.scale;
      this.tileMap.layer.translation.y = -cam.translation.y * cam.scale;
    });
    this.camera.events.on('update', cam => {
      this.grid.layer.scale = cam.scale;
      this.grid.layer.translation.x = -cam.translation.x * cam.scale;
      this.grid.layer.translation.y = -cam.translation.y * cam.scale;
      this.grid.update(cam);
    });

    this.camera.update();
  }
}
