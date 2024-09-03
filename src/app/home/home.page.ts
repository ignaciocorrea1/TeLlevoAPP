import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router) {}

  // Se crea un objeto del tipo usuario
  user = {
    "username": "",
    "password": ""
  };

  // Funcion para validar el login
  

};
