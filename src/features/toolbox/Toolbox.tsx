import * as React from "react";
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToolStore from "../../stores/tool-store";
import { toolDefinitions } from "./tools";
import { cn } from "../../lib/utils";

interface ToolboxProps {
  tools: ToolStore;
}

const Toolbox = ({ tools }: ToolboxProps) => {
  // TODO: add tooltip to show tool name text
  return (
    <div className="flex gap-2 relative p-2 bg-white border border-gray-300 rounded-md shadow-md shadow-gray-800/10">
      {toolDefinitions.map(({ type, text, icon, shortcut }) => (
        <div className="relative">
          <button
            key={type}
            onClick={() => tools.select(type)}
            className={cn(
              "flex items-center justify-center w-8 h-8",
              "rounded border border-gray-200 text-gray-500",
              "focus-visible:outline-none focus-visible:border-2 focus-visible:border-black",
              type === tools.currentTool
                ? "bg-brand-100 border-brand-500 text-brand-700"
                : "hover:bg-gray-100 hover:border-gray-300 active:bg-gray-200 active:border-gray-400",
            )}
          >
            <FontAwesomeIcon icon={icon} />
          </button>
          <div
            className={cn(
              "flex items-center justify-center absolute -left-1 -top-1 w-3 h-3",
              "bg-white rounded-sm font-extrabold text-[10px] text-gray-500",
              type === tools.currentTool && "text-brand-700",
            )}
          >
            {shortcut}
          </div>
        </div>
      ))}
    </div>
  );
};

export default observer(Toolbox);
