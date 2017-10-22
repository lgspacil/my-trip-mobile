import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs';


@Injectable()
export class MyTripService {

  constructor (private storage: Storage, private _http: Http) {}

  deletePlaces(){
    this.storage.remove('places').then((data) =>{
      return (true)
    })
  }



  registerUser(user_obj){
    return this._http.post("http://10.0.0.31:8000/add_user", user_obj).map(data => data.json()).toPromise()
   }

   userLogin(user_obj){
     return this._http.post("http://10.0.0.31:8000/log_in", user_obj).map(data => data.json()).toPromise()
   }

   loadTrips(user_id){
     return this._http.post('http://10.0.0.31:8000/load_trips', {user_id: user_id}).map(data => data.json()).toPromise()
   }

   addedNewTrip(new_trip_obj){
     return this._http.post("http://10.0.0.31:8000/adding_new_trip", new_trip_obj).map(data => data.json()).toPromise()
   }

   addLocationToDB(newMarker){
     return this._http.post("http://10.0.0.31:8000/add_newMarker", newMarker).map(data => data.json()).toPromise()
   }

   loadSpecificMarkers(obj){
     return this._http.post("http://10.0.0.31:8000/load_specific_markers", obj).map(data => data.json()).toPromise()
   }

   updateTripInfo(obj){
     console.log("updating the trip info: ", obj)
     return this._http.post("http://10.0.0.31:8000/update_trip_info", obj).map(data => data.json()).toPromise()
   }

   removeMarker(marker){
     return this._http.post("http://10.0.0.31:8000/remove_marker", marker).map(data =>data.json()).toPromise()
   }

   updateTripsLocations(marker){
     return this._http.post("http://10.0.0.31:8000/update_trip_locations", marker).map(data =>data.json()).toPromise()
   }

   getLocationName(location){
     return this._http.get("https://maps.googleapis.com/maps/api/geocode/json?&address="+location).map(data => data.json()).toPromise()
   }

   getTripNameAndUserIdFromTripId(trip_id){
     return this._http.post("http://10.0.0.31:8000/getTripNameAndUserId", {trip_id: trip_id}).map(data => data.json()).toPromise()
   }

   updateMarkerInfo(info_obj){
     return this._http.post("http://10.0.0.31:8000/update_marker", info_obj).map(data =>data.json()).toPromise()
   }

   loadAllTrips(){
     return this._http.get("http://10.0.0.31:8000/loadAllTrips").map(data =>data.json()).toPromise()
   }

   getWeather(location){
     return this._http.get("http://api.openweathermap.org/data/2.5/weather?q="+location+"&units=imperial&APPID=bb928725dc4b57216334e06c6fbafa99").map(data => data.json()).toPromise()
   }

   loadAllUsers(){
     return this._http.get("http://10.0.0.31:8000/loadAllUsers").map(data =>data.json()).toPromise()
   }

   messageSent(yourFriendsObj){
     console.log("hello, in the messageSent service", yourFriendsObj)
     return this._http.post("http://10.0.0.31:8000/messageSent", yourFriendsObj).map(data =>data.json()).toPromise()
   }

   loadYourUserInfo(your_id){
     return this._http.post("http://10.0.0.31:8000/load_your_inbox", {your_id: your_id}).map(data =>data.json()).toPromise()
   }

    loadYourFriendsInfo(your_friends_id){
     return this._http.post("http://10.0.0.31:8000/load_your_friends_inbox", {your_friends_id: your_friends_id}).map(data =>data.json()).toPromise()
   }

   deleteTrip(trip_id){
     // console.log("the trips is: ", trip_id)
     return this._http.post("http://10.0.0.31:8000/delete_Trip", {trip_id: trip_id}).map(data =>data.json()).toPromise()
   }

   filterTrips(filter_obj){
     return this._http.post("http://10.0.0.31:8000/filter_trips", filter_obj).map(data =>data.json()).toPromise()
   }

   update_trip_pic(trip_info){
     console.log("in the service with trip info", trip_info)
     return this._http.post("http://10.0.0.31:8000/update_trip_pic", trip_info).map(data =>data.json()).toPromise()
   }

}
