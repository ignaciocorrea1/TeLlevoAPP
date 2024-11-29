import { Component, OnInit } from '@angular/core';

import { MapaService } from '../Servicios/mapa.service';
import { Router } from '@angular/router';
import { ApicontrollerService } from '../Servicios/apicontroller.service';
import { StorageService } from '../Servicios/storage.service';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.page.html',
  styleUrls: ['./confirmar.page.scss'],
})
export class ConfirmarPage implements OnInit {

  constructor(
    private map: MapaService, 
    private router:Router, 
    private api:ApicontrollerService,
    private strg: StorageService
  ) { 
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      conductor: number,
      costoPersona: number,
      capacidadActual: number,
      capacidadMaxima: number,
      direccionInicio: string,
      direccionFinal: string,
      coordenadasInicioLat: number,
      coordenadasInicioLng: number,
      coordenadasFinalLat: number,
      coordenadasFinalLng: number,
      horaInicio: string
    }
    this.viaje.conductor = state.conductor;
    this.viaje.costoPersona = state.costoPersona;
    this.viaje.capacidadActual = state.capacidadActual;
    this.viaje.capacidadMaxima = state.capacidadMaxima;
    this.viaje.direccionInicio = state.direccionInicio;
    this.viaje.direccionFinal = state.direccionFinal;
    this.viaje.coordenadasInicioLat = state.coordenadasInicioLat;
    this.viaje.coordenadasInicioLng = state.coordenadasInicioLng;
    this.viaje.coordenadasFinalLat = state.coordenadasFinalLat;
    this.viaje.coordenadasFinalLng = state.coordenadasFinalLng;
    this.viaje.horaInicio = state.horaInicio;
  }

  viaje = {
    "conductor": 0,
    "costoPersona": 0,
    "capacidadActual": 0,
    "capacidadMaxima": 0,
    "direccionInicio": "",
    "direccionFinal": "",
    "coordenadasInicioLat": 0,
    "coordenadasInicioLng": 0,
    "coordenadasFinalLat": 0,
    "coordenadasFinalLng": 0,
    "horaInicio": "",
    "estado": ""
  }

  usuarioEcontrado = {
    "idUsuario": 0,
    "rut": "",
    "nombres": "",
    "paterno": "",
    "materno": "",
    "correo": "",
    "contrasenia": "",
    "tipo": ""
  }

  // Crear el viaje del usuario
  crearViaje() {
    const viaje = {
      "conductor": this.viaje.conductor,
      "costoPersona": this.viaje.costoPersona,
      "capacidadActual": 0,
      "capacidadMaxima": this.viaje.capacidadMaxima,
      "direccionInicio": this.viaje.direccionInicio,
      "direccionFinal": this.viaje.direccionFinal,
      "coordenadasInicioLat": this.viaje.coordenadasInicioLat,
      "coordenadasInicioLng": this.viaje.coordenadasInicioLng,
      "coordenadasFinalLat": this.viaje.coordenadasFinalLat,
      "coordenadasFinalLng": this.viaje.coordenadasFinalLng,
      "horaInicio": this.viaje.horaInicio,
      "estado": "iniciado"
    }
    console.log(viaje)

    this.api.postViaje(viaje).subscribe(
      resultado => {
        const usuarioActualizado = {
          "rut": this.usuarioEcontrado.rut,
          "nombres": this.usuarioEcontrado.nombres,
          "paterno": this.usuarioEcontrado.paterno,
          "materno": this.usuarioEcontrado.materno,
          "correo": this.usuarioEcontrado.correo,
          "contrasenia": this.usuarioEcontrado.contrasenia,
          "tipo": "conductor"
        };

        this.api.putUsuario(this.usuarioEcontrado.idUsuario, usuarioActualizado).subscribe(
          respuesta => {
            this.strg.remove("usuario")
            
            const usuarioActualizado2 = {
              "idUsuario": this.usuarioEcontrado.idUsuario,
              "rut": this.usuarioEcontrado.rut,
              "nombres": this.usuarioEcontrado.nombres,
              "paterno": this.usuarioEcontrado.paterno,
              "materno": this.usuarioEcontrado.materno,
              "correo": this.usuarioEcontrado.correo,
              "contrasenia": this.usuarioEcontrado.contrasenia,
              "tipo": "conductor"
            };
            
            this.strg.set("usuario", usuarioActualizado2)
            this.router.navigate(["/inicio"]);
          },
          error => {
            console.error("Error al crear el viaje: ", error)
          }
        )
      },
      error => {
        console.log("Error al crear el viaje: ", error)
      }
    )
  }

  // Volver al formulario
  cancelarViaje() {
    this.router.navigate(["/progviajes"])
  }

  ionViewWillEnter() {
    // Coordenadas de la direccion inicial y final
    const startCoords: [number, number] = [this.viaje.coordenadasInicioLng, this.viaje.coordenadasInicioLat];
    const endCoords: [number, number] = [this.viaje.coordenadasFinalLng, this.viaje.coordenadasFinalLat];

    // Se inicializa el mapa al entrar a la vista
    this.map.buildMap('map-confirmacion', startCoords[0], startCoords[1]);

    // Si el mapa esta inicializado se da un timeout para generar los marcadores
    if (this.map) {
      setTimeout(() => {
        // Marcador de la direccion de inicio
        this.map.addMarker(startCoords[0], startCoords[1]);  
        // Marcador de la direccion final
        this.map.addMarker(endCoords[0], endCoords[1]);    
        // Ruta
        this.map.drawRoute(startCoords, endCoords);
      }, 1000);
    }
  }

  async ngOnInit() {
    const user = await this.strg.get("usuario");

    if (user) {
      this.usuarioEcontrado = user;
      console.log("Usuario obtenido storage: ", this.usuarioEcontrado)
    } else {
      console.log("Error con el storage en confirmacion")
    }
  }

}
