import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CarteleraPage } from '../pages/cartelera/cartelera';
import { ProximosEstrenosPage } from '../pages/proximos-estrenos/proximos-estrenos';
import { MisEntradasPage } from '../pages/mis-entradas/mis-entradas';
import { CriteriosBusquedaPage } from '../pages/criterios-busqueda/criterios-busqueda';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import {MiPerfilPage} from "../pages/mi-perfil/mi-perfil";
import {AngularFireAuth} from "angularfire2/auth";
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
              private _ANGFIRE: AngularFireAuth) {
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
          console.log("URL recuperada de Firebase: " + url);
          this.fotoURL = url;
        });
      } else {
        this.fotoURL = "https://firebasestorage.googleapis.com/v0/b/easy-cine.appspot.com/o/profilePhotos%2FprofileIcon.png?alt=media&token=f8505d1d-ebc1-406f-abc5-c83dfaf387bb";
      }
    });
  }

  goToCartelera(params){
    if (!params) params = {};
    this.navCtrl.setRoot(CarteleraPage);
  }

  goToProximosEstrenos(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ProximosEstrenosPage);
  }

  goToMisEntradas(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MisEntradasPage);
  }

  goToCriteriosBusqueda(params){
    if (!params) params = {};
    this.navCtrl.setRoot(CriteriosBusquedaPage);
  }

  comprobarUsuarioLoggedPerfil() {
    //Primero se comprueba si el usuario ha iniciado sesion. Si es asi, se muestra su info. Si no se redirige a Login.
    let uid : string;
    console.log("Comprobar usuario logued");
    this._ANGFIRE.authState.subscribe(session => {
      if(session) {
        //Usuario logueado
        uid = session.uid;
        console.log("Usuario logueado: "+uid);
        this.goToMiPerfil();
      } else {
        console.log("Ningun usuario logueado");
        this.goToLogin();
      }
    });
  }

  goToMiPerfil(){
    this.navCtrl.push(MiPerfilPage);
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }



}
