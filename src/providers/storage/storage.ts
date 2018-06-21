import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from "angularfire2/storage";


@Injectable()

export class StorageProvider {

  constructor(private cloudStorage : AngularFireStorage) {}

  uploadToCloud(refFoto : string, emailUsuario : string): AngularFireUploadTask {
    return this.cloudStorage.ref(`profilePhotos/${emailUsuario}`).putString(refFoto);
  }

  /*
  deleteFromCloud(refFoto : string) {


  }*/





}
