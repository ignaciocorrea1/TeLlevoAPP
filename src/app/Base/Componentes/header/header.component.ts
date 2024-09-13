import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  constructor(private router:Router, private menuCtrl:MenuController) { }

  cerrarSesion() {
    // El menú se quedaba abierto
    this.router.navigate(["/home"]).then(() => {
      this.menuCtrl.close();
    });

  };

  ngOnInit() {}

};
