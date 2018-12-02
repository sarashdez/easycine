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


    //let arr2: boolean[] = new Array();

  //CARTELERA
  cartelera : ItemCartelera[] = [];
  arrayPruebas : ItemCartelera[] = new Array();

  arrayPruebas2 : Array<ItemCartelera> = new Array();

  carteleraObs : any;
  IDs : any;
  pruebas : Observable<ItemCartelera[]>;
  peliculas : Observable<Pelicula[]>;

  //PRUEBAS
  pruebasProyecciones : Array<Proyeccion> = new Array();
  item : ItemCartelera;

  


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
      //this.funcion();
      //this.busquedaCarteleraConCriterios(this.empresa, this.dia, this.hora, this.cercania);
      //this.funcion();
      //this.comprobar();
     // this.comprobar();
      //this.comprobarResultados();
      //this.getCartelera();
      //this.getItemCartelera();
      this.ejecutarEnOrden();
    }

  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  async ejecutarEnOrden() {
    await this.funcion1().then(data => console.log(data));
    await this.funcion2().then(data => console.log(data));
    await this.funcion3().then(data => console.log(data));
    await this.busquedaCarteleraConCriterios(this.empresa, this.dia, this.hora, this.cercania).then(data =>
    console.log("Observable array recuperado"+data));
    await this.pasarObservableArray().then(data => console.log("pasarObservableArray: "+data));
   // await this.comprobarResultado().then(data => console.log("comprobarresultadoterminado: "+data));
    //await console.log("ARRAAAAAAY: "+this.pruebasProyecciones);
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

    console.log("Array en metodo busquedaCartelera: "+this.peliculasCercania);

    return new Promise ((resolve, reject) => {
      resolve(this.peliculasCercania);
      reject("REJECT");
    })



    //Pasar de Observable a Array normal

   
/*
    
    console.log("Pasar observable proyecciones a array");
    this.peliculasCercania.subscribe(proyecciones => {
      this.pruebasProyecciones = proyecciones;
      this.pruebasProyecciones.forEach(proyeccion => {
        console.log("pelicula: "+proyeccion.peliculaID);
      });
      }
    );*/

    
    /*
    console.log("comprobar fuera del subscribe si se introducen los datos");
    this.pruebasProyecciones.forEach(proyeccion => {
      console.log("pelicula: "+proyeccion.peliculaID);
    }); */

  }

  pasarObservableArray() {
    console.log("pasarObservableArray");
    let array : Array<Proyeccion> = new Array();


    this.peliculasCercania.subscribe(proyecciones => {
      console.log("dentro del map proyecciones");
      console.log(proyecciones);
      proyecciones.map(proyeccion => {
        console.log("dentro del map proyeccion");
        console.log("proyeccion: "+proyeccion.peliculaID);
          array.push(proyeccion);
      });
      console.log("dentro del map proyecciones");
      console.log("array auxiliar");
      console.log(array);
    });

    console.log("fuera del map");
    console.log("array:");
    console.log(array);

    return new Promise ((resolve, reject) => {
      resolve(array);
      /*resolve(this.peliculasCercania.subscribe(proyecciones => {
        this.pruebasProyecciones = proyecciones;
        console.log("dentro del subscribe");
        console.log(this.pruebasProyecciones);
        //return this.pruebasProyecciones;
      }));*/
      reject("REJECT");
    })
  }

  comprobarResultado() {
    return new Promise ((resolve, reject) => {
      resolve(this.pruebasProyecciones);
      reject("REJECT");
    })
  }



   

  /*  this.CountryService.GetCountries()
    .subscribe(countries => {
        this.myGridOptions.rowData = countries as CountryData[]
    })*/


  

  funcion1() {
    return new Promise ((resolve, reject) => {
      resolve("Función 1");
      reject("REJECT");
    })
  }

  funcion2() {
    return new Promise ((resolve, reject) => {
      resolve("Función 2");
      reject("REJECT");
    })
  }

  funcion3() {
    return new Promise ((resolve, reject) => {
      resolve("Función 3");
      reject("REJECT");
    })
  }



/*
comprobarResultados() {
  console.log("comprobar valores fuera del subscribe");
    this.pruebasProyecciones.forEach(proyeccion => {
      console.log("peliculaID: "+proyeccion.peliculaID);
    });

}*/



/*
getItemCartelera() {
  console.log("getItemCartelera()");

  this.pruebasProyecciones.forEach(proyeccion => {
    console.log("Pruebas proyecciones - PeliculaID: "+proyeccion.peliculaID);
    var docRef = this.dbStorage.collection('infoPeliculas').doc(proyeccion.peliculaID);
    docRef.ref.get().then((doc) => {
      this.pelicula = doc.data();
      console.log("pelicula recuperada: "+this.pelicula.titulo);
      this.item = {
        titulo : this.pelicula.titulo,
        empresa : proyeccion.empresa,
        lugar : proyeccion.lugar,
        dia : proyeccion.dia,
        hora : proyeccion.hora,
        edad : this.pelicula.edad,
        duracion : this.pelicula.duracion,
        imagen : this.pelicula.imagen
      }

      console.log("Item creado:");
      console.log("dato pelicula - imagen: "+this.item.imagen);
      console.log("dato proyeccion - lugar: "+this.item.lugar);
      this.arrayPruebas2.push(this.item);
      this.arrayPruebas2.forEach( elemento => {
        console.log("Añadido al array: "+elemento.titulo);
      });
    })
  });
}*/



/*
  getCartelera() {
    console.log("getCartelera()");

    this.arrayPruebas = this.peliculasCercania.map(proyecciones =>
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
            dia : proyeccion.dia,
            hora : proyeccion.hora,
            edad : this.pelicula.edad,
            duracion : this.pelicula.duracion,
            imagen : this.pelicula.imagen,
          };
          console.log("Item creado:");
          console.log("dato pelicula - imagen: "+item.imagen);
          console.log("dato proyeccion - lugar: "+item.lugar);
          this.arrayPruebas.push(item);
          this.arrayPruebas.forEach(i => {
            console.log("elemento array - imagen: "+i.imagen);
            }
          );
        })
        return this.arrayPruebas;
      })
    );
  } */

  /*
  goToDetalle(pelicula) {
    console.log("Metodo goToDetalle");
    this.navCtrl.push(DetallePage, {
      peliculaSeleccionada: pelicula});
  }*/

}
