import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticatorService } from 'src/app/Servicios/authenticator.service';
import { GeolocationService } from 'src/app/Servicios/geolocation.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() contentId!: string;
  @Input() menuId!: string;

  mostrarBoton = true;
  mostrarAlerta = false;
  private locationCheck!: Subscription;

  constructor(
    private router:Router, 
    private menuCtrl:MenuController, 
    private auth:AuthenticatorService,
    private geo:GeolocationService) {}

  cerrarSesion() {
    // El menú se quedaba abierto al cerrar sesión
    this.router.navigate(["/home"]).then(() => {
      this.menuCtrl.close();
    });
    // El estado de conexion del usuario pasa a false
    this.auth.logout();
  };

  visibilidadBackButton() {
    if (this.router.url == "/inicio") {
      this.mostrarBoton = false;
    } else if (this.router.url == "/mapa") {
      this.mostrarBoton = false;
    }
  };

  navegarA(ruta:string) {
    this.router.navigate([ruta]);
  };

  settings() {
    this.geo.openSettings();
  }

  checkPermissions() {
    this.locationCheck = interval(500000).subscribe(() => {
      this.geo.checkPermissions().then((permissions) => {
        if (permissions) {
          this.mostrarAlerta = false;
          console.log("Permisos: ", permissions)
        }
      }).catch((e) => {
        console.log("Error bottom: ", e);
        this.mostrarAlerta = true;
      });
    })
  }

  ngOnInit() {
    this.visibilidadBackButton();
    this.checkPermissions();
  }

  ngOnDestroy(): void {
    if (this.locationCheck) {
      this.locationCheck.unsubscribe();
    }
  }
};