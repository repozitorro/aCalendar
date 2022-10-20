import {Injectable} from '@angular/core';
import * as moment from 'moment';

export interface date {
  date: number,
  moment: moment.Moment,
  task?: Task[]
}

export interface Task {
  title: string,
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  currentDate = moment();
  currentDateStr = this.currentDate.format("MMMM YYYY");
  calendars!: date[][];

  constructor() {
    this.setCalendar();
  }

  setCalendar() {
    let startDate: moment.Moment = moment(this.currentDate).startOf('month');
    let startIndex: number = startDate.day();
    let endIndex: number = moment(this.currentDate).endOf('month').date();
    startDate.subtract(startIndex, 'days');

    let weekCount: number = (startIndex + endIndex) < 35 ? 5 : 6;
    let calendars: date[][] = [];
    for (let week = 0; week < weekCount; week++) {
      let weekRow: date[] = [];
      for (let day = 0; day < 7; day++) {
        weekRow.push({date: startDate.get('date'), moment: moment(startDate)});
        startDate.add(1, 'days')
      }
      calendars.push(weekRow);
      weekRow = [];
    }
    this.calendars = calendars;
  }

  setCurrentDate() {
    this.currentDateStr = this.currentDate.format("MMMM YYYY");
  }

  nextMonth() {
    this.currentDate.add(1, 'month');
  }

  returnMonth() {
    this.currentDate.subtract(1, 'month');
  }

}
