import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulingPageRoutingModule } from './scheduling-routing.module';

import { SchedulingPage } from './scheduling.page';
import { NgCalendarModule  } from 'ionic2-calendar';
import { ActinfoComponent } from '../actinfo/actinfo.component';
import { AddactivityComponent, jobssearchComponent } from '../addactivity/addactivity.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulingPageRoutingModule,NgCalendarModule,
  ],
  declarations: [SchedulingPage,ActinfoComponent,AddactivityComponent,jobssearchComponent],
  entryComponents: [ActinfoComponent,AddactivityComponent,jobssearchComponent],
})
export class SchedulingPageModule {}
