import {TaskInterface} from './task.interface';

export interface DateInterface {
  date: number;
  moment: moment.Moment;
  task?: TaskInterface[];
}
