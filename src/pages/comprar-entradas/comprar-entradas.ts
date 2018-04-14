import { Component } from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import { PaypalPage } from '../paypal/paypal';
import {DetallePage} from "../detalle/detalle";

@Component({
  selector: 'page-comprar-entradas',
  templateUrl: 'comprar-entradas.html'
})
export class ComprarEntradasPage {

  constructor(public navCtrl: NavController, private viewCtrl: ViewController) {
  }
/*
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  goBack() {
    console.log("Metodo goBack");
    this.navCtrl.push(DetallePage);
  }*/


  goToPaypal(params){
    if (!params) params = {};
    this.navCtrl.push(PaypalPage);
  }
}
