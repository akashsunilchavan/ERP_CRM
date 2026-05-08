'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from '../auth/Auth';
import { getRecords } from '../CommonFunction';
import { motion } from 'framer-motion';
import { AddVat } from '../dashboard/AddVat';
import { AddCorporateTax } from '../dashboard/AddCorporateTax';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBuildingCircleArrowRight, faCalendarAlt, faCheckCircle, faChevronDown, faEdit, faFileAlt, faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons';
import { Accordion, Button } from '@mantine/core';
import EditCompanyModal from '../services/addCompany/EditCompanyModal';
import EditUserModal from './EditUserModal';
import BankDetailsModal from '../dashboard/BankDetailsModal';
import AddBankDetails from '../dashboard/AddBankDetails';
import { ModalModeType } from '../formationPackages/AddFormationPackages';
import { useDisclosure } from '@mantine/hooks';

import Swal from 'sweetalert2';
import { FilingDetailsModal } from '../dashboard/FilingDetailsModal';
import { FilingQuarterProgress } from './FilingQuarterProgress';
import { getUsersById } from '@/app/api/UsersAPI';
import { getBankAccountDetailsByCompanyId } from '@/app/api/BankAccountAPI';
import { checkRole } from '@/app/helpers/AssetHelpers';
import { RoleContextValue } from '../types/OthersTypes';
import roleContext from '../context/roleContext';
import { setSelectedCompanyId } from '@/store/documentsSlice';
import { getCompaniesByUserId } from '@/app/api/AddCompanyAPI';

