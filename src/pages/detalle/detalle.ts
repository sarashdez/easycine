import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import { ComprarEntradasPage } from '../comprar-entradas/comprar-entradas';
import {YoutubeVideoPlayer} from "@ionic-native/youtube-video-player";

@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html'
})
export class DetallePage {

  item : any;

  constructor(public navCtrl: NavController,
              public param: NavParams,
              private viewCtrl: ViewController,
              private youtube: YoutubeVideoPlayer) {
    this.item = param.get("peliculaSeleccionada");
  }

  /**
   * Se reproduce en Youtube el trailer de la pelicula seleccionada.
   */
  reproducirVideo() {
    this.youtube.openVideo(this.item.trailer)
  }

  /**
   * Navegacion a la pantalla ComprarEntradas.
   */
  goToComprarEntradas(){
    this.navCtrl.push(ComprarEntradasPage, {
      pelicula : this.item
    });
  }

}
