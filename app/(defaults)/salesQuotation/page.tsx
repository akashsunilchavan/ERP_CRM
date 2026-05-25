import LeadDetailsPage from '@/src/components/sales/LeadDetailsPage';
import { QuotationsManagement } from '@/src/components/sales/QuotationsManagement';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: 'Profile',
};

const ProfilePage = () => {
    return <QuotationsManagement />;
};

export default ProfilePage;
