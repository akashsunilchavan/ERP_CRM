import { AccountingReports } from '@/src/components/account/AccountingReports';
import { InvoicesManagement } from '@/src/components/account/InvoicesManagement';
import { LedgerManagement } from '@/src/components/account/LedgerManagement';
import { AccountsDashboard } from '@/src/components/dashboard/AccountsDashboard';
import React from 'react';

const page = () => {
    return (
        <div>
            <AccountingReports />
        </div>
    );
};

export default page;
