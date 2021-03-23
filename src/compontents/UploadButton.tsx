import React from "react";
import { useGlobal } from "../context/GlobalContext";
import {
  Action,
  ActionColor,
  Cosmetic,
  CosmeticColor,
  ExportTile,
  ExportTileType,
  LightSource,
  Map,
  Tile,
  TileType,
} from "../types";

/**
 * Upload button component
 *
 * @returns JSX.Element
 */

const UploadButton: React.FC = (): JSX.Element => {
  const { setDimensions, setTiles, setLights, setActions, setCosmetics, setName } = useGlobal();
  const updateMap: Function = (json: Map) => {
    if (typeof json != "object") return console.log("[Upload/Error] Json doesn't match the expected map format");
    const height: number = json?.height;
    const width: number = json?.width;
    const name: string = json?.name || "Unnamed Map";
    if (!height || !width) return console.log("[Upload/Error] Json doesn't match the expected map format");
    const size: number = height * width;
    const tiles: Array<Tile> =
      json?.tiles
        .filter(({ x, y, type }: ExportTile) => {
          return x != undefined && y != undefined && Object.keys(ExportTileType).includes(ExportTileType[type]);
        })
        .map(({ type, ...tile }) => ({ type: ExportTileType[type] as TileType, ...tile })) || [];

    const lights: Array<LightSource> =
      json?.lights.filter(({ x, y, intensity, color }: LightSource) => {
        if (!color || typeof color != "object") return false;
        const { r, g, b } = color;
        if (r === undefined || g === undefined || b === undefined) return false;
        return x && y && intensity;
      }) || [];

    const actions: Array<Action> =
      json?.actions.filter(({ x, y, type }: Action) => {
        if (!Object.keys(ActionColor).includes(type)) return false;
        return x && y;
      }) || [];

    const cosmetics: Array<Cosmetic> =
      json?.cosmetics.filter(({ x, y, type }: Cosmetic) => {
        if (!Object.keys(CosmeticColor).includes(type)) return false;
        return x && y;
      }) || [];

    setTiles(tiles.map(({ y, ...tile }) => ({ y: height - y - 1, ...tile })));
    setDimensions({ height: height, width: width });
    setLights(lights.map(({ y, ...light }) => ({ y: height - y - 1, ...light })));
    setActions(actions.map(({ y, ...action }) => ({ y: height - y - 1, ...action })));
    setCosmetics(cosmetics.map(({ y, ...cosmetic }) => ({ y: height - y - 1, ...cosmetic })));
    setName(name);
  };

  return (
    <div className="action-button">
      <input
        id="upload_"
        style={{ display: "none" }}
        type="file"
        accept="application/json"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const files: FileList | null = event.target.files;
          if (!files) return;
          const file: File = files[0];
          if (file.type !== "application/json") return console.log("[Upload/Error] File has to be of type json");
          file.text().then((text: string) => updateMap(JSON.parse(text)));
        }}
      />
      <label htmlFor="upload_">
        <svg
          className="action-button-svg"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <polygon points="288,144 288,160 400,160 400,432 112,432 112,160 224,160 224,144 96,144 96,448 416,448 416,144   " />
          <polygon points="193.1,118.1 181.5,106.5 256,32 330.5,106.5 318.9,118.1 264.2,63.4 264.2,306.4 247.8,306.4 247.8,63.4   " />
        </svg>
      </label>
    </div>
  );
};

export default UploadButton;
