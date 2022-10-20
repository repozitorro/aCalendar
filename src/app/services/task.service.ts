import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';

export interface Task {
  title: string,
  date: moment.Moment,
  dateTo: moment.Moment
  location?: string,
  description?: string,
  holiday: boolean
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskList: Task[] = [
    {
      title: 'today\'s task',
      date: moment().startOf('days'),
      dateTo: moment().startOf('days'),
      location: 'Your home',
      description: 'play',
      holiday: false
    },];


  taskListSubject = new BehaviorSubject<Task[]>(this.taskList);

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
    data: Task,
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

  deleteTask(task: Task) {
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
