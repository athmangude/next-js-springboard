import * as AppActionTypes from './constants';
import moment from 'moment';

let showOnboardingJourney = true;
const nextShowOnboardingJourneyTime = localStorage.getItem('nextShowOnboardingJourneyTime');

if (nextShowOnboardingJourneyTime) {
  if (moment() < moment(nextShowOnboardingJourneyTime)) {
    showOnboardingJourney = false;
  } else {
    localStorage.removeItem('nextShowOnboardingJourneyTime');
  }
}

const initialState = {
  isRightDrawerOpen: false,
  hasBeforeInstallPromptBeenFired: false,
  showOnboardingJourney: showOnboardingJourney,
};

const actionsMap = {
  [AppActionTypes.TOGGLE_RIGHT_DRAWER](state, { payload }) {
    return {
      ...state,
      isRightDrawerOpen: payload,
    }
  },
  [AppActionTypes.SET_BEFORE_INSTALL_PROMPT_FIRE](state, { payload }) {
    return {
      ...state,
      hasBeforeInstallPromptBeenFired: payload,
    }
  },
  [AppActionTypes.HIDE_ONBOARDING_JOURNEY](state) {
    return {
      ...state,
      showOnboardingJourney: false,
    }
  }
}

export default function items(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
