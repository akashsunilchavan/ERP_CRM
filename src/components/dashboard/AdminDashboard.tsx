'use client';
import React, { useState } from 'react';
import {
    LayoutDashboard,
    Users,
    Home,
    UserCheck,
    Settings,
    Bell,
    LogOut,
    TrendingUp,
    TrendingDown,
    Activity,
    DollarSign,
    BarChart3,
    FileText,
    AlertCircle,
    CheckCircle,
    Clock,
    Eye,
    Edit,
    Trash2,
    Plus,
} from 'lucide-react';

import Chart from 'react-apexcharts';
import { Harvesting } from '../harvesting/Harvesting';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    // Dashboard data (replaces cryptoData)
    const dashboardData = [
        {
            id: 'users',
            name: 'Total Users',
            value: 1248,
            change: 12,
            isIncrease: true,
            color: '#3b82f6',
            details: {
                metric1: 'New Users (30d)',
                metric1Value: '312',
                metric2: 'Active Users',
                metric2Value: '1,102',
                metric3: 'User Retention',
                metric3Value: '87%',
                metric4: 'Churn Rate',
                metric4Value: '3%',
            },
            chartData: [920, 960, 940, 980, 1000, 970, 1020, 1040, 1080, 1120],
        },
        {
            id: 'rooms',
            name: 'Active Rooms',
            value: 48,
            change: 5,
            isIncrease: true,
            color: '#22c55e',
            details: {
                metric1: 'Total Rooms',
                metric1Value: '52',
                metric2: 'Occupied',
                metric2Value: '48',
                metric3: 'Vacant',
                metric3Value: '4',
                metric4: 'Utilization',
                metric4Value: '92%',
            },
            chartData: [30, 32, 35, 38, 37, 39, 40, 42, 45, 48],
        },
        {
            id: 'supervisors',
            name: 'Supervisors',
            value: 24,
            change: 2,
            isIncrease: true,
            color: '#8b5cf6',
            details: {
                metric1: 'New Supervisors',
                metric1Value: '4',
                metric2: 'Assigned Rooms',
                metric2Value: '36',
                metric3: 'Average Performance',
                metric3Value: '95%',
                metric4: 'Pending Reviews',
                metric4Value: '2',
            },
            chartData: [15, 16, 17, 18, 20, 21, 22, 22, 23, 24],
        },
        {
            id: 'revenue',
            name: 'Total Harvesting in month',
            value: 2400000,
            change: -3,
            isIncrease: false,
            color: '#f97316',
            details: {
                metric1: 'Monthly Revenue',
                metric1Value: '₹2.4M',
                metric2: 'Last Month',
                metric2Value: '₹2.47M',
                metric3: 'Target',
                metric3Value: '₹3M',
                metric4: 'Achievement',
                metric4Value: '80%',
            },
            chartData: [1800000, 1850000, 2000000, 2100000, 2300000, 2400000, 2380000, 2420000, 2390000, 2400000],
        },
    ];

    const [selectedMetric, setSelectedMetric] = useState(dashboardData[0]);

    const stats = [
        {
            label: 'Total Users',
            value: '1,248',
            change: '+12%',
            isIncrease: true,
            icon: Users,
            color: 'bg-blue-500',
        },
        {
            label: 'Active Rooms',
            value: '48',
            change: '+5%',
            isIncrease: true,
            icon: Home,
            color: 'bg-green-500',
        },
        {
            label: 'Supervisors',
            value: '24',
            change: '+2%',
            isIncrease: true,
            icon: UserCheck,
            color: 'bg-purple-500',
        },
        {
            label: 'Total Harvesting',
            value: '₹2.4M',
            change: '-3%',
            isIncrease: false,
            icon: Plus,
            color: 'bg-orange-500',
        },
    ];

    const recentActivities = [
        { id: 1, type: 'user', action: 'New farmer registered', user: 'Rajesh Kumar', time: '5 min ago' },
        { id: 2, type: 'room', action: 'Room created', user: 'Admin', time: '12 min ago' },
        { id: 3, type: 'supervisor', action: 'Supervisor assigned', user: 'Priya Sharma', time: '1 hour ago' },
        { id: 4, type: 'approval', action: 'Training approved', user: 'System', time: '2 hours ago' },
    ];

    const chartOptions = {
        chart: {
            type: 'line' as const,
            toolbar: { show: false },
            zoom: { enabled: false },
        },
        stroke: {
            curve: 'smooth' as const,
            width: 2,
        },
        colors: [selectedMetric.color],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        grid: { borderColor: '#e5e7eb' },
        tooltip: { theme: 'light' },
    };

    const pendingApprovals = [
        { id: 1, type: 'Room Request', name: 'Zone West Expansion', requester: 'John Doe', status: 'pending' },
        { id: 2, type: 'User Access', name: 'Supervisor Role', requester: 'Jane Smith', status: 'pending' },
        { id: 3, type: 'Training Material', name: 'Advanced Farming Techniques', requester: 'Mike Johnson', status: 'pending' },
    ];

    const systemHealth = [
        { metric: 'Server Uptime', value: '99.9%', status: 'good' },
        { metric: 'API Response', value: '120ms', status: 'good' },
        { metric: 'Database Load', value: '45%', status: 'warning' },
        { metric: 'Storage Used', value: '67%', status: 'good' },
    ];

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'rooms', label: 'Room Management', icon: Home },
        { id: 'supervisors', label: 'Supervisors', icon: UserCheck },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'reports', label: 'Reports', icon: FileText },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex-1">
                <main className="p-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {stats.map((stat, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                                                <p className="text-3xl font-bold text-gray-900 ">{stat.value}</p>
                                                {/* <div className="flex items-center space-x-1">
                                                    {stat.isIncrease ? <TrendingUp className="w-4 h-4 text-green-600" /> : <TrendingDown className="w-4 h-4 text-red-600" />}
                                                    <span className={`text-sm font-medium ${stat.isIncrease ? 'text-green-600' : 'text-red-600'}`}>{stat.change}</span>
                                                    <span className="text-sm text-gray-500">vs last month</span>
                                                </div> */}
                                            </div>
                                            <div className={`${stat.color} p-3 rounded-lg`}>
                                                <stat.icon className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* <Harvesting></Harvesting> */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
                                    <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">{pendingApprovals.length} Pending</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requester</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {pendingApprovals.map((approval) => (
                                                <tr key={approval.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-900">{approval.type}</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm font-medium text-gray-900">{approval.name}</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{approval.requester}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full flex items-center w-fit">
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            {approval.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex space-x-2">
                                                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                                                                <CheckCircle className="w-5 h-5" />
                                                            </button>
                                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab !== 'overview' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                            <p className="text-gray-600">Content for {activeTab} will be displayed here</p>
                        </div>
                    )}
                </main>
                <Harvesting />
            </div>
        </div>
    );
};

export default AdminDashboard;
