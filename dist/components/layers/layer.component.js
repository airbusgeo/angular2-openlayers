"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var map_system_1 = require("../../map-system");
var LayerComponent = (function () {
    function LayerComponent(mapSystem, host) {
        this.mapSystem = mapSystem;
        this.host = host;
        this.componentType = 'layer';
    }
    LayerComponent.prototype.ngOnInit = function () {
        this.host.instance.getLayers().push(this.instance);
    };
    LayerComponent.prototype.ngOnDestroy = function () {
        this.host.instance.getLayers().remove(this.instance);
    };
    LayerComponent.prototype.ngOnChanges = function (changes) {
        var properties = {};
        if (!this.instance) {
            return;
        }
        for (var key in changes) {
            if (changes.hasOwnProperty(key)) {
                properties[key] = changes[key].currentValue;
            }
        }
        // console.log('changes detected in aol-layer, setting new properties: ', properties);
        this.instance.setProperties(properties, false);
    };
    return LayerComponent;
}());
/** @nocollapse */
LayerComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core_1.Inject, args: [map_system_1.MapSystemToken,] },] },
    null,
]; };
LayerComponent.propDecorators = {
    'opacity': [{ type: core_1.Input },],
    'visible': [{ type: core_1.Input },],
    'extent': [{ type: core_1.Input },],
    'zIndex': [{ type: core_1.Input },],
    'minResolution': [{ type: core_1.Input },],
    'maxResolution': [{ type: core_1.Input },],
};
exports.LayerComponent = LayerComponent;
//# sourceMappingURL=layer.component.js.map