import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare const appUrl: any;
@Injectable({
  providedIn: 'root'
})
export class QuotepostService {

  url = appUrl;
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
  //Quote Contacts Save Function
  ActionSaveJobQuoteContact(qcon: any): Observable<any> {
    var info = JSON.stringify(qcon);
    return this.http.post<any>(this.url + 'api/Quote/SaveJobQuoteContacts', info, { headers: { 'Content-Type': 'application/json' } })
  }

  /************************* Item Level Save Functions ***************************************/

  //Material Save Function
  ActionSavePartMaterial(material: any,areaId:any): Observable<any> {
     var parameter = JSON.stringify(material);
     return this.http.post<any>(this.url + 'api/QSave/ActionSaveMaterial?areaId=' + areaId, parameter,{ headers: { 'Content-Type': 'application/json' } })
   }
   //Sizes Save Function
   ActionSaveSizes(sobj: any): Observable<any> {
    var parameter = JSON.stringify(sobj.SlabList);
    return this.http.post<any>(this.url + 'api/QSave/ActionSaveSizes?verId=' + sobj.selectedpart.VersionID + '&areaId=' + sobj.selectedpart.AreaID + '&partId=' + sobj.selectedpart.ID + '&deliveryfee=' + sobj.deliveryFee + '&matId=' + sobj.materialId, parameter,{ headers: { 'Content-Type': 'application/json' } })
  }
  
  //Splash Save Function
  Actionsavepartsplash(item: any): Observable<any> {
    var model = JSON.stringify(item);
    return this.http.post<any>(this.url + 'api/QSave/ActionSavePartSplash', model, { headers: { 'Content-Type': 'application/json' } })
  }
  //Edge Save Function
  ActionsavepartEdge(item: any): Observable<any> {
    var model = JSON.stringify(item);
    return this.http.post<any>(this.url + 'api/QSave/ActionsavepartEdge', model, { headers: { 'Content-Type': 'application/json' } })
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
  Actionsavepartfaucet(item: any): Observable<any> {
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
  Actionsaveparttile(item: any): Observable<any> {
    var model = JSON.stringify(item);
    return this.http.post<any>(this.url + 'api/QSave/ActionSaveTile', model, { headers: { 'Content-Type': 'application/json' } })
  }
  //Customer Items Function
  Actionsavepartcustitem(item: any): Observable<any> {
    var model = JSON.stringify(item);
    return this.http.post<any>(this.url + 'api/QSave/ActionSaveCustResponse', model, { headers: { 'Content-Type': 'application/json' } })
  }

}
