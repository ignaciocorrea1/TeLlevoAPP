import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApicontrollerService } from '../Servicios/apicontroller.service';
import { StorageService } from '../Servicios/storage.service';

interface Conductor {
  idUsuario: number;
  rut: string;
  nombres: string;
  paterno: string;
  materno: string;
  correo: string;
  tipo: string;
}

interface Viaje {
  idViaje: number;
  capacidadActual: number;
  capacidadMaxima: number;
  conductor: Conductor;
  costoPersona: number;
  direccionInicio: string;
  direccionFinal: string;
  coordenadasInicioLat: number;
  coordenadasInicioLng: number;
  coordenadasFinalLat: number;
  coordenadasFinalLng: number;
  horaInicio: string;
  estado: string;
}

interface Pasajero {
  idUsuario: number;
  rut: string;
  nombres: string;
  paterno: string;
  materno: string;
  correo: string;
  contrasenia: string;
  tipo: string;
}

interface Solicitud {
  idSolicitud: number;
  estado: string;
  viaje: Viaje;
  pasajero: Pasajero;
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
  solicitud: Solicitud = {
    idSolicitud: 0,
    estado: '',
    viaje: {
      idViaje: 0,
      capacidadActual: 0,
      capacidadMaxima: 0,
      conductor: {
        idUsuario: 0,
        rut: '',
        nombres: '',
        paterno: '',
        materno: '',
        correo: '',
        tipo: ''
      },
      costoPersona: 0,
      direccionInicio: '',
      direccionFinal: '',
      coordenadasInicioLat: 0,
      coordenadasInicioLng: 0,
      coordenadasFinalLat: 0,
      coordenadasFinalLng: 0,
      horaInicio: '',
      estado: ''
    },
    pasajero: {
      idUsuario: 0,
      rut: '',
      nombres: '',
      paterno: '',
      materno: '',
      correo: '',
      contrasenia: '',
      tipo: ''
    }
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

  nombreConductor = "";

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

    console.log("Usuario actualizado 1: ", usuarioActualizado)

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
      (respuesta: any) => {
        if (respuesta && respuesta.length > 0) {
        // Se busca la solicitud más reciente
        const solicitudReciente = respuesta.reduce((max: any, current: any) => 
          current.idSolicitud > max.idSolicitud ? current : max, respuesta[0]);
        
        this.solicitud = solicitudReciente;

        this.nombreConductor = 
                this.solicitud.viaje.conductor.nombres + " " +
                this.solicitud.viaje.conductor.paterno + " " +
                this.solicitud.viaje.conductor.materno;

        this.obtenerInfoUsuario(this.solicitud.pasajero.idUsuario);
      }
      },
      error => console.error("Error en getSolicitud: ", error)
    )
  }
}
