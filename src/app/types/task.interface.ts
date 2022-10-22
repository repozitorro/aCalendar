export interface TaskInterface {
  title: string;
  date: moment.Moment;
  dateTo: moment.Moment;
  location?: string;
  description?: string;
  holiday: boolean;
}