const Profile = () => {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState<any>();
    const [vatNumber, setVatNumber] = useState();

    let roleState: RoleContextValue = useContext(roleContext);

    const [filingFilter, setFilingFilter] = useState({
        status: 'pending',
        type: 'corporate',
        year: '2025',
    });
    const [selectedFiling, setSelectedFiling] = useState<any>(null);
    const [opened, { open, close }] = useDisclosure(false);

    const [modalMode, setModalMode] = useState<ModalModeType>('create');

    const [editUserModalOpened, setEditUserModalOpened] = useState(false);

    const [corporateTaxNumber, setCorporateTaxNumber] = useState();
    const [viewBankDetailsModal, setViewBankDetailsModal] = useState(false);

    const [banksDetails, setBanksDetails] = useState<any>(null);
    const [editCompanyModalOpened, setEditCompanyModalOpened] = useState(false);
    const [bankAccountModalOpened, setBankAccountModalOpened] = useState(false);
    const [loadingBankDetails, setLoadingBankDetails] = useState(false);

    const [filingDatesData, setFilingDatesData] = useState<any>(null);

    const [selectedCompany, setSelectedCompany] = useState<any>();

    useEffect(() => {
        let mounted = true;
        if (mounted && currentUser?.user?.user_id) {
            fetchUserData();

            getRecords(
                `get-filing-dates?userId=${currentUser?.user?.user_id}&companyId=${selectedCompany}&status=${filingFilter.status}&year=${filingFilter.year}&type=${filingFilter.type}`,
                (data: any) => {
                    setFilingDatesData(data);
                },
            );
        }

        return () => {
            mounted = false;
        };
    }, [currentUser?.user?.user_id, filingFilter, selectedCompany]);

    const fetchUserData = async () => {
        try {
            getUsersById(currentUser?.user?.user_id ?? '')?.then((res) => {
                if (res?.statusCode === 200) {
                    setUserData(res);
                }
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleViewBankDetails = async (company: any) => {
        setSelectedCompany(company);
        setLoadingBankDetails(true);
        try {
            getBankAccountDetailsByCompanyId(company?.company_id)?.then((res) => {
                if (res?.statusCode === 200) {
                    setBanksDetails(res);
                } else {
                    setBanksDetails(null);
                }
            });
        } catch (error) {
            console.error('Error fetching bank details:', error);
            setBanksDetails(null);
        } finally {
            setLoadingBankDetails(false);
            setViewBankDetailsModal(true);
        }
    };

    const refreshData = () => {
        fetchUserData();
    };
    const handleEditCompany = (company: any) => {
        setSelectedCompany(company);
        setEditCompanyModalOpened(true);
    };

    const refreshCompanyData = () => {
        if (currentUser?.user?.user_id) {
            getRecords(`users/${currentUser?.user?.user_id}`, (data: any) => {
                setUserData(data);
            });
        }
    };

    useEffect(() => {
        let mounted = true;
        if (mounted && currentUser?.user?.user_id) {
            fetchUserData();
        }

        return () => {
            mounted = false;
        };
    }, [currentUser?.user?.user_id]);

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-12xl mx-auto space-y-6">
                {userData?.data && (
                    <>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 text-center">
                            <div className="relative">
                                <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                                    <div className="relative w-24 h-24">
                                        <div className="w-full h-full rounded-full border-4 border-white bg-white flex items-center justify-center overflow-hidden shadow-lg mx-auto">
                                            <img src="/assets/images/businessWorld/avatar.svg" alt={userData?.data?.first_name} className="w-full h-full object-cover"></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-16 pb-6 px-6">
                                <div className="space-y-4">
                                    <div className="flex justify-center items-center gap-2">
                                        <h2 className="text-xl font-bold text-gray-900">
                                            {userData?.data?.first_name} {userData?.data?.last_name}
                                        </h2>
                                        <Button variant="subtle" size="xs" onClick={() => setEditUserModalOpened(true)} leftSection={<FontAwesomeIcon icon={faEdit} />}>
                                            Edit
                                        </Button>{' '}
                                    </div>
                                    <p className="text-gray-500 text-sm">{userData?.data?.email}</p>

                                    <div className="flex gap-2 justify-center">
                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Verified</span>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 pt-2">
                                        <div>
                                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Phone</p>
                                            <p className="text-gray-900">+ {userData?.data?.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Member since</p>
                                            <p className="text-gray-900">
                                                {new Date(userData?.data?.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Connect</h4>
                                        <div className="flex space-x-4 justify-center">
                                            <a
                                                href={`https://www.linkedin.com/company/rbktechnologies`}
                                                className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                                                aria-label="LinkedIn"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                            <div className="p-6">
                                <div className="flex items-center mb-6 justify-between">
                                    <div className="flex items-center">
                                        <div className="bg-indigo-100 p-3 rounded-xl mr-4 shadow-sm">
                                            <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Registered Companies</h3>
                                            <p className="text-sm text-gray-500">Your business affiliations and details</p>
                                        </div>
                                    </div>
                                    <div className="text-indigo-600 font-medium text-sm">{userData?.data?.Companies?.length || 0} Companies</div>
                                </div>

                                <div className="relative">
                                    {userData?.data?.Companies?.length > 0 ? (
                                        <div className="overflow-y-auto max-h-[600px] pr-3 -mr-3 custom-scrollbar">
                                            <div className="space-y-5 pb-3">
                                                {userData?.data?.Companies?.map((company: any, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="group relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-indigo-100 cursor-pointer"
                                                    >
                                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="text-xl font-bold text-gray-800 flex items-center">
                                                                    <span className="p-2 rounded-lg text-blue-600 shadow-sm mr-2">🏢</span>
                                                                    {company?.company_name}
                                                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                                        #{index + 1}
                                                                    </span>
                                                                </h4>
                                                            </div>

                                                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                                                <Button size="xs" onClick={() => handleEditCompany(company)} variant="transparent" radius="md" className="w-full sm:w-auto">
                                                                    <FontAwesomeIcon icon={faEdit} />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        {(!company?.vat_number || !company?.corporate_number) && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="bg-yellow-50 border-l-4 border-yellow-400 p-1 rounded-lg shadow-sm mb-4"
                                                            >
                                                                <div className="flex items-start">
                                                                    <div className="flex-shrink-0 pt-0.5">
                                                                        <FontAwesomeIcon icon={faWarning} className="h-5 w-5 text-yellow-500" />
                                                                    </div>
                                                                    <div className="ml-3 flex-1">
                                                                        <p className="text-sm font-medium text-yellow-800">
                                                                            {!company?.vat_number && !company?.corporate_number
                                                                                ? 'Missing both VAT and Corporate Tax numbers'
                                                                                : !company?.vat_number
                                                                                  ? 'Missing VAT registration number'
                                                                                  : 'Missing Corporate Tax number'}
                                                                        </p>
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 flex-wrap">
                                                                            {!company?.vat_number && (
                                                                                <AddVat
                                                                                    vatNumber={company?.vat_number}
                                                                                    setVatNumber={setVatNumber}
                                                                                    type="profile"
                                                                                    companyId={company?.company_id}
                                                                                    setUserData={setUserData}
                                                                                />
                                                                            )}
                                                                            {!company?.corporate_number && (
                                                                                <AddCorporateTax
                                                                                    corporateTaxNumber={company?.corporate_number}
                                                                                    setCorporateTaxNumber={setCorporateTaxNumber}
                                                                                    type="profile"
                                                                                    companyId={company?.company_id}
                                                                                    setUserData={setUserData}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                                <p className="text-xs font-medium text-gray-500 mb-1">Trade License</p>
                                                                <div className="text-sm font-medium text-gray-800 flex items-center">
                                                                    {company?.trade_license ? (
                                                                        <>
                                                                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-500" />
                                                                            {company?.trade_license}
                                                                        </>
                                                                    ) : (
                                                                        <span className="text-gray-400 flex items-center">
                                                                            {' '}
                                                                            <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-gray-400" />
                                                                            Not provided
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                                <p className="text-xs font-medium text-gray-500 mb-1">VAT Number</p>
                                                                <div className="text-sm font-medium text-gray-800 flex items-center">
                                                                    {company?.vat_number ? (
                                                                        <>
                                                                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-500" />

                                                                            {company.vat_number}
                                                                        </>
                                                                    ) : (
                                                                        <span className="text-gray-400 flex items-center">
                                                                            <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-gray-400" />
                                                                            Not provided
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                                <p className="text-xs font-medium text-gray-500 mb-1">Corporate Tax</p>
                                                                <div className="text-sm font-medium text-gray-800 flex items-center">
                                                                    {company?.corporate_number ? (
                                                                        <>
                                                                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-500" />

                                                                            {company?.corporate_number}
                                                                        </>
                                                                    ) : (
                                                                        <span className="text-gray-400 flex items-center">
                                                                            <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-gray-400" />
                                                                            Not provided
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                                <p className="text-xs font-medium text-gray-500 mb-1">Bank Details</p>
                                                                <div className="text-sm font-medium text-gray-800 flex items-center">
                                                                    <div
                                                                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group"
                                                                        onClick={() => handleViewBankDetails(company)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faBuildingCircleArrowRight} className="group-hover:translate-x-0.5 transition-transform" />
                                                                        <span className="border-b border-blue-600 border-dashed group-hover:border-blue-800 pb-0.5">View Bank Details</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Accordion variant="separated" radius="md">
                                                            <Accordion.Item value="overview">
                                                                <Accordion.Control
                                                                    icon={<FontAwesomeIcon icon={faCalendarAlt} className="text-blue-600" />}
                                                                    chevron={<FontAwesomeIcon icon={faChevronDown} />}
                                                                >
                                                                    Filing Status Overview
                                                                </Accordion.Control>
                                                                <Accordion.Panel>
                                                                    {company?.vatFilings?.length > 0 && (
                                                                        <div className="mb-5">
                                                                            <h5 className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-3 flex items-center">
                                                                                <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                                                                                VAT Quarterly Filings
                                                                            </h5>
                                                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                                                                {company?.vatFilings?.map((filing: any, index: any) => (
                                                                                    <FilingQuarterProgress
                                                                                        key={`vat-${index}`}
                                                                                        filing={filing}
                                                                                        type="vat"
                                                                                        onInitializeFiling={async () => {
                                                                                            // Check if user has VAT filing services role
                                                                                            const hasVatFilingServices = checkRole(['vat filing services'], roleState?.features);

                                                                                            if (hasVatFilingServices) {
                                                                                                // User has the role, redirect to VAT filing services
                                                                                                window.location.href = '/services/vatfiling';
                                                                                            } else {
                                                                                                // User doesn't have the role, show purchase plan alert
                                                                                                const result = await Swal.fire({
                                                                                                    title: 'Purchase Plan Required',
                                                                                                    text: 'You need to purchase a plan to access VAT filing services.',
                                                                                                    icon: 'warning',
                                                                                                    showCancelButton: true,
                                                                                                    confirmButtonText: 'Go to Dashboard',
                                                                                                    cancelButtonText: 'Cancel',
                                                                                                    confirmButtonColor: '#3085d6',
                                                                                                    cancelButtonColor: '#d33',
                                                                                                });

                                                                                                if (result.isConfirmed) {
                                                                                                    // User clicked "Go to Dashboard"
                                                                                                    window.location.href = '/dashboard';
                                                                                                }
                                                                                            }
                                                                                        }}
                                                                                        setUserData={setUserData}
                                                                                        uses="Profile"
                                                                                    />
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    {company?.corporateFilings?.length > 0 && (
                                                                        <div className="mb-5">
                                                                            <h5 className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-3 flex items-center">
                                                                                <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                                                                                Corporate Annual Filings
                                                                            </h5>
                                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                                                {company?.corporateFilings?.map((filing: any, index: any) => (
                                                                                    <FilingQuarterProgress
                                                                                        key={`corporate-${index}`}
                                                                                        filing={{
                                                                                            ...filing,
                                                                                            type: 'corporate',
                                                                                            filling_id: filing.filling_id || `corporate-${index}-${filing.year}`,
                                                                                        }}
                                                                                        type="corporate"
                                                                                        onInitializeFiling={async () => {
                                                                                            // Check if user has corporate filing services role
                                                                                            const hasCorporateFilingServices = checkRole(['corporate filing services'], roleState?.features);

                                                                                            if (hasCorporateFilingServices) {
                                                                                                // User has the role, redirect to corporate filing services
                                                                                                window.location.href = '/services/corporatefiling';
                                                                                            } else {
                                                                                                // User doesn't have the role, show purchase plan alert
                                                                                                const result = await Swal.fire({
                                                                                                    title: 'Purchase Plan Required',
                                                                                                    text: 'You need to purchase a plan to access Corporate filing services.',
                                                                                                    icon: 'warning',
                                                                                                    showCancelButton: true,
                                                                                                    confirmButtonText: 'Go to Dashboard',
                                                                                                    cancelButtonText: 'Cancel',
                                                                                                    confirmButtonColor: '#3085d6',
                                                                                                    cancelButtonColor: '#d33',
                                                                                                });

                                                                                                if (result.isConfirmed) {
                                                                                                    // User clicked "Go to Dashboard"
                                                                                                    window.location.href = '/dashboard';
                                                                                                }
                                                                                            }
                                                                                        }}
                                                                                        setUserData={setUserData}
                                                                                        uses="Profile"
                                                                                    />
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    {(!company?.vatFilings || company?.vatFilings?.length === 0) &&
                                                                        (!company?.corporateFilings || company?.corporateFilings?.length === 0) && (
                                                                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                                                                <img
                                                                                    src="/assets/images/businessWorld/WorkInProgress.svg"
                                                                                    alt="No Filings"
                                                                                    className="w-24 h-24 mx-auto mb-3 object-contain"
                                                                                />{' '}
                                                                                <h3 className="text-base font-medium text-gray-700 mb-1">No Filings Found</h3>
                                                                                <p className="text-gray-500 text-sm">There are no VAT or Corporate filings for this company.</p>
                                                                            </div>
                                                                        )}
                                                                </Accordion.Panel>
                                                            </Accordion.Item>
                                                        </Accordion>

                                                        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-100">
                                                            <div className="flex items-center text-sm text-gray-500">
                                                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                    />
                                                                </svg>
                                                                Member since{' '}
                                                                {new Date(company?.createdAt)?.toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    year: 'numeric',
                                                                })}
                                                            </div>
                                                        </div>
                                                        <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-indigo-100 rounded-tr-xl"></div>
                                                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-indigo-100 rounded-bl-xl"></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center gap-4 py-12 px-4 text-center">
                                            <img src="/assets/images/businessWorld/WorkInProgress.svg" alt="No Companies" className="w-48 h-48 object-contain opacity-75" />
                                            <div className="text-lg font-bold text-gray-700">No Companies Registered</div>
                                            <p className="text-gray-500 max-w-md">You haven't registered any companies yet. Add your first company to get started with all the features.</p>
                                            <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium">Add Company</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {userData && (
                <EditUserModal
                    opened={editUserModalOpened}
                    onClose={() => setEditUserModalOpened(false)}
                    userData={{
                        ...userData,
                        user_id: currentUser?.user?.user_id,
                    }}
                    onSuccess={refreshData}
                />
            )}

            {selectedCompany && (
                <EditCompanyModal
                    opened={editCompanyModalOpened}
                    onClose={() => {
                        setEditCompanyModalOpened(false);
                        setSelectedCompany(null);
                    }}
                    companyData={{
                        company_id: selectedCompany?.company_id,
                        company_name: selectedCompany?.company_name,
                        vat_number: selectedCompany?.vat_number || '',
                        corporate_number: selectedCompany?.corporate_number || '',
                        status: selectedCompany?.status || 'active',
                        trade_license: selectedCompany?.trade_license || '',
                        vat_reg_date: selectedCompany?.vat_reg_date || '',
                        corporate_number_date: selectedCompany?.corporate_number_date || '',
                    }}
                    onSuccess={() => {
                        refreshCompanyData();
                    }}
                />
            )}

            {viewBankDetailsModal && (
                <BankDetailsModal
                    opened={viewBankDetailsModal}
                    onClose={() => setViewBankDetailsModal(false)}
                    bankDetails={banksDetails}
                    loading={loadingBankDetails}
                    selectedCompanyId={selectedCompany?.company_id}
                    setBanksDetails={setBanksDetails}
                />
            )}

            <FilingDetailsModal opened={opened} onClose={close} filing={selectedFiling} />

            {bankAccountModalOpened && (
                <AddBankDetails
                    bankAccountModalOpened={bankAccountModalOpened}
                    setBankAccountModalOpened={setBankAccountModalOpened}
                    selectedCompanyId={selectedCompany?.company_id}
                    modalMode={modalMode}
                />
            )}
        </div>
    );
};

export default Profile;
