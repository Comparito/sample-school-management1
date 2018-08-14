import { Moment } from 'moment';
import { ICenter } from 'app/shared/model//center.model';

export interface IHoliday {
  id?: number;
  date?: Moment;
  title?: string;
  description?: string;
  center?: ICenter;
}

export const defaultValue: Readonly<IHoliday> = {};
