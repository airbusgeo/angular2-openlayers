/**
 * This model should be temporary. It is here to compensate the lack of typings for ol library.
 * Such work is beeing done on OpenLayers side (see https://github.com/openlayers/openlayers/pull/8345)
 */

import { Feature, Image, Tile } from 'ol';
import { Style } from 'ol/style';
import { Layer } from 'ol/layer';
import { Geometry } from 'ol/geom';
import MapBrowserEvent from 'ol/MapBrowserEvent';


export type Extent = [number, number, number, number];

export type Coordinate = [number, number];

export type CoordinateFormat = (coord: Coordinate) => string;

export type ProjectionLike = string;

export type StyleFunction = (feature: Feature, resolution: number) => Style | Array<Style>;

export type OverlayPositioning = Object;

export type Size = [number, number];

export type TileLoadFunction = (tile: Tile, url: string) => void;

export type ImageLoadFunction = (image: Image, src: string) => void;

export type Attribution = () => (string | Array<string>);

export type AttributionLike = string | Array<string> | Attribution;

export type Pixel = [number, number, number, number];

export type RasterOperation = ((pixels: Array<Pixel>, data: any) => Pixel) | ((images: Array<ImageData>, data: any) => ImageData);

export type TileCoord = [number, number, number];

export type LoadingStrategy = (extent: Extent, resolution: number) => Array<Extent>;

export type TileUrlFunction = (coord: TileCoord) => string;

export type Color = [number, number, number, number];

export type ColorLike = string | CanvasPattern | CanvasGradient;

export type StyleGeometryFunction = (feature: Feature) => Geometry;

export type EventsCondition = (event: MapBrowserEvent) => boolean;

export type DragBoxEndCondition = (event: MapBrowserEvent, p: Pixel, q: Pixel) => boolean;

export type DrawGeometryFunction = (coords: Array<Coordinate>, geometry?: Geometry) => Geometry;

export type SelectFilterFunction = (feature: Feature, layer: Layer) => boolean;
