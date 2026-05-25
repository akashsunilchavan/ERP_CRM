'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  FileText, 
  DollarSign, 
  XCircle,
  Activity,
  Mail,
  Phone,
  Globe,
  Star,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const SalesDashboard = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const statsCards = [
    {
      title: 'New Leads',
      value: '24',
      change: '+1.20%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: "Today's Follow-Ups",
      value: '12',
      change: '+1.6%',
      trend: 'up',
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Pending Quotations',
      value: '8',
      change: '+1.20%',
      trend: 'up',
      icon: FileText,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Wire Deals',
      value: '12,431',
      change: '+10.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Lost Deals',
      value: '12,431',
      change: '+18.5%',
      trend: 'down',
      icon: XCircle,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
  ];

  const leadsChartData = [
    { month: 'Jan', newLeads: 65, activeLeads: 45, closedLeads: 30 },
    { month: 'Feb', newLeads: 75, activeLeads: 55, closedLeads: 35 },
    { month: 'Mar', newLeads: 85, activeLeads: 65, closedLeads: 40 },
    { month: 'Apr', newLeads: 70, activeLeads: 60, closedLeads: 45 },
    { month: 'May', newLeads: 90, activeLeads: 70, closedLeads: 50 },
    { month: 'Jun', newLeads: 95, activeLeads: 75, closedLeads: 55 },
    { month: 'Jul', newLeads: 88, activeLeads: 80, closedLeads: 60 },
  ];

  const pieChartData = [
    { name: 'New Leads', value: 30, color: '#3B82F6' },
    { name: 'Active Leads', value: 40, color: '#10B981' },
    { name: 'Closed Leads', value: 30, color: '#F59E0B' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 2.5 },
    { month: 'Feb', revenue: 2.8 },
    { month: 'Mar', revenue: 3.0 },
    { month: 'Apr', revenue: 2.7 },
    { month: 'May', revenue: 3.2 },
    { month: 'Jun', revenue: 3.5 },
    { month: 'Jul', revenue: 3.8 },
    { month: 'Aug', revenue: 3.6 },
    { month: 'Sep', revenue: 3.9 },
    { month: 'Oct', revenue: 4.0 },
    { month: 'Nov', revenue: 3.7 },
    { month: 'Dec', revenue: 4.2 },
  ];

  const leadsBySourceData = [
    { name: 'Email', value: 45, color: '#3B82F6' },
    { name: 'Phone', value: 35, color: '#10B981' },
    { name: 'Other', value: 20, color: '#F59E0B' },
  ];

  const recentActivities = [
    {
      time: '10:35 AM',
      activity: 'New Lead Added',
      customer: 'ABC Elevators Pvt. Ltd',
      assignedTo: 'John Doe',
      status: 'New',
      statusColor: 'bg-blue-100 text-blue-700',
    },
    {
      time: '9:00 AM',
      activity: 'Quotation Sent',
      customer: 'XYZ Builders',
      assignedTo: 'Joana Dee',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-700',
    },
    {
      time: 'Yesterday 04:15 PM',
      activity: 'Inquiry Submitted',
      customer: 'PQR Engineering',
      assignedTo: 'Neha Sharma',
      status: 'Completed',
      statusColor: 'bg-green-100 text-green-700',
    },
    {
      time: 'Yesterday 02:20 PM',
      activity: 'Site Visit Scheduled',
      customer: 'LMN Industries',
      assignedTo: 'Swetha Sharma',
      status: 'Scheduled',
      statusColor: 'bg-purple-100 text-purple-700',
    },
  ];

  const topPerformers = [
    {
      name: 'Jane Doe',
      deals: '18',
      revenue: 'Wm Denas',
      amount: '7,88,000',
      avatar: 'JD',
    },
    {
      name: 'Maria Stevens',
      deals: '12',
      revenue: 'Wm Denas',
      amount: '1,80,000',
      avatar: 'MS',
    },
    {
      name: 'Joana Doe',
      deals: '8',
      revenue: 'Wm Osans',
      amount: '8,50,000',
      avatar: 'JD',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="mt-2 text-gray-600">Overview of your sales activities and performance</p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-5">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="p-6 transition-all duration-300 bg-white border border-gray-100 shadow-sm cursor-pointer rounded-xl hover:shadow-lg hover:scale-105"
              onMouseEnter={() => setHoveredCard(stat.title)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="mt-1 text-sm text-gray-600">{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Leads Panel - Bar Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leadsChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="newLeads" name="New Leads" fill="#3B82F6" />
                <Bar dataKey="activeLeads" name="Active Leads" fill="#10B981" />
                <Bar dataKey="closedLeads" name="Closed Leads" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Leads Panel - Pie Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Leads Panel - Line Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={leadsChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="newLeads" name="New Leads" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="activeLeads" name="Active Leads" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="closedLeads" name="Closed Leads" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Leads Panel - Area Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={leadsChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="newLeads" name="New Leads" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="activeLeads" name="Active Leads" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                <Area type="monotone" dataKey="closedLeads" name="Closed Leads" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Revenue Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 4.5]} />
                <Tooltip formatter={(value) => `$${value}M`} />
                <Legend />
                <Line type="monotone" dataKey="revenue" name="Revenue (Millions)" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Leads by Source</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadsBySourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leadsBySourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">Email</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">Phone</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600">Other</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Recent Activities</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-sm font-semibold text-left text-gray-600">Time</th>
                    <th className="p-3 text-sm font-semibold text-left text-gray-600">Activity</th>
                    <th className="p-3 text-sm font-semibold text-left text-gray-600">Customers</th>
                    <th className="p-3 text-sm font-semibold text-left text-gray-600">Assigned To</th>
                    <th className="p-3 text-sm font-semibold text-left text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity, index) => (
                    <tr key={index} className="transition-colors border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {activity.time}
                        </div>
                      </td>
                      <td className="p-3 text-sm font-medium text-gray-800">{activity.activity}</td>
                      <td className="p-3 text-sm text-gray-600">{activity.customer}</td>
                      <td className="p-3 text-sm text-gray-600">{activity.assignedTo}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${activity.statusColor}`}>
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Top Performers</h2>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 transition-all duration-300 rounded-lg cursor-pointer bg-gradient-to-r from-gray-50 to-white hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 font-semibold text-white rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                      {performer.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{performer.name}</div>
                      <div className="text-sm text-gray-500">{performer.deals} deals closed</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">₹{performer.amount}</div>
                    <div className="text-sm text-gray-500">{performer.revenue}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;