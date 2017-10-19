import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyTripService } from "../../services/mytrip.service";
import { RegisterPage } from '../register/register';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';

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

  //checking if user_name and user_id are there
  has_user_name = '';
  has_user_id = '';

  constructor(public navCtrl: NavController, private _httpService: MyTripService, private storage: Storage) {}


  userLogin(){
    console.log("user clicked me to login")
    this._httpService.userLogin(this.user_obj)

    .then((data)=>{
      console.log("data in the login.ts we got back is: ", data)
      if (data == null){
        this.error = "You have to register if this is your first time here"
      }
      else{
        if(this.user_obj.password == data.password){
            console.log("success for logging in! now will add info to internal storage", data);
            // this._cookieService.put('user_name', data.username);
            // this._cookieService.put('user_id', data._id);
            // this._cookieService.put('country_code', data.country)
            this.storage.set('user_name', data.username);
            this.storage.set('user_id', data._id);


            //after they put all their info it should be cleared incase they come back to the login page
            this.user_obj.email = '';
            this.user_obj.password = '';

            // this._router.navigate(['/create_continue']);
            this.navCtrl.push(TabsPage);
        }else{
          this.error = "Wrong Password!"
        }
      }
    })
    .catch((err) =>{
      console.log("got an error when trying to login");

    })

  }

  ionViewWillEnter(){
    this.getStorageUser();
  }

  //this function will run at the beginning and check if there is both a user_name and user_id
  //if there are both then it will automatically redirect you to the home page
  getStorageUser() {
    this.storage.get('user_name')
      .then((data) => {
          console.log("the user_name is: ", data)
          this.has_user_name = data;

          this.storage.get('user_id')
          .then((data) =>{
            console.log("the user_id is: ", data)
            this.has_user_id = data;
            this.callback();
          })
          .catch((err) =>{
            console.log("unable to get the user_id from storage", err)
          })
      })
      .catch((err) =>{
        console.log("unable to get the user_name from storage ", err)
      })
  }

  callback(){
    if(this.has_user_id != null && this.has_user_name != null){
      console.log("the user has logged in before and not logged out, route them to main page")
      this.navCtrl.push(TabsPage);
    }else{
      console.log("the user has not logged in so do not route them")
    }
  }

  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }

}
