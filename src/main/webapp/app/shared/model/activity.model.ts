import { Moment } from 'moment';
import { ISchedule } from 'app/shared/model//schedule.model';
import { IActivityType } from 'app/shared/model//activity-type.model';
import { IPhoto } from 'app/shared/model//photo.model';
import { IVideo } from 'app/shared/model//video.model';

export interface IActivity {
  id?: number;
  title?: string;
  description?: string;
  activityImageUrl?: string;
  activityDate?: Moment;
  createdOn?: Moment;
  lastModifiedOn?: Moment;
  schedule?: ISchedule;
  activityType?: IActivityType;
  photos?: IPhoto[];
  videos?: IVideo[];
}

export const defaultValue: Readonly<IActivity> = {};
