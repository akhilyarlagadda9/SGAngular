import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Platform, ModalController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { Environment, Geocoder, GeocoderResult, BaseArrayClass, ILatLng, LatLngBounds, Encoding, Polyline, Spherical} from '@ionic-native/google-maps';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';
declare var google;
declare var plugin;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit  {
  map: GoogleMap;
  OCLat:number=0;OCLan:number=0;
  CustLat:number=0;CustLan:number=0;
  constructor(private  Modalcntrl: ModalController,private authService: AuthService,private navParams: NavParams,private platform:Platform) { }
  arrInformation:any=[];
 strCustFullAdd=this.navParams.data.headerInfo.Address1+","+this.navParams.data.headerInfo.City+","+this.navParams.data.headerInfo.State+","+this.navParams.data.headerInfo.Zipcode;
 strHeadToShow = this.navParams.data.headerInfo.QuoteNo+"-"+this.navParams.data.headerInfo.QuoteName+"-"+this.strCustFullAdd;
 ngOnInit() {
  this.loadMap();
}

  loadMap() {
    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDLkwxgLxSXDDXWgMss9nnIwBciWaZkPL8',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDLkwxgLxSXDDXWgMss9nnIwBciWaZkPL8'
    });
    this.map = GoogleMaps.create('map_canvas');
    this.markerLine();
  }

markerLine(){
  var strfullAdd = "";
  this.authService.GetCompanyInfo().subscribe(data=>{
    console.log(data);
    strfullAdd = data.ShippingAddress+","+data.ShippingCity+","+data.State+","+data.ZipCode;
   console.log(strfullAdd);
  Geocoder.geocode({
    address:  [
      strfullAdd,
      this.strCustFullAdd
    ],
  }).then((mvcArray: BaseArrayClass<GeocoderResult[]>)=>{
    console.log(mvcArray);
    mvcArray.one('finish').then(() => {
     mvcArray.getArray().forEach(data=>{
       console.log(data[0].position);
       this.arrInformation.push(data[0].position);
   });
   console.log(this.arrInformation[0]);
   this.map.addMarker({
    'title':'SG',
    'icon' : 'Green',
    'animation': 'BOUNCE',
    'position':this.arrInformation[0]
  }).then((marker:Marker)=>{
    // this.map.animateCamera({
    //   target: this.arrInformation[0],
    //   tilt: 60,
    //   bearing: 140,
    //   duration: 5000
    // });
    marker.showInfoWindow();
  });
  
  this.map.addMarker({
    'title':this.strHeadToShow.bold(),
    'icon' : 'blue',
    'animation': 'BOUNCE',
    'position': this.arrInformation[1]
  }).then((marker:Marker)=>{
    marker.showInfoWindow();
    });
    let path: ILatLng[] = [this.arrInformation[0],this.arrInformation[1]];
    console.log(path);
    let latLngBounds = new LatLngBounds(path);
    this.map.moveCamera({
    'target': latLngBounds,
    });
    let directionsService = new google.maps.DirectionsService;

    directionsService.route({
        origin: this.arrInformation[0],
        destination: this.arrInformation[1],
        travelMode: google.maps.TravelMode['DRIVING']
    }, (res, status) => {
        if(status == google.maps.DirectionsStatus.OK){
            var points = plugin.google.maps.geometry.encoding.decodePath(res.routes[0].overview_polyline);
            console.log(points);
            this.map.addPolyline({
                points:points,
                'color':'#3342FF',
                width:4,
                geodesic:false
            });
        } else {
            console.warn(status);
        }
      });
    });
 });
 });

}

//Close Map
    ActionCloseMap(issave) {
      this.Modalcntrl.dismiss({
        'dismissed': true,
        issave: issave
      });
    }


}
