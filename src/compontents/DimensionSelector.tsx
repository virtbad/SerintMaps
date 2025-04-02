import React from "react";
import { useGlobal } from "../context/GlobalContext";

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
          const isNumber: boolean = !isNaN(Number(event.target.value));
          const number = parseInt(event.target.value) || 0;
          if (!isNumber) event.preventDefault();
          else if (number < 0) event.preventDefault();
          else setDimensions({ ...dimensions, height: number });
        }}
      />
      <p children="x" />
      <input
        type="number"
        className="size-input"
        style={{ width: `${width.toString().length}ch` }}
        value={width}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const isNumber: boolean = !isNaN(Number(event.target.value));
          const number = parseInt(event.target.value) || 0;
          if (!isNumber) event.preventDefault();
          else if (number < 0) event.preventDefault();
          else setDimensions({ ...dimensions, width: number })
        }}
      />
    </div>
  );
};

export default DimensionsSelector;
