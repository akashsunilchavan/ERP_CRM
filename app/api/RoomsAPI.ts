import { setupAxios } from '@/src/components/auth/AuthHelpers';
import { api } from '../apiMiddleware/ApiMiddleWare';

export async function getRoomsById(roomId: string) {
    const { token } = setupAxios();
    return api.get(`/rooms/${roomId}`, token, false);
}

export async function addRooms(inputField: { roomName: string; roomNumber: string; roomArea: string; roomDescription: string; roomStatus: string }) {
    const { token } = setupAxios();

    const res = await api.post(
        `/rooms`,
        token,
        {
            body: JSON.stringify({
                room_name: inputField?.roomName,
                room_number: inputField?.roomNumber,
                room_area: inputField?.roomArea,
                room_description: inputField?.roomDescription,
                room_status: inputField?.roomStatus,
            }),
        },
        true,
    );
    return await res;
}

export async function updateRooms(roomId: string, inputField: { roomName: string; roomNumber: string; roomArea: string; roomDescription: string; roomStatus: string }) {
    const { token } = setupAxios();

    const res = await api.put(
        `/rooms/${roomId}`,
        token,
        {
            body: JSON.stringify({
                room_name: inputField?.roomName,
                room_number: inputField?.roomNumber,
                room_area: inputField?.roomArea,
                room_description: inputField?.roomDescription,
                room_status: inputField?.roomStatus,
            }),
        },
        true,
    );
    return await res;
}
