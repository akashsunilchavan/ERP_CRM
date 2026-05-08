import { setupAxios } from '@/src/components/auth/AuthHelpers';
import { api } from '../apiMiddleware/ApiMiddleWare';

export async function getFeatures() {
    const { token } = setupAxios();
    return api.get(`/fetchAll-permission`, token, false);
}

export async function getRoleById(roleId: string) {
    const { token } = setupAxios();
    return api.get(`/fetch-role/${roleId}`, token, false);
}

export async function addRoles(inputField: { name: string; description: string; permission_ids: string[] }) {
    const { token } = setupAxios();
    return api
        .post(
            `/create-role`,
            token,
            {
                body: JSON.stringify({
                    name: inputField?.name,
                    description: inputField?.description,
                    permission_ids: inputField?.permission_ids,
                }),
            },
            true,
        )
        .then((res) => res);
}

export async function updateRoles(roleId: string, inputField: { name: string; description: string; permission_ids: string[] }) {
    const { token } = setupAxios();
    return api
        .put(
            `/update-role/${roleId}`,
            token,
            {
                body: JSON.stringify({
                    name: inputField?.name,
                    description: inputField?.description,
                    permission_ids: inputField?.permission_ids,
                }),
            },
            true,
        )
        .then((res) => res);
}
