export interface Map {
  height: number;
  width: number;
  name: string;
  tiles: Array<ExportTile>;
  lights: Array<LightSource>;
  actions: Array<Action>;
  cosmetics: Array<Cosmetic>;
}

export interface Tile extends Point {
  type: TileType;
}

export interface ExportTile extends Point {
  type: ExportTileType;
}

export enum ExportTileType {
  "STONE" = 1,
  "GRASS" = 2,
  "GRAVEL" = 3,
  "BRICK" = 0,
}

export interface LightSource extends Point {
  color: RGB;
  intensity: number;
}

export interface Action extends Point {
  type: ActionType;
}

export interface Cosmetic extends Point {
  type: CosmeticType;
}

export interface Point {
  x: number;
  y: number;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
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

export enum ModeColor {
  "COSMETIC" = "#a83291",
  "ACTION" = "#4632a8",
  "LIGHT" = "#329ca8",
  "TILE" = "#32a867",
}

export enum ActionColor {
  "ITEM" = "#ad19cf",
  "SPAWN" = "#cf7119",
}

export enum CosmeticColor {
  "COBWEB" = "#a89032",
  "CRACK" = "#a83250",
}

export type TileType = "GRAVEL" | "GRASS" | "BRICK" | "STONE";

export type ActionType = "ITEM" | "SPAWN";

export type CosmeticType = "COBWEB" | "CRACK";

export type Mode = "COSMETIC" | "ACTION" | "LIGHT" | "TILE";

export enum Status {
  ALPHA = "-alpha",
  BETA = "-beta",
  PRERELEASE = "-pre",
  RELEASE = "",
}
