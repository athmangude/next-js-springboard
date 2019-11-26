import Router from 'next/router';
import * as AuthenticationActions from 'Flux/authentication/actions';
import { getCookie } from 'Utils/cookie';

export default function initialize(ctx) {
    if(ctx.isServer) {
        if (ctx.req.headers.cookie) {
            ctx.store.dispatch(AuthenticationActions.reauthenticate(getCookie('token', ctx.req)));
        }
    } else {
        const token = ctx.store.getState().authentication.token;

        if (token && ctx.pathname === '/signin' || ctx.pathname === '/signup') {
            setTimeour(function() {
                Router.push('/');
            }, 0);
        }
    }
}