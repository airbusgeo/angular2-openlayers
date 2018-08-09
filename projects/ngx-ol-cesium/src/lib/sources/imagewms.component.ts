import { Component, Host, Input, OnInit, forwardRef } from '@angular/core';
import { ImageWMS } from 'ol/source';
import { LayerImageComponent } from '../layers/layerimage.component';
import { SourceComponent } from './source.component';
import { AttributionLike, ImageLoadFunction, ProjectionLike } from '../../ol-models';

@Component({
  selector: 'aol-source-imagewms',
  template: `<ng-content></ng-content>`,
  providers: [{ provide: SourceComponent, useExisting: forwardRef(() => SourceImageWMSComponent) }],
})
export class SourceImageWMSComponent extends SourceComponent implements OnInit {
  instance: ImageWMS;

  @Input()
  attributions: AttributionLike;
  @Input()
  crossOrigin: string;
  @Input()
  hidpi: boolean;
  @Input()
  serverType: string;
  @Input()
  imageLoadFunction?: ImageLoadFunction;
  @Input()
  logo: string; // TODO: (string | olx.LogoOptions);
  @Input()
  params: Object;
  @Input()
  projection: ProjectionLike | string;
  @Input()
  ratio: number;
  @Input()
  resolutions: Array<number>;
  @Input()
  url: string;

  constructor(@Host() layer: LayerImageComponent) {
    super(layer);
  }

  ngOnInit() {
    this.instance = new ImageWMS(this);
    this.host.instance.setSource(this.instance);
  }
}
