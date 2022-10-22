import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';
import {TaskInterface} from '../types/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskList: TaskInterface[] = [];
  taskListSubject = new BehaviorSubject<TaskInterface[]>(this.taskList);

  constructor() {
  }

  initTasks() {
    const localList = JSON.parse(localStorage.getItem('TaskList') || '[]')
    if (localList) {
      this.taskList = localList;
      this.taskListSubject.next(this.taskList);
    }
  }

  addTask(
    title: string,
    date: moment.Moment,
    dateTo: moment.Moment,
    holiday: boolean,
    location?: string,
    description?: string,
  ) {
    this.taskList.push({
      title,
      date,
      dateTo,
      location: !!location ? location : '(none)',
      description: !!description ? description : '(none)',
      holiday
    });
    this.setToLocalStorage()
    this.initTasks()
  }

  editTask(
    data: TaskInterface,
    title: string,
    date: moment.Moment,
    dateTo: moment.Moment,
    holiday: boolean,
    location?: string,
    description?: string,
  ) {
    this.taskList = this.taskList.filter(item => item.title !== data.title);
    this.taskList.push({
      title,
      date,
      dateTo,
      location: !!location ? location : '(none)',
      description: !!description ? description : '(none)',
      holiday
    });
    this.setToLocalStorage()
    this.taskListSubject.next(this.taskList);
  }

  deleteTask(task: TaskInterface) {
    const index = this.taskList.findIndex(t => t === task);
    if (!(index === -1)) {
      this.taskList.splice(index, 1);
      this.setToLocalStorage()
      this.taskListSubject.next(this.taskList);
    }
  }

  setToLocalStorage() {
    localStorage.setItem('TaskList', JSON.stringify(this.taskList));
  }
}
