import { reaction } from "mobx";
import ToolStore from "../stores/tool-store";
import Scene from "./scene";
import { MutableDragContext, ToolBehavior } from "./tools/types";
import { Vec2 } from "./types";

export const addMouseEvents = ({
  canvasElement,
  scene,
  tools,
  getCurrentTool,
}: {
  canvasElement: HTMLElement;
  scene: Scene;
  tools: ToolStore;
  getCurrentTool: () => ToolBehavior;
}) => {
  const context = new MutableDragContext(scene);

  const getCursorPos = (event: MouseEvent): Vec2 => {
    const rect = canvasElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return new Vec2(x, y);
  };

  // Mouse hover / drag

  canvasElement.addEventListener("mousedown", (event: MouseEvent) => {
    event.preventDefault();
    context.updateCursor(getCursorPos(event));

    context.startDragging(event);
    getCurrentTool().onDragStart?.(scene, context);
    getCurrentTool().onDragging?.(scene, context);
    getCurrentTool().onHover?.(scene, context);
  });

  window.addEventListener("mousemove", (event: MouseEvent) => {
    event.preventDefault();
    context.updateCursor(getCursorPos(event));

    if (context.isDragging) getCurrentTool().onDragging?.(scene, context);
    getCurrentTool().onHover?.(scene, context);
  });

  window.addEventListener("mouseup", (event: MouseEvent) => {
    event.preventDefault();
    context.updateCursor(getCursorPos(event));

    if (context.isDragging && event.button === context.dragButton) {
      getCurrentTool().onDragEnd?.(scene, context);
      context.resetDragging();
    }
    getCurrentTool().onHover?.(scene, context);
  });

  // Also register hover & drag end event on tool change
  reaction(
    () => tools.selectedTool,
    () => {
      // Reset dragging state on tool change (except for temporary move tool)
      context.resetDragging();
      getCurrentTool().onHover?.(scene, context);
    },
  );

  // Other mouse actions

  canvasElement.addEventListener(
    "wheel",
    (event: WheelEvent) => {
      event.preventDefault();
      scene.camera.zoom(event.deltaY * -0.003, getCursorPos(event));
    },
    { passive: false },
  );

  canvasElement.addEventListener("contextmenu", (event) =>
    event.preventDefault(),
  );
};
