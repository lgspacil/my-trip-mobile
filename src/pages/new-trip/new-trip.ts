import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-new-trip',
  templateUrl: 'new-trip.html'
})
export class NewTripPage {

  trip_name: any;

  constructor(public navCtrl: NavController, public params: NavParams) {
    this.trip_name = this.params.get('trip_name');
  }

}
