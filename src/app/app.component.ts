import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  config = null;
  markers = [];
  @ViewChild('testMap') testMap;

  constructor() {
  }

  ngOnInit(): void {
    this.config = {
      sourceType: 'XYZ',
      center: [117, 31],
      zoom: 10,
      imageURL: 'assets/3.png',
      lineColor: '#d12710',
      lineWidth: 2
    };
    // this.config = null;
    this.markers = [
      [117.31, 31.1173],
      [117.41, 31.1176]
    ];
  }

  addMarkerOnMap() {
    this.markers = [...this.markers];
    this.testMap.addMarkersOnMap();
  }

  removeMarkerOnMap() {
    console.log('remove marker on map');
    this.testMap.removeMarkersOnMap();
  }

  addLineLayerOnMap() {
    this.testMap.addLineStringsOnMap();
  }

  removeLineLayerOnMap() {
    this.testMap.removeLineLayerOnMap();
  }
  // addInteractionOnMap() {
  //   this.testMap.removeCurrentMapAndAddInteraction();
  // }
}

