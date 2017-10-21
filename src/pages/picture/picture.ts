import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
@Component({
 selector: 'page-picture',
 templateUrl: 'picture.html'
})
export class PicturePage {
  base64Image:any;
  constructor(public camera:Camera) {}
 accessGallery(){
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
  }, (err) => {
   // Handle error
  });

  }
}





// this.camera.getPicture({
//   sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
//   destinationType: this.camera.DestinationType.DATA_URL
//  }).then((imageData) => {
//    this.base64Image = 'data:image/jpeg;base64,'+imageData;
//   }, (err) => {
//    console.log(err);
//  });
