import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITimeline, defaultValue } from 'app/shared/model/timeline.model';

export const ACTION_TYPES = {
  FETCH_TIMELINE_LIST: 'timeline/FETCH_TIMELINE_LIST',
  FETCH_TIMELINE: 'timeline/FETCH_TIMELINE',
  CREATE_TIMELINE: 'timeline/CREATE_TIMELINE',
  UPDATE_TIMELINE: 'timeline/UPDATE_TIMELINE',
  DELETE_TIMELINE: 'timeline/DELETE_TIMELINE',
  RESET: 'timeline/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITimeline>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TimelineState = Readonly<typeof initialState>;

// Reducer

export default (state: TimelineState = initialState, action): TimelineState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIMELINE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIMELINE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIMELINE):
    case REQUEST(ACTION_TYPES.UPDATE_TIMELINE):
    case REQUEST(ACTION_TYPES.DELETE_TIMELINE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIMELINE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIMELINE):
    case FAILURE(ACTION_TYPES.CREATE_TIMELINE):
    case FAILURE(ACTION_TYPES.UPDATE_TIMELINE):
    case FAILURE(ACTION_TYPES.DELETE_TIMELINE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIMELINE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIMELINE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIMELINE):
    case SUCCESS(ACTION_TYPES.UPDATE_TIMELINE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIMELINE):
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

const apiUrl = 'api/timelines';

// Actions

export const getEntities: ICrudGetAllAction<ITimeline> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TIMELINE_LIST,
  payload: axios.get<ITimeline>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITimeline> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIMELINE,
    payload: axios.get<ITimeline>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITimeline> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIMELINE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITimeline> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIMELINE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITimeline> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIMELINE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
