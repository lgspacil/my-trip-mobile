import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CreateTripPage } from '../create-trip/create-trip';
import { AllTripsPage } from '../all-trips/all-trips';
import { HomePage } from '../home/home';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CreateTripPage;
  tab3Root = AllTripsPage;

  constructor(private storage: Storage, public navCtrl: NavController) {

  }

  logoutClick(){
    console.log("logging out")

    this.storage.remove('user_name').then((data) =>{
      this.storage.remove('user_id').then((data) =>{
        console.log("was able to remove the storage info on logout")

        //now I want to go back to the rootpage
        this.navCtrl.popToRoot()
      })
    })

  }
}
