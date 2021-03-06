import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CriteriosBusquedaPage } from '../pages/criterios-busqueda/criterios-busqueda';
import { CarteleraPage } from '../pages/cartelera/cartelera';
import { DetallePage } from '../pages/detalle/detalle';
import { ProximosEstrenosPage } from '../pages/proximos-estrenos/proximos-estrenos';
import { MisEntradasPage } from '../pages/mis-entradas/mis-entradas';
import { ComprarEntradasPage } from '../pages/comprar-entradas/comprar-entradas';
import { MiPerfilPage } from '../pages/mi-perfil/mi-perfil';
import { LoginPage } from '../pages/login/login';
import { CrearCuentaPage } from '../pages/crear-cuenta/crear-cuenta';
import { DatePicker } from "@ionic-native/date-picker";
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AutenticacionProvider } from "../providers/autenticacion/autenticacion";
import { AngularFireStorageModule } from "angularfire2/storage";
import { StorageProvider } from "../providers/storage/storage";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player";
import { PayPal } from "@ionic-native/paypal";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CriteriosBusquedaPage,
    CarteleraPage,
    DetallePage,
    ProximosEstrenosPage,
    MisEntradasPage,
    ComprarEntradasPage,
    MiPerfilPage,
    LoginPage,
    CrearCuentaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CriteriosBusquedaPage,
    CarteleraPage,
    DetallePage,
    ProximosEstrenosPage,
    MisEntradasPage,
    ComprarEntradasPage,
    MiPerfilPage,
    LoginPage,
    CrearCuentaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    ImagePicker,
    AutenticacionProvider,
    StorageProvider,
    YoutubeVideoPlayer,
    PayPal
  ]
})
export class AppModule {}
