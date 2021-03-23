import React from "react";
import { useGlobal } from "../context/GlobalContext";
import { ExportTileType, Map } from "../types";

/**
 * Download button component
 *
 * @returns JSX.Element
 */

const DownloadButton: React.FC = (): JSX.Element => {
  const {
    tiles,
    dimensions: { width, height },
    actions,
    lights,
    cosmetics,
    name,
  } = useGlobal();
  const map: Map = {
    height: height,
    width: width,
    name: name,
    tiles: tiles
      .sort((a, b) => a.y - b.y)
      .sort((a, b) => (a.y === b.y ? a.x - b.x : 0))
      .map(({ x, y, type }) => ({ y: height - y - 1, x: x, type: ExportTileType[type] })),
    lights: lights
      .sort((a, b) => a.y - b.y)
      .sort((a, b) => (a.y === b.y ? a.x - b.x : 0))
      .map(({ y, ...light }) => ({ y: height - y - 1, ...light })),
    actions: actions
      .sort((a, b) => a.y - b.y)
      .sort((a, b) => (a.y === b.y ? a.x - b.x : 0))
      .map(({ y, ...action }) => ({ y: height - y - 1, ...action })),
    cosmetics: cosmetics
      .sort((a, b) => a.y - b.y)
      .sort((a, b) => (a.y === b.y ? a.x - b.x : 0))
      .map(({ y, ...cosmetic }) => ({ y: height - y - 1, ...cosmetic })),
  };

  return (
    <div className="action-button">
      <a
        href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(map))}`}
        download={`${name}-${new Date().getTime()}.json`}
      >
        <svg
          className="action-button-svg"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <polygon points="288,144 288,160 400,160 400,432 112,432 112,160 224,160 224,144 96,144 96,448 416,448 416,144   " />
          <polygon points="193.1,252.3 181.5,263.9 256,338.4 330.5,263.9 318.9,252.3 264.2,307 264.2,64 247.8,64 247.8,307   " />
        </svg>
      </a>
    </div>
  );
};

export default DownloadButton;
