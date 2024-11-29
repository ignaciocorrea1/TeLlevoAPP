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
  apiUrl = "https://jbwrbwdb-8000.brs.devtunnels.ms/api";

  /* Usuarios */

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

  // Obtener pasajero
  getPasajero(idUsuario: number): Observable <any> {
    const url = `${this.apiUrl}/usuarios/?idUsuario=${idUsuario}`
    return this.http.get(url)
  }

  // Agregar 
  postUsuario(user: any): Observable<any> {
    return this.http.post(this.apiUrl + "/usuarios/", user);
  }

  // Actualizar 
  putUsuario(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/usuarios/${id}/`;  
    return this.http.put(url, data);
  }

  /* Viajes */
  
  // Agregar
  postViaje(viaje:any): Observable<any> {
    return this.http.post(this.apiUrl + "/viajes/", viaje)
  }

  // Obtener el viaje iniciado del conductor
  getViajeC(userId: number, estado:string): Observable<any> {
    const url = `${this.apiUrl}/viajes/?conductor=${userId}&estado=${estado}`
    return this.http.get(url)
  }
  
  // Obtener los viajes disponibles para el usuario
  getViajes(): Observable<any> {
    const url = `${this.apiUrl}/viajes/?estado=iniciado`
    return this.http.get(url)
  }

  // Actualizar 
  putViaje(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/viajes/${id}/`;  
    return this.http.put(url, data);
  }

  /* Solicitudes de viajes */
  
  // Agregar
  postSolicitud(solicitud:any): Observable<any> {
    return this.http.post(this.apiUrl + "/solicitudes/", solicitud)
  }

  // Obtener las solicitudes del viaje del conductor
  getSolicitudes(viaje: number): Observable<any> {
    const url = `${this.apiUrl}/solicitudes/?viaje${viaje}`
    return this.http.get(url)
  }

  // Actualizar solicitud a aceptada
  putSolicitud(idSolicitud: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/solicitudes/${idSolicitud}/`;  
    return this.http.put(url, data);
  }
}
