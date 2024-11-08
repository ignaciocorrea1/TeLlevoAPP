import { Component, OnInit } from '@angular/core';
import { ApicontrollerService } from '../Servicios/apicontroller.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  /*
    Falta la validacion de cada campo pero si se añaden
  */

  constructor(private api:ApicontrollerService) { }
  
  // Usuario
  user = {
    "rut": "",
    "nombres": "",
    "paterno": "",
    "materno": "",
    "correo": "",
    "contrasenia": "",
    "contrasenia2": "",
    "tipo": ""
  }

  selectedR = false;
  selectedN = false;
  selectedP = false;
  selectedM = false;
  selectedC = false;
  selectedCc = false;
  selectedCCC = false;

  // Registrar
  registrar() {
    // Se valida que las contraseñas coincidad
    if (this.user.contrasenia === this.user.contrasenia2) {
      // Se crea un nuevo modelo de usuario
      const userNuevo = {
        "rut": this.user.rut,
        "nombres": this.user.nombres,
        "paterno": this.user.paterno,
        "materno": this.user.materno,
        "correo": this.user.correo,
        "contrasenia": this.user.contrasenia,
        "tipo": "pasajero"
      }

      // Se asigna un usuario
      this.api.postUsuario(userNuevo).subscribe(
        respuesta => {
          this.limpiarInputs();
          console.log("Registro exitoso")
        },
        error => {
          this.msgError("registro")
          console.log("Registro erroneo", error)
        }
      )
    } else {
      console.log("CONTRASEÑAS INCORECTAS: ",this.user.contrasenia+" --- "+this.user.contrasenia2)
    }
  };

  // Limpiar input post registro
  limpiarInputs() {
    // Se obtienen los inputs 
    const input1 = document.getElementById("rut") as HTMLIonInputElement;
    const input2 = document.getElementById("nombres") as HTMLIonInputElement;
    const input3 = document.getElementById("paterno") as HTMLIonInputElement;
    const input4 = document.getElementById("materno") as HTMLIonInputElement;
    const input5 = document.getElementById("correo") as HTMLIonInputElement;
    const input6 = document.getElementById("password") as HTMLIonInputElement;
    const input7 = document.getElementById("password2") as HTMLIonInputElement;

    // Si se obtienen se vacian
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

  // Mensaje de error si el registro sale mal o los campos son incorrectos
  msgError(input:string) {
    // Se obtiene el mensaje de error
    const msgError = document.getElementById("error-msg") as HTMLIonTextElement;

    // Se resetea el display
    if (msgError) {
      msgError.style.display = "none";
    };
    
    if (input === "registro") {
      // Si ocurre un error al registrar
      msgError.style.display = "block";
      msgError.textContent = "Error al registrar";
    } else {
      msgError.style.display = "none";
    };
  };

  // labelPos(input:string) {
     
  // }

  ngOnInit() {
  }

}
