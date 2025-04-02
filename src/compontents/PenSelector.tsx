import React from "react";
import { useGlobal } from "../context/GlobalContext";
import { TileColor, TileType } from "../types";

/**
 * Component for the tile mode
 * @returns React.ReactNode
 */

const PenSelector: React.FC = (): React.ReactNode => {
  const { pen, setPen } = useGlobal();
  return (
    <>
      {Object.entries(TileColor).map(([key, value], index) => {
        return (
          <button
            className="title-element button"
            key={index}
            style={{ borderColor: pen === key ? value : "" }}
            children={key[0] + key.substring(1).toLowerCase()}
            onClick={() => setPen(key as TileType)}
          />
        );
      })}
    </>
  );
};

export default PenSelector;
