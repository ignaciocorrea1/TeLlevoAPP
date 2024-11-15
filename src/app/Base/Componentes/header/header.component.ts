import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticatorService } from 'src/app/Servicios/authenticator.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() contentId!: string;
  @Input() menuId!: string;

  constructor(
    private router:Router, 
    private menuCtrl:MenuController, 
    private auth:AuthenticatorService) {}

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
      const backButton = document.getElementById("back-button") as HTMLIonBackButtonElement;

      backButton.style.display = "none";
    } else if (this.router.url == "/mapa") {
      const backButton = document.getElementById("back-button") as HTMLIonBackButtonElement;

      backButton.style.display = "none";
    }
  };

  navegarA(ruta:string) {
    this.router.navigate([ruta]);
  };

  ngOnInit() {
    this.visibilidadBackButton();
    console.log("Router ruta:", this.router.url)
  };
};