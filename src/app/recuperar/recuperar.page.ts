import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticatorService } from '../Servicios/authenticator.service';
import { ApicontrollerService } from '../Servicios/apicontroller.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  constructor(
    private router: Router, 
    private auth:AuthenticatorService,
    private api:ApicontrollerService
  ) {}

  user = {
    username: "",
  };

  usuarioEcontrado = {
    "id": "",
    "rut": "",
    "nombres": "",
    "paterno": "",
    "materno": "",
    "correo": "",
    "contrasenia": "",
  }

  contrasenias = {
    "contrasenia1": "",
    "contrasenia2": ""
  }

  mensaje = "";
  mostrarCambio = false;

  cambiarContrasenia() {
    if (this.contrasenias.contrasenia1 != "" && this.contrasenias.contrasenia2 != "") {
      if (this.contrasenias.contrasenia1 === this.contrasenias.contrasenia2) {
        // Se actualiza la contraseña
        const usuarioActualizado = {
          "rut": this.usuarioEcontrado.rut,
          "nombres": this.usuarioEcontrado.nombres,
          "paterno": this.usuarioEcontrado.paterno,
          "materno": this.usuarioEcontrado.materno,
          "correo": this.usuarioEcontrado.correo,
          "contrasenia": this.contrasenias.contrasenia1
        }
        
        console.log("ID", this.usuarioEcontrado.id);
        console.log("ACTUALIZACION ", usuarioActualizado);
  
        const usuarioID = Number(this.usuarioEcontrado.id);
        this.api.putUsuario(usuarioID, usuarioActualizado).subscribe(
          (respuesta) => {
            console.log("Actualizado", respuesta)
            
            // Se redirecciona al inicio
            this.redireccionamiento();
          },
          (error) => {
            console.log("Eror", error)
          }
        );
      };
    } else {
      this.mensaje = "Faltan campos"
    }
  };

  validar() {
    // Se pasa el usuario para validar que exista en la bd
    if (this.user.username != "") {
      this.auth.validarSoloUsuario(this.user.username, (resultado, usuario) => {
        if (resultado) {
  
          this.mensaje = "";
          this.usuarioEcontrado = usuario;
          this.mostrarCambio = true;
          console.log("Usuario encontrado: ", usuario);
        } else {
          console.log("Usuario no encontrado");
          this.mostrarCambio = false;
          this.mensaje = "No se encontró el usuario buscado";
        };
      });
    } else {
      this.mensaje = "No se encontró el usuario buscado";
    };
  };

  redireccionamiento() {
    // Se cambia el texto a redireccionando
    this.mensaje = "Redireccionando..."

    // Se vacian los inputs
    const input1 = document.getElementById("usuario") as HTMLIonInputElement;
    const input2 = document.getElementById("pass1") as HTMLIonInputElement;
    const input3 = document.getElementById("pass2") as HTMLIonInputElement;

    if (input1 && input2 && input3) {
      input1.value = "";
      input2.value = "";
      input3.value = "";
    }

    // Se redirecciona
    setTimeout(() => {
      // Se vuelve a mostrar lo inicial
      this.router.navigate(['/home'])
    }, 1500);
  }

  ngOnInit() {
  };

  ionViewWillEnter() {
    this.user.username = "";
    this.contrasenias.contrasenia1 = "";
    this.contrasenias.contrasenia2 = "";
    this.mensaje = "";
    this.mostrarCambio = false;
  }

}
