import { Moment } from 'moment';
import { IStudentProfile } from 'app/shared/model//student-profile.model';

export interface IImmunizationRecord {
  id?: number;
  createdOn?: Moment;
  vaccinationDoneOn?: Moment;
  vaccinationName?: string;
  isOnTime?: boolean;
  studentProfile?: IStudentProfile;
}

export const defaultValue: Readonly<IImmunizationRecord> = {
  isOnTime: false
};
