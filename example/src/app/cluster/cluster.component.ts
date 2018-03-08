import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {style} from 'openlayers';
import {LayerComponent} from 'ngx-openlayers';

@Component({
    selector: 'app-root',
    templateUrl: './cluster.component.html'
})
export class ClusterComponent implements OnInit, AfterViewInit {
  distance = 60;
  points: Array<{ x: number; y: number; }>;

  @ViewChild('layer') layer: LayerComponent;

  constructor() {
    this.points = new Array<{x: number, y: number}>();
  }

  ngOnInit() {
    // Generate random points
    const nbPoints = 2000;
    for (let i = 0; i < nbPoints; ++i) {
      this.points.push({
        x : this.getRandomInRange(1.47, 1.51, 4),
        y: this.getRandomInRange(43.545, 43.565, 4)
      });
    }
  }

  ngAfterViewInit() {
    this.updateStyle();
  }

  updateStyle() {
    // Tricks to update style
    const layerStyle: style.Style = this.layer.instance.getStyle();
    this.layer.instance.setStyle(function (feature) {
      let local = layerStyle.clone();
      const nb = feature.get('features').length;

      // Set new image when display initial point
      if (nb === 1) {
        local.setImage(new style.Circle({
          radius: 12,
          stroke: new style.Stroke({color: '#fff'}),
          fill: new style.Fill({color: 'red'})
        }));
      }

      // Display number og point in cluster
      local.getText().setText(nb.toString());

      return local;
    });
  }

  getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  }
}
