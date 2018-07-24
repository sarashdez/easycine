import { Component } from '@angular/core';
import {AlertController, NavController, ViewController} from 'ionic-angular';
import { CarteleraPage } from '../cartelera/cartelera';
import { CrearCuentaPage } from '../crear-cuenta/crear-cuenta';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AutenticacionProvider} from "../../providers/autenticacion/autenticacion";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public form : FormGroup;
  public displayError : string;


  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              private _FB: FormBuilder,
              public _AUTH: AutenticacionProvider,
              private alertCtrl: AlertController) {
    this.form = this._FB.group({
      'email':[''],
      'password':['']
    })
  }

  /**
   * Inicia la sesion del usuario en la app.
   */
  login() {
    let email : string = this.form.controls['email'].value;
    let password : string = this.form.controls['password'].value;

    this._AUTH.loginAuth(email, password)
      .then((auth: string) => {
        this.form.reset();
        console.log("Login Correcto");
        this.alertaLoginCorrecto();
      })
      .catch((error) => {
        this.displayError = error.message;
        alert("Tienes que introducir un usuario y contraseña válidos.");
        console.log("Error Login");
        console.log(error.message);
      });
  }

  /**
   * Navegacion a la pantalla Cartelera.
   */
  goToCartelera(){
    this.navCtrl.push(CarteleraPage);
  }

  /**
   * Navegacion a la pantalla CrearCuenta.
   */
  goToCrearCuenta(){
    this.navCtrl.push(CrearCuentaPage);
  }

  /**
   * Alerta que aparece cuando el usuario inicia la sesion correctamente. Redirige al usuario a
   * la pagina Cartelera.
   */
  alertaLoginCorrecto() {
    console.log("Metodo alertaLoginCorrecto()");
    let confirm = this.alertCtrl.create({
      message: '¡Has iniciado sesión correctamente',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('"Ok" pulsado');
            this.goToCartelera();
          }
        }
      ]
    });
    confirm.present();
  }

}
