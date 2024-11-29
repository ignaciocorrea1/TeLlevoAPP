import { Component, OnInit } from '@angular/core';

import { ApicontrollerService } from '../Servicios/apicontroller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viajesdisponibles',
  templateUrl: './viajesdisponibles.page.html',
  styleUrls: ['./viajesdisponibles.page.scss'],
})
export class ViajesdisponiblesPage implements OnInit {

  constructor(
    private api: ApicontrollerService,
    private router: Router
  ) { 
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      idUsuario: number;
    };
    this.idUsuario = state.idUsuario;
  }

  idUsuario = 0;
  
  viajes: any = [];
  viajeId = 0;

  solicitarViaje(idViaje: number) {
    const solicitud = {
      "viaje": idViaje,
      "pasajero": this.idUsuario,
      "estado": "espera"
    };

    this.api.postSolicitud(solicitud).subscribe(
      resultado => {
        this.router.navigate(["/inicio"])
        console.log("Resultado post solicitud: ", resultado)
      },
      error => {
        console.error("Error al post solicitud: ", error)
      }
    )
  }

  ngOnInit() {
    this.api.getViajes().subscribe(
      (resultados: any[]) => {
        if (resultados.length > 0) {
          this.viajes = resultados;
        };
      },
      error => {
        console.error("Error al obtener viajes: ", error)
      }
    );
  }

}
