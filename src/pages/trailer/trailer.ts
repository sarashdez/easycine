import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DetallePage} from "../detalle/detalle";
import {ScreenOrientation} from "@ionic-native/screen-orientation";

@Component({
  selector: 'page-trailer',
  templateUrl: 'trailer.html'
})
export class TrailerPage {

  constructor(public navCtrl: NavController,
              private screenOrientation: ScreenOrientation) {
    this.screenOrientation = screenOrientation;
  }


//Bloquear la orientación de la pantalla (horizontal).
  lockLandscape() {
    alert('Orientation locked landscape.');
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  /**
   * goBack().
   * Método que permite regresar a la pantalla anterior.
   */
  goBack() {
    console.log("Metodo goBack");
    this.navCtrl.push(DetallePage);
  }

}
