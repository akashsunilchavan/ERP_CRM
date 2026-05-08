import { getUserById } from '@/app/api/UsersAPI';
import { InputErrorType } from '../types/OthersTypes';
import { Message } from '@/app/helpers/AssetHelpers';

export const fetchUserDetails = async (currnetUser: string, userId: any, setInputField: Function) => {
    try {
        await getUserById(currnetUser, userId)?.then((res) => {
            if (res?.statusCode === 200) {
                setInputField({
                    firstName: res?.data?.first_name || '',
                    email: res?.data?.email || '',
                    mobileNumber: res?.data?.phone || '',
                    role: res?.data?.role?.role_id || '',
                });
            } else {
                Message(res?.message, 'error');
            }
        });
    } catch (error) {
        Message('Error fetching user details', 'error');
    }
};

export const validateAddUserForm = (inputField: any) => {
    const error: InputErrorType = {};
    let cnt = 0;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!inputField?.firstName) {
        error.firstName = 'Please enter a First Name.';
        cnt++;
    }
    if (!inputField?.email) {
        error.email = 'Please enter an Email Address.';
        cnt++;
    } else if (!emailRegex.test(inputField.email)) {
        error.email = 'Please enter a valid Email (e.g., user@example.com).';
        cnt++;
    }

    if (!inputField?.role) {
        error.role = 'Please enter/select a Role.';
        cnt++;
    }
    if (!inputField?.mobileNumber) {
        error.mobileNumber = 'Please enter a Mobile Number.';
        cnt++;
    } else if (!/^\d{10}$/.test(inputField?.mobileNumber)) {
        error.mobileNumber = 'Mobile number must be exactly 10 digits.';
        cnt++;
    }

    if (!inputField?.password) {
        error.password = 'Please enter an Password.';
        cnt++;
    }

    return error;
};
