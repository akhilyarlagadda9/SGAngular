import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
//import { Environment } from '@ionic-native/google-maps';
// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   Marker,
//   GoogleMapsAnimation,
//   MyLocation
// } from '@ionic-native/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  map: any;
  latitude = 35.1392357;
  longitude = -97.39475299999998;
  CompanyInfo :any;
   origin = {latitude: 37.3318456, longitude: -122.0296002};
 destination = {latitude: 35.1392357, longitude:-97.39475299999998};


  points = [
  {
    lat: this.latitude,
    lng: this.longitude
  },
  {
    lat: -33,
    lng: 773231
  }
];
  constructor(private authservise: AuthService, private platform: Platform) {
    this.initializeApp();
   }

   
  ngOnInit() {
   //this.getstorage();
   this.loadMap();
  }
  initializeApp() {
    this.platform.ready().then(() => {

      // Environment.setEnv({
      //   // api key for server
      //   'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDLkwxgLxSXDDXWgMss9nnIwBciWaZkPL8',
      // });
    });
  }

  loadMap() {

    var mapOption = {
        center: { lat: 23.2366, lng: 79.3822 },
        zoom: 7
      }
    //  this.map = GoogleMaps.create(document.getElementById("map"), mapOption);
    this.goToMyLocation();
  }
  goToMyLocation(){

    this.map.addPolyline({
      points: this.points,
      'color' : '#AA00FF',
      'width': 10,
      'geodesic': true
  });



  


     
  }


  // ionViewWillEnter(){
  //   this.authservise.GetStoredCompany().then((data) =>{
  //     this.CompanyInfo = data;
  //   })
  // }
}
