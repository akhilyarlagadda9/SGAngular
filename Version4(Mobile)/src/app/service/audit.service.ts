import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device/ngx';
import { Storage } from '@ionic/storage';
import { Audit } from '../Model/audit.model';
import { SchedulingService } from './scheduling.service';

declare var google;
@Injectable({ providedIn: 'root' })
export class AuditService {
  userName: string = "";
  constructor(private schService: SchedulingService, private device: Device, private storage: Storage) { }

  async modifyForAuditSave(objAudit: Audit) {
    if (objAudit.userName) {
      this.userName = objAudit.userName;
    }
    else {
      let value = await this.storage.get("UserInfo"); //Getting it from storage
      this.userName = value.loginUserName;
    }
    objAudit.deviceName = this.device.model;
    let auditModel = {};
    let Description = "<b>Device Name:</b>" + objAudit.deviceName + ", Request Start Time: " + objAudit.reqStartTime;
    Description += ", Request End Time: " + objAudit.reqEndTime + ", Total Duration: " + objAudit.reqDuration;
    auditModel["UpdatedBy"] = this.userName;
    auditModel["Decription"] = Description;
    auditModel["RefType"] = objAudit.location;
    auditModel["ViewType"] = objAudit.viewName;
    this.schService.ActionSaveAuditDetails(auditModel).subscribe(data => {
      console.log(data); //Expected data = 0 almost all the timne
    });
  }

  geocodeAddress(): Promise<string> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'location': pos }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            resolve(results[0].formatted_address);
          } else {
            reject("Could not acess current address due to " + status);
          }
        });
      });
    });
  };
}