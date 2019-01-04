import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from "ionic-angular";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from "rxjs";
import { Proyeccion } from "../../models/proyeccion";
import { ItemCartelera } from "../../models/itemCartelera";
import { DetallePage } from "../detalle/detalle";


@Component({
  selector: 'page-cartelera',
  templateUrl: 'cartelera.html'
})
export class CarteleraPage {

  //Parametros que se recuperan
  private empresa : string;
  private dia : string;
  private hora : string;

  //Firebase
  proyecciones: AngularFirestoreCollection<Proyeccion>;
  proyeccionesDiaHoraCollection: AngularFirestoreCollection<Proyeccion>;
  proyeccionesDiaHora : Observable<Proyeccion[]>;
  proyeccionesEmpresa : Observable<Proyeccion[]>;
  proyeccionesFinal : Observable<Proyeccion[]>;

  //Item Cartelera
  item : ItemCartelera;
  items : ItemCartelera[] = [];
  itemsObservable : Observable<ItemCartelera[]>;


  constructor(public navCtrl: NavController,
              public param: NavParams,
              private viewCtrl: ViewController,
              private dbStorage : AngularFirestore) {
    this.empresa = param.get("empresa");
    this.dia = param.get("dia");
    this.hora = param.get("hora");
    this.busquedaCarteleraConCriterios(this.empresa, this.dia, this.hora);
    this.getItems();
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  /**
   * Busca en Firebase todas las proyecciones que se ajustan a los parametros introducidos
   * por el usuario.
   * @param empresa
   * @param dia
   * @param hora
   */
  busquedaCarteleraConCriterios(empresa : string, dia : string, hora : string) {

    //Dia y hora seleccionados
    if(dia!=null && hora!=null) {
      this.proyeccionesDiaHoraCollection = this.dbStorage.collection('proyecciones', ref => {
        return ref
          .where('hora', '==', hora)
          .where('dia', '==', dia)
      });
      this.proyeccionesDiaHora = this.proyeccionesDiaHoraCollection.valueChanges();
    }

    //Dia seleccionado y hora no
    if(dia!=null && hora==null) {
      this.proyeccionesDiaHoraCollection = this.dbStorage.collection('proyecciones', ref => {
        return ref
          .where('dia', '==', dia)
      });
      this.proyeccionesDiaHora = this.proyeccionesDiaHoraCollection.valueChanges();
    }

    //Dia no seleccionado y hora si
    if(dia==null && hora!=null) {
      this.proyeccionesDiaHoraCollection = this.dbStorage.collection('proyecciones', ref => {
        return ref
          .where('hora', '==', hora)
      });
      this.proyeccionesDiaHora = this.proyeccionesDiaHoraCollection.valueChanges();
    }

    //Ninguno de los dos seleccionados
    if(dia==null && hora==null) {
      this.proyeccionesDiaHoraCollection = this.dbStorage.collection('proyecciones');
      this.proyeccionesDiaHora = this.proyeccionesDiaHoraCollection.valueChanges();
    }

    //Empresa
    if(empresa!=null) {
      this.proyeccionesEmpresa = this.proyeccionesDiaHora.map(proyecciones => {
        return proyecciones.filter((proyeccion : Proyeccion) => proyeccion.empresa === empresa)
      });

    } else {
      //No se hace nada con el resultado obtenido de DIA y HORA
      this.proyeccionesEmpresa = this.proyeccionesDiaHora;
    }

    this.proyeccionesFinal = this.proyeccionesEmpresa;
  }

  /**
   * Recupera de Firebase la informacion de las peliculas que se ajustan a los criterios introducidos
   * y la almacena en un array de objetos tipo ItemCartelera.
   */
  getItems() {
    this.itemsObservable = this.proyeccionesFinal.map(proyecciones => {
      proyecciones.map(proyeccion => {
        console.log("Pruebas proyecciones - PeliculaID: " + proyeccion.peliculaID);
        var docRef = this.dbStorage.collection('infoPeliculas').doc(proyeccion.peliculaID);
        docRef.ref.get().then(doc => {
          this.item = {
            //Datos de la pelicula
            duracion: doc.data().duracion,
            director: doc.data().director,
            edad: doc.data().edad,
            estreno: doc.data().estreno,
            genero: doc.data().genero,
            imagen: doc.data().imagen,
            productor: doc.data().productor,
            reparto: doc.data().reparto,
            sinopsis: doc.data().sinopsis,
            titulo: doc.data().titulo,
            trailer: doc.data().trailer,
            //Datos de la proyeccion
            empresa: proyeccion.empresa,
            lugar: proyeccion.lugar,
            dia: proyeccion.dia,
            hora: proyeccion.hora,
          }

          this.items.push(this.item);
          this.items.forEach(elemento => {
            console.log("Añadido al array: " + elemento.titulo)
          });

        });
      })
        return this.items
    });
  }

  /**
   * Navegacion a la pantalla Detalle.
   * @param pelicula seleccionada por el usuario
   */
  goToDetalle(pelicula) {
    console.log("Metodo goToDetalle");
    this.navCtrl.push(DetallePage, {
      peliculaSeleccionada: pelicula});
  }

}
