import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../Servicios/storage.service';
import { AuthenticatorService } from '../Servicios/authenticator.service';

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
    "contrasenia": "",
    "tipo": ""
  }

  constructor(private router:Router, private strg:StorageService, private auth:AuthenticatorService) { 
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
      tipo: "";
    };
    this.user.id = state.id;
    this.user.rut = state.rut;
    this.user.nombres = state.nombres;
    this.user.paterno = state.paterno;
    this.user.materno = state.materno;
    this.user.correo = state.correo;
    this.user.contrasenia = state.contrasenia;
    this.user.tipo = state.tipo;

  };

  ngOnInit() {
    console.log("Storage en vista inicio (estado): ", this.strg.get("estado"))
    console.log("Storage en vista inicio (usuario): ", this.strg.get("usuario"))
    console.log("Auth en vista inicio: ", this.auth.isConected())
  }

}
