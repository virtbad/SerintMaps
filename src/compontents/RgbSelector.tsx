import React from "react";
import { useGlobal } from "../context/GlobalContext";

/**
 * Component for the light mode
 * @returns React.ReactNode
 */

const RgbSelector: React.FC = (): React.ReactNode => {
  const { rgb, setRgb, intensity, setIntensity } = useGlobal();

  return (
    <>
      <input
        type="number"
        className="rgb-input"
        style={{ width: `${rgb.r.toString().length}ch` }}
        value={rgb.r}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const isNumber: boolean = !isNaN(Number(event.target.value));
          const number = parseInt(event.target.value) || 0;
          if (!isNumber) event.preventDefault();
          else if (number < 0 || number > 255) event.preventDefault();
          else setRgb({ ...rgb, r: number });
        }}
      />
      <p children=", " />
      <input
        type="number"
        className="rgb-input"
        style={{ width: `${rgb.g.toString().length}ch` }}
        value={rgb.g}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const isNumber: boolean = !isNaN(Number(event.target.value));
          const number = parseInt(event.target.value) || 0;
          if (!isNumber) event.preventDefault();
          else if (number < 0 || number > 255) event.preventDefault();
          else setRgb({ ...rgb, g: number });
        }}
      />
      <p children=", " />
      <input
        type="number"
        className="rgb-input"
        style={{ width: `${rgb.b.toString().length}ch` }}
        value={rgb.b}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const isNumber: boolean = !isNaN(Number(event.target.value));
          const number = parseInt(event.target.value) || 0;
          if (!isNumber) event.preventDefault();
          else if (number < 0 || number > 255) event.preventDefault();
          else setRgb({ ...rgb, b: number });
        }}
      />
      <div className="rgb-preview" style={{ backgroundColor: `rgb(${rgb.r},${rgb.g},${rgb.b})` }} />
      <input
        type="number"
        className="rgb-input"
        style={{ width: `${intensity.toString().length}ch` }}
        value={intensity}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const isNumber: boolean = !isNaN(Number(event.target.value));
          const number = parseFloat(event.target.value) || 0;
          if (!isNumber) event.preventDefault();
          else if (number < 0) event.preventDefault();
          else setIntensity(number)
        }}
      />
    </>
  );
};

export default RgbSelector;
