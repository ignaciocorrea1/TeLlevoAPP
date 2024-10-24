import { Injectable } from '@angular/core';
import { ApicontrollerService } from './apicontroller.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  /*  
    Usar callback hace que el login no se siga ejecutando hasta obtener una respuesta
    desde validarUsuario.
  */

  constructor(private api:ApicontrollerService) { }

  connectionStatus: boolean = false;

  // login
  login(user: String, pass: String, callback: (resultado: boolean, usuario?: any) => void) {
    if (user !== "" && pass !== "") {
      // Solicitud API
      // Aqui el login queda a la espera del callback y no se sigue ejecutando
      this.validarUsuario(user, pass, callback);
    } else {
      this.connectionStatus = false;
      callback(false);  
    }
  }

  // Validar la existencia del usuario - proceso asincronico al realizar una solicitud
  validarUsuario(user: String, pass: String, callback: (resultado: boolean, usuario?: any) => void) {
    // Se realiza la solicitud
    this.api.getUsuario(user, pass).subscribe(
      (data) => {
        if (data.length > 0) {
          // Si encuentra datos se asigna el primer objeto a una constante
          const usuarioObtenido = data[0];  
  
          // Se validan las credenciales ingresadas con las del objeto encontrado
          if (usuarioObtenido.correo === user && usuarioObtenido.contrasenia === pass) {
            // Si el correo y la contraseña son iguales el estado de conexion pasa a true y el 
            // resultado del callback es true y ademas devuelve el usuario indicando que la 
            // operacion fue exitosa. Al retornar true o false el callback, la funcion que 
            // llame al callback podrá seguir ejecutandose ya que se termino el proceso
            this.connectionStatus = true;
            callback(true, usuarioObtenido);  
            // Si se encontro el usuario se sale de la funcion
            return;
          } else {
            // Si no se encontro el usuario el estado de conexion es false y el callback tambien
            this.connectionStatus = false;
            callback(false); 
          } 
        } else {
          this.connectionStatus = false;
          callback(false);  
        }
      },
      (error) => {
        this.connectionStatus = false;
        callback(false);  
      }
    );
  };

  // Validar solo el usuario
  validarSoloUsuario(user: String, callback: (resultado: boolean, usuario?: any) => void) {
    this.api.getSoloUsuario(user).subscribe(
      (data) => {
        if (data.length > 0) {
          const usuarioObtenido = data[0];
          callback(true, usuarioObtenido)
        }
        else {
          callback(false)
        }
      },
      (error) => {
        callback(false)
      }
    )
  };

  //Logout para desconectar del sistema 
  logout() {
    console.log(this.connectionStatus);
    this.connectionStatus = false;
  }

  //Funcion para consultar el estado de conexion
  isConected() {
    return this.connectionStatus;
  }
}
