import { Injectable } from '@angular/core';
import { LocalStorageServiceService } from '../shared/service/local-storage-service.service'
import { Schedule } from './schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private keyName: string; // name of the key on which we need to store our schedule.
  private scheduleList: object[]; // it will be the list of schedule kept with service.

  constructor(private localStorageService: LocalStorageServiceService) {
    this.keyName = 'schedule';
    this.scheduleList = this.getAllSchedule();
  }

  /**
   * Method to validate the record. It checks to avoid the meeting add/update if the meeting with the same time span
   * @param data {object} hold the schedule detail
   */
  private validateRecord(data): boolean {
    let isOverLaping = false;
    this.scheduleList.forEach(schedule => {
      if (data.startTime >= new Date(schedule['startTime']) && data.startTime <= new Date(schedule['endTime'])) {
        isOverLaping = true;
        return false;
      }
      if (data.endTime >= new Date(schedule['startTime']) && data.endTime <= new Date(schedule['endTime'])) {
        isOverLaping = true;
        return false
      }
    });
    return !isOverLaping;
  }

  /**
   * Method to get the detail of the specific schedule
   * @param id {number} unique id of the shcedule
   */
  getSchedule(id): Schedule {
    const allSchedule = this.localStorageService.get(this.keyName) || [];
    return allSchedule.find(schedule => schedule.id === id);
  }

  /**
   * Method will return all the schedules
   */
  getAllSchedule(): Schedule[] {
    return this.localStorageService.get(this.keyName) || [];
  }

  /**
   * Method to delete the specific schedule
   * @param id {number} uinique id of schedule
   */
  deleteSchedule(id): void {
    let allSchedule = this.localStorageService.get(this.keyName) || [];
    allSchedule = allSchedule.filter(schedule => schedule.id !== id);
    this.scheduleList = allSchedule;
    this.localStorageService.set(this.keyName, allSchedule);
  }

  /**
   * Method to save the schedule
   * @param data {object} schedule details
   */
  saveSchedule(data): boolean {
    if (this.validateRecord(data)) {
      this.scheduleList.push(data);
      this.localStorageService.set(this.keyName, this.scheduleList);
      return true;
    } else {
      return false;
    }

  }

  /**
   * Method to update the existing record of schedule
   * @param data {object} schedule details
   */
  updateSchedule(data): boolean {
    if (this.validateRecord(data)) {
      this.scheduleList = this.scheduleList.map(schedule => {
        if (schedule['id'] === data.id) {
          return data;
        }
        return schedule;
      });
      this.localStorageService.set(this.keyName, this.scheduleList);
      return true;
    } else {
      return false;
    }
  }
}
