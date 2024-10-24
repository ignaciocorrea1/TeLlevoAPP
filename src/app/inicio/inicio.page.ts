import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  // Usuario
  user = {
    "id": "",
    "rut": "",
    "nombres": "",
    "paterno": "",
    "materno": "",
    "correo": "",
    "contrasenia": ""
  }

  constructor(private router:Router) { 
    // Se reciben los datos enviados desde el login
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      id: "";
      rut: "";
      nombres: "";
      paterno: "";
      materno: "";
      correo: "";
      contrasenia: "";
    };
    this.user.id = state.id;
    this.user.rut = state.rut;
    this.user.nombres = state.nombres;
    this.user.paterno = state.paterno;
    this.user.materno = state.materno;
    this.user.correo = state.correo;
    this.user.contrasenia = state.contrasenia;

  };

  ngOnInit() {
  }

}
