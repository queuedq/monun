import { createNanoEvents, Emitter } from "nanoevents";
import { Vec2 } from "./types";
import Viewport from "./Viewport";

export interface VisibleRect {
  pos: Vec2;
  width: number;
  height: number;
}

export interface CameraEvent {
  update: (cam: Camera) => void;
}

export default class Camera {
  minZoom: number;
  maxZoom: number;
  
  translation: Vec2;
  scale: number;

  viewport: Viewport;
  events: Emitter<CameraEvent>;

  constructor(viewport: Viewport) {
    this.minZoom = 0.25;
    this.maxZoom = 10;
    
    this.translation = Vec2.zero();
    this.scale = 1;

    this.viewport = viewport;
    this.events = createNanoEvents<CameraEvent>();
    
    this.viewport.events.on('resize', this.update);
  }

  update = () => {
    this.events.emit('update', this);
  }

  pan(delta: Vec2) {
    this.translation = this.translation.sub(delta.scale(1 / this.scale));

    this.update();
  }

  zoom(delta: number, pivot: Vec2) {
    const { translation, scale } = this;
    const innerPivot = this.toInnerCoordinates(pivot);
    
    let newScale = scale * Math.exp(delta);
    newScale = Math.max(newScale, this.minZoom);
    newScale = Math.min(newScale, this.maxZoom);
    
    this.translation = innerPivot.add(
      translation.sub(innerPivot).scale(scale / newScale)
    );
    this.scale = newScale;
    
    this.update();
  }

  toOuterCoordinates(pos: Vec2) {
    return pos.sub(this.translation).scale(this.scale);
  }

  toInnerCoordinates(pos: Vec2) {
    return this.translation.add(pos.scale(1 / this.scale));
  }

  /// Returns the inner coordinates of the visible area.
  get visibleRect(): VisibleRect {
    return {
      pos: this.translation,
      width: this.viewport.width / this.scale,
      height: this.viewport.height / this.scale,
    };
  }
}
