import LeadDetailsPage from '@/src/components/sales/LeadDetailsPage';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: 'Profile',
};

const ProfilePage = () => {
    return <LeadDetailsPage />;
};

export default ProfilePage;
