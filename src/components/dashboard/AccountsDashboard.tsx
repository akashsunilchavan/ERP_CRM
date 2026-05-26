'use client';

import React, { useState } from 'react';
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
  Text,
  rem,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRupeeSign,
  faWallet,
  faCreditCard,
  faMoneyBill,
  faChartLine,
  faUsers,
  faBuilding,
  faFileInvoice,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const AccountsDashboard = () => {
  const [timeRange, setTimeRange] = useState('monthly');

  const cashFlowData = {
    series: [
      {
        name: 'Income',
        type: 'column' as const,
        data: [28, 32, 38, 42, 48, 52, 58, 62, 68, 72, 78, 85],
      },
      {
        name: 'Expenses',
        type: 'line' as const,
        data: [18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52, 58],
      },
    ],
    options: {
      chart: {
        type: 'line' as const,
        height: 350,
        toolbar: { show: true },
        zoom: { enabled: true },
      },
      title: { 
        text: 'Cash Flow Overview', 
        align: 'left' as const,
        style: { fontSize: '16px', fontWeight: '600', color: '#374151' }
      },
      subtitle: {
        text: 'Y-Axis: ₹ (in Lakhs) | X-Axis: Time (in months)',
        align: 'left' as const,
        style: { fontSize: '12px', color: '#6b7280' }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        title: { text: 'Time (in months)' }
      },
      yaxis: {
        title: { text: 'Amount (₹ in Lakhs)' },
        labels: {
          formatter: (val: number) => `₹${val}L`
        }
      },
      colors: ['#3b82f6', '#ef4444'],
      stroke: { width: [0, 3] },
      markers: { size: 4 },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (val: number) => `₹${val} Lakhs`
        }
      },
      legend: {
        position: 'top' as const
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      }
    },
  };

  const statsCards = [
    { title: 'Pending Payments', value: 1845750, icon: faWallet, color: 'orange', bgColor: '#fff7ed' },
    { title: 'Received Payments', value: 3276540, icon: faMoneyBill, color: 'green', bgColor: '#f0fdf4' },
    { title: 'Outstanding Amount', value: 5122300, icon: faCreditCard, color: 'red', bgColor: '#fef2f2' },
    { title: 'Vendor Payables', value: 1267890, icon: faBuilding, color: 'blue', bgColor: '#eff6ff' },
  ];

  const paymentOverview = {
    total: 3276540,
    invoices: 76540,
    payments: 75000,
    outstanding: 1287890,
  };

  const recentCustomerPayments = [
    { customer: 'ABC Engineers', invoiceNo: 'INV5021', paymentDate: '25 May, 2024', amount: 456560, status: 'Pending' },
    { customer: 'LMN Industries', invoiceNo: 'NAV0332', paymentDate: '19 May, 2024', amount: 525000, status: 'Pending' },
    { customer: 'DPS Steel', invoiceNo: 'INVT025', paymentDate: '10 May, 2024', amount: 250000, status: 'Received' },
    { customer: 'POF Engineering', invoiceNo: 'INV0015', paymentDate: '20 April, 2024', amount: 575000, status: 'Received' },
    { customer: 'XYZ Builders', invoiceNo: 'NV0070', paymentDate: '20 April, 2024', amount: 241030, status: 'Received' },
  ];

  const recentVendorPayments = [
    { vendor: 'Steel Inte Ltd.', billNo: 'BLL1023', paymentDate: '25 May, 2024', amount: 100000, status: 'Pending' },
    { vendor: 'Metro Pvt. Ltd.', billNo: 'BLL1032', paymentDate: '19 May, 2024', amount: 95000, status: 'Pending' },
    { vendor: 'Global Industries', billNo: 'BLL1025', paymentDate: '10 May, 2024', amount: 125000, status: 'Paid' },
    { vendor: 'ABC Logistics', billNo: 'BLL1019', paymentDate: '20 April, 2024', amount: 75000, status: 'Paid' },
    { vendor: 'XYZ Ints Ltd.', billNo: 'BLL1009', paymentDate: '20 April, 2024', amount: 60000, status: 'Paid' },
  ];

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Pending: 'yellow',
      Received: 'green',
      Paid: 'green',
    };
    return (
      <Badge color={colors[status] || 'gray'} variant="light">
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header Section */}
      <div className="mb-6">
        <Title order={2} className="text-gray-800">Accounts Dashboard</Title>
        <p className="mt-1 text-gray-500">Overview of your sales activities and performance</p>
      </div>

      {/* Stats Cards - Four Cards in a Row */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Paper
            key={index}
            withBorder
            p="md"
            radius="md"
            style={{ backgroundColor: stat.bgColor, borderColor: '#e5e7eb' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(stat.value)}</p>
              </div>
              <ThemeIcon color={stat.color} size="xl" radius="xl" variant="light">
                <FontAwesomeIcon icon={stat.icon} size="lg" />
              </ThemeIcon>
            </div>
          </Paper>
        ))}
      </div>

      {/* Cash Flow Overview Chart */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <ReactApexChart
            options={cashFlowData.options}
            series={cashFlowData.series}
            type="line"
            height={400}
          />
        </Paper>
      </div>

      {/* Payment Overview Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <div className="text-center">
            <p className="mb-1 text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(paymentOverview.total)}</p>
          </div>
        </Paper>
        <Paper withBorder p="md" radius="md" className="bg-white">
          <div className="text-center">
            <p className="mb-1 text-sm text-gray-500">Invoices</p>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(paymentOverview.invoices)}</p>
          </div>
        </Paper>
        <Paper withBorder p="md" radius="md" className="bg-white">
          <div className="text-center">
            <p className="mb-1 text-sm text-gray-500">Payments</p>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(paymentOverview.payments)}</p>
          </div>
        </Paper>
        <Paper withBorder p="md" radius="md" className="bg-white">
          <div className="text-center">
            <p className="mb-1 text-sm text-gray-500">Outstanding</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(paymentOverview.outstanding)}</p>
          </div>
        </Paper>
      </div>

      {/* Recent Payments Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Customer Payments */}
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Recent Customer Payments</Title>
          <div className="overflow-x-auto">
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Customer Name</Table.Th>
                  <Table.Th>Invoice No.</Table.Th>
                  <Table.Th>Payment Date</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {recentCustomerPayments.map((payment, idx) => (
                  <Table.Tr key={idx}>
                    <Table.Td className="font-medium">{payment.customer}</Table.Td>
                    <Table.Td>{payment.invoiceNo}</Table.Td>
                    <Table.Td>{payment.paymentDate}</Table.Td>
                    <Table.Td className="font-semibold">{formatCurrency(payment.amount)}</Table.Td>
                    <Table.Td>{getStatusBadge(payment.status)}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </Paper>

        {/* Recent Vendor Payments */}
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Recent Vendor Payments</Title>
          <div className="overflow-x-auto">
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Vendor Name</Table.Th>
                  <Table.Th>Bill No.</Table.Th>
                  <Table.Th>Payment Date</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {recentVendorPayments.map((payment, idx) => (
                  <Table.Tr key={idx}>
                    <Table.Td className="font-medium">{payment.vendor}</Table.Td>
                    <Table.Td>{payment.billNo}</Table.Td>
                    <Table.Td>{payment.paymentDate}</Table.Td>
                    <Table.Td className="font-semibold">{formatCurrency(payment.amount)}</Table.Td>
                    <Table.Td>{getStatusBadge(payment.status)}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </Paper>
      </div>

      {/* Additional Financial Insights */}
      <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-3 text-gray-700">Payment Summary by Month</Title>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">May 2025</span>
              <span className="font-semibold text-green-600">+₹4.2L</span>
              <Badge color="green">Received</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">April 2025</span>
              <span className="font-semibold text-green-600">+₹3.8L</span>
              <Badge color="green">Received</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">March 2025</span>
              <span className="font-semibold text-orange-600">-₹2.1L</span>
              <Badge color="yellow">Pending</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">February 2025</span>
              <span className="font-semibold text-green-600">+₹5.0L</span>
              <Badge color="green">Received</Badge>
            </div>
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-3 text-gray-700">Invoice Aging Summary</Title>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>0-30 Days</span>
                <span className="font-semibold">₹2.5L</span>
              </div>
              <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>31-60 Days</span>
                <span className="font-semibold">₹1.8L</span>
              </div>
              <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '32%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>61-90 Days</span>
                <span className="font-semibold">₹1.2L</span>
              </div>
              <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '22%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>90+ Days</span>
                <span className="font-semibold">₹0.8L</span>
              </div>
              <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '14%' }} />
              </div>
            </div>
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-3 text-gray-700">Payment Method Distribution</Title>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 border-b">
              <span className="text-sm">Bank Transfer</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 overflow-hidden bg-gray-200 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '55%' }} />
                </div>
                <span className="text-sm font-semibold">55%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <span className="text-sm">Cheque</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 overflow-hidden bg-gray-200 rounded-full">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '25%' }} />
                </div>
                <span className="text-sm font-semibold">25%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <span className="text-sm">Cash</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 overflow-hidden bg-gray-200 rounded-full">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '15%' }} />
                </div>
                <span className="text-sm font-semibold">15%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2">
              <span className="text-sm">Credit Card</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 overflow-hidden bg-gray-200 rounded-full">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '5%' }} />
                </div>
                <span className="text-sm font-semibold">5%</span>
              </div>
            </div>
          </div>
        </Paper>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <Button variant="light" color="blue" fullWidth leftSection={<FontAwesomeIcon icon={faFileInvoice} />}>
          Generate Invoice
        </Button>
        <Button variant="light" color="green" fullWidth leftSection={<FontAwesomeIcon icon={faMoneyBill} />}>
          Record Payment
        </Button>
        <Button variant="light" color="orange" fullWidth leftSection={<FontAwesomeIcon icon={faCreditCard} />}>
          Pay Vendor
        </Button>
        <Button variant="light" color="cyan" fullWidth leftSection={<FontAwesomeIcon icon={faChartLine} />}>
          View Reports
        </Button>
      </div>
    </div>
  );
};