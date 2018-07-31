import { Component, Host, forwardRef, Input, AfterContentInit, Optional } from '@angular/core';
import { OSM } from 'ol/source';
import { LayerTileComponent } from '../layers/layertile.component';
import { SourceComponent } from './source.component';
import { SourceXYZComponent } from './xyz.component';
import { SourceRasterComponent } from './raster.component';
import { AttributionLike, TileLoadFunction } from '../../ol-models';

@Component({
  selector: 'aol-source-osm',
  template: `<div class="aol-source-osm"></div>`,
  providers: [{ provide: SourceComponent, useExisting: forwardRef(() => SourceOsmComponent) }],
})
export class SourceOsmComponent extends SourceXYZComponent implements AfterContentInit {
  instance: OSM;

  @Input()
  attributions: AttributionLike;
  @Input()
  cacheSize: number;
  @Input()
  crossOrigin: string;
  @Input()
  maxZoom: number;
  @Input()
  opaque: boolean;
  @Input()
  reprojectionErrorThreshold: number;
  @Input()
  tileLoadFunction: TileLoadFunction;
  @Input()
  url: string;
  @Input()
  wrapX: boolean;

  constructor(
    @Host()
    @Optional()
    layer: LayerTileComponent,
    @Host()
    @Optional()
    raster?: SourceRasterComponent
  ) {
    super(layer, raster);
  }

  ngAfterContentInit() {
    if (this.tileGridXYZ) {
      this.tileGrid = this.tileGridXYZ.instance;
    }
    this.instance = new OSM(this);
    this._register(this.instance);
  }
}
