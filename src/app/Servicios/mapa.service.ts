import { Injectable } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  public map: mapboxgl.Map | null = null;
  public style = 'mapbox://styles/mapbox/standard';

  constructor() { 
    (mapboxgl as any).accessToken = environment.mapbox_key;
  }

  buildMap(lng:number, lat:number) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 16,
      center: [lng, lat]
    });

    this.map.resize();
  }

  addMarker(lng:number, lat:number) {
    if (!this.map) {
      return;
    } else {
      new mapboxgl.Marker({color: '#AA59FF'})
      .setLngLat([lng, lat])
      .addTo(this.map)
    }
  }

  geolocateControl() {
    if (this.map) {
      this.map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        })
      )
    }
  }
}
