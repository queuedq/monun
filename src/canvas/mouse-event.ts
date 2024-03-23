import { reaction } from "mobx";
import ToolStore from "../stores/ToolStore";
import Scene from "./scene";
import { DragContext, ToolBehavior } from "./tools";
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
  // Dragging state
  const state = {
    dragging: false,
    dragStart: new Vec2(0, 0),
    cursor: new Vec2(0, 0),
    prevCursor: new Vec2(0, 0),
  };

  const getCursorPos = (event: MouseEvent): Vec2 => {
    const rect = canvasElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return new Vec2(x, y);
  };

  const updateCursor = (event: MouseEvent) => {
    state.prevCursor = state.cursor;
    state.cursor = getCursorPos(event);
  };

  const getDragContext = (): DragContext => {
    return {
      cursor: state.cursor,
      delta: state.cursor.sub(state.prevCursor),
      start: state.dragStart,
    };
  };

  // Mouse hover / drag

  canvasElement.addEventListener("mousedown", (event: MouseEvent) => {
    event.preventDefault();
    updateCursor(event);
    state.dragging = true;

    const context = getDragContext();
    getCurrentTool().onDragStart?.(scene, context, event);
    getCurrentTool().onDragging?.(scene, context, event);
  });

  window.addEventListener("mousemove", (event: MouseEvent) => {
    event.preventDefault();
    updateCursor(event);

    const context = getDragContext();
    getCurrentTool().onHover?.(scene, state.cursor, event);
    if (state.dragging) getCurrentTool().onDragging?.(scene, context, event);
  });

  window.addEventListener("mouseup", (event: MouseEvent) => {
    event.preventDefault();
    updateCursor(event);
    state.dragging = false;

    const context = getDragContext();
    getCurrentTool().onDragEnd?.(scene, context, event);
  });

  // Also register hover & drag end event on tool change
  reaction(
    () => tools.currentTool,
    () => {
      getCurrentTool().onHover?.(scene, state.cursor);
      // TODO: Implement drag end event
      // Apparently we need a low level API of MobX?
      // https://github.com/mobxjs/mobx/issues/1785
    },
  );

  // Other mouse actions

  canvasElement.addEventListener(
    "wheel",
    (event: WheelEvent) => {
      event.preventDefault();
      scene.zoom(event.deltaY * -0.003, getCursorPos(event));
    },
    { passive: false },
  );

  canvasElement.addEventListener("contextmenu", (event) =>
    event.preventDefault(),
  );
};
