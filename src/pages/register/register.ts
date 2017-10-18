import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { MyTripService } from '../../services/mytrip.service';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  user_obj = {
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  }

  errors = "";

  constructor(public navCtrl: NavController, private _httpService: MyTripService, private storage: Storage) {

  }

  registerUser(){
    this._httpService.registerUser(this.user_obj)

    .then((data) =>{
      console.log("back in the register.ts with the data: ", data)
      if(data==false){
        this.errors = "you already registered with this email";
      }
      else{
        console.log("success posted to the DB: now adding to the internal storage");
        // this._cookieService.put('user_name', data.username);
        // this._cookieService.put('user_id', data._id);
        // this._cookieService.put('country_code', data.country)
        this.storage.set('user_name', data.username);
        this.storage.set('user_id', data._id);

        // this._router.navigate(['/create_continue']);
        this.navCtrl.push(TabsPage);
      }
    })
    .catch((err) =>{
      console.log("in the register.ts but had an error")
    })
  }

  goToLogin(){
    this.navCtrl.push(LoginPage)
  }

}
