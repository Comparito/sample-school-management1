import { Moment } from 'moment';
import { ICenter } from 'app/shared/model//center.model';

export interface IOrganization {
  id?: number;
  name?: string;
  createdOn?: Moment;
  lastModifiedOn?: Moment;
  centers?: ICenter[];
}

export const defaultValue: Readonly<IOrganization> = {};
