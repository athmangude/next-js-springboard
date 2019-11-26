import axios from 'axios';
import moment from 'moment';
import uuidv1 from 'uuid/v1';
import shortHash from 'short-hash';

import CONFIG from 'Config';
import * as AuthenticationActionTypes from './constants';

export function setUser({ user, collaborators, collaborating_causes }) {
	const loginTime = moment.utc().format();

	window.localStorage.setItem('user', JSON.stringify(user));
	window.localStorage.setItem('loginTime', loginTime);
	window.localStorage.setItem('collaborators', JSON.stringify(collaborators));
	window.localStorage.setItem(
		'collaboratingCauses',
		JSON.stringify(collaborating_causes),
	);

	return {
		type: AuthenticationActionTypes.SET_USER,
		payload: {
			user,
			collaborators,
			collaboratingCauses: collaborating_causes,
			loginTime,
		},
	};
}

export function authenticate({ email, password }) {
	return (dispatch, getState) => axios({
		url: `${CONFIG.apiUrl}/sessions/resource`,
		method: 'POST',
		data: {
			method: 'email',
			email,
			password,
		},
	});
}

export function authenticateViaGoogle({ email, googleId }) {
	return () => axios({
		url: `${CONFIG.apiUrl}/sessions/resource?method=google`,
		method: 'POST',
		data: {
			method: 'google',
			email,
			google_id: googleId,
		},
	});
}

export function authenticateViaFacebook({ email, userID }) {
	return () => axios({
		url: `${CONFIG.apiUrl}/sessions/resource?method=facebook`,
		method: 'POST',
		data: {
			method: 'facebook',
			email: email || `admin+facebook_${userID}@boostyoursuper.com.au`,
			facebook_id: userID,
		},
	});
}

export function resetPassword({ email }) {
	return (dispatch, getState) => axios({
		url: `${CONFIG.apiUrl}/sessions/resource?email=${email}&action=FORGOT_PASSWORD`,
		method: 'PUT',
	});
}

export function register({
	email, password, name, phone,
}) {
	const storedReferrerHash = localStorage.getItem('referrer');
	const form = {
		charity_contact_email: email,
		charity_password: password,
		charity_contact_phone: phone,
		charity_name: name,
		charity_contact_fname: name.split(' ')[0],
		charity_contact_lname: name
			.split(' ')
			.slice(1)
			.join(' '),
		charity_web_name: `${uuidv1()}-${shortHash(name)}`,
		charity_postcode: '',
		// promotion_code: '',
		// challenger_id: '',
		// charity_ra_caption: '',
		// charity_logo: props.selectedCauseType ? props.selectedCauseType.logo : null,
		// charity_ra_photo: props.selectedCauseType ? props.selectedCauseType.ra_photo : null,
		// primary_color: '#16addc',
		// accent_color: '#c34045',
		// cause_category: props.selectedCauseType ? props.selectedCategory.id : null,
		cause_category: 3,
		// cause_type: props.selectedCauseType ? props.selectedCauseType.id : null,
		cause_type: 8,
		// charity_category_id: props.selectedCauseType ? props.selectedCauseType.charity_category_ids.split(',').map((item) => parseInt(item)) : [],
		charity_country_id: 'AU',
		referring_hash: shortHash(`${name}-${uuidv1()}-${shortHash(name)}`),
		// charity_abn: '',
		referrer_hash: storedReferrerHash || null,
	};

	return (dispatch, getState) => axios({
		url: `${CONFIG.apiUrl}/charities/resource`,
		method: 'POST',
		data: form,
	});
}

export function registerViaGoogle({
	email, googleId, imageUrl, name,
}) {
	const storedReferrerHash = localStorage.getItem('referrer');
	// TODO: A log of transformations on data
	// TODO: split name into two fname and lname
	const form = {
		charity_contact_email: email,
		charity_name: name,
		charity_contact_fname: name.split(' ')[0],
		charity_contact_lname: name
			.split(' ')
			.slice(1)
			.join(' '),
		charity_web_name: `${uuidv1()}-${shortHash(name)}`,
		charity_postcode: '',
		cause_category: 3,
		cause_type: 8,
		charity_country_id: 'AU',
		referring_hash: shortHash(`${name}-${uuidv1()}-${shortHash(name)}`),
		referrer_hash: storedReferrerHash || null,
		google_id: googleId,
		google_photo_url: imageUrl,
	};

	return async () => axios({
		url: `${CONFIG.apiUrl}/charities/resource?method=google`,
		method: 'POST',
		data: form,
	});
}

export function registerViaFacebook({ email, name, userID }) {
	const storedReferrerHash = localStorage.getItem('referrer');
	// TODO: A log of transformations on data
	// TODO: split name into two fname and lname
	const form = {
		charity_contact_email: email,
		charity_name: name,
		charity_contact_fname: name.split(' ')[0],
		charity_contact_lname: name
			.split(' ')
			.slice(1)
			.join(' '),
		charity_web_name: `${uuidv1()}-${shortHash(name)}`,
		charity_postcode: '',
		cause_category: 3,
		cause_type: 8,
		charity_country_id: 'AU',
		referring_hash: shortHash(`${name}-${uuidv1()}-${shortHash(name)}`),
		referrer_hash: storedReferrerHash,
		shopper_facebook: userID,
	};

	return () => axios({
		url: `${CONFIG.apiUrl}/charities/resource?method=facebook`,
		method: 'POST',
		data: form,
	});
}

export function logout() {
	window.localStorage.removeItem('user');
	window.localStorage.removeItem('loginTime');
	window.localStorage.removeItem('collaborators');
	window.localStorage.removeItem('collaboratingCauses');

	return {
		type: AuthenticationActionTypes.UNSET_USER,
	};
}

export function fetchActivityLogs() {
	console.log('[fetchActivityLogs]');
	return (dispatch, getState) => {
		const { authentication } = getState();

		const { user, collaboratingCauses } = authentication;
		const ownedCause = collaboratingCauses.find(
			(cause) => cause.charity_contact_email === user.shopper_email,
		);

		return axios({
			url: `${CONFIG.boostYourSuperUrl}/site-api/get-cause-activity-logs/${ownedCause.charity_id}`,
			method: 'POST',
		});
	};
}

export function fetchCauseDetails(charityId) {
	return (dispatch, getState) => {
		const { authentication } = getState();

		const { user, collaboratingCauses } = authentication;
		const ownedCause = collaboratingCauses.find(
			(cause) => cause.charity_contact_email === user.shopper_email,
		);

		return axios({
			url: `${CONFIG.apiUrl}/charities/resource?charity_id=${ownedCause.charity_id}`,
			method: 'GET',
		});
	};
}

export function setActivityLogs(activityLogs) {
	return {
		type: AuthenticationActionTypes.SET_ACTIVITY_LOGS,
		payload: activityLogs,
	};
}

export function setCauseDetails(causeDetails) {
	return {
		type: AuthenticationActionTypes.SET_CAUSE_DETAILS,
		payload: causeDetails,
	};
}

// ALTER TABLE `shopper` ADD `google_id` VARCHAR(56) NULL AFTER `anonymous_to_cause`, ADD `google_photo_url` VARCHAR(256) NULL AFTER `google_id`, ADD INDEX `google_id` (`google_id`);
