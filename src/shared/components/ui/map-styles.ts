import type { StyleSpecification } from "maplibre-gl";

const CARTO_DARK_SUBDOMAINS = ["a", "b", "c", "d"] as const;

const buildCartoTiles = (style: "dark_all" | "light_all") =>
  CARTO_DARK_SUBDOMAINS.map(
    (s) => `https://${s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}@2x.png`,
  );

const palette = {
  land: "#2a3142",
};

const cartoAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

export const mediumDarkMapStyle: StyleSpecification = {
  version: 8,
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  sources: {
    "carto-raster": {
      type: "raster",
      tiles: buildCartoTiles("dark_all"),
      tileSize: 256,
      attribution: cartoAttribution,
    },
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": palette.land },
    },
    {
      id: "carto-raster-tiles",
      type: "raster",
      source: "carto-raster",
      paint: {
        "raster-opacity": 0.55,
        "raster-saturation": -0.4,
        "raster-contrast": 0.1,
        "raster-brightness-min": 0.05,
        "raster-brightness-max": 0.55,
      },
    },
  ],
};

export const mediumLightMapStyle: StyleSpecification = {
  version: 8,
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  sources: {
    "carto-raster-light": {
      type: "raster",
      tiles: buildCartoTiles("light_all"),
      tileSize: 256,
      attribution: cartoAttribution,
    },
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "#e5e7ec" },
    },
    {
      id: "carto-raster-tiles-light",
      type: "raster",
      source: "carto-raster-light",
      paint: {
        "raster-opacity": 0.7,
        "raster-saturation": -0.3,
        "raster-contrast": 0.05,
        "raster-brightness-min": 0.25,
        "raster-brightness-max": 0.85,
      },
    },
  ],
};
