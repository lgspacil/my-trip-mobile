import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MyTripService } from '../../services/mytrip.service';
import { Storage } from '@ionic/storage';
import { ViewInfoPage } from '../view-info/view-info';
import { AddInfoPage } from '../add-info/add-info';





@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  //name of the trip on the map page, this name is pulled when the view loads depending on the trip_id cookie
  trip_name = "";

  //values
  markerName:string = '';
  markerLat:string = '';
  markerLng:string = '';

  //zoom level
  zoom: number = 15

  //Start Postion
  latitude: number;
  longitude: number;

  //your exact position when the map was loaded up
  mylatitude: number;
  mylongitude: number;

  //user info stored in the storage:
  name: string;
  user_id: string;
  trip_id: string;

  //load specific markers with this obj
  trip_user_obj = {
    trip_id: null
  }

  //in case you are looking at another trip we have to know their user_id if it matches to the user_id that logged in
  //to see if you have the ability to change features
  the_trips_user_id = null;

  //trip info that is being displayed
  display_obj ={
    money_count : 0,
    day_count: 0,
    trip_id: this.trip_id
  }

  //marker information:
  markers = [
  ]


  constructor(public navCtrl: NavController,
    public params: NavParams,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    private _httpService: MyTripService,
    private storage: Storage,
    public modalCtrl: ModalController) {
  }


  ionViewWillEnter(){

    this.getUserInfoStorage();
    this.loadCurrentLocation();
    this.presentLoading();
  }

  ionViewDidEnter(){
    // this.loadSpecificMarkers();
    this.getTripNameAndUserIdFromTripId()
  }

  loadCurrentLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude
      this.longitude = resp.coords.longitude

      this.mylatitude = resp.coords.latitude
      this.mylongitude = resp.coords.longitude

      console.log("the current location is: ", resp.coords);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  //will cause a loading screen to occur when you are loading the page
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  loadSpecificMarkers(){
    console.log("the trip user_obj is this: ", this.trip_user_obj);


    this._httpService.loadSpecificMarkers(this.trip_user_obj)

    .then((data) =>{
      console.log("Success loading markers got back this###########", data);

      this.markers = [];
      this.display_obj = {
        money_count : 0,
        day_count: 0,
        trip_id: this.trip_id
      }

      // console.log("entering the for loop");

      for(var i = 0; i < data._locations.length; i++){
        let newMarker = {'location_name': data._locations[i].location_name,
                             'latitude': data._locations[i].latitude,
                             'longitude': data._locations[i].longitude,
                             'username': data._locations[i].username,
                             'content': data._locations[i].content,
                             'price': data._locations[i].price,
                             '_id': data._locations[i]._id,
                             'images': data._locations[i].images,
                             'img_url': data._locations[i].img_url,
                             'day_number': data._locations[i].day_number,
                             '_user': data._locations[i]._user,
                             '_trip': data._locations[i]._trip,
                             'weather': data._locations[i].weather

        }
        this.markers.push(newMarker);

        if (data._locations[i].day_number > this.display_obj.day_count){
          this.display_obj.day_count = data._locations[i].day_number;
        }

        this.display_obj.money_count += data._locations[i].price;

      }
      // this.display_obj.trip_name = data.trip_name;

      //if no marker was placed start in the bay area else, start at the markers last placed position
      // if (this.markers.length == 0){
      //   this.latitude = 32.898504;
      //   this.longitude = -36.4194155;
      //   this.zoom =2;
      // }else{
        this.latitude = this.markers[this.markers.length -1].latitude;
        this.longitude = this.markers[this.markers.length -1].longitude;
      // }

      //add the updated informatino about the current days and money count to the DB:
      // console.log("about to enter updateTripInfo... in loadSpecificMarkers:");

      this._httpService.updateTripInfo(this.display_obj)
        .then((data) =>{
          // console.log("awesome this new feature worked")
        })
        .catch((err) =>{
           console.log("unable to update users money and day count")
      })
    })
    .catch((err) =>{
      console.log("failed loading markers");

    })
  }

  mapCLicked($event:any){

    if (this.user_id == this.the_trips_user_id){
      // console.log("a new marker was added when the screen was clicked: ", event);

      var newMarker = {
        location_name: '',
        latitude: $event.coords.lat,
        longitude: $event.coords.lng,
        username: this.name,
        _trip: this.trip_id,
        icon_url: '',
        content: '',
        price: 0,
        day_number: 0,
        trip_location: '',
        _user: this.user_id
      }

      // this.markers.push(newMarker);

      this._httpService.addLocationToDB(newMarker)
        .then((data) =>{
          if (data != null){
            this.markers.push(data);
            // console.log("pushed this location to the markers array: ", data)

            // moving the map to the location that was just added
            this.latitude = this.markers[this.markers.length -1].latitude;
            this.longitude = this.markers[this.markers.length -1].longitude;
          }
        })
        .catch((err) =>{
          console.log("unable to post location to the DB");
        })
    }

  }

  //will drop a marker on your current location
  dropMarkerCurrent(){
    console.log("current marker dropped");

    if (this.user_id == this.the_trips_user_id){
      // console.log("a new marker was added when the screen was clicked: ", event);

      var newMarker = {
        location_name: '',
        latitude: this.mylatitude,
        longitude: this.mylongitude,
        username: this.name,
        _trip: this.trip_id,
        icon_url: '',
        content: '',
        price: 0,
        day_number: 0,
        trip_location: '',
        _user: this.user_id
      }

      // this.markers.push(newMarker);

      this._httpService.addLocationToDB(newMarker)
        .then((data) =>{
          if (data != null){
            this.markers.push(data);
            // console.log("pushed this location to the markers array: ", data)

            // moving the map to the location that was just added
            this.latitude = this.markers[this.markers.length -1].latitude;
            this.longitude = this.markers[this.markers.length -1].longitude;
          }
        })
        .catch((err) =>{
          console.log("unable to post location to the DB");
        })
    }

  }

  // removing the marker
  removeMarker(marker){
    // console.log("removing marker.... at the id of: ", marker._id)
    this._httpService.removeMarker(marker)
      .then((data) =>{
        //if successful removal then I need to update the users location
        this._httpService.updateTripsLocations(marker)
          .then((data) =>{
            // console.log("I think this means that I was able to remove one of the locations after updating the locaions array, ", data)
            this.loadSpecificMarkers();
          })
          .catch((err) =>{
            console.log("Didnt work :( ");
          })
      })
      .catch((err) =>{
        console.log("unable to reload the locations");
      })

  }

  getUserInfoStorage() {
    //first
    this.storage.get('user_name')
      .then((data) => {
          // console.log("the user_name is: ", data)
          this.name = data;

          //second
          this.storage.get('user_id')
          .then((data) =>{
            // console.log("the user_id is: ", data)
            this.user_id = data;

            //third
            this.storage.get('trip_id')
              .then((data) =>{
                // console.log("the trip id is: ", data)

                this.trip_id = data;
                this.trip_user_obj.trip_id = data;
                this.loadSpecificMarkers();
              })
          })
          .catch((err) =>{
            console.log("unable to get the user_id from storage", err)
          })
      })
      .catch((err) =>{
        console.log("unable to get the user_name from storage ", err)
      })
  }

  getTripNameAndUserIdFromTripId(){
    // console.log("hey I am getting the trip name");

    this._httpService.getTripNameAndUserIdFromTripId(this.trip_id)

    .then((data) =>{
      // console.log("the trip name is: ", data.trip_name, "and the trips user_id is: ", data._user_id)
      this.trip_name = data.trip_name;
      this.the_trips_user_id = data._user_id;

    })
    .catch((err) =>{
      console.log("unable to get the trip name")
    })

  }

  load_view_info(marker_info){
    this.navCtrl.push(ViewInfoPage, {marker_info: marker_info});
  }

  load_add_info(marker_info){
    // this.navCtrl.push(AddInfoPage, {marker_info: marker_info});

    const profileModal = this.modalCtrl.create(AddInfoPage, { marker_info: marker_info });
    profileModal.present();

  }





}
