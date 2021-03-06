import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from "angularfire2/storage";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Pelicula } from '../../models/pelicula';


@Injectable()

export class StorageProvider {

  peliculasRef : AngularFirestoreCollection<Pelicula>;
  peliculas$ : Observable<Pelicula[]>;
  perfiles : AngularFirestoreCollection<any>;
  entradas : AngularFirestoreCollection<any>;


  constructor(private cloudStorage : AngularFireStorage,
              private dbStorage : AngularFirestore) {
    this.peliculasRef = this.dbStorage.collection('infoPeliculas');
    this.peliculas$ = this.peliculasRef.valueChanges();

    this.perfiles = this.dbStorage.collection('/usuarios');
    this.entradas = this.dbStorage.collection('/entradas');
  }


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
   * Añade los datos de registro del usuario a la base de datos.
   * @param dateOfBirth
   * @param nombre
   * @param email
   * @param url
   */
  uploadProfileInfoToDB(dateOfBirth : string, nombre : string, uid: string, email: string){
    this.perfiles.doc(uid).set({
      dob: dateOfBirth,
      nombre: nombre,
      email: email
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

    docRef.ref.get().then(function (doc) {
      if (doc.exists) {
        return doc;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }

  /**
   * Añade la entrada comprada a la base de datos.
   * @param dateOfBirth
   * @param nombre
   * @param email
   * @param url
   */
  uploadEntradaToDB(sesion: string, cantidad: string, dia: string, empresa: string,
                    hora: string, lugar: string, pelicula: string, imagen : string){
    this.entradas.add({
      cantidad: cantidad,
      dia: dia,
      empresa: empresa,
      hora: hora,
      lugar: lugar,
      pelicula: pelicula,
      imagenUrl: imagen,
      user: sesion,
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

}
