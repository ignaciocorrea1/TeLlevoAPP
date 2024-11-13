import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticatorService } from 'src/app/Servicios/authenticator.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  contentId:string;
  id:string;

  constructor(
    private router:Router, 
    private menuCtrl:MenuController, 
    private auth:AuthenticatorService) {

      this.contentId = 'main-content-'+this.router.url;
      this.id = 'main-content-'+this.router.url;
  }


  cerrarSesion() {
    // El menú se quedaba abierto al cerrar sesión
    this.router.navigate(["/home"]).then(() => {
      this.menuCtrl.close();
    });

    // El estado del usuario pasa a false
    this.auth.logout();
  };

  ionViewWillLeave(){
    this.menuCtrl.close()
  }

  ngOnInit() {
    console.log("Ruta header: ", this.id)
    console.log("Ruta menu: ", this.contentId)
  }
};
