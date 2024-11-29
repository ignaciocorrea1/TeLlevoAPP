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
    this.idUsuario ? state.idUsuario:0;
  }

  idUsuario = 0;

  cargandoDatos = true;

  viaje = {
    "idViaje": 0,
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
  };

  solicitudes: any = [];

  aceptarSolicitud(idSolicitud: number, idPasajero: number) {
    this.api.getPasajero(idPasajero).subscribe(
      resultado => {
        const pasajeroEncontrado = resultado;

        const solicitudActualizada = {
          "estado": "aceptada",
          "viaje": this.viaje,
          "pasajero": pasajeroEncontrado
        }

        this.api.putSolicitud(idSolicitud, solicitudActualizada).subscribe(
          res => {
            this.router.navigate(["/inicio"]);
            console.log("Solicitud actualizada: ", res)
          },
          error => console.log("Error al actualizar solicitud: ", error)
        )
      },
      error => console.error("Error en getPasajero: ", error)
    )
  }

  ionViewWillEnter() {
    // Solicitud a la api
    this.api.getViajeC(this.idUsuario, "iniciado").subscribe(
      (resultado: any[]) => {
        if (resultado.length > 0) {
          this.viaje = resultado[0];

          // Obtener las solicitudes del viaje
          this.api.getSolicitudes(this.viaje.idViaje).subscribe(
            (resultados: any[]) => {
              this.solicitudes = resultados;
              console.log("Se obtenieron las solicitudes", resultados)
            },
            error => console.error("No se obtenieron las solicitudes: ", error)
          )
        } else {
          console.error("No se encontraron viajes para este usuario");
        }
      },
      error => console.error("Error con el viaje obtenido: ", error)
    );
  }

  ngOnInit() {
    
  }

}
