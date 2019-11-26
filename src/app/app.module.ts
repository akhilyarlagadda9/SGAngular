import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QuotePageModule } from './quote/quote.module';
import { CreatequoteComponent } from './quote/createquote/createquote.component'
import { QuoteeditComponent } from './quote/quoteedit/quoteedit.component';
@NgModule({
  declarations: [
    AppComponent,
    CreatequoteComponent,
    QuoteeditComponent
  ],
  entryComponents: [CreatequoteComponent,QuoteeditComponent],
  imports: [BrowserModule, IonicModule.forRoot(),FormsModule, AppRoutingModule,QuotePageModule,HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
