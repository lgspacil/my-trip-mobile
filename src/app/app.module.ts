import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core';
import { MyTripService } from "../services/mytrip.service";
import { IonicStorageModule } from '@ionic/storage'
import { HttpModule } from '@angular/http';

import { CreateTripPage } from '../pages/create-trip/create-trip';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NewTripPage } from '../pages/new-trip/new-trip';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    CreateTripPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewTripPage,
    LoginPage
  ],
  imports: [
    HttpModule,
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9QqT__lEB5kzYAlfK6HpQEtgOAVijZyk'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CreateTripPage,
    ContactPage,
    HomePage,
    TabsPage,
    NewTripPage,
    LoginPage
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    MyTripService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
