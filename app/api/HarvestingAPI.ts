import { setupAxios } from '@/src/components/auth/AuthHelpers';
import { api } from '../apiMiddleware/ApiMiddleWare';

export async function addHarvesting(
    userId: string,
    inputField: { labour: string; room: string; emptyWeight: string; filledWeight: string; supervisor: string; date: string; status: string; note: string },
) {
    const { token } = setupAxios();

    const res = await api.post(
        `/harvesting`,
        token,
        {
            body: JSON.stringify({
                labour_id: inputField?.labour,
                room_id: inputField?.room,
                supervisor_id: inputField?.supervisor,
                empty_weight: inputField?.emptyWeight,
                filled_weight: inputField?.filledWeight,
                status: inputField?.status,
                note: inputField?.note,
                date: inputField?.date,
                created_by: userId,
            }),
        },
        true,
    );
    return await res;
}
