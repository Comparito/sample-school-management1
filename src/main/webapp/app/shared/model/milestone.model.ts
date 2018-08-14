import { Moment } from 'moment';
import { IMilestoneRecord } from 'app/shared/model//milestone-record.model';

export interface IMilestone {
  id?: number;
  title?: string;
  description?: string;
  imageUrl?: string;
  createdOn?: Moment;
  lastModifiedOn?: Moment;
  milestoneRecords?: IMilestoneRecord[];
}

export const defaultValue: Readonly<IMilestone> = {};
