import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';
import { MapuiService } from 'src/app/services/mapui.service';
import { Subscription } from 'rxjs';

interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  };
  type: string;
  label: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  showFilter: boolean = false;
  showMap: boolean = true;
  map: Subscription;
  filter: Subscription;

  constructor(
    private filterService: FilterService,
    private mapuiService: MapuiService
  ) {
    this.map = this.mapuiService
      .onToggle()
      .subscribe((value) => (this.showMap = value));

    this.filter = this.filterService
      .onToggle()
      .subscribe((value) => (this.showFilter = value));
  }

  ngOnInit() {}

  mapOptions: google.maps.MapOptions = {
    zoom: 11,
    center: { lat: 49.28, lng: -123.12 },
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  markers: MarkerProperties[] = [
    {
      position: { lat: 49.25848164375385, lng: -123.04472531596004 },
      type: 'restaurant',
      label: 'italian',
    },
    {
      position: { lat: 49.24692611786474, lng: -123.10101442457946 },
      type: 'cafe',
      label: 'french',
    },
    {
      position: { lat: 49.28065710684262, lng: -123.10705560135719 },
      type: 'diner',
      label: 'american',
    },
  ];

  handleMapInitialized(map: google.maps.Map) {
    this.markers.forEach((marker: MarkerProperties) => {
      new google.maps.Marker({
        position: marker.position,
        // label: marker.label,
        map,
      });
    });
  }
}
