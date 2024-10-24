import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicontrollerService {

  constructor(private http: HttpClient) { }

  // Ruta de la api
  apiUrl = "http://127.0.0.1:8000/api";

  // Obtener usuario
  getUsuario(user: String, pass: String):Observable<any> {
    const url = `${this.apiUrl}/usuarios/?correo=${user}&contasenia=${pass}`
    return this.http.get(url)
  }
}
