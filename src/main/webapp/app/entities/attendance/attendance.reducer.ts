import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAttendance, defaultValue } from 'app/shared/model/attendance.model';

export const ACTION_TYPES = {
  FETCH_ATTENDANCE_LIST: 'attendance/FETCH_ATTENDANCE_LIST',
  FETCH_ATTENDANCE: 'attendance/FETCH_ATTENDANCE',
  CREATE_ATTENDANCE: 'attendance/CREATE_ATTENDANCE',
  UPDATE_ATTENDANCE: 'attendance/UPDATE_ATTENDANCE',
  DELETE_ATTENDANCE: 'attendance/DELETE_ATTENDANCE',
  RESET: 'attendance/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAttendance>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AttendanceState = Readonly<typeof initialState>;

// Reducer

export default (state: AttendanceState = initialState, action): AttendanceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ATTENDANCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ATTENDANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ATTENDANCE):
    case REQUEST(ACTION_TYPES.UPDATE_ATTENDANCE):
    case REQUEST(ACTION_TYPES.DELETE_ATTENDANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ATTENDANCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ATTENDANCE):
    case FAILURE(ACTION_TYPES.CREATE_ATTENDANCE):
    case FAILURE(ACTION_TYPES.UPDATE_ATTENDANCE):
    case FAILURE(ACTION_TYPES.DELETE_ATTENDANCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATTENDANCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ATTENDANCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ATTENDANCE):
    case SUCCESS(ACTION_TYPES.UPDATE_ATTENDANCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ATTENDANCE):
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

const apiUrl = 'api/attendances';

// Actions

export const getEntities: ICrudGetAllAction<IAttendance> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ATTENDANCE_LIST,
  payload: axios.get<IAttendance>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAttendance> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ATTENDANCE,
    payload: axios.get<IAttendance>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAttendance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ATTENDANCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAttendance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ATTENDANCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAttendance> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ATTENDANCE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
