import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IIllnessRecord, defaultValue } from 'app/shared/model/illness-record.model';

export const ACTION_TYPES = {
  FETCH_ILLNESSRECORD_LIST: 'illnessRecord/FETCH_ILLNESSRECORD_LIST',
  FETCH_ILLNESSRECORD: 'illnessRecord/FETCH_ILLNESSRECORD',
  CREATE_ILLNESSRECORD: 'illnessRecord/CREATE_ILLNESSRECORD',
  UPDATE_ILLNESSRECORD: 'illnessRecord/UPDATE_ILLNESSRECORD',
  DELETE_ILLNESSRECORD: 'illnessRecord/DELETE_ILLNESSRECORD',
  RESET: 'illnessRecord/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IIllnessRecord>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type IllnessRecordState = Readonly<typeof initialState>;

// Reducer

export default (state: IllnessRecordState = initialState, action): IllnessRecordState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ILLNESSRECORD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ILLNESSRECORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ILLNESSRECORD):
    case REQUEST(ACTION_TYPES.UPDATE_ILLNESSRECORD):
    case REQUEST(ACTION_TYPES.DELETE_ILLNESSRECORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ILLNESSRECORD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ILLNESSRECORD):
    case FAILURE(ACTION_TYPES.CREATE_ILLNESSRECORD):
    case FAILURE(ACTION_TYPES.UPDATE_ILLNESSRECORD):
    case FAILURE(ACTION_TYPES.DELETE_ILLNESSRECORD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ILLNESSRECORD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ILLNESSRECORD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ILLNESSRECORD):
    case SUCCESS(ACTION_TYPES.UPDATE_ILLNESSRECORD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ILLNESSRECORD):
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

const apiUrl = 'api/illness-records';

// Actions

export const getEntities: ICrudGetAllAction<IIllnessRecord> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ILLNESSRECORD_LIST,
  payload: axios.get<IIllnessRecord>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IIllnessRecord> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ILLNESSRECORD,
    payload: axios.get<IIllnessRecord>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IIllnessRecord> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ILLNESSRECORD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IIllnessRecord> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ILLNESSRECORD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IIllnessRecord> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ILLNESSRECORD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
