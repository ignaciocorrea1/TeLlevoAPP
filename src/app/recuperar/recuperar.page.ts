import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  constructor(private router: Router) {}

  user = {
    username: "",
  };

  mensaje = "";

  validar() {
    if (this.user.username.length > 2 && this.user.username.length < 9) {
      //if (this.user.password.length == 4) {
        //Funciona
      this.mensaje = '';
      this.router.navigate(["/home"]);
        /* console.log(this.user.username);
        let navigationExtras: NavigationExtras = {
          state: {
            username: this.user.username,
            password: this.user.password,
          },
        };
        this.router.navigate(['/inicio'], navigationExtras); */
      /* } else {
        console.log('Contraseña incorrecta');
        this.mensaje = 'Contraseña incorrecta';
        //No funciona
      } */
    } else {
      console.log('Usuario no cumple (min: 3, max: 8)');
      this.mensaje = 'Usuario no cumple (min: 3, max: 8)';
      //Tampoco funciona
    }
  }
  ngOnInit() {
  }

}
