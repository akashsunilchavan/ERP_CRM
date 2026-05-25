import LeadDetailsPage from '@/src/components/sales/LeadDetailsPage';
import { SiteVisitsManagement } from '@/src/components/sales/SiteVisitsManagement';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: 'Profile',
};

const ProfilePage = () => {
    return <SiteVisitsManagement />;
};

export default ProfilePage;
