import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CarteleraPage } from '../cartelera/cartelera';


import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, MarkerOptions, Marker } from '@ionic-native/google-maps'
import { Geolocation, Geoposition } from '@ionic-native/geolocation';


@Component({
  selector: 'page-elige-tu-cine',
  templateUrl: 'elige-tu-cine.html'
})
export class EligeTuCinePage {

  @ViewChild('map') mapElement: ElementRef;

  map : GoogleMap;

  constructor(public navCtrl: NavController,
              public googleMaps : GoogleMaps) {  }


  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.iniciarMapa();
  }

  iniciarMapa() {
    let element = this.mapElement.nativeElement;
    this.map = this.googleMaps.create(element);
  }

  //Criterios = null
/*
  goToCartelera(params){
    if (!params) params = {};
    this.navCtrl.push(CarteleraPage);
  }*/

}
