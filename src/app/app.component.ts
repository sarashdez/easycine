import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CarteleraPage } from '../pages/cartelera/cartelera';
import { DetallePage } from '../pages/detalle/detalle';

import { ComprarEntradasPage } from '../pages/comprar-entradas/comprar-entradas';

import { ProximosEstrenosPage } from '../pages/proximos-estrenos/proximos-estrenos';
import { MisEntradasPage } from '../pages/mis-entradas/mis-entradas';
import { CriteriosBusquedaPage } from '../pages/criterios-busqueda/criterios-busqueda';
import { EligeTuCinePage } from '../pages/elige-tu-cine/elige-tu-cine';
import { LoginPage } from '../pages/login/login';
import { CrearCuentaPage } from '../pages/crear-cuenta/crear-cuenta';
import { HomePage } from '../pages/home/home';
import {AutenticacionProvider} from "../providers/autenticacion/autenticacion";
import {MiPerfilPage} from "../pages/mi-perfil/mi-perfil";
import {AngularFireAuth} from "angularfire2/auth";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = HomePage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
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

  goToMiPerfil(){
    this.navCtrl.push(MiPerfilPage);
  }




}
