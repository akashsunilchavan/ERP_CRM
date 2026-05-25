'use client';

import React, { useState } from 'react';
import { 
  Card, Badge, Button, Modal, Select, Group, 
  Divider, Tooltip, Table, Title, Text, Grid, 
  Paper, LoadingOverlay, Tabs, Progress, RingProgress
} from '@mantine/core';
// import { DatePickerInput } from '@mantine/dates';
import { 
  Search, Eye, TrendingUp, TrendingDown, 
  DollarSign, Users, Activity, Target, 
  CheckCircle, Clock, XCircle, Calendar,
  Download, Filter, RefreshCw, ChevronRight,
  FileText, PieChart, BarChart3, LineChart
} from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Activity {
  id: number;
  time: string;
  company: string;
  user: string;
  activityType: string;
  description: string;
  status: string;
  location?: string;
  leadDetails?: {
    name: string;
    email: string;
    phone: string;
    source: string;
    assignedTo: string;
    status: string;
  };
  timeline?: { time: string; title: string; description: string }[];
}

const ReportManagment = () => {
  const [activeTab, setActiveTab] = useState<string | null>('recent');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [activityType, setActivityType] = useState<string | null>('All');
  const [statusFilter, setStatusFilter] = useState<string | null>('All');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(2026, 3, 1),
    new Date(2026, 3, 24)
  ]);

  const activities: Activity[] = [
    {
      id: 1,
      time: '04:32 PM',
      company: 'Company 1',
      user: 'John',
      activityType: 'New Lead',
      description: 'Lead added from website',
      status: 'Success',
      location: 'Mumbai, India',
      leadDetails: {
        name: 'Neha Sharma',
        email: 'neha.sharma@demo.com',
        phone: '9898767898',
        source: 'Website',
        assignedTo: 'John',
        status: 'New'
      },
      timeline: [
        { time: '10:32 AM', title: 'Lead Created', description: 'Lead created successfully from website.' },
        { time: '10:32 AM', title: 'Lead Assigned', description: 'Lead assigned to John.' }
      ]
    },
    {
      id: 2,
      time: '02:28 PM',
      company: 'Company 3',
      user: 'Sarah',
      activityType: 'Payment',
      description: 'Received ₹25,000',
      status: 'Completed',
      location: 'Delhi, India'
    },
    {
      id: 3,
      time: '10:50 AM',
      company: 'Company 2',
      user: 'Mike',
      activityType: 'Role Change',
      description: 'Manager permission edited',
      status: 'Success',
      location: 'Bangalore, India'
    },
    {
      id: 4,
      time: '10:25 AM',
      company: 'Company 2',
      user: 'Admin',
      activityType: 'Lead Status',
      description: 'Converted to customer',
      status: 'Success',
      location: 'Pune, India'
    },
    {
      id: 5,
      time: '10:15 AM',
      company: 'Company 1',
      user: 'Super Admin',
      activityType: 'Department',
      description: 'New department added',
      status: 'Success',
      location: 'Chennai, India'
    }
  ];

  const leadsPipelineData = {
    total: 1245,
    new: 403,
    active: 1842
  };

  const leadsStatusData = {
    total: 1245,
    inProgress: 487,
    closed: 403
  };

  const paymentData = {
    total: 1245230,
    pending: 400000
  };

  const leadsStatusChartOptions = {
    chart: {
      type: 'donut' as const,
      toolbar: { show: false }
    },
    labels: ['In Progress', 'Closed', 'New'],
    colors: ['#FFA726', '#66BB6A', '#42A5F5'],
    legend: {
      position: 'bottom' as const,
      fontSize: '12px'
    },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              fontSize: '14px',
              formatter: () => leadsStatusData.total.toString()
            }
          }
        }
      }
    }
  };

  const leadsStatusChartSeries = [leadsStatusData.inProgress, leadsStatusData.closed, leadsPipelineData.new];

  const paymentChartOptions = {
    chart: {
      type: 'radialBar' as const,
      toolbar: { show: false }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: { size: '65%' },
        track: { background: '#e9ecef', strokeWidth: '97%' },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#1f2937',
            offsetY: 0,
            formatter: (val: number) => `${Math.round(val)}%`
          }
        }
      }
    },
    labels: ['Collection Rate'],
    colors: ['#10B981']
  };

  const paymentChartSeries = [((paymentData.total - paymentData.pending) / paymentData.total) * 100];

  const recentActivityChartOptions = {
    chart: {
      type: 'bar' as const,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
        columnWidth: '55%'
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: { style: { fontSize: '10px' } }
    },
    yaxis: { title: { text: 'Activities' } },
    colors: ['#3B82F6', '#10B981'],
    legend: { position: 'top' as const }
  };

  const recentActivityChartSeries = [
    { name: 'New Leads', data: [12, 19, 15, 17, 14, 10, 8] },
    { name: 'Payments', data: [8, 12, 10, 14, 11, 9, 6] }
  ];

  const getStatusColor = (status: string) => {
    return status === 'Success' || status === 'Completed' ? 'green' : 'red';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredActivities = activities.filter(activity => {
    if (activityType && activityType !== 'All' && activity.activityType !== activityType) return false;
    if (statusFilter && statusFilter !== 'All' && activity.status !== statusFilter) return false;
    return true;
  });

  const handleViewActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsViewModalOpen(true);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Reports
              </h1>
              <p className="mt-1 text-gray-600">Overview of platform performance and insights</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" leftSection={<Download size={16} />}>
                Export Report
              </Button>
              <Button variant="outline" leftSection={<RefreshCw size={16} />}>
                Refresh
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onChange={setActiveTab} mb="lg">
          <Tabs.List grow>
            <Tabs.Tab value="recent" leftSection={<Activity size={16} />}>Recent Activity</Tabs.Tab>
            <Tabs.Tab value="analytics" leftSection={<TrendingUp size={16} />}>Analytics</Tabs.Tab>
            <Tabs.Tab value="leads" leftSection={<Users size={16} />}>Leads Pipeline</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {activeTab === 'recent' && (
          <>
            <Card shadow="sm" padding="lg" radius="md" className="mb-6 bg-white border border-gray-200">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                
                <Select
                  label="Activity Type"
                  placeholder="Select activity type"
                  value={activityType}
                  onChange={setActivityType}
                  data={['All', 'New Lead', 'Payment', 'Role Change', 'Lead Status', 'Department']}
                  leftSection={<Filter size={16} />}
                />
                <Select
                  label="Status"
                  placeholder="Select status"
                  value={statusFilter}
                  onChange={setStatusFilter}
                  data={['All', 'Success', 'Completed', 'Pending', 'Failed']}
                  leftSection={<CheckCircle size={16} />}
                />
              </div>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
              <div className="overflow-x-auto">
                <Table>
                  <Table.Thead>
                    <Table.Tr className="border-b-2 border-gray-200">
                      <Table.Th className="text-sm font-semibold text-gray-700">Time</Table.Th>
                      <Table.Th className="text-sm font-semibold text-gray-700">Company</Table.Th>
                      <Table.Th className="text-sm font-semibold text-gray-700">User</Table.Th>
                      <Table.Th className="text-sm font-semibold text-gray-700">Activity Type</Table.Th>
                      <Table.Th className="text-sm font-semibold text-gray-700">Description</Table.Th>
                      <Table.Th className="text-sm font-semibold text-gray-700">Status</Table.Th>
                      <Table.Th className="text-sm font-semibold text-center text-gray-700">Action</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {filteredActivities.map((activity) => (
                      <Table.Tr key={activity.id} className="transition-colors border-b border-gray-100 hover:bg-gray-50">
                        <Table.Td className="text-sm text-gray-600">{activity.time}</Table.Td>
                        <Table.Td className="text-sm font-medium text-gray-800">{activity.company}</Table.Td>
                        <Table.Td className="text-sm text-gray-600">{activity.user}</Table.Td>
                        <Table.Td>
                          <Badge variant="light" color="blue" size="sm">
                            {activity.activityType}
                          </Badge>
                        </Table.Td>
                        <Table.Td className="text-sm text-gray-600">{activity.description}</Table.Td>
                        <Table.Td>
                          <Badge color={getStatusColor(activity.status)} size="sm">
                            {activity.status}
                          </Badge>
                        </Table.Td>
                        <Table.Td className="text-center">
                          <Tooltip label="View Details">
                            <button 
                              onClick={() => handleViewActivity(activity)}
                              className="p-1 text-blue-600 transition-colors rounded hover:bg-blue-50"
                            >
                              <Eye size={16} />
                            </button>
                          </Tooltip>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Showing 1 to {filteredActivities.length} of {filteredActivities.length} entries
                </p>
              </div>
            </Card>
          </>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
                  <Users size={20} className="text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">{leadsPipelineData.total.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp size={14} className="text-green-500" />
                  <span className="text-xs text-green-600">+12.5%</span>
                  <span className="text-xs text-gray-400">vs last month</span>
                </div>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                  <DollarSign size={20} className="text-green-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">{formatCurrency(paymentData.total)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp size={14} className="text-green-500" />
                  <span className="text-xs text-green-600">+8.3%</span>
                  <span className="text-xs text-gray-400">vs last month</span>
                </div>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
                  <Activity size={20} className="text-purple-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">1,842</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp size={14} className="text-green-500" />
                  <span className="text-xs text-green-600">+5.2%</span>
                  <span className="text-xs text-gray-400">vs last month</span>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">Recent Activity Trend</h3>
                <ReactApexChart
                  options={recentActivityChartOptions}
                  series={recentActivityChartSeries}
                  type="bar"
                  height={300}
                />
              </Card>

              <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">Payment Collection Rate</h3>
                <div className="flex justify-center">
                  <ReactApexChart
                    options={paymentChartOptions}
                    series={paymentChartSeries}
                    type="radialBar"
                    height={300}
                    width={300}
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">Collected: {formatCurrency(paymentData.total - paymentData.pending)}</p>
                  <p className="text-sm text-gray-600">Pending: {formatCurrency(paymentData.pending)}</p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">Leads Pipeline Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="text-sm font-medium text-gray-700">Total Leads</span>
                  <span className="text-2xl font-bold text-gray-800">{leadsPipelineData.total.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                  <span className="text-sm font-medium text-gray-700">New Leads</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-600">{leadsPipelineData.new.toLocaleString()}</span>
                    <p className="text-xs text-gray-500">32.4% of total</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                  <span className="text-sm font-medium text-gray-700">Active Leads</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-600">{leadsPipelineData.active.toLocaleString()}</span>
                    <p className="text-xs text-gray-500">Active in pipeline</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">Leads Status Distribution</h3>
              <ReactApexChart
                options={leadsStatusChartOptions}
                series={leadsStatusChartSeries}
                type="donut"
                height={350}
              />
            </Card>

            <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200 md:col-span-2">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">Payment Mode Collection</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="p-4 text-white rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                  <p className="text-sm opacity-90">Total Collection</p>
                  <p className="mt-1 text-3xl font-bold">{formatCurrency(paymentData.total)}</p>
                  <p className="mt-2 text-xs opacity-75">Across all payment modes</p>
                </div>
                <div className="p-4 text-white rounded-lg bg-gradient-to-r from-orange-500 to-orange-600">
                  <p className="text-sm opacity-90">Pending Amount</p>
                  <p className="mt-1 text-3xl font-bold">{formatCurrency(paymentData.pending)}</p>
                  <p className="mt-2 text-xs opacity-75">Awaiting settlement</p>
                </div>
              </div>
              <div className="mt-4">
                <Progress 
                  value={((paymentData.total - paymentData.pending) / paymentData.total) * 100} 
                  size="lg" 
                  radius="xl" 
                  color="green"
                  striped
                  animated
                />
                <p className="mt-2 text-xs text-center text-gray-500">
                  Collection Rate: {(((paymentData.total - paymentData.pending) / paymentData.total) * 100).toFixed(1)}%
                </p>
              </div>
            </Card>
          </div>
        )}

        <Modal
          opened={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={null}
          centered
          size="xl"
          overlayProps={{ blur: 4, opacity: 0.4 }}
        >
          {selectedActivity && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedActivity.activityType}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge color={getStatusColor(selectedActivity.status)} size="lg">
                    {selectedActivity.status}
                  </Badge>
                  {selectedActivity.location && (
                    <Badge variant="light" color="gray" size="lg">
                      {selectedActivity.location}
                    </Badge>
                  )}
                </div>
              </div>

              <Divider label="Activity Information" labelPosition="center" mb="md" />
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Company</p>
                  <p className="text-sm font-medium text-gray-800">{selectedActivity.company}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">User</p>
                  <p className="text-sm font-medium text-gray-800">{selectedActivity.user}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Activity Type</p>
                  <p className="text-sm font-medium text-gray-800">{selectedActivity.activityType}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Date & Time</p>
                  <p className="text-sm font-medium text-gray-800">22 Apr 2026, {selectedActivity.time}</p>
                </div>
              </div>

              {selectedActivity.leadDetails && (
                <>
                  <Divider label="Lead Details" labelPosition="center" mb="md" />
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-blue-50">
                      <p className="text-xs text-gray-500">Lead Name</p>
                      <p className="text-sm font-medium text-gray-800">{selectedActivity.leadDetails.name}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-800">{selectedActivity.leadDetails.email}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50">
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-800">{selectedActivity.leadDetails.phone}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50">
                      <p className="text-xs text-gray-500">Lead Source</p>
                      <p className="text-sm font-medium text-gray-800">{selectedActivity.leadDetails.source}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50">
                      <p className="text-xs text-gray-500">Assigned To</p>
                      <p className="text-sm font-medium text-gray-800">{selectedActivity.leadDetails.assignedTo}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50">
                      <p className="text-xs text-gray-500">Lead Status</p>
                      <Badge color="blue">{selectedActivity.leadDetails.status}</Badge>
                    </div>
                  </div>
                </>
              )}

              {selectedActivity.timeline && (
                <>
                  <Divider label="Timeline" labelPosition="center" mb="md" />
                  <div className="space-y-4">
                    {selectedActivity.timeline.map((event, idx) => (
                      <div key={idx} className="flex gap-3 p-3 rounded-lg bg-gray-50">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-gray-800">{event.title}</p>
                            <p className="text-xs text-gray-500">{event.time}</p>
                          </div>
                          <p className="mt-1 text-xs text-gray-600">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <Group justify="flex-end" mt="md">
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                  Close
                </Button>
                <Button color="green">
                  Download Details
                </Button>
              </Group>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ReportManagment;