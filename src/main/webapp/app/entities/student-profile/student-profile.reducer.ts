import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStudentProfile, defaultValue } from 'app/shared/model/student-profile.model';

export const ACTION_TYPES = {
  FETCH_STUDENTPROFILE_LIST: 'studentProfile/FETCH_STUDENTPROFILE_LIST',
  FETCH_STUDENTPROFILE: 'studentProfile/FETCH_STUDENTPROFILE',
  CREATE_STUDENTPROFILE: 'studentProfile/CREATE_STUDENTPROFILE',
  UPDATE_STUDENTPROFILE: 'studentProfile/UPDATE_STUDENTPROFILE',
  DELETE_STUDENTPROFILE: 'studentProfile/DELETE_STUDENTPROFILE',
  RESET: 'studentProfile/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStudentProfile>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type StudentProfileState = Readonly<typeof initialState>;

// Reducer

export default (state: StudentProfileState = initialState, action): StudentProfileState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STUDENTPROFILE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STUDENTPROFILE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STUDENTPROFILE):
    case REQUEST(ACTION_TYPES.UPDATE_STUDENTPROFILE):
    case REQUEST(ACTION_TYPES.DELETE_STUDENTPROFILE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STUDENTPROFILE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STUDENTPROFILE):
    case FAILURE(ACTION_TYPES.CREATE_STUDENTPROFILE):
    case FAILURE(ACTION_TYPES.UPDATE_STUDENTPROFILE):
    case FAILURE(ACTION_TYPES.DELETE_STUDENTPROFILE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STUDENTPROFILE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_STUDENTPROFILE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STUDENTPROFILE):
    case SUCCESS(ACTION_TYPES.UPDATE_STUDENTPROFILE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STUDENTPROFILE):
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

const apiUrl = 'api/student-profiles';

// Actions

export const getEntities: ICrudGetAllAction<IStudentProfile> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_STUDENTPROFILE_LIST,
  payload: axios.get<IStudentProfile>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IStudentProfile> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STUDENTPROFILE,
    payload: axios.get<IStudentProfile>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStudentProfile> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STUDENTPROFILE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStudentProfile> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STUDENTPROFILE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStudentProfile> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STUDENTPROFILE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
