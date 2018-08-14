import { Moment } from 'moment';
import { IParent } from 'app/shared/model//parent.model';

export const enum NotificationStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
  READ = 'READ'
}

export interface INotification {
  id?: number;
  type?: string;
  date?: Moment;
  createdOn?: Moment;
  message?: string;
  icon?: string;
  status?: NotificationStatus;
  parent?: IParent;
}

export const defaultValue: Readonly<INotification> = {};
