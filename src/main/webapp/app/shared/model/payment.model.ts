import { IStudentProfile } from 'app/shared/model//student-profile.model';

export interface IPayment {
  id?: number;
  studentProfile?: IStudentProfile;
}

export const defaultValue: Readonly<IPayment> = {};
