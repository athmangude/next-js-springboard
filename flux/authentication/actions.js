import axios from 'axios';
import CONFIG from '../../config';
import { setCookie, removeCookie } from '../../utils/cookie';

import * as AuthenticationActionTypes from './constants';

export function authenticate({ email, password }) {
	return (dispatch) => {
		console.log(email, password)
		return axios({
			url: `${CONFIG.apiUrl}/authentication/sign-in`,
			body: {
				email,
				password
			}
		});

		// // The caller will have to set cookie themselves and authenticate
		// setCookie('token', response.data.data.user.token);
		// Router.push('/users');
		// dispatch({ type: AUTHENTICATE, payload: response.data.data.user.token });
	}
}

export function reauthenticate(token) {
	return (dispatch) => {
		dispatch({
			type: AuthenticationActionTypes.AUTHENTICATE,
			payload: token,
		});
	}
}

// removing the token
export function deauthenticate() {
	return (dispatch) => {
		removeCookie('token');
		Router.push('/');
		dispatch({ type: DEAUTHENTICATE });
	};
};


