import { NgModule,Directive, ElementRef, HostBinding, HostListener } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {IonicStorageModule } from '@ionic/storage';
import { AppComponent, DropdownDirective } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QuotePageModule } from './pages/quotes/quote/quote.module';
import { SchedulingPageModule } from './pages/project/scheduling/scheduling.module';
import { Device } from '@ionic-native/device/ngx';
//import { AgmCoreModule } from '@agm/core';
//import { GoogleMaps} from '@ionic-native/google-maps/ngx';
//import { Storage } from '@ionic/storage';
declare var urlss;
//import {Camera} from '@ionic-native/file'
@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),FormsModule, AppRoutingModule,QuotePageModule,HttpClientModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDLkwxgLxSXDDXWgMss9nnIwBciWaZkPL8' // apiKey is required 
    // }),
    IonicStorageModule.forRoot(),ReactiveFormsModule,SchedulingPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    //GoogleMaps,
    { provide: RouteReuseStrategy,useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
