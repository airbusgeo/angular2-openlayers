import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapComponent } from '../map.component';
declare var Cesium: any;

@Component({
  selector: 'aol-cesium-world-terrain',
  template: ''
})
export class CesiumWorldTerrainComponent implements OnDestroy, OnInit {

  constructor(private map: MapComponent) { }

  ngOnInit() {
    this.map.map3dInstance.getCesiumScene().terrainProvider = Cesium.createWorldTerrain({
      requestWaterMask: true
    });
  }

  ngOnDestroy() {
    this.map.map3dInstance.getCesiumScene().terrainProvider = new Cesium.EllipsoidTerrainProvider();
  }
}
