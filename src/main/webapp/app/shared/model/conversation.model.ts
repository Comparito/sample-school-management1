import { Moment } from 'moment';
import { ITeacher } from 'app/shared/model//teacher.model';
import { IParent } from 'app/shared/model//parent.model';

export const enum MediaType {
  PHOTO = 'PHOTO',
  VIDEO = 'VIDEO'
}

export interface IConversation {
  id?: number;
  text?: string;
  createdOn?: Moment;
  sentOn?: Moment;
  status?: string;
  fileUrl?: string;
  mediaType?: MediaType;
  teacher?: ITeacher;
  parent?: IParent;
}

export const defaultValue: Readonly<IConversation> = {};
