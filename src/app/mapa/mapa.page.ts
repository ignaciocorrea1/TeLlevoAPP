import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../Servicios/geolocation.service';
import { MapaService } from '../Servicios/mapa.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  position = {
    "lng": 0,
    "lat": 0
  }

  constructor(private geo: GeolocationService, private map: MapaService, private router: Router) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      lng: number,
      lat: number
    };
    if (state) {
      this.position.lng = state.lng;
      this.position.lat = state.lat;

    } else {
      this.position.lng = 0;
      this.position.lat = 0;
    }
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.map.buildMap("map-ubicacion", this.position.lng, this.position.lat);
    this.map.addMarker(this.position.lng, this.position.lat);
    this.map.geolocateControl();
  }
}
