import { Component } from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import { CarteleraPage } from '../cartelera/cartelera';
import { DetallePage } from '../detalle/detalle';
import { TrailerPage } from '../trailer/trailer';
import { ComprarEntradasPage } from '../comprar-entradas/comprar-entradas';
import { PaypalPage } from '../paypal/paypal';
import { CrearCuentaPage } from '../crear-cuenta/crear-cuenta';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AutenticacionProvider} from "../../providers/autenticacion/autenticacion";
import {MiPerfilPage} from "../mi-perfil/mi-perfil";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public form : FormGroup;
  public displayError : string;


  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              private _FB: FormBuilder,
              public _AUTH: AutenticacionProvider) {
    this.form = this._FB.group({
      'email':[''],
      'password':['']
    })
  }

  /////////////
  /*constructor(public navCtrl: NavController,
              private _FB   : FormBuilder,
              public _AUTH  : AutenticacionProvider)
  {
    this.form = this._FB.group({
      'email'    : [''],
      'password' : ['']
    })
  }*/
  /////////////

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(true);
  }

  //METODO LOGIN
  login() {
    console.log("Metodo login()");
    /*let email   : any = this.form.controls['email'].value,
      password  : any = this.form.controls['password'].value;*/
    let email : string = this.form.controls['email'].value;
    let password : string = this.form.controls['password'].value;

    console.log("Valores obtenidos del formulario");
    console.log("Email: " + email);
    console.log("Contraseña: " + password);
    //console.log('Datos metodo LOGIN: '+ email + ' ' + password );

    this._AUTH.loginAuth(email, password)
      .then((auth: string) => {
        this.form.reset();
        //this.displayForm = false;
        this.navCtrl.push(MiPerfilPage);
        console.log("Login Correcto");
      })
      .catch((error) => {
        this.displayError = error.message;
        alert("Tienes que introducir un usuario y contraseña válidos.");
        console.log("Error Login");
        console.log(error.message);
      });
  }

  goToCartelera(params){
    if (!params) params = {};
    this.navCtrl.push(CarteleraPage);
  }/**goToDetalle(params){
    if (!params) params = {};
    this.navCtrl.push(DetallePage);
  }goToTrailer(params){
    if (!params) params = {};
    this.navCtrl.push(TrailerPage);
  }goToComprarEntradas(params){
    if (!params) params = {};
    this.navCtrl.push(ComprarEntradasPage);
  }goToPaypal(params){
    if (!params) params = {};
    this.navCtrl.push(PaypalPage);
  }*/goToCrearCuenta(params){
    if (!params) params = {};
    this.navCtrl.push(CrearCuentaPage);
  }

  goBack() {
    console.log("Metodo goBack");
    this.navCtrl.push(CarteleraPage);
  }
/*
  showBackButton() {

  }*/
}
