import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyTripService } from "../../services/mytrip.service";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  location = "san jose"
  user_obj = {
    username: "spacillucas",
    email: "spacillucas@yahoo.com",
    password: "1234",
    confirm_password: "1234",
    country: "usa"
  }
  constructor(public navCtrl: NavController, private _service: MyTripService) {

  }

  ngOnInit(){
    console.log("I am running")
  }

}
