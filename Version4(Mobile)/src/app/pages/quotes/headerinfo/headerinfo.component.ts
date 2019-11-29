import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/service/quote.service'
import { ModalController } from '@ionic/angular';
import { CustomereditComponent } from '../customeredit/customeredit.component'
@Component({
  selector: 'app-headerinfo',
  templateUrl: './headerinfo.component.html',
  styleUrls: ['./headerinfo.component.scss'],
})
export class HeaderinfoComponent implements OnInit  {
  constructor(private service: QuoteService,public Modalcntrl : ModalController) { }
  
  ngOnInit () { }
  async ActionEditCustomer() {
    const modal = await this.Modalcntrl.create({
      component: CustomereditComponent
    });
    return await modal.present();
  }
}
