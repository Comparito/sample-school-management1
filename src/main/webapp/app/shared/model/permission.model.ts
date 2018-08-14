import { IParent } from 'app/shared/model//parent.model';

export interface IPermission {
  id?: number;
  name?: string;
  parent?: IParent;
}

export const defaultValue: Readonly<IPermission> = {};
