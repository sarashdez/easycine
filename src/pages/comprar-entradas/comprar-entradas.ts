import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PaypalPage } from '../paypal/paypal';

@Component({
  selector: 'page-comprar-entradas',
  templateUrl: 'comprar-entradas.html'
})
export class ComprarEntradasPage {

  constructor(public navCtrl: NavController) {
  }
  goToPaypal(params){
    if (!params) params = {};
    this.navCtrl.push(PaypalPage);
  }
}
