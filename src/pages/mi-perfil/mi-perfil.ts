import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {Observable} from "rxjs/Rx";
import {Perfil} from "../../app/app.component";
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";
import {AngularFireStorage} from "angularfire2/storage";

@Component({
  selector: 'page-mi-perfil',
  templateUrl: 'mi-perfil.html'
})
export class MiPerfilPage {

  private email : string;
  perfil : any;
  nombre : Observable<String>;
  correo : Observable<String>;
  dob : Observable<String>;
  refFotoPerfil : any;
  url : any;

  constructor(public navCtrl: NavController,
              public param: NavParams,
              private viewCtrl: ViewController,
              private _STR : StorageProvider,
              private dbStorage : AngularFirestore,
              private cloudStorage : AngularFireStorage,) {
    this.email = param.get("usuario");
    console.log("constructorPerfil Parametro recibido: " + this.email);
    this.mostrarFotoPerfil();
  }

  ionViewWillLoad() {
    const perfilDoc = this.dbStorage.collection('usuarios').doc(this.email);
    perfilDoc.valueChanges().subscribe((profile: any) => {
      this.perfil = profile;
      this.nombre = this.perfil.nombre;
      console.log("Nombre recuperado: "+this.nombre);
      this.correo = this.perfil.correo;
      this.dob = this.perfil.dob;
      console.log("Fecha recuperado: "+this.dob);
    });
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  mostrarFotoPerfil() {
    console.log("mostrarFotoPerfil()");/*
    this.url = this.cloudStorage.ref(`profilePhotos/${this.email}`).getDownloadURL();
    console.log("Fuente de imagen: "+this.url.getElementById(this.email));
    this.refFotoPerfil = this.url;*/
    //const storageRef = this.cloudStorage.ref(`profilePhotos/${this.email}`);
    //const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
    //this.refFotoPerfil = storageRef.child('').getDownloadURL();.
    this.refFotoPerfil = 'https://firebasestorage.googleapis.com/v0/b/easy-cine.appspot.com/o/profilePhotos%2Fprueba200%40email.com?alt=media&token=b44b6a03-c1dc-4524-91fe-023775e5a5a4'
    console.log("fotoDoc: "+this.url);
    /*const fotoDoc = this.cloudStorage.ref(`profilePhotos/${this.email}`).getDownloadURL();
    fotoDoc.getElementById(this.email);*/
      // `url` is the download URL for 'images/stars.jpg'
      // Or inserted into an <img> element:
      /*console.log("url: "+this.url);
      var img = document.getElementById(this.email);
      console.log("img: "+img);*/
      /*img.src = url;
      console.log("img.src: "+img.src);*/
/*

    }).catch(function(error) {
      // Handle any errors
    });*/
  }





}
