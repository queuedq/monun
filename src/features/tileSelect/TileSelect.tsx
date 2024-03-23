import * as React from "react";
import { observer } from "mobx-react-lite";
import ToolStore from "../../stores/tool-store";
import TileStore from "../../stores/tile-store";
import { ColorTileButton } from "./TileButtons";

interface TileSelectProps {
  tools: ToolStore;
  tiles: TileStore;
}

const TileSelect = ({ tools, tiles }: TileSelectProps) => {
  return (
    <div>
      {Array.from(tiles.tileList.values()).map((tile) => {
        switch (tile.type) {
          case "ImageTile":
            return null; // TODO: ImageTile not implemented
          case "ColorTile":
            return (
              <ColorTileButton
                key={tile.id}
                tile={tile}
                selected={tools.selectedTile == tile.id}
                onClick={() => tools.selectTile(tile.id)}
              />
            );
        }
      })}
    </div>
  );
};

export default observer(TileSelect);
