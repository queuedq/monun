import * as React from "react";
import { ColorTile } from "../../domain/tile";
import { cn } from "../../lib/utils";

interface ColorTileButtonProps {
  tile: ColorTile;
  selected: boolean;
  onClick: () => void;
}

export const ColorTileButton = ({
  tile,
  selected,
  onClick,
}: ColorTileButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "relative w-8 h-8 text-[0]",
      selected
        ? "outline outline-2 -outline-offset-1 outline-black rounded-sm z-10 focus-visible:outline-4 focus-visible:-outline-offset-2"
        : "hover:border-2 hover:border-black hover:rounded-sm " +
            "focus-visible:outline-none focus-visible:border-2 focus-visible:border-black focus-visible:rounded-sm"
    )}
    style={{ backgroundColor: tile.color }}
  >
    {tile.id}
  </button>
);
