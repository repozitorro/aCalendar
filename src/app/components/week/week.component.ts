import {Component, Input, OnInit} from '@angular/core';
import {date} from '../../services/calendar.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {
  @Input() week: date[] = [];

  constructor() {
  }

  ngOnInit(): void {
    ///console.log(this.week);
  }

}
