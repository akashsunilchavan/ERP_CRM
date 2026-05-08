'use client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faChevronDown,
    faChevronUp,
    faDashboard,
    faFolderOpen,
    faFileCirclePlus,
    faFileInvoice,
    faFileAlt,
    faHistory,
    faAddressCard,
    faFileInvoiceDollar,
    faBank,
    faBuilding,
    faUsersGear,
    faUsers,
    faUserCog,
    faUserPlus,
    faUserShield,
    faCity,
    faBell,
    faInfoCircle,
    faDollarSign,
    faMoneyBillAlt,
    faMoneyCheckDollar,
    faDoorOpen,
    faUserGroup,
    faTractor,
} from '@fortawesome/free-solid-svg-icons';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { setSelectedSidebarSection } from '@/store/selectedSidebarSection';
import { IRootState } from '@/store';
import { getTranslation } from '@/i18n';
import AnimateHeight from 'react-animate-height';
import Image from 'next/image';
import { RoleContextValue } from '../types/OthersTypes';
import roleContext from '../context/roleContext';
import { checkRole } from '@/app/helpers/AssetHelpers';

interface MenuItem {
    path: string;
    icon?: any;
    label: string;
    children?: MenuItem[];
    permissionKey?: string;
}

const Sidebar = () => {
    const dispatch = useDispatch();
    const { t } = getTranslation();
    const pathname = usePathname();

    let roleState: RoleContextValue = useContext(roleContext);

    const themeConfig = useSelector((state: IRootState) => state?.themeConfig);
    const semidark = useSelector((state: IRootState) => state?.themeConfig?.semidark);
    const selectedSidebarSection = useSelector((state: IRootState) => state?.SelectedSidebarSection?.selectedSidebarSection);

    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [isClient, setIsClient] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    useEffect(() => {
        setIsClient(true);
        dispatch(setSelectedSidebarSection(pathname));

        if (window?.innerWidth < 1024 && themeConfig?.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [pathname, dispatch]);

    const toggleMenu = (value: string) => {
        setCurrentMenu((prevMenu) => (prevMenu === value ? '' : value));
    };

    const handleMenuClick = (section: string) => {
        dispatch(setSelectedSidebarSection(section));

        if (window.innerWidth < 1024) {
            dispatch(toggleSidebar());
        }
    };

    const allMenuItems: MenuItem[] = [
        // {
        //     path: '/dashboard',
        //     icon: faDashboard,
        //     label: t('Dashboard'),
        // },
        {
            path: '/farmerDashboard',
            icon: faDashboard,
            label: t('Supervisor Dahboard'),
        },
        {
            path: '/adminDashboard',
            icon: faDashboard,
            label: t('Admin Dahboard'),
        },
         {
            path: '/harvesting',
            icon: faTractor,
            label: t('Harvesting'),
            // permissionKey: 'add rooms',
        },
        {
            path: '/addRooms',
            icon: faDoorOpen,
            label: t('Add Rooms'),
            // permissionKey: 'add rooms',
        },
        {
            path: '/addSupervisors',
            icon: faUsers,
            label: t('Add Supervisors'),
            // permissionKey: 'add rooms',
        },
        {
            path: '/addLabours',
            icon: faUserGroup,
            label: t('Add Labours'),
            // permissionKey: 'add rooms',
        },
       
        {
            path: 'user_roles',
            icon: faUsersGear,
            label: t('Users Config.'),
            // permissionKey: 'user management',
            children: [
                {
                    path: '/users',
                    label: t('Users'),
                    permissionKey: 'user management',
                },
                {
                    path: '/roles',
                    label: t('Roles'),
                    permissionKey: 'roles and permissions',
                },
            ],
        },

        // {
        //     path: 'myActivity',
        //     icon: faHistory,
        //     label: t('My Activity'),
        //     permissionKey: 'activity tracking',
        //     children: [
        //         {
        //             path: '/filing',
        //             label: t('Filing'),
        //             permissionKey: 'filing management',
        //         },
        //         {
        //             path: '/registration',
        //             label: t('Registration'),
        //             permissionKey: 'registration management',
        //         },
        //     ],
        // },
    ];

    const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
        return items?.filter((item) => {
            if (!item?.permissionKey) {
                return true;
            }

            const hasPermission = checkRole([item?.permissionKey], roleState?.features);

            if (item.children) {
                const filteredChildren = item.children.filter((child) => !child.permissionKey || checkRole([child.permissionKey], roleState.features));

                if (filteredChildren.length > 0) {
                    item.children = filteredChildren;
                    return true;
                }

                if (hasPermission) {
                    const { children, ...itemWithoutChildren } = item;
                    return true;
                }

                return false;
            }

            return hasPermission;
        });
    };

    const menuItems = filterMenuItems(allMenuItems);

    const Tooltip = ({ content, children }: { content: string; children: React.ReactNode }) => {
        const [isVisible, setIsVisible] = useState(false);

        return (
            <div className="relative inline-block">
                <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)} className="inline-flex items-center">
                    {children}
                </div>
                {isVisible && <div className="absolute z-50 left-full ml-2 w-48 p-2 text-xs bg-white dark:bg-gray-800 rounded shadow-lg border border-gray-200 dark:border-gray-700">{content}</div>}
            </div>
        );
    };
    if (!isClient) return null;

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed top-0 bottom-0 z-[60] h-full min-h-screen w-[200px] shadow-lg transform transition-all duration-300 ease-in-out
        ${themeConfig.sidebar ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between px-6 py-2 border-b border-gray-100 dark:border-gray-800">
                        <Link
                            href="/dashboard"
                            className="main-logo flex shrink-0 items-center transition-all duration-300 hover:scale-105"
                            onMouseEnter={() => setIsLogoHovered(true)}
                            onMouseLeave={() => setIsLogoHovered(false)}
                        >
                            <Image src="/assets/images/logo.webp" alt="logo" width={isLogoHovered ? 155 : 150} height={40} className="transition-all duration-300" priority />
                        </Link>

                        <button
                            type="button"
                            className="flex h-9 w-9 items-center justify-center rounded-full transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 ms-2"
                            onClick={() => dispatch(toggleSidebar())}
                            aria-label="Toggle sidebar"
                        >
                            <FontAwesomeIcon
                                icon={faAngleDown}
                                className="rotate-90 text-gray-500 dark:text-gray-400 transition-transform duration-300 hover:text-primary-500 dark:hover:text-primary-400"
                            />
                        </button>
                    </div>

                    <PerfectScrollbar className="flex-1">
                        <ul className="space-y-1 p-4">
                            {menuItems?.map((item) => (
                                <li key={item?.path} onMouseEnter={() => setHoveredItem(item.path)} onMouseLeave={() => setHoveredItem(null)} className="sidebar-menu-item">
                                    {item?.children ? (
                                        <>
                                            <button
                                                onClick={() => toggleMenu(item?.path)}
                                                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 
                                                    ${
                                                        currentMenu === item?.path || hoveredItem === item?.path
                                                            ? 'bg-primary-50 dark:bg-gray-800 shadow-sm scale-[1.02]'
                                                            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                                                    }
                                                    group relative overflow-hidden`}
                                            >
                                                <div className="flex items-center">
                                                    {item?.icon && (
                                                        <FontAwesomeIcon
                                                            icon={item?.icon}
                                                            className={`h-5 w-5 mr-3 transition-all duration-200 
                                                                ${
                                                                    currentMenu === item?.path || hoveredItem === item?.path
                                                                        ? 'text-primary-600 dark:text-primary-400 scale-110'
                                                                        : 'text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                                                                }`}
                                                        />
                                                    )}
                                                    <span
                                                        className={`transition-all duration-200 
                                                            ${
                                                                currentMenu === item?.path || hoveredItem === item?.path
                                                                    ? 'text-primary-600 dark:text-primary-400 font-semibold'
                                                                    : 'text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                                                            }`}
                                                    >
                                                        {item?.label}
                                                    </span>
                                                </div>
                                                <FontAwesomeIcon
                                                    icon={currentMenu === item?.path ? faChevronUp : faChevronDown}
                                                    className={`text-xs transition-all duration-200 
                                                        ${
                                                            currentMenu === item.path || hoveredItem === item.path
                                                                ? 'text-primary-600 dark:text-primary-400'
                                                                : 'text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                                                        }`}
                                                />
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === item?.path ? 'auto' : 0}>
                                                <ul className="space-y-1 pl-2 mt-2">
                                                    {item?.children?.map((child) => (
                                                        <li key={child?.path}>
                                                            <Link
                                                                href={child?.path}
                                                                className={`flex items-center px-4 py-2.5 text-sm rounded-lg transition-all duration-200
                                                                ${
                                                                    selectedSidebarSection === child?.path || hoveredItem === child?.path
                                                                        ? 'bg-blue-100 text-black font-medium shadow-sm scale-[1.02]'
                                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500'
                                                                }
                                                                group menu-item-hover`}
                                                                onClick={() => handleMenuClick(child?.path)}
                                                                onMouseEnter={() => setHoveredItem(child?.path)}
                                                                onMouseLeave={() => setHoveredItem(null)}
                                                            >
                                                                {child?.icon && (
                                                                    <FontAwesomeIcon
                                                                        icon={child.icon}
                                                                        className={`h-4 w-4 mr-2.5 transition-transform duration-200 
                                                                        ${selectedSidebarSection === child?.path || hoveredItem === child?.path ? 'scale-110 text-black' : 'text-gray-500 dark:text-gray-400 group-hover:text-white'}`}
                                                                    />
                                                                )}
                                                                <span>{child?.label}</span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AnimateHeight>
                                        </>
                                    ) : (
                                        <Link
                                            href={item.path}
                                            className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 
        ${selectedSidebarSection === item.path || hoveredItem === item.path ? 'bg-blue-100 dark:bg-gray-800 shadow-sm scale-[1.02]' : 'hover:bg-blue-100 dark:hover:bg-gray-800'}
        group menu-item-hover`}
                                            onClick={() => handleMenuClick(item.path)}
                                            onMouseEnter={() => setHoveredItem(item.path)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                        >
                                            {item?.icon && (
                                                <FontAwesomeIcon
                                                    icon={item.icon}
                                                    className={`h-5 w-5 mr-3 transition-all duration-200 
                                                        ${
                                                            selectedSidebarSection === item.path || hoveredItem === item.path
                                                                ? 'text-primary-600 dark:text-primary-400 scale-110'
                                                                : 'text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                                                        }`}
                                                />
                                            )}
                                            <span
                                                className={`transition-all duration-200 
                                                    ${
                                                        selectedSidebarSection === item.path || hoveredItem === item.path
                                                            ? 'text-primary-600 dark:text-primary-400 font-semibold'
                                                            : 'text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                                                    }`}
                                            >
                                                {item.label}
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </PerfectScrollbar>

                    <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            <div className="mb-1">v1.4.0</div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
