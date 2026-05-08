'use client';
import React, { useState } from 'react';
import { Users, Home, TrendingUp, AlertCircle, MapPin, Calendar, Search, Bell, Settings, LogOut, Plus, Eye } from 'lucide-react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [rooms, setRooms] = useState([
        { id: 1, name: 'Room A1', farmers: 12, status: 'active', location: 'Zone North' },
        { id: 2, name: 'Room B2', farmers: 8, status: 'active', location: 'Zone South' },
        { id: 3, name: 'Room C3', farmers: 15, status: 'pending', location: 'Zone East' },
    ]);

    const stats = [
        { label: 'Total Rooms', value: '24', icon: Home, color: 'bg-blue-500' },
        { label: 'Total Farmers', value: '156', icon: Users, color: 'bg-green-500' },
        { label: 'Active Sessions', value: '18', icon: TrendingUp, color: 'bg-purple-500' },
        { label: 'Pending Approvals', value: '5', icon: AlertCircle, color: 'bg-orange-500' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'overview' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('rooms')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'rooms' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Rooms
                            </button>
                            <button
                                onClick={() => setActiveTab('farmers')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'farmers' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Farmers
                            </button>
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="p-6">
                        {activeTab === 'rooms' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search rooms..."
                                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                            />
                                        </div>
                                    </div>
                                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium">
                                        <Plus className="w-5 h-5" />
                                        <span>Add Room</span>
                                    </button>
                                </div>

                                {/* Rooms Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmers</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {rooms.map((room) => (
                                                <tr key={room.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <Home className="w-5 h-5 text-gray-400 mr-2" />
                                                            <span className="font-medium text-gray-900">{room.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center text-gray-600">
                                                            <MapPin className="w-4 h-4 mr-1" />
                                                            {room.location}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{room.farmers} farmers</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                                room.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                                                            }`}
                                                        >
                                                            {room.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button className="text-green-600 hover:text-green-800 mr-3">
                                                            <Eye className="w-5 h-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                            <div className="bg-green-100 p-2 rounded-lg">
                                                <Calendar className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">New farmer added to Room A1</p>
                                                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'farmers' && (
                            <div>
                                <p className="text-gray-600">Farmers management view will be displayed here</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
