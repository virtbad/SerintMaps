import React from "react";
import { useGlobal } from "../context/GlobalContext";
import { Mode, ModeColor } from "../types";

/**
 * Mode selector component
 * @returns React.ReactNode
 */

const ModeSelector: React.FC = () => {
  const { mode, setMode } = useGlobal();
  return (
    <>
      {Object.entries(ModeColor).map(([key, value], index) => {
        return (
          <button
            className="title-element button"
            key={index}
            style={{ borderColor: mode === key ? value : "" }}
            children={key[0] + key.substring(1).toLowerCase()}
            onClick={() => setMode(key as Mode)}
          />
        );
      })}
    </>
  );
};

export default ModeSelector;
