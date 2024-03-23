import { Group } from "two.js/src/group";
import Camera from "./camera";
import Grid from "./layers/grid";
import Selection from "./layers/selection";
import TileMap from "./layers/tile-map";
import Viewport from "./viewport";
import { Vec2 } from "./types";
import { Tile } from "../domain/tile";
import { TILE_SIZE } from "./constants";

export default class Scene {
  scene: Group;
  viewport: Viewport;
  camera: Camera;

  tileMap: TileMap;
  grid: Grid;
  selection: Selection;

  constructor(canvasElement: Element, scene: Group) {
    this.scene = scene;
    this.viewport = new Viewport(canvasElement);
    this.camera = new Camera(this.viewport);

    // Tile layer
    this.tileMap = new TileMap();
    this.tileMap.layer.addTo(this.scene);

    // Grid layer
    this.grid = new Grid();
    this.grid.layer.addTo(this.scene);

    // Selection layer
    this.selection = new Selection();
    this.selection.layer.addTo(this.scene);

    // Camera
    this.attachCamera();
  }

  attachCamera() {
    this.camera.events.on("update", (cam) => {
      this.tileMap.layer.scale = cam.scale;
      this.tileMap.layer.translation.x = -cam.translation.x * cam.scale;
      this.tileMap.layer.translation.y = -cam.translation.y * cam.scale;
    });
    this.camera.events.on("update", (cam) => {
      this.grid.layer.scale = cam.scale;
      this.grid.layer.translation.x = -cam.translation.x * cam.scale;
      this.grid.layer.translation.y = -cam.translation.y * cam.scale;
      this.grid.update(cam);
    });
    this.camera.events.on("update", (cam) => {
      this.selection.layer.scale = cam.scale;
      this.selection.layer.translation.x = -cam.translation.x * cam.scale;
      this.selection.layer.translation.y = -cam.translation.y * cam.scale;
    });

    this.camera.update();
  }

  // Movement

  pan(delta: Vec2) {
    this.camera.pan(delta);
  }

  zoom(delta: number, cursor: Vec2) {
    this.camera.zoom(delta, cursor);
  }

  // Drawing

  draw(cursor: Vec2, tile: Tile | undefined) {
    this.tileMap.draw(this.getTilePos(cursor), tile);
  }

  erase(cursor: Vec2) {
    this.tileMap.erase(this.getTilePos(cursor));
  }

  // Utils

  getTilePos(cursor: Vec2): Vec2 {
    const pos = this.camera.toInnerCoordinates(cursor);
    return new Vec2(
      Math.floor(pos.x / TILE_SIZE),
      Math.floor(pos.y / TILE_SIZE),
    );
  }
}
