import moment from 'moment';
import * as AuthenticationActionTypes from './constants';

const storedUser = window.localStorage.getItem('user');
const storedLoginTime = window.localStorage.getItem('loginTime');
const storedCollaborators = window.localStorage.getItem('collaborators');
const storedCollaboratingCauses = window.localStorage.getItem('collaboratingCauses');

const initialState = {
  user: !storedUser ? null : JSON.parse(storedUser),
  loginInTime: !storedLoginTime ? null : storedLoginTime,
  collaborators: !storedCollaborators ? null : JSON.parse(storedCollaborators),
  collaboratingCauses: !storedCollaboratingCauses ? null : JSON.parse(storedCollaboratingCauses),
  activityLogs: [],
  causeDetails: null,
};

const actionsMap = {
  [AuthenticationActionTypes.SET_USER](state, { payload }) {
    const { user, loginTime, collaborators, collaboratingCauses } = payload;
    return {
      ...state,
      user,
      loginTime,
      collaborators,
      collaboratingCauses,
    };
  },
  [AuthenticationActionTypes.UNSET_USER](state) {
    return {
      ...state,
      user: null,
      loginInTime: null,
      collaborators: null,
      collaboratingCauses: null,
      activityLogs: [],
      causeDetails: null,

    }
  },
  [AuthenticationActionTypes.SET_CAUSE_DETAILS](state, action) {
    return {
      ...state,
      causeDetails: action.payload,
    }
  },
  [AuthenticationActionTypes.SET_ACTIVITY_LOGS](state, action) {
    return {
      ...state,
      activityLogs: action.payload,
    };
  }
}

export default function authentication(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
