'use client';

import React, { useState } from 'react';
import { 
  Card, Badge, Button, Modal, Select, Group, 
  Divider, Tooltip, Table, Tabs, Progress, 
  TextInput, Pagination, Indicator
} from '@mantine/core';
import { 
  Eye, TrendingUp, TrendingDown, Server, 
  Database, Users, Activity, Clock, AlertCircle,
  CheckCircle, Calendar, Download, Filter, RefreshCw,
  HardDrive, Cpu, BarChart3, LineChart, PieChart,
  Search, ChevronRight, Zap
} from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface AuditLog {
  id: number;
  time: string;
  user: string;
  role: string;
  company: string;
  action: string;
  metric: string;
  description: string;
  status: string;
}

interface CompanyUsage {
  id: number;
  name: string;
  totalUsers: number;
  leadsCreated: number;
  storage: string;
  storageBytes: number;
  logins: number;
}

interface PerformanceLog {
  id: number;
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  responseTime: number;
  errorRatio: number;
  stats: string;
}

const SystemLogs = () => {
  const [activeTab, setActiveTab] = useState<string | null>('system');
  const [companySearch, setCompanySearch] = useState('');
  const [auditSearch, setAuditSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string | null>('24h');

  const statsData = {
    totalLogs: 12431,
    totalLogsGrowth: 10.6,
    auditLogs: 5231,
    auditLogsGrowth: 14.3,
    performanceLogs: 3812,
    performanceLogsGrowth: 20.0,
    errorLogs: 1243,
    errorLogsGrowth: 5.2
  };

  const companyUsageData: CompanyUsage[] = [
    { id: 1, name: 'Company 1', totalUsers: 12, leadsCreated: 249, storage: '1.32 GB', storageBytes: 1417339200, logins: 590 },
    { id: 2, name: 'Company 2', totalUsers: 8, leadsCreated: 198, storage: '960 MB', storageBytes: 1006632960, logins: 281 },
    { id: 3, name: 'Company 3', totalUsers: 10, leadsCreated: 156, storage: '1.12 GB', storageBytes: 1202590843, logins: 210 }
  ];

  const auditLogsData: AuditLog[] = [
    {
      id: 1,
      time: '24 Apr, 2024, 10:30 AM',
      user: 'John Doe',
      role: 'Super Admin',
      company: 'Company 2',
      action: 'Create',
      metric: 'Lead',
      description: 'How Lead Seller Takes Calculated Actions',
      status: 'Success'
    },
    {
      id: 2,
      time: '24 Apr, 2024, 10:30 AM',
      user: 'Sarah Wilson',
      role: 'Admin',
      company: 'Company 1',
      action: 'Update',
      metric: 'Lead Staff',
      description: 'Lead Sales charged to Current Period',
      status: 'Success'
    },
    {
      id: 3,
      time: '24 Apr, 2024, 10:30 AM',
      user: 'Mike Johnson',
      role: 'Manager',
      company: 'Company 3',
      action: 'Create',
      metric: 'User',
      description: 'New user Tim Dees created',
      status: 'Success'
    },
    {
      id: 4,
      time: '24 Apr, 2024, 10:30 AM',
      user: 'Emily Davis',
      role: 'Admin',
      company: 'Company 1',
      action: 'Delete',
      metric: 'Staff',
      description: 'Staff 1st transaction',
      status: 'Success'
    }
  ];

  const performanceMetrics = {
    avgCpuUsage: 32.6,
    avgMemoryUsage: 61.2,
    avgResponseTime: 320,
    errorRate: 0.45
  };

  const performanceLogsData: PerformanceLog[] = [
    {
      id: 1,
      timestamp: '24 Apr, 2024, 10:30 AM',
      cpuUsage: 28.8,
      memoryUsage: 58.3,
      responseTime: 280,
      errorRatio: 0.35,
      stats: 'Healthy'
    },
    {
      id: 2,
      timestamp: '24 Apr, 2024, 10:30 AM',
      cpuUsage: 34.2,
      memoryUsage: 69.1,
      responseTime: 310,
      errorRatio: 0.42,
      stats: 'Healthy'
    },
    {
      id: 3,
      timestamp: '24 Apr, 2024, 10:30 AM',
      cpuUsage: 37.8,
      memoryUsage: 63.5,
      responseTime: 340,
      errorRatio: 0.48,
      stats: 'Warning'
    }
  ];

  const cpuChartOptions = {
    chart: {
      type: 'area' as const,
      toolbar: { show: false },
      zoom: { enabled: false },
      height: 300
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' as const, width: 2 },
    colors: ['#3B82F6'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
      labels: { style: { fontSize: '10px' } }
    },
    yaxis: { title: { text: 'CPU Usage (%)' }, min: 0, max: 100 },
    tooltip: { theme: 'dark' }
  };

  const cpuChartSeries = [{ name: 'CPU Usage', data: [28, 32, 35, 42, 38, 34, 30] }];

  const memoryChartOptions = {
    chart: {
      type: 'area' as const,
      toolbar: { show: false },
      zoom: { enabled: false },
      height: 300
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' as const, width: 2 },
    colors: ['#10B981'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
      labels: { style: { fontSize: '10px' } }
    },
    yaxis: { title: { text: 'Memory Usage (%)' }, min: 0, max: 100 },
    tooltip: { theme: 'dark' }
  };

  const memoryChartSeries = [{ name: 'Memory Usage', data: [55, 58, 62, 68, 65, 60, 56] }];

  const responseTimeChartOptions = {
    chart: {
      type: 'line' as const,
      toolbar: { show: false },
      zoom: { enabled: false },
      height: 300
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' as const, width: 2, color: '#F59E0B' },
    colors: ['#F59E0B'],
    xaxis: {
      categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
      labels: { style: { fontSize: '10px' } }
    },
    yaxis: { title: { text: 'Response Time (ms)' } },
    tooltip: { theme: 'dark' }
  };

  const responseTimeChartSeries = [{ name: 'Response Time', data: [280, 295, 310, 325, 315, 300, 290] }];

  const errorRateChartOptions = {
    chart: {
      type: 'line' as const,
      toolbar: { show: false },
      zoom: { enabled: false },
      height: 300
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' as const, width: 2, color: '#EF4444' },
    colors: ['#EF4444'],
    xaxis: {
      categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
      labels: { style: { fontSize: '10px' } }
    },
    yaxis: { title: { text: 'Error Rate (%)' }, min: 0, max: 2 },
    tooltip: { theme: 'dark' }
  };

  const errorRateChartSeries = [{ name: 'Error Rate', data: [0.38, 0.42, 0.45, 0.52, 0.48, 0.44, 0.40] }];

  const logsDistributionChartOptions = {
    chart: {
      type: 'donut' as const,
      toolbar: { show: false },
      height: 300
    },
    labels: ['Audit Logs', 'Performance Logs', 'Error Logs'],
    colors: ['#3B82F6', '#10B981', '#EF4444'],
    legend: { position: 'bottom' as const },
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
              formatter: () => statsData.totalLogs.toString()
            }
          }
        }
      }
    }
  };

  const logsDistributionSeries = [statsData.auditLogs, statsData.performanceLogs, statsData.errorLogs];

  const getStatusColor = (status: string) => {
    if (status === 'Success') return 'green';
    if (status === 'Warning') return 'yellow';
    return 'red';
  };

  const getStatsColor = (stats: string) => {
    if (stats === 'Healthy') return 'green';
    return 'yellow';
  };

  const formatStorage = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(2)} GB`;
  };

  const filteredCompanies = companyUsageData.filter(company =>
    company.name.toLowerCase().includes(companySearch.toLowerCase())
  );

  const filteredAuditLogs = auditLogsData.filter(log =>
    log.user.toLowerCase().includes(auditSearch.toLowerCase()) ||
    log.company.toLowerCase().includes(auditSearch.toLowerCase()) ||
    log.action.toLowerCase().includes(auditSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                System Logs
              </h1>
              <p className="mt-1 text-gray-600">
                Modular platform actions, performance and all administrative activities.
              </p>
            </div>
            <div className="flex gap-3">
              <Select
                value={selectedTimeRange}
                onChange={setSelectedTimeRange}
                data={['24h', '7d', '30d', '90d']}
                className="w-32"
              />
              <Button variant="outline" leftSection={<Download size={16} />}>
                Export
              </Button>
              <Button variant="outline" leftSection={<RefreshCw size={16} />}>
                Refresh
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
          <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Logs</p>
                <p className="text-3xl font-bold text-gray-800">{statsData.totalLogs.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp size={14} className="text-green-500" />
                  <span className="text-xs text-green-600">+{statsData.totalLogsGrowth}%</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <Database size={24} className="text-blue-600" />
              </div>
            </div>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Audit Logs</p>
                <p className="text-3xl font-bold text-gray-800">{statsData.auditLogs.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp size={14} className="text-green-500" />
                  <span className="text-xs text-green-600">+{statsData.auditLogsGrowth}%</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                <Activity size={24} className="text-green-600" />
              </div>
            </div>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Performance Logs</p>
                <p className="text-3xl font-bold text-gray-800">{statsData.performanceLogs.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp size={14} className="text-green-500" />
                  <span className="text-xs text-green-600">+{statsData.performanceLogsGrowth}%</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
                <Server size={24} className="text-purple-600" />
              </div>
            </div>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Error Logs</p>
                <p className="text-3xl font-bold text-gray-800">{statsData.errorLogs.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp size={14} className="text-red-500" />
                  <span className="text-xs text-red-600">+{statsData.errorLogsGrowth}%</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
                <AlertCircle size={24} className="text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onChange={setActiveTab} mb="lg">
          <Tabs.List grow>
            <Tabs.Tab value="system" leftSection={<Server size={16} />}>System Performance</Tabs.Tab>
            <Tabs.Tab value="company" leftSection={<Users size={16} />}>Company Usage</Tabs.Tab>
            <Tabs.Tab value="audit" leftSection={<Activity size={16} />}>Audit Logs</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-500">Average CPU Usage</p>
                  <Cpu size={20} className="text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">{performanceMetrics.avgCpuUsage}%</p>
                <Progress value={performanceMetrics.avgCpuUsage} size="sm" color="blue" mt="sm" />
              </Card>

              <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-500">Average Memory Usage</p>
                  <HardDrive size={20} className="text-green-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">{performanceMetrics.avgMemoryUsage}%</p>
                <Progress value={performanceMetrics.avgMemoryUsage} size="sm" color="green" mt="sm" />
              </Card>

              <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-500">Average Response Time</p>
                  <Clock size={20} className="text-orange-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">{performanceMetrics.avgResponseTime} ms</p>
                <div className="h-1 mt-2 bg-gray-200 rounded-full">
                  <div className="h-1 bg-orange-500 rounded-full" style={{ width: '32%' }} />
                </div>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-500">Error Rate</p>
                  <AlertCircle size={20} className="text-red-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">{performanceMetrics.errorRate}%</p>
                <Progress value={performanceMetrics.errorRate * 10} size="sm" color="red" mt="sm" />
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">CPU Usage Trend</h3>
                <ReactApexChart options={cpuChartOptions} series={cpuChartSeries} type="area" height={300} />
              </Card>

              <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">Memory Usage Trend</h3>
                <ReactApexChart options={memoryChartOptions} series={memoryChartSeries} type="area" height={300} />
              </Card>

              <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">Response Time Trend</h3>
                <ReactApexChart options={responseTimeChartOptions} series={responseTimeChartSeries} type="line" height={300} />
              </Card>

              <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">Error Rate Trend</h3>
                <ReactApexChart options={errorRateChartOptions} series={errorRateChartSeries} type="line" height={300} />
              </Card>

              <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200 lg:col-span-2">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">Logs Distribution</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <ReactApexChart options={logsDistributionChartOptions} series={logsDistributionSeries} type="donut" height={300} />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Audit Logs</span>
                      </div>
                      <span className="text-lg font-semibold text-gray-800">{statsData.auditLogs.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Performance Logs</span>
                      </div>
                      <span className="text-lg font-semibold text-gray-800">{statsData.performanceLogs.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Error Logs</span>
                      </div>
                      <span className="text-lg font-semibold text-gray-800">{statsData.errorLogs.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">Recent Performance Logs</h3>
              <div className="overflow-x-auto">
                <Table>
                  <Table.Thead>
                    <Table.Tr className="border-b-2 border-gray-200">
                      <Table.Th>Timestamp</Table.Th>
                      <Table.Th>CPU Usage</Table.Th>
                      <Table.Th>Memory Usage</Table.Th>
                      <Table.Th>Response Time</Table.Th>
                      <Table.Th>Error Ratio</Table.Th>
                      <Table.Th>Status</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {performanceLogsData.map((log) => (
                      <Table.Tr key={log.id} className="border-b border-gray-100">
                        <Table.Td className="text-sm text-gray-600">{log.timestamp}</Table.Td>
                        <Table.Td>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{log.cpuUsage}%</span>
                            <Progress value={log.cpuUsage} size="xs" color="blue" className="w-20" />
                          </div>
                        </Table.Td>
                        <Table.Td>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{log.memoryUsage}%</span>
                            <Progress value={log.memoryUsage} size="xs" color="green" className="w-20" />
                          </div>
                        </Table.Td>
                        <Table.Td className="text-sm text-gray-600">{log.responseTime} ms</Table.Td>
                        <Table.Td className="text-sm text-gray-600">{log.errorRatio}%</Table.Td>
                        <Table.Td>
                          <Badge color={getStatsColor(log.stats)} size="sm">
                            {log.stats}
                          </Badge>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-500">Showing 1 to 3 of 33 entries</p>
                <Pagination total={11} value={currentPage} onChange={setCurrentPage} size="sm" />
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'company' && (
          <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Company Usage Monitoring</h3>
              <TextInput
                placeholder="Search company..."
                value={companySearch}
                onChange={(e) => setCompanySearch(e.target.value)}
                leftSection={<Search size={16} />}
                className="w-64"
              />
            </div>

            <div className="overflow-x-auto">
              <Table>
                <Table.Thead>
                  <Table.Tr className="border-b-2 border-gray-200">
                    <Table.Th className="text-sm font-semibold text-gray-700">#</Table.Th>
                    <Table.Th className="text-sm font-semibold text-gray-700">Company Name</Table.Th>
                    <Table.Th className="text-sm font-semibold text-gray-700">Total Users</Table.Th>
                    <Table.Th className="text-sm font-semibold text-gray-700">Leads Created</Table.Th>
                    <Table.Th className="text-sm font-semibold text-gray-700">Data/Storage</Table.Th>
                    <Table.Th className="text-sm font-semibold text-gray-700">Logins</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredCompanies.map((company, idx) => (
                    <Table.Tr key={company.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <Table.Td className="text-sm text-gray-600">{idx + 1}</Table.Td>
                      <Table.Td className="text-sm font-medium text-gray-800">{company.name}</Table.Td>
                      <Table.Td className="text-sm text-gray-600">{company.totalUsers}</Table.Td>
                      <Table.Td className="text-sm text-gray-600">{company.leadsCreated.toLocaleString()}</Table.Td>
                      <Table.Td className="text-sm text-gray-600">{company.storage}</Table.Td>
                      <Table.Td className="text-sm text-gray-600">{company.logins.toLocaleString()}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          </Card>
        )}

        {activeTab === 'audit' && (
          <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Audit Logs</h3>
              <TextInput
                placeholder="Search by user, company or action..."
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                leftSection={<Search size={16} />}
                className="w-80"
              />
            </div>

            <div className="overflow-x-auto">
              <Table>
                <Table.Thead>
                  <Table.Tr className="border-b-2 border-gray-200">
                    <Table.Th className="text-sm font-semibold text-gray-700">Time</Table.Th>
                    <Table.Th className="text-sm font-semibold text-gray-700">User / Role</Table.Th>
                    <Table.Th className="text-sm font-semibold text-gray-700">Company</Table.Th>
                    <Table.Th className="text-sm font-semibold text-gray-700">Action</Table.Th>
                    <Table.Th className="text-sm font-semibold text-gray-700">Metric</Table.Th>
                    <Table.Th className="text-sm font-semibold text-gray-700">Description</Table.Th>
                    <Table.Th className="text-sm font-semibold text-gray-700">Status</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredAuditLogs.map((log) => (
                    <Table.Tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <Table.Td className="text-sm text-gray-600 whitespace-nowrap">{log.time}</Table.Td>
                      <Table.Td>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{log.user}</p>
                          <p className="text-xs text-gray-500">{log.role}</p>
                        </div>
                      </Table.Td>
                      <Table.Td className="text-sm text-gray-600">{log.company}</Table.Td>
                      <Table.Td>
                        <Badge variant="light" color="blue" size="sm">
                          {log.action}
                        </Badge>
                      </Table.Td>
                      <Table.Td className="text-sm text-gray-600">{log.metric}</Table.Td>
                      <Table.Td className="max-w-md text-sm text-gray-600 truncate">{log.description}</Table.Td>
                      <Table.Td>
                        <Badge color={getStatusColor(log.status)} size="sm">
                          {log.status}
                        </Badge>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">Showing 1 to {filteredAuditLogs.length} of 33 entries</p>
              <Pagination total={9} value={currentPage} onChange={setCurrentPage} size="sm" />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SystemLogs;