import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from "angularfire2/storage";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Pelicula } from '../../models/pelicula';


@Injectable()

export class StorageProvider {

  peliculasRef : AngularFirestoreCollection<Pelicula>;
  peliculas$ : Observable<Pelicula[]>;

  public perfiles : AngularFirestoreCollection<any>;
  // public perfil : AngularFirestoreDocument<Perfil>;
  //public perfil : Perfil;
  private queryPerfil : QueryFn = null;


  constructor(private cloudStorage : AngularFireStorage,
              private dbStorage : AngularFirestore) {
    this.peliculasRef = this.dbStorage.collection('infoPeliculas');
    this.peliculas$ = this.peliculasRef.valueChanges();
    //////////
    this.perfiles = this.dbStorage.collection('/usuarios');
  }


  //CLOUD STORAGE

  /**
   * Sube la imagen del usuario a Cloud Storage y la almacena utilizando el email de registro
   * como identificador.
   * @param refFoto
   * @param emailUsuario
   */
  uploadPhotoToCloud(refFoto : string, emailUsuario : string): AngularFireUploadTask {
    return this.cloudStorage.ref(`profilePhotos/${emailUsuario}`).putString(refFoto, 'data_url');
  }

  /**
   * Recupera la imagen del usuario (url de descarga).
   */
  downloadPhotoFromCloud() {
    //TODO: Obtener enlace de descarga de la imagen
  }

  //TODO: deletePhotoFromCloud




  //FIRESTORE

  /**
   * Añade los datos de registro del usuario a la base de datos.
   * @param dateOfBirth
   * @param nombre
   * @param email
   * @param url
   */
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

  /**
   * Recupera los datos del usuario de la base de datos.
   * @param email
   */
  getProfileInfoFromDB(email : string) {
    console.log("getProfileInfoFromDB");

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


  }








}
