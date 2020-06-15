import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ScheduleService } from './schedule.service';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';



@NgModule({
  declarations: [ScheduleListComponent, ScheduleDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

  ],
  providers: [ScheduleService],
  exports: [ScheduleListComponent, ScheduleDetailComponent]
})
export class ScheduleModule { }
