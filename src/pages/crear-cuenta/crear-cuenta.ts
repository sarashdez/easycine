import { Component } from '@angular/core';
import {ActionSheetController, NavController} from 'ionic-angular';
import {FormBuilder} from "@angular/forms";
import moment from 'moment';
/*
import { CarteleraPage } from '../cartelera/cartelera';
import { DetallePage } from '../detalle/detalle';
import { TrailerPage } from '../trailer/trailer';
import { ComprarEntradasPage } from '../comprar-entradas/comprar-entradas';
import { PaypalPage } from '../paypal/paypal';*/
//import {DatePicker} from "@ionic-native/date-picker";
import { Camera/*, CameraOptions */} from '@ionic-native/camera';
import { CameraOptions } from 'ionic-native/camera';

@Component({
  selector: 'page-crear-cuenta',
  templateUrl: 'crear-cuenta.html'
})
export class CrearCuentaPage {

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

  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;


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
    let dob = moment(new Date(fechaNacimiento)).format("DD-MM-YYYY");

    console.log("Valores obtenidos del formulario");
    console.log("Email: " + email);
    console.log("Contraseña: " + password);
    console.log("Nombre: " + nombre);
    console.log("Fecha de nacimiento: " + dob);

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
            this.sacarFotoConCamara();
          }
        },{
          text: 'Subir desde la galería',
          role: "",
          handler: ()=> {
            console.log("Opción escogida: Galería");
            this.subirFotoDesdeGaleria();
          }
        },{
          text: 'No quiero añadir foto de perfil',
          role: "",
          handler: ()=> {
            console.log("Opción escogida: Sin foto");
          }
        }
      ]
    });
    actionSheet.present();
  }

  /**
   * Método sacarFotoConCamara().
   */
  sacarFotoConCamara() {
    console.log("Método sacarFotoConCamara()");
/*
    let captureDataUrl: string;

    const opciones ={
      quality: 70,
      encodingType: this.camera.EncodingType.PNG,
      destinationType: Camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      mediaType: Camera.MediaType.PICTURE
    };

    Camera.getPicture(opciones).then((imageData) => {
      this.captureDataUrl = 'data:image/png;base64' + imageData;
    }, (err) => {
      //Handle error
    });*/
    Camera.getPicture({
      quality: 70,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.myPhoto = imageData;
     // this.uploadPhoto();
    }, error => {
      console.log("Error");
      });

  }

  /**
   * Método subirFotoDesdeGaleria().
   */
  subirFotoDesdeGaleria() {
    console.log("Método subirFotoDesdeGaleria().");


  }








}
