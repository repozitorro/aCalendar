import {Component, OnInit} from '@angular/core';
import {CalendarService} from '../../services/calendar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public calendarService: CalendarService) {
  }

  ngOnInit(): void {
  }

  onNext() {
    this.calendarService.nextMonth();
    this.calendarService.setCalendar();
    this.calendarService.setCurrentDate();
  }

  onReturn() {
    this.calendarService.returnMonth();
    this.calendarService.setCalendar();
    this.calendarService.setCurrentDate();
  }

}
