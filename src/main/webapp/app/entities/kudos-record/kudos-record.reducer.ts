import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IKudosRecord, defaultValue } from 'app/shared/model/kudos-record.model';

export const ACTION_TYPES = {
  FETCH_KUDOSRECORD_LIST: 'kudosRecord/FETCH_KUDOSRECORD_LIST',
  FETCH_KUDOSRECORD: 'kudosRecord/FETCH_KUDOSRECORD',
  CREATE_KUDOSRECORD: 'kudosRecord/CREATE_KUDOSRECORD',
  UPDATE_KUDOSRECORD: 'kudosRecord/UPDATE_KUDOSRECORD',
  DELETE_KUDOSRECORD: 'kudosRecord/DELETE_KUDOSRECORD',
  RESET: 'kudosRecord/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IKudosRecord>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type KudosRecordState = Readonly<typeof initialState>;

// Reducer

export default (state: KudosRecordState = initialState, action): KudosRecordState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_KUDOSRECORD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_KUDOSRECORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_KUDOSRECORD):
    case REQUEST(ACTION_TYPES.UPDATE_KUDOSRECORD):
    case REQUEST(ACTION_TYPES.DELETE_KUDOSRECORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_KUDOSRECORD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_KUDOSRECORD):
    case FAILURE(ACTION_TYPES.CREATE_KUDOSRECORD):
    case FAILURE(ACTION_TYPES.UPDATE_KUDOSRECORD):
    case FAILURE(ACTION_TYPES.DELETE_KUDOSRECORD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_KUDOSRECORD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_KUDOSRECORD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_KUDOSRECORD):
    case SUCCESS(ACTION_TYPES.UPDATE_KUDOSRECORD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_KUDOSRECORD):
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

const apiUrl = 'api/kudos-records';

// Actions

export const getEntities: ICrudGetAllAction<IKudosRecord> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_KUDOSRECORD_LIST,
  payload: axios.get<IKudosRecord>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IKudosRecord> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_KUDOSRECORD,
    payload: axios.get<IKudosRecord>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IKudosRecord> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_KUDOSRECORD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IKudosRecord> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_KUDOSRECORD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IKudosRecord> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_KUDOSRECORD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
