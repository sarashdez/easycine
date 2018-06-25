import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from "angularfire2/storage";
import {AngularFireDatabase} from "angularfire2/database";


@Injectable()

export class StorageProvider {

  constructor(private cloudStorage : AngularFireStorage,
              private dbStorage : AngularFireDatabase) {}

  uploadToCloud(refFoto : string, emailUsuario : string): AngularFireUploadTask {
    return this.cloudStorage.ref(`profilePhotos/${emailUsuario}`).putString(refFoto);
  }

  /*
  deleteFromCloud(refFoto : string) {


  }*/

  savePhotoMetadata(metadata) {
    let datos = {
      created: metadata.timeCreated,
      url: metadata.downloadURLs[0],
      fullPath: metadata.fullPath,
      contentType: metadata.contentType
    }
    return this.dbStorage.list('metadatosFotos').push(datos);
  }





}
