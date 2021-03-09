import React, { useEffect, useRef, useState } from "react";
import GameField from "./GameField";
import { Status, Tile, TileColor, TileType } from "../types";
import { version } from "../version";

interface DownloadProps {
  json: Array<Tile>;
}

const DownloadButton: React.FC<DownloadProps> = ({ json }): JSX.Element => {
  return (
    <div className="action-button">
      <a
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(json.sort((a, b) => a.y - b.y).sort((a, b) => (a.y === b.y ? a.x - b.x : 0)))
        )}`}
        download={`map-${new Date().getTime()}.json`}
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

interface UploadProps {
  onUpload?: (map: Array<Tile>) => void;
}

const UploadButton: React.FC<UploadProps> = ({ onUpload }): JSX.Element => {
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
          file.text().then((text: string) => {
            const json: object = JSON.parse(text);
            if (!Array.isArray(json)) return console.log("[Upload/Error] Content has to be json array");
            const mapped: Array<Tile> = json
              .filter((value: any) => value.x && value.y && value.type)
              .map((value: any) => ({ x: value.x, y: value.y, type: value.type }));
            onUpload && onUpload(mapped);
          });
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

const App: React.FC = (): JSX.Element => {
  const ref = useRef<HTMLInputElement>(null);

  const [columns, setColumns] = useState<number>(10);
  const [rows, setRows] = useState<number>(10);

  useEffect(() => setMap([]), [rows, columns]);

  const [pen, setPen] = useState<TileType>("BRICK");

  const [map, setMap] = useState<Array<Tile>>([]);

  const [uploadedMap, setUploadedMap] = useState<Array<Tile>>([]);

  useEffect(() => {
    document.addEventListener("keypress", handleKeypress);
    return () => document.removeEventListener("keypress", handleKeypress);
  }, []);

  /**
   * Handle a keypress on the document
   *
   * If the keyCode matches a given code a pen gets selected
   *
   * @param event KeyboardEvent
   *
   *  @returns void
   */

  const handleKeypress = (event: KeyboardEvent): void => {
    const gravel: number = 43;
    const grass: number = 34;
    const brick: number = 42;
    const stone: number = 231;
    event.preventDefault();
    const code: number = event.keyCode;
    if (code === gravel) setPen("GRAVEL");
    else if (code === grass) setPen("GRASS");
    else if (code === brick) setPen("BRICK");
    else if (code === stone) setPen("STONE");
  };

  return (
    <main className="main" ref={ref}>
      <div className="version" children={version(Status.PRERELEASE)} />
      <header className="title-container">
        <div className="title-subcontainer">
          <p className="title-element" children="serint-maps" />
          <div className="title-element size-container">
            <input
              type="number"
              className="size-input"
              style={{ width: `${columns.toString().length}ch` }}
              value={columns}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setColumns(parseInt(event.target.value) || 0)}
            />
            <p children="x" />
            <input
              type="number"
              className="size-input"
              style={{ width: `${rows.toString().length}ch` }}
              value={rows}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRows(parseInt(event.target.value) || 0)}
            />
          </div>
        </div>
        <div className="title-subcontainer">
          <div className="title-element button-container">
            {Object.entries(TileColor).map(([key, value], index) => {
              return (
                <button
                  className="title-element button"
                  key={index}
                  style={{ borderColor: pen === key ? value : "" }}
                  children={key[0] + key.substr(1).toLowerCase()}
                  onClick={() => setPen(key as TileType)}
                />
              );
            })}
          </div>
        </div>
        <div className="title-subcontainer">
          <DownloadButton json={map} />
          <UploadButton
            onUpload={async (map: Array<Tile>) => {
              const x: number = Math.max(...map.map(({ x }) => x)) + 2;
              const y: number = Math.max(...map.map(({ y }) => y)) + 2;
              setColumns(x);
              setRows(y);
              setUploadedMap(map);
            }}
          />
        </div>
      </header>
      <GameField
        upload={uploadedMap}
        pen={pen}
        rows={rows}
        columns={columns}
        onRedraw={(map: Array<Tile>) => setMap(map)}
        onChange={(tile: Tile) => {
          setMap([...map.filter(({ x, y }: Tile) => !(tile.x === x && tile.y === y)), { ...tile }]);
        }}
        onDelete={({ x, y }) => setMap(map.filter((tile: Tile) => !(tile.x === x && tile.y === y)))}
      />
    </main>
  );
};

export default App;
