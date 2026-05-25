import SalesDashboard from '@/src/components/dashboard/SalesDashboard';
import Profile from '@/src/components/profile/Profile';
import { CustomersManagement } from '@/src/components/sales/CustomersManagement';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: 'Profile',
};

const ProfilePage = () => {
    return <CustomersManagement />;
};

export default ProfilePage;
