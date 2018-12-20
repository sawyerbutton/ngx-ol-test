import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import DragAndDrop from 'ol/interaction/DragAndDrop';
import * as olSource from 'ol/source';
import {Vector as layerVector} from 'ol/layer';
import {GeoJSON} from 'ol/format';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.less']
})
export class InteractiveMapComponent implements OnInit {
  source: olSource.Vector;
  layer: layerVector;
  map: Map;
  constructor() { }

  ngOnInit() {
    this.source = new olSource.Vector();
    this.layer = new layerVector({
      source: this.source
    });
    this.map = new Map({
      target: 'map',
      layers: [
        this.layer
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
    this.map.addInteraction(new DragAndDrop({
      source: this.source,
      formatConstructors: [GeoJSON]
    }));

  }
}
