# [SerintMaps](https://maps.serint.ga)

> [![Netlify Status](https://api.netlify.com/api/v1/badges/45ccb44a-e8d3-45f5-ace2-a00a8137f821/deploy-status)](https://app.netlify.com/sites/serint-maps/deploys)

> A map generator tool for the Serint project.

## Related
* [SerintServer](https://github.com/virtbad/SerintServer) - Server for the Serint project
* [SerintClient](https://github.com/virtbad/SerintClient) - Client for the Serint project

## Functions

### Download and Upload

There is a download and upload function. When you're finished with your map you can simply use the download button to download the map. The structure of the map can you find [here](https://github.com/virtbad/SerintMaps#Map). The same way you can upload a map json to edit it further. Before uploading a map you should make sure the json file matches the expected [map pattern](https://github.com/virtbad/SerintMaps#Map). If it doesn't match you won't be able to upload the map.

### Sizing

It is possible to adjust the size of the map. The map doesn't have to be squared but it will be always rectangular since you can only set the height and width of the map. The hight and width values represent how many tiles high resp. how many tiles wide the map is. Be aware that the map will be resetted when changing the height or width.
If you want to change the size of an existing map there is an unrecommended approach to achieve this. First, download the map. Then edit the height resp. the width in an editor and reupload the map. This method is not recommended because it can destroy your map.

## Modes

The paint mode can be changed at the bottom of the page. Different modes create different things e.g. light sources, tiles or action fields

### Tile

> The tile mode draws map tiles which will be replaced with game textures

When selected, you'll be able to select between different [TileTypes](https://github.com/virtbad/SerintMaps#TileType) to create a diversified map.

### Light

> The light mode creates light sources which will be used to add lightning to the game

When selected, you'll be able to change the color of the light using rgb. To change the strength of the light source you'll be able to edit the intensity which determinates how many tiles the radius of the light reaches.

### Action

> The action mode changes a normal tile to an action tile

When selected, you'll be able to select between different [ActionTypes](https://github.com/virtbad/SerintMaps#ActionType) to give them a functionality - for example you can mark which tiles should be player spawnpoints.

### Cosmetic

> The cosmetic mode allows the game to render cosmetic elements at this tile

When selected, you'll be able to enter an integer cosmetic type to allow the game to render additional cosmetic textures on this texture - for example a cobweb.

## Types

### Map

```TS
interface Map {
  height: number; //height of the map [in tiles]
  width: number; //width of the map [in tiles]
  name: string; //name of the map
  tiles: Array<Tile>; //tiles of the map
  lights: Array<LightSource>; //light sources of the map
  actions: Array<Action>; //action fields of the map
  cosmetics: Array<Cosmetic>; //cosmetic fields of the map
}
```

### Tile

```TS
interface Tile {
  x: number; //x coordinate of the Tile
  y: number; //y coordinate of the Tile
  type: TileType; //type of the Tile
}
```

#### TileType

```TS
type TileType = "GRAVEL" | "GRASS" | "BRICK" | "STONE";
```

### LightSource

```TS
interface LightSource {
  x: number; //x coordinate of the Tile
  y: number; //y coordinate of the Tile
  intensity: number; //intensity of the light [radius in tiles]
  color: { r: number; g: number; b: number }; //color of the light
}
```

### Action

```TS
interface Action {
  x: number; //x coordinate of the Tile
  y: number; //y coordinate of the Tile
  type: ActionType; //type of the Action
}
```

#### ActionType

```TS
type ActionType = "ITEM" | "SPAWN";
```

### Cosmetic

```TS
interface Cosmetic {
  x: number; //x coordinate of the Tile
  y: number; //y coordinate of the Tile
  type: number; //integer type of the Cosmetic
}
```

## License

MIT © [VirtBad](https://github.com/virtbad/)
