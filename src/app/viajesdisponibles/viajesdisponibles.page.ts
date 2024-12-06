import { Component, OnInit } from '@angular/core';

import { ApicontrollerService } from '../Servicios/apicontroller.service';
import { Router } from '@angular/router';
import { StorageService } from '../Servicios/storage.service';

@Component({
  selector: 'app-viajesdisponibles',
  templateUrl: './viajesdisponibles.page.html',
  styleUrls: ['./viajesdisponibles.page.scss'],
})
export class ViajesdisponiblesPage implements OnInit {

  constructor(
    private api: ApicontrollerService,
    private router: Router,
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
  
  viajes: any = [];
  viajeId = 0;

  // Usuario activo
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

  solicitarViaje(idViaje: number) {
    const solicitud = {
      "viaje_id": idViaje,
      "pasajero_id": this.idUsuario,
      "estado": "No aceptada"
    };

    this.api.postSolicitud(solicitud).subscribe(
      resultado => {
        const usuarioActualizado = {
          "rut": this.usuarioEncontrado.rut,
          "nombres": this.usuarioEncontrado.nombres,
          "paterno": this.usuarioEncontrado.paterno,
          "materno": this.usuarioEncontrado.materno,
          "correo": this.usuarioEncontrado.correo,
          "contrasenia": this.usuarioEncontrado.contrasenia,
          "tipo": "pasajero"
        };

        this.api.putUsuario(this.usuarioEncontrado.idUsuario, usuarioActualizado).subscribe(
          respuesta => {
            // Se actualiza el tipo del usuario a pasajero
            this.strg.remove("usuario")
            
            const usuarioActualizado2 = {
              "idUsuario": this.usuarioEncontrado.idUsuario,
              "rut": this.usuarioEncontrado.rut,
              "nombres": this.usuarioEncontrado.nombres,
              "paterno": this.usuarioEncontrado.paterno,
              "materno": this.usuarioEncontrado.materno,
              "correo": this.usuarioEncontrado.correo,
              "contrasenia": this.usuarioEncontrado.contrasenia,
              "tipo": "pasajero"
            };
            
            this.strg.set("usuario", usuarioActualizado2)
            this.router.navigate(["/inicio"]);
            console.log("Resultado post solicitud: ", resultado)
          },
          error => console.error("Error en putUsuarioPasajero: ", error)
        )
        
      },
      error => {
        console.error("Error al post solicitud: ", error)
      }
    )
  }

  async ngAfterContentInit() {
    const user = await this.strg.get("usuario");

    if (user) {
      this.usuarioEncontrado = user;
      console.log("Usuario obtenido storage: ", this.usuarioEncontrado)
    } else {
      console.log("Error con el storage en confirmacion")
    }
  }

  ngOnInit() {
    this.api.getViajes().subscribe(
      (resultados: any[]) => {
        if (resultados.length > 0) {
          this.viajes = resultados;
          console.log("Resultado getViajes: ", this.viajes);

          resultados.forEach(tmp => {
            console.log("tmp conductor: ", tmp.conductor);
          });
        };
      },
      error => {
        console.error("Error al obtener viajes: ", error)
      }
    );
  }

}
