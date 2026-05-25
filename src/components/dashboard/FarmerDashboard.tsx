'use client';

import { IRootState } from '@/store';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { ApexOptions } from 'apexcharts';
import { Select, Group, Button, Badge } from '@mantine/core'; // Added Badge here
import { Calendar, Filter, TrendingUp, Building, Users, DollarSign, Layers } from 'lucide-react';

const FarmerDashboard = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [isMounted, setIsMounted] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<string | null>('all');
    const [selectedTimeRange, setSelectedTimeRange] = useState<string | null>('weekly');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const leadsSalesWeekly: { series: ApexOptions['series']; options: ApexOptions } = {
        series: [
            { name: 'Leads', data: [180, 160, 190, 170, 200, 185, 175] },
            { name: 'Sales', data: [120, 110, 130, 115, 140, 125, 118] }
        ],
        options: {
            chart: {
                type: 'bar',
                height: 380,
                toolbar: { show: false },
                fontFamily: 'Nunito, sans-serif',
                background: 'transparent'
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '65%',
                    borderRadius: 4,
                }
            },
            dataLabels: { enabled: false },
            stroke: { show: true, width: 1, colors: ['transparent'] },
            xaxis: { 
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                title: {
                    text: 'Weekday',
                    style: { fontSize: '12px', fontWeight: 500 }
                }
            },
            yaxis: { 
                title: { text: 'Count' },
                min: 0,
                max: 200,
                tickAmount: 5,
                labels: {
                    formatter: (val: number) => val.toString()
                }
            },
            fill: { opacity: 1 },
            colors: isDark ? ['#5c1ac3', '#e2a03f'] : ['#4361ee', '#f4b436'],
            legend: { 
                position: 'top', 
                horizontalAlign: 'center',
                fontSize: '14px',
                fontWeight: 500
            },
            grid: { 
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5
            },
            tooltip: {
                shared: true,
                intersect: false
            }
        }
    };

    const leadsSalesMonthly: { series: ApexOptions['series']; options: ApexOptions } = {
        series: [
            { name: 'Leads', data: [1200, 1350, 1420, 1580, 1650, 1720, 1850, 1920, 2010, 2150, 2280, 2450] },
            { name: 'Sales', data: [980, 1050, 1120, 1250, 1320, 1410, 1520, 1610, 1720, 1850, 1980, 2120] }
        ],
        options: {
            chart: {
                type: 'bar',
                height: 380,
                toolbar: { show: false },
                fontFamily: 'Nunito, sans-serif',
                background: 'transparent'
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '65%',
                    borderRadius: 4,
                }
            },
            dataLabels: { enabled: false },
            stroke: { show: true, width: 1, colors: ['transparent'] },
            xaxis: { 
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                title: {
                    text: 'Month',
                    style: { fontSize: '12px', fontWeight: 500 }
                }
            },
            yaxis: { 
                title: { text: 'Count' },
                min: 0,
                max: 3000,
                tickAmount: 6,
                labels: {
                    formatter: (val: number) => val.toString()
                }
            },
            fill: { opacity: 1 },
            colors: isDark ? ['#5c1ac3', '#e2a03f'] : ['#4361ee', '#f4b436'],
            legend: { 
                position: 'top', 
                horizontalAlign: 'center',
                fontSize: '14px',
                fontWeight: 500
            },
            grid: { 
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5
            },
            tooltip: {
                shared: true,
                intersect: false
            }
        }
    };

    const companyPerformanceWeekly: { series: ApexOptions['series']; options: ApexOptions } = {
        series: [
            { name: 'Company 1', data: [65, 70, 75, 78, 82, 85, 88] },
            { name: 'Company 2', data: [55, 60, 64, 68, 72, 76, 80] },
            { name: 'Company 3', data: [45, 50, 55, 58, 62, 66, 70] }
        ],
        options: {
            chart: {
                type: 'line',
                height: 380,
                toolbar: { show: false },
                fontFamily: 'Nunito, sans-serif',
                background: 'transparent'
            },
            stroke: { curve: 'smooth', width: 3 },
            xaxis: { 
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                title: {
                    text: 'Weekday',
                    style: { fontSize: '12px', fontWeight: 500 }
                }
            },
            yaxis: { 
                title: { text: 'Performance (%)' },
                min: 0,
                max: 100,
                tickAmount: 5
            },
            colors: isDark ? ['#5c1ac3', '#e2a03f', '#00ab55'] : ['#4361ee', '#f4b436', '#00ab55'],
            legend: { 
                position: 'top',
                horizontalAlign: 'center',
                fontSize: '14px'
            },
            grid: { 
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5
            },
            markers: {
                size: 4,
                hover: { size: 6 }
            }
        }
    };

    const companyPerformanceMonthly: { series: ApexOptions['series']; options: ApexOptions } = {
        series: [
            { name: 'Company 1', data: [65, 70, 75, 78, 82, 85, 88, 90, 92, 95, 97, 100] },
            { name: 'Company 2', data: [55, 60, 64, 68, 72, 76, 80, 83, 86, 89, 92, 95] },
            { name: 'Company 3', data: [45, 50, 55, 58, 62, 66, 70, 73, 76, 79, 82, 85] }
        ],
        options: {
            chart: {
                type: 'line',
                height: 380,
                toolbar: { show: false },
                fontFamily: 'Nunito, sans-serif',
                background: 'transparent'
            },
            stroke: { curve: 'smooth', width: 3 },
            xaxis: { 
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                title: {
                    text: 'Month',
                    style: { fontSize: '12px', fontWeight: 500 }
                }
            },
            yaxis: { 
                title: { text: 'Performance (%)' },
                min: 0,
                max: 100,
                tickAmount: 5
            },
            colors: isDark ? ['#5c1ac3', '#e2a03f', '#00ab55'] : ['#4361ee', '#f4b436', '#00ab55'],
            legend: { 
                position: 'top',
                horizontalAlign: 'center',
                fontSize: '14px'
            },
            grid: { 
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5
            },
            markers: {
                size: 4,
                hover: { size: 6 }
            }
        }
    };

    const transactionMonthly: { series: ApexOptions['series']; options: ApexOptions } = {
        series: [{ name: 'Transaction', data: [15000, 22000, 18000, 25000, 32000, 38000, 35000, 40000, 45000, 42000, 48000, 52000] }],
        options: {
            chart: {
                type: 'line',
                height: 380,
                toolbar: { show: false },
                fontFamily: 'Nunito, sans-serif'
            },
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 3 },
            xaxis: { 
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                title: { text: 'Month' }
            },
            yaxis: {
                title: { text: 'Amount (£)' },
                min: 0,
                max: 60000,
                tickAmount: 6,
                labels: { 
                    formatter: (val: number) => {
                        if (val >= 1000) return `£${(val / 1000).toFixed(0)}K`;
                        return `£${val}`;
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.45,
                    opacityTo: 0.05
                }
            },
            colors: isDark ? ['#e2a03f'] : ['#1B55E2'],
            grid: { borderColor: isDark ? '#191E3A' : '#E0E6ED' }
        }
    };

    const transactionWeekly: { series: ApexOptions['series']; options: ApexOptions } = {
        series: [{ name: 'Transaction', data: [12000, 18000, 15000, 22000, 28000, 25000, 20000] }],
        options: {
            chart: {
                type: 'bar',
                height: 380,
                toolbar: { show: false },
                fontFamily: 'Nunito, sans-serif'
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    columnWidth: '65%'
                }
            },
            xaxis: { 
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                title: { text: 'Weekday' }
            },
            yaxis: {
                title: { text: 'Amount (£)' },
                min: 0,
                max: 50000,
                tickAmount: 5,
                labels: { 
                    formatter: (val: number) => {
                        if (val >= 1000) return `£${(val / 1000).toFixed(0)}K`;
                        return `£${val}`;
                    }
                }
            },
            colors: isDark ? ['#e7515a'] : ['#E7515A'],
            grid: { borderColor: isDark ? '#191E3A' : '#E0E6ED' }
        }
    };

    const expenseCategories: { series: ApexOptions['series']; options: ApexOptions } = {
        series: [18.67, 24.28, 14.01, 16.79, 15.00, 17.87, 6.73, 8.75, 9.77],
        options: {
            chart: {
                type: 'donut',
                height: 420,
                fontFamily: 'Nunito, sans-serif'
            },
            labels: ['Accounts', 'Discounts', 'Maintenance', 'PPC', 'Production', 'Purchases', 'Quality', 'Sales', 'Store'],
            dataLabels: { enabled: false },
            stroke: {
                show: true,
                width: 20,
                colors: isDark ? ['#0e1726'] : ['#fff']
            },
            colors: ['#4361ee', '#f4b436', '#e7515a', '#5c1ac3', '#00ab55', '#ff9800', '#8d6e63', '#3b5998', '#00bcd4'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '12px',
                markers: {
                    offsetX: -2
                },
                itemMargin: {
                    horizontal: 8,
                    vertical: 5
                }
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '16px',
                                offsetY: -10
                            },
                            value: {
                                show: true,
                                fontSize: '20px',
                                fontWeight: 'bold',
                                offsetY: 16,
                                formatter: (val: string | number) => {
                                    const numVal = typeof val === 'string' ? parseFloat(val) : val;
                                    return `${numVal.toFixed(2)}%`;
                                }
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                fontSize: '14px',
                                formatter: () => '100%'
                            }
                        }
                    }
                }
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: { width: '100%' },
                        legend: { position: 'bottom' }
                    }
                }
            ]
        }
    };

    const MetricCard = ({
        title,
        value,
        suffix = '',
        icon: Icon,
        bgColor
    }: {
        title: string;
        value: string | number;
        suffix?: string;
        icon: React.ElementType;
        bgColor: string;
    }) => (
        <div
            className={`transition-all duration-300 border rounded-xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 ${bgColor}`}
        >
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                        <Icon size={24} className="text-white" />
                    </div>
                    <span className="text-3xl font-bold text-white">
                        {value}{suffix}
                    </span>
                </div>
                <div className="text-sm font-semibold tracking-wide text-white/90">
                    {title}
                </div>
            </div>
        </div>
    );

    const getLeadsSalesData = () => {
        if (selectedTimeRange === 'weekly') {
            return leadsSalesWeekly;
        }
        return leadsSalesMonthly;
    };

    const getCompanyPerformanceData = () => {
        if (selectedTimeRange === 'weekly') {
            return companyPerformanceWeekly;
        }
        return companyPerformanceMonthly;
    };

    const getTransactionData = () => {
        if (selectedTimeRange === 'weekly') {
            return transactionWeekly;
        }
        return transactionMonthly;
    };

    return (
        <div className="p-4 space-y-6 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-gray-600">Overview of platform performance and insights</p>
                </div>
                <div className="flex gap-3">
                    <Select
                        placeholder="Select Company"
                        value={selectedCompany}
                        onChange={setSelectedCompany}
                        data={[
                            { value: 'all', label: 'All Companies' },
                            { value: 'company1', label: 'Company 1' },
                            { value: 'company2', label: 'Company 2' },
                            { value: 'company3', label: 'Company 3' }
                        ]}
                        leftSection={<Building size={16} />}
                        className="w-48"
                    />
                    <Select
                        placeholder="Select Period"
                        value={selectedTimeRange}
                        onChange={setSelectedTimeRange}
                        data={[
                            { value: 'weekly', label: 'Weekly' },
                            { value: 'monthly', label: 'Monthly' }
                        ]}
                        leftSection={<Calendar size={16} />}
                        className="w-40"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Total Companies"
                    value="3"
                    icon={Building}
                    bgColor="bg-gradient-to-r from-blue-500 to-blue-700"
                />
                <MetricCard
                    title="Total Staff"
                    value="3"
                    icon={Users}
                    bgColor="bg-gradient-to-r from-green-500 to-green-700"
                />
                <MetricCard
                    title="Total Transactions"
                    value="2,50,000"
                    icon={DollarSign}
                    bgColor="bg-gradient-to-r from-purple-500 to-purple-700"
                />
                <MetricCard
                    title="Total Departments"
                    value="12"
                    icon={Layers}
                    bgColor="bg-gradient-to-r from-red-500 to-red-700"
                />
            </div>

            <div className="panel">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-semibold dark:text-white-light">Leads vs Sales</h5>
                    <Badge variant="light" color="blue" size="sm">
                        {selectedTimeRange === 'weekly' ? 'Weekly View' : 'Monthly View'}
                    </Badge>
                </div>
                {isMounted ? (
                    <ReactApexChart 
                        series={getLeadsSalesData().series} 
                        options={getLeadsSalesData().options} 
                        type="bar" 
                        height={380} 
                        width="100%" 
                    />
                ) : (
                    <div className="grid min-h-[380px] place-content-center bg-white-light/30 dark:bg-dark">
                        <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"></span>
                    </div>
                )}
            </div>

            <div className="panel">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-semibold dark:text-white-light">Company Performance</h5>
                    <Badge variant="light" color="green" size="sm">
                        {selectedTimeRange === 'weekly' ? 'Weekly View' : 'Monthly View'}
                    </Badge>
                </div>
                {isMounted ? (
                    <ReactApexChart 
                        series={getCompanyPerformanceData().series} 
                        options={getCompanyPerformanceData().options} 
                        type="line" 
                        height={380} 
                        width="100%" 
                    />
                ) : (
                    <div className="grid min-h-[380px] place-content-center bg-white-light/30 dark:bg-dark">
                        <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"></span>
                    </div>
                )}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="panel">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold dark:text-white-light">
                            {selectedTimeRange === 'weekly' ? 'Weekly Transaction' : 'Monthly Transaction'}
                        </h5>
                        <Badge variant="light" color="orange" size="sm">
                            {selectedTimeRange === 'weekly' ? 'Week View' : 'Month View'}
                        </Badge>
                    </div>
                    {isMounted ? (
                        <ReactApexChart 
                            series={getTransactionData().series} 
                            options={getTransactionData().options} 
                            type={selectedTimeRange === 'weekly' ? "bar" : "line"} 
                            height={380} 
                            width="100%" 
                        />
                    ) : (
                        <div className="grid min-h-[380px] place-content-center bg-white-light/30 dark:bg-dark">
                            <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"></span>
                        </div>
                    )}
                </div>
                <div className="panel">
                    <h5 className="mb-4 text-lg font-semibold dark:text-white-light">Department Activity</h5>
                    {isMounted ? (
                        <ReactApexChart series={expenseCategories.series} options={expenseCategories.options} type="donut" height={380} width="100%" />
                    ) : (
                        <div className="grid min-h-[380px] place-content-center bg-white-light/30 dark:bg-dark">
                            <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"></span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FarmerDashboard;