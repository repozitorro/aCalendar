import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {DateInterface} from '../types/date.interface';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  currentDate = moment();
  currentDateStr = this.currentDate.format("MMMM YYYY");
  calendars!: DateInterface[][];
  calendarType: string = 'month';

  constructor() {
  }

  setCalendar() {

    let startDate: moment.Moment = this.calendarType === 'month'
      ? moment(this.currentDate).startOf('month')
      : moment(this.currentDate).startOf('week')

    let startIndex: number = startDate.day();
    let endIndex: number = this.calendarType === 'month'
      ? moment(this.currentDate).endOf('month').date()
      : moment(this.currentDate).endOf('week').date()
    startDate.subtract(startIndex, 'days');

    let weekCount: number = (startIndex + endIndex) < 35 ? 5 : 6;
    let calendars: DateInterface[][] = [];
    for (let week = 0; week < weekCount; week++) {
      let weekRow: DateInterface[] = [];
      for (let day = 0; day < 7; day++) {
        weekRow.push({date: startDate.get('date'), moment: moment(startDate)});
        startDate.add(1, 'days')
      }
      calendars.push(weekRow);
      weekRow = [];
    }
    this.calendars = calendars;
  }

  setCalendarType(type: string) {
    this.calendarType = type;
    this.setCalendar();
  }


  setCurrentDate() {
    this.currentDateStr = this.currentDate.format("MMMM YYYY");
  }

  onNext() {
    if (this.calendarType === 'month') {
      this.currentDate.add(1, 'month');
    } else {
      this.currentDate.add(1, 'week');
    }

  }

  onReturn() {
    if (this.calendarType === 'month') {
      this.currentDate.subtract(1, 'month');
    } else {
      this.currentDate.subtract(1, 'week');
    }
  }
}
