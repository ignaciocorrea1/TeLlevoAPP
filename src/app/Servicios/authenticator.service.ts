import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {
  //Generamos una variable boolean para rectificar el actual estado de conexion con el autentificador
  connectionStatus: boolean = false;

  constructor() { }
  //Generamos funcion para validar usuario contraseña 
  //Si equivale a los datos configurados entregara valor true si no Indicara falso 
  login(user: String, pass: String): boolean {
    if (user != "" && pass != "") {
      this.connectionStatus = true;
      console.log(this.connectionStatus);
      return true;
    }
    this.connectionStatus = false;
    return false
    
  }
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
