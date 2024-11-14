import { Component, OnInit } from '@angular/core';
import { ApicontrollerService } from '../Servicios/apicontroller.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-progviajes',
  templateUrl: './progviajes.page.html',
  styleUrls: ['./progviajes.page.scss'],
})
export class ProgviajesPage implements OnInit {

  idUsuario = 0

  viaje = {
    "conductor": "",
    "costoPersona": "",
    "capacidadActual": "",
    "capacidadMaxima": "",
    "direccionInicio": "",
    "direccionFinal": "",
    "horaInicio": ""
  }

  constructor(private api:ApicontrollerService, private router:Router) { 
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      id: number;
    };
    this.idUsuario = state.id;
  }

  crearViaje() {
    const viaje = {
      "conductor": this.idUsuario,
      "costoPersona": this.viaje.costoPersona,
      "capacidadActual": 0,
      "capacidadMaxima": this.viaje.capacidadMaxima,
      "direccionInicio": this.viaje.direccionInicio,
      "direccionFinal": this.viaje.direccionFinal,
      "horaInicio": this.viaje.horaInicio
    }

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

  ngOnInit() {
    console.log("Usuario progviaje", this.idUsuario)
  }

}
