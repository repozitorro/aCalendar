import {Component, Input, OnInit} from '@angular/core';
import {DateInterface} from '../../types/date.interface';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {
  @Input() week: DateInterface[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
