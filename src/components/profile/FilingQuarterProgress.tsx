import { getUsersById, updateFilingStatus } from '@/app/api/UsersAPI';
import { faCheckCircle, faClock, faInfoCircle, faExclamationTriangle, faFileInvoiceDollar, faBuilding, faEllipsisV, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover, Button } from '@mantine/core';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useAuth } from '../auth/Auth';
import { getCompanyData } from '@/app/api/CompanyFormationAPI';
import { useLocalStorage } from '@mantine/hooks';

interface Filing {
    startDate: string;
    endDate: string;
    status: string;
    year: number;
    quarter: number;
    type?: 'vat' | 'corporate';
    filling_id?: string;
}

interface FilingQuarterProgressProps {
    filing: Filing;
    type?: 'vat' | 'corporate';
    onInitializeFiling?: () => void;
    onChangeStatus?: () => void; // new prop
    company?: any;
    setUserData?: any;
    uses?: string;
}

export const FilingQuarterProgress: React.FC<FilingQuarterProgressProps> = ({ filing, type, onInitializeFiling, onChangeStatus, setUserData, uses }) => {
    const { currentUser } = useAuth();
    const filingType = type || filing.type || 'vat';
    const today = dayjs();
    const endDate = dayjs(filing.endDate);
    const startDate = dayjs(filing.startDate);
    

    const totalDays = endDate.diff(startDate, 'day');
    const daysPassed = today.diff(startDate, 'day');
    const daysRemaining = endDate.diff(today, 'day');
    const progressPercentage = Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);
    const isOverdue = daysRemaining < 0;

    const statusConfig = {
        upcoming: {
            color: 'text-gray-500 bg-gray-100',
            progress: 'bg-gray-300',
            text: 'Upcoming',
            icon: faClock,
            border: 'border-gray-300',
            showIcon: false,
        },
        inProgress: {
            color: 'text-yellow-600 bg-yellow-50',
            progress: 'bg-yellow-500',
            text: 'In Progress',
            icon: faInfoCircle,
            border: 'border-yellow-400',
            showIcon: true,
        },
        overdue: {
            color: 'text-red-600 bg-red-50',
            progress: 'bg-red-500',
            text: 'Overdue',
            icon: faExclamationTriangle,
            border: 'border-red-500',
            showIcon: false,
        },
        completed: {
            color: 'text-emerald-600 bg-emerald-50',
            progress: 'bg-emerald-500',
            text: 'Completed',
            icon: faCheckCircle,
            border: 'border-emerald-500',
            showIcon: false,
        },
    };

    const currentStatus = statusConfig[filing.status as keyof typeof statusConfig] || statusConfig.upcoming;

    const [opened, setOpened] = useState(false);

    const [selectedCompanyId, setSelectedCompanyId] = useLocalStorage<string | null>({
        key: 'selectedCompanyId',
        defaultValue: null,
        getInitialValueInEffect: false,
    });

    return (
        <div className={`border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-all duration-200 h-full relative group ${currentStatus.border}`}>
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${currentStatus?.color}`}>
                        <FontAwesomeIcon icon={filingType === 'vat' ? faFileInvoiceDollar : faBuilding} className="text-sm" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Q{filing.quarter}</h4>
                        {/* <p className="text-xs text-gray-500 capitalize">{filingType} Filing</p> */}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${currentStatus.color} font-medium`}>
                        {currentStatus.showIcon && <FontAwesomeIcon icon={faExclamationCircle} className="text-yellow-500 mr-1" />}
                        {currentStatus.text}
                    </span>

                    {(filing?.status === 'overdue' || filing?.status === 'inProgress') && (
                        <Popover opened={opened} onChange={setOpened} position="bottom" shadow="md">
                            <Popover.Target>
                                <button onClick={() => setOpened((o) => !o)} className="p-2 rounded-full hover:bg-gray-100 transition">
                                    <FontAwesomeIcon icon={faEllipsisV} className="text-gray-600" />
                                </button>
                            </Popover.Target>

                            <Popover.Dropdown className="p-1">
                                <div className="flex flex-col space-y-2">
                                    {onInitializeFiling && (
                                        <Button
                                            size="xs"
                                            color="#26448C"
                                            radius="md"
                                            onClick={() => {
                                                onInitializeFiling();
                                                setOpened(false);
                                            }}
                                        >
                                            Initialize Filing
                                        </Button>
                                    )}
                                    <Button
                                        className="bg-gray-600 hover:bg-gray-700"
                                        radius="md"
                                        size="xs"
                                        onClick={async () => {
                                            setOpened(false);
                                            await updateFilingStatus(filing?.filling_id, 'completed').then(async (res) => {
                                                if (res?.statusCode === 200) {
                                                    if (uses === 'Profile') {
                                                        await getUsersById(currentUser?.user?.user_id ?? '').then((res) => {
                                                            if (res?.statusCode === 200) {
                                                                setUserData(res);
                                                            }
                                                        });
                                                    } else if (uses === 'Company') {
                                                        await getCompanyData(selectedCompanyId ?? '')?.then((res) => {
                                                            if (res?.statusCode === 200) {
                                                                setUserData(res?.data);
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }}
                                    >
                                        Filing Already Done
                                    </Button>
                                </div>
                            </Popover.Dropdown>
                        </Popover>
                    )}
                </div>
            </div>

            <div className="">
                <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                    <span>{startDate.format('MMM D')}</span>
                    <span>{endDate.format('MMM D, YYYY')}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className={`h-2 rounded-full ${currentStatus.progress} transition-all duration-300`} style={{ width: `${progressPercentage}%` }}></div>
                </div>
                {/* <div className="text-xs text-gray-500 mt-1.5 text-center">
                    {Math.round(progressPercentage)}% complete • {isOverdue ? `${Math.abs(daysRemaining)} days overdue` : `${daysRemaining} days left`}
                </div> */}
            </div>
        </div>
    );
};
