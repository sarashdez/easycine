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

@Component({
  selector: 'page-crear-cuenta',
  templateUrl: 'crear-cuenta.html'
})
export class CrearCuentaPage {

  //public urlImagen : string;
  public refImagen : string = null;
  public displayForm : boolean = true;
  public displayError : string;
  public form: FormGroup;
  public fotoPerfilExiste : string = "Existe foto";
  downloadURL: Observable<string>;

  constructor(public navCtrl: NavController,
              private _FB : FormBuilder,
              public actionSheetCtrl : ActionSheetController,
              private camera : Camera,
              public _AUTH  : AutenticacionProvider,
              private _STR : StorageProvider,
              private cloudStorage : AngularFireStorage,) {
    this.form = this._FB.group({
      'email' : [''],
      'password' : [''],
      'nombre' : [''],
      'fechaNacimiento' : ['']
    })
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
            this.fotoPerfilExiste = null;
            console.log("fotoPerfilExiste: "+ this.fotoPerfilExiste);
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
   * Método crearCuenta.
   * Coge los datos obtenidos en el formulario y registra al usuario en el servidor.
   */
  crearCuenta() {
    console.log("Metodo crearCuenta()");

    let email: string = this.form.controls['email'].value;
    let password: string = this.form.controls['password'].value;
    let nombre: string = this.form.controls['nombre'].value;
    let fechaNacimiento : string = this.form.controls['fechaNacimiento'].value;
/*
    console.log("Valores obtenidos del formulario");
    console.log("Email: " + email);
    console.log("Contraseña: " + password);
    console.log("Nombre: " + nombre);
    console.log("Fecha de nacimiento: " + fechaNacimiento);
    console.log("crearCuenta(). refImagen: "+this.refImagen);*/

    this._AUTH.signUp(email, password)
      .then((auth: string) => {
        if(this.fotoPerfilExiste != null) {
          const fileRef = this.cloudStorage.ref(`profilePhotos/${email}`);
          var uploadTask = this._STR.uploadPhotoToCloud(this.refImagen, email);
          uploadTask.snapshotChanges().pipe(
            finalize(() => this.downloadURL = fileRef.getDownloadURL())
          )
            .subscribe();
          console.log("Download urL: "+this.downloadURL);
        }
        console.log("Download urL: "+this.downloadURL);
        this._STR.uploadProfileInfoToDB(fechaNacimiento, nombre, email, this.downloadURL);
        this.form.reset();
        this.displayForm = false;
        alert("¡Tu cuenta ha sido creada!");
        this.navCtrl.push(MiPerfilPage, {
          usuario: email
        });
        console.log("crearCuenta Correcto");
      })
        .catch((error) => {
          this.displayError = error.message;
          alert("Ha habido un error y no se ha podido crear tu cuenta");
          console.log("Error crearCuenta");
          console.log(error.message);
      });
  }


}
