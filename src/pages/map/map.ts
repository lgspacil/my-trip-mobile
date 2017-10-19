import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  trip_name: any;
  lat: number;
  lng: number;
  zoom = 15;

  //marker information:
  markers = [
  ]


  constructor(public navCtrl: NavController,
    public params: NavParams,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController) {
    // this.trip_name = this.params.get('trip_name');
  }


  ionViewWillEnter(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude
      this.lng = resp.coords.longitude

      console.log("the current location is: ", resp.coords);
     }).catch((error) => {
       console.log('Error getting location', error);
     });

     this.presentLoading();
  }

  //will cause a loading screen to occur when you are loading the page
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  mapCLicked($event){
    console.log("the map was clicked so marker dropped", $event)

    var newMarker = {
      location_name: '',
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      icon_url: '',
      content: '',
      price: 0,
      day_number: 0,
      trip_location: '',
    }

    this.markers.push(newMarker);
  }

  //will drop a marker on your current location
  dropMarkerCurrent(){
    console.log("current marker dropped");

    var newMarker = {
      location_name: '',
      latitude: this.lat,
      longitude: this.lng,
      icon_url: '',
      content: '',
      price: 0,
      day_number: 0,
      trip_location: '',
    }

    this.markers.push(newMarker);

  }

  removeMarker(marker){
    console.log("removing the marker:", marker)

    console.log(this.markers);
  }






}
