import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import { TrailerPage } from '../trailer/trailer';
import { ComprarEntradasPage } from '../comprar-entradas/comprar-entradas';
//import { PaypalPage } from '../paypal/paypal';
import {CarteleraPage} from "../cartelera/cartelera";
//import {NativePageTransitions} from "@ionic-native/native-page-transitions";

@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html'
})
export class DetallePage {

  private item : any;

  constructor(public navCtrl: NavController,
              public param: NavParams,
              private viewCtrl: ViewController) {
    this.item = param.get("peliculaSeleccionada");
    console.log("constructorDetalle item recuperado: "+this.item.peliculaID);
  }










  goToTrailer(){
    this.navCtrl.push(TrailerPage);
  }

  goToComprarEntradas(params){
    if (!params) params = {};
    this.navCtrl.push(ComprarEntradasPage);
  }

}
