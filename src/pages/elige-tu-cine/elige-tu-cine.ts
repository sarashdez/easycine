import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CarteleraPage } from '../cartelera/cartelera';
import { DetallePage } from '../detalle/detalle';
import { TrailerPage } from '../trailer/trailer';
import { ComprarEntradasPage } from '../comprar-entradas/comprar-entradas';
import { PaypalPage } from '../paypal/paypal';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, MarkerOptions, Marker } from '@ionic-native/google-maps'



@Component({
  selector: 'page-elige-tu-cine',
  templateUrl: 'elige-tu-cine.html'
})
export class EligeTuCinePage {

  map : GoogleMap;

  constructor(public navCtrl: NavController,
              public googleMaps : GoogleMaps) {  }


  ionViewDidLoad() {
    this.cargarMapa();
  }

  cargarMapa() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });/*
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });*/

    /*
    let opcionesMapa : GoogleMapOptions = {
      camera: {
        target: {
          lat: 28.3913534, //Default location
          lng: -16.523874400000068 //Default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', opcionesMapa);

    //Esperar a que el mapa este listo.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        //Now you can use all methods safely.
        this.getPosition();
      })
      .catch(error => {
        console.log(error);
      });*/
  }
/*
  getPosition() : void {
    this.map.getMyLocation()
      .then(responde => {
        this.map.moveCamera({
          target: responde.latLng
        });
        this.map.addMarker({
          title: 'My position',
          icon: 'blue',
          animation: 'DROP',
          position: responde.latLng
        });
      })
      .catch(error => {
        console.log(error);
      });
  }*/

  goToCartelera(params){
    if (!params) params = {};
    this.navCtrl.push(CarteleraPage);
  }
  /*
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
  }*/
}
