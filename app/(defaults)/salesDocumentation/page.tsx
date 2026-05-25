import SalesDashboard from '@/src/components/dashboard/SalesDashboard';
import Profile from '@/src/components/profile/Profile';
import { DocumentationManagement } from '@/src/components/sales/DocumentationManagement';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: 'Profile',
};

const ProfilePage = () => {
    return <DocumentationManagement />;
};

export default ProfilePage;
