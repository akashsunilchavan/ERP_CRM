import { getUsersById } from '@/app/api/UsersAPI';
import { InputErrorType } from '../types/OthersTypes';
import { Message } from '@/app/helpers/AssetHelpers';

const validateEmail = (email: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const fetchSupervisorDetails = async (userId: any, setInputField: Function) => {
    try {
        await getUsersById(userId)?.then((res) => {
            if (res?.statusCode === 200) {
                setInputField({
                    name: res?.data?.first_name || '',
                    role: res?.data?.role?.role_id || '',
                    email: res?.data?.email || '',
                    number: res?.data?.phone || '',
                    password: res?.data?.password || '',
                });
            } else {
                Message(res?.message, 'error');
            }
        });
    } catch (error) {
        Message('Error fetching user details', 'error');
    }
};

export const validateSupervisor = (inputField: any, isEdit = false) => {
    const error: InputErrorType = {};
    let cnt = 0;

    if (!inputField.name?.trim()) {
        error.name = 'Name is required';
        cnt++;
    } else if (inputField.name.trim().length < 2) {
        error.name = 'Name must be at least 2 characters';
        cnt++;
    }

    if (!inputField?.role) {
        error.role = 'Please enter / select a Role.';
        cnt++;
    }

    if (!inputField.email?.trim()) {
        error.email = 'Email is required';
        cnt++;
    } else if (!validateEmail(inputField.email)) {
        error.email = 'Enter a valid email address';
        cnt++;
    }

    if (!inputField.number?.trim()) {
        error.number = 'Phone number is required';
        cnt++;
    } else if (!/^\d{10}$/.test(inputField.number.replace(/\D/g, ''))) {
        error.number = 'Enter a valid 10-digit phone number';
        cnt++;
    }

    if (!isEdit) {
        if (!inputField.password) {
            error.password = 'Password is required';
            cnt++;
        } else if (inputField.password.length < 8) {
            error.password = 'Password must be at least 8 characters';
            cnt++;
        }
    }

    return error;
};
