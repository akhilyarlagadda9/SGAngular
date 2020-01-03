import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulingPageRoutingModule } from './scheduling-routing.module';

import { SchedulingPage,CalendarFilterComponent } from './scheduling.page';
import { NgCalendarModule  } from 'ionic2-calendar';
import { ActinfoComponent } from '../actinfo/actinfo.component';
import { FilterPipe } from 'src/app/FilterPipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulingPageRoutingModule,NgCalendarModule,
  ],
  declarations: [SchedulingPage,ActinfoComponent,CalendarFilterComponent,FilterPipe],
  entryComponents: [ActinfoComponent,CalendarFilterComponent],
})
export class SchedulingPageModule {}
