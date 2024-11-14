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

  navegarA(ruta:string) {
    this.router.navigate([ruta]);
  }

  ngOnInit() {
    
  }
};
