import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowsUpDownLeftRight,
  faEraser,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

export type Tool = "MOVE" | "TILE_DRAW" | "TILE_ERASE" | "TILE_RECT";

export interface ToolDefinition {
  type: Tool;
  text: string;
  icon: IconProp;
  shortcut: string; // TODO: use proper shortcut type instead of string
}

export const toolDefinitions: Array<ToolDefinition> = [
  {
    type: "MOVE",
    text: "Move",
    icon: faArrowsUpDownLeftRight,
    shortcut: "Q",
  },
  {
    type: "TILE_DRAW",
    text: "Draw tile",
    icon: faPen,
    shortcut: "W",
  },
  {
    type: "TILE_ERASE",
    text: "Erase tile",
    icon: faEraser,
    shortcut: "E",
  },
  {
    type: "TILE_RECT",
    text: "Draw rectangle with tiles",
    icon: faSquare,
    shortcut: "R",
  },
];
