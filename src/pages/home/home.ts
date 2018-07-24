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
  goToCriteriosBusqueda(){
    this.navCtrl.push(CriteriosBusquedaPage);
  }
}
