'use client';

import React, { useState, useEffect } from 'react';
import {
  Button,
  Title,
  Paper,
  Grid,
  Select,
  Group,
  Stack,
  Table,
  Badge,
  ThemeIcon,
  Divider,
  Card,
  rem,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRupeeSign,
  faFileAlt,
  faShoppingCart,
  faChartLine,
  faArrowUp,
  faArrowDown,
  faBox,
  faTag,
  faPercent,
  faWallet,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const formatCurrency = (value: number) => {
  if (value >= 10000000) {
    return `₹ ${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) {
    return `₹ ${(value / 100000).toFixed(2)} L`;
  }
  return `₹ ${value.toLocaleString('en-IN')}`;
};

export const ReportsManagement = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [chartData, setChartData] = useState<any>({
    quantitiesVsOrders: {
      series: [
        {
          name: 'Enquiries',
          type: 'column',
          data: [30, 45, 38, 52, 48, 60, 55, 68, 72, 85, 78, 92],
        },
        {
          name: 'Orders',
          type: 'line',
          data: [12, 18, 15, 22, 20, 28, 25, 32, 35, 42, 38, 48],
        },
      ],
      options: {
        chart: {
          type: 'line',
          height: 350,
          toolbar: { show: true },
          zoom: { enabled: true },
        },
        title: { text: 'Enquiries vs Orders Trends', align: 'left' },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yaxis: [{ title: { text: 'Count' } }],
        colors: ['#3b82f6', '#10b981'],
        stroke: { width: [0, 3] },
        markers: { size: 4 },
      },
    },
    leadsBySource: {
      series: [46, 54],
      options: {
        chart: { type: 'pie', height: 350 },
        labels: ['Direct', 'Indirect'],
        colors: ['#3b82f6', '#f59e0b'],
        legend: { position: 'bottom' },
        dataLabels: { enabled: true, formatter: (val: number) => `${val.toFixed(1)}%` },
      },
    },
    revenueByCategory: {
      series: [43.0, 37.9, 13.0, 6.1],
      options: {
        chart: { type: 'donut', height: 350 },
        labels: ['Gantry Cranes', 'EOT Cranes', 'JIB Cranes', 'Other Products'],
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
        legend: { position: 'bottom' },
        dataLabels: { enabled: true, formatter: (val: number) => `${val.toFixed(1)}%` },
      },
    },
  });

  const statsCards = [
    { title: 'Total Revenue', value: '₹3.45 Cr', change: '+18.0%', trend: 'up', icon: faRupeeSign, color: 'blue' },
    { title: 'Total Enquiries', value: '128', change: '+12.5%', trend: 'up', icon: faFileAlt, color: 'cyan' },
    { title: 'Total Orders', value: '48', change: '+20.8%', trend: 'up', icon: faShoppingCart, color: 'green' },
    { title: 'Conversion Rate', value: '37.50%', change: '+2.6%', trend: 'up', icon: faPercent, color: 'violet' },
    { title: 'Average Order Value', value: '₹71.88 L', change: '+3.6%', trend: 'up', icon: faChartLine, color: 'orange' },
    { title: 'Outstanding Amount', value: '₹1.24 Cr', change: '-6.4%', trend: 'down', icon: faWallet, color: 'red' },
  ];

  const salesPanelData = [
    { label: 'Total Enquiries', value: '128', icon: faFileAlt, color: 'blue' },
    { label: 'Total Orders', value: '48', icon: faShoppingCart, color: 'green' },
    { label: 'Total Revenue', value: '₹3.45 Cr', icon: faRupeeSign, color: 'cyan' },
    { label: 'Total Discount', value: '₹16.7 L', icon: faTag, color: 'orange' },
    { label: 'Total Tax', value: '₹62.38 L', icon: faPercent, color: 'yellow' },
    { label: 'Net Revenue', value: '₹3.45 Cr', icon: faRupeeSign, color: 'teal' },
    { label: 'Average Order Value', value: '₹71.88 L', icon: faChartLine, color: 'violet' },
  ];

  const salesSummaryData = [
    { metric: 'Total Enquiries', thisPeriod: 128, lastPeriod: 114, change: 14, changePercent: 12.5, trend: 'up' },
    { metric: 'Total Orders', thisPeriod: 48, lastPeriod: 42, change: 6, changePercent: 14.3, trend: 'up' },
    { metric: 'Total Revenue', thisPeriod: 345000000, lastPeriod: 281000000, change: 6400000, changePercent: 18.6, trend: 'up' },
    { metric: 'Total Discount', thisPeriod: 1670000, lastPeriod: 1628000, change: 25500, changePercent: 15.7, trend: 'up' },
    { metric: 'Total Tax', thisPeriod: 6238000, lastPeriod: 6230000, change: 102500, changePercent: 24.3, trend: 'up' },
    { metric: 'Net Revenue', thisPeriod: 345000000, lastPeriod: 261000000, change: 5400000, changePercent: 16.6, trend: 'up' },
    { metric: 'Average Order Value', thisPeriod: 7188000, lastPeriod: 6929000, change: 259000, changePercent: 3.6, trend: 'up' },
  ];

  const revenueByCategoryData = [
    { category: 'Gantry Cranes', revenue: 11080000, percentage: 43.0 },
    { category: 'EOT Cranes', revenue: 10030000, percentage: 37.9 },
    { category: 'JIB Cranes', revenue: 9060000, percentage: 13.0 },
    { category: 'Workshop Cranes', revenue: 9050000, percentage: 6.1 },
    { category: 'Overhead Cranes', revenue: 9050000, percentage: 5.6 },
    { category: 'Others', revenue: 900808, percentage: 3.4 },
  ];

  const topCustomersData = [
    { rank: 1, name: 'ARC Electronics', revenue: 37090000 },
    { rank: 2, name: 'FGR Inventory', revenue: 28500000 },
    { rank: 3, name: 'LMN Industries', revenue: 18000000 },
    { rank: 4, name: 'DPS Steel', revenue: 17009000 },
  ];

  const formatRevenue = (value: number) => {
    if (value >= 10000000) {
      return `₹ ${(value / 10000000).toFixed(2)} Cr`;
    }
    return `₹ ${(value / 100000).toFixed(2)} L`;
  };

  const formatChange = (value: number, isCurrency: boolean = false) => {
    const prefix = value >= 0 ? '+' : '';
    if (isCurrency) {
      return `${prefix}₹ ${Math.abs(value / 100000).toFixed(2)} L`;
    }
    return `${prefix}${Math.abs(value)}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <Title order={2} className="text-gray-800">Reports</Title>
        <p className="text-gray-500 mt-1">Track overall performance of Sales from Enquiries to Order</p>
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
              <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.title}</p>
            </div>
          </Paper>
        ))}
      </div>

      {/* Sales Panel */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
        <Paper withBorder p="md" radius="md" className="bg-white lg:col-span-1">
          <Title order={4} className="mb-4 text-gray-700">Sales Panel</Title>
          <div className="space-y-3">
            {salesPanelData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 border-b last:border-0">
                <div className="flex items-center gap-2">
                  <ThemeIcon color={item.color} size="sm" radius="xl" variant="light">
                    <FontAwesomeIcon icon={item.icon} size="xs" />
                  </ThemeIcon>
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white lg:col-span-2">
          <Title order={4} className="mb-4 text-gray-700">Enquiries vs Orders Trends</Title>
          <ReactApexChart
            options={chartData.quantitiesVsOrders.options}
            series={chartData.quantitiesVsOrders.series}
            type="line"
            height={350}
          />
        </Paper>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Leads by Source</Title>
          <ReactApexChart
            options={chartData.leadsBySource.options}
            series={chartData.leadsBySource.series}
            type="pie"
            height={350}
          />
          <div className="mt-4 text-center">
            <Badge color="blue" size="lg">Direct: 46%</Badge>
            <Badge color="orange" size="lg" ml="md">Indirect: 54%</Badge>
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Revenue by Product Category</Title>
          <ReactApexChart
            options={chartData.revenueByCategory.options}
            series={chartData.revenueByCategory.series}
            type="donut"
            height={350}
          />
        </Paper>
      </div>

      {/* Sales Summary Table */}
      <Paper withBorder p="md" radius="md" className="bg-white mb-6">
        <Title order={4} className="mb-4 text-gray-700">Sales Summary</Title>
        <div className="overflow-x-auto">
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Metric</Table.Th>
                <Table.Th>This Period</Table.Th>
                <Table.Th>Last Period</Table.Th>
                <Table.Th>Change</Table.Th>
                <Table.Th>Change (%)</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {salesSummaryData.map((item, idx) => (
                <Table.Tr key={idx}>
                  <Table.Td className="font-medium">{item.metric}</Table.Td>
                  <Table.Td>
                    {item.metric.includes('Revenue') || item.metric.includes('Discount') || item.metric.includes('Tax') || item.metric.includes('Value')
                      ? formatRevenue(item.thisPeriod as number)
                      : item.thisPeriod}
                  </Table.Td>
                  <Table.Td>
                    {item.metric.includes('Revenue') || item.metric.includes('Discount') || item.metric.includes('Tax') || item.metric.includes('Value')
                      ? formatRevenue(item.lastPeriod as number)
                      : item.lastPeriod}
                  </Table.Td>
                  <Table.Td>
                    <span className={item.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                      {item.trend === 'up' ? '↑' : '↓'} {formatChange(item.change, item.metric.includes('Revenue') || item.metric.includes('Discount') || item.metric.includes('Tax'))}
                    </span>
                  </Table.Td>
                  <Table.Td>
                    <span className={item.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                      {item.trend === 'up' ? '↑' : '↓'} {item.changePercent}%
                    </span>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </Paper>

      {/* Revenue by Category Table and Top Customers */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Revenue by Product Category</Title>
          <div className="overflow-x-auto">
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Revenue</Table.Th>
                  <Table.Th>% of Total</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {revenueByCategoryData.map((item, idx) => (
                  <Table.Tr key={idx}>
                    <Table.Td>{item.category}</Table.Td>
                    <Table.Td className="font-semibold">{formatRevenue(item.revenue)}</Table.Td>
                    <Table.Td>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm">{item.percentage}%</span>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Top Customers by Revenue</Title>
          <div className="space-y-3">
            {topCustomersData.map((customer) => (
              <div key={customer.rank} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <FontAwesomeIcon icon={faTrophy} className={`text-${customer.rank === 1 ? 'yellow' : customer.rank === 2 ? 'gray' : 'orange'}-500`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{customer.name}</p>
                    <p className="text-xs text-gray-500">Rank #{customer.rank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{formatRevenue(customer.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </Paper>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-3 text-gray-700">Conversion Funnel</Title>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Enquiries to Documentation</span>
                <span className="font-semibold">68%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '68%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Documentation to Quotation</span>
                <span className="font-semibold">52%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '52%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Quotation to Order</span>
                <span className="font-semibold">45%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Overall Conversion</span>
                <span className="font-semibold">37.5%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: '37.5%' }} />
              </div>
            </div>
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-3 text-gray-700">Quarterly Performance</Title>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Q1 2025</span>
              <span className="font-semibold">₹82.5 L</span>
              <Badge color="green" size="sm">+12%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Q2 2025</span>
              <span className="font-semibold">₹94.2 L</span>
              <Badge color="green" size="sm">+14%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Q3 2025</span>
              <span className="font-semibold">₹1.12 Cr</span>
              <Badge color="green" size="sm">+19%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Q4 2025</span>
              <span className="font-semibold">₹1.45 Cr</span>
              <Badge color="green" size="sm">+29%</Badge>
            </div>
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-3 text-gray-700">Key Metrics</Title>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 border-b">
              <span className="text-sm">Customer Satisfaction</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }} />
                </div>
                <span className="text-sm font-semibold">4.6/5</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 border-b">
              <span className="text-sm">On-Time Delivery</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '88%' }} />
                </div>
                <span className="text-sm font-semibold">88%</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 border-b">
              <span className="text-sm">Repeat Customers</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: '67%' }} />
                </div>
                <span className="text-sm font-semibold">67%</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2">
              <span className="text-sm">Lead Response Time</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '95%' }} />
                </div>
                <span className="text-sm font-semibold">2.4 hrs</span>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};