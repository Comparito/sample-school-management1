import { Moment } from 'moment';
import { IEvent } from 'app/shared/model//event.model';
import { IActivity } from 'app/shared/model//activity.model';

export interface IVideo {
  id?: number;
  uploadedDate?: Moment;
  url?: string;
  event?: IEvent;
  activity?: IActivity;
}

export const defaultValue: Readonly<IVideo> = {};
