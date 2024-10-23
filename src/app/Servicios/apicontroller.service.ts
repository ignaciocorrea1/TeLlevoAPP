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

  // Obtener usuarios
  getUsuarios():Observable<any> {
    return this.http.get(this.apiUrl + "/usuarios")
  }
}
