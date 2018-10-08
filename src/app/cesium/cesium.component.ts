import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Feature } from 'ol';
import Projection from 'ol/proj/Projection';
import { fromExtent, Polygon } from 'ol/geom/Polygon';
import { transform } from 'ol/proj';
import { MapComponent } from 'ngx-openlayers';
import OLCesium from 'ol-cesium';

declare var Cesium;

@Component({
  selector: 'app-root',
  template: `
      <aol-map #map [width]="'100%'" [height]="'100%'">
        <aol-interaction-default></aol-interaction-default>
        <aol-interaction-draw
          *ngIf="drawingEnabled"
          type="Point"
          (onDrawEnd)="endDraw($event.feature)">
        </aol-interaction-draw>

        <aol-view [zoom]="zoom">
          <aol-coordinate [x]="5" [y]="45" [srid]="'EPSG:4326'"></aol-coordinate>
        </aol-view>
        <aol-layer-tile [opacity]="opacity">
          <aol-source-osm></aol-source-osm>
        </aol-layer-tile>

        <aol-layer-vector *ngIf="feature">
          <aol-source-vector>
            <aol-feature>
              <aol-geometry-point>
                <aol-coordinate
                  [x]="feature.geometry.coordinates[0]" [y]="feature.geometry.coordinates[1]"
                  [srid]="'EPSG:4326'">
                </aol-coordinate>
              </aol-geometry-point>
            </aol-feature>
          </aol-source-vector>
        </aol-layer-vector>
      </aol-map>

      <span>3D:</span>
      <button (click)="switch3dMode()">{{ map3dEnabled ? 'Show 2D map' : 'Show 3D globe' }}</button><br>
      <span>Drawing:</span>
      <button (click)="drawingEnabled = !drawingEnabled">{{ drawingEnabled ? 'Disable' : 'Enable' }} drawing</button><br>
      <span>Terrain:</span>
      <button (click)="terrainEnabled = !terrainEnabled">{{ terrainEnabled ? 'Disable' : 'Enable' }} terrain</button>
    `,
})
export class CesiumComponent implements AfterViewInit {
  public zoom = 15;
  public opacity = 1.0;
  public width = 5;

  @ViewChild('map') map: MapComponent;
  map3dInstance;
  drawingEnabled = false;
  terrainEnabled = false;

  feature: Feature;

  ngAfterViewInit() {}

  endDraw(feature: Feature) {
    this.feature = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: transform(feature.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326'),
      },
    };
  }

  switch3dMode() {
    if (!this.map3dInstance) {
      this.map3dInstance = new OLCesium({map: this.map.instance});
      this.map3dInstance.getCesiumScene().skyBox = new Cesium.SkyBox({
        sources: {
          positiveX: 'assets/cesium/Assets/Textures/SkyBox/tycho2t3_80_px.jpg',
          negativeX: 'assets/cesium/Assets/Textures/SkyBox/tycho2t3_80_mx.jpg',
          positiveY: 'assets/cesium/Assets/Textures/SkyBox/tycho2t3_80_py.jpg',
          negativeY: 'assets/cesium/Assets/Textures/SkyBox/tycho2t3_80_my.jpg',
          positiveZ: 'assets/cesium/Assets/Textures/SkyBox/tycho2t3_80_pz.jpg',
          negativeZ: 'assets/cesium/Assets/Textures/SkyBox/tycho2t3_80_mz.jpg'
        }
      });
    }
    this.map3dInstance.setEnabled(!this.map3dInstance.getEnabled());
  }
}
