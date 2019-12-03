import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuotepostService {

  url = "http://64.251.30.12:50005/StoneApp.WebAPI/"; 
  constructor(private http: HttpClient) { }
  
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
