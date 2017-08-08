import { Component, OnDestroy, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { control, MapEvent } from 'openlayers';
import { MapComponent } from '../map.component';

@Component({
  selector: 'aol-control-scaleline',
  template: `<ng-content></ng-content>`
})
export class ControlScaleLineComponent implements OnInit, OnChanges, OnDestroy {
  instance: control.ScaleLine;

  @Input() className?: string;
  @Input() minWidth?: number;
  @Input() render?: ((event: MapEvent) => any);
  @Input() target?: Element;
  @Input() units?: (control.ScaleLine.Units | string);

  constructor(private map: MapComponent) {
    // console.log('instancing aol-control-scaleline');
  }

  ngOnInit() {
    this.instance = new control.ScaleLine(this);
    this.map.instance.addControl(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let properties: { [index: string]: any } = {};
    if (!this.instance) {
      return;
    }

    for (let key in changes) {
      if (changes.hasOwnProperty(key)) {
        properties[key] = changes[key].currentValue;
      }
    }

    this.instance.setProperties(properties, false);
  }


  ngOnDestroy() {
    // console.log('removing aol-control-scaleline');
    this.map.instance.removeControl(this.instance);
  }
}
