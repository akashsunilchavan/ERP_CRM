import { AuthModel, UserModel } from './_modal';

const AUTH_LOCAL_STORAGE_KEY = 'token';
const CURRENT_USER_LOCAL_STORAGE_KEY = 'currentUser';

const getAuth = (): AuthModel | undefined => {
    if (typeof window === 'undefined') return;

    const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
    if (!lsValue) return;

    try {
        const auth: AuthModel = JSON.parse(lsValue) as AuthModel;
        return auth;
    } catch (error) {
        console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
    }
};

const setAuth = (auth: AuthModel) => {
    if (typeof window === 'undefined') return;

    try {
        const lsValue = JSON.stringify(auth);
        localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
    } catch (error) {
        console.error('AUTH LOCAL STORAGE SAVE ERROR', error);
    }
};

const getCurrentUser = (): UserModel | undefined => {
    if (typeof window === 'undefined') return;

    const data = localStorage.getItem(CURRENT_USER_LOCAL_STORAGE_KEY);
    if (!data) return;

    try {
        return JSON.parse(data) as UserModel;
    } catch (error) {
        console.error('Failed to parse current user from localStorage', error);
        return undefined;
    }
};

const setCurrentUserInStorage = (user: UserModel) => {
    if (typeof window === 'undefined') return;

    try {
        const value = JSON.stringify(user);
        localStorage.setItem(CURRENT_USER_LOCAL_STORAGE_KEY, value);
    } catch (error) {
        console.error('Failed to save current user in localStorage', error);
    }
};

const removeCurrentUser = () => {
    if (typeof window === 'undefined') return;

    localStorage?.removeItem(CURRENT_USER_LOCAL_STORAGE_KEY);
};

export { CURRENT_USER_LOCAL_STORAGE_KEY, getCurrentUser, setCurrentUserInStorage, removeCurrentUser };

const removeAuth = () => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
    } catch (error) {
        console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
    }
};

export function setupAxios() {
    let token = '';
    let refreshToken = '';
    let id = '';
    const auth = getAuth();
    // let representatives = auth?.representatives;
    if (auth && auth.accessToken) {
        token = auth.accessToken;
    }
    // if (auth && auth.refreshToken) {
    //     refreshToken = auth.refreshToken;
    // }
    // if (auth && auth.id) {
    //     id = auth.id;
    // }
    // if (auth && auth.projectCity) {
    //     projectCity = auth?.projectCity;
    // }
    return { token, refreshToken, id };
}

export { AUTH_LOCAL_STORAGE_KEY, getAuth, removeAuth, setAuth };
