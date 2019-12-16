import { Component, OnInit, Version } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { QuotepostService } from 'src/app/service/quotepost.service';

@Component({
  selector: 'app-jobdescedit',
  templateUrl: './jobdescedit.component.html',
  styleUrls: ['./jobdescedit.component.scss'],
})
export class JobdesceditComponent implements OnInit {
    
  constructor(public Modalcntrl : ModalController,private navParams : NavParams, private postservice : QuotepostService) { }
  Version:any;

  ngOnInit() { }

  ActionSaveJobDescEdit(Version:any) {debugger;
     this.postservice.ActionSaveDescription(this.Version).subscribe(data=> {
     this.ActionCloseJobDescEdit(true);
    })
  }

  ActionCloseJobDescEdit(issave) {
    let Version = {Description : this.Version.Description, PrivateNote : this.Version.PrivateNote}
    this.Modalcntrl.dismiss({
      'dismissed': true,
      componentProps:Version,
      issave:issave
    });
  }
}
