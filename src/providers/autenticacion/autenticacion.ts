import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";


@Injectable()
export class AutenticacionProvider {

  public user : Observable<any>;

  constructor(public http: Http,
              private _ANGFIRE: AngularFireAuth) {
    this.user = this._ANGFIRE.authState;
  }


  /**
   * Se accede a la cuenta del usuario.
   * @param email
   * @param password
   */
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

  /**
   * Se crea una nueva cuenta para el usuario y se añaden los datos introducidos a la
   * base de datos.
   * @param email
   * @param password
   */
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
          alert('¡Ups! No se ha podido crear la cuenta.');
        });
    });
  }

  /**
   * Se cierra la sesión del usuario.
   */
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
