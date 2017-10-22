import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyTripService } from '../../services/mytrip.service';
import { Storage } from '@ionic/storage';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-all-trips',
  templateUrl: 'all-trips.html'
})
export class AllTripsPage {

  users_trips = null;

  errors = ''

  filter_obj = {
    trip_length: '',
    trip_price: ''
  }

  constructor(public navCtrl: NavController,
    private _httpService: MyTripService,
    private storage: Storage,) {

  }

  ionViewWillEnter(){
    this.loadAllTrips()
  }

  loadAllTrips(){
    this._httpService.loadAllTrips()

    .then((data) =>{
      console.log("loading all the trips: this is what I got back", data);
      this.users_trips = data;

    })
    .catch((err) =>{
      console.log("error unable to load all the tripps");

    })
  }

  checkOutUsersTrip(trip_id){
    console.log("you selected a trip id of: ", trip_id);

    this.storage.set('trip_id', trip_id);

    this.navCtrl.push(MapPage);
  }

  filterTrips(){
    if(this.filter_obj.trip_length == '' || this.filter_obj.trip_price == ''){
      this.errors = "You must have both parameters filled out"
    }
    else{
      this._httpService.filterTrips(this.filter_obj)

      .then((data) =>{
        console.log("got back this info ", data);
        this.users_trips = data;
        this.filter_obj.trip_length = '';
        this.filter_obj.trip_price = '';
        this.errors = '';
      })
      .catch((err) =>{console.log("error getting filtered items");
      })
    }

  }

}
