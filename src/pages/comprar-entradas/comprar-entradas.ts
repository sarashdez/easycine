import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ViewController} from 'ionic-angular';
import { FormBuilder, FormGroup } from "@angular/forms";
import {PayPal, PayPalConfiguration, PayPalPayment} from "@ionic-native/paypal";


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
      message: 'El total de tu compra es '+this.precioTotal+'€. El proceso de pago se realiza con Paypal, por lo que necesitas disponer de una cuenta en Paypal para poder completarlo. ¿Deseas continuar?',
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
        let payment = new PayPalPayment(this.precioTotal.toString(), 'EUR', 'Entradas cine', 'sale');
        this.paypal.renderSinglePaymentUI(payment).then(() => {
          //Pago hecho con exito
        }, () => {
          //Error en el pago
          console.log("Error en el pago");
        });
      }, () => {
        //Error en la configuracion
        console.log("Error en la configuracion");
      });
    }, () => {
      //Error en la inicializacion
      console.log("Error en la inicializacion");
    });
  }


/*
  goToPaypal(params){
    if (!params) params = {};
    this.calcularPrecioTotal();
    this.navCtrl.push(PaypalPage);
  }*/
}
