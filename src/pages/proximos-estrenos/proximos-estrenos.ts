import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Pelicula } from "../../models/pelicula";
import { Observable } from "rxjs";

@Component({
  selector: 'page-proximos-estrenos',
  templateUrl: 'proximos-estrenos.html'
})
export class ProximosEstrenosPage {

  peliculasCollection: AngularFirestoreCollection<Pelicula>;
  peliculas : Observable<Pelicula[]>;

  constructor(public navCtrl: NavController,
              private dbStorage : AngularFirestore) {
    this.recuperarPeliculas(this.getFechaActual());
  }


  /**
   * Se recuperan de Firebase las peliculas que no se hayan estrenado todavia, teniendo como referencia
   * la fecha de hoy.
   * @param fechaHoy
   */
  recuperarPeliculas(fechaHoy : string) {
    console.log('Recuperar peliculas: '+fechaHoy);

    this.peliculasCollection = this.dbStorage.collection('infoPeliculas', ref => {
      return ref
        .where('estreno', '>', fechaHoy)
    });

    this.peliculas = this.peliculasCollection.valueChanges();
  }

  /**
   * Recupera la fecha de hoy y la devuelve en formato yyyy/mm/dd (string).
   */
  getFechaActual() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    var dia : string;
    var mes : string;

    if(dd<10) {
      dia = '0'+dd
    } else {
      dia = dd.toString();
    }

    if(mm<10) {
      mes = '0'+mm
    } else {
      mes = mm.toString();
    }

    return yyyy + '/' + mes + '/' + dia;
  }


}
