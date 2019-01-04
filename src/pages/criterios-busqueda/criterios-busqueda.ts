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

  form: FormGroup;
  date : any;

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

  /**
   * Navegacion a la pantalla Cartelera.
   */
  goToCartelera(){
    this.obtenerResultadosFormulario();
    this.navCtrl.push(CarteleraPage, {
      empresa : this.empresa,
      dia : this.dia,
      hora : this.hora
    });
  }

  /**
   * Se obtienen los valores seleccionados por el usuario en el formulario.
   */
  obtenerResultadosFormulario() {
    this.empresa = this.form.controls['empresa'].value;
    let diaSinFormato : string = this.form.controls['dia'].value;
    this.hora = this.form.controls['hora'].value;
    this.diaChecked = this.form.controls['diaChecked'].value;
    //Formatear fecha
    this.dia = moment(diaSinFormato).format("DD/MM/YYYY");

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
