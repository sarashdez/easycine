import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
/*import {StorageProvider} from "../../providers/storage/storage";
import {AngularFireAuth} from "angularfire2/auth";*/
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import { Observable } from 'rxjs';
import { Entrada } from '../../models/entrada';


@Component({
  selector: 'page-mis-entradas',
  templateUrl: 'mis-entradas.html'
})
export class MisEntradasPage {

  private entradasCollection: AngularFirestoreCollection<Entrada>;
  private entradas : Observable<Entrada[]>;
  private userID : string;

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private dbStorage : AngularFirestore,
  /*private _ANGFIRE: AngularFireAuth*/) {
  }


  /**
   * Carga los componentes necesarios para la vista.
   */
  ionViewWillLoad() {
    //Primero se comprueba si el usuario ha iniciado sesion. Si es asi, se muestra la info de las entradas que ha comprado.
    //Si no, se informa que esta es una opción sólo disponible para usuarios registrados.
    
    this.entradasCollection = this.dbStorage.collection('entradas', ref => {
      return ref.where('user', '==', 'pruebaaa')
    });
    this.entradas = this.entradasCollection.valueChanges();
    
    /*let uid : string;
    console.log("Comprobar usuario logued");
    this._ANGFIRE.authState.subscribe(session => { 
      if(session) {
        //Usuario logueado
        //uid = session.uid;
        //console.log("Usuario logueado: "+uid);
        this.entradasCollection = this.dbStorage.collection('entradas', ref => {
          return ref.where('user', '==', 'pruebaaa')
        });
        this.entradas = this.entradasCollection.valueChanges();
       /* entradaDoc.valueChanges().subscribe((tickets: any) => {
          //this.perfil = profile;
          //this.misEntradas = tickets;
          this.entrada = {
            cantidad : tickets.cantidad,
            dia : tickets.dia,
            empresa : tickets.empresa,
            hora : tickets.hora,
            lugar : tickets.lugar,
            pelicula : tickets.pelicula,
          }
          this.entradas.push*/
          /*
          this.cantidad = tickets.cantidad;
          this.dia = tickets.dia;
          this.empresa = tickets.empresa;
          this.hora = tickets.hora;
          this.lugar = tickets.lugar;
          this.pelicula = tickets.pelicula;*/
/*
      } else {
        console.log("Ningun usuario logueado");
        this.alertaUsuarioNoRegistrado();
        //this.goToLogin();
      }
    });*/
  }

  /**
   * Alerta que se muestra cuando el usuario no ha iniciado sesión en la aplicación.
   */
  alertaUsuarioNoRegistrado() {
    console.log("Metodo alertaUsuarioNoRegistrado()");
    let confirm = this.alertCtrl.create({
      title: "Ups",
      message: "Lo sentimos, esta opción sólo está disponible para usuarios registrados",
      buttons: [
        {
          text: '¡Vale!',
          handler: () => {
            console.log('"¡Vale!" pulsado');
          }
        }
      ]
    });
    confirm.present();
  }
  
}
