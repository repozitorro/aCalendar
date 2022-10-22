import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CalendarService, date} from '../../services/calendar.service';
import {CalendarDataInterface} from '../../types/calendarData.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() onChanged = new EventEmitter<CalendarDataInterface>();
  selected: string = 'month';
  weeks!: date[][];
  currentDate: any;

  constructor(public calendarService: CalendarService) {
  }

  ngOnInit(): void {
    this.onCalendar()
  }

  onCalendar() {
    this.calendarService.setCalendarType(this.selected);
    this.currentDate = this.calendarService.currentDate;
    this.weeks = this.calendarService.calendars;
    const calendarData: CalendarDataInterface = {
      weeks: this.weeks,
      typeCalendar: this.selected
    }
    this.onChanged.emit(calendarData);
  }

  changeCalendarType(): void {
    this.onCalendar()
  }

  onNext(): void {
    this.calendarService.onNext();
    this.calendarService.setCurrentDate();
    this.onCalendar()
  }

  onReturn(): void {
    this.calendarService.onReturn();
    this.calendarService.setCurrentDate();
    this.onCalendar()
  }
}
