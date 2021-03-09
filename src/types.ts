export interface Tile {
  x: number;
  y: number;
  type: TileType;
}

export enum PaintMode {
  RUB = 2,
  PAINT = 1,
}

export enum TileColor {
  "GRAVEL" = "#267a94",
  "GRASS" = "#08781d",
  "BRICK" = "#636363",
  "STONE" = "#abb7ba",
}

export type TileType = "GRAVEL" | "GRASS" | "BRICK" | "STONE";

export interface Extent {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

export enum Status {
  ALPHA = "-alpha",
  BETA = "-beta",
  PRERELEASE = "-pre",
  RELEASE = "",
}
