'use client';
import React, { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import { AuthModel, UserModel } from './_modal';
import * as authHelper from './AuthHelpers';
import { useRouter } from 'next/navigation';
import roleContext from '../context/roleContext';

const API_URL = process.env.NEXT_PUBLIC_APP_API_KEY;

type AuthContextProps = {
    auth: AuthModel | undefined;
    saveAuth: (auth: AuthModel | undefined) => void;
    currentUser: UserModel | undefined;
    setCurrentUser: (user: UserModel | any) => void;
    logout: () => void;
};

const initAuthContextPropsState = {
    auth: authHelper.getAuth(),
    saveAuth: () => {},
    currentUser: undefined,
    setCurrentUser: () => {},
    logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider: FC<any> = ({ children }) => {
    const [auth, setAuth] = useState<AuthModel | undefined>(authHelper?.getAuth());
    const [currentUser, setCurrentUser] = useState<UserModel | undefined>(authHelper?.getCurrentUser());
    const router = useRouter();

    const { updateState } = useContext(roleContext);

    const saveAuth = (auth: AuthModel | undefined) => {
        setAuth(auth);
        if (auth) {
            authHelper?.setAuth(auth);
        } else {
            authHelper?.removeAuth();
        }
    };
    const handleSetCurrentUser: Dispatch<SetStateAction<UserModel | undefined>> = (value) => {
        const result = typeof value === 'function' ? (value as Function)(currentUser) : value;

        setCurrentUser(result);

        if (result) {
            authHelper?.setCurrentUserInStorage(result);
        } else {
            authHelper?.removeCurrentUser();
        }
    };

    const logout = async () => {
        saveAuth(undefined);
        setCurrentUser(undefined);
        authHelper?.removeCurrentUser();
        localStorage?.removeItem('isLoggedIn');
        localStorage?.removeItem('selectedCompanyId');
        localStorage?.removeItem('currentUserRole');

        updateState([]);

        if (currentUser?.token && currentUser?.user?.user_id) {
            router.push('/auth/login');
        }
    };

    useEffect(() => {
        const storedAuth = authHelper?.getAuth();
        if (!storedAuth) {
            logout();
        }
    }, []);

    // Reactively logout when `auth` state becomes undefined
    useEffect(() => {
        if (!auth) {
            logout();
        }
    }, [auth]);

    // Listen for localStorage changes (multi-tab or clear actions)
    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event?.key === 'currentUser' && event?.newValue === null) {
                logout();
            }
        };

        window?.addEventListener('storage', handleStorageChange);
        return () => {
            window?.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return <AuthContext.Provider value={{ auth, saveAuth, currentUser, setCurrentUser: handleSetCurrentUser, logout }}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };

// const AuthInit: FC<WithChildren> = ({ children }) => {
//     const { auth, currentUser, logout, setCurrentUser } = useAuth();
//     const didRequest = useRef(false);
//     const [showSplashScreen, setShowSplashScreen] = useState(true);
//     const location = useLocation();

//     // We should request user by authToken (IN OUR EXAMPLE IT'S accessToken) before rendering the application
//     useEffect(() => {
//         const requestUser = async (apiToken: string) => {
//             try {
//                 if (!didRequest.current) {
//                     let data = JSON.parse(window.atob(apiToken.split('.')[1]));
//                     if (data) {
//                         data = auth;
//                         setCurrentUser(data);
//                     }
//                 }
//             } catch (error) {
//                 console.error(error);
//                 if (!didRequest.current) {
//                     logout();
//                 }
//             } finally {
//                 setShowSplashScreen(false);
//             }
//             return () => (didRequest.current = true);
//         };
//         if (auth && auth.accessToken) {
//             requestUser(auth.accessToken);
//         } else {
//             if (location.pathname !== '/auth' && location.pathname !== '/auth/forgot-password' && location.pathname !== 'auth/reset-password') {
//                 logout();
//             }
//             setShowSplashScreen(false);
//         }
//         // eslint-disable-next-line
//     }, []);

//     return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
// };

// export { AuthInit, AuthProvider, useAuth };
