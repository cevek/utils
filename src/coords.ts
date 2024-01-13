function lon2tile(lon: number, zoom: number) {
    return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
}
function lat2tile(lat: number, zoom: number) {
    return Math.floor(
        ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
            Math.pow(2, zoom),
    );
}

export type Coords = {
    lat: number;
    lon: number;
};
export type TileCoords = {
    x: number;
    y: number;
};
export function coordToTileCoords(coords: Coords, zoom: number): TileCoords {
    return {
        x: lon2tile(coords.lon, zoom),
        y: lat2tile(coords.lat, zoom),
    };
}

