import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {TaskService} from '../../services/task.service';
import {TaskEditDialogComponent} from '../task-edit-dialog/task-edit-dialog.component';
import {TaskInterface} from '../../types/task.interface';

@Component({
  selector: 'app-task-info-dialog',
  templateUrl: './task-info-dialog.component.html',
  styleUrls: ['./task-info-dialog.component.css']
})
export class TaskInfoDialogComponent implements OnInit {
  title!: string;
  date!: string;

  constructor(
    public dialogRef: MatDialogRef<TaskEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskInterface,
    private taskService: TaskService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  onDelete(task: TaskInterface): void {
    this.taskService.deleteTask(task);
    this.dialogRef.close();
  }

  editTask(task: TaskInterface): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(TaskEditDialogComponent, {
      width: '300px',
      data: task
    });
  }
}
