import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { MyTripService } from '../../services/mytrip.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-create-trip',
  templateUrl: 'create-trip.html'
})
export class CreateTripPage {

  new_trip_obj = {
    trip_name: "",
    _user_id: null,
    username: null
  }

  error = "";

  constructor(public navCtrl: NavController,
    private _httpService: MyTripService,
    private storage: Storage,) {

  }

  ionViewWillEnter(){
    this.getStorageUser()
  }

  getStorageUser() {
    this.storage.get('user_name')
      .then((data) => {
          console.log("the user_name is: ", data)
          this.new_trip_obj.username = data;

          this.storage.get('user_id')
          .then((data) =>{
            console.log("the user_id is: ", data)
            this.new_trip_obj._user_id = data;
          })
          .catch((err) =>{
            console.log("unable to get the user_id from storage", err)
          })
      })
      .catch((err) =>{
        console.log("unable to get the user_name from storage ", err)
      })
  }

  addedNewTrip(){
    if(this.new_trip_obj.trip_name.length <= 2){
      this.error = "your trip name must be greater than 2 characters long"
    }else{
      this._httpService.addedNewTrip(this.new_trip_obj)

        .then((data) => {
          if(data == false){
            this.error = "you already have a trip in that name.."
          } else{
            console.log("this is a new trip()()()()()(): ", data)
            // this._cookieService.put('trip_id', data._id);
            this.storage.set('trip_id', data._id);

            // this._router.navigate(['/map']);
            //how to pass information to another page
            // this.navCtrl.push(NewTripPage, {trip_name: this.trip_name});
            this.navCtrl.push(MapPage);
          }
        })
        .catch((err) =>{
          console.log("got an error when adding a new trip");

        })
      }
  }


}
