import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewTripPage } from '../new-trip/new-trip';


@Component({
  selector: 'page-create-trip',
  templateUrl: 'create-trip.html'
})
export class CreateTripPage {

  trip_name: any;

  constructor(public navCtrl: NavController) {

  }

  newTrip(){
    console.log("the trips name is: ", this.trip_name)
    this.navCtrl.push(NewTripPage, {trip_name: this.trip_name});
  }

}
