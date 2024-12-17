import { Component, OnInit } from '@angular/core';

import { ApicontrollerService } from '../Servicios/apicontroller.service';
import { StorageService } from '../Servicios/storage.service';
import { NavigationExtras } from '@angular/router';

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

  usuarioEncontrado = {
    "idUsuario": 0,
    "rut": "",
    "nombres": "",
    "paterno": "",
    "materno": "",
    "correo": "",
    "contrasenia": "",
    "tipo": ""
  }

  solicitudes: any = [];
  haySolicitudes = false;

  detalles: any = [];
  hayDetalles = false;

  pasajeros: any = [];


  // Aceptar la solicitud al viaje
  aceptarSolicitud(idSolicitud: number, idPasajero: number) {
    // Creacion de la solicitud actualizada
    const solicitudActualizada = {
      "viaje_id": this.viaje.idViaje,
      "pasajero_id": idPasajero,
      "estado": "Aceptada"
    }
    // Creacion del detalle del viaje
    const detalle = {
      "viaje_id": this.viaje.idViaje,
      "pasajero_id": idPasajero
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

            this.actualizarDatos();

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
      "viaje_id": this.viaje.idViaje,
      "pasajero_id": idPasajero,
      "estado": "Rechazada"
    }

    // Se manda la solicitud
    this.api.putSolicitud(idSolicitud, solicitudActualizada).subscribe(
      res => {
        this.rechazado = true;
        
        this.actualizarDatos();

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
              this.api.getConPas(tmp.pasajero.idUsuario).subscribe(
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
            console.log("idPasajero detalle: ", tmp.pasajero)
          });

          console.log("Resultado de getDetalles array: ", this.detalles)
        } 
      },
      error => console.error("No se obtenieron los detalles: ", error)
    )
  }

  // Opcion para iniciar o terminar el viaje
  opcionViaje(idViaje: number, estado: string) {
    const viaje = {
      "conductor_id": this.viaje.conductor,
      "costoPersona": this.viaje.costoPersona,
      "capacidadActual": 0,
      "capacidadMaxima": this.viaje.capacidadMaxima,
      "direccionInicio": this.viaje.direccionInicio,
      "direccionFinal": this.viaje.direccionFinal,
      "coordenadasInicioLat": this.viaje.coordenadasInicioLat,
      "coordenadasInicioLng": this.viaje.coordenadasInicioLng,
      "coordenadasFinalLat": this.viaje.coordenadasFinalLat,
      "coordenadasFinalLng": this.viaje.coordenadasFinalLng,
      "horaInicio": this.viaje.horaInicio,
      "estado": estado
    }

    // Se manda la solicitud para actualizar el viaje
    this.api.putViaje(idViaje, viaje).subscribe(
      res => {
        if (estado === 'terminado' || estado === 'cancelado') {
          this.actualizacionConductor(this.usuarioEncontrado.idUsuario)
        } else {
          this.actualizarDatos();
        }
      },
      error => console.error("Error en putViaje en terminarViaje(): ", error)
    )
  }

  // Actualizacion del conductor a normal
  actualizacionConductor(idConductor: number) {
    const usuarioActualizado = {
      "rut": this.usuarioEncontrado.rut,
      "nombres": this.usuarioEncontrado.nombres,
      "paterno": this.usuarioEncontrado.paterno,
      "materno": this.usuarioEncontrado.materno,
      "correo": this.usuarioEncontrado.correo,
      "contrasenia": this.usuarioEncontrado.contrasenia,
      "tipo": "normal"
    };

    this.api.putUsuario(idConductor, usuarioActualizado).subscribe(
      respuesta => {
        // Se actualiza la informacion local
        this.strg.remove("usuario")
        
        const usuarioActualizado2 = {
          "idUsuario": this.usuarioEncontrado.idUsuario,
          "rut": this.usuarioEncontrado.rut,
          "nombres": this.usuarioEncontrado.nombres,
          "paterno": this.usuarioEncontrado.paterno,
          "materno": this.usuarioEncontrado.materno,
          "correo": this.usuarioEncontrado.correo,
          "contrasenia": this.usuarioEncontrado.contrasenia,
          "tipo": "normal"
        };
        
        this.strg.set("usuario", usuarioActualizado2)

        // Se redirecciona a la otra vista
        let navigationExtras: NavigationExtras = {
          state: {
            idUsuario: this.idUsuario
          }
        }
        this.router.navigate(["/inicio"], navigationExtras)
      },
      error => console.error("Error en putUsuario en actualizacionConductor(): ", error)
    )
  }

  // Obtener la info del conductor para actualizar una vez termine o cancele el viaje
  obtenerInfoConductor(idConductor: number) {
    this.api.getConPas(idConductor).subscribe(
      (resultado: any = []) => {
        if (resultado.length > 0) {
          this.usuarioEncontrado = resultado[0];

          console.log("Respuesta getConPas en obtenerInfoUsuario(): ", resultado);
          console.log("Usuario encontrado en getConPas en obtenerInfoUsuario(): ", this.usuarioEncontrado);
        }
      },
      error => console.error("Error en getConPas en obtenerInfoUsuario", error)
    )
  }

  // Recargar los datos
  actualizarDatos() {
    // Obtener el viaje actualizado
    this.api.getViajeC(this.idUsuario, "activo").subscribe(
      (resultado: any[]) => {
        if (resultado.length > 0) {
          this.viaje = resultado[0];
          // Recargar solicitudes y detalles
          this.cargarSolicitudes(this.viaje.idViaje);
          this.cargarDetalles(this.viaje.idViaje);
        }
      },
      error => console.error("Error al actualizar datos: ", error)
    );
  }

  // Obtener el viaje al iniciar la vista
  ngOnInit() {
    // Solicitud a la api para obtener el viaje del usuario
    this.api.getViajeC(this.idUsuario, "activo").subscribe(
      (resultado: any[]) => {
        if (resultado.length > 0) {
          this.viaje = resultado[0];
          console.log("Resultado getViajeC: ", this.viaje);

          this.cargarSolicitudes(this.viaje.idViaje);
          this.cargarDetalles(this.viaje.idViaje);
          this.obtenerInfoConductor(this.idUsuario)

        } else {
          console.error("No se encontraron viajes para este usuario");
        }
      },
      error => {
        console.error("Error con el viaje obtenido: ", error);
      }
    );
  }
}