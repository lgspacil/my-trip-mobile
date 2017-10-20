import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { ActionSheetController } from 'ionic-angular';
import { CreateTripPage } from '../create-trip/create-trip';
import { MyTripService } from '../../services/mytrip.service';
import { MapPage } from '../map/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selected_users_trips = [];

  user_id = '';

  new_trip_obj = {
    trip_name: "",
    _user_id: null,
    username: null
  }

  error = "";

  constructor(public navCtrl: NavController,
    private _httpService: MyTripService,
    private storage: Storage,
    public actionSheetCtrl: ActionSheetController) {

  }

  ngOnInit(){

  }

  ionViewWillEnter(){
    this.storage.get('user_id')
      .then((data) =>{
        this.user_id = data;
        this.loadTrips()
      })
  }

  loadTrips(){
    console.log("in the loading trips in component.ts", this.user_id);

    this._httpService.loadTrips(this.user_id)
    .then((data) =>{
      console.log("the users info must be: ", data)
      this.selected_users_trips = data;

    })
    .catch((err) =>{
      console.log("there was an error when loading trips...");

    })
  }

  goToCreateTrip(){
    this.navCtrl.push(CreateTripPage)
  }

  continueTrip(trip_id){
    console.log("the trip you selected has an id of: ", trip_id)
    this.storage.set('trip_id', trip_id);
    this.navCtrl.push(MapPage)
  }

  // removing the trip
  deleteTrip(trip_id){
    console.log("removing trip.... at the id of: ", trip_id)
    this._httpService.deleteTrip(trip_id)
      .then((data) =>{
        this.loadTrips();
      })
      .catch((err) =>{
        console.log("unable to delete the trip");
      })

  }


  presentActionSheet(trip_id) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.deleteTrip(trip_id);
          }
        },
        {
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
