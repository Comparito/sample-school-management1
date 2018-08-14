import { Moment } from 'moment';
import { IRoom } from 'app/shared/model//room.model';
import { IEvent } from 'app/shared/model//event.model';
import { IActivity } from 'app/shared/model//activity.model';
import { ITimeline } from 'app/shared/model//timeline.model';

export interface ISchedule {
  id?: number;
  events?: number;
  activities?: number;
  createdOn?: Moment;
  lastModifiedOn?: Moment;
  rooms?: IRoom[];
  events?: IEvent[];
  activities?: IActivity[];
  timelines?: ITimeline[];
}

export const defaultValue: Readonly<ISchedule> = {};
