import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMilestoneRecord, defaultValue } from 'app/shared/model/milestone-record.model';

export const ACTION_TYPES = {
  FETCH_MILESTONERECORD_LIST: 'milestoneRecord/FETCH_MILESTONERECORD_LIST',
  FETCH_MILESTONERECORD: 'milestoneRecord/FETCH_MILESTONERECORD',
  CREATE_MILESTONERECORD: 'milestoneRecord/CREATE_MILESTONERECORD',
  UPDATE_MILESTONERECORD: 'milestoneRecord/UPDATE_MILESTONERECORD',
  DELETE_MILESTONERECORD: 'milestoneRecord/DELETE_MILESTONERECORD',
  RESET: 'milestoneRecord/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMilestoneRecord>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type MilestoneRecordState = Readonly<typeof initialState>;

// Reducer

export default (state: MilestoneRecordState = initialState, action): MilestoneRecordState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MILESTONERECORD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MILESTONERECORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MILESTONERECORD):
    case REQUEST(ACTION_TYPES.UPDATE_MILESTONERECORD):
    case REQUEST(ACTION_TYPES.DELETE_MILESTONERECORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MILESTONERECORD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MILESTONERECORD):
    case FAILURE(ACTION_TYPES.CREATE_MILESTONERECORD):
    case FAILURE(ACTION_TYPES.UPDATE_MILESTONERECORD):
    case FAILURE(ACTION_TYPES.DELETE_MILESTONERECORD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MILESTONERECORD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MILESTONERECORD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MILESTONERECORD):
    case SUCCESS(ACTION_TYPES.UPDATE_MILESTONERECORD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MILESTONERECORD):
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

const apiUrl = 'api/milestone-records';

// Actions

export const getEntities: ICrudGetAllAction<IMilestoneRecord> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MILESTONERECORD_LIST,
  payload: axios.get<IMilestoneRecord>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IMilestoneRecord> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MILESTONERECORD,
    payload: axios.get<IMilestoneRecord>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMilestoneRecord> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MILESTONERECORD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMilestoneRecord> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MILESTONERECORD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMilestoneRecord> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MILESTONERECORD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
