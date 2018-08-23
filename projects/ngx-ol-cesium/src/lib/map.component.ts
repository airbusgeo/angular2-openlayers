import {
  Component,
  OnInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import Map from 'ol/Map';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import MapEvent from 'ol/MapEvent';
import ObjectEvent from 'ol/Object';
import RenderEvent from 'ol/render/Event';
import { Control } from 'ol/control';
import { Interaction } from 'ol/interaction';
import OLCesium from 'ol-cesium';
declare var Cesium: any;

@Component({
  selector: 'aol-map',
  template: `<div [style.width]="width" [style.height]="height"></div><ng-content></ng-content>`,
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  public instance: Map;
  public map3dInstance: OLCesium;
  public componentType = 'map';

  @Input()
  width = '100%';
  @Input()
  height = '100%';
  @Input()
  pixelRatio: number;
  @Input()
  keyboardEventTarget: Element | string;
  @Input()
  loadTilesWhileAnimating: boolean;
  @Input()
  loadTilesWhileInteracting: boolean;
  @Input()
  logo: string | boolean;
  @Input()
  renderer: 'canvas' | 'webgl';

  @Output()
  onClick: EventEmitter<MapBrowserEvent>;
  @Output()
  onDblClick: EventEmitter<MapBrowserEvent>;
  @Output()
  onMoveEnd: EventEmitter<MapEvent>;
  @Output()
  onPointerDrag: EventEmitter<MapBrowserEvent>;
  @Output()
  onPointerMove: EventEmitter<MapBrowserEvent>;
  @Output()
  onPostCompose: EventEmitter<RenderEvent>;
  @Output()
  onPostRender: EventEmitter<MapEvent>;
  @Output()
  onPreCompose: EventEmitter<RenderEvent>;
  @Output()
  onPropertyChange: EventEmitter<ObjectEvent>;
  @Output()
  onSingleClick: EventEmitter<MapBrowserEvent>;

  @Input()
  map3dEnabled = false;

  // we pass empty arrays to not get default controls/interactions because we have our own directives
  controls: Control[] = [];
  interactions: Interaction[] = [];

  constructor(private host: ElementRef) {
    this.onClick = new EventEmitter<MapBrowserEvent>();
    this.onDblClick = new EventEmitter<MapBrowserEvent>();
    this.onMoveEnd = new EventEmitter<MapEvent>();
    this.onPointerDrag = new EventEmitter<MapBrowserEvent>();
    this.onPointerMove = new EventEmitter<MapBrowserEvent>();
    this.onPostCompose = new EventEmitter<RenderEvent>();
    this.onPostRender = new EventEmitter<MapEvent>();
    this.onPreCompose = new EventEmitter<RenderEvent>();
    this.onPropertyChange = new EventEmitter<ObjectEvent>();
    this.onSingleClick = new EventEmitter<MapBrowserEvent>();
  }

  ngOnInit() {
    // console.log('creating ol.Map instance with:', this);
    this.instance = new Map(this);
    this.instance.setTarget(this.host.nativeElement.firstElementChild);
    this.instance.on('click', (event: MapBrowserEvent) => this.onClick.emit(event));
    this.instance.on('dblclick', (event: MapBrowserEvent) => this.onDblClick.emit(event));
    this.instance.on('moveend', (event: MapEvent) => this.onMoveEnd.emit(event));
    this.instance.on('pointerdrag', (event: MapBrowserEvent) => this.onPointerDrag.emit(event));
    this.instance.on('pointermove', (event: MapBrowserEvent) => this.onPointerMove.emit(event));
    this.instance.on('postcompose', (event: RenderEvent) => this.onPostCompose.emit(event));
    this.instance.on('postrender', (event: MapEvent) => this.onPostRender.emit(event));
    this.instance.on('precompose', (event: RenderEvent) => this.onPreCompose.emit(event));
    this.instance.on('propertychange', (event: ObjectEvent) => this.onPropertyChange.emit(event));
    this.instance.on('singleclick', (event: MapBrowserEvent) => this.onSingleClick.emit(event));
  }

  init3dMap() {
    this.map3dInstance = new OLCesium({map: this.instance});
    this.map3dInstance.getCesiumScene().skyBox = new Cesium.SkyBox({
      sources: {
        positiveX: 'assets/cesium/Assets/Textures/SkyBox/tycho2t3_80_px.jpg',
        negativeX: 'assets/cesium/Assets/Textures/SkyBox/tycho2t3_80_mx.jpg',
        positiveY: 'assets/cesium/Assets/Textures/SkyBox/tycho2t3_80_py.jpg',
        negativeY: 'assets/cesium/Assets/Textures/SkyBox/tycho2t3_80_my.jpg',
        positiveZ: 'assets/cesium/Assets/Textures/SkyBox/tycho2t3_80_pz.jpg',
        negativeZ: 'assets/cesium/Assets/Textures/SkyBox/tycho2t3_80_mz.jpg',
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const properties: { [index: string]: any } = {};
    if (!this.instance) {
      return;
    }
    for (const key in changes) {
      if (changes.hasOwnProperty(key)) {
        if (key === 'map3dEnabled') {
          if (changes[key].currentValue === true && this.map3dInstance == null) {
            this.init3dMap();
          }
          if (this.map3dInstance != null) {
            if (changes[key].currentValue) {
              // Dirty fix: when using drawing interaction,
              // needs to wait 1 tick for the application to disable 3D
              setTimeout(() => this.map3dInstance.setEnabled(true));
            } else {
              this.map3dInstance.setEnabled(changes[key].currentValue);
            }
          }
        } else {
          properties[key] = changes[key].currentValue;
        }
      }
    }
    // console.log('changes detected in aol-map, setting new properties: ', properties);
    this.instance.setProperties(properties, false);
  }

  ngAfterViewInit() {
    this.instance.updateSize();
    if (this.map3dEnabled && this.map3dInstance == null) {
      this.init3dMap();
    }
  }
}
