
import { EnquiriesManagement } from '@/src/components/sales/EnquiriesManagement';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: 'Profile',
};

const ProfilePage = () => {
    return <EnquiriesManagement />;
};

export default ProfilePage;
