import { CURRENT_USER_LOCAL_STORAGE_KEY } from '@/src/components/auth/AuthHelpers';
import Swal, { SweetAlertIcon } from 'sweetalert2';

// export const toAbsoluteUrl = (pathname: string) =>
//   import.meta.env.BASE_URL + pathname;

export const Message = (Message: string, MessageType: SweetAlertIcon, confirmationAction?: any) => {
    if (MessageType === 'success') {
        Swal?.fire({
            title: Message,
            icon: MessageType,
            heightAuto: false,
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
        })?.then((result) => {
            if (result?.isConfirmed) {
                if (confirmationAction) {
                    confirmationAction();
                }
            }
        });
    } else {
        Swal?.fire({
            title: Message,
            icon: MessageType,
            heightAuto: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        });
    }
};

export const clearInputError = (errorName: string, InputError: any, setInputError: Function) => {
    if (!InputError) {
        console.error('InputError object is undefined or null');
        return;
    }

    if (errorName in InputError) {
        let error = { ...InputError };
        delete error[errorName];
        setInputError(error);
    }
};

export const changeTextCamal = (text: string | null | undefined) => {
    if (text === null || text === undefined) {
        return '-';
    }
    return text?.charAt(0)?.toUpperCase() + text?.slice(1);
};

export const dateFormat = (dates: string | number | Date) => {
    const date = new Date(dates);
    const day = date?.getDate();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date?.getMonth()];
    const year = date?.getFullYear();

    let hours = date?.getHours();
    const minutes = date?.getMinutes()?.toString()?.padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${day} ${month} ${year}`;
};

export const checkRole = (
    Roles: string[],
    features: {
        [key: string]: string[];
    }[],
    featureLevel?: string,
) => {
    for (let i = 0; i < features?.length; i++) {
        for (let j = 0; j < Roles?.length; j++) {
            if (Object.keys(features[i])?.includes(Roles[j])) {
                {
                    if (featureLevel) {
                        if (features[i][Roles[j]]?.includes(featureLevel)) return true;
                    } else {
                        if (features[i][Roles[j]]?.length > 0) return true;
                    }
                }
            }
        }
    }
    return false;
};

export const removeCurrentUser = () => {
    if (typeof window === 'undefined') return;

    localStorage?.removeItem(CURRENT_USER_LOCAL_STORAGE_KEY);
};
