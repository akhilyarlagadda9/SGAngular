import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulingPageRoutingModule } from './scheduling-routing.module';

import { SchedulingPage,schedulingComponent } from './scheduling.page';
import { FullCalendarModule } from '@fullcalendar/angular';
//import { NgCalendarModule  } from 'ionic2-calendar';
import { ActinfoComponent } from '../actinfo/actinfo.component';
import {AreaPartsComponent} from '../area-parts/area-parts.component';
import { FilterPipe } from 'src/app/FilterPipe';
import { AddactivityComponent, jobssearchComponent } from '../addactivity/addactivity.component';
import { CalendarfilterComponent } from '../calendarfilter/calendarfilter.component';
import { CalendarsettingComponent } from '../calendarsetting/calendarsetting.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulingPageRoutingModule,FullCalendarModule,
  ],
  declarations: [SchedulingPage,schedulingComponent,ActinfoComponent,FilterPipe,AddactivityComponent,AreaPartsComponent,jobssearchComponent,CalendarfilterComponent,CalendarsettingComponent],
  entryComponents: [ActinfoComponent,AddactivityComponent,jobssearchComponent,AreaPartsComponent,schedulingComponent,
  CalendarfilterComponent,CalendarsettingComponent],
})
export class SchedulingPageModule {}
