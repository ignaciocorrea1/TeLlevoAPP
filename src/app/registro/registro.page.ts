import { Component, OnInit } from '@angular/core';
import { ApicontrollerService } from '../Servicios/apicontroller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  /*
    Falta la validacion de cada campo pero si se añaden
  */

  constructor(private api:ApicontrollerService, private router:Router) { }
  
  // Usuario
  user = {
    "rut": "",
    "nombres": "",
    "paterno": "",
    "materno": "",
    "correo": "",
    "contrasenia": "",
    "contrasenia2": "",
    "estadoUsuario": "pasajero"
  }

  registrar() {
    if (this.user.contrasenia === this.user.contrasenia2) {
      const userNuevo = {
        "rut": this.user.rut,
        "nombres": this.user.nombres,
        "paterno": this.user.paterno,
        "materno": this.user.materno,
        "correo": this.user.correo,
        "contrasenia": this.user.contrasenia,
        "tipo": "pasajero"
      }

      this.api.postUsuario(userNuevo).subscribe(
        respuesta => {
          this.limpiarInputs();
          this.msgError("exitoso")

          setTimeout(() => {
            this.router.navigate(["/home"])
          }, 2000);
        },
        error => {
          this.msgError("registro")
          console.log("Registro erroneo", error)
        }
      );
    } else {
      this.msgError("contrasenias");
      console.log("CONTRASEÑAS INCORECTAS: ",this.user.contrasenia+" --- "+this.user.contrasenia2)
    }
  };

  limpiarInputs() {
    const input1 = document.getElementById("rut") as HTMLIonInputElement;
    const input2 = document.getElementById("nombres") as HTMLIonInputElement;
    const input3 = document.getElementById("paterno") as HTMLIonInputElement;
    const input4 = document.getElementById("materno") as HTMLIonInputElement;
    const input5 = document.getElementById("correo") as HTMLIonInputElement;
    const input6 = document.getElementById("password") as HTMLIonInputElement;
    const input7 = document.getElementById("password2") as HTMLIonInputElement;

    if (input1 && input2 && input3 && input4 && input5 && input6 && input7 ) {
      input1.value = "";
      input2.value = "";
      input3.value = "";
      input4.value = "";
      input5.value = "";
      input6.value = "";
      input7.value = "";
    };
  };

  msgError(input:string) {
    const msgError = document.getElementById("error-msg") as HTMLIonTextElement;

    if (msgError) {
      msgError.style.display = "none";
    };
    
    if (input === "registro") {
      msgError.style.display = "block";
      msgError.textContent = "Problema al registrar, intente nuevamente :)";
    } else if (input === "exitoso") {
      msgError.style.display = "block";
      msgError.textContent = "Redirigiendo al inicio...";
    } else if (input === "contrasenias") {
      msgError.style.display = "block";
      msgError.textContent = "Las contraseñas no coinciden";
    } else {
      msgError.style.display = "none";
    };
  };

  ngOnInit() {
  }

}
