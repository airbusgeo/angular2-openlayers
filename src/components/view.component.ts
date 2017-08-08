import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { View, Extent, Coordinate } from 'openlayers';
import { MapComponent } from './map.component';

@Component({
  selector: 'aol-view',
  template: `<ng-content></ng-content>`
})
export class ViewComponent implements OnInit, OnChanges, OnDestroy {
  public instance: View;
  public componentType: string = 'view';

  @Input() constrainRotation: boolean | number;
  @Input() enableRotation: boolean;
  @Input() extent: Extent;
  @Input() maxResolution: number;
  @Input() minResolution: number;
  @Input() maxZoom: number;
  @Input() minZoom: number;
  @Input() resolution: number;
  @Input() resolutions: number[];
  @Input() rotation: number;
  @Input() zoom: number;
  @Input() zoomFactor: number;
  @Input() center: Coordinate;

  constructor(private host: MapComponent) {
  }

  ngOnInit() {
    // console.log('creating ol.View instance with: ', this);
    this.instance = new View(this);
    this.host.instance.setView(this.instance);
    console.log('INIT VIEW');
  }

  ngOnChanges(changes: SimpleChanges) {
    let properties: { [index: string]: any } = {};
    if (!this.instance) {
      return;
    }
    console.log(changes);
    for (let key in changes) {
      if (changes.hasOwnProperty(key)) {
        switch (key) {
          case 'zoom':
            /** Work-around: setting the zoom via setProperties does not work. */
            this.instance.setZoom(changes[key].currentValue);
            break;
          case 'extent':
          console.log(changes[key].currentValue);
            /** Work-around: setting the zoom via setProperties does not work. */
            this.instance.fit(changes[key].currentValue);
            break;
          case 'center':
          console.log(changes[key].currentValue);
            /** Work-around: setting the zoom via setProperties does not work. */
            this.instance.setCenter(changes[key].currentValue);
            break;
          default:
            break;
        }
        properties[key] = changes[key].currentValue;
      }
    }
    // console.log('changes detected in aol-view, setting new properties: ', properties);
    this.instance.setProperties(properties, false);
  }

  ngOnDestroy() {
    // console.log('removing aol-view');
  }
}
