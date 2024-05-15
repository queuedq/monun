import ToolStore from "../stores/tool-store";
import { toolDefinitions } from "./toolbox/tools";

export const registerShortcuts = (tools: ToolStore) => {
  window.addEventListener(
    "keydown",
    (event) => {
      toolDefinitions.forEach(({ type, shortcut }) => {
        if (event.code === "Key" + shortcut) {
          tools.select(type);
        }
      });
      if (event.code === "Space") {
        tools.setTempMove(true);
      }
    },
    true,
  );

  window.addEventListener(
    "keyup",
    (event) => {
      if (event.code === "Space") {
        tools.setTempMove(false);
      }
    },
    true,
  );
};
