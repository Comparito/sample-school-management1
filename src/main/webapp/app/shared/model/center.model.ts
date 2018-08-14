import { Moment } from 'moment';
import { IOrganization } from 'app/shared/model//organization.model';
import { IRoom } from 'app/shared/model//room.model';
import { ITeacher } from 'app/shared/model//teacher.model';
import { IStudent } from 'app/shared/model//student.model';
import { IHoliday } from 'app/shared/model//holiday.model';

export interface ICenter {
  id?: number;
  name?: string;
  createdOn?: Moment;
  lastModifiedOn?: Moment;
  organization?: IOrganization;
  rooms?: IRoom[];
  teachers?: ITeacher[];
  students?: IStudent[];
  holidays?: IHoliday[];
}

export const defaultValue: Readonly<ICenter> = {};
