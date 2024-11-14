import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from './Servicios/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private strg: StorageService, private router: Router) {}

  // Funcion para verificar el estadod el usuario cuando abre la app, async porque se tiene que esperar
  // la repuesta
  async ngOnInit() {
    const estado = await this.strg.get("estado");
    // console.log("Estado de conexion al abrir la app: ", estado)

    // Si el estado de conexion es true, se obtiene el usuario
    if (estado) {
      const usuarioObtenido = await this.strg.get("usuario");
      // console.log("Usuario obtenido al abrir la app: ", usuarioObtenido)

      // Si se encuentra un usuario se mandan los datos y se redirecciona al inicio
      if (usuarioObtenido) {
        let navigationExtras: NavigationExtras = {
          state: {
            id: usuarioObtenido.id,
            rut: usuarioObtenido.rut,
            nombres: usuarioObtenido.nombres,
            paterno: usuarioObtenido.paterno,
            materno: usuarioObtenido.materno,
            correo: usuarioObtenido.correo,
            contrasenia: usuarioObtenido.contrasenia,
            tipo: usuarioObtenido.tipo
          }
        }
        this.router.navigate(["/inicio"], navigationExtras)
      } else {
        this.router.navigate(["/home"])
      };
    } else {
      this.router.navigate(["/home"])
    };
  }
}
