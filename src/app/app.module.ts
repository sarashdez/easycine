import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { CriteriosBusquedaPage } from '../pages/criterios-busqueda/criterios-busqueda';
import { EligeTuCinePage } from '../pages/elige-tu-cine/elige-tu-cine';
import { CarteleraPage } from '../pages/cartelera/cartelera';
import { DetallePage } from '../pages/detalle/detalle';
import { ProximosEstrenosPage } from '../pages/proximos-estrenos/proximos-estrenos';
import { MisEntradasPage } from '../pages/mis-entradas/mis-entradas';
import { ComprarEntradasPage } from '../pages/comprar-entradas/comprar-entradas';
import { MiPerfilPage } from '../pages/mi-perfil/mi-perfil';
import { LoginPage } from '../pages/login/login';
import { CrearCuentaPage } from '../pages/crear-cuenta/crear-cuenta';
import { TrailerPage } from '../pages/trailer/trailer';
import { PaypalPage } from '../pages/paypal/paypal';



//import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { DatePicker } from "@ionic-native/date-picker";
//import {NativePageTransitions} from "@ionic-native/native-page-transitions";
/*
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Transfer } from '@ionic-native/file-transfer';*/
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { environment } from "../environments/environment";

import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AutenticacionProvider } from "../providers/autenticacion/autenticacion";
import {AngularFireStorageModule} from "angularfire2/storage";
import {StorageProvider} from "../providers/storage/storage";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CriteriosBusquedaPage,
    EligeTuCinePage,
    CarteleraPage,
    DetallePage,
    ProximosEstrenosPage,
    MisEntradasPage,
    ComprarEntradasPage,
    MiPerfilPage,
    LoginPage,
    CrearCuentaPage,
    TrailerPage,
    PaypalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CriteriosBusquedaPage,
    EligeTuCinePage,
    CarteleraPage,
    DetallePage,
    ProximosEstrenosPage,
    MisEntradasPage,
    ComprarEntradasPage,
    MiPerfilPage,
    LoginPage,
    CrearCuentaPage,
    TrailerPage,
    PaypalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    ImagePicker,
    AutenticacionProvider,
    StorageProvider
  ]
})
export class AppModule {}
