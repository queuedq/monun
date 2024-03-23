import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowsUpDownLeftRight,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";

export type Tool = "MOVE" | "TILE_DRAW" | "TILE_ERASE";

export interface ToolDefinition {
  type: Tool;
  text: string;
  icon: IconProp;
}

export const toolDefinitions: Array<ToolDefinition> = [
  {
    type: "MOVE",
    text: "Move",
    icon: faArrowsUpDownLeftRight,
  },
  {
    type: "TILE_DRAW",
    text: "Draw tile",
    icon: faSquare,
  },
  {
    type: "TILE_ERASE",
    text: "Erase tile",
    icon: faEraser,
  },
];
