import Cookies from 'js-cookie';

const isProduction = import.meta.env.PROD;

const AUTH_TOKEN_KEY = 'auth_token';
const GUEST_TOKEN_KEY = 'guest_token';

export const cookieService = {

    setAuthToken: (token, days) => {
        Cookies.set(AUTH_TOKEN_KEY, token, {
            expires: days,
            secure: isProduction,
            sameSite: 'strict',
            path: '/'
        });
    },

    getAuthToken: () => {
        return Cookies.get(AUTH_TOKEN_KEY);
    },

    removeAuthToken: () => {
        Cookies.remove(AUTH_TOKEN_KEY);
    },

    setGuestToken: (guestID, days) => {
        Cookies.set(GUEST_TOKEN_KEY, guestID, {
            expires: days,
            secure: isProduction,
            sameSite: 'strict',
            path: '/'
        });
    },

    getGuestToken: () => {
        return Cookies.get(GUEST_TOKEN_KEY);
    },

    removeGuestToken: () => {
        Cookies.remove(GUEST_TOKEN_KEY);
    }
};