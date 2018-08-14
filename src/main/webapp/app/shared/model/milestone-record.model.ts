import { Moment } from 'moment';
import { IStudentProfile } from 'app/shared/model//student-profile.model';
import { IMilestone } from 'app/shared/model//milestone.model';

export interface IMilestoneRecord {
  id?: number;
  createdOn?: Moment;
  notes?: string;
  studentProfile?: IStudentProfile;
  milestone?: IMilestone;
}

export const defaultValue: Readonly<IMilestoneRecord> = {};
