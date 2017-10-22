import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { ActionSheetController } from 'ionic-angular';
import { CreateTripPage } from '../create-trip/create-trip';
import { MyTripService } from '../../services/mytrip.service';
import { MapPage } from '../map/map';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selected_users_trips = [];

  user_id = '';

  new_trip_obj = {
    trip_name: "",
    _user_id: null,
    username: null
  }

  error = "";

  base64Image:any;

  constructor(public navCtrl: NavController,
    private _httpService: MyTripService,
    private storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public camera:Camera,) {

  }

  ngOnInit(){

  }

  ionViewWillEnter(){
    this.storage.get('user_id')
      .then((data) =>{
        this.user_id = data;
        this.loadTrips()
      })
  }

  loadTrips(){
    console.log("in the loading trips in component.ts", this.user_id);

    this._httpService.loadTrips(this.user_id)
    .then((data) =>{
      console.log("the users info must be: ", data)
      this.selected_users_trips = data;

    })
    .catch((err) =>{
      console.log("there was an error when loading trips...");

    })
  }

  goToCreateTrip(){
    this.navCtrl.push(CreateTripPage)
  }

  continueTrip(trip_id){
    console.log("the trip you selected has an id of: ", trip_id)
    this.storage.set('trip_id', trip_id);
    this.navCtrl.push(MapPage)
  }

  // removing the trip
  deleteTrip(trip_id){
    console.log("removing trip.... at the id of: ", trip_id)
    this._httpService.deleteTrip(trip_id)
      .then((data) =>{
        this.loadTrips();
      })
      .catch((err) =>{
        console.log("unable to delete the trip");
      })

  }


  presentActionSheet(trip_id) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Delete Trip',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.deleteTrip(trip_id);
          }
        },
        {
          text: 'Change Picture',
          role: 'picture change',
          handler: () => {
            console.log('changed picture', trip_id);
            this.accessGallery(trip_id);

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  accessGallery(trip_id) {

    let trip_info = {
      trip_id: trip_id,
      image: null
    }

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      trip_info.image = this.base64Image;

      this._httpService.update_trip_pic(trip_info)
        .then((data) =>{console.log("I think it worked!"), this.loadTrips();})
        .catch((err) =>{console.log("nope there was an error updating picture")})

    }, (err) => {
      // Handle error
    });

  }

}
