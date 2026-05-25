
import { ReportsManagement } from '@/src/components/sales/ReportsManagement';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: 'Profile',
};

const ProfilePage = () => {
    return <ReportsManagement />;
};

export default ProfilePage;
