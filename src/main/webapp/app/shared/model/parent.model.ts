import { Moment } from 'moment';
import { IStudentProfile } from 'app/shared/model//student-profile.model';
import { IFeature } from 'app/shared/model//feature.model';
import { INotification } from 'app/shared/model//notification.model';
import { ITask } from 'app/shared/model//task.model';
import { IPermission } from 'app/shared/model//permission.model';
import { IConversation } from 'app/shared/model//conversation.model';

export const enum Relation {
  FATHER = 'FATHER',
  MOTHER = 'MOTHER',
  GUARDIAN = 'GUARDIAN'
}

export interface IParent {
  id?: number;
  name?: string;
  createdOn?: Moment;
  phoneNumber?: string;
  relation?: Relation;
  studentName?: string;
  isAccountActive?: boolean;
  email?: string;
  studentProfile?: IStudentProfile;
  features?: IFeature[];
  notifications?: INotification[];
  tasks?: ITask[];
  permissions?: IPermission[];
  conversations?: IConversation[];
}

export const defaultValue: Readonly<IParent> = {
  isAccountActive: false
};
