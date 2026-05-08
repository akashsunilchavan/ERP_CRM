import Profile from '@/src/components/profile/Profile';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: 'Profile',
};

const ProfilePage = () => {
    return <Profile />;
};

export default ProfilePage;
