import { Injectable } from '@angular/core';
import { ApicontrollerService } from './apicontroller.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  /*  
    Usar callback hace que una funcion se ponga a la espera de una respuesta.
  */

  constructor(private api:ApicontrollerService, private strg: StorageService) { }

  // Login de usuario
  login(user: String, pass: String, callback: (resultado: boolean, usuario?: any) => void) {
    if (user !== "" && pass !== "") {
      // Si los campos no son vacios se llama a la funcion para validar la existencia del usuario
      this.validarUsuario(user, pass, callback);
    } else {
      this.strg.set("estado", false)
      callback(false);  
    }
  }

  validarUsuario(user: String, pass: String, callback: (resultado: boolean, usuario?: any) => void) {
    // Se realiza la solicitud a la api
    this.api.getUsuario(user, pass).subscribe(
      data => {
        // Si se obtienen datos, el primer objeto se asociará al usuario obtenido
        if (data.length > 0) {
          const usuarioObtenido = data[0];  
  
          // Si las credencias son correctas
          if (usuarioObtenido.correo === user && usuarioObtenido.contrasenia === pass) {
            // Se cambia el estado de conexion y el callback se resuelve y se setea el localStorage      
            this.strg.set("usuario", usuarioObtenido);
            this.strg.set("estado", true);
            callback(true, usuarioObtenido);  
            return;
          } else {
            this.strg.set("estado", false);
            callback(false); 
          } 
        } else {
          this.strg.set("estado", false);
          callback(false);  
        }
      },
      error => {
        this.strg.set("estado", false);
        callback(false);  
      }
    );
  };

  validarSoloUsuario(user: String, callback: (resultado: boolean, usuario?: any) => void) {
    this.api.getSoloUsuario(user).subscribe(
      data => {
        if (data.length > 0) {
          const usuarioObtenido = data[0];
          callback(true, usuarioObtenido)
        }
        else {
          callback(false)
        }
      },
      error => {
        callback(false)
      }
    )
  };

  logout() {
    this.strg.remove("usuario")
    this.strg.remove("estado");
  }

  // Se tiene que esperar la respuesta del localStorage, si no encuentra valor es false
  async isConected() {
    return await this.strg.get("estado") ?? false;
  }
}
