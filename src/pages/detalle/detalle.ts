import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ViewController} from 'ionic-angular';
import { ComprarEntradasPage } from '../comprar-entradas/comprar-entradas';
import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";
import {AngularFireAuth} from "angularfire2/auth";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html'
})
export class DetallePage {

  item : any;

  constructor(public navCtrl: NavController,
              public param: NavParams,
              private viewCtrl: ViewController,
              private youtube: YoutubeVideoPlayer,
              private _ANGFIRE: AngularFireAuth,
              private alertCtrl: AlertController) {
    this.item = param.get("peliculaSeleccionada");
  }

  /**
   * Se reproduce en Youtube el trailer de la pelicula seleccionada.
   */
  reproducirVideo() {
    this.youtube.openVideo(this.item.trailer)
  }

  /**
   * Comprueba si hay alguna sesion iniciada.
   * Si la hay, se redirige al usuario a ComprarEntradas.
   * Si no, se le muestra un mensaje.
   */
  comprobarUsuarioLoggedPerfil() {
    let uid : string;
    this._ANGFIRE.authState.subscribe(session => {
      if(session) {
        //Usuario logueado
        uid = session.uid;
        this.goToComprarEntradas(uid);
      } else {
        //alert('Esta opción solo está disponible para usuarios registrados.');
        this.alertaSesionNoIniciada();
      }
    });
  }

  /**
   * Alerta que informa al usuario de que no ha iniciado sesion. Puede elegir que se le
   * rediriga a Login o continuar usando la aplicacion.
   */
  alertaSesionNoIniciada() {
    let confirm = this.alertCtrl.create({
      title: 'Sesión no iniciada',
      message: 'Esta opción solo está disponible para usuarios registrados. ¿Te gustaría iniciar sesión?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('"No" pulsado');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            console.log('"Sí" pulsado');
            this.goToLogin();
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   * Navegacion a la pantalla Login.
   */
  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  /**
   * Navegacion a la pantalla ComprarEntradas.
   */
  goToComprarEntradas(sesion : string){
    this.navCtrl.push(ComprarEntradasPage, {
      pelicula : this.item, sesion : sesion
    });
  }

}
