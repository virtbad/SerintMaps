import React from "react";
import { useGlobal } from "../context/GlobalContext";

/**
 * Component for the light mode
 *
 * @returns JSX.Element
 */

const RgbSelector: React.FC = (): JSX.Element => {
  const { rgb, setRgb, intensity, setIntensity } = useGlobal();

  return (
    <>
      <input
        type="number"
        className="rgb-input"
        style={{ width: `${rgb.r.toString().length}ch` }}
        value={rgb.r}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setRgb({ ...rgb, r: parseInt(event.target.value) || 0 });
        }}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          const isNumber: boolean = !isNaN(Number(event.key));
          isNumber && parseInt(rgb.r + event.key) < 256 && setRgb({ ...rgb, r: parseInt(rgb.r + event.key) });
        }}
      />
      <p children=", " />
      <input
        type="number"
        className="rgb-input"
        style={{ width: `${rgb.g.toString().length}ch` }}
        value={rgb.g}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setRgb({ ...rgb, g: parseInt(event.target.value) || 0 });
        }}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          const isNumber: boolean = !isNaN(Number(event.key));
          isNumber && parseInt(rgb.g + event.key) < 256 && setRgb({ ...rgb, g: parseInt(rgb.g + event.key) });
        }}
      />
      <p children=", " />
      <input
        type="number"
        className="rgb-input"
        style={{ width: `${rgb.b.toString().length}ch` }}
        value={rgb.b}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setRgb({ ...rgb, b: parseInt(event.target.value) || 0 });
        }}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          const isNumber: boolean = !isNaN(Number(event.key));
          isNumber && parseInt(rgb.b + event.key) < 256 && setRgb({ ...rgb, b: parseInt(rgb.b + event.key) });
        }}
      />
      <div className="rgb-preview" style={{ backgroundColor: `rgb(${rgb.r},${rgb.g},${rgb.b})` }} />
      <input
        type="number"
        className="rgb-input"
        style={{ width: `${intensity.toString().length}ch` }}
        value={intensity}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIntensity(parseFloat(event.target.value) || 0)}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          !isNaN(Number(event.key)) && setIntensity(parseFloat(intensity + event.key) || 0);
        }}
      />
    </>
  );
};

export default RgbSelector;
