import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare const appUrl: any;
@Injectable({
  providedIn: 'root'
})
export class LeadService {
  url = appUrl;
  constructor(private http: HttpClient) { }

  // Get Follow-Up Calendar Activities
  LeadFollowUpActList(followupId, userId, custTypeId, salesRepID, actTypeId, startDate, endDate, search): Observable<any> {
    return this.http.get<any>(this.url + 'api/lead/LeadFollowUpActList?followupId=' + followupId + "&userId=" + userId + "&custTypeId=" + custTypeId + "&salesRepID=" + salesRepID + "&actTypeId=" + actTypeId + "&startDate=" + startDate + "&endDate=" + endDate + "&search=" + search)
  }


}
