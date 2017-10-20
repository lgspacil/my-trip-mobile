import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyTripService } from '../../services/mytrip.service';

@Component({
  selector: 'page-add-info',
  templateUrl: 'add-info.html'
})
export class AddInfoPage {

  user_name = null;
  user_id = null;
  trip_id = null;

  updateMarker: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private _httpService: MyTripService,) {

    this.updateMarker = this.navParams.get('marker_info');

    this.storage.get('user_name').then((data) =>{this.user_name = data})
    this.storage.get('user_id').then((data) =>{this.user_id = data})
    this.storage.get('trip_id').then((data) =>{this.trip_id = data})
  }

  submitUpdatedChanges(){

    this._httpService.updateMarkerInfo(this.updateMarker)
      .then((data) =>{
        console.log("this is the updated info: ", data)
        this.navCtrl.pop();

      })
      .catch((err) =>{
        console.log("yeah.... that didnt work.....")
      })
  }

  cancel(){
    this.navCtrl.pop();
  }


}
