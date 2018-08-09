import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { DragPan } from 'ol/interaction';
import Kinetic from 'ol/Kinetic';
import { MapComponent } from '../map.component';
import { EventsCondition } from '../../ol-models';

@Component({
  selector: 'aol-interaction-dragpan',
  template: '',
})
export class DragPanInteractionComponent implements OnInit, OnDestroy {
  instance: DragPan;

  @Input()
  condition: EventsCondition;
  @Input()
  kinetic: Kinetic;

  constructor(private map: MapComponent) {}

  ngOnInit() {
    this.instance = new DragPan(this);
    this.map.instance.addInteraction(this.instance);
  }

  ngOnDestroy() {
    this.map.instance.removeInteraction(this.instance);
  }
}
