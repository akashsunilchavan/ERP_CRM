'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { IRootState } from '@/store';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Modal } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faBellSlash, faBuilding, faChevronDown, faChevronUp, faCircleCheck, faInfoCircle, faPlus, faSignOut, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../auth/Auth';
import { getRecords } from '../CommonFunction';
import { useLocalStorage } from '@mantine/hooks';
import Dropdown from '../dropdown';
import { dateFormat } from '@/app/helpers/AssetHelpers';

type Notification = {
    message: string;
    description: string;
    updated_by: string;
    email: string;
    timestamp: string;
    Date: string;
    Time: string;
};

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();

    const { currentUser } = useAuth();

    const { logout } = useAuth();

    const [showNotificationModal, setShowNotificationModal] = useState(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [addCompanyOptionsModal, setAddCompanyOptionsModal] = useState(false);

    const [selectedCompanyId, setSelectedCompanyId] = useLocalStorage<string | null>({
        key: 'selectedCompanyId',
        defaultValue: null,
        serialize: (value) => {
            try {
                return JSON?.stringify(value);
            } catch {
                return JSON?.stringify(null);
            }
        },
        deserialize: (value) => {
            try {
                if (typeof value !== 'string') return null;
                const parsed = JSON?.parse(value);
                return typeof parsed === 'string' || parsed === null ? parsed : null;
            } catch {
                return null;
            }
        },
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const [notifications, setNotifications] = useState<{ data: Notification[] }>({ data: [] });

    const [companyName, setCompanyName] = useState<any>([]);

    const removeNotification = (index: number) => {
        setNotifications((prev) => ({
            ...prev,
            data: prev.data.filter((_, i) => i !== index),
        }));
    };

    const [companyRegistrationModal, setCompanyRegistrationModal] = useState(false);

    type Announcement = { id: number; message: string; type: 'warning' | 'info'; link: string };
    const [announcements, setAnnouncements] = useState<Announcement[]>([
        // {
        //     id: 1,
        //     message: 'Important: System maintenance scheduled for Saturday at 2 AM',
        //     type: 'warning',
        //     link: '/announcements/1',
        // },
        {
            id: 1,
            message: 'New feature: Tax filing automation now available!',
            type: 'info',
            link: '/announcements/1',
        },
    ]);
    const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (companyName?.data?.length > 0 && !selectedCompanyId) {
            const defaultCompanyId = companyName?.data[0]?.company_id;
            setSelectedCompanyId(defaultCompanyId);
            localStorage?.setItem('selectedCompanyId', defaultCompanyId);
        }
    }, [companyName, selectedCompanyId, setSelectedCompanyId]);

    return (
        <>
            <style jsx>{`
                @keyframes slideIn {
                    0% {
                        transform: translateX(100%);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }

                .animate-slide {
                    display: inline-block;
                    animation: slideIn 20s linear infinite;
                    animation-play-state: running;
                }

                .group:hover .animate-slide {
                    animation-play-state: paused;
                }

                @media (max-width: 768px) {
                    .animate-slide {
                        animation-duration: 15s;
                    }
                }

                @media (max-width: 480px) {
                    .animate-slide {
                        animation-duration: 10s;
                    }
                }
            `}</style>
            <header className="sticky top-0 left-0 right-0 z-40 border-b border-gray-200 shadow-sm bg-white/80 dark:bg-black/80 backdrop-blur-sm">
                <div className="shadow-sm ">
                    <div className="relative flex w-full items-center px-5 py-2.5 pl-0 dark:bg-black bg-[#FFFF]">
                        <div className="flex items-center justify-between horizontal-logo ltr:mr-2 rtl:ml-2 lg:hidden">
                            <Link href="/" className="flex items-center main-logo shrink-0"></Link>
                            <button
                                type="button"
                                className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
                                onClick={() => dispatch(toggleSidebar())}
                            >
                                <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex items-center justify-end space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
                            <div className="relative">
                                <Dropdown
                                    offset={[0, 8]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="relative flex items-center justify-center p-2 rounded-full bg-white/80 dark:bg-dark-800 hover:bg-white dark:hover:bg-dark-700 transition-all duration-200 shadow-sm hover:shadow-md"
                                    button={
                                        <div className="relative">
                                            <FontAwesomeIcon icon={faBell} className="text-lg text-gray-400 transition-transform dark:text-gray-300 hover:scale-110 animate-bell" />
                                            {notifications?.data?.length > 0 && (
                                                <span className="absolute flex w-3 h-3 -top-1 -right-1">
                                                    <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full animate-ping opacity-80"></span>
                                                    <span className="relative inline-flex items-center justify-center w-4 h-4 text-xs font-medium text-white bg-green-500 rounded-full">
                                                        {notifications?.data?.length}
                                                    </span>
                                                </span>
                                            )}
                                        </div>
                                    }
                                >
                                    <div className="w-[320px] overflow-hidden rounded-xl bg-white shadow-xl dark:bg-dark-800 dark:shadow-lg sm:w-[360px] cursor-pointer">
                                        <div className="border-b border-gray-100 dark:border-dark-700">
                                            <div className="flex items-center justify-between px-5 py-3">
                                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Notifications</h4>
                                                {notifications?.data?.length > 0 && (
                                                    <span className="px-2 py-1 text-xs font-medium text-white bg-green-500 rounded-full">{notifications?.data?.length} New</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="max-h-[400px] overflow-y-auto">
                                            {notifications?.data?.length > 0 ? (
                                                <>
                                                    {notifications?.data?.slice(0, 4)?.map((notification, index) => (
                                                        <div
                                                            key={index}
                                                            className="transition-colors border-b border-gray-100 hover:bg-gray-50 dark:border-dark-700 dark:hover:bg-dark-700/50"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <div className="flex items-start p-4">
                                                                <div className="mr-3 mt-0.5 shrink-0 rounded-full bg-yellow-100 p-2 dark:bg-dark-600">
                                                                    <FontAwesomeIcon icon={faBell} className="w-4 h-4 text-yellow-500 dark:text-blue-300" />
                                                                </div>

                                                                <div className="flex-1">
                                                                    <h6 className="font-medium text-gray-900 dark:text-white">{notification.message}</h6>
                                                                    {notification.description && <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{notification.description}</p>}
                                                                    <div className="flex items-center justify-between mt-2">
                                                                        <span className="text-xs text-gray-500 dark:text-gray-400">{notification.updated_by}</span>
                                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                            {dateFormat(notification?.Date)} {notification.Time}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <button className="text-lg text-gray-200 hover:text-red-600" onClick={() => removeNotification(index)}>
                                                                    <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {notifications?.data?.length > 4 && (
                                                        <div className="transition-colors bg-gray-50 hover:bg-gray-100 dark:bg-dark-700/50 dark:hover:bg-dark-700" onClick={(e) => e.stopPropagation()}>
                                                            <button
                                                                type="button"
                                                                className="w-full px-5 py-3 text-sm font-medium text-center text-blue-500"
                                                                onClick={() => setShowNotificationModal(true)}
                                                            >
                                                                View All Notifications
                                                            </button>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center p-6 text-center" onClick={(e) => e?.stopPropagation()}>
                                                    <div className="p-4 mb-4 bg-gray-100 rounded-full dark:bg-dark-600">
                                                        <FontAwesomeIcon icon={faBellSlash} className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                                                    </div>
                                                    <h5 className="mb-1 text-gray-900 dark:text-white">No notifications</h5>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">You're all caught up</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Dropdown>
                            </div>

                            <div className="flex dropdown shrink-0">
                                <Dropdown
                                    offset={[0, 8]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="relative block p-2 rounded-full transition-colors duration-200"
                                    button={
                                        <div className="flex items-center">
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center justify-center w-8 h-8 font-semibold text-white rounded-full shadow-lg sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600">
                                                    {currentUser?.user?.first_name?.[0]}
                                                </div>{' '}
                                                <span className="font-bold text-gray-800">{currentUser?.user?.first_name}</span>
                                            </div>
                                        </div>
                                    }
                                    onOpenChange={(open: boolean) => setIsDropdownOpen(open)}
                                    onChange={() => setIsDropdownOpen(true)}
                                >
                                    <ul className="w-[360px] max-h-[80vh] h-auto overflow-y-auto !py-0 font-medium text-gray-800 bg-white rounded-lg shadow-xl border border-gray-100">
                                        <li className="px-4 py-4 border-b border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <div className="flex items-center justify-center w-8 h-8 font-semibold text-white rounded-full shadow-lg sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600">
                                                        {currentUser?.user?.first_name?.[0]}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="flex items-center gap-1 text-base font-semibold">
                                                        {currentUser?.user?.first_name} {currentUser?.user?.last_name}
                                                        <svg className="h-3.5 w-3.5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                                                        </svg>
                                                    </h4>
                                                    <a href={`mailto:${currentUser?.user?.email}`} className="text-sm text-gray-500 transition-colors hover:text-blue-500">
                                                        {currentUser?.user?.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </li>

                                        <li className="px-4 py-3 border-b border-gray-100">
                                            <div className="flex gap-2">
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-gray-700 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
                                                >
                                                    <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                                                    <span>Profile</span>
                                                </Link>
                                            </div>
                                        </li>

                                        <li className="px-4 py-3 border-t border-gray-100">
                                            <Button
                                                onClick={logout}
                                                leftSection={<FontAwesomeIcon icon={faSignOut} className="w-4 h-4" />}
                                                variant="filled"
                                                color="red"
                                                radius="md"
                                                className="flex items-center justify-center w-full gap-2 px-4 py-2"
                                            >
                                                Sign Out
                                            </Button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <Modal
                opened={showNotificationModal}
                onClose={() => {
                    setShowNotificationModal(false);
                }}
                size="50rem"
                withCloseButton={false}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                transitionProps={{
                    transition: 'fade',
                    duration: 400,
                    timingFunction: 'linear',
                }}
                centered
                closeOnClickOutside={false}
            >
                <Modal.Header className="flex justify-between p-0 border-b">
                    <Modal.Title>
                        <div className="text-lg font-bold text-[#26448C]">
                            All Notifications{' '}
                            {notifications?.data?.length > 0 && (
                                <span className="inline-flex items-center justify-center px-2 py-1 ml-2 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                                    {notifications?.data?.length}
                                </span>
                            )}
                        </div>
                    </Modal.Title>
                    <button
                        onClick={() => {
                            setShowNotificationModal(false);
                        }}
                        className="text-xl text-gray-500 hover:text-red-600"
                    >
                        <FontAwesomeIcon icon={faXmark} size="lg" />
                    </button>
                </Modal.Header>

                <Modal.Body className="p-0 mt-5 mb-5 border-b">
                    <div className="divide-y divide-gray-200 dark:divide-dark-700">
                        {notifications?.data?.length > 0 ? (
                            notifications?.data?.map((notification, index) => (
                                <div key={index} className="px-6 py-4 transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-dark-700/50">
                                    <div className="flex gap-3">
                                        <div className="p-2 mt-1 rounded-lg shrink-0 ">
                                            <FontAwesomeIcon icon={faBell} className="w-4 h-4 text-yellow-500 " />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900 dark:text-white">{notification?.message ?? '-'}</h3>

                                            {notification?.description && <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{notification?.description ?? '-'}</p>}

                                            <div className="flex flex-wrap items-center justify-between gap-2 mt-3 text-xs">
                                                <span className="text-gray-500 dark:text-gray-400">
                                                    <span className="font-medium">By:</span> {notification?.updated_by ?? '-'}
                                                </span>
                                                <span className="text-gray-500 dark:text-gray-400">
                                                    {dateFormat(notification?.Date ?? '-')} • {notification?.Time ?? '-'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                                <div className="p-4 mb-4 bg-gray-100 rounded-full dark:bg-dark-600">
                                    <FontAwesomeIcon icon={faBellSlash} className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                                </div>
                                <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">No notifications</h3>
                                <p className="text-gray-500 dark:text-gray-400">You're all caught up with your notifications</p>
                            </div>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Header;
