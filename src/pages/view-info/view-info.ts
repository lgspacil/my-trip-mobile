import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-view-info',
  templateUrl: 'view-info.html'
})
export class ViewInfoPage {

  displayMarkerInfo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.displayMarkerInfo = this.navParams.get('marker_info');
  }

  ionViewWillEnter(){
    console.log(this.displayMarkerInfo)
  }

  back(){
    this.navCtrl.pop()
  }

}
