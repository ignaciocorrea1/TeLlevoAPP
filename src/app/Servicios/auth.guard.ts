import { CanActivateFn, Router } from '@angular/router';
import { AuthenticatorService } from './authenticator.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  //la defincion inject nos permite generar el objeto sin necesidad de aplicar un constructor completo
  //Esto nos permite definir el objeto mas su clase con todas sus funcionalidades de forma mas breve y simplificada
  //inject nos permite reducir el tamaño de codigo con el constructor y otras utilidades 
  //instanciamos el servicio de login y el enrutador para redireccionar en caso erroneo
  const authService = inject(AuthenticatorService);
  const router = inject(Router);

  //Validamos si esta conectado consultando el estado de la key conectado en el localStorage
  //Si lo esta, tendra acceso a ciertas paginas
  //Si no , sera redireccionado a la pagina correspondiente
  return authService.isConected().then((estado:boolean) => {
    if (estado) {
      return true;
    } else {
      router.navigate(["/home"]);
      return false;
    }
  })
};
