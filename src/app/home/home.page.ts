import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Se crea un objeto del tipo usuario
  user = {
    "username": "",
    "password": ""
  };

  constructor(private router:Router, private animationController:AnimationController) {}

  limpiarInputs() {
    // Se obtienen los inputs
    const inputU = document.getElementById("username") as HTMLIonInputElement;
    const inputP = document.getElementById("password") as HTMLIonInputElement;

    if (inputU && inputP) {
        // Se vacian los campos
        inputU.value = "";
        inputP.value = "";
    };
  };

  msgError(input:string) {
    // Se obtiene el mensaje de error
    const msgError = document.getElementById("error-msg") as HTMLIonTextElement;

    // Se resetea el display
    if (msgError) {
      msgError.style.display = "none";
    };
    
    if (input === "password") {
      // Si la contraseña esta incorrecta
      msgError.style.display = "block";
      msgError.textContent = "Contraseña incorrecta.";
    } else if (input === "user"){
      // Si el usuario esta incorrecto
      msgError.style.display = "block";
      msgError.textContent = "Usuario incorrecto.";
    } else {
      msgError.style.display = "none";
    };
  };

  // Funcion para validar los campos
  validarLogin(){
    // Si el usuario está correcto
    if (this.user.username != "") {
      // Si la contraseña está correcta
      if (this.user.password != "") {

        this.limpiarInputs();

        // Se envian los datos del usuario y se redirecciona al inicio
        let navigationExtras : NavigationExtras = {
          state: {
            username: this.user.username,
            password: this.user.password,
          },
        };

        this.router.navigate(["/inicio"], navigationExtras);

        console.log("Username: "+this.user.username);
        console.log("Password: "+this.user.password);
      } else {
        this.msgError("password")
      }
    } else {
      this.msgError("user")
    };
  };

  // Funcion para la animacion
  animacionAuto(){
    const auto = document.querySelector(".auto-img") as HTMLElement;
    const sombra = document.querySelector(".sombra-img") as HTMLElement;
    const humo = document.querySelector(".humo-img") as HTMLElement;

    // Animacion del auto
    const animacionA = this.animationController.create()
    .addElement(auto)
    .duration(10000)
    .delay(500)
    .iterations(Infinity)
    .keyframes([
      {offset: 0.1, transform: "translateX(-50%)", easing: "ease-out"},
      {offset: 0.3, transform: "translateX(-10%) translateY(8%) skewY(2deg)", easing: "ease-out"},
      {offset: 0.345, transform: "translateX(-10%) translateY(8%) skewY(2deg)", easing: "ease-out"},
      {offset: 0.6, transform: "translateX(-75%) translateY(35%) skewY(-2.5deg) scale(1.2)", easing: "ease-out"},
      {offset: 0.63, transform: "translateX(-75%) translateY(35%) skewY(-2.5deg) scale(1.2)", easing: "ease-out"},
      {offset: 1, transform: "translateX(-50%)", easing: "ease-out"},
    ]);

    // Animacion de la sombra
    const animacionS = this.animationController.create()
    .addElement(sombra)
    .duration(10000)
    .delay(500)
    .iterations(Infinity)
    .keyframes([
      {offset: 0.1, transform: "translateX(-50%)", easing: "ease-out"},
      {offset: 0.3, transform: "translateX(-16%) translateY(8%)", easing: "ease-out"},
      {offset: 0.345, transform: "translateX(-16%) translateY(8%)", easing: "ease-out"},
      {offset: 0.6, transform: "translateX(-71%) translateY(31%) scale(1.2)", easing: "ease-out"},
      {offset: 0.63, transform: "translateX(-71%) translateY(31%) scale(1.2)", easing: "ease-out"},
      {offset: 1, transform: "translateX(-50%)", easing: "ease-out"},
    ]);

    // Animacion del humo
    const animacionH = this.animationController.create()
    .addElement(humo)
    .duration(10000)
    .delay(500)
    .iterations(Infinity)
    .keyframes([
      {offset: 0.1, transform: "translateX(-50%)", easing: "ease-out"},
      {offset: 0.3, transform: "translateX(-20%) translateY(6%) skewY(2deg)", easing: "ease-out"},
      {offset: 0.345, transform: "translateX(-20%) translateY(6%) skewY(2deg)", easing: "ease-out"},
      {offset: 0.6, transform: "translateX(-70%) translateY(29%) skewY(-1.1deg) scale(1.2)", easing: "ease-out"},
      {offset: 0.63, transform: "translateX(-70%) translateY(29%) skewY(-1.1deg) scale(1.2)", easing: "ease-out"},
      {offset: 1, transform: "translateX(-50%)", easing: "ease-out"},
    ]);

    animacionA.play();
    animacionS.play();
    animacionH.play();
  };

  ngAfterContentInit() {
    this.animacionAuto();
  };

  // Se vacian los campos al volver a la vista
  ionViewWillEnter() {
    this.user.username = "";
    this.user.password = "";
    this.limpiarInputs();
    this.msgError("ninguno");
  }
};
