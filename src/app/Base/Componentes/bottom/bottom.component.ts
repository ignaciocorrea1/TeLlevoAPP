import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { GeolocationService } from 'src/app/Servicios/geolocation.service';

@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.scss'],
})
export class BottomComponent  implements OnInit {

  constructor(
    private router:Router, 
    private geo:GeolocationService) { }

  async navegarA(ruta:string) {
    // Validacion de ruta para enviar las coordenadas del usuario a la vista de ubicacion
    if (ruta != '/mapa') {
      this.router.navigate([ruta]);
    } else {
      await this.geo.getCurrentLocation().then((position) => {
        if (position) {
          let navigationExtras : NavigationExtras = {
            state: {
              lng: position.longitude,
              lat: position.latitude
            } 
          }
          this.router.navigate([ruta], navigationExtras);
        }
      });
    }
  };

  ngOnInit() {
    
  }

}
