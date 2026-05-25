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
    faFileAlt,
    faHistory,
    faBuilding,
    faUserShield,
    faUserCog,
    faUsers,
    faBriefcase,
    faCalculator,
    faBullhorn,
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
    const [currentSubMenu, setCurrentSubMenu] = useState<string>('');
    const [currentThirdMenu, setCurrentThirdMenu] = useState<string>('');
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
        setCurrentMenu((prevMenu: string) => (prevMenu === value ? '' : value));
    };

    const toggleSubMenu = (value: string) => {
        setCurrentSubMenu((prev: string) => (prev === value ? '' : value));
    };

    const toggleThirdMenu = (value: string) => {
        setCurrentThirdMenu((prev: string) => (prev === value ? '' : value));
    };

    const handleMenuClick = (section: string) => {
        dispatch(setSelectedSidebarSection(section));
        if (window.innerWidth < 1024) {
            dispatch(toggleSidebar());
        }
    };

    const allMenuItems: MenuItem[] = [
        {
            path: '/farmerDashboard',
            icon: faDashboard,
            label: t('Dashboard'),
        },
        {
            path: '/adminDashboard',
            icon: faBuilding,
            label: t('Company Management'),
        },
        {
            path: 'global_masters',
            icon: faFolderOpen,
            label: t('Global M'),
            children: [
                { path: '/harvesting', label: t('Departments') },
                { path: '/addRooms', label: t('Roles & Permissions') },
                { path: '/addSupervisors', label: t('Lead Status') },
                { path: '/addLabours', label: t('Payment Modes') },
            ],
        },
        {
            path: 'user_management',
            icon: faUsers,
            label: t('User M'),
            children: [
                {
                    path: 'admin_section',
                    icon: faUserCog,
                    label: t('Admin'),
                    children: [
                        {
                            path: 'sales_module',
                            icon: faBriefcase,
                            label: t('Sales'),
                            children: [
                                { path: '/salesDashboard', label: t('Dashboard') },
                                { path: '/salesLeads', label: t('Leads') },
                                { path: '/salesEnquiries ', label: t('Enquiries') },
                                { path: '/salesSitevisits', label: t('Site Visits') },
                                { path: '/salesDocumentation', label: t('Documentation') },
                                { path: '/salesQuotation', label: t('Quotations') },
                                { path: '/salesOrder', label: t('Orders') },
                                { path: '/salesCustomers', label: t('Customers') },
                                { path: '/salesReports', label: t('Reports') },
                            ],
                        },
                        {
                            path: 'account_module',
                            icon: faCalculator,
                            label: t('Account'),
                            children: [
                                { path: '/admin/account/dashboard', label: t('Dashboard') },
                                { path: '/admin/account/customer-payments', label: t('Customer Payments') },
                                { path: '/admin/account/vendor-payments', label: t('Vendor Payments') },
                                { path: '/admin/account/invoices', label: t('Invoices') },
                                { path: '/admin/account/costing', label: t('Costing') },
                                { path: '/admin/account/ledger', label: t('Ledger') },
                                { path: '/admin/account/reports', label: t('Reports') },
                            ],
                        },
                        {
                            path: 'ppc_module',
                            icon: faBullhorn,
                            label: t('PPC'),
                            children: [
                                { path: '/admin/ppc/dashboard', label: t('Dashboard') },
                                { path: '/admin/ppc/campaigns', label: t('Campaigns') },
                                { path: '/admin/ppc/leads', label: t('Leads') },
                                { path: '/admin/ppc/reports', label: t('Reports') },
                            ],
                        },
                    ],
                },
                {
                    path: '/superadmin',
                    icon: faUserShield,
                    label: t('SuperAdmin'),
                },
            ],
        },
        {
            path: '/reports',
            icon: faFileAlt,
            label: t('Reports'),
        },
        {
            path: '/systemLogs',
            icon: faHistory,
            label: t('System Logs'),
        },
    ];

    const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
        return items?.filter((item) => {
            if (!item?.permissionKey) return true;
            const hasPermission = checkRole([item?.permissionKey], roleState?.features);
            if (item.children) {
                const filteredChildren = item.children.filter(
                    (child) => !child.permissionKey || checkRole([child.permissionKey], roleState.features)
                );
                if (filteredChildren.length > 0) {
                    item.children = filteredChildren;
                    return true;
                }
                if (hasPermission) return true;
                return false;
            }
            return hasPermission;
        });
    };

    const menuItems = filterMenuItems(allMenuItems);

    const renderMenuIcon = (icon: any, isActive: boolean, size: 'sm' | 'md' = 'md') => (
        <FontAwesomeIcon
            icon={icon}
            className={`${size === 'md' ? 'h-5 w-5 mr-3' : 'h-4 w-4 mr-2.5'} transition-all duration-200 
                ${isActive
                    ? 'text-primary-600 dark:text-primary-400 scale-110'
                    : 'text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                }`}
        />
    );

    const renderChevron = (isOpen: boolean, isActive: boolean) => (
        <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            className={`text-xs transition-all duration-200 
                ${isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                }`}
        />
    );

    const renderFourthLevelItems = (children: MenuItem[]) => (
        <ul className="pl-2 mt-1 space-y-1">
            {children.map((leaf) => {
                const isActive = selectedSidebarSection === leaf.path || hoveredItem === leaf.path;
                return (
                    <li key={leaf.path}>
                        <Link
                            href={leaf.path}
                            className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200
                                ${isActive
                                    ? 'bg-blue-100 text-black font-medium shadow-sm scale-[1.02]'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500'
                                } group`}
                            onClick={() => handleMenuClick(leaf.path)}
                            onMouseEnter={() => setHoveredItem(leaf.path)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0
                                ${isActive ? 'bg-blue-600' : 'bg-gray-400 group-hover:bg-white'}`}
                            />
                            <span>{leaf.label}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );

    const renderThirdLevelItems = (children: MenuItem[]) => (
        <ul className="pl-2 mt-1 space-y-1">
            {children.map((leaf) => {
                const isThirdMenuOpen = currentThirdMenu === `third_${leaf.path}`;
                const isLeafActive = selectedSidebarSection === leaf.path || hoveredItem === leaf.path || isThirdMenuOpen;

                if (leaf.children && leaf.children.length > 0) {
                    return (
                        <li key={leaf.path}>
                            <button
                                onClick={() => toggleThirdMenu(`third_${leaf.path}`)}
                                onMouseEnter={() => setHoveredItem(leaf.path)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className={`w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-all duration-200
                                    ${isLeafActive
                                        ? 'bg-blue-100 text-black font-medium shadow-sm'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-800'
                                    } group`}
                            >
                                <div className="flex items-center">
                                    {leaf.icon && (
                                        <FontAwesomeIcon
                                            icon={leaf.icon}
                                            className={`h-3.5 w-3.5 mr-2 transition-transform duration-200
                                                ${isLeafActive ? 'text-black scale-110' : 'text-gray-500 group-hover:text-primary-600'}`}
                                        />
                                    )}
                                    <span>{leaf.label}</span>
                                </div>
                                <FontAwesomeIcon
                                    icon={isThirdMenuOpen ? faChevronUp : faChevronDown}
                                    className={`text-xs transition-all duration-200
                                        ${isLeafActive ? 'text-black' : 'text-gray-400 group-hover:text-primary-600'}`}
                                />
                            </button>
                            <AnimateHeight duration={250} height={isThirdMenuOpen ? 'auto' : 0}>
                                {renderFourthLevelItems(leaf.children)}
                            </AnimateHeight>
                        </li>
                    );
                }

                return (
                    <li key={leaf.path}>
                        <Link
                            href={leaf.path}
                            className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200
                                ${isLeafActive
                                    ? 'bg-blue-100 text-black font-medium shadow-sm scale-[1.02]'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500'
                                } group`}
                            onClick={() => handleMenuClick(leaf.path)}
                            onMouseEnter={() => setHoveredItem(leaf.path)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            {leaf.icon && (
                                <FontAwesomeIcon
                                    icon={leaf.icon}
                                    className={`h-3.5 w-3.5 mr-2 transition-transform duration-200
                                        ${isLeafActive ? 'scale-110 text-black' : 'text-gray-500 dark:text-gray-400 group-hover:text-white'}`}
                                />
                            )}
                            <span>{leaf.label}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );

    const renderSecondLevelItems = (children: MenuItem[]) => (
        <ul className="pl-2 mt-2 space-y-1">
            {children.map((child) => {
                const isChildMenuOpen = currentSubMenu === child.path;
                const isChildActive = selectedSidebarSection === child.path || hoveredItem === child.path || isChildMenuOpen;

                if (child.children && child.children.length > 0) {
                    return (
                        <li key={child.path}>
                            <button
                                onClick={() => toggleSubMenu(child.path)}
                                onMouseEnter={() => setHoveredItem(child.path)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm rounded-lg transition-all duration-200
                                    ${isChildActive
                                        ? 'bg-blue-100 text-black font-medium shadow-sm'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-800'
                                    } group`}
                            >
                                <div className="flex items-center">
                                    {child.icon && (
                                        <FontAwesomeIcon
                                            icon={child.icon}
                                            className={`h-4 w-4 mr-2.5 transition-transform duration-200
                                                ${isChildActive ? 'scale-110 text-black' : 'text-gray-500 dark:text-gray-400 group-hover:text-primary-600'}`}
                                        />
                                    )}
                                    <span>{child.label}</span>
                                </div>
                                <FontAwesomeIcon
                                    icon={isChildMenuOpen ? faChevronUp : faChevronDown}
                                    className={`text-xs transition-all duration-200
                                        ${isChildActive ? 'text-black' : 'text-gray-400 group-hover:text-primary-600'}`}
                                />
                            </button>
                            <AnimateHeight duration={250} height={isChildMenuOpen ? 'auto' : 0}>
                                {renderThirdLevelItems(child.children)}
                            </AnimateHeight>
                        </li>
                    );
                }

                return (
                    <li key={child.path}>
                        <Link
                            href={child.path}
                            className={`flex items-center px-4 py-2.5 text-sm rounded-lg transition-all duration-200
                                ${selectedSidebarSection === child.path || hoveredItem === child.path
                                    ? 'bg-blue-100 text-black font-medium shadow-sm scale-[1.02]'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500'
                                } group`}
                            onClick={() => handleMenuClick(child.path)}
                            onMouseEnter={() => setHoveredItem(child.path)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            {child.icon && (
                                <FontAwesomeIcon
                                    icon={child.icon}
                                    className={`h-4 w-4 mr-2.5 transition-transform duration-200
                                        ${selectedSidebarSection === child.path || hoveredItem === child.path
                                            ? 'scale-110 text-black'
                                            : 'text-gray-500 dark:text-gray-400 group-hover:text-white'
                                        }`}
                                />
                            )}
                            <span>{child.label}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );

    if (!isClient) return null;

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed top-0 bottom-0 z-[60] h-full min-h-screen w-[220px] shadow-lg transform transition-all duration-300 ease-in-out
                    ${themeConfig.sidebar ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between px-6 py-2 border-b border-gray-100 dark:border-gray-800">
                        <Link
                            href="/farmerDashboard"
                            className="flex items-center transition-all duration-300 main-logo shrink-0 hover:scale-105"
                            onMouseEnter={() => setIsLogoHovered(true)}
                            onMouseLeave={() => setIsLogoHovered(false)}
                        >
                            <Image
                                src="/assets/images/logo.png"
                                alt="logo"
                                width={isLogoHovered ? 155 : 150}
                                height={40}
                                className="transition-all duration-300"
                                priority
                            />
                        </Link>

                        <button
                            type="button"
                            className="flex items-center justify-center transition duration-300 rounded-full h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800 ms-2"
                            onClick={() => dispatch(toggleSidebar())}
                            aria-label="Toggle sidebar"
                        >
                            <FontAwesomeIcon
                                icon={faAngleDown}
                                className="text-gray-500 transition-transform duration-300 rotate-90 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
                            />
                        </button>
                    </div>

                    <PerfectScrollbar className="flex-1">
                        <ul className="p-4 space-y-1">
                            {menuItems?.map((item) => {
                                const isMenuOpen = currentMenu === item.path;
                                const isItemActive = selectedSidebarSection === item.path || hoveredItem === item.path || isMenuOpen;

                                return (
                                    <li
                                        key={item.path}
                                        onMouseEnter={() => setHoveredItem(item.path)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        className="sidebar-menu-item"
                                    >
                                        {item.children ? (
                                            <>
                                                <button
                                                    onClick={() => toggleMenu(item.path)}
                                                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 
                                                        ${isItemActive
                                                            ? 'bg-primary-50 dark:bg-gray-800 shadow-sm scale-[1.02]'
                                                            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                                                        } group relative overflow-hidden`}
                                                >
                                                    <div className="flex items-center">
                                                        {item.icon && renderMenuIcon(item.icon, isItemActive)}
                                                        <span
                                                            className={`transition-all duration-200 
                                                                ${isItemActive
                                                                    ? 'text-primary-600 dark:text-primary-400 font-semibold'
                                                                    : 'text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                                                                }`}
                                                        >
                                                            {item.label}
                                                        </span>
                                                    </div>
                                                    {renderChevron(isMenuOpen, isItemActive)}
                                                </button>

                                                <AnimateHeight duration={300} height={isMenuOpen ? 'auto' : 0}>
                                                    {renderSecondLevelItems(item.children)}
                                                </AnimateHeight>
                                            </>
                                        ) : (
                                            <Link
                                                href={item.path}
                                                className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 
                                                    ${selectedSidebarSection === item.path || hoveredItem === item.path
                                                        ? 'bg-blue-100 dark:bg-gray-800 shadow-sm scale-[1.02]'
                                                        : 'hover:bg-blue-100 dark:hover:bg-gray-800'
                                                    } group menu-item-hover`}
                                                onClick={() => handleMenuClick(item.path)}
                                                onMouseEnter={() => setHoveredItem(item.path)}
                                                onMouseLeave={() => setHoveredItem(null)}
                                            >
                                                {item.icon && renderMenuIcon(item.icon, selectedSidebarSection === item.path || hoveredItem === item.path)}
                                                <span
                                                    className={`transition-all duration-200 
                                                        ${selectedSidebarSection === item.path || hoveredItem === item.path
                                                            ? 'text-primary-600 dark:text-primary-400 font-semibold'
                                                            : 'text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                                                        }`}
                                                >
                                                    {item.label}
                                                </span>
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </PerfectScrollbar>

                    <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                        <div className="text-xs text-center text-gray-500 dark:text-gray-400">
                            <div className="mb-1">v1.4.0</div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;