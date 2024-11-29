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
  };

  userStorage = {
    "idUsuario": 0,
    "rut": "",
    "nombres": "",
    "paterno": "",
    "materno": "",
    "correo": "",
    "contrasenia": "",
    "tipo": ""
  };

  opciones = true;
  opcionConductor = false;
  opcionPasajero = false;

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

  // Para evitar problemas con el menu
  irProgviajes() {
    this.router.navigate(["/progviajes"]).then(() => {
      this.menuCtrl.close()
    });
  }

  mostrarOpciones() {
    if (this.userStorage.tipo === "conductor") {
      this.opciones = false;
      this.opcionConductor = true;
    } else {
      this.opciones = true;
      this.opcionConductor = false;
    }
  }
  
  irViajeCreado() {
    let navigationExtras: NavigationExtras = {
      state: {
        "idUsuario": this.userStorage.idUsuario
      }
    }
    this.router.navigate(["/viaje-creado"], navigationExtras);
  }

  irViajesDisponibles() {
    let navigationExtras: NavigationExtras = {
      state: {
        "idUsuario": this.userStorage.idUsuario
      }
    }
    this.router.navigate(["/viajesdisponibles"], navigationExtras);
  }

  async ionViewWillEnter(){
    const usuario = await this.strg.get("usuario")

    if (usuario) {
      this.userStorage = usuario;
      this.mostrarOpciones();
      console.log("Usuario storage inicio: ", this.userStorage)
    } else {
      console.error("No hay usuario storage inicio")
    }
  }

  ngOnInit() {
    this.mostrarOpciones();
    console.log("Usuario recibido desde home", this.user)
  };
  
}
