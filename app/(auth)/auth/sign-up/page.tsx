import ComponentsAuthRegisterForm from '@/src/components/auth/components-auth-register-form';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Register Boxed',
};

const BoxedSignUp = () => {
    return <ComponentsAuthRegisterForm />;
};

export default BoxedSignUp;
