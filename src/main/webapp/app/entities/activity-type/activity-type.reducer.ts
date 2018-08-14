import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IActivityType, defaultValue } from 'app/shared/model/activity-type.model';

export const ACTION_TYPES = {
  FETCH_ACTIVITYTYPE_LIST: 'activityType/FETCH_ACTIVITYTYPE_LIST',
  FETCH_ACTIVITYTYPE: 'activityType/FETCH_ACTIVITYTYPE',
  CREATE_ACTIVITYTYPE: 'activityType/CREATE_ACTIVITYTYPE',
  UPDATE_ACTIVITYTYPE: 'activityType/UPDATE_ACTIVITYTYPE',
  DELETE_ACTIVITYTYPE: 'activityType/DELETE_ACTIVITYTYPE',
  RESET: 'activityType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IActivityType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ActivityTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: ActivityTypeState = initialState, action): ActivityTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ACTIVITYTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ACTIVITYTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ACTIVITYTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_ACTIVITYTYPE):
    case REQUEST(ACTION_TYPES.DELETE_ACTIVITYTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ACTIVITYTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ACTIVITYTYPE):
    case FAILURE(ACTION_TYPES.CREATE_ACTIVITYTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_ACTIVITYTYPE):
    case FAILURE(ACTION_TYPES.DELETE_ACTIVITYTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACTIVITYTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACTIVITYTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ACTIVITYTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_ACTIVITYTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ACTIVITYTYPE):
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

const apiUrl = 'api/activity-types';

// Actions

export const getEntities: ICrudGetAllAction<IActivityType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ACTIVITYTYPE_LIST,
  payload: axios.get<IActivityType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IActivityType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ACTIVITYTYPE,
    payload: axios.get<IActivityType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IActivityType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ACTIVITYTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IActivityType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ACTIVITYTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IActivityType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ACTIVITYTYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
