import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CarteleraPage } from '../cartelera/cartelera';
import { DetallePage } from '../detalle/detalle';
import { TrailerPage } from '../trailer/trailer';
import { ComprarEntradasPage } from '../comprar-entradas/comprar-entradas';
import { PaypalPage } from '../paypal/paypal';
import { EligeTuCinePage } from '../elige-tu-cine/elige-tu-cine';

@Component({
  selector: 'page-criterios-busqueda',
  templateUrl: 'criterios-busqueda.html'
})
export class CriteriosBusquedaPage {

  constructor(public navCtrl: NavController) {
  }
  goToCartelera(params){
    if (!params) params = {};
    this.navCtrl.push(CarteleraPage);
  }goToDetalle(params){
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
  }goToEligeTuCine(params){
    if (!params) params = {};
    this.navCtrl.push(EligeTuCinePage);
  }
}
