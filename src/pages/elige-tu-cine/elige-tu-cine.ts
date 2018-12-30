import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CarteleraPage } from '../cartelera/cartelera';


@Component({
  selector: 'page-elige-tu-cine',
  templateUrl: 'elige-tu-cine.html'
})
export class EligeTuCinePage {

  constructor(public navCtrl: NavController) {  }



  //Criterios = null
/*
  goToCartelera(params){
    if (!params) params = {};
    this.navCtrl.push(CarteleraPage);
  }*/

}
