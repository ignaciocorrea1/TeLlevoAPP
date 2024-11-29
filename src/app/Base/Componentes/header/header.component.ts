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
  mostrarHeader = true;
  headerWidth: string = '100%';
  marginLeft: string = '0';

  // Para verificar el permiso de ubicacion del usuario
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

  // Dependiendo de la ruta se oculta el boton volver atras en el header
  visibilidadBackButton() {
    if (this.router.url == "/inicio") {
      this.mostrarBoton = false;
    } else if (this.router.url == "/mapa") {
      this.mostrarBoton = false;
    }
  };

  // Navegar a cierta ruta
  navegarA(ruta:string) {
    this.router.navigate([ruta]);
  };

  // Si la ubicacion esta desactivada aparece una alerta, va de la mano con la funcion de checkPermissions de momento
  settings() {
    this.geo.openSettings();
  }

  // Se verifica el permiso de usuario cada cierto tiempo
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

  // Dependiendo la ruta el tamaño del header debe cambiar para no tener problemas con el mapa
  actualizarStyle() {
    if (this.router.url === "/mapa") {
      this.headerWidth = '80%';
      this.marginLeft = '0';
    } else {
      this.headerWidth = '100%';
      this.marginLeft = '0';
    }
  }

  ngOnInit() {
    this.visibilidadBackButton();
    this.checkPermissions();
    this.actualizarStyle();
  }

  // La suscripcion se "destruye" 
  ngOnDestroy(): void {
    if (this.locationCheck) {
      this.locationCheck.unsubscribe();
    }
  }
};