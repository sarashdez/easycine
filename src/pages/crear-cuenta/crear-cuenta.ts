import { Component } from '@angular/core';
import {ActionSheetController, NavController} from 'ionic-angular';
import {FormGroup, FormBuilder} from "@angular/forms";
//import moment from 'moment';
/*
import { CarteleraPage } from '../cartelera/cartelera';
import { DetallePage } from '../detalle/detalle';
import { TrailerPage } from '../trailer/trailer';
import { ComprarEntradasPage } from '../comprar-entradas/comprar-entradas';
import { PaypalPage } from '../paypal/paypal';*/
//import {DatePicker} from "@ionic-native/date-picker";
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-crear-cuenta',
  templateUrl: 'crear-cuenta.html'
})
export class CrearCuentaPage {


  image: string = null;
  public form: FormGroup;

  constructor(public navCtrl: NavController,
              private _FB : FormBuilder,
              public actionSheetCtrl : ActionSheetController,
              private camera : Camera
              /*private datePicker: DatePicker*/) {
    this.form = this._FB.group({
      'email' : [''],
      'password' : [''],
      'nombre' : [''],
      'fechaNacimiento' : ['']
    })
  }

  /**
   * Método crearCuenta.
   * Coge los datos obtenidos en el formulario y registra al usuario haciendo uso de Firebase.
   */
  crearCuenta() {
    console.log("Metodo crearCuenta()");

    let email: string = this.form.controls['email'].value;
    let password: string = this.form.controls['password'].value;
    let nombre: string = this.form.controls['nombre'].value;
    let fechaNacimiento : string = this.form.controls['fechaNacimiento'].value;
    //Formateo de la fecha de nacimiento.
    //let dob = moment(new Date(fechaNacimiento)).format("DD-MM-YYYY");

    console.log("Valores obtenidos del formulario");
    console.log("Email: " + email);
    console.log("Contraseña: " + password);
    console.log("Nombre: " + nombre);
    console.log("Fecha de nacimiento: " + fechaNacimiento);

  }

  /**
   * Método mostrarOpcionesFotoPerfil().
   * Se muestra un menú con las opciones del usuario: subir foto desde la galería,
   * sacar una foto con la cámara o no añadir foto.
   */
  mostrarOpcionesFotoPerfil() {
    console.log("Método mostrarOpcionesFotoPerfil().");

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Añadir foto de perfil',
      buttons: [
        {
          text: 'Sacar foto con la cámara',
          handler: ()=> {
            console.log("Opción escogida: Cámara.");
            this.addFotoPerfil(1);
          }
        },{
          text: 'Subir desde la galería',
          handler: ()=> {
            console.log("Opción escogida: Galería");
            this.addFotoPerfil(2);
          }
        },{
          text: 'No quiero añadir foto de perfil',
          handler: ()=> {
            console.log("Opción escogida: Sin foto");
          }
        }
      ]
    });
    actionSheet.present();
  }

  /**
   * Método addFotoPerfil(sourceType: number).
   * @param {number} sourceType
   * El método permite al usuario obtener una foto de perfil en el registro,
   * ya sea haciendo uso de la cámara o escogiendo la foto de la galería.
   */
  addFotoPerfil(sourceType:number) {
    console.log("Método addFotoPerfil()");

    let sourceFoto;

    //Si el parámetro recibido es 1, la opción escogida por el usuario es
    //sacar una foto con la cámara.
    if(sourceType == 1) {
      sourceFoto = this.camera.PictureSourceType.CAMERA;
    }
    //Si el parámetro recibido es 2, la opción escogida por el usuario es
    //escoger una foto de la galería del dispositivo.
    if(sourceType == 2) {
      sourceFoto = this.camera.PictureSourceType.PHOTOLIBRARY;
    }

    let opciones : CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100,
      sourceType: sourceFoto
    }

    this.camera.getPicture(opciones)
      .then(imageData => {
        this.image = 'data:image/jpeg;base64,' + imageData;
      })
      .catch(error => {
        console.error(error);
      });
  }



}
