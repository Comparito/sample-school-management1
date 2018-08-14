import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IImmunizationRecord, defaultValue } from 'app/shared/model/immunization-record.model';

export const ACTION_TYPES = {
  FETCH_IMMUNIZATIONRECORD_LIST: 'immunizationRecord/FETCH_IMMUNIZATIONRECORD_LIST',
  FETCH_IMMUNIZATIONRECORD: 'immunizationRecord/FETCH_IMMUNIZATIONRECORD',
  CREATE_IMMUNIZATIONRECORD: 'immunizationRecord/CREATE_IMMUNIZATIONRECORD',
  UPDATE_IMMUNIZATIONRECORD: 'immunizationRecord/UPDATE_IMMUNIZATIONRECORD',
  DELETE_IMMUNIZATIONRECORD: 'immunizationRecord/DELETE_IMMUNIZATIONRECORD',
  RESET: 'immunizationRecord/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IImmunizationRecord>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ImmunizationRecordState = Readonly<typeof initialState>;

// Reducer

export default (state: ImmunizationRecordState = initialState, action): ImmunizationRecordState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_IMMUNIZATIONRECORD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_IMMUNIZATIONRECORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_IMMUNIZATIONRECORD):
    case REQUEST(ACTION_TYPES.UPDATE_IMMUNIZATIONRECORD):
    case REQUEST(ACTION_TYPES.DELETE_IMMUNIZATIONRECORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_IMMUNIZATIONRECORD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_IMMUNIZATIONRECORD):
    case FAILURE(ACTION_TYPES.CREATE_IMMUNIZATIONRECORD):
    case FAILURE(ACTION_TYPES.UPDATE_IMMUNIZATIONRECORD):
    case FAILURE(ACTION_TYPES.DELETE_IMMUNIZATIONRECORD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMMUNIZATIONRECORD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMMUNIZATIONRECORD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_IMMUNIZATIONRECORD):
    case SUCCESS(ACTION_TYPES.UPDATE_IMMUNIZATIONRECORD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_IMMUNIZATIONRECORD):
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

const apiUrl = 'api/immunization-records';

// Actions

export const getEntities: ICrudGetAllAction<IImmunizationRecord> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_IMMUNIZATIONRECORD_LIST,
  payload: axios.get<IImmunizationRecord>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IImmunizationRecord> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_IMMUNIZATIONRECORD,
    payload: axios.get<IImmunizationRecord>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IImmunizationRecord> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_IMMUNIZATIONRECORD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IImmunizationRecord> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_IMMUNIZATIONRECORD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IImmunizationRecord> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_IMMUNIZATIONRECORD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
