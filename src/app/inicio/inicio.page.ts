import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../Servicios/storage.service';
import { AuthenticatorService } from '../Servicios/authenticator.service';
import { MenuController } from '@ionic/angular';
import { GeolocationService } from '../Servicios/geolocation.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  // Usuario
  user = {
    "id": 0,
    "rut": "",
    "nombres": "",
    "paterno": "",
    "materno": "",
    "correo": "",
    "contrasenia": "",
    "tipo": ""
  }

  constructor(
    private router:Router, 
    private strg:StorageService, 
    private auth:AuthenticatorService,
    private menuCtrl:MenuController,
    private geo:GeolocationService) { 
    // Se reciben los datos enviados desde el login
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      id: number;
      rut: "";
      nombres: "";
      paterno: "";
      materno: "";
      correo: "";
      contrasenia: "";
      tipo: "";
    };
    this.user.id = Number(state.id);
    this.user.rut = state.rut;
    this.user.nombres = state.nombres;
    this.user.paterno = state.paterno;
    this.user.materno = state.materno;
    this.user.correo = state.correo;
    this.user.contrasenia = state.contrasenia;
    this.user.tipo = state.tipo;

  };

  irProgviajes() {
    let navigationExtras: NavigationExtras = { state : {id: this.user.id}}

    this.router.navigate(["/progviajes"], navigationExtras).then(() => {
      this.menuCtrl.close()
    });
  }
  
  ionViewWillEnter(){
    console.log("Usuario recibido desde home", this.user)
  }

  ngOnInit() {
    console.log("Storage en vista inicio (estado): ", this.strg.get("estado"))
    console.log("Storage en vista inicio (usuario): ", this.strg.get("usuario"))
    console.log("Auth en vista inicio: ", this.auth.isConected())
  };
  
}
