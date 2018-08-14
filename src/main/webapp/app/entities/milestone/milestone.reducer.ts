import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMilestone, defaultValue } from 'app/shared/model/milestone.model';

export const ACTION_TYPES = {
  FETCH_MILESTONE_LIST: 'milestone/FETCH_MILESTONE_LIST',
  FETCH_MILESTONE: 'milestone/FETCH_MILESTONE',
  CREATE_MILESTONE: 'milestone/CREATE_MILESTONE',
  UPDATE_MILESTONE: 'milestone/UPDATE_MILESTONE',
  DELETE_MILESTONE: 'milestone/DELETE_MILESTONE',
  RESET: 'milestone/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMilestone>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type MilestoneState = Readonly<typeof initialState>;

// Reducer

export default (state: MilestoneState = initialState, action): MilestoneState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MILESTONE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MILESTONE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MILESTONE):
    case REQUEST(ACTION_TYPES.UPDATE_MILESTONE):
    case REQUEST(ACTION_TYPES.DELETE_MILESTONE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MILESTONE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MILESTONE):
    case FAILURE(ACTION_TYPES.CREATE_MILESTONE):
    case FAILURE(ACTION_TYPES.UPDATE_MILESTONE):
    case FAILURE(ACTION_TYPES.DELETE_MILESTONE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MILESTONE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MILESTONE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MILESTONE):
    case SUCCESS(ACTION_TYPES.UPDATE_MILESTONE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MILESTONE):
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

const apiUrl = 'api/milestones';

// Actions

export const getEntities: ICrudGetAllAction<IMilestone> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MILESTONE_LIST,
  payload: axios.get<IMilestone>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IMilestone> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MILESTONE,
    payload: axios.get<IMilestone>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMilestone> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MILESTONE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMilestone> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MILESTONE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMilestone> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MILESTONE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
