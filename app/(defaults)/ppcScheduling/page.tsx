import { Harvesting } from '@/src/components/harvesting/Harvesting';
import { PPCDashboard } from '@/src/components/ppc/PPCDashboard';
import { ProductionPlanning } from '@/src/components/ppc/ProductionPlanning';
import { SchedulingManagement } from '@/src/components/ppc/SchedulingManagement';
import React from 'react';

const page = () => {
    return (
        <div>
            <SchedulingManagement   />
        </div>
    );
};

export default page;
