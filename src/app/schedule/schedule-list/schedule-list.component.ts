import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { ScheduleService } from '../schedule.service';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.sass']
})
export class ScheduleListComponent implements OnInit {

  scheduleList: any[]; //holds the entire list of schedule
  cols: any[]; // holds the column detail for the table
  availableTimeZones: any[]; // holds the available timezone
  selectedTimeZone: any; // selected time zone

  constructor(private scheduleService: ScheduleService, private router: Router, private messageService: MessageService, private translate: TranslateService, private confirmationService: ConfirmationService) {
    this.cols = [
      { header: 'FULLNAME', field: 'fullName' },
      { header: 'MEETINGDATE', field: 'meetingDate' },
      { header: 'STARTTIME', field: 'startTime' },
      { header: 'ENDTIME', field: 'endTime' }
    ];


    this.availableTimeZones = moment.tz.names().map(timeZone => {
      return {
        label: timeZone,
        value: timeZone
      }
    });

    //TODO: We need to update this by default it must be the user current timezone
    this.selectedTimeZone = this.availableTimeZones[0].value;

  }

  ngOnInit() {
    //fetch all schedule
    this.getAllSchedule();
  }

  getAllSchedule() {
    this.scheduleList = this.scheduleService.getAllSchedule();
    //update the list with the selected time zone
    this.updateList();
  }

  goToDetail(id) {
    this.router.navigate([`/schedule/${id}`]);
  }

  addNew() {
    this.router.navigate(['schedule']);
  }

  deleteSchedule(id) {
    this.scheduleService.deleteSchedule(id);
    this.messageService.add({ severity: 'success', summary: this.translate.instant('SUCCESSMESSAGE'), detail: this.translate.instant('SUCCESSSCHEDULEDELETE') })
    this.getAllSchedule();
  }

  /**
   * Method to open the confirm dialog when delete button is pressed.
   * @param id {number} unique id of schedule
   */
  openConfirmDialog(id) {
    this.confirmationService.confirm({
      message: this.translate.instant('DELETECONFIRMMSG'),
      header: this.translate.instant('DELETECONFIRMHEADER'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('YES'),
      rejectLabel: this.translate.instant('NO'),
      accept: () => {
        this.deleteSchedule(id)
      }
    });
  }

  /**
   * Method to update the list based on the timezone selected
   */
  updateList() {
    this.scheduleList = this.scheduleList.map(schedule => {
      return {
        ...schedule,
        startTime: moment(schedule['startTime']).tz(this.selectedTimeZone).format(),
        endTime: moment(schedule['endTime']).tz(this.selectedTimeZone).format(),
      }
    });
  }

}
