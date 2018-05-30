import {
  AfterContentInit,
  Component,
  EventEmitter,
  forwardRef,
  Host,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { RasterOperation, RasterOperationType, source } from 'openlayers';

import { SourceComponent } from './source.component';
import { LayerImageComponent } from '../layers';

@Component({
  selector: 'aol-source-raster',
  template: `<ng-content></ng-content>`,
  providers: [
    {
      provide: SourceComponent,
      useExisting: forwardRef(() => SourceRasterComponent)
    }
  ]
})
export class SourceRasterComponent extends SourceComponent implements OnInit, AfterContentInit {
  instance: source.Raster;

  @Input() operation?: RasterOperation;
  @Input() threads?: number;
  @Input() lib?: Object;
  @Input() operationType?: RasterOperationType;

  @Output() beforeOperations: EventEmitter<source.RasterEvent> = new EventEmitter<source.RasterEvent>();
  @Output() afterOperations: EventEmitter<source.RasterEvent> = new EventEmitter<source.RasterEvent>();

  sources: source.Source[] = [];

  constructor(@Host() layer: LayerImageComponent) {
    super(layer);
  }
  
  ngAfterContentInit() {
    this.instance = new source.Raster(this);
    this.setSource(this.instance);
    this.instance.on('beforeoperations', (event: source.RasterEvent) => this.beforeOperations.emit(event));
    this.instance.on('afteroperations', (event: source.RasterEvent) => this.afterOperations.emit(event));
  }
}
