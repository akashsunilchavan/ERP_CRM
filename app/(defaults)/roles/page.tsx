import Roles from '@/src/components/user_roles/Roles';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: 'Roles',
};

const Role = () => {
    return <Roles />;
};

export default Role;
