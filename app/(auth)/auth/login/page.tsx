import ComponentsAuthLoginForm from '@/src/components/auth/components-auth-login-form';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Login',
};

const BoxedSignIn = () => {
    return <ComponentsAuthLoginForm />;
};

export default BoxedSignIn;
