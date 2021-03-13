import React from "react";
import { useGlobal } from "../context/GlobalContext";
import { ActionColor, ActionType } from "../types";

const ActionSelector: React.FC = () => {
  const { action, setAction } = useGlobal();
  return (
    <>
      {Object.entries(ActionColor).map(([key, value], index) => {
        return (
          <button
            className="title-element button"
            key={index}
            style={{ borderColor: action === key ? value : "" }}
            children={key[0] + key.substr(1).toLowerCase()}
            onClick={() => setAction(key as ActionType)}
          />
        );
      })}
    </>
  );
};

export default ActionSelector;
