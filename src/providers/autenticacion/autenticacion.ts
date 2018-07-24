import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';



@Injectable()
export class AutenticacionProvider {

  public user : Observable<any>;
  private uID : string;

  constructor(public http: Http,
              private _ANGFIRE: AngularFireAuth) {
    this.user = this._ANGFIRE.authState;
    console.log('Hello AutenticacionProvider');
  }


  //Metodo LOGIN().
  loginAuth(email: string, password: string) : Promise<any> {
    console.log("Autenticacion Provider. Login()");
    return new Promise((resolve, reject) => {
      this._ANGFIRE
        .auth.signInWithEmailAndPassword(email, password)
        .then((val: any) => {
          resolve();
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  //Metodo SIGNUP().
  signUp(email: string, password: string) : Promise<any> {
    console.log("Autenticacion Provider. SignUp()");
    return new Promise((resolve, reject) => {
      this._ANGFIRE
        .auth.createUserWithEmailAndPassword(email, password)
        .then((val: any) => {
          resolve();
        })
        .catch((err: any) => {
          reject(err);
        });
    });
    //TODO: MOSTRAR ALERTA SI EL EMAIL YA EXISTE
  }

  loginStatus() {
    console.log("loginStatus()");
    this._ANGFIRE.authState.subscribe(session => {
      if(session) {
        //Usuario logueado
        this.uID = session.uid;
        console.log("Usuario logueado: "+this.uID);
        return this.uID;
      } else {
        console.log("Ningun usuario logueado");
        return null;
      }
    });
  }

  //Metodo LOGOUT().
  logOut() : Promise<any> {
    return new Promise ((resolve, reject) => {
      this._ANGFIRE.auth.signOut()
        .then((data:any) => {
          resolve(data);
        })
        .catch((error : any) => {
          reject(error);
        });
    });
  }


}
