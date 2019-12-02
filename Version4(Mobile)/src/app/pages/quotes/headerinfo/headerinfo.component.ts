import { Component,Input } from '@angular/core';
import { QuoteService } from 'src/app/service/quote.service'
import { ModalController } from '@ionic/angular';
import { CustomereditComponent } from '../customeredit/customeredit.component'
@Component({
  selector: 'app-headerinfo',
  templateUrl: './headerinfo.component.html',
  styleUrls: ['./headerinfo.component.scss'],
})
export class HeaderinfoComponent  {

  @Input() header: any;
  constructor(private service: QuoteService,public Modalcntrl : ModalController) { }



  async ActionEditCustomer() {
    const modal = await this.Modalcntrl.create({
      component: CustomereditComponent
    });
    return await modal.present();
  }
}
