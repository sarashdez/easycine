import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
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
              private alertCtrl: AlertController,
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
  
}
