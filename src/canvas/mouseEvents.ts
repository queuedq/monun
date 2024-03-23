import Scene from "./Scene";
import { ToolBehavior } from "./tools";
import { Vec2 } from "./types";

export const addMouseEvents = ({
  canvasElement,
  scene,
  getCurrentTool,
}: {
  canvasElement: HTMLElement;
  scene: Scene;
  getCurrentTool: () => ToolBehavior;
}) => {
  // Dragging states
  let dragging = false;
  let dragStart = new Vec2(0, 0);
  let prevCursor = new Vec2(0, 0);

  function getCursorPos(event: MouseEvent): Vec2 {
    const rect = canvasElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return new Vec2(x, y);
  }

  // Mouse hover / drag

  canvasElement.addEventListener("mousedown", (event: MouseEvent) => {
    event.preventDefault();
    const cursor = getCursorPos(event);
    dragging = true;
    dragStart = cursor;
    prevCursor = cursor;
    const context = { cursor, delta: new Vec2(0, 0), start: dragStart };

    getCurrentTool().onDragStart?.(scene, context, event);
    getCurrentTool().onDragging?.(scene, context, event);
  });

  window.addEventListener("mousemove", (event: MouseEvent) => {
    event.preventDefault();
    const cursor = getCursorPos(event);
    const context = { cursor, delta: cursor.sub(prevCursor), start: dragStart };

    getCurrentTool().onHover?.(scene, cursor, event);
    if (dragging) getCurrentTool().onDragging?.(scene, context, event);
    prevCursor = cursor;
  });

  window.addEventListener("mouseup", (event: MouseEvent) => {
    event.preventDefault();
    const cursor = getCursorPos(event);
    const context = { cursor, delta: cursor.sub(prevCursor), start: dragStart };

    getCurrentTool().onDragEnd?.(scene, context, event);
    dragging = false;
  });

  // Other mouse actions

  canvasElement.addEventListener(
    "wheel",
    (event: WheelEvent) => {
      event.preventDefault();
      scene.zoom(event.deltaY * -0.003, getCursorPos(event));
    },
    { passive: false }
  );

  canvasElement.addEventListener("contextmenu", (event) =>
    event.preventDefault()
  );
};
