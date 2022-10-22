import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {TaskService} from '../../services/task.service';

export interface DialogData {
  title: string,
  date: _moment.Moment,
}

@Component({
  selector: 'app-task-add-dialog',
  templateUrl: './task-add-dialog.component.html',
  styleUrls: ['./task-add-dialog.component.css'],
  providers: [

    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class TaskAddDialogComponent implements OnInit {
  title: string = '';
  location: string = '';
  description: string = '';
  date: _moment.Moment;
  dateTo!: _moment.Moment;
  holiday: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<TaskAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private taskService: TaskService,
  ) {
    this.date = data.date
  }

  ngOnInit(): void {
  }

  onSave() {
    if (this.title && this.date && this.dateTo) {
      this.taskService.addTask(this.title, this.date, this.dateTo, this.holiday, this.location, this.description);
    }
    this.dialogRef.close();
  }

}
