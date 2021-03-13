import React, { createContext, useContext, useState } from "react";
import { Action, ActionType, Cosmetic, CosmeticType, LightSource, Mode, RGB, Tile, TileType } from "../types";

interface Global {
  mode: Mode;
  pen: TileType;
  rgb: RGB;
  intensity: number;
  action: ActionType;
  cosmetic: CosmeticType;
  tiles: Array<Tile>;
  lights: Array<LightSource>;
  actions: Array<Action>;
  cosmetics: Array<Cosmetic>;
  dimensions: { height: number; width: number };
  setMode: (mode: Mode) => void;
  setPen: (pen: TileType) => void;
  setRgb: (rgb: RGB) => void;
  setIntensity: (intensity: number) => void;
  setAction: (action: ActionType) => void;
  setCosmetic: (cosmetic: CosmeticType) => void;
  setTiles: (tiles: Array<Tile>) => void;
  setLights: (lights: Array<LightSource>) => void;
  setActions: (actions: Array<Action>) => void;
  setCosmetics: (cosmetics: Array<Cosmetic>) => void;
  setDimensions: (dimensions: { height: number; width: number }) => void;
}

const defaultValue: Global = {
  mode: "TILE",
  pen: "STONE",
  rgb: { r: 0, g: 0, b: 255 },
  intensity: 2,
  action: "ITEM",
  cosmetic: "CRACK",
  tiles: [],
  lights: [],
  actions: [],
  cosmetics: [],
  dimensions: { width: 10, height: 10 },
  setMode: () => {},
  setPen: () => {},
  setRgb: () => {},
  setIntensity: () => {},
  setAction: () => {},
  setCosmetic: () => {},
  setTiles: () => {},
  setLights: () => {},
  setActions: () => {},
  setCosmetics: () => {},
  setDimensions: () => {},
};

export const GlobalContext = createContext<Global>(defaultValue);

export const GlobalProvider: React.FC = ({ children }): JSX.Element => {
  const [mode, updateMode] = useState<Mode>(defaultValue.mode);
  const [pen, updatePen] = useState<TileType>(defaultValue.pen);
  const [rgb, updateRgb] = useState<RGB>(defaultValue.rgb);
  const [intensity, updateIntensity] = useState<number>(defaultValue.intensity);
  const [action, updateAction] = useState<ActionType>(defaultValue.action);
  const [cosmetic, updateCosmetic] = useState<CosmeticType>(defaultValue.cosmetic);
  const [tiles, updateTiles] = useState<Array<Tile>>(defaultValue.tiles);
  const [lights, updateLights] = useState<Array<LightSource>>(defaultValue.lights);
  const [actions, updateActions] = useState<Array<Action>>(defaultValue.actions);
  const [cosmetics, updateCosmetics] = useState<Array<Cosmetic>>(defaultValue.cosmetics);
  const [dimensions, updateDimensions] = useState<{ height: number; width: number }>(defaultValue.dimensions);

  const setMode = (m: Mode) => m !== mode && updateMode(m);

  const setPen = (p: TileType) => p !== pen && updatePen(p);

  const setRgb = (c: RGB) => c !== rgb && updateRgb(c);

  const setIntensity = (i: number) => i !== intensity && updateIntensity(i);

  const setAction = (a: ActionType) => a !== action && updateAction(a);

  const setCosmetic = (c: CosmeticType) => c !== cosmetic && updateCosmetic(c);

  const setTiles = (t: Array<Tile>) => t !== tiles && updateTiles(t);

  const setLights = (l: Array<LightSource>) => l !== lights && updateLights(l);

  const setActions = (a: Array<Action>) => a !== actions && updateActions(a);

  const setCosmetics = (c: Array<Cosmetic>) => c !== cosmetics && updateCosmetics(c);

  const setDimensions = (d: { height: number; width: number }) => d !== dimensions && updateDimensions(d);

  return (
    <GlobalContext.Provider
      value={{
        mode: mode,
        pen: pen,
        rgb: rgb,
        intensity: intensity,
        action: action,
        cosmetic: cosmetic,
        tiles: tiles,
        lights: lights,
        actions: actions,
        cosmetics: cosmetics,
        dimensions: dimensions,
        setMode: setMode,
        setPen: setPen,
        setRgb: setRgb,
        setIntensity: setIntensity,
        setAction: setAction,
        setCosmetic: setCosmetic,
        setTiles: setTiles,
        setLights: setLights,
        setActions: setActions,
        setCosmetics: setCosmetics,
        setDimensions: setDimensions,
      }}
      children={children}
    />
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider.");
  }
  return context;
};

export default GlobalContext;
