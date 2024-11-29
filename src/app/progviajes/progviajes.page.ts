import { Component, OnInit } from '@angular/core';
import { ApicontrollerService } from '../Servicios/apicontroller.service';

import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../Servicios/storage.service';

import { GeolocationService } from '../Servicios/geolocation.service';
@Component({
  selector: 'app-progviajes',
  templateUrl: './progviajes.page.html',
  styleUrls: ['./progviajes.page.scss'],
})
export class ProgviajesPage implements OnInit {

  constructor(
    private api:ApicontrollerService, 
    private router:Router,
    private strg:StorageService,
    private geo:GeolocationService
  ) { }

  idUsuario = 0;

  viaje = {
    "conductor": 0,
    "costoPersona": "",
    "capacidadActual": "",
    "capacidadMaxima": "",
    "direccionInicio": "",
    "direccionFinal": "",
    "coordenadasInicioLat": 0,
    "coordenadasInicioLng": 0,
    "coordenadasFinalLat": 0,
    "coordenadasFinalLng": 0,
    "horaInicio": ""
  }

  // Buscador direccion inicio
  direcciones1: {place_name: string, latitude: number, longitude: number}[] = [];
  selectedDireccion1: {place_name: string, latitude: number, longitude: number} | null = null;

  // Buscador direccion final
  direcciones2: {place_name: string, latitude: number, longitude: number}[] = [];
  selectedDireccion2: {place_name: string, latitude: number, longitude: number} | null = null;

  // Buscador direccion inicio
  buscador1(event: any) {
    const terminoBuscado = event.target.value.toLowerCase();
    if (terminoBuscado && terminoBuscado.length > 0) {
      this.geo.searchDirection(terminoBuscado)
      .subscribe((features) => {
        this.direcciones1 = features;
      })
    } else {
      this.direcciones1 = [];
      this.selectedDireccion1 = null;
    }
  }

  onSelect1(direccion: {place_name: string, latitude: number, longitude: number}) {
    this.selectedDireccion1 = direccion;
    this.direcciones1 = []
  }

  // Buscador direccion final
  buscador2(event: any) {
    const terminoBuscado = event.target.value.toLowerCase();
    if (terminoBuscado && terminoBuscado.length > 0) {
      this.geo.searchDirection(terminoBuscado)
      .subscribe((features) => {
        this.direcciones2 = features;
      })
    } else {
      this.direcciones2 = [];
      this.selectedDireccion2 = null;
    }
  }

  onSelect2(direccion: {place_name: string, latitude: number, longitude: number}) {
    this.selectedDireccion2 = direccion;
    this.direcciones2 = []
  }

  // Navegar a la ruta para confirmar la creacion del viaje
  irConfirmarcion() {
    if (this.selectedDireccion1 && this.selectedDireccion2) {
      const viaje = {
        "conductor": this.idUsuario,
        "costoPersona": this.viaje.costoPersona,
        "capacidadActual": 0,
        "capacidadMaxima": this.viaje.capacidadMaxima,
        "direccionInicio": this.selectedDireccion1.place_name,
        "direccionFinal": this.selectedDireccion2.place_name,
        "coordenadasInicioLat": this.selectedDireccion1.latitude,
        "coordenadasInicioLng": this.selectedDireccion1.longitude,
        "coordenadasFinalLat": this.selectedDireccion2.latitude,
        "coordenadasFinalLng": this.selectedDireccion2.longitude,
        "horaInicio": this.viaje.horaInicio
      }

      let navigationExtras: NavigationExtras = {
        state: {
          conductor: viaje.conductor,
          costoPersona: Number(viaje.costoPersona),
          capacidadActual: Number(viaje.capacidadActual),
          capacidadMaxima: Number(viaje.capacidadMaxima),
          direccionInicio: viaje.direccionInicio,
          direccionFinal: viaje.direccionFinal,
          coordenadasInicioLat: viaje.coordenadasInicioLat,
          coordenadasInicioLng: viaje.coordenadasInicioLng,
          coordenadasFinalLat: viaje.coordenadasFinalLat,
          coordenadasFinalLng: viaje.coordenadasFinalLng,
          horaInicio: viaje.horaInicio
        }
      };

      this.router.navigate(["/confirmar"], navigationExtras)
    }
  }

  // Obtener la idUsuario a traves del storage ya que el navigationextras se bugea
  async ngOnInit() {
    const usuario = await this.strg.get("usuario");
    
    if (usuario) {
      this.idUsuario = usuario.idUsuario
    } else {
      console.log("Usuario obtenido storage: ninguno")
    }
  }

}
