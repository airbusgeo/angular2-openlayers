import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { DragZoom } from 'ol/interaction';
import { MapComponent } from '../map.component';
import { EventsCondition } from '../../ol-models';

@Component({
  selector: 'aol-interaction-dragzoom',
  template: '',
})
export class DragZoomInteractionComponent implements OnInit, OnDestroy {
  instance: DragZoom;

  @Input()
  className: string;
  @Input()
  condition: EventsCondition;
  @Input()
  duration: number;
  @Input()
  out: boolean;

  constructor(private map: MapComponent) {}

  ngOnInit() {
    this.instance = new DragZoom(this);
    this.map.instance.addInteraction(this.instance);
  }

  ngOnDestroy() {
    this.map.instance.removeInteraction(this.instance);
  }
}
