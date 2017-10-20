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
import { AllTripsPage } from '../pages/all-trips/all-trips';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ViewInfoPage } from '../pages/view-info/view-info';
import { AddInfoPage } from '../pages/add-info/add-info';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    CreateTripPage,
    AllTripsPage,
    HomePage,
    TabsPage,
    MapPage,
    LoginPage,
    RegisterPage,
    ViewInfoPage,
    AddInfoPage
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
    AllTripsPage,
    HomePage,
    TabsPage,
    MapPage,
    LoginPage,
    RegisterPage,
    ViewInfoPage,
    AddInfoPage
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
