import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FullCalendarModule } from '@fullcalendar/angular';

import { LeadPageRoutingModule } from './lead-routing.module';

import { LeadPage } from './lead.page';
import {LAddActivityComponent, leadssearchComponent, resorceListComponent} from '../LeadAddActivity/LAddActivity.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullCalendarModule,
    LeadPageRoutingModule,
  ],
  declarations: [LeadPage,LAddActivityComponent,leadssearchComponent,resorceListComponent],
  entryComponents: [LAddActivityComponent,leadssearchComponent,resorceListComponent]
})
export class LeadPageModule {}
