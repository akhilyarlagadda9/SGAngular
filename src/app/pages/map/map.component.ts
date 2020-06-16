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
  CustLat:number=0;CustLan:number=0; arrData:Array<any>=[];
  constructor(private  Modalcntrl: ModalController,private authService: AuthService,private navParams: NavParams,private platform:Platform) { }
 arrInformation:any=[]; strCustFullAdd:string="";strHeadToShow:string=""; arrHead:Array<String>=[]; distance:any = 0;
objDataInfo = this.navParams.data;
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

    if(this.objDataInfo.MapCalled == "Quote"){
      this.strCustFullAdd=this.objDataInfo.headerInfo.Address1+","+this.objDataInfo.headerInfo.City+","+this.objDataInfo.headerInfo.State+",0"+this.objDataInfo.headerInfo.Zipcode;
      this.strHeadToShow = this.objDataInfo.headerInfo.QuoteNo+"-"+this.objDataInfo.headerInfo.QuoteName+"-"+this.strCustFullAdd;
      this.markerLine();
    }
    else if(this.objDataInfo.MapCalled == "Scheduling"){
      //this.scheduleMap();
      this.objDataInfo.headerInfo.forEach(data => {
        this.strCustFullAdd = data.extendedProps.Address+","+data.extendedProps.City+","+data.extendedProps.State+",0"+data.extendedProps.Zipcode;
        this.strHeadToShow = data.extendedProps.QuoteNo+"-"+data.extendedProps.QuoteName+ this.strCustFullAdd;
        this.arrData.push(this.strCustFullAdd);
        this.arrHead.push(this.strHeadToShow);
    });
    this.arrData = this.arrData.filter( function( item, index, inputArray ) {
      return inputArray.indexOf(item) == index;
    });
    this.arrHead = this.arrHead.filter( function( item, index, inputArray ) {
      return inputArray.indexOf(item) == index;
    });

    this.scheduleMap();
  }
}


ActionZoom(){
  this.map.setCameraZoom(4.3);
}

scheduleMap(){
  console.log(this.arrData);
  console.log(this.arrHead);
  //  let arrLocation=[];
  // let arrHead = [];
  // for(var i=0;i< this.arrData.length ;i++){
  //   let arrLocHead = this.arrData[i].split("~~");
  //   arrLocation.push(arrLocHead[0]);
  //   arrHead.push(arrLocHead[1]);
  // }
  this.authService.GetCompanyInfo().subscribe(data=>{
    Geocoder.geocode({
      address:this.arrData,
    }).then((mvcArray: BaseArrayClass<GeocoderResult[]>)=>{
      console.log(mvcArray);
      mvcArray.one('finish').then(() => {
      mvcArray.getArray().forEach((data,index:number)=>{
        console.log(data[0].position);
      for(var i=index;i<=index;i++){
        this.map.addMarker({
          'title':this.arrHead[i].bold(),
          'icon' : 'Red',
          'animation': 'BOUNCE',
          'position':data[0].position
        }).then((marker:Marker)=>{
            marker.showInfoWindow();
        });
      }
    });
   });
  });
});
}
markerLine(){
  var strfullAdd = "";
  this.authService.GetCompanyInfo().subscribe(data=>{
    console.log(data);
    strfullAdd = data.Name+"\r\n"+data.ShippingAddress+","+data.ShippingCity+","+data.State+",0"+data.ZipCode; // Company Address
   console.log(strfullAdd); // Customer Address
   console.log(this.strCustFullAdd);
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
    'title': strfullAdd.bold(),
    'icon' : 'Green',
    'animation': 'BOUNCE',
    'position':this.arrInformation[0]
  }).then((marker:Marker)=>{
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
    //let distanceService = new google.maps.DistanceMatrixService();
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
            var R = 6378137; // Earth’s mean radius in meter
            var dLat = (this.arrInformation[1].lat -this.arrInformation[0].lat)*Math.PI/180;
            var dLong = (this.arrInformation[1].lng - this.arrInformation[0].lng)*Math.PI/180;
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos((this.arrInformation[0].lat)*Math.PI/180) * Math.cos((this.arrInformation[1].lat)*Math.PI/180) *
              Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            this.distance = ((R * c)/1000).toFixed(2); // distance in km
            console.log(this.distance);
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
