import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CriteriosBusquedaPage } from '../criterios-busqueda/criterios-busqueda';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  /**
   * Navegacion a la pantalla CriteriosBusqueda.
   */
  goToCriteriosBusqueda(){
    this.navCtrl.push(CriteriosBusquedaPage);
  }
}
