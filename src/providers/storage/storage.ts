import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from "angularfire2/storage";

//import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database-deprecated";

//import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database-deprecated";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
//import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {Perfil} from "../../app/app.component";

@Injectable()

export class StorageProvider {

  public perfiles : AngularFirestoreCollection<any>;
 // public perfil : AngularFirestoreDocument<Perfil>;
  public perfil : Perfil;
  private queryPerfil : QueryFn = null;


  constructor(private cloudStorage : AngularFireStorage,
              private dbStorage : AngularFirestore) {
    this.perfiles = this.dbStorage.collection('/usuarios');
  }



  uploadPhotoToCloud(refFoto : string, emailUsuario : string): AngularFireUploadTask {
    return this.cloudStorage.ref(`profilePhotos/${emailUsuario}`).putString(refFoto, 'data_url');
  }

  uploadProfileInfoToDB(dateOfBirth : string, nombre : string, email: string, url : string){
      this.perfiles.doc(email).set({
        dob: dateOfBirth,
        nombre: nombre,
        url: url
      }).then(function(docRef) {
        console.log("Documento añadido.");
      }).catch(function(error) {
        console.error("Error al añadir documento.");
      });
  }



  getProfileInfoFromDB(email : string) {
    console.log("getProfileInfoFromDB");/*
    //this.perfil = this.dbStorage.collection('/usuarios', ref => ref.where('email', '==', email));
    this.perfil = this.perfiles.doc(email).get().then(function(doc) {
      if(doc.exists) {
        console.log("Datos del documento: "+doc.data());
      } else {
        console.log("No existe el documento");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });*/

    var docRef = this.dbStorage.collection('usuarios').doc(email);

    docRef.ref.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        console.log("Nombre: "+doc.data().nombre);
        console.log("Email: "+doc.data().email);
        console.log("DOB: "+doc.data().dob);
        return doc;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });


    //TODO: RECUPERAR INFO DEL DOCUMENTO
   /* this.itemscollection.doc(id).ref.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });*/

  }

  /*
  deleteFromCloud(refFoto : string) {


  }*/






}
