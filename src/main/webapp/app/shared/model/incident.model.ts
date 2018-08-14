import { Moment } from 'moment';
import { IStudentProfile } from 'app/shared/model//student-profile.model';
import { IStudent } from 'app/shared/model//student.model';

export interface IIncident {
  id?: number;
  natureOfIncident?: string;
  firstAidProvided?: boolean;
  firstAidNotes?: string;
  date?: Moment;
  createdOn?: Moment;
  isAdminOnly?: boolean;
  notes?: string;
  studentProfile?: IStudentProfile;
  students?: IStudent[];
}

export const defaultValue: Readonly<IIncident> = {
  firstAidProvided: false,
  isAdminOnly: false
};
