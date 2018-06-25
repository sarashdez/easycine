import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from "angularfire2/storage";

//import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database-deprecated";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";



@Injectable()

export class StorageProvider {

  public perfiles : AngularFireList<any>;

  constructor(private cloudStorage : AngularFireStorage,
              private dbStorage : AngularFireDatabase) {
    this.perfiles = this.dbStorage.list('/usuarios');
  }


  uploadToCloud(refFoto : string, emailUsuario : string): AngularFireUploadTask {
    return this.cloudStorage.ref(`profilePhotos/${emailUsuario}`).putString(refFoto, 'data_url');
  }

  uploadProfileInfoToDB(fechaNacimiento : string, nombre : string, email : string){
    console.log('uploadProfileInfoToDB');
    console.log('Fecha de nacimiento: ' + fechaNacimiento);
    console.log('Nombre: ' + nombre);
    console.log('Email: ' + email);

    this.perfiles.push({
      dob : fechaNacimiento,
      email: email,
      nombre: nombre
    });
  }

  /*
  deleteFromCloud(refFoto : string) {


  }*/






}
