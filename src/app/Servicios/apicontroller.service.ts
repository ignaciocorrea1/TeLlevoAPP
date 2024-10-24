import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicontrollerService {

  /* 
    - Observable representa la respuesta de la solicitud
    - Suscribe ejecutar codigo cuando el observable emite una respuesta

    ** Solicitud get para obtener el usuario ** 

    ** Solicitud post para agrega un usuario ** 

    ** Solicitud put para actualizar la contraseña ** 

    ** Solicitud delete no se hizo de momento **

  */

  constructor(private http: HttpClient) { }

  // Ruta de la api
  apiUrl = "http://127.0.0.1:8000/api";

  // Obtener usuario
  getUsuario(user: String, pass: String):Observable<any> {
    const url = `${this.apiUrl}/usuarios/?correo=${user}&contasenia=${pass}`
    return this.http.get(url)
  }

  // Agregar usuario
  postUsuario(user: any): Observable<any> {
    return this.http.post(this.apiUrl + "/usuarios/", user);
  }
}
