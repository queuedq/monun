import { Tile } from "../../domain/tile";

export const defaultTiles: Tile[] = [
  {
    type: "ColorTile",
    id: "BLUE",
    color: "rgba(0, 0, 255, 0.3)",
  },
  {
    type: "ColorTile",
    id: "RED",
    color: "rgba(255, 0, 0, 0.3)",
  },
];
