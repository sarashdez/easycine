import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

import { ComprarEntradasPage } from '../comprar-entradas/comprar-entradas';
import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";
import {CarteleraPage} from "../cartelera/cartelera";

@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html'
})
export class DetallePage {

  item : any;
  videoID : string;

  constructor(public navCtrl: NavController,
              public param: NavParams,
              private viewCtrl: ViewController,
              private youtube: YoutubeVideoPlayer) {
    this.item = param.get("peliculaSeleccionada");
    console.log("constructorDetalle item recuperado: "+this.item.peliculaID);
  }

  reproducirVideo() {
    this.youtube.openVideo(this.item.trailer)
  }


  goToComprarEntradas(){
    this.navCtrl.push(ComprarEntradasPage, {
      pelicula : this.item
    });
  }

}
