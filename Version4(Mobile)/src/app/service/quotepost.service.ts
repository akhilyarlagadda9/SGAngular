import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuotepostService {

  //url = "http://localhost:1758/"; 
  url = "http://64.251.30.12:50005/StoneApp.WebAPI/"
  constructor(private http: HttpClient) { }

  //Quote Save Function
  ActionSaveQuote(header: any): Observable<any> {
    var info = JSON.stringify(header);
    return this.http.post<any>(this.url + 'api/QuoteSave/ActionSaveQuote', info, { headers: { 'Content-Type': 'application/json' } })
  }
  //Job Description Save Function
  ActionSaveDescription(ver: any): Observable<any> {
    var version = JSON.stringify(ver);
    return this.http.post<any>(this.url + 'api/QSave/ActionSaveQuoteNotes', version, { headers: { 'Content-Type': 'application/json' } })
  }
  //PO Item Save Function
  ActionSavePoItem(item: any): Observable<any> {
    var model = JSON.stringify(item);
    return this.http.post<any>(this.url + 'api/QSave/ActionSavePoItem', model, { headers: { 'Content-Type': 'application/json' } })
  }

  /************************* Part Level Save Functions ***************************************/

  //Splash Save Function
  Actionsavepartsplash(item: any): Observable<any> {
    var model = JSON.stringify(item);
    return this.http.post<any>(this.url + 'api/QSave/ActionSavePartSplash', model, { headers: { 'Content-Type': 'application/json' } })
  }
  //Edge Save Function
  Actionsavepartedge(item: any): Observable<any> {
    var model = JSON.stringify(item);
    return this.http.post<any>(this.url + 'api/QSave/ActionSavePartSplash', model, { headers: { 'Content-Type': 'application/json' } })
  }
  //Cutout Save Function
  Actionsavepartcutout(item: any): Observable<any> {
    var model = JSON.stringify(item);
    return this.http.post<any>(this.url + 'api/QSave/ActionSavePartCutout', model, { headers: { 'Content-Type': 'application/json' } })
  }
  //Sink Save Function
  Actionsavepartsink(item: any): Observable<any> {
    var model = JSON.stringify(item);
    return this.http.post<any>(this.url + 'api/QSave/ActionSaveSink', model, { headers: { 'Content-Type': 'application/json' } })
  }
  //Faucet Save Function
  Actionsavefaucet(item: any): Observable<any> {
    var model = JSON.stringify(item);
    return this.http.post<any>(this.url + 'api/QSave/ActionSaveFaucet', model, { headers: { 'Content-Type': 'application/json' } })
  }
  //Labor Save Function
  Actionsavelabor(item: any): Observable<any> {
    var model = JSON.stringify(item);
    return this.http.post<any>(this.url + 'api/QSave/ActionSaveLabor', model, { headers: { 'Content-Type': 'application/json' } })
  }
  //Addon Save Function
  Actionsaveaddon(item: any): Observable<any> {
    var model = JSON.stringify(item);
    return this.http.post<any>(this.url + 'api/QSave/ActionSaveAddon', model, { headers: { 'Content-Type': 'application/json' } })
  }
  //Tile Save Function
  Actionsavetile(item: any): Observable<any> {
    var model = JSON.stringify(item);
    return this.http.post<any>(this.url + 'api/QSave/ActionSaveTile', model, { headers: { 'Content-Type': 'application/json' } })
  }



}
