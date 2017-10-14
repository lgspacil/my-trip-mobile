import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

// import { Place } from '../model/place.model';

@Injectable()
export class MyTripService {
  // private places: Place[] = [];

  constructor (private storage: Storage) {}



  deletePlaces(){
    this.storage.remove('places').then((data) =>{
      return (true)
    })

  }
}
