import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApicontrollerService } from '../Servicios/apicontroller.service';
import { StorageService } from '../Servicios/storage.service';

interface Solicitud {
  idSolicitud: number;
  estado: string;
  viaje: number;
  pasajero: number;
}

@Component({
  selector: 'app-estado',
  templateUrl: './estado.page.html',
  styleUrls: ['./estado.page.scss'],
})
export class EstadoPage implements OnInit {

  constructor(
    private router: Router,
    private api: ApicontrollerService,
    private strg: StorageService
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

  solicitud = {
    "idSolicitud": 0,
    "estado": "",
    "viaje": 0,
    "pasajero": 0
  };

  infoViaje = {
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
  }

  infoConductor = {
    "idUsuario": 0,
    "rut": "",
    "nombres": "",
    "paterno": "",
    "materno": "",
    "correo": "",
    "contrasenia": "",
    "tipo": ""
  }

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

  nombreConductor = "";

  // Obtener la informacion del conductor del viaje
  obtenerInfoConductor(conductor:number) {
    // Solicitud para obtener la informacion del conductor "usuario"
    this.api.getConPas(conductor).subscribe(
      (respuesta: any = []) => {
        if (respuesta.length > 0) {
          this.infoConductor = respuesta[0];

          this.nombreConductor = this.infoConductor.nombres + " " + this.infoConductor.paterno + " " + this.infoConductor.materno;
          console.log("Respuesta en infoConductor: ", respuesta);
        }
      },
      error => console.error("Error en infoConductor: ", error)
    )
  }

  // Obtener la informacion del viaje
  obtenerInfoViaje(idViaje:number) {
    // Solicitud para obtener el viaje asociado a la solicitud del pasajero
    this.api.getViajeP(idViaje).subscribe(
      (respuesta: any = []) => {
        if (respuesta.length > 0) {
          this.infoViaje = respuesta[0];

          // Obtener la informaciond el conductor
          this.obtenerInfoConductor(this.infoViaje.conductor);
        }
        console.log("Respuesta obtenerInfoViaje: ", respuesta)
      },
      error => console.error("Error en obtenerInfoViaje: ", error)
    )
  }

  // Cuando la solicitud se rechaza el usuario se actualiza a normal nuevamente
  // y se redirecciona a la vista de viajes disponibles
  verViajes() {
    // Se crea el objeto del usuario
    const usuarioActualizado = {
      "rut": this.usuarioEncontrado.rut,
      "nombres": this.usuarioEncontrado.nombres,
      "paterno": this.usuarioEncontrado.paterno,
      "materno": this.usuarioEncontrado.materno,
      "correo": this.usuarioEncontrado.correo,
      "contrasenia": this.usuarioEncontrado.contrasenia,
      "tipo": "normal"
    };

    // Se manda la solicitud
    this.api.putUsuario(this.idUsuario, usuarioActualizado).subscribe(
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
        this.router.navigate(["/viajesdisponibles"], navigationExtras)
      },
      error => console.error("Error en putUsuario en verViajes(): ", error)
    )
  }

  // Obtener la informacion completa del pasajero para poder actualizar sus datos
  obtenerInfoUsuario(idUsuario: number) {
    this.api.getConPas(idUsuario).subscribe(
      (resultado: any = []) => {
        if (resultado.length > 0) {
          this.usuarioEncontrado = resultado[0];

          console.log("Respuesta getConPas en obtenerInfoUsuario: ", resultado);
          console.log("Usuario encontrado: ", this.usuarioEncontrado);
        }
      },
      error => console.error("Error en getConPas en obtenerInfoUsuario", error)
    )
  }

  ngOnInit() {
    // Solicitud para obtener la solicitud del pasajero
    this.api.getSolicitud(this.idUsuario).subscribe(
      (respuesta: any = []) => {
        if (respuesta.length > 0) {
        // Busca la solicitud con el idSolicitud más alto
        this.solicitud = respuesta.reduce((max: Solicitud, current: Solicitud) => 
          current.idSolicitud > max.idSolicitud ? current : max, respuesta[0]);
        
        if (this.solicitud) {
          // Se obtiene la información del viaje y usuario
          this.obtenerInfoViaje(this.solicitud.viaje);
          this.obtenerInfoUsuario(this.idUsuario);

          console.log("Respuesta getSolicitud: ", respuesta);
          console.log("Objeto Solicitud: ", this.solicitud);
        }
      }
      },
      error => console.error("Error en getSolicitud: ", error)
    )
  }
}
