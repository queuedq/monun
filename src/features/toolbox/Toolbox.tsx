import * as React from "react";
import classnames from "classnames";
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToolStore from "../../stores/tool-store";
import { Tool, toolDefinitions } from "./tools";
import { getShortcut } from "../shortcuts";
import styles from "./Toolbox.module.scss";

interface ToolboxProps {
  tools: ToolStore;
}

const Toolbox = ({ tools }: ToolboxProps) => {
  const buttonStyle = (toolType: Tool) =>
    classnames(
      styles.button,
      toolType === tools.currentTool ? styles.selected : null,
    );

  return (
    <div className={styles.containerOut}>
      <div className={styles.containerIn}>
        {toolDefinitions.map(({ type, text, icon }) => (
          <button
            key={type}
            onClick={() => tools.select(type)}
            className={buttonStyle(type)}
          >
            <div className={styles.shortcutBadge}>{getShortcut(type)}</div>
            <FontAwesomeIcon icon={icon} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default observer(Toolbox);
