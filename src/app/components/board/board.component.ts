import {Component, Input} from '@angular/core';
import {CalendarDataInterface} from '../../types/calendarData.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() calendarData!: CalendarDataInterface;
  daysWeek: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  constructor() {
  }

}
