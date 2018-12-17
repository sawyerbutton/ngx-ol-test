import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import {fromLonLat, toLonLat} from 'ol/proj';
import Feature from 'ol/Feature';
import {Point, LineString} from 'ol/geom';
import * as olSource from 'ol/source';
import {Vector as layerVector} from 'ol/layer';
import {Style, Icon, Stroke} from 'ol/style';

@Component({
  selector: 'app-test-map',
  templateUrl: './test-map.component.html',
  styleUrls: ['./test-map.component.less']
})
export class TestMapComponent implements OnInit {
  @Input() config;
  @Input() markers = [];
  layer: TileLayer;
  map: Map;
  markerVectorLayer: layerVector;
  lineLayer: layerVector;

  constructor() {
  }

  ngOnInit() {
    if (this.config) {
      console.log(1);
      this.setCustomizeMap();
      // this.addMarkersOnMap();
    } else {
      console.log(2);
      this.setDefaultMap();
      // this.addMarkersOnMap();
    }
  }

  setCustomizeMap() {
    const source = this.config.sourceType === 'OSM' ? new OSM() : null;
    const center = fromLonLat(this.config.center);
    const zoom = this.config.zoom;
    this.layer = new TileLayer({
      source: source
    });
    this.map = new Map({
      layers: [this.layer],
      target: 'map',
      view: new View({
        center: center,
        zoom: zoom
      })
    });
  }

  setDefaultMap() {
    this.layer = new TileLayer({
      source: new OSM()
    });
    this.map = new Map({
      layers: [this.layer],
      target: 'map',
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2
      })
    });
  }

  addMarkersOnMap() {
    console.log(this.markers);
    if (this.markers.length > 0) {
      const olMarkers = this.markers.map((marker) => {
        const tempIcon = new Feature({
          geometry: new Point(
            fromLonLat(marker)
          ),
        });
        tempIcon.setStyle(new Style({
          image: new Icon(({
            src: this.config.imageURL
          }))
        }));
        return tempIcon;
      });
      const vectorSource = new olSource.Vector({
        features: olMarkers
      });
      this.markerVectorLayer = new layerVector({
        source: vectorSource,
      });
      this.map.addLayer(this.markerVectorLayer);
    }
  }

  addLineStringsOnMap() {
    const lineStyle = [
      new Style({
        stroke: new Stroke({
          color: this.config.lineColor ? this.config.lineColor : '#d12710',
          width: this.config.lineWidth ? this.config.lineWidth : 2
        })
      })
    ];
    const lineGroup = [];
    for (let i = 0; i < this.markers.length - 1; i++) {
      const start = fromLonLat(this.markers[i]);
      const end = fromLonLat(this.markers[i + 1]);
      lineGroup.push({
        coordinate: [start, end]
      });
    }
    const LineStrings = lineGroup.map(line => {
      return new Feature({
        geometry: new LineString(line.coordinate),
      });
    });
    this.lineLayer = new layerVector({
      source: new olSource.Vector({
        features: LineStrings
      })
    });
    this.lineLayer.setStyle(lineStyle);
    this.map.addLayer(this.lineLayer);
  }

  removeMarkersOnMap() {
    this.map.removeLayer(this.markerVectorLayer);
  }

  removeLineLayerOnMap() {
    this.map.removeLayer(this.lineLayer);
  }
}
