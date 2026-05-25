import SalesDashboard from '@/src/components/dashboard/SalesDashboard';
import Profile from '@/src/components/profile/Profile';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: 'Profile',
};

const ProfilePage = () => {
    return <SalesDashboard />;
};

export default ProfilePage;
