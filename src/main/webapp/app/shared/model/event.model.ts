import { Moment } from 'moment';
import { ISchedule } from 'app/shared/model//schedule.model';
import { IPhoto } from 'app/shared/model//photo.model';
import { IVideo } from 'app/shared/model//video.model';

export interface IEvent {
  id?: number;
  title?: string;
  description?: string;
  eventImageURL?: string;
  eventDate?: Moment;
  createdOn?: Moment;
  lastModifiedOn?: Moment;
  schedule?: ISchedule;
  photos?: IPhoto[];
  videos?: IVideo[];
}

export const defaultValue: Readonly<IEvent> = {};
