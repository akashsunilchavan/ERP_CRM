import { setupAxios } from '@/src/components/auth/AuthHelpers';
import { api } from '../apiMiddleware/ApiMiddleWare';

export const LOGIN_URL = `/login`;
export const GENERATE_OTP = `/auth/generate-otp`;
export const VERIFY_OTP = `/auth/verify-otp`;
export const REGISTER_URL = `/register`;
export const GENERATE_OTP_FOR_REGISTRATION = `/auth/initiate-registration`;
export const VERIFY_OTP_FOR_REGISTRATION = `/auth/verify-registration`;
export const FORGOT_PASSWORD_URL = `/auth/forgot-password`;
export const VERIFY_RESET_PASSWORD_OTP = `/auth/verify-reset-password-otp`;
export const RESET_PASSWORD_URL = `/auth/password-reset`;

export async function generateOTP(phone: string, password: any) {
    const { token } = setupAxios();
    const res = await api.post(
        GENERATE_OTP,
        token,
        {
            body: JSON.stringify({
                phone: phone,
                password: password,
            }),
        },
        false,
    );
    return await res;
}

export async function verifyOTP(fields: { email: string; otp: string }) {
    const { token } = setupAxios();
    const res = await api.post(
        VERIFY_OTP,
        token,
        {
            body: JSON.stringify({
                email: fields?.email,
                otp: fields?.otp,
            }),
        },
        true,
    );
    return await res;
}

export async function login(email: string, password: string) {
    const { token } = setupAxios();
    const res = await api.post(
        LOGIN_URL,
        token,
        {
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        },
        false,
    );
    return await res;
}

export async function registerUser(firstName: string, email: string, password: string, number: string, role: string) {
    const { token } = setupAxios();
    const res = await api.post(REGISTER_URL, token, { body: JSON?.stringify({ first_name: firstName, email: email, password: password, phone: number, role_id: role }) }, true);
    return await res;
}

export async function generateOTPForRegistration(firstName: string, lastName: string, email: string, password: string, phone: string) {
    const { token } = setupAxios();
    const res = await api?.post(GENERATE_OTP_FOR_REGISTRATION, token, { body: JSON.stringify({ first_name: firstName, last_name: lastName, email: email, password: password, phone: phone }) }, true);
    return await res;
}

export async function verifyOTPForRegistration(fields: { email: string; otp: string; phone: string }) {
    const { token } = setupAxios();
    const res = await api.post(
        VERIFY_OTP_FOR_REGISTRATION,
        token,
        {
            body: JSON.stringify({
                email: fields?.email,
                otp: fields?.otp,
                phone: fields?.phone,
            }),
        },
        true,
    );
    return await res;
}

export async function forgetPassword(email: string) {
    const { token } = setupAxios();
    const res = await api.post(
        FORGOT_PASSWORD_URL,
        token,
        {
            body: JSON.stringify({
                email: email,
            }),
        },
        true,
    );
    return await res;
}

export async function verifyResetPasswordOtp(fields: { email: string; otp: string }) {
    const { token } = setupAxios();
    const res = await api.post(
        VERIFY_RESET_PASSWORD_OTP,
        token,
        {
            body: JSON.stringify({
                email: fields?.email,
                otp: fields?.otp,
            }),
        },
        true,
    );
    return await res;
}

export async function resetPassword(fields: { email: string; otp: string; newPassword: string }) {
    const { token } = setupAxios();
    const res = await api.post(
        RESET_PASSWORD_URL,
        token,
        {
            body: JSON.stringify({
                email: fields?.email,
                otp: fields?.otp,
                newPassword: fields?.newPassword,
            }),
        },
        true,
    );
    return await res;
}
