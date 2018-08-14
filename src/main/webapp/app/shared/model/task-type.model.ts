import { ITask } from 'app/shared/model//task.model';

export interface ITaskType {
  id?: number;
  name?: string;
  priority?: number;
  tasks?: ITask[];
}

export const defaultValue: Readonly<ITaskType> = {};
