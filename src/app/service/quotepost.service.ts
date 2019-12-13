import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuotepostService {

  url = "http://localhost:1758/"; 
  constructor(private http: HttpClient) { }
  
  ActionSaveQuote(header :any): Observable<any> {
    var info = JSON.stringify(header);
    return this.http.post<any>(this.url + 'api/QuoteSave/ActionSaveQuote', info, { headers: { 'Content-Type': 'application/json' } })
   }

  //Save Quote Post function
 
  
//   function qpactionsavequote(model) {
//     let val = "";
//     $.ajax({
//         type: "post",
//         url: serviceBase + 'api/QuoteSave/ActionSaveQuote',
//         contentType: "application/json;charset=utf-8",
//         data: JSON.stringify(model),
//         dataType: "json",
//         async: false,
//         success: function (data) { val = data; },
//         error: function () {
//         }
//     });
//     return val;
// }


}
