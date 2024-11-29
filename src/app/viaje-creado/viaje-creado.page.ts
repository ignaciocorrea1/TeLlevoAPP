import { Component, OnInit } from '@angular/core';

import { ApicontrollerService } from '../Servicios/apicontroller.service';
import { StorageService } from '../Servicios/storage.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-viaje-creado',
  templateUrl: './viaje-creado.page.html',
  styleUrls: ['./viaje-creado.page.scss'],
})
export class ViajeCreadoPage implements OnInit {

  constructor(
    private strg: StorageService,
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

  cargandoDatos = true;

  viaje = {
    "conductor": 0,
    "costoPersona": 0,
    "capacidadActual": 0,
    "capacidadMaxima": 0,
    "direccionInicio": "",
    "direccionFinal": "",
    "coordenadasInicioLat": 0,
    "coordenadasInicioLng": 0,
    "coordenadasFinalLat": 0,
    "coordenadasFinalLng": 0,
    "horaInicio": "",
    "estado": ""
  }

  verViaje() {
    console.log(this.viaje)
  }

  ionViewWillEnter() {
    // Solicitud a la api
    this.api.getViajeC(this.idUsuario).subscribe(
      (resultado: any[]) => {
        if (resultado.length > 0) {
          this.viaje = resultado[0];
        } else {
          console.error("No se encontraron viajes para este usuario");
        }
      },
      error => {
        console.error("Error con el viaje obtenido: ", error);
      }
    );
  }

  ngOnInit() {
    
  }

}
