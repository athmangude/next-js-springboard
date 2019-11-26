import * as AppActionTypes from './constants';
import moment from 'moment';

export function toggleRightDrawer(open) {
  return {
    type: AppActionTypes.TOGGLE_RIGHT_DRAWER,
    payload: open,
  }
}

export function setBeforeInstallPromptFire(state) {
  return {
    type: AppActionTypes.SET_BEFORE_INSTALL_PROMPT_FIRE,
    payload: state,
  }
}

export function hideOnboardingJourney() {
  localStorage.setItem('nextShowOnboardingJourneyTime', moment().add(1, 'day').format());
  return {
    type: AppActionTypes.HIDE_ONBOARDING_JOURNEY,
  }
}

export function finishOnboarding() {
  localStorage.setItem('nextShowOnboardingJourneyTime', moment().add(14, 'days').format());
  return {
    type: AppActionTypes.HIDE_ONBOARDING_JOURNEY,
  }
}
