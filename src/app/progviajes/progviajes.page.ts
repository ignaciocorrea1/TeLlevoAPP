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
    "conductor": "",
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

  direcciones1: {place_name: string, latitude: number, longitude: number}[] = [];
  selectedDireccion1: {place_name: string, latitude: number, longitude: number} | null = null;

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

  crearViaje() {
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
        "coordenadasFinalLat": this.selectedDireccion1.latitude,
        "coordenadasFinalLng": this.selectedDireccion1.longitude,
        "horaInicio": this.viaje.horaInicio
      }
      console.log(viaje)

      this.api.postViaje(viaje).subscribe(
        resultado => {
          console.log("Viaje creado")
        },
        error => {
          console.log("Error al crear el viaje: ", error)
          console.log("Error en viaje: ", viaje)
        }
      )
    }
  }

  async ngOnInit() {
    const usuario = await this.strg.get("usuario");
    
    if (usuario) {
      this.idUsuario = usuario.idUsuario
    } else {
      console.log("Usuario obtenido storage: ninguno")
    }
  }

}
