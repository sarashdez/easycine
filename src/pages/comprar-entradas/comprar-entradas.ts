import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ViewController } from 'ionic-angular';

import { FormBuilder, FormGroup } from "@angular/forms";
import { PayPal, PayPalConfiguration, PayPalPayment } from "@ionic-native/paypal";


@Component({
  selector: 'page-comprar-entradas',
  templateUrl: 'comprar-entradas.html'
})
export class ComprarEntradasPage {

  public form: FormGroup;
  private item : any;
  private precio : number = 8;
  private numEntradas : string;
  private precioTotal : number;

  constructor(public navCtrl: NavController,
              public param: NavParams,
              private viewCtrl: ViewController,
              private _FB : FormBuilder,
              private alertCtrl: AlertController,
              private paypal : PayPal) {
    this.item = param.get("pelicula");
    console.log("constructorDetalle item recuperado: "+this.item.peliculaID);
    this.form = this._FB.group({
      'numEntradas' : ['']
    })
  }

  calcularPrecioTotal() {
    console.log("calcularPrecioTotal()");
    this.numEntradas = this.form.controls['numEntradas'].value;
    console.log("Numero entradas: "+this.numEntradas);
    var entradas : number = parseInt(this.numEntradas);
    console.log("Numero entradas number: "+entradas);
    this.precioTotal = this.precio*entradas;
  }

  confirmarContinuar() {
    this.calcularPrecioTotal();
    console.log("Metodo confirmarContinuar()");
    let confirm = this.alertCtrl.create({
      title: 'Continuar con el pago',
      message: 'El total de tu compra es '+this.precioTotal+'€. El proceso de pago se realiza con Paypal, ¿deseas continuar?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('"No" pulsado');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            console.log('"Sí" pulsado');
            this.pagoPaypal();
          }
        }
      ]
    });
    confirm.present();
  }

  pagoPaypal() {
    this.paypal.init({
      //Production client ID
      PayPalEnvironmentProduction: 'EPT194VdBOEwdp2rjTilYApqqVXa4-BQZdkYBqolcA_6CevsA7T-G434zphNUtQs0o7LVGcf8R2ngZEl',
      //Sandbox client ID
      PayPalEnvironmentSandbox: 'ARE-fIDQFTcMEEKwS1tCyT3bKUukGR-4v1gs79YShcaRhmDjmr7-mAixeBaKcPeMezgou1cW_gs4JyWB'
    }).then(()=> {
      this.paypal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({

      })).then(() => {
        let payment = new PayPalPayment(this.precioTotal.toString(), 'EUR', 'Entradas de cine (EasyCine)', 'sale');
        this.paypal.renderSinglePaymentUI(payment).then(() => {
          //Pago hecho con exito
          let titulo : string  = 'Pago realizado';
          let mensaje : string = 'El pago se ha realizado con éxito. Tus entradas están disponibles en "Mis entradas".';
          this.alertaProcesoDePago(titulo, mensaje);
        }, () => {
          //Error en el pago
          console.log("Error en el pago");
          let titulo : string = 'Pago fallido';
          let mensaje : string = 'El pago no ha podido completarse. Por favor, inténtelo de nuevo.';
          this.alertaProcesoDePago(titulo, mensaje);
        });
      }, () => {
        //Error en la configuracion
        console.log("Error en la configuracion");
        let titulo : string = 'Proceso erróneo';
        let mensaje : string = 'Ha habido un error interno, lo arreglaremos en la mayor brevedad posible. Disculpe por las molestias.';
        this.alertaProcesoDePago(titulo, mensaje);
      });
    }, () => {
      //Error en la inicializacion
      console.log("Error en la inicializacion");
      let titulo : string = 'Proceso erróneo';
      let mensaje : string = 'No se ha podido inicializar el servicio de pago con Paypal. Por favor, inténtelo más tarde.';
      this.alertaProcesoDePago(titulo, mensaje);
    });
  }

  alertaProcesoDePago(titulo : string, mensaje : string) {
    console.log("Metodo alertaProcesoDePago()");
    let confirm = this.alertCtrl.create({
      title: titulo,
      message: mensaje,
      buttons: [
        {
          text: '¡Vale!',
          handler: () => {
            console.log('"¡Vale!" pulsado');
          }
        }
      ]
    });
    confirm.present();
  }

}
