import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker, MapInfoWindow, MapAnchorPoint } from '@angular/google-maps';
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
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow
  infoContent = {
    name: String,
    address: String,
    phone: String,
    rating: Number,
    totalRatings: Number,
    reviews: Array,
    photo: String
  }
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

  infoWindowOptions: google.maps.InfoWindowOptions = {
    position: { lat: 49.28, lng: -123.12 }
  }

  infoWindowContent: any

  markers: MarkerProperties[] = [
    // {
    //   position: { lat: 49.24692611786474, lng: -123.10101442457946 },
    //   type: 'cafe',
    //   label: 'french',
    // },
    // {
    //   position: { lat: 49.28065710684262, lng: -123.10705560135719 },
    //   type: 'diner',
    //   label: 'american'
    // },
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

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker)
  }

  closeInfoWindow() {
    this.infoWindow.close()
  }

  click(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
    event.stop()
    let clickInfo: any = event
    if (!clickInfo.placeId) {
      return
    }
    const latLng = event.latLng?.toJSON()
    console.log(latLng)
    this.infoWindowOptions = { position: latLng }
    // this.infoWindow.open()
    let map = new google.maps.Map(document.createElement('div'));
    const service = new google.maps.places.PlacesService(map);
    const request = {
      placeId: clickInfo.placeId,
      fields: ['name', 'formatted_address', 'formatted_phone_number', 'rating', 'reviews', 'photo', 'geometry', 'user_ratings_total', 'type']
    };
    const callback = (place: any, status: any) => {
      if (place && status === google.maps.places.PlacesServiceStatus.OK) {
        console.log("Place", place);
        // const latLng = place.geometry.location.toJSON()
        // this.infoWindowOptions = { position: latLng }
        // console.log(place.photos[0].getUrl())
        this.infoContent = {
          name: place.name,
          address: place.formatted_address,
          phone: place.formatted_phone_number,
          rating: place.rating,
          totalRatings: place.user_ratings_total,
          reviews: place.reviews,
          photo: place.photos[0].getUrl()
        }
        this.infoWindow.open()
        // this.markers.push({
        //   position: {
        //     lat: latLng.lat,
        //     lng: latLng.lng
        //   },
        //   type: 'Potato',
        //   label: 'Cheese'
        // })
      } else {
        console.log("Status not ok", status)
      }
    }
    service.getDetails(request, callback)
  }
}
