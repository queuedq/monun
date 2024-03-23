import { createNanoEvents, Emitter } from "nanoevents";

export interface ViewportEvent {
  resize: (view: Viewport) => void;
}

export default class Viewport {
  width: number;
  height: number;

  resizeObserver: ResizeObserver;
  events: Emitter<ViewportEvent>;

  constructor(element: Element) {
    const { width, height } = element.getBoundingClientRect();
    this.width = width;
    this.height = height;

    this.events = createNanoEvents();

    this.resizeObserver = new ResizeObserver((entries) => {
      this.width = entries[0].contentRect.width;
      this.height = entries[0].contentRect.height;
      this.update();
    });
    this.resizeObserver.observe(element);
  }

  update() {
    this.events.emit("resize", this);
  }
}
