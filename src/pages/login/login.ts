import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user_obj = {
    email: '',
    password: '',
  }

  error = '';

  constructor(public navCtrl: NavController) {}

}
