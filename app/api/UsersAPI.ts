import { setupAxios } from '@/src/components/auth/AuthHelpers';
import { api } from '../apiMiddleware/ApiMiddleWare';

export async function getAllUsers() {
    const { token } = setupAxios();
    return api.get(`/fetchAll-staff-user`, token, false);
}

export async function getByIdUser() {
    const { token } = setupAxios();
    return api.get(`/user`, token, false);
}

export async function getUserById(currentUser: string, userId: string) {
    const { token } = setupAxios();
    return api.get(`/staff-user/${currentUser}/${userId}`, token, false);
}

export async function getUsersById(userId: string) {
    const { token } = setupAxios();
    return api.get(`/users/${userId}`, token, false);
}

export async function addUsers(inputField: {
    firstName: string;
    lastName: string;
    organizationEmail: string;
    personalEmail: string;
    gender: string;
    dob: string;
    role: string;
    mobileNumber: string;
    address: string;
    created_by: string;
}) {
    const { token } = setupAxios();
    return api
        .post(
            `/create-staff-user`,
            token,
            {
                body: JSON.stringify({
                    first_name: inputField?.firstName,
                    last_name: inputField?.lastName,
                    organisational_email: inputField?.organizationEmail,
                    personal_email: inputField?.personalEmail,
                    gender: inputField?.gender,
                    dob: inputField?.dob,
                    role_id: inputField?.role,
                    address: inputField?.address,
                    phone: inputField?.mobileNumber,
                    created_by: inputField?.created_by,
                }),
            },
            true,
        )
        .then((res) => res);
}

export async function updateUsers(
    userId: string | any,
    inputField: {
        firstName: string;
        lastName: string;
        organizationEmail: string;
        personalEmail: string;
        gender: string;
        dob: string;
        role: string;
        mobileNumber: string;
        address: string;
    },
) {
    const { token } = setupAxios();
    return api
        .put(
            `/update-staff-user/${userId}`,
            token,
            {
                body: JSON.stringify({
                    first_name: inputField?.firstName,
                    last_name: inputField?.lastName,
                    organisational_email: inputField?.organizationEmail,
                    personal_email: inputField?.personalEmail,
                    gender: inputField?.gender,
                    dob: inputField?.dob,
                    role_id: inputField?.role,
                    address: inputField?.address,
                    phone: inputField?.mobileNumber,
                }),
            },
            true,
        )
        .then((res) => res);
}

export async function updateFilingStatus(fillingId: string | any, status: string) {
    const { token } = setupAxios();
    return api
        .put(
            `/filling-date/updateFillingDate/${fillingId}`,
            token,
            {
                body: JSON.stringify({
                    status: status,
                }),
            },
            true,
        )
        .then((res) => res);
}
