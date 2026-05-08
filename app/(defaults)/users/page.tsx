import Users from '@/src/components/user_roles/Users';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: 'Users',
};

const User = () => {
    return <Users />;
};

export default User;
