import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ViewController} from 'ionic-angular';
import {Observable} from "rxjs/Rx";
import {AngularFirestore} from "angularfire2/firestore";
import {AutenticacionProvider} from "../../providers/autenticacion/autenticacion";
import {CarteleraPage} from "../cartelera/cartelera";
import {AngularFireAuth} from "angularfire2/auth";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-mi-perfil',
  templateUrl: 'mi-perfil.html'
})
export class MiPerfilPage {

  private perfil : any;
  private nombre : Observable<String>;
  private correo : Observable<String>;
  private dob : Observable<String>;
  private fotoURL : string;

  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              private dbStorage : AngularFirestore,
              private _AUTH  : AutenticacionProvider,
              private alertCtrl: AlertController,
              private _ANGFIRE: AngularFireAuth) {
  }

  /**
   * Carga los componentes necesarios para la vista.
   */
  ionViewWillLoad() {
    //Primero se comprueba si el usuario ha iniciado sesion. Si es asi, se muestra su info. Si no se redirige a Login.
    let uid : string;
    console.log("Comprobar usuario logued");
    this._ANGFIRE.authState.subscribe(session => {
      if(session) {
        //Usuario logueado
        uid = session.uid;
        console.log("Usuario logueado: "+uid);
        const perfilDoc = this.dbStorage.collection('usuarios').doc(uid);
        perfilDoc.valueChanges().subscribe((profile: any) => {
          this.perfil = profile;
          this.nombre = this.perfil.nombre;
          this.correo = this.perfil.correo;
          this.dob = this.perfil.dob;
          this.fotoURL = this.perfil.url;
        });
      } else {
        console.log("Ningun usuario logueado");
        this.goToLogin();
      }
    });
  }

  /**
   * Obliga a que la vista tenga boton "Back".
   */
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(true);
  }

  /**
   * Alerta que se muestra al usuario para que confirme si desea cerrar la sesion.
   * Si pulsa "Si", cierra sesion.
   * Si pulsa "No", permanece en su perfil.
   */
  alertaCerrarSesion() {
    let confirm = this.alertCtrl.create({
      title: 'Cerrar sesión',
      message: '¿Estás seguro de que quieres cerrar tu sesión en EasyCine?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.cerrarSesion();
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   * Cierra la sesion del usuario en la app y lo redirige a la pagina de Cartelera.
   */
  cerrarSesion() {
    this._AUTH.logOut();
    this.navCtrl.push(CarteleraPage);
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

}
