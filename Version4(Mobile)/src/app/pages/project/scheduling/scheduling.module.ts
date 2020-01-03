import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulingPageRoutingModule } from './scheduling-routing.module';

import { SchedulingPage } from './scheduling.page';
import { NgCalendarModule  } from 'ionic2-calendar';
import { ActinfoComponent } from '../actinfo/actinfo.component';
import { FilterPipe } from 'src/app/FilterPipe';
import { AddactivityComponent, jobssearchComponent } from '../addactivity/addactivity.component';
import { CalendarfilterComponent } from '../calendarfilter/calendarfilter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulingPageRoutingModule,NgCalendarModule,
  ],
  declarations: [SchedulingPage,ActinfoComponent,FilterPipe,AddactivityComponent,jobssearchComponent,CalendarfilterComponent],
  entryComponents: [ActinfoComponent,AddactivityComponent,jobssearchComponent,
  CalendarfilterComponent],
})
export class SchedulingPageModule {}
