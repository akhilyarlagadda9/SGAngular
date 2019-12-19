import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuotepostService {

  url = "http://localhost:1758/"; 
  //url = "http://64.251.30.12:50005/StoneApp.WebAPI/"
  constructor(private http: HttpClient) { }
  
  ActionSaveQuote(header :any): Observable<any> {
    var info = JSON.stringify(header);
    return this.http.post<any>(this.url + 'api/QuoteSave/ActionSaveQuote', info, { headers: { 'Content-Type': 'application/json' } })
   }

  ActionSaveDescription(ver:any):Observable<any> {
    var version = JSON.stringify(ver);
    return this.http.post<any>(this.url + 'api/QSave/ActionSaveQuoteNotes' , version , { headers: { 'Content-Type': 'application/json' } })
  }
  ActionSavePoItem(item:any):Observable<any> {
    var model = JSON.stringify(item);
    return this.http.post<any>(this.url + 'api/QSave/ActionSavePoItem' , model , { headers: { 'Content-Type': 'application/json' } })
  }

}
