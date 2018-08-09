import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { DragRotateAndZoom } from 'ol/interaction';
import { MapComponent } from '../map.component';
import { EventsCondition } from '../../ol-models';

@Component({
  selector: 'aol-interaction-dragrotateandzoom',
  template: '',
})
export class DragRotateAndZoomInteractionComponent implements OnInit, OnDestroy {
  instance: DragRotateAndZoom;

  @Input()
  condition: EventsCondition;
  @Input()
  duration: number;

  constructor(private map: MapComponent) {}

  ngOnInit() {
    this.instance = new DragRotateAndZoom(this);
    this.map.instance.addInteraction(this.instance);
  }

  ngOnDestroy() {
    this.map.instance.removeInteraction(this.instance);
  }
}
