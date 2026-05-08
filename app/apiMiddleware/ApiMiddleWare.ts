import Swal from 'sweetalert2';
import { Message } from '../helpers/AssetHelpers';
import { API_BASE_URL } from '@/src/components/utils/Constants';
import * as authHelper from '../helpers/AssetHelpers';

let isLoggingOut = false;
let isSessionStorageActive = true;
let isError = false;
let userMessage = async (url: string) => {
    const isLoggedIn = localStorage?.getItem('isLoggedIn');
    let redirectUrl = `/auth/login`;

    isSessionStorageActive = true;

    if (isLoggedIn) {
        if (isLoggingOut) {
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }

        Swal.fire({
            icon: 'warning',
            title: 'Your session has expired. So logging out',
            heightAuto: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            },
        });

        isSessionStorageActive = true;

        isLoggingOut = true;
        setTimeout(() => {
            isLoggingOut = false;
            authHelper?.removeCurrentUser();
            localStorage?.removeItem('token');
            localStorage?.removeItem('isLoggedIn');
            localStorage?.removeItem('selectedCompanyId');
            localStorage?.removeItem('currentUserRole');
            window?.location?.replace(redirectUrl ?? '');
            Swal?.close();
        }, 1200);
    }
    isSessionStorageActive = false;
};

let getContent = (contentNotNeeded: boolean | undefined, token: string | null) => {
    let header = {};
    if (contentNotNeeded) {
        header = {
            headers: { Authorization: `Bearer ${token}` },
        };
    } else {
        header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
    }
    return header;
};

let getResponse = async (response: any, url: string, isMessageRequired: boolean) => {
    let responseJson: any = await response?.json();
    if (responseJson?.statusCode === 401 && responseJson?.message === 'Invalid or expired token') {
        userMessage(url);
    } else {
        if (responseJson?.statusCode !== 200 && isMessageRequired !== false) {
            isSessionStorageActive === true ? '' : Message(responseJson?.message, 'error');
        } else if (responseJson?.statusCode === 200 && isMessageRequired !== false) {
            Message(responseJson?.message, 'success');
        }
        return responseJson;
    }
};

let getError = async (url: string, error?: any) => {
    if (error !== undefined) {
        if (error?.message?.includes('Failed to fetch')) {
            if (isError) {
                if (url === '/auth/login') {
                    await new Promise((resolve) => setTimeout(resolve, 50));
                } else {
                    await new Promise((resolve) => setTimeout(resolve, 100000000));
                } // You can adjust the wait time as needed
            }
            isError = true;
            Swal?.fire({
                icon: 'warning',
                title: 'Something Went wrong',
                heightAuto: false,
                allowOutsideClick: false,
                confirmButtonText: 'Try Again',
                allowEscapeKey: false,
            })?.then((result) => {
                if (result?.isConfirmed) {
                    isError = false;
                    window.location?.reload();
                }
            });
        }
        return Promise?.reject(error);
    } else {
        Swal?.fire({
            icon: 'warning',
            title: 'Check your Internet',
            heightAuto: false,
            confirmButtonText: 'Try Again',
            allowOutsideClick: false,
            allowEscapeKey: false,
        })?.then((result) => {
            if (result?.isConfirmed) {
                window?.location?.reload();
            }
        });
    }
};

export const api = {
    get: async (url: string, token: string | null, isMessageRequired: boolean, options?: Object, contentNotNeeded?: boolean) => {
        let header = getContent(contentNotNeeded, token);
        let internetConnection = window?.navigator?.onLine ? true : false;

        if (internetConnection) {
            return await fetch(API_BASE_URL + url, {
                method: 'GET',
                ...options,
                ...header,
            })
                ?.then(async (response) => {
                    return getResponse(response, url, isMessageRequired);
                })
                ?.catch((error) => {
                    Message(error, 'error');
                    return getError(url, error);
                });
        } else {
            getError(url);
        }
    },
    post: async (url: string, token: string | null, options: Object, isMessageRequired: boolean, contentNotNeeded?: boolean) => {
        let header = getContent(contentNotNeeded, token);
        let internetConnection = window?.navigator?.onLine ? true : false;

        if (internetConnection) {
            return await fetch(API_BASE_URL + url, {
                method: 'POST',
                ...options,
                ...header,
            })
                ?.then(async (response) => {
                    return getResponse(response, url, isMessageRequired);
                })
                ?.catch((error) => {
                    return getError(url, error);
                });
        } else {
            getError(url);
        }
    },
    put: async (url: string, token: string | null, options: Object, isMessageRequired: boolean, contentNotNeeded?: boolean) => {
        let header = getContent(contentNotNeeded, token);
        let internetConnection = window?.navigator?.onLine ? true : false;
        if (internetConnection) {
            return await fetch(API_BASE_URL + url, {
                method: 'PUT',
                ...options,
                ...header,
            })
                ?.then(async (response) => {
                    return getResponse(response, url, isMessageRequired);
                })
                ?.catch((error) => {
                    return getError(url, error);
                });
        } else {
            getError(url);
        }
    },
    delete: async (url: string, token: string | null, isMessageRequired: boolean, options?: Object, contentNotNeeded?: boolean) => {
        let header = getContent(contentNotNeeded, token);
        let internetConnection = window?.navigator?.onLine ? true : false;
        if (internetConnection) {
            return await fetch(API_BASE_URL + url, {
                method: 'DELETE',
                ...options,
                ...header,
            })
                ?.then(async (response) => {
                    return getResponse(response, url, isMessageRequired);
                })
                ?.catch((error) => {
                    return getError(url, error);
                });
        } else {
            getError(url);
        }
    },
};
