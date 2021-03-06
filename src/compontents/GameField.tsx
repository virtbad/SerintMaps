import React, { useEffect, useRef, useState } from "react";
import { Tile, PaintMode, TileType, TileColor, Extent } from "../types";

interface Props {
  rows: number;
  columns: number;
  pen: TileType;
  onChange?: (field: Tile) => void;
  onDelete?: ({ x, y }: { x: number; y: number }) => void;
}

const GameField: React.FC<Props> = ({ rows, columns, pen, onChange, onDelete }): JSX.Element => {
  const [dimensions, setDimensions] = useState<{ height: number; width: number }>({
    height: window.innerHeight - 192,
    width: window.innerWidth - 192,
  });

  const [map, setMap] = useState<Array<Tile>>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const color: string = TileColor[pen];

  const singleColumn: number = dimensions.width / columns;
  const singleRow: number = dimensions.height / rows;

  const width: number = singleColumn > singleRow ? singleRow * columns : dimensions.width;
  const height: number = singleRow > singleColumn ? singleColumn * rows : dimensions.height;

  const canvas: HTMLCanvasElement | null = canvasRef.current;
  const rect: DOMRect | undefined = canvas?.getBoundingClientRect();
  const context: CanvasRenderingContext2D | null | undefined = canvas?.getContext("2d");

  const paintExtent: number = 1.5;
  const rubExtent: number = 0.75;

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => setDimensions({ height: window.innerHeight - 192, width: window.innerWidth - 192 });

  const draw: Function = (x: number, y: number, color: string, extent: Extent = {}): void => {
    if (!context) return;
    const { bottom = 0, left = 0, right = 0, top = 0 } = extent;
    const size: number = height / rows;
    context.fillStyle = color;
    context.lineWidth = 0;
    context.fillRect(x * size - left, y * size - top, size + left + right, size + top + bottom);
  };

  const paintElement: Function = (x: number, y: number, tile: TileType) => {
    const size: number = height / rows;
    const posX: number = Math.floor(x / size);
    const posY: number = Math.floor(y / size);
    if (posX > columns - 1 || posY > rows - 1 || posX < 0 || posY < 0) return;
    const top: number = map.find(({ x, y }) => x === posX && y === posY - 1) ? paintExtent : 0;
    const bottom: number = map.find(({ x, y }) => x === posX && y === posY + 1) ? paintExtent : 0;
    const left: number = map.find(({ x, y }) => x === posX - 1 && y === posY) ? paintExtent : 0;
    const right: number = map.find(({ x, y }) => x === posX + 1 && y === posY) ? paintExtent : 0;

    draw(posX, posY, TileColor[tile], {
      top: top,
      bottom: bottom,
      left: left,
      right: right,
    });
    if (!map.find(({ x, y }) => x === posX && y === posY)) setMap([...map, { x: posX, y: posY, type: tile }]);
    else setMap(map.map(({ type, ...pos }) => ({ ...pos, type: pos === { x: posX, y: posY } ? tile : type })));
    onChange && onChange({ x: posX, y: posY, type: tile });
  };

  const rubElement: Function = (x: number, y: number) => {
    const size: number = height / rows;
    const posX: number = Math.floor(x / size);
    const posY: number = Math.floor(y / size);

    const top: Tile | undefined = map.find(({ x, y }) => x === posX && y === posY - 1);
    const bottom: Tile | undefined = map.find(({ x, y }) => x === posX && y === posY + 1);
    const left: Tile | undefined = map.find(({ x, y }) => x === posX - 1 && y === posY);
    const right: Tile | undefined = map.find(({ x, y }) => x === posX + 1 && y === posY);

    draw(posX, posY, "#ffffff", {
      top: rubExtent,
      bottom: rubExtent,
      left: rubExtent,
      right: rubExtent,
    });

    draw(posX, posY - 1, top ? TileColor[top.type] : "#ffffff");
    draw(posX, posY + 1, bottom ? TileColor[bottom.type] : "#ffffff");
    draw(posX - 1, posY, left ? TileColor[left.type] : "#ffffff");
    draw(posX + 1, posY, right ? TileColor[right.type] : "#ffffff");

    setMap(map.filter((tile: Tile) => !(tile.x === posX && tile.y === posY)));
    onDelete && onDelete({ x: posX, y: posY });
  };

  useEffect(() => {
    map.forEach((tile: Tile) => {
      const top: number = map.find(({ x, y }) => x === tile.x && y === tile.y - 1) ? paintExtent : 0;
      const bottom: number = map.find(({ x, y }) => x === tile.x && y === tile.y + 1) ? paintExtent : 0;
      const left: number = map.find(({ x, y }) => x === tile.x - 1 && y === tile.y) ? paintExtent : 0;
      const right: number = map.find(({ x, y }) => x === tile.x + 1 && y === tile.y) ? paintExtent : 0;
      draw(tile.x, tile.y, TileColor[tile.type], {
        top: top,
        bottom: bottom,
        left: left,
        right: right,
      });
    });
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      height={height}
      width={width}
      className="map-container"
      onContextMenu={(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        event.preventDefault();
        const x: number = event.clientX - (rect?.left || 0);
        const y: number = event.clientY - (rect?.top || 0);
        const hex: string = toHEX(context?.getImageData(x, y, 1, 1).data);
        if (hex !== "#ffffff" && hex !== "#000000") rubElement(x, y);
      }}
      onClick={(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const x: number = event.clientX - (rect?.left || 0);
        const y: number = event.clientY - (rect?.top || 0);
        const hex: string = toHEX(context?.getImageData(x, y, 1, 1).data);
        if (color.startsWith(hex.substr(0, 6))) return;
        else paintElement(x, y, pen);
      }}
      onMouseMove={(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (event.buttons !== 1 && event.buttons !== 2) return;
        const mode: PaintMode = event.buttons;
        const x: number = event.clientX - (rect?.left || 0);
        const y: number = event.clientY - (rect?.top || 0);
        const hex: string = toHEX(context?.getImageData(x, y, 1, 1).data);
        if (mode === PaintMode.RUB) hex !== "#ffffff" && hex !== "#000000" && rubElement(x, y);
        else if (color.startsWith(hex.substr(0, 6))) return;
        else paintElement(x, y, pen);
        console.log(color, hex);
      }}
    />
  );
};

function toHEX(rgba?: Uint8ClampedArray) {
  if (!rgba) return "#ffffff";
  return "#" + ((1 << 24) + (rgba[0] << 16) + (rgba[1] << 8) + rgba[2]).toString(16).slice(1);
}

export default GameField;
