import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { createXYZ } from 'ol/tilegrid';
import TileGrid from 'ol/tilegrid/TileGrid';
import { Coordinate, Extent, Size } from '../ol-models';

@Component({
  selector: 'aol-tilegrid',
  template: '',
})
export class TileGridComponent implements OnInit, OnChanges {
  instance: TileGrid;

  @Input()
  extent: Extent;
  @Input()
  maxZoom: number;
  @Input()
  minZoom: number;
  @Input()
  tileSize: number | Size;
  @Input()
  origin?: Coordinate;
  @Input()
  resolutions: number[];

  ngOnInit() {
    if (!this.resolutions) {
      this.instance = createXYZ(this);
    } else {
      this.instance = new TileGrid(this);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.resolutions) {
      this.instance = createXYZ(this);
    } else {
      this.instance = new TileGrid(this);
    }
  }
}
