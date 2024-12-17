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
        tipo: '',
      },
      costoPersona: 0,
      direccionInicio: '',
      direccionFinal: '',
      coordenadasInicioLat: 0,
      coordenadasInicioLng: 0,
      coordenadasFinalLat: 0,
      coordenadasFinalLng: 0,
      horaInicio: '',
      estado: '',
    },
    pasajero: {
      idUsuario: 0,
      rut: '',
      nombres: '',
      paterno: '',
      materno: '',
      correo: '',
      contrasenia: '',
      tipo: '',
    },
  };

  usuarioEncontrado = {
    idUsuario: 0,
    rut: '',
    nombres: '',
    paterno: '',
    materno: '',
    correo: '',
    contrasenia: '',
    tipo: '',
  };

  nombreConductor = '';
  solicitudEstado = '';

  // Cancelar viaje
  cancelarViaje(idSolicitud: number, idViaje: number, idPasajero: number) {
    // Se crea la solicitud actualizada
    const solicitudActualizada = {
      viaje_id: idViaje,
      pasajero_id: idPasajero,
      estado: 'Cancelada',
    };

    // Se manda la solicitud actualizada
    this.api.putSolicitud(idSolicitud, solicitudActualizada).subscribe(
      (res) => {
        // Si se actualiza la solicitud se actualiza el pasajero a normal
        this.actualizacionUsuario(idPasajero);

        // Se redirecciona al inicio
        setTimeout(() => {
          let navigationExtras: NavigationExtras = {
            state: {
              id: this.usuarioEncontrado.idUsuario,
              rut: this.usuarioEncontrado.rut,
              nombres: this.usuarioEncontrado.nombres,
              paterno: this.usuarioEncontrado.paterno,
              materno: this.usuarioEncontrado.materno,
              correo: this.usuarioEncontrado.correo,
              contrasenia: this.usuarioEncontrado.contrasenia,
              tipo: this.usuarioEncontrado.tipo,
            },
          };
          this.router.navigate(['/inicio'], navigationExtras);
        }, 1000);
      },
      (error) =>
        console.error('Error en putSolicitud en cancelarViaje(): ', error)
    );
  }

  // Volver a usuario normal una vez se terminó el viaje
  opcionViaje(situacion: string) {
    // Se crea el objeto del usuario
    this.actualizacionUsuario(this.idUsuario);

    // Se redirecciona a la otra vista
    let navigationExtras: NavigationExtras = {
      state: {
        idUsuario: this.idUsuario,
      },
    };

    if (situacion === 'terminado') {
      setTimeout(() => {
        this.router.navigate(['/inicio'], navigationExtras);
      }, 1000);
    } else {
      setTimeout(() => {
        this.router.navigate(['/viajesdisponibles'], navigationExtras);
      }, 1000);
    }
  }

  // Obtener la informacion completa del pasajero para poder actualizar sus datos
  obtenerInfoUsuario(idUsuario: number) {
    this.api.getConPas(idUsuario).subscribe(
      (resultado: any = []) => {
        if (resultado.length > 0) {
          this.usuarioEncontrado = resultado[0];

          console.log('Respuesta getConPas en obtenerInfoUsuario: ', resultado);
          console.log('Usuario encontrado: ', this.usuarioEncontrado);
        }
      },
      (error) =>
        console.error('Error en getConPas en obtenerInfoUsuario', error)
    );
  }

  // Actualizacion del conductor a normal
  actualizacionUsuario(idUsuario: number) {
    const usuarioActualizado = {
      rut: this.usuarioEncontrado.rut,
      nombres: this.usuarioEncontrado.nombres,
      paterno: this.usuarioEncontrado.paterno,
      materno: this.usuarioEncontrado.materno,
      correo: this.usuarioEncontrado.correo,
      contrasenia: this.usuarioEncontrado.contrasenia,
      tipo: 'normal',
    };

    this.api.putUsuario(idUsuario, usuarioActualizado).subscribe(
      (respuesta) => {
        // Se actualiza la informacion local
        this.strg.remove('usuario');

        const usuarioActualizado2 = {
          idUsuario: this.usuarioEncontrado.idUsuario,
          rut: this.usuarioEncontrado.rut,
          nombres: this.usuarioEncontrado.nombres,
          paterno: this.usuarioEncontrado.paterno,
          materno: this.usuarioEncontrado.materno,
          correo: this.usuarioEncontrado.correo,
          contrasenia: this.usuarioEncontrado.contrasenia,
          tipo: 'normal',
        };

        this.strg.set('usuario', usuarioActualizado2);
      },
      (error) =>
        console.error('Error en putUsuario en actualizacionUsuario(): ', error)
    );
  }

  ngOnInit() {
    // Solicitud para obtener la solicitud del pasajero
    this.api.getSolicitud(this.idUsuario).subscribe(
      (respuesta: any) => {
        if (respuesta && respuesta.length > 0) {
          // Se busca la solicitud más reciente
          const solicitudReciente = respuesta.reduce(
            (max: any, current: any) =>
              current.idSolicitud > max.idSolicitud ? current : max,
            respuesta[0]
          );

          this.solicitud = solicitudReciente;

          if (this.solicitud.estado === 'Aceptada') {
            this.solicitudEstado = 'Aceptada';
          } else if (this.solicitud.estado === 'Rechazada') {
            this.solicitudEstado = 'Rechazada';
          } else {
            this.solicitudEstado = '';
          }

          if (
            this.solicitud.viaje.estado === 'cancelado' ||
            this.solicitud.viaje.estado === 'terminado'
          ) {
            this.solicitudEstado = 'cancelado';
          }

          this.nombreConductor =
            this.solicitud.viaje.conductor.nombres +
            ' ' +
            this.solicitud.viaje.conductor.paterno +
            ' ' +
            this.solicitud.viaje.conductor.materno;

          this.obtenerInfoUsuario(this.solicitud.pasajero.idUsuario);
          console.log('Solicitud obtenida: ', respuesta);
        }
      },
      (error) => console.error('Error en getSolicitud: ', error)
    );
  }
}
