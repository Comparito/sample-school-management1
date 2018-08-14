import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IKudos, defaultValue } from 'app/shared/model/kudos.model';

export const ACTION_TYPES = {
  FETCH_KUDOS_LIST: 'kudos/FETCH_KUDOS_LIST',
  FETCH_KUDOS: 'kudos/FETCH_KUDOS',
  CREATE_KUDOS: 'kudos/CREATE_KUDOS',
  UPDATE_KUDOS: 'kudos/UPDATE_KUDOS',
  DELETE_KUDOS: 'kudos/DELETE_KUDOS',
  RESET: 'kudos/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IKudos>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type KudosState = Readonly<typeof initialState>;

// Reducer

export default (state: KudosState = initialState, action): KudosState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_KUDOS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_KUDOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_KUDOS):
    case REQUEST(ACTION_TYPES.UPDATE_KUDOS):
    case REQUEST(ACTION_TYPES.DELETE_KUDOS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_KUDOS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_KUDOS):
    case FAILURE(ACTION_TYPES.CREATE_KUDOS):
    case FAILURE(ACTION_TYPES.UPDATE_KUDOS):
    case FAILURE(ACTION_TYPES.DELETE_KUDOS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_KUDOS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_KUDOS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_KUDOS):
    case SUCCESS(ACTION_TYPES.UPDATE_KUDOS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_KUDOS):
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

const apiUrl = 'api/kudos';

// Actions

export const getEntities: ICrudGetAllAction<IKudos> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_KUDOS_LIST,
  payload: axios.get<IKudos>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IKudos> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_KUDOS,
    payload: axios.get<IKudos>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IKudos> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_KUDOS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IKudos> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_KUDOS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IKudos> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_KUDOS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
