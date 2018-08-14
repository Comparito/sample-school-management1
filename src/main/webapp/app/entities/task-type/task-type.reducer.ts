import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITaskType, defaultValue } from 'app/shared/model/task-type.model';

export const ACTION_TYPES = {
  FETCH_TASKTYPE_LIST: 'taskType/FETCH_TASKTYPE_LIST',
  FETCH_TASKTYPE: 'taskType/FETCH_TASKTYPE',
  CREATE_TASKTYPE: 'taskType/CREATE_TASKTYPE',
  UPDATE_TASKTYPE: 'taskType/UPDATE_TASKTYPE',
  DELETE_TASKTYPE: 'taskType/DELETE_TASKTYPE',
  RESET: 'taskType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITaskType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TaskTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: TaskTypeState = initialState, action): TaskTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TASKTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TASKTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TASKTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_TASKTYPE):
    case REQUEST(ACTION_TYPES.DELETE_TASKTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TASKTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TASKTYPE):
    case FAILURE(ACTION_TYPES.CREATE_TASKTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_TASKTYPE):
    case FAILURE(ACTION_TYPES.DELETE_TASKTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TASKTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TASKTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TASKTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_TASKTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TASKTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/task-types';

// Actions

export const getEntities: ICrudGetAllAction<ITaskType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TASKTYPE_LIST,
  payload: axios.get<ITaskType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITaskType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TASKTYPE,
    payload: axios.get<ITaskType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITaskType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TASKTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITaskType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TASKTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITaskType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TASKTYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
