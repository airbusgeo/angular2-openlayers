import { Component, Host, Input, OnInit, forwardRef } from '@angular/core';
import {
    TileLoadFunctionType,
    olx,
    AttributionLike,
    WMTSRequestEncoding,
    LogoOptions,
    tilegrid,
    ProjectionLike,
    source,
    ImageTile,
    TileCoord,
    Tile,
    GlobalObject
} from 'openlayers';
import { LayerTileComponent } from '../layers';
import { SourceComponent } from './source.component';

@Component({
    selector: 'aol-source-tilewmts',
    template: `<ng-content></ng-content>`,
    providers: [
        { provide: SourceComponent, useExisting: forwardRef(() => SourceTileWMTSComponent) }
    ]
})
export class SourceTileWMTSComponent extends SourceComponent implements OnInit {
    instance: source.WMTS;
    @Input() cacheSize?: number;
    @Input() crossOrigin?: (string);
    @Input() logo?: (string | LogoOptions);
    @Input() tileGrid: tilegrid.WMTS;
    @Input() projection: ProjectionLike;
    @Input() reprojectionErrorThreshold?: number;
    @Input() requestEncoding?: (WMTSRequestEncoding | string);
    @Input() layer: string;
    @Input() style: string;
    @Input() tileClass?: ((n: ImageTile, coords: TileCoord, state: Tile.State, s1: string, s2: string, type: TileLoadFunctionType) => any);
    @Input() tilePixelRatio?: number;
    @Input() version?: string;
    @Input() format?: string;
    @Input() matrixSet: string;
    @Input() dimensions?: GlobalObject;
    @Input() url?: string;
    @Input() tileLoadFunction?: TileLoadFunctionType;
    @Input() urls?: string[];
    @Input() wrapX?: boolean;

    constructor( @Host() layer: LayerTileComponent) {
        super(layer);
    }

    ngOnInit() {
        this.instance = new source.WMTS(this);
        this.host.instance.setSource(this.instance);
    }
}
