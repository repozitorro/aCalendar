import {Component, Inject, OnInit} from '@angular/core';
import * as _moment from 'moment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TaskService} from '../../services/task.service';
import {TaskInterface} from '../../types/task.interface';


@Component({
  selector: 'app-task-edit-dialog',
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.css']
})
export class TaskEditDialogComponent implements OnInit {

  title!: string;
  location!: string | undefined;
  description!: string | undefined;
  date!: _moment.Moment;
  dateTo!: _moment.Moment;
  holiday: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<TaskEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public task: TaskInterface,
    private taskService: TaskService,
  ) {
  }

  ngOnInit(): void {
    this.initValues()
  }

  initValues(): void {
    this.date = this.task.date;
    this.dateTo = this.task.dateTo;
    this.title = this.task.title
    this.description = this.task.description;
    this.location = this.task.location;
    this.holiday = this.task.holiday;

  }

  onEdit(): void {
    if (this.title && this.date && this.dateTo) {
      this.taskService.editTask(this.task, this.title, this.date, this.dateTo, this.holiday, this.location, this.description);
    }
    this.dialogRef.close();
  }

}
