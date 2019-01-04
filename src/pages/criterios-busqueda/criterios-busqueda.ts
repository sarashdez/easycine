import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CarteleraPage } from '../cartelera/cartelera';

import { FormBuilder, FormGroup } from "@angular/forms";
import * as moment from 'moment';


@Component({
  selector: 'page-criterios-busqueda',
  templateUrl: 'criterios-busqueda.html'
})
export class CriteriosBusquedaPage {

  public form: FormGroup;
  public date : any;

  //Datos formulario
  empresa : string;
  dia : string;
  hora : string;
  diaChecked : boolean;

  constructor(public navCtrl: NavController,
              private _FB : FormBuilder
  ) {
    this.form = this._FB.group({
      'empresa' : [''],
      'dia' : [''],
      'hora' : [''],
      'diaChecked' : false
    })
  };

  goToCartelera(){
    this.obtenerResultadosFormulario();
    console.log("Valores parametros goToCartelera()");
    console.log("Empresa: " + this.empresa);
    console.log("Dia: " + this.dia);
    console.log("Hora: " + this.hora);
    this.navCtrl.push(CarteleraPage, {
      empresa : this.empresa,
      dia : this.dia,
      hora : this.hora
    });
  }

  obtenerResultadosFormulario() {
    this.empresa = this.form.controls['empresa'].value;
    let diaSinFormato : string = this.form.controls['dia'].value;
    this.hora = this.form.controls['hora'].value;
    this.diaChecked = this.form.controls['diaChecked'].value;
    //Formatear fecha
    this.dia = moment(diaSinFormato).format("DD/MM/YYYY");

    console.log("Valores obtenidos del formulario");
    console.log("Empresa: " + this.empresa);
    console.log("Dia: " + diaSinFormato);
    console.log("Dia formateado: " + this.dia);
    console.log("Hora: " + this.hora);
    console.log("Resultado checkbox: "+this.diaChecked);

    //Gestion de resultados
    if(this.empresa==="Indiferente") {
      this.empresa = null;
    }
    if(this.diaChecked) {
      this.dia = null;
    }
    if(this.hora==="Indiferente") {
      this.hora = null;
    }
  }

}
