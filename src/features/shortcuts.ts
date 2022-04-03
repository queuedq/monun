import ToolStore from "../stores/ToolStore";
import { Action } from "./actions";

// TODO: use proper shortcut type instead of string
export const shortcuts: { [id in Action]?: string } = {
  'MOVE': 'Q',
  'TILE_DRAW': 'W',
  'TILE_ERASE': 'E',
};

export const getShortcut = (action: Action): string | undefined => shortcuts[action];

export const registerShortcuts = (tools: ToolStore) => {
  window.addEventListener('keydown', (event) => {
    Object.entries(shortcuts).forEach(([k, v]) => {
      if (event.code === 'Key' + v) {
        tools.select(k);
      }
    })
    if (event.code === 'Space') {
      tools.setTempMove(true);
    }
  }, true);
  
  window.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
      tools.setTempMove(false);
    }
  }, true);  
}
