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

  constructor(private router:Router, private menuCtrl:MenuController, private auth:AuthenticatorService) { }

  cerrarSesion() {
    // El menú se quedaba abierto
    this.router.navigate(["/home"]).then(() => {
      this.menuCtrl.close();
    });

    // El estado del usuario pasa a false
    this.auth.logout();
  };

  ngOnInit() {}

};
