import { Component } from '@angular/core';
import { NavController,  NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from 'rxjs';
import { Entrada } from '../../models/entrada';


@Component({
  selector: 'page-mis-entradas',
  templateUrl: 'mis-entradas.html'
})
export class MisEntradasPage {

  private entradasCollection: AngularFirestoreCollection<Entrada>;
  private entradas : Observable<Entrada[]>;
  private sesion : string;

  constructor(public navCtrl: NavController,
              public param: NavParams,
              private dbStorage : AngularFirestore) {
    this.sesion = param.get("sesion");
    console.log('sesionRecuperada: '+this.sesion);
    this.recuperarEntradas();
  }


  /**
   * Carga los componentes necesarios para la vista.
   */
  recuperarEntradas() {
    this.entradasCollection = this.dbStorage.collection('entradas', ref => {
      return ref.where('user', '==', this.sesion)
    });
    this.entradas = this.entradasCollection.valueChanges();
  }
  
}
