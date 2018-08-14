import { Moment } from 'moment';
import { ISchedule } from 'app/shared/model//schedule.model';
import { IStudentProfile } from 'app/shared/model//student-profile.model';

export interface ITimeline {
  id?: number;
  date?: Moment;
  isVisible?: Moment;
  schedule?: ISchedule;
  studentProfile?: IStudentProfile;
}

export const defaultValue: Readonly<ITimeline> = {};
