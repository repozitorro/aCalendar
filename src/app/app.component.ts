import {Component, OnInit} from '@angular/core';
import {TaskService} from './services/task.service';
import {CalendarDataInterface} from './types/calendarData.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'aCalendar';
  calendarData!: CalendarDataInterface;
  constructor(
    private taskService: TaskService,
  ) {
  }

  ngOnInit(): void {
    this.taskService.initTasks()
  }

  onChanged($event: CalendarDataInterface) {
    this.calendarData = $event;
    console.log($event)
  }
}
