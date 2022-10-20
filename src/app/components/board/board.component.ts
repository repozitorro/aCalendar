import {Component, OnInit} from '@angular/core';
import {CalendarService, date} from '../../services/calendar.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  youbi: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  constructor(
    public calendarService: CalendarService,
  ) {
  }

  ngOnInit(): void {
  }

  onScroll() {
  }

}
