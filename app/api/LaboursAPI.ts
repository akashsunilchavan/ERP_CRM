import { setupAxios } from '@/src/components/auth/AuthHelpers';
import { api } from '../apiMiddleware/ApiMiddleWare';
import { Truck } from 'lucide-react';

export async function getLabourById(labourId: string) {
    const { token } = setupAxios();
    return await api.get(`/labours/${labourId}`, token, false);
}

export async function addLabour(formData: FormData) {
    const { token } = setupAxios();

    const res = await api.post(
        `/labours`,
        token,
        {
            body: formData,
        },
        true,
        true
    );
    return res;
}

export async function updateLabour(labourId: string, formData: FormData) {
    const { token } = setupAxios();

    const res = await api.put(
        `/labours/${labourId}`,
        token,
        {
            body: formData,
        },
        true,
    );
    return res;
}
