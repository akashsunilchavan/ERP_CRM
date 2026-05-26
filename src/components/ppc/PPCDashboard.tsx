'use client';

import React, { useState } from 'react';
import {
  Button,
  Title,
  Paper,
  Grid,
  Select,
  ThemeIcon,
  Table,
  Badge,
  Divider,
  Card,
  Group,
  Stack,
  Progress,
  RingProgress,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBox,
  faClipboardList,
  faCalendarAlt,
  faCheckCircle,
  faTimesCircle,
  faChartLine,
  faChartBar,
  faChartPie,
  faTruck,
  faWarehouse,
  faIndustry,
  faClock,
  faUser,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-IN').format(value);
};

export const PPCDashboard = () => {
  const [timeRange, setTimeRange] = useState('monthly');

  const statsCards = [
    { title: 'Total Products', value: '156', change: '+2.5%', trend: 'up', icon: faBox, color: 'blue' },
    { title: 'Total BOMs', value: '243', change: '+1.8%', trend: 'up', icon: faClipboardList, color: 'cyan' },
    { title: 'Planned Orders', value: '128', change: '+15.2%', trend: 'up', icon: faCalendarAlt, color: 'green' },
    { title: 'Scheduled Orders', value: '96', change: '+10.8%', trend: 'up', icon: faClock, color: 'orange' },
    { title: 'On Time Completion', value: '92.6%', change: '+5.7%', trend: 'up', icon: faCheckCircle, color: 'teal' },
    { title: 'Delayed Orders', value: '12', change: '+53%', trend: 'down', icon: faTimesCircle, color: 'red' },
  ];

  const cashFlowData = {
    series: [
      { name: 'Revenue', type: 'line' as const, data: [28, 32, 38, 42, 48, 52, 58, 62, 68, 72, 78, 85] },
      { name: 'Expenses', type: 'line' as const, data: [18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52, 58] },
      { name: 'Profit', type: 'area' as const, data: [10, 10, 13, 14, 16, 17, 20, 20, 23, 24, 26, 27] },
    ],
    options: {
      chart: { type: 'line' as const, height: 350, toolbar: { show: true }, zoom: { enabled: true } },
      title: { text: 'Cash Flow Overview (₹ in Lakhs)', align: 'left' as const },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
      yaxis: { title: { text: 'Amount (₹ in Lakhs)' } },
      colors: ['#3b82f6', '#ef4444', '#10b981'],
      stroke: { width: [2, 2, 0] },
      fill: { type: ['solid', 'solid', 'gradient'] },
      markers: { size: 4 },
      legend: { position: 'top' as const },
    },
  };

  const progressionsData = {
    series: [48, 50, 22, 34, 18, 17, 30, 9, 10, 19],
    options: {
      chart: { type: 'donut' as const, height: 300 },
      labels: ['Component A', 'Component B', 'Component C', 'In Progress', 'Planned A', 'Planned B', 'Planned C', 'Delivered A', 'Delivered B', 'Delivered C'],
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#14b8a6'],
      legend: { position: 'bottom' as const },
      dataLabels: { enabled: true, formatter: (val: number) => `${val.toFixed(1)}%` },
    },
  };

  const materialAvailabilityData = {
    series: [65, 20, 10, 5],
    options: {
      chart: { type: 'pie' as const, height: 300 },
      labels: ['Available', 'Backordered', 'Lost', 'Not Available'],
      colors: ['#10b981', '#f59e0b', '#ef4444', '#6b7280'],
      legend: { position: 'bottom' as const },
      dataLabels: { enabled: true, formatter: (val: number) => `${val.toFixed(1)}%` },
    },
  };

  const purchaseRequisitionData = {
    series: [{ name: 'Purchase Requisitions', data: [124, 86, 38] }],
    options: {
      chart: { type: 'bar' as const, height: 350, toolbar: { show: true } },
      title: { text: 'Purchase Requisition Summary', align: 'left' as const },
      xaxis: { categories: ['Total PRs', 'Approved PRs', 'Pending PRs'] },
      yaxis: { title: { text: 'Count' } },
      colors: ['#3b82f6'],
      plotOptions: { bar: { borderRadius: 8, horizontal: false } },
    },
  };

  const tmsData = {
    series: [{ name: 'TMS Performance', data: [36, 42, 38, 45, 52, 48, 55, 60, 58, 62, 65, 70] }],
    options: {
      chart: { type: 'bar' as const, height: 350, toolbar: { show: true } },
      title: { text: 'TMS Monthly Performance', align: 'left' as const },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
      yaxis: { title: { text: 'Performance Score' } },
      colors: ['#8b5cf6'],
      plotOptions: { bar: { borderRadius: 8, horizontal: false } },
    },
  };

  const recentActivities = [
    { activity: 'BOM Created', reference: 'BOM2502', date_time: '30 May, 2026, 10:30 AM', user: 'Admin' },
    { activity: 'Production Plan Created', reference: 'PPC0067', date_time: '30 May, 2026, 10:00 AM', user: 'Admin' },
    { activity: 'Order Scheduled', reference: 'SCH0301', date_time: '30 May, 2026, 09:15 AM', user: 'Admin' },
    { activity: 'Material Plan Generated', reference: 'MOP080', date_time: '30 May, 2026, 09:00 AM', user: 'Admin' },
    { activity: 'Purchase Requisition Created', reference: 'PR0076', date_time: '29 May, 2026, 05:15 PM', user: 'Admin' },
  ];

  const upcomingSchedules = [
    { schedule_no: 'SCH04001', product: 'Gear Assembly', planned_start: '02 June 2026', planned_end: '06 June 2026', status: 'Planned' },
    { schedule_no: 'SCH0019', product: 'Hydraulic Pump', planned_start: '03 June 2026', planned_end: '06 June 2026', status: 'Planned' },
    { schedule_no: 'SCH0201', product: 'Control Panel', planned_start: '04 June 2026', planned_end: '07 June 2026', status: 'Scheduled' },
    { schedule_no: 'SCH0025', product: 'Motor Housing', planned_start: '05 June 2026', planned_end: '08 June 2026', status: 'Planned' },
    { schedule_no: 'SCH0098', product: 'Valve Body', planned_start: '05 June 2026', planned_end: '09 June 2026', status: 'In Progress' },
  ];

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Planned: 'blue',
      Scheduled: 'cyan',
      'In Progress': 'yellow',
      Completed: 'green',
      Delayed: 'red',
    };
    return <Badge color={colors[status] || 'gray'} variant="light">{status}</Badge>;
  };

  const getActivityIcon = (activity: string) => {
    if (activity.includes('BOM')) return faClipboardList;
    if (activity.includes('Production')) return faIndustry;
    if (activity.includes('Order')) return faCalendarAlt;
    if (activity.includes('Material')) return faBox;
    if (activity.includes('Purchase')) return faTruck;
    return faUser;
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header Section */}
      <div className="mb-6">
        <Title order={2} className="text-gray-800">PPC Dashboard</Title>
        <p className="mt-1 text-gray-500">Overview of Production planning and control operations</p>
      </div>

      {/* Time Range Filter */}
      <div className="flex justify-end mb-4">
        <Select
          placeholder="Select Time Range"
          value={timeRange}
          onChange={(value) => setTimeRange(value || 'monthly')}
          data={[
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
            { value: 'quarterly', label: 'Quarterly' },
            { value: 'yearly', label: 'Yearly' },
          ]}
          className="w-48"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statsCards.map((stat, index) => (
          <Paper key={index} withBorder p="md" radius="md" className="bg-white">
            <div className="flex items-center justify-between mb-2">
              <ThemeIcon color={stat.color} size="lg" radius="xl" variant="light">
                <FontAwesomeIcon icon={stat.icon} />
              </ThemeIcon>
              <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-500">{stat.title}</p>
            </div>
          </Paper>
        ))}
      </div>

      {/* Cash Flow Chart */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <ReactApexChart options={cashFlowData.options} series={cashFlowData.series} type="line" height={380} />
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div><span className="text-sm">Revenue</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span className="text-sm">Expenses</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div><span className="text-sm">Profit</span></div>
          </div>
        </Paper>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Progressions Overview</Title>
          <ReactApexChart options={progressionsData.options} series={progressionsData.series} type="donut" height={320} />
       
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Material Availability</Title>
          <ReactApexChart options={materialAvailabilityData.options} series={materialAvailabilityData.series} type="pie" height={320} />
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div><span className="text-xs">Available (65%)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full"></div><span className="text-xs">Backordered (20%)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span className="text-xs">Lost (10%)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-500 rounded-full"></div><span className="text-xs">Not Available (5%)</span></div>
          </div>
        </Paper>
      </div>

      {/* Purchase Requisition and TMS Charts */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <ReactApexChart options={purchaseRequisitionData.options} series={purchaseRequisitionData.series} type="bar" height={350} />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <Paper withBorder p="sm" className="text-center bg-blue-50">
              <p className="text-sm text-gray-600">Total PRs</p>
              <p className="text-2xl font-bold text-blue-600">124</p>
            </Paper>
            <Paper withBorder p="sm" className="text-center bg-green-50">
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">86</p>
            </Paper>
            <Paper withBorder p="sm" className="text-center bg-orange-50">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">38</p>
            </Paper>
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <ReactApexChart options={tmsData.options} series={tmsData.series} type="bar" height={350} />
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded-full"></div><span className="text-sm">TMS Performance Score</span></div>
          </div>
        </Paper>
      </div>

      {/* Recent Activities and Upcoming Schedules */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Recent Activities</Title>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Activity</Table.Th>
                <Table.Th>References</Table.Th>
                <Table.Th>Date and Time</Table.Th>
                <Table.Th>User</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {recentActivities.map((activity, idx) => (
                <Table.Tr key={idx}>
                  <Table.Td>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={getActivityIcon(activity.activity)} className="text-sm text-blue-500" />
                      <span className="font-medium">{activity.activity}</span>
                    </div>
                  </Table.Td>
                  <Table.Td className="font-mono text-sm">{activity.reference}</Table.Td>
                  <Table.Td className="text-sm">{activity.date_time}</Table.Td>
                  <Table.Td>{activity.user}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Upcoming Schedules</Title>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Schedule No.</Table.Th>
                <Table.Th>Product</Table.Th>
                <Table.Th>Planned Start</Table.Th>
                <Table.Th>Planned End</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {upcomingSchedules.map((schedule, idx) => (
                <Table.Tr key={idx}>
                  <Table.Td className="font-mono text-sm font-medium text-blue-600">{schedule.schedule_no}</Table.Td>
                  <Table.Td>{schedule.product}</Table.Td>
                  <Table.Td className="text-sm">{schedule.planned_start}</Table.Td>
                  <Table.Td className="text-sm">{schedule.planned_end}</Table.Td>
                  <Table.Td>{getStatusBadge(schedule.status)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </div>

      {/* Production Metrics Summary */}
      <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-4">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-3 text-gray-700">Production Efficiency</Title>
          <div className="text-center">
            <RingProgress
              size={120}
              thickness={12}
              sections={[{ value: 86, color: 'green' }]}
              label={<div className="text-center"><span className="text-2xl font-bold">86%</span></div>}
            />
            <p className="mt-2 text-sm text-gray-500">Overall Efficiency</p>
            <Progress value={86} size="sm" color="green" mt="md" />
            <p className="mt-1 text-xs text-gray-400">Target: 90%</p>
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-3 text-gray-700">Order Fulfillment</Title>
          <div className="text-center">
            <RingProgress
              size={120}
              thickness={12}
              sections={[{ value: 78, color: 'blue' }]}
              label={<div className="text-center"><span className="text-2xl font-bold">78%</span></div>}
            />
            <p className="mt-2 text-sm text-gray-500">Fulfillment Rate</p>
            <div className="flex justify-between mt-2">
              <span className="text-xs">Completed: 96</span>
              <span className="text-xs">Total: 128</span>
            </div>
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-3 text-gray-700">Quality Metrics</Title>
          <div className="text-center">
            <RingProgress
              size={120}
              thickness={12}
              sections={[{ value: 94.5, color: 'teal' }]}
              label={<div className="text-center"><span className="text-2xl font-bold">94.5%</span></div>}
            />
            <p className="mt-2 text-sm text-gray-500">Quality Pass Rate</p>
            <div className="flex justify-between mt-2">
              <span className="text-xs">Defects: 2.5%</span>
              <span className="text-xs">Rework: 3%</span>
            </div>
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-3 text-gray-700">Resource Utilization</Title>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Machine Utilization</span>
                <span className="font-semibold">72%</span>
              </div>
              <Progress value={72} size="sm" color="cyan" />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Labor Utilization</span>
                <span className="font-semibold">85%</span>
              </div>
              <Progress value={85} size="sm" color="green" />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Inventory Turnover</span>
                <span className="font-semibold">68%</span>
              </div>
              <Progress value={68} size="sm" color="orange" />
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};