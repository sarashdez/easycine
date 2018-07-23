import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CriteriosBusquedaPage } from '../criterios-busqueda/criterios-busqueda';
import { CarteleraPage } from '../cartelera/cartelera';
import { DetallePage } from '../detalle/detalle';

import { ComprarEntradasPage } from '../comprar-entradas/comprar-entradas';

import { EligeTuCinePage } from '../elige-tu-cine/elige-tu-cine';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }
  goToCriteriosBusqueda(params){
    if (!params) params = {};
    this.navCtrl.push(CriteriosBusquedaPage);
  }goToCartelera(params){
    if (!params) params = {};
    this.navCtrl.push(CarteleraPage);
  }goToDetalle(params){
    if (!params) params = {};
    this.navCtrl.push(DetallePage);
  }goToComprarEntradas(params){
    if (!params) params = {};
    this.navCtrl.push(ComprarEntradasPage);
  }goToEligeTuCine(params){
    if (!params) params = {};
    this.navCtrl.push(EligeTuCinePage);
  }
}
