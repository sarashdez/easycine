import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { DetallePage } from '../detalle/detalle';
import { TrailerPage } from '../trailer/trailer';
import { ComprarEntradasPage } from '../comprar-entradas/comprar-entradas';
import { PaypalPage } from '../paypal/paypal';
import { ViewController } from "ionic-angular";

@Component({
  selector: 'page-cartelera',
  templateUrl: 'cartelera.html'
})
export class CarteleraPage {

  empresa : string;
  dia : string;
  hora : string;
  cercania : string;

  constructor(public navCtrl: NavController,
              public param: NavParams,
              private viewCtrl: ViewController) {
    this.empresa = param.get("empresa");
    this.dia = param.get("dia");
    this.hora = param.get("hora");
    this.cercania = param.get("cercania");

    console.log("Parametros recuperados");
    console.log("Empresa: " + this.empresa);
    console.log("Dia: " + this.dia);
    console.log("Hora: " + this.hora);
    console.log("Cercania: " + this.cercania);
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }




  goToDetalle(params){
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
  }
}
