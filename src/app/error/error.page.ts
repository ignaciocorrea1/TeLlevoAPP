import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '../Servicios/authenticator.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {

  constructor(private router:Router, private auth:AuthenticatorService) { }

  // Funcion para redireccionar al usuario
  errorRed() {
    if (this.auth.isConected()) {
      this.router.navigate(["/inicio"])
    } else {
      this.router.navigate(["/home"])
    };
  };

  ngOnInit() {
  }

}
