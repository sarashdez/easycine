import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { ViewController } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {Pelicula} from "../../models/pelicula";
import {BehaviorSubject, Observable} from "rxjs/Rx";
import { switchMap } from 'rxjs/operators';
import {Proyeccion} from "../../models/proyeccion";
import {ItemCartelera} from "../../models/itemCartelera";
import {DetallePage} from "../detalle/detalle";


@Component({
  selector: 'page-cartelera',
  templateUrl: 'cartelera.html'
})
export class CarteleraPage {

  //Criterios
  private criterios : string;

  //Parametros que se recuperan
  private empresa : string;
  private dia : string;
  private hora : string;
  private cercania : string;

  //FIREBASE
  proyeccionesDiaHoraCollection: AngularFirestoreCollection<Proyeccion>;
  peliculasDiaHora : Observable<Proyeccion[]>;
  peliculasEmpresa : Observable<Proyeccion[]>;
  peliculasCercania : Observable<Proyeccion[]>;
  peliculasCercania2 : Proyeccion[];
  infoPeliculasCollection: AngularFirestoreCollection<Pelicula>;
  infoPeliculas : Observable<Pelicula[]>;
  peliculaDoc : AngularFirestoreDocument;
  pelicula : any;
  peliculaRecuperada : any;

  //CARTELERA
  cartelera : ItemCartelera[] = [];
  carteleraObs : any;
  IDs : any;
  pruebas : Observable<ItemCartelera[]>;
  peliculas : Observable<Pelicula[]>;


  constructor(public navCtrl: NavController,
              public param: NavParams,
              private viewCtrl: ViewController,
              private dbStorage : AngularFirestore) {
    console.log("Parametros recuperados Cartelera:");
    this.criterios = param.get("criterios");
    console.log("Criterios: "+this.criterios);

    if(this.criterios === "criterios") {
      //Origen: Criterios busqueda
      //Se recuperan parametros
      this.empresa = param.get("empresa");
      this.dia = param.get("dia");
      this.hora = param.get("hora");
      this.cercania = param.get("cercania");
      console.log("Empresa: "+this.empresa);
      console.log("Dia: "+this.dia);
      console.log("Hora: "+this.hora);
      console.log("Cercania: "+this.cercania);
      //Se hace busqueda
      this.busquedaCarteleraConCriterios(this.empresa, this.dia, this.hora, this.cercania);
      //this.getCartelera();
    }

  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  //BUSQUEDA CARTELERA CON CRITERIOS
  busquedaCarteleraConCriterios(empresa : string, dia : string, hora : string, cercania : string) {
    console.log("Metodo busquedaCarteleraConCriterios()");
    //DIA Y HORA
    //Dia y hora seleccionados
    if(dia!=null && hora!=null) {
      console.log("Dia y hora not null");
      console.log("Valor dia: "+dia);
      console.log("Valor hora: "+hora);

      this.proyeccionesDiaHoraCollection = this.dbStorage.collection('proyecciones', ref => {
        return ref
          .where('hora', '==', hora)
          .where('dia', '==', dia)
      });
      this.peliculasDiaHora = this.proyeccionesDiaHoraCollection.valueChanges();
    }

    //Dia seleccionado y hora no
    if(dia!=null && hora==null) {
      console.log("Dia not null y hora null");
      console.log("Valor dia: "+dia);
      console.log("Valor hora: "+hora);

      this.proyeccionesDiaHoraCollection = this.dbStorage.collection('proyecciones', ref => {
        return ref
          .where('dia', '==', dia)
      });
      this.peliculasDiaHora = this.proyeccionesDiaHoraCollection.valueChanges();
    }

    //Dia no seleccionado y hora si
    if(dia==null && hora!=null) {
      console.log("Dia null y hora not null");
      console.log("Valor dia: "+dia);
      console.log("Valor hora: "+hora);

      this.proyeccionesDiaHoraCollection = this.dbStorage.collection('proyecciones', ref => {
        return ref
          .where('hora', '==', hora)
      });
      this.peliculasDiaHora = this.proyeccionesDiaHoraCollection.valueChanges();
    }

    //Ninguno de los dos seleccionados
    if(dia==null && hora==null) {
      console.log("Dia y hora null");
      console.log("Valor dia: "+dia);
      console.log("Valor hora: "+hora);

      this.proyeccionesDiaHoraCollection = this.dbStorage.collection('proyecciones');
      this.peliculasDiaHora = this.proyeccionesDiaHoraCollection.valueChanges();
    }

    //EMPRESA
    if(empresa!=null) {
      console.log("Empresa not null");
      console.log("Empresa: "+empresa);


      this.peliculasEmpresa = this.peliculasDiaHora.map(proyecciones => {
         return proyecciones.filter((proyeccion : Proyeccion) => proyeccion.empresa === empresa)
      });

    } else {
      //No se hace nada con el resultado obtenido de DIA y HORA
      this.peliculasEmpresa = this.peliculasDiaHora;
    }

    //CERCANIA
    if(cercania!=null) {
      console.log("Cercania not null");
      //Filtrar por cercania según la ubicacion
    } else {
      //No se hace nada con el resultado obtenido de EMPRESA
      this.peliculasCercania = this.peliculasEmpresa;
      /*this.peliculasCercania2 = this.peliculasEmpresa.map(proyecciones => {
        return proyecciones;
      });*/
    }
  }




//PRUEBA SUBIDA GIT








  /*getCartelera() {
    console.log("getCartelera()");

    this.pruebas = this.peliculasCercania.map(proyecciones =>
      proyecciones.map(proyeccion => {
        console.log(proyeccion.peliculaID);
        var docRef = this.dbStorage.collection('infoPeliculas').doc(proyeccion.peliculaID);
        docRef.ref.get().then((doc) => {
          this.pelicula = doc.data();
          console.log("pelicula recuperada: " + this.pelicula.titulo);
          var item = {
            titulo : this.pelicula.titulo,
            empresa : proyeccion.empresa,
            lugar : proyeccion.lugar,
            hora : proyeccion.hora,
            edad : this.pelicula.edad,
            duracion : this.pelicula.duracion,
            imagen : this.pelicula.imagen,
          };
          console.log("Item creado:");
          console.log("dato pelicula - imagen: "+item.imagen);
          console.log("dato proyeccion - lugar: "+item.lugar);
          this.cartelera.push(item);
          this.cartelera.forEach(i => {
            console.log("elemento array - imagen: "+i.imagen);
            }
          );
        })
        return this.cartelera;
      })
    );
  }*/

  goToDetalle(pelicula) {
    console.log("Metodo goToDetalle");
    this.navCtrl.push(DetallePage, {
      peliculaSeleccionada: pelicula})
  }

}
