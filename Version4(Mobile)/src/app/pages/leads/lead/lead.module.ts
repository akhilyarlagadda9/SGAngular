import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FullCalendarModule } from '@fullcalendar/angular';

import { LeadPageRoutingModule } from './lead-routing.module';

import { LeadPage } from './lead.page';
import { CreateleadComponent } from '../createlead/createlead.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullCalendarModule,
    LeadPageRoutingModule
  ],
  declarations: [LeadPage, CreateleadComponent],
  entryComponents: [CreateleadComponent]
})
export class LeadPageModule {}
