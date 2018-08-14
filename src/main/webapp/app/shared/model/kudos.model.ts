import { Moment } from 'moment';
import { IKudosRecord } from 'app/shared/model//kudos-record.model';

export interface IKudos {
  id?: number;
  title?: string;
  description?: string;
  imageUrl?: string;
  createdOn?: Moment;
  lastModifiedOn?: Moment;
  kudosRecords?: IKudosRecord[];
}

export const defaultValue: Readonly<IKudos> = {};
