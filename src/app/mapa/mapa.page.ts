import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../Servicios/geolocation.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  constructor(private geo: GeolocationService) { }

  

  ngOnInit() {
  }

}
