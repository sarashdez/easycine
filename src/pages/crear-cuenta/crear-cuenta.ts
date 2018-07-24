import { Component } from '@angular/core';
import { ActionSheetController, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AutenticacionProvider } from "../../providers/autenticacion/autenticacion";
import { StorageProvider } from "../../providers/storage/storage";
import { MiPerfilPage } from "../mi-perfil/mi-perfil";
import {finalize} from "rxjs/internal/operators";
import {Observable} from "rxjs/Rx";
import {AngularFireStorage} from "angularfire2/storage";
import * as moment from 'moment';
import {CarteleraPage} from "../cartelera/cartelera";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'page-crear-cuenta',
  templateUrl: 'crear-cuenta.html'
})
export class CrearCuentaPage {

  //Datos formulario
  private email : string;
  private password : string;
  private nombre : string;
  private fechaNacimiento : string;
  private refImagen : string;
  private urlImagen : string;


  //public urlImagen : string;

  displayForm : boolean = true;
  displayError : string;
  form: FormGroup;
  fotoPerfilExiste : string = "Existe foto";
  downloadURL: Observable<string>;

  constructor(public navCtrl: NavController,
              private _FB : FormBuilder,
              public actionSheetCtrl : ActionSheetController,
              private camera : Camera,
              public _AUTH  : AutenticacionProvider,
              private _STR : StorageProvider,
              private cloudStorage : AngularFireStorage,
              private _ANGFIRE: AngularFireAuth) {
    this.form = this._FB.group({
      'email' : [''],
      'password' : [''],
      'nombre' : [''],
      'fechaNacimiento' : ['']
    })
  }

  /**
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
        }
      ]
    });
    actionSheet.present();
  }

  /**
   * El método permite al usuario obtener una foto de perfil en el registro,
   * ya sea haciendo uso de la cámara o escogiendo la foto de la galería..
   * @param {number} sourceType
   */
  async addFotoPerfil(sourceType:number) {
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

    try {
      let opciones : CameraOptions = {
        quality: 70,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType: sourceFoto
      }
      const result = await this.camera.getPicture(opciones);
      this.refImagen = `data:image/jpeg;base64,${result}`;
    }
    catch(e) {
      console.error(e);
    }
  }


  /**
   * Coge los datos obtenidos en el formulario y registra al usuario en el servidor.
   */
  crearCuenta() {
    console.log("Metodo crearCuenta()");
    this.obtenerResultadosFormulario();
    console.log("Valores en crearCuenta()");
    console.log("Email: " + this.email);
    console.log("Contraseña: " + this.password);
    console.log("Nombre: " + this.nombre);
    console.log("Fecha de nacimiento: " + this.fechaNacimiento);

    this._AUTH.signUp(this.email, this.password)
      .then((auth: string) => {
        //Se sube la imagen a Firebase.
        this.cloudStorage.ref(`profilePhotos/${this.email}`).putString(this.refImagen, 'data_url').
          then((snapshot: any) => {
            this.urlImagen = snapshot.getDownloadURL();
            alert("URL obtenida: "+this.urlImagen);
            console.log("URL obtenida: "+this.urlImagen);
        });
        alert("URL antes de subir a BBDD: "+this.urlImagen);
        this._ANGFIRE.authState.subscribe(session => {
            let userID = session.uid;
            console.log("Usuario creado: "+userID);
            console.log("Url imagen antes subir ddbb: "+this.urlImagen);
            this._STR.uploadProfileInfoToDB(this.fechaNacimiento, this.nombre, userID, this.urlImagen);
            this.form.reset();
            alert("¡Tu cuenta ha sido creada!");
            this.navCtrl.push(CarteleraPage);
        });
      });

  }

  /**
   * Recoge los datos introducidos por el usuario en el formulario.
   */
  obtenerResultadosFormulario() {
    console.log("Obtener datos formulario");

    this.email = this.form.controls['email'].value;
    this.password = this.form.controls['password'].value;
    this.nombre = this.form.controls['nombre'].value;
    let fechaSinFormato : string  = this.form.controls['fechaNacimiento'].value;
    //Formatear fecha
    this.fechaNacimiento = moment(fechaSinFormato).format("DD/MM/YYYY");

    console.log("Valores obtenidos del formulario");
    console.log("Email: " + this.email);
    console.log("Contraseña: " + this.password);
    console.log("Nombre: " + this.nombre);
    console.log("Fecha de nacimiento: " + this.fechaNacimiento);
  }


}
