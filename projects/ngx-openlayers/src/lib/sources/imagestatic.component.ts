import { Component, Host, Input, OnInit, forwardRef } from '@angular/core';
import { ImageStatic } from 'ol/source';
import { SourceComponent } from './source.component';
import { LayerImageComponent } from '../layers/layerimage.component';
import { AttributionLike, Extent, ImageLoadFunction, ProjectionLike, Size } from '../../ol-models';

@Component({
  selector: 'aol-source-imagestatic',
  template: `<ng-content></ng-content>`,
  providers: [{ provide: SourceComponent, useExisting: forwardRef(() => SourceImageStaticComponent) }],
})
export class SourceImageStaticComponent extends SourceComponent implements OnInit {
  instance: ImageStatic;

  @Input()
  projection: ProjectionLike | string;
  @Input()
  imageExtent: Extent;
  @Input()
  url: string;
  @Input()
  attributions: AttributionLike;
  @Input()
  crossOrigin?: string;
  @Input()
  imageLoadFunction?: ImageLoadFunction;
  @Input()
  logo?: string; // TODO: (string | olx.LogoOptions);
  @Input()
  imageSize?: Size;

  constructor(@Host() layer: LayerImageComponent) {
    super(layer);
  }

  ngOnInit() {
    this.instance = new ImageStatic(this);
    this.host.instance.setSource(this.instance);
  }
}
