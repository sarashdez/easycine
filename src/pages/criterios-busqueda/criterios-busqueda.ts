import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CarteleraPage } from '../cartelera/cartelera';
import { FormBuilder, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import {EligeTuCinePage} from "../elige-tu-cine/elige-tu-cine";

@Component({
  selector: 'page-criterios-busqueda',
  templateUrl: 'criterios-busqueda.html'
})
export class CriteriosBusquedaPage {

  public form: FormGroup;
  public date : any;

  constructor(public navCtrl: NavController,
              private _FB : FormBuilder,
  ) {
    this.form = this._FB.group({
      'empresa' : [''],
      'dia' : [''],
      'hora' : [''],
      'cercania' : ['']
    })
  };

  goToCartelera(){
    let empresa: string = this.form.controls['empresa'].value;
    let dia: string = this.form.controls['dia'].value;
    let hora: string = this.form.controls['hora'].value;
    let cercania : string = this.form.controls['cercania'].value;

    //Formatear fecha
    let diaFormateado = moment(dia).format("DD/MM/YYYY");


    console.log("Valores obtenidos del formulario");
    console.log("Empresa: " + empresa);
    console.log("Dia: " + dia);
    console.log("Dia formateado: " + diaFormateado);
    console.log("Hora: " + hora);
    console.log("Cercania: " + cercania);

    this.navCtrl.push(CarteleraPage, {
      empresa : empresa,
      dia : diaFormateado,
      hora : hora,
      cercania : cercania
    });
  }

  goToEligeTuCine() {
    this.navCtrl.push(EligeTuCinePage);
  }





}
