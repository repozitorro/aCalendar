import {date} from '../services/calendar.service';

export interface CalendarDataInterface {
  weeks: date[][];
  typeCalendar: string;
}
