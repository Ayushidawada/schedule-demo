import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleDetailComponent } from './schedule/schedule-detail/schedule-detail.component';
import { ScheduleListComponent } from './schedule/schedule-list/schedule-list.component';

const routes: Routes = [
  { path: '', component: ScheduleListComponent },
  { path: 'schedule', component: ScheduleDetailComponent },
  { path: 'schedule/:id', component: ScheduleDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
