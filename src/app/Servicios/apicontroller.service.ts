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

  // Obtener usuario - Usuario y contraseña para el login
  getUsuario(user: String, pass: String):Observable<any> {
    const url = `${this.apiUrl}/usuarios/?correo=${user}&contasenia=${pass}`
    return this.http.get(url)
  }

  // Obtener usuario - Usuario para recuperar la contraseña
  getSoloUsuario(user: String): Observable <any> {
    const url = `${this.apiUrl}/usuarios/?correo=${user}`
    return this.http.get(url)
  }

  // Agregar usuario
  postUsuario(user: any): Observable<any> {
    return this.http.post(this.apiUrl + "/usuarios/", user);
  }

  // Actualizar usuario
  putUsuario(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/usuarios/${id}/`;  
    return this.http.put(url, data);
  }
}
