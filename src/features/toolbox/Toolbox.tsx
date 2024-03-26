import * as React from "react";
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToolStore from "../../stores/tool-store";
import { toolDefinitions } from "./tools";
import { getShortcut } from "../shortcuts";
import { cn } from "../../lib/utils";

interface ToolboxProps {
  tools: ToolStore;
}

const Toolbox = ({ tools }: ToolboxProps) => {
  return (
    <div className="absolute left-2 top-2 p-2 bg-white border border-gray-300 rounded-md shadow-md shadow-gray-800/10">
      <div className="flex gap-2">
        {toolDefinitions.map(({ type, text, icon }) => (
          <button
            key={type}
            onClick={() => tools.select(type)}
            className={cn(
              "flex items-center justify-center relative w-8 h-8 border border-gray-300 rounded text-gray-500 focus-visible:outline-black",
              type === tools.currentTool
                ? "bg-brand-100 border-brand-500 text-brand-700"
                : "hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 active:border-gray-500"
            )}
          >
            <div
              className={cn(
                "absolute -left-1.5 -top-1.5 w-3.5 h-3.5 bg-white rounded-sm font-extrabold text-[10px] text-gray-500",
                type === tools.currentTool && "text-brand-700"
              )}
            >
              {getShortcut(type)}
            </div>
            <FontAwesomeIcon icon={icon} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default observer(Toolbox);
