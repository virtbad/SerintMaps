import React, { useEffect, useRef, useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import {
  Tile,
  TileColor,
  LightSource,
  Action,
  TileType,
  RGB,
  ActionType,
  ActionColor,
  Cosmetic,
  CosmeticType,
  CosmeticColor,
} from "../types";

const GameField: React.FC = (): JSX.Element => {
  const {
    tiles,
    setTiles,
    lights,
    setLights,
    actions,
    setActions,
    cosmetics,
    setCosmetics,
    action,
    cosmetic,
    intensity,
    rgb,
    dimensions: { height, width },
    pen,
    setPen,
    mode,
  } = useGlobal();

  const [dimensions, setDimensions] = useState<{ height: number; width: number }>({
    height: window.innerHeight - 192,
    width: window.innerWidth - 192,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const singleColumn: number = dimensions.width / width;
  const singleRow: number = dimensions.height / height;

  const sWidth: number = singleColumn > singleRow ? singleRow * width : dimensions.width;
  const sHeight: number = singleRow > singleColumn ? singleColumn * height : dimensions.height;
  const size: number = sHeight / height;

  const canvas: HTMLCanvasElement | null = canvasRef.current;
  const rect: DOMRect | undefined = canvas?.getBoundingClientRect();
  const context: CanvasRenderingContext2D | null | undefined = canvas?.getContext("2d");

  useEffect(() => {
    setPen("BRICK");
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Resize handler to adjust the size of the canvas
   *
   * @returns void
   */

  const handleResize = (): void => setDimensions({ height: window.innerHeight - 192, width: window.innerWidth - 192 });

  /**
   * Redraw the whole map
   *
   * @returns void
   */

  const redraw: Function = (): void => {
    if (!canvas || !context) return;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.height, canvas.width);
    tiles.forEach(({ x, y, type }: Tile) => drawTile(x, y, type));
    cosmetics.forEach(({ x, y, type }: Cosmetic) => drawCosmetic(x, y, type));
    actions.forEach(({ x, y, type }: Action) => drawAction(x, y, type));
    lights.forEach(({ x, y, intensity, color }: LightSource) => drawLight(x, y, intensity, color));
  };

  /**
   * Paint or repaint a tile on the canvas
   *
   * The parameter coordinates are not the pixel coordinates
   *
   * they are the coordinates of the square on the field
   *
   * @param x x coordinate of the square to be painted
   *
   * @param y y coordinate of the square to be painted
   *
   * @param type TileType to get the color
   *
   * @returns void
   */

  const drawTile: Function = (x: number, y: number, type: TileType): void => {
    if (!context) return;
    context.fillStyle = TileColor[type];
    context.lineWidth = 0;
    context.fillRect(x * size - 0.5, y * size - 0.5, size + 1, size + 1);
  };

  /**
   * Paint a light source on the canvas
   *
   * @param x x coordinate of the light source in the canvas
   *
   * @param y y coordinate of the light source in the canvas
   *
   * @param intensity intensity of the light source
   *
   * @param color color of the light source [RGB]
   *
   * @returns void
   */

  const drawLight: Function = (x: number, y: number, intensity: number, rgb: RGB): void => {
    if (!context) return;
    const crossLength: number = size * 0.2;
    context.strokeStyle = "#000000";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(x * size - crossLength / 2, y * size - crossLength / 2);
    context.lineTo(x * size + crossLength / 2, y * size + crossLength / 2);
    context.stroke();
    context.beginPath();
    context.moveTo(x * size + crossLength / 2, y * size - crossLength / 2);
    context.lineTo(x * size - crossLength / 2, y * size + crossLength / 2);
    context.stroke();
    const color: string = toHEX([rgb.r, rgb.g, rgb.b]);
    context.strokeStyle = color;
    context.fillStyle = color;
    context.beginPath();
    context.arc(x * size, y * size, intensity * size, 0, 2 * Math.PI);
    context.stroke();
  };

  /**
   * Paint or repaint a action on the canvas
   *
   * @param x x coordinate of the square to be painted
   *
   * @param y y coordinate of the square to be painted
   *
   * @param type ActionType to get the color
   *
   * @returns void
   */

  const drawAction: Function = (x: number, y: number, type: ActionType): void => {
    if (!context) return;
    context.strokeStyle = ActionColor[type];
    context.lineWidth = 3;
    context.strokeRect(x * size, y * size, size, size);
  };

  /**
   * Paint or repaint a cosmetic on the canvas
   *
   * The parameter coordinates are not the pixel coordinates
   *
   * they are the coordinates of the square on the field
   *
   * @param x x coordinate of the square to be painted
   *
   * @param y y coordinate of the square to be painted
   *
   * @param type CosmeticType to get the color
   *
   * @returns void
   */

  const drawCosmetic: Function = (x: number, y: number, type: CosmeticType): void => {
    if (!context) return;
    const lines: number = size > 50 ? 5 : 2; //(amount of lines / 2 ) - 1
    context.strokeStyle = CosmeticColor[type];
    context.lineWidth = 1;
    for (let i = 0; i < lines; i++) {
      const section: number = (size / lines) * i;
      context.beginPath();
      context.moveTo((x + 1) * size - section, y * size);
      context.lineTo(x * size, (y + 1) * size - section);
      context.stroke();
      if (i !== 0) {
        context.beginPath();
        context.moveTo((x + 1) * size, y * size + section);
        context.lineTo(x * size + section, (y + 1) * size);
        context.stroke();
      }
    }
  };

  /**
   * Handler for any paint event
   *
   * @param event React.MouseEvent<HTMLCanvasElement, MouseEvent>
   *
   * @returns void
   */

  const handlePaint = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
    const x: number = event.clientX - (rect?.left || 0);
    const y: number = event.clientY - (rect?.top || 0);
    const fieldX: number = Math.floor(x / size);
    const fieldY: number = Math.floor(y / size);
    if (!verifyPaint(x, y)) return;
    switch (mode) {
      case "TILE":
        setTiles([
          ...tiles.filter(({ x, y }: Tile) => !(fieldX === x && fieldY === y)),
          { x: fieldX, y: fieldY, type: pen },
        ]);
        break;
      case "LIGHT":
        setLights([
          ...lights.filter((light: LightSource) => !(light.x === x / size && light.y === y / size)),
          { x: x / size, y: y / size, intensity: intensity, color: rgb },
        ]);
        break;
      case "ACTION":
        setActions([
          ...actions.filter(({ x, y }: Action) => !(fieldX === x && fieldY === y)),
          { x: fieldX, y: fieldY, type: action },
        ]);
        break;
      case "COSMETIC":
        setCosmetics([
          ...cosmetics.filter(({ x, y }: Cosmetic) => !(fieldX === x && fieldY === y)),
          {
            x: fieldX,
            y: fieldY,
            type: cosmetic,
          },
        ]);
        break;
    }
  };

  /**
   * Handler for any rub event
   *
   * @param event React.MouseEvent<HTMLCanvasElement, MouseEvent>
   *
   * @returns void
   */

  const handleRub = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
    const x: number = event.clientX - (rect?.left || 0);
    const y: number = event.clientY - (rect?.top || 0);
    const fieldX: number = Math.floor(x / size);
    const fieldY: number = Math.floor(y / size);
    if (!verifyRub(x, y)) return;
    switch (mode) {
      case "TILE":
        setActions(actions.filter(({ x, y }: Action) => !(x === fieldX && y === fieldY)));
        setCosmetics(cosmetics.filter(({ x, y }: Cosmetic) => !(x === fieldX && y === fieldY)));
        setTiles(tiles.filter(({ x, y }: Tile) => !(x === fieldX && y === fieldY)));
        break;
      case "LIGHT":
        setLights(
          lights.filter((light: LightSource) => {
            const tr: number = 5; //tolerance radius to delete light source
            const lx: number = light.x;
            const ly: number = light.y;
            return !(lx * size >= x - tr && lx * size <= x + tr && ly * size >= y - tr && ly * size <= y + tr);
          })
        );
        break;
      case "ACTION":
        setActions(actions.filter(({ x, y }: Action) => !(x === fieldX && y === fieldY)));
        break;
      case "COSMETIC":
        setCosmetics(cosmetics.filter(({ x, y }: Cosmetic) => !(x === fieldX && y === fieldY)));
        break;
    }
  };

  useEffect(() => redraw(), [tiles, lights, actions, cosmetics, dimensions]);

  /**
   * Method to prevent calling the same rub event on a tile multiple times
   *
   * on dragging over to prevent lag
   *
   * @param x x coordinate of the mouse in the canvas
   *
   * @param y y coordinate of the mouse in the canvas
   *
   * @returns boolean
   */

  const verifyRub: Function = (x: number, y: number): boolean => {
    const fieldX: number = Math.floor(x / size);
    const fieldY: number = Math.floor(y / size);
    const tile: Tile | undefined = tiles.find(({ x, y }) => x === fieldX && y === fieldY);
    const action: Action | undefined = actions.find(({ x, y }) => x === fieldX && y === fieldY);
    const cosmetic: Cosmetic | undefined = cosmetics.find(({ x, y }) => x === fieldX && y === fieldY);
    if (fieldX >= width || fieldX < 0 || fieldY < 0 || fieldY >= height) return false;

    switch (mode) {
      case "TILE":
        return !!tile;
      case "LIGHT":
        const tr: number = 5; //tolerance radius to delete light source
        return !!lights.find((light: LightSource) => {
          const lx: number = light.x;
          const ly: number = light.y;
          return lx * size >= x - tr && lx * size <= x + tr && ly * size >= y - tr && ly * size <= y + tr;
        });
      case "ACTION":
        return !!tile && !!action;
      case "COSMETIC":
        return !!tile && !!cosmetic;
    }
  };

  /**
   * Method to prevent calling the same paint event on a tile multiple times
   *
   * on dragging over to prevent lag
   *
   * @param x x coordinate of the mouse in the canvas
   *
   * @param y y coordinate of the mouse in the canvas
   *
   * @returns boolean
   */

  const verifyPaint: Function = (x: number, y: number): boolean => {
    const fieldX: number = Math.floor(x / size);
    const fieldY: number = Math.floor(y / size);
    const tile: Tile | undefined = tiles.find(({ x, y }) => x === fieldX && y === fieldY);
    const actionField: Action | undefined = actions.find(({ x, y }) => x === fieldX && y === fieldY);
    const cosmeticField: Cosmetic | undefined = cosmetics.find(({ x, y }) => x === fieldX && y === fieldY);
    if (fieldX >= width || fieldX < 0 || fieldY < 0 || fieldY >= height) return false;

    switch (mode) {
      case "TILE":
        if (!context) return false;
        if (!tile) return true;
        else return !(tile.type === pen);
      case "LIGHT":
        return true;
      case "ACTION":
        if (!context || !tile) return false;
        if (!actionField) return true;
        else return !(actionField.type === action);
      case "COSMETIC":
        if (!context || !tile) return false;
        if (!cosmeticField) return true;
        else return !(cosmeticField.type === cosmetic);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      height={sHeight}
      width={sWidth}
      className="map-container"
      onContextMenu={handleRub}
      onClick={handlePaint}
      onMouseMove={(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (event.buttons === 1) handlePaint(event);
        else if (event.buttons === 2) handleRub(event);
      }}
    />
  );
};

/**
 * Function to get the hex value of a rgba color
 *
 * @param rgba Uint8ClampedArray
 *
 * @returns string
 */

const toHEX: Function = (rgba?: Uint8ClampedArray): string => {
  if (!rgba) return "#ffffff";
  return "#" + ((1 << 24) + (rgba[0] << 16) + (rgba[1] << 8) + rgba[2]).toString(16).slice(1);
};

/**
 * Function to get the rgb value of a hex color
 *
 * @param hex string
 *
 * @returns object
 */

const toRGB: Function = (hex: string): { r: number; g: number; b: number } => {
  const result: RegExpExecArray | null = /^#?([a-fd0-9]{2})([a-fd0-9]{2})([a-fd0-9]{2})$/i.exec(hex);
  if (result) return { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) };
  else return { r: 255, g: 255, b: 255 };
};

export default GameField;
