import { Moment } from 'moment';
import { IStudentProfile } from 'app/shared/model//student-profile.model';

export interface IIllnessRecord {
  id?: number;
  createdOn?: Moment;
  name?: string;
  description?: string;
  isCured?: boolean;
  studentProfile?: IStudentProfile;
}

export const defaultValue: Readonly<IIllnessRecord> = {
  isCured: false
};
