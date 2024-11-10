import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from './Servicios/authenticator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthenticatorService, private router: Router) {}

  // Funcion para verificar el estadod el usuario cuando abre la app, async porque se tiene que esperar
  // la repuesta
  async ngOnInit() {
    const estado = await this.auth.isConected();

    // Si el estado es true = usuario logeado, se redirige al inicio, y al contrario al login(home)
    if (estado) {
      this.router.navigate(["/inicio"]);
    } else {
      this.router.navigate(["/home"]);
    }
  }
}
