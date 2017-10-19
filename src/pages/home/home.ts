import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { MyTripService } from "../../services/mytrip.service";
// import { Storage } from '@ionic/storage';
import { ActionSheetController } from 'ionic-angular';
import { CreateTripPage } from '../create-trip/create-trip';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selected_users_trips = [];

  new_trip_obj = {
    trip_name: "",
    _user_id: null,
    username: null
  }

  error = "";

  constructor(public navCtrl: NavController,
    // private _httpService: MyTripService,
    // private storage: Storage,
    public actionSheetCtrl: ActionSheetController) {

  }

  ngOnInit(){

  }

  goToCreateTrip(){
    this.navCtrl.push(CreateTripPage)
  }


  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
