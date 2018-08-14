import { Moment } from 'moment';
import { IStudentProfile } from 'app/shared/model//student-profile.model';

export const enum AttendanceEvent {
  CHECKIN = 'CHECKIN',
  CHECKOUT = 'CHECKOUT'
}

export interface IAttendance {
  id?: number;
  attendanceEvent?: AttendanceEvent;
  datetime?: Moment;
  createdOn?: Moment;
  studentProfile?: IStudentProfile;
}

export const defaultValue: Readonly<IAttendance> = {};
