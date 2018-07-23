import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CarteleraPage } from '../cartelera/cartelera';


import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, MarkerOptions, Marker } from '@ionic-native/google-maps'
import { Geolocation, Geoposition } from '@ionic-native/geolocation';


@Component({
  selector: 'page-elige-tu-cine',
  templateUrl: 'elige-tu-cine.html'
})
export class EligeTuCinePage {

  map : GoogleMap;

  constructor(public navCtrl: NavController,
              public googleMaps : GoogleMaps) {  }


  ionViewDidLoad() {

  }




  //Criterios = null
/*
  goToCartelera(params){
    if (!params) params = {};
    this.navCtrl.push(CarteleraPage);
  }*/

}
