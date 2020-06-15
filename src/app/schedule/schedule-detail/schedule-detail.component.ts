import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ScheduleService } from '../schedule.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.sass']
})
export class ScheduleDetailComponent implements OnInit {

  scheduleForm: FormGroup; //form object
  minDateValue: Date;
  minEndTime: Date;

  constructor(private fb: FormBuilder, private scheduleService: ScheduleService, private route: ActivatedRoute, private router: Router, private messageService: MessageService, private translate: TranslateService) {
    this.minDateValue = new Date();
    this.minEndTime = new Date();
    this.scheduleForm = this.fb.group({
      'id': new FormControl(Math.floor(Math.random() * 10000)),
      'fullName': new FormControl('', Validators.required),
      'meetingDate': new FormControl(new Date(), Validators.required),
      'startTime': new FormControl(new Date(), Validators.required),
      'endTime': new FormControl(new Date(), Validators.required)
    });
  }

  ngOnInit() {
    const id = parseFloat(this.route.snapshot.paramMap.get('id'));
    if (id) {
      const schedule = this.scheduleService.getSchedule(id);
      this.scheduleForm.patchValue({
        'id': schedule.id,
        'fullName': schedule.fullName,
        'meetingDate': new Date(schedule.meetingDate),
        'startTime': new Date(schedule.startTime),
        'endTime': new Date(schedule.endTime)
      });
    }
  }

  /**
   * Method to save/update the schedule
   */
  save(): void {
    let isSaved = false;
    if (this.route.snapshot.paramMap.get('id')) {
      isSaved = this.scheduleService.updateSchedule(this.scheduleForm.value);
      if (isSaved) {
        this.messageService.add({ severity: 'success', summary: this.translate.instant('SUCCESSMESSAGE'), detail: this.translate.instant('SUCCESSSCHEDULESAVE') });
        this.goToList();
      }
    } else {
      isSaved = this.scheduleService.saveSchedule(this.scheduleForm.value);
      if (isSaved) {
        this.messageService.add({ severity: 'success', summary: this.translate.instant('SUCCESSMESSAGE'), detail: this.translate.instant('SUCCESSSCHEDULEUPDATE') });
        this.goToList();
      }
    }
    if (!isSaved) {
      this.messageService.add({ severity: 'error', summary: this.translate.instant('ERRORMESSAGE'), detail: this.translate.instant('ERRORSCHEDULE') });
    }

  }

  goToList() {
    this.router.navigate(['']);
  }

  /**
   * Method to validate the end time on the basis of start time selection.
   */
  validateEndTime() {
    this.minEndTime = this.scheduleForm.value.startTime;
    if (this.scheduleForm.value.startTime > this.scheduleForm.value.endTime) {
      this.scheduleForm.patchValue({
        endTime: this.scheduleForm.value.startTime
      });
    }
  }


}
