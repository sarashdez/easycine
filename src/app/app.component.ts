import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CarteleraPage } from '../pages/cartelera/cartelera';
import { ProximosEstrenosPage } from '../pages/proximos-estrenos/proximos-estrenos';
import { MisEntradasPage } from '../pages/mis-entradas/mis-entradas';
import { CriteriosBusquedaPage } from '../pages/criterios-busqueda/criterios-busqueda';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { MiPerfilPage } from "../pages/mi-perfil/mi-perfil";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = HomePage;
  private fotoURL : string;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private _ANGFIRE: AngularFireAuth,
              private alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this._ANGFIRE.authState.subscribe(session => {
      if(session) {
        //Usuario logueado
        firebase.storage().ref().child(`profilePhotos/${session.uid}`).getDownloadURL().then(url => {
          this.fotoURL = url;
        });
      } else {
        this.fotoURL = "https://firebasestorage.googleapis.com/v0/b/easy-cine.appspot.com/o/profilePhotos%2FprofileIcon.png?alt=media&token=f8505d1d-ebc1-406f-abc5-c83dfaf387bb";
      }
    });
  }

  /**
   * Navegacion a la pantalla Cartelera.
   * @param params
   */
  goToCartelera(params){
    if (!params) params = {};
    this.navCtrl.setRoot(CarteleraPage);
  }

  /**
   * Navegacion a la pantalla ProximosEstrenos.
   * @param params
   */
  goToProximosEstrenos(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ProximosEstrenosPage);
  }

  /**
   * Navegacion a la pantalla MisEntradas.
   * @param sesion
   */
  goToMisEntradas(sesion : string){
    this.navCtrl.push(MisEntradasPage, {
      sesion: sesion});
  }

  /**
   * Navegacion a la pantalla CriteriosBusqueda.
   * @param params
   */
  goToCriteriosBusqueda(params){
    if (!params) params = {};
    this.navCtrl.setRoot(CriteriosBusquedaPage);
  }

  /**
   * Navegacion a la pantalla MiPerfil.
   */
  goToMiPerfil(){
    this.navCtrl.push(MiPerfilPage);
  }

  /**
   * Navegacion a la pantalla Login.
   */
  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  /**
   * Se comprueba si el usuario ha iniciado sesion. Si es asi, se muestra su info. Si no se redirige a Login.
   */
  comprobarUsuarioLoggedPerfil() {
    let uid : string;
    this._ANGFIRE.authState.subscribe(session => {
      if(session) {
        //Usuario logueado
        uid = session.uid;
        this.goToMiPerfil();
      } else {
        this.goToLogin();
      }
    });
  }

  /**
   * Se comprueba si el usuario ha iniciado sesion. Si es asi, se muestran sus entradas. Si no se muestra un mensaje.
   */
  comprobarUsuarioLoggedMisEntradas() {
    let uid : string;
    this._ANGFIRE.authState.subscribe(session => {
      if(session) {
        //Usuario logueado
        uid = session.uid;
        this.goToMisEntradas(uid);
      } else {
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

}
