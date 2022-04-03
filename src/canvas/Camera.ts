import { createNanoEvents, Emitter } from "nanoevents";
import { Vec2 } from "./types";

export interface CameraState {
  translation: Vec2; // inner coordinates
  scale: number;
}

export interface CameraEvent {
  update: (cam: CameraState) => void;
}

export default class Camera {
  minZoom: number;
  maxZoom: number;
  
  cam: CameraState;
  emitter: Emitter<CameraEvent>;

  constructor() {
    this.minZoom = 0.25;
    this.maxZoom = 10;
    this.cam = { translation: Vec2.zero(), scale: 1 };
    this.emitter = createNanoEvents<CameraEvent>();
  }

  on<E extends keyof CameraEvent>(event: E, callback: CameraEvent[E]) {
    return this.emitter.on(event, callback);
  }

  update() {
    this.emitter.emit('update', this.cam);
  }

  pan(delta: Vec2) {
    this.cam.translation = this.cam.translation.sub(delta.scale(1 / this.cam.scale));

    this.update();
  }

  zoom(delta: number, pivot: Vec2) {
    const { translation, scale } = this.cam;
    const innerPivot = this.toInnerCoordinates(pivot);
    
    let newScale = scale * Math.exp(delta);
    newScale = Math.max(newScale, this.minZoom);
    newScale = Math.min(newScale, this.maxZoom);
    
    this.cam.translation = innerPivot.add(
      translation.sub(innerPivot).scale(scale / newScale)
    );
    this.cam.scale = newScale;
    
    this.update();
  }

  toOuterCoordinates(pos: Vec2) {
    return pos.sub(this.cam.translation).scale(this.cam.scale);
  }

  toInnerCoordinates(pos: Vec2) {
    return this.cam.translation.add(pos.scale(1 / this.cam.scale));
  }
}
