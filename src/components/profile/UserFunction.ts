import { InputErrorType } from '../types/OthersTypes';

export interface UserFormFields {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    status: string;
    is_email_alerts: boolean;
}

export const validateUserForm = (inputField: UserFormFields) => {
    let error: InputErrorType = {};
    let cnt: number = 0;

    if (!inputField?.first_name?.trim()) {
        cnt++;
        error.first_name = 'Please enter a First Name.';
    }

    if (!inputField?.last_name?.trim()) {
        cnt++;
        error.last_name = 'Please enter a Last Name.';
    }

    if (!inputField?.email?.trim()) {
        cnt++;
        error.email = 'Please enter a valid email.';
    } else if (!/^\S+@\S+\.\S+$/.test(inputField.email)) {
        cnt++;
        error.email = 'Please enter a valid email.';
    }

    if (!inputField?.phone?.trim()) {
        cnt++;
        error.phone = 'Please enter a phone number.';
    } else if (inputField.phone.length < 5) {
        cnt++;
        error.phone = 'Phone number is too short.';
    }

    return { cnt, error };
};
