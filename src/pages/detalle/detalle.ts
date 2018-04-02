import { Component } from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import { TrailerPage } from '../trailer/trailer';
import { ComprarEntradasPage } from '../comprar-entradas/comprar-entradas';
//import { PaypalPage } from '../paypal/paypal';
import {CarteleraPage} from "../cartelera/cartelera";
import {NativePageTransitions} from "@ionic-native/native-page-transitions";

@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html'
})
export class DetallePage {

  constructor(public navCtrl: NavController, private viewCtrl: ViewController,
              private nativePageTransitions: NativePageTransitions) {
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  goBack() {
    console.log("Metodo goBack");
    ///////////
    let options: NativePageTransitions = {
      direction: 'up',
      duration: 900
    //  slowdownfactor: -1,
    //  iosdelay: 50
    }
    ///////////
  //  this.nativePageTransitions.slide(options);
    this.nativePageTransitions.flip(options);
    this.navCtrl.setRoot(CarteleraPage);
    //this.navCtrl.push(CarteleraPage);
  }



  goToTrailer(params){
    if (!params) params = {};
    this.navCtrl.push(TrailerPage);
  }goToComprarEntradas(params){
    if (!params) params = {};
    this.navCtrl.push(ComprarEntradasPage);
  }
  /*goToPaypal(params){
    if (!params) params = {};
    this.navCtrl.push(PaypalPage);
  }*/
}
