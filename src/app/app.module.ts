import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    IonicModule.forRoot(MyApp)
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}