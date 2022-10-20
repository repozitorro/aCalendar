import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Task, TaskService} from '../../services/task.service';
import {TaskEditDialogComponent} from '../task-edit-dialog/task-edit-dialog.component';

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
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private taskService: TaskService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  onDelete(task: Task) {
    this.taskService.deleteTask(task);
    this.dialogRef.close();
  }

  editTask(task: Task) {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(TaskEditDialogComponent, {
      width: '300px',
      data: task
    });
  }
}
