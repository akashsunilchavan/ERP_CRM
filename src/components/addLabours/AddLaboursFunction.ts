import { getLabourById } from '@/app/api/LaboursAPI';

export const fetchLabourDetailsById = async (id: string, setFormData: any) => {
    try {
        getLabourById(id).then((res) => {
            if (res?.statusCode === 200) {
                setFormData({
                    firstName: res?.data?.first_name || '',
                    lastName: res?.data?.last_name || '',
                    contactNumber: res?.data?.contact_number || '',
                    address: res?.data?.address || '',
                    document: res?.data?.document || null,
                    status: res?.data?.status || 'active',
                });
            }
        });
    } catch (error) {
        console.error('Error fetching labour details:', error);
    }
};
