import React from "react";
import { useGlobal } from "../context/GlobalContext";

/**
 *
 */

const DimensionsSelector: React.FC = () => {
  const { dimensions, setDimensions, setTiles, setLights, setActions, setCosmetics } = useGlobal();
  const { height, width } = dimensions;

  const handleFieldReset = async () => {
    setTiles([]);
    setLights([]);
    setActions([]);
    setCosmetics([]);
  };

  return (
    <div className="title-element size-container">
      <input
        type="number"
        className="size-input"
        style={{ width: `${height.toString().length}ch` }}
        value={height}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setDimensions({ ...dimensions, height: parseInt(event.target.value) || 0 });
        }}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          const isNumber: boolean = !isNaN(Number(event.key));
          isNumber && setDimensions({ ...dimensions, height: parseInt(height + event.key) });
          isNumber && handleFieldReset();
        }}
      />
      <p children="x" />
      <input
        type="number"
        className="size-input"
        style={{ width: `${width.toString().length}ch` }}
        value={width}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setDimensions({ ...dimensions, width: parseInt(event.target.value) || 0 })
        }
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          const isNumber: boolean = !isNaN(Number(event.key));
          isNumber && setDimensions({ ...dimensions, width: parseInt(width + event.key) });
          isNumber && handleFieldReset();
        }}
      />
    </div>
  );
};

export default DimensionsSelector;
