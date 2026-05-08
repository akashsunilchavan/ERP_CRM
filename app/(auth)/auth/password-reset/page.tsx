import ComponentsAuthResetPasswordForm from '@/src/components/auth/components-auth-reset-password-form';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Recover Id Box',
};

const BoxedPasswordReset = () => {
    return (
        <div>
            <ComponentsAuthResetPasswordForm />
        </div>
    );
};

export default BoxedPasswordReset;
