import { Component } from '@angular/core';
import { ActionSheetController, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder } from "@angular/forms";

/*
import { CarteleraPage } from '../cartelera/cartelera';
import { DetallePage } from '../detalle/detalle';
import { TrailerPage } from '../trailer/trailer';
import { ComprarEntradasPage } from '../comprar-entradas/comprar-entradas';
import { PaypalPage } from '../paypal/paypal';*/
//import {DatePicker} from "@ionic-native/date-picker";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AutenticacionProvider } from "../../providers/autenticacion/autenticacion";
import { storage } from 'firebase';

@Component({
  selector: 'page-crear-cuenta',
  templateUrl: 'crear-cuenta.html'
})
export class CrearCuentaPage {

  image : string = null;
  public displayForm : boolean = true;
  public displayError : string;
  public form: FormGroup;

  constructor(public navCtrl: NavController,
              private _FB : FormBuilder,
              public actionSheetCtrl : ActionSheetController,
              private camera : Camera,
              public _AUTH  : AutenticacionProvider) {
    this.form = this._FB.group({
      'email' : [''],
      'password' : [''],
      'nombre' : [''],
      'fechaNacimiento' : ['']
    })
  }

  /**
   * Método crearCuenta.
   * Coge los datos obtenidos en el formulario y registra al usuario en el servidor.
   */
  crearCuenta() {
    console.log("Metodo crearCuenta()");

    let email: string = this.form.controls['email'].value;
    let password: string = this.form.controls['password'].value;
    let nombre: string = this.form.controls['nombre'].value;
    let fechaNacimiento : string = this.form.controls['fechaNacimiento'].value;

    console.log("Valores obtenidos del formulario");
    console.log("Email: " + email);
    console.log("Contraseña: " + password);
    console.log("Nombre: " + nombre);
    console.log("Fecha de nacimiento: " + fechaNacimiento);

    this._AUTH.signUp(email, password)
      .then((auth: string) => {
        this.subirFotoPerfil(email);
        this.form.reset();
        this.displayForm = false;
        alert("¡Tu cuenta ha sido creada!");
        console.log("crearCuenta Correcto");
      })
      .catch((error) => {
        //this.displayError = error.message;
        alert("Tienes que introducir un usuario y contraseña válidos.");
        console.log("Error crearCuenta");
        console.log(error.message);
      });
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
    let email: string = this.form.controls['email'].value;
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
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 600,
      targetHeight: 600,
      quality: 60,
      correctOrientation: true,
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

  /**
   * Método subirFotoPerfil()
   * La foto obtenida por el usuario durante el proceso de registro (ya sea desde la
   * cámara o desde la galería de su dispositivo) se sube al servidor.
   */
  subirFotoPerfil(userEmail : string) {
    let storageRef = firebase.storage().ref();

    const foto = storageRef.child(`profilePhotos/${userEmail}.jpg`);
    foto.putString(this.image, firebase.storage.StringFormat.DATA_URL);
  }

  guardarFechaNacimiento() {

  }


}
