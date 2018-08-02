import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <aol-map #map [width]="'100%'" [height]="'100%'" [map3dEnabled]="map3dEnabled">
        <aol-view [zoom]="zoom">
          <aol-coordinate [x]="5" [y]="45" [srid]="'EPSG:4326'"></aol-coordinate>
        </aol-view>
        <aol-layer-tile [opacity]="opacity">
          <aol-source-osm></aol-source-osm>
        </aol-layer-tile>
        <aol-layer-vector [opacity]="opacity">
          <aol-source-vector>
            <aol-feature>
              <aol-geometry-point>
                <aol-coordinate [x]="5" [y]="45" [srid]="'EPSG:4326'"></aol-coordinate>
              </aol-geometry-point>
              <aol-style>
                <aol-style-circle [radius]="10">
                  <aol-style-stroke [color]="'black'" [width]="width"></aol-style-stroke>
                  <aol-style-fill [color]="'green'"></aol-style-fill>
                </aol-style-circle>
              </aol-style>
            </aol-feature>
            <aol-feature>
              <aol-geometry-point>
                <aol-coordinate [x]="5.1" [y]="45.1" [srid]="'EPSG:4326'"></aol-coordinate>
              </aol-geometry-point>
              <aol-style>
                <aol-style-icon
                  [src]="'assets/marker.png'"
                  [anchor]="[0.5, 1]"
                  [anchorXUnits]="'fraction'" [anchorYUnits]="'fraction'"
                  [scale]="0.1"
                  [anchorOrigin]="'top-left'">
                </aol-style-icon>
              </aol-style>
            </aol-feature>
          </aol-source-vector>
        </aol-layer-vector>
        <aol-interaction-draw *ngIf="drawingEnabled" [type]="'Point'"></aol-interaction-draw>
        <aol-cesium-world-terrain *ngIf="terrainEnabled"></aol-cesium-world-terrain>
      </aol-map>

      <span>opacity:</span><button (click)="increaseOpacity()">+</button><button (click)="decreaseOpacity()">-</button><br>
      <span>zoom:</span><button (click)="increaseZoom()">+</button><button (click)="decreaseZoom()">-</button><br>
      <span>3D:</span><button (click)="switch3dMode()">Switch 3D mode</button><br>
      <span>Drawing:</span><button (click)="drawingEnabled = !drawingEnabled">Switch drawing</button><br>
      <span>Terrain:</span><button (click)="terrainEnabled = !terrainEnabled">Switch terrain</button>
    `,
})
export class CesiumComponent implements AfterViewInit {
  public zoom = 15;
  public opacity = 1.0;
  public width = 5;
  map3dEnabled = false;
  drawingEnabled = false;
  terrainEnabled = false;

  ngAfterViewInit() {
  }

  increaseZoom() {
    this.zoom = Math.min(this.zoom + 1, 18);
    console.log('zoom: ', this.zoom);
  }

  decreaseZoom() {
    this.zoom = Math.max(this.zoom - 1, 1);
    console.log('zoom: ', this.zoom);
  }

  increaseOpacity() {
    this.opacity = Math.min(this.opacity + 0.1, 1);
    console.log('opacity: ', this.opacity);
  }

  decreaseOpacity() {
    this.opacity = Math.max(this.opacity - 0.1, 0);
    console.log('opacity: ', this.opacity);
  }

  switch3dMode() {
    this.map3dEnabled = !this.map3dEnabled;
  }
}
