import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {CalendarService, date} from '../../services/calendar.service';
import {MatDialog} from '@angular/material/dialog';
import {TaskAddDialogComponent} from '../task-add-dialog/task-add-dialog.component';
import {Task, TaskService} from '../../services/task.service';
import {TaskInfoDialogComponent} from '../task-info-dialog/task-info-dialog.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit, OnDestroy {
  @Input() day!: date;
  today: number;
  isToday: boolean = false;
  isNotThisMonth: boolean = false;

  dateTaskList: Task[] = [];
  sub$!: Subscription;

  constructor(
    private calendarService: CalendarService,
    public dialog: MatDialog,
    private taskService: TaskService,
  ) {
    this.today = moment().get('date');

  }

  ngOnInit(): void {
    this.checkDate();
    this.sub$ = this.taskService.taskListSubject.subscribe(list => {
      let date = this.day.moment.toISOString()

      this.dateTaskList = list.filter(d =>
        d.date.toString() === date)

    });
  }

  ngOnDestroy() {
    this.sub$.unsubscribe()
  }

  onDate() {
    const dialogRef = this.dialog.open(TaskAddDialogComponent, {
      width: '300px',
      data: {date: this.day.moment,}
    });
  }

  onTask(task: Task) {
    const dialogRef = this.dialog.open(TaskInfoDialogComponent, {
      width: '300px',
      data: task
    });
  }

  checkDate() {
    this.isNotThisMonth = this.day.moment.format("MMMM") !== this.calendarService.currentDate.format("MMMM");
    this.isToday = (moment().startOf('date').format() == this.day.moment.format());
  }

}
