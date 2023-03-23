import { Component, OnInit } from '@angular/core';
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
  mapView: Subscription;
  filter: Subscription;

  mapOptions: google.maps.MapOptions = {
    zoom: 12,
    center: { lat: 49.28, lng: -123.12 },
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  };

  markers: MarkerProperties[] = [
    {
      position: { lat: 49.24692611786474, lng: -123.10101442457946 },
      type: 'cafe',
      label: 'french',
    },
    {
      position: { lat: 49.28065710684262, lng: -123.10705560135719 },
      type: 'diner',
      label: 'american'
    },
  ];

  constructor(private filterService: FilterService, private mapuiService: MapuiService) {
    this.mapView = this.mapuiService
      .onToggle()
      .subscribe((value) => (this.showMap = value));

    this.filter = this.filterService
      .onToggle()
      .subscribe((value) => (this.showFilter = value));
  }

  ngOnInit() { }

  handleMapInitialized(map: google.maps.Map) {
    this.markers.forEach((marker: MarkerProperties) => {
      new google.maps.Marker({
        position: marker.position,
        // label: marker.label,
        map,
      });
    });
  }

  click(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
    event.stop()
    let clickInfo: any;
    clickInfo = event
    if (!clickInfo.placeId) {
      return
    }
    let map = new google.maps.Map(document.createElement('div'));
    const service = new google.maps.places.PlacesService(map);
    const request = {
      placeId: clickInfo.placeId,
      fields: ['name', 'rating', 'reviews', 'formatted_address', 'formatted_phone_number', 'geometry']
    };
    const callback = (place: any, status: any) => {
      if (place && status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(place);
      } else {
        console.log("Status not ok", status)
      }
    }
    service.getDetails(request, callback)
  }
}
