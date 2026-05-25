import LeadDetailsPage from '@/src/components/sales/LeadDetailsPage';
import { OrdersManagement } from '@/src/components/sales/OrdersManagement';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: 'Profile',
};

const ProfilePage = () => {
    return <OrdersManagement  />;
};

export default ProfilePage;
