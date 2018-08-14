import { Moment } from 'moment';
import { ICenter } from 'app/shared/model//center.model';
import { IStudent } from 'app/shared/model//student.model';
import { ITask } from 'app/shared/model//task.model';
import { ISchedule } from 'app/shared/model//schedule.model';

export interface IRoom {
  id?: number;
  name?: string;
  capacity?: number;
  createdOn?: Moment;
  lastModifiedOn?: Moment;
  center?: ICenter;
  students?: IStudent[];
  tasks?: ITask[];
  schedule?: ISchedule;
}

export const defaultValue: Readonly<IRoom> = {};
