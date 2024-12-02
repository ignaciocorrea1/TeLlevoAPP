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

    if (state) {
      this.idUsuario = state.idUsuario;
    } else {
      this.idUsuario = 0;
    }
  }

  idUsuario = 0;

  confirmado = false;
  rechazado = false;

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
  haySolicitudes = false;

  detalles: any = [];
  hayDetalles = false;

  pasajeros: any = [];

  pasajerosDetalle: any = [];

  // Aceptar la solicitud al viaje
  aceptarSolicitud(idSolicitud: number, idPasajero: number) {
    // Creacion de la solicitud actualizada
    const solicitudActualizada = {
      "viaje": this.viaje.idViaje,
      "pasajero": idPasajero,
      "estado": "Aceptada"
    }
    // Creacion del detalle del viaje
    const detalle = {
      "idViaje": this.viaje.idViaje,
      "pasajero": idPasajero
    }

    // Solicitud para actualizar
    this.api.putSolicitud(idSolicitud, solicitudActualizada).subscribe(
      res => {
        this.confirmado = true;

        // Se crea el detalle del viaje
        
        this.api.postDetalle(detalle).subscribe(
          resDetalle => {
            console.log("resDetalle: ", resDetalle)
            this.detalles.push(resDetalle)
            this.hayDetalles = true;

            console.log("Detalle creado")
            console.log("this.detalles: ", this.detalles)
          },
          error => console.error("Error en postDetalle: ", error)
        )

        console.log("Solicitud actualizada: ", res)
      },
      error => console.log("Error en putSolicitud: ", error)
    )   
  }
  
  // Rechazar solicitud
  rechazarSolicitud(idSolicitud: number, idPasajero: number) {
    // Solicitud actualizada
    const solicitudActualizada = {
      "viaje": this.viaje.idViaje,
      "pasajero": idPasajero,
      "estado": "Rechazada"
    }

    // Se manda la solicitud
    this.api.putSolicitud(idSolicitud, solicitudActualizada).subscribe(
      res => {
        this.rechazado = true;
        console.log("Solicitud actualizada a rechazada")
        console.log("Solicitudes array: ", this.solicitudes)
      },
      error => console.error("Error en putSolicitud de rechazarSolicitud()", error)
    )
  }

  // Solicitudes al viaje
  cargarSolicitudes(idViaje:number) {
    this.solicitudes.splice(0, this.solicitudes.length)
    
    // Obtener las solicitudes del viaje
    this.api.getSolicitudes(idViaje).subscribe(
      (resultados: any[]) => {
        // Si se obtienen resultados
        if (resultados.length > 0) {
          console.log("Resultado de getSolicitudes: ", resultados)
          
          // Se recorren y se obtienen solo las solicitudes en espera
          resultados.forEach(tmp => {
            if (tmp.estado === "No aceptada") {
              this.solicitudes.push(tmp);
              this.haySolicitudes = true;
              
              // Se obtiene la info del pasajero asociado
              this.api.getConPas(tmp.pasajero).subscribe(
                (respuesta: any = []) => {
                  if (respuesta.length > 0) {
                    this.pasajeros.push(respuesta[0])
                  }
                },
                error => console.error("Error en getConPas en getSolicitudes", error)
              )
            }
          });
        } 
      },
      error => console.error("No se obtenieron las solicitudes: ", error)
    )
  }

  obtenerInfoDetalle(pasajero: number) {
    this.api.getConPas(pasajero).subscribe(
      (respuesta: any = []) => {
        if (respuesta.length > 0) {
          this.pasajerosDetalle.push(respuesta[0]);
          console.log("Respuesta de getConPas (infoDetalle): ", respuesta)
        }
      },
      error => console.error("Error en getConPas (infoDetalle): ", error)
    )
  }

  // Pasajeros del viaje
  cargarDetalles(idViaje:number) {
    // Obtener las solicitudes del viaje
    this.api.getDetalles(idViaje).subscribe(
      (resultados: any[]) => {
        // Si se obtienen resultados
        if (resultados.length > 0) {
          console.log("Resultado de getDetalles: ", resultados)
          
          this.detalles = resultados;
          this.hayDetalles = true;

          resultados.forEach(tmp => {
            this.obtenerInfoDetalle(tmp.pasajero);
            console.log("idPasajero detalle: ", tmp.pasajero)
          });

          console.log("Resultado de getDetalles array: ", this.detalles)
          console.log("Pasajeros detalle: ", this.pasajerosDetalle)
        } 
      },
      error => console.error("No se obtenieron los detalles: ", error)
    )
  }

  // Obtener el viaje al iniciar la vista
  ngOnInit() {
    // Solicitud a la api para obtener el viaje del usuario
    this.api.getViajeC(this.idUsuario, "iniciado").subscribe(
      (resultado: any[]) => {
        if (resultado.length > 0) {
          this.viaje = resultado[0];
          console.log("Resultado getViajeC: ", this.viaje)

          this.cargarSolicitudes(this.viaje.idViaje);
          this.cargarDetalles(this.viaje.idViaje);

        } else {
          console.error("No se encontraron viajes para este usuario");
        }
      },
      error => console.error("Error con el viaje obtenido: ", error)
    );
  }
}