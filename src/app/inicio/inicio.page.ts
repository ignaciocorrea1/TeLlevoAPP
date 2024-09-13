import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  // Usuario
  user = {
    username : "",
    password : ""
  };

  constructor(private router:Router) { 
    // Se reciben los datos enviados desde el login
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: '';
      password: '';
    };
    this.user.username = state.username;
    this.user.password = state.password;
  };

  ngOnInit() {
  }

}
