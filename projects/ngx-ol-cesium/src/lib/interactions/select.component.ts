import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapComponent } from '../map.component';
import { Select } from 'ol/interaction';
import { Layer } from 'ol/layer';
import { Style } from 'ol/style';
import { SelectFilterFunction, StyleFunction } from '../../ol-models';
import { Collection, Feature } from 'ol';
import { SelectEvent } from 'ol/interaction/Select';

@Component({
  selector: 'aol-interaction-select',
  template: '',
})
export class SelectInteractionComponent implements OnInit, OnDestroy {
  instance: Select;

  @Input()
  addCondition?: any; // TODO: EventsConditionType;
  @Input()
  condition?: any; // TODO: EventsConditionType;
  @Input()
  layers?: Layer[] | ((layer: Layer) => boolean);
  @Input()
  style?: Style | Style[] | StyleFunction;
  @Input()
  removeCondition?: any; // TODO: EventsConditionType;
  @Input()
  toggleCondition?: any; // TODO: EventsConditionType;
  @Input()
  multi?: boolean;
  @Input()
  features?: Collection<Feature>;
  @Input()
  filter?: SelectFilterFunction;
  @Input()
  wrapX?: boolean;

  @Output()
  onChange = new EventEmitter<SelectEvent>();
  @Output()
  onSelect = new EventEmitter<SelectEvent>();
  @Output()
  onPropertyChange = new EventEmitter<SelectEvent>();

  constructor(private map: MapComponent) {}

  ngOnInit() {
    this.instance = new Select(this);

    this.instance.on('change', (event: SelectEvent) => this.onChange.emit(event));
    this.instance.on('select', (event: SelectEvent) => this.onSelect.emit(event));
    this.instance.on('propertychange', (event: SelectEvent) => this.onPropertyChange.emit(event));

    this.map.instance.addInteraction(this.instance);
  }

  ngOnDestroy() {
    this.map.instance.removeInteraction(this.instance);
  }
}
