import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyTripService } from '../../services/mytrip.service';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-add-info',
  templateUrl: 'add-info.html'
})
export class AddInfoPage {

  user_name = null;
  user_id = null;
  trip_id = null;

  updateMarker: any;
  base64Image:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private _httpService: MyTripService,
    public camera:Camera, ) {

    this.updateMarker = this.navParams.get('marker_info');

    this.storage.get('user_name').then((data) => { this.user_name = data })
    this.storage.get('user_id').then((data) => { this.user_id = data })
    this.storage.get('trip_id').then((data) => { this.trip_id = data })
  }

  submitUpdatedChanges() {
    console.log("this is the updateMarker info: ", this.updateMarker)
    this._httpService.updateMarkerInfo(this.updateMarker)
      .then((data) => {
        console.log("this is the updated info: ", data)
        this.navCtrl.pop();

      })
      .catch((err) => {
        console.log("yeah.... that didnt work.....")
      })
  }

  cancel() {
    this.navCtrl.pop();
  }

  accessGallery() {
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
      this.updateMarker.images[0] = this.base64Image;
    }, (err) => {
      // Handle error
    });

  }


}
