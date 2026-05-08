import { Phone } from 'lucide-react';
import { InputErrorType } from '../types/OthersTypes';

export const validateLoginForm = (formField: any, loginMethod: 'password' | 'otp') => {
    let cnt = 0;
    let error: InputErrorType = {};

    if (!formField?.email?.trim()) {
        error.email = 'Email is required';
        cnt++;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formField.email)) {
        error.email = 'Please enter a valid email';
        cnt++;
    }

    // Password validation (only when login method is password)
    if (loginMethod === 'password') {
        if (!formField?.password?.trim()) {
            error.password = 'Password is required';
            cnt++;
        } else if (formField.password.length < 8) {
            error.password = 'Password must be at least 8 characters';
            cnt++;
        }
    }

    return { cnt, error };
};

export const validateRegisterForm = (formField: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string; phone: string }) => {
    let error: InputErrorType = {};
    let cnt: number = 0;

    const emailRegex = /\S+@\S+\.\S+/;

    if (!formField?.firstName) {
        cnt++;
        error.firstName = 'Please enter your First Name.';
    }

    if (!formField?.lastName) {
        cnt++;
        error.lastName = 'Please enter your Last Name.';
    }

    if (!formField?.email) {
        cnt++;
        error.email = 'Please enter your Email.';
    } else if (!emailRegex.test(formField?.email?.trim())) {
        cnt++;
        error.email = 'Invalid email format.';
    }

    if (!formField?.password) {
        cnt++;
        error.password = 'Please enter your Password.';
    } else if (formField?.password.length < 6) {
        cnt++;
        error.password = 'Password must be at least 6 characters.';
    }

    if (!formField?.confirmPassword) {
        cnt++;
        error.confirmPassword = 'Please confirm your Password.';
    } else if (formField?.confirmPassword !== formField?.password) {
        cnt++;
        error.confirmPassword = 'Passwords do not match.';
    }

    if (!formField?.phone) {
        cnt++;
        error.phone = 'Please enter a Phone Number.';
    }

    return { error, cnt };
};

export const transformPermissions = (roleData: any) => {
    const featuresMap: Record<string, string[]> = {};

    roleData?.permissions?.forEach((permission: any) => {
        if (!featuresMap[permission?.feature]) {
            featuresMap[permission?.feature] = [];
        }
        featuresMap[permission?.feature]?.push(permission?.name);
    });

    const features = Object?.entries(featuresMap)?.map(([feature, actions]) => {
        return {
            [feature]: actions,
        };
    });

    return features;
};
