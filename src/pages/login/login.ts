import { Component } from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import { CarteleraPage } from '../cartelera/cartelera';
import { DetallePage } from '../detalle/detalle';
import { TrailerPage } from '../trailer/trailer';
import { ComprarEntradasPage } from '../comprar-entradas/comprar-entradas';
import { PaypalPage } from '../paypal/paypal';
import { CrearCuentaPage } from '../crear-cuenta/crear-cuenta';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, private viewCtrl: ViewController) {
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(true);
  }


  goToCartelera(params){
    if (!params) params = {};
    this.navCtrl.push(CarteleraPage);
  }/**goToDetalle(params){
    if (!params) params = {};
    this.navCtrl.push(DetallePage);
  }goToTrailer(params){
    if (!params) params = {};
    this.navCtrl.push(TrailerPage);
  }goToComprarEntradas(params){
    if (!params) params = {};
    this.navCtrl.push(ComprarEntradasPage);
  }goToPaypal(params){
    if (!params) params = {};
    this.navCtrl.push(PaypalPage);
  }*/goToCrearCuenta(params){
    if (!params) params = {};
    this.navCtrl.push(CrearCuentaPage);
  }

  goBack() {
    console.log("Metodo goBack");
    this.navCtrl.push(CarteleraPage);
  }
/*
  showBackButton() {

  }*/
}
