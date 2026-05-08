import { getRoomsById } from '@/app/api/RoomsAPI';
import { Message } from '@/app/helpers/AssetHelpers';

export const fetchRoomDetailsById = async (roomId: any, setInputField: Function) => {
    try {
        await getRoomsById(roomId)?.then((res) => {
            if (res?.statusCode === 200) {
                setInputField({
                    roomName: res?.data?.room_name,
                    roomNumber: res?.data?.room_number,
                    roomArea: res?.data?.room_area,
                    roomDescription: res?.data?.room_description,
                    roomStatus: res?.data?.room_status,
                });
            } else {
                Message(res?.message, 'error');
            }
        });
    } catch (error) {
        Message('Error fetching user details', 'error');
    }
};
