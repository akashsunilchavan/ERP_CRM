'use client';

import React, { useState } from 'react';
import {
  Button,
  Modal,
  Title,
  TextInput,
  Select,
  Badge,
  Divider,
  Grid,
  Paper,
  ActionIcon,
  Tooltip,
  Table,
  ThemeIcon,
  Card,
  Group,
  Stack,
  Tabs,
  Alert,
  Progress,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRupeeSign,
  faChartLine,
  faWallet,
  faMoneyBill,
  faCreditCard,
  faBuilding,
  faFileAlt,
  faEye,
  faEdit,
  faTrash,
  faDownload,
  faPrint,
  faFilter,
  faCalendarAlt,
  faArrowUp,
  faArrowDown,
  faPieChart,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';
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

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-IN').format(value);
};

export const AccountingReports = () => {
  const [viewOpened, setViewOpened] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [timeRange, setTimeRange] = useState('monthly');

  const statsCards = [
    { title: 'Total Income', value: '2.45 Cr', percentage: '1.18%', trend: 'up', icon: faMoneyBill, color: 'green' },
    { title: 'Total Expenses', value: '1.68 Cr', percentage: '1.12%', trend: 'up', icon: faCreditCard, color: 'red' },
    { title: 'Net Profit', value: '77.20 L', percentage: '1.22%', trend: 'up', icon: faChartLine, color: 'blue' },
    { title: 'Cash in Hand', value: '48.75 L', percentage: '1.62%', trend: 'up', icon: faWallet, color: 'cyan' },
    { title: 'Total Receivables', value: '1.24 Cr', percentage: '1.61%', trend: 'up', icon: faBuilding, color: 'orange' },
    { title: 'Total Payables', value: '89.60 L', percentage: '4.43%', trend: 'down', icon: faCreditCard, color: 'purple' },
  ];

  const incomeExpenseChartData = {
    series: [
      { name: 'Income', type: 'column' as const, data: [18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52, 58] },
      { name: 'Expenses', type: 'line' as const, data: [12, 15, 18, 20, 24, 28, 30, 34, 38, 42, 45, 48] },
    ],
    options: {
      chart: { type: 'line' as const, height: 350, toolbar: { show: true }, zoom: { enabled: true } },
      title: { text: 'Income vs Expense (₹ in Lakhs)', align: 'left' as const },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
      yaxis: { title: { text: 'Amount (₹ in Lakhs)' } },
      colors: ['#10b981', '#ef4444'],
      stroke: { width: [0, 3] },
      markers: { size: 4 },
      legend: { position: 'top' as const },
    },
  };

  const cashFlowData = {
    series: [
      { name: 'Operating Cash Flow', data: [28, 32, 38, 42, 48, 52, 58, 62, 68, 72, 78, 85] },
      { name: 'Investing Cash Flow', data: [-12, -8, -5, -3, -2, -1, -2, -3, -4, -5, -6, -8] },
      { name: 'Financing Cash Flow', data: [5, 8, 12, 15, 18, 20, 22, 25, 28, 30, 32, 35] },
    ],
    options: {
      chart: { type: 'area' as const, height: 350, toolbar: { show: true }, zoom: { enabled: true } },
      title: { text: 'Cash Flow Statement (₹ in Lakhs)', align: 'left' as const },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
      yaxis: { title: { text: 'Amount (₹ in Lakhs)' } },
      colors: ['#3b82f6', '#f59e0b', '#10b981'],
      fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } },
      legend: { position: 'top' as const },
    },
  };

  const topIncomeCategories = [
    { category: 'Sales Receivable', amount: 41155599, percentage: 50.47 },
    { category: 'Salaries & Wages', amount: 10323000, percentage: 11.01 },
    { category: 'Other Income', amount: 821680, percentage: 0.84 },
    { category: 'Interest Income', amount: 114000, percentage: 0.14 },
    { category: 'Discount Received', amount: 57000, percentage: 0.07 },
    { category: 'Others', amount: 633602, percentage: 0.67 },
  ];

  const topExpenseCategories = [
    { category: 'Salaries & Wages', amount: 54175700, percentage: 64.87 },
    { category: 'Salary & House Rent', amount: 520000, percentage: 0.06 },
    { category: 'Repairs & Maintenance', amount: 512600, percentage: 0.61 },
    { category: 'Transportation', amount: 514000, percentage: 0.61 },
    { category: 'Others', amount: 492883, percentage: 0.58 },
  ];

  const recentReports = [
    { name: 'Profit & Loss Statement', type: 'Financial Report', generated_on: '31 May, 2026', generated_by: 'Admin', status: 'Completed' },
    { name: 'Balance Sheet', type: 'Financial Report', generated_on: '31 May, 2026', generated_by: 'Admin', status: 'Completed' },
    { name: 'Cash Flow Statement', type: 'Financial Report', generated_on: '31 May, 2026', generated_by: 'Admin', status: 'Completed' },
    { name: 'Trial Balance', type: 'Account Report', generated_on: '19 May, 2026', generated_by: 'Admin', status: 'Completed' },
    { name: 'Ledger Summary', type: 'Account Report', generated_on: '29 May, 2026', generated_by: 'Admin', status: 'Completed' },
  ];

  const accountSummary = [
    { name: 'Total Revenue', amount: 288000000, last_month: 261000000, change: 27000000, change_percent: 10.34, trend: 'up' },
    { name: 'Total Expenses', amount: 189000000, last_month: 175000000, change: 14000000, change_percent: 8.00, trend: 'up' },
    { name: 'Net Profit', amount: 99000000, last_month: 86000000, change: 13000000, change_percent: 15.12, trend: 'up' },
    { name: 'Gross Margin', amount: 34.5, last_month: 32.8, change: 1.7, change_percent: 5.18, trend: 'up', isPercentage: true },
  ];

  const tableColumns = [
    { th: { id: 'srNo', style: { minWidth: '70px', width: '70px' } }, text: 'SR NO.' },
    { text: 'Report Name', th: { id: 'report_name', style: { minWidth: '200px' } } },
    { text: 'Report Type', th: { id: 'report_type', style: { minWidth: '150px' } } },
    { text: 'Generated On', th: { id: 'generated_on', style: { minWidth: '120px' } } },
    { text: 'Generated By', th: { id: 'generated_by', style: { minWidth: '130px' } } },
    { text: 'Status', th: { id: 'status', style: { minWidth: '100px' } } },
    { text: 'Actions', th: { id: 'action', style: { minWidth: '120px' } }, justifyContent: 'center' },
  ];

  const handleView = (obj: any) => {
    setSelectedReport(obj);
    setViewOpened(true);
  };

  const handleDownload = (name: string) => {
    alert(`Downloading ${name} report (Demo)`);
  };

  const handlePrint = (name: string) => {
    alert(`Printing ${name} report (Demo)`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header Section */}
      <div className="mb-6">
        <Title order={2} className="text-gray-800">Reports</Title>
        <p className="mt-1 text-gray-500">Overview of all accounting activities and key financial insights</p>
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
                {stat.percentage}
              </span>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-500">{stat.title}</p>
            </div>
          </Paper>
        ))}
      </div>

      {/* Income vs Expense Chart */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <ReactApexChart options={incomeExpenseChartData.options} series={incomeExpenseChartData.series} type="line" height={380} />
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div><span className="text-sm">Income</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span className="text-sm">Expenses</span></div>
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <ReactApexChart options={cashFlowData.options} series={cashFlowData.series} type="area" height={380} />
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div><span className="text-sm">Operating</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full"></div><span className="text-sm">Investing</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div><span className="text-sm">Financing</span></div>
          </div>
        </Paper>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <p className="text-sm text-gray-500">Revenue & Expenses</p>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(288000000)}</p>
          <p className="mt-1 text-xs text-green-600">↑ 10.34% vs last month</p>
        </Paper>
        <Paper withBorder p="md" radius="md" className="bg-white">
          <p className="text-sm text-gray-500">Net Profit</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(99000000)}</p>
          <p className="mt-1 text-xs text-green-600">↑ 15.12% vs last month</p>
        </Paper>
        <Paper withBorder p="md" radius="md" className="bg-white">
          <p className="text-sm text-gray-500">Total Receivables</p>
          <p className="text-2xl font-bold text-orange-600">{formatCurrency(124000000)}</p>
          <p className="mt-1 text-xs text-green-600">↑ 1.61% vs last month</p>
        </Paper>
        <Paper withBorder p="md" radius="md" className="bg-white">
          <p className="text-sm text-gray-500">Total Payables</p>
          <p className="text-2xl font-bold text-purple-600">{formatCurrency(89600000)}</p>
          <p className="mt-1 text-xs text-red-600">↓ 4.43% vs last month</p>
        </Paper>
      </div>

      {/* Account Summary Table */}
      <Paper withBorder p="md" radius="md" className="mb-6 bg-white">
        <Title order={4} className="mb-4 text-gray-700">Account Summary</Title>
        <div className="overflow-x-auto">
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Account Name</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Last Month</Table.Th>
                <Table.Th>Change (₹)</Table.Th>
                <Table.Th>Change (%)</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {accountSummary.map((item, idx) => (
                <Table.Tr key={idx}>
                  <Table.Td className="font-medium">{item.name}</Table.Td>
                  <Table.Td className="font-bold">{item.isPercentage ? `${item.amount}%` : formatCurrency(item.amount)}</Table.Td>
                  <Table.Td>{item.isPercentage ? `${item.last_month}%` : formatCurrency(item.last_month)}</Table.Td>
                  <Table.Td className={item.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {item.trend === 'up' ? '↑' : '↓'} {item.isPercentage ? `${item.change}%` : formatCurrency(item.change)}
                  </Table.Td>
                  <Table.Td className={item.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {item.trend === 'up' ? '+' : '-'}{item.change_percent}%
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </Paper>

      {/* Income and Expense Categories */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Top Income Category</Title>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Category</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>% of Total</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {topIncomeCategories.map((item, idx) => (
                <Table.Tr key={idx}>
                  <Table.Td>{item.category}</Table.Td>
                  <Table.Td className="font-semibold text-green-600">{formatCurrency(item.amount)}</Table.Td>
                  <Table.Td>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 overflow-hidden bg-gray-200 rounded-full">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                      <span className="text-sm">{item.percentage}%</span>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Top Expense Category</Title>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Category</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>% of Total</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {topExpenseCategories.map((item, idx) => (
                <Table.Tr key={idx}>
                  <Table.Td>{item.category}</Table.Td>
                  <Table.Td className="font-semibold text-red-600">{formatCurrency(item.amount)}</Table.Td>
                  <Table.Td>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 overflow-hidden bg-gray-200 rounded-full">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                      <span className="text-sm">{item.percentage}%</span>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </div>

      {/* Recent Reports Table */}
      <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <Title order={4} className="text-gray-700">Recent Reports</Title>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" leftSection={<FontAwesomeIcon icon={faFilter} />}>Filter</Button>
            <Button variant="outline" size="sm" leftSection={<FontAwesomeIcon icon={faDownload} />}>Export All</Button>
          </div>
        </div>
        <CustomTable
          data={{ data: recentReports }}
          setData={() => {}}
          isSearchingRequired={true}
          isSortingRequired={true}
          isPaginationRequired={true}
          tableHeadData={tableColumns}
          tableBody={() =>
            recentReports.map((obj: any, index: number) => (
              <tr key={index} className="transition border-b hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-medium text-gray-600">{index + 1}</td>
                <td className="px-3 py-2 text-sm font-medium text-blue-600">{obj.name}</td>
                <td className="px-3 py-2 text-sm">{obj.type}</td>
                <td className="px-3 py-2 text-sm">{obj.generated_on}</td>
                <td className="px-3 py-2 text-sm">{obj.generated_by}</td>
                <td className="px-3 py-2"><Badge color="green" variant="light">{obj.status}</Badge></td>
                <td className="px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Tooltip label="View Details">
                      <ActionIcon variant="subtle" color="blue" onClick={() => handleView(obj)}>
                        <FontAwesomeIcon icon={faEye} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Download">
                      <ActionIcon variant="subtle" color="green" onClick={() => handleDownload(obj.name)}>
                        <FontAwesomeIcon icon={faDownload} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Print">
                      <ActionIcon variant="subtle" color="gray" onClick={() => handlePrint(obj.name)}>
                        <FontAwesomeIcon icon={faPrint} />
                      </ActionIcon>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))
          }
          url="accounting-reports?demo=true"
          notFoundMessage="No Reports Found."
          notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
        />
      </div>

      {/* View Report Modal */}
      <Modal
        opened={viewOpened}
        onClose={() => setViewOpened(false)}
        title={`${selectedReport?.name || ''} | ${selectedReport?.type || ''}`}
        size="xl"
        centered
      >
        {selectedReport && (
          <div className="space-y-6">
            <div className="flex items-start justify-between pb-4 border-b">
              <div>
                <Badge color="blue" size="lg">{selectedReport.type}</Badge>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Generated On: {selectedReport.generated_on} | Generated By: {selectedReport.generated_by}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" leftSection={<FontAwesomeIcon icon={faDownload} />} size="sm">Download</Button>
                <Button variant="outline" leftSection={<FontAwesomeIcon icon={faPrint} />} size="sm">Print</Button>
              </div>
            </div>

            <Divider label="Report Summary" labelPosition="left" />
            
            {selectedReport.name === 'Profit & Loss Statement' && (
              <>
                <Grid>
                  <Grid.Col span={4}><Paper withBorder p="md" className="text-center"><p className="text-sm text-gray-500">Total Income</p><p className="text-xl font-bold text-green-600">{formatCurrency(288000000)}</p></Paper></Grid.Col>
                  <Grid.Col span={4}><Paper withBorder p="md" className="text-center"><p className="text-sm text-gray-500">Total Expenses</p><p className="text-xl font-bold text-red-600">{formatCurrency(189000000)}</p></Paper></Grid.Col>
                  <Grid.Col span={4}><Paper withBorder p="md" className="text-center"><p className="text-sm text-gray-500">Net Profit</p><p className="text-xl font-bold text-blue-600">{formatCurrency(99000000)}</p></Paper></Grid.Col>
                </Grid>
                <Table striped>
                  <Table.Thead><Table.Tr><Table.Th>Particulars</Table.Th><Table.Th>Current Year (₹)</Table.Th><Table.Th>Previous Year (₹)</Table.Th><Table.Th>Change (%)</Table.Th></Table.Tr></Table.Thead>
                  <Table.Tbody>
                    <Table.Tr><Table.Td>Revenue from Operations</Table.Td><Table.Td>{formatCurrency(245000000)}</Table.Td><Table.Td>{formatCurrency(225000000)}</Table.Td><Table.Td className="text-green-600">+8.89%</Table.Td></Table.Tr>
                    <Table.Tr><Table.Td>Other Income</Table.Td><Table.Td>{formatCurrency(43000000)}</Table.Td><Table.Td>{formatCurrency(36000000)}</Table.Td><Table.Td className="text-green-600">+19.44%</Table.Td></Table.Tr>
                    <Table.Tr className="bg-gray-50"><Table.Td className="font-bold">Total Income</Table.Td><Table.Td className="font-bold">{formatCurrency(288000000)}</Table.Td><Table.Td className="font-bold">{formatCurrency(261000000)}</Table.Td><Table.Td className="font-bold text-green-600">+10.34%</Table.Td></Table.Tr>
                    <Table.Tr><Table.Td>Cost of Materials</Table.Td><Table.Td>{formatCurrency(89000000)}</Table.Td><Table.Td>{formatCurrency(85000000)}</Table.Td><Table.Td className="text-red-600">+4.71%</Table.Td></Table.Tr>
                    <Table.Tr><Table.Td>Employee Benefits</Table.Td><Table.Td>{formatCurrency(54000000)}</Table.Td><Table.Td>{formatCurrency(51000000)}</Table.Td><Table.Td className="text-red-600">+5.88%</Table.Td></Table.Tr>
                    <Table.Tr><Table.Td>Other Expenses</Table.Td><Table.Td>{formatCurrency(46000000)}</Table.Td><Table.Td>{formatCurrency(39000000)}</Table.Td><Table.Td className="text-red-600">+17.95%</Table.Td></Table.Tr>
                    <Table.Tr className="bg-gray-50"><Table.Td className="font-bold">Total Expenses</Table.Td><Table.Td className="font-bold">{formatCurrency(189000000)}</Table.Td><Table.Td className="font-bold">{formatCurrency(175000000)}</Table.Td><Table.Td className="font-bold text-red-600">+8.00%</Table.Td></Table.Tr>
                    <Table.Tr className="bg-blue-50"><Table.Td className="font-bold">Net Profit</Table.Td><Table.Td className="font-bold text-blue-600">{formatCurrency(99000000)}</Table.Td><Table.Td className="font-bold">{formatCurrency(86000000)}</Table.Td><Table.Td className="font-bold text-green-600">+15.12%</Table.Td></Table.Tr>
                  </Table.Tbody>
                </Table>
              </>
            )}

            {selectedReport.name === 'Balance Sheet' && (
              <>
                <Grid>
                  <Grid.Col span={6}>
                    <Title order={6} className="mb-3">Assets</Title>
                    <Table striped>
                      <Table.Tbody>
                        <Table.Tr><Table.Td>Current Assets</Table.Td><Table.Td>{formatCurrency(125000000)}</Table.Td></Table.Tr>
                        <Table.Tr><Table.Td>Fixed Assets</Table.Td><Table.Td>{formatCurrency(85000000)}</Table.Td></Table.Tr>
                        <Table.Tr><Table.Td>Other Assets</Table.Td><Table.Td>{formatCurrency(35000000)}</Table.Td></Table.Tr>
                        <Table.Tr className="bg-gray-50"><Table.Td className="font-bold">Total Assets</Table.Td><Table.Td className="font-bold">{formatCurrency(245000000)}</Table.Td></Table.Tr>
                      </Table.Tbody>
                    </Table>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Title order={6} className="mb-3">Liabilities & Equity</Title>
                    <Table striped>
                      <Table.Tbody>
                        <Table.Tr><Table.Td>Current Liabilities</Table.Td><Table.Td>{formatCurrency(68000000)}</Table.Td></Table.Tr>
                        <Table.Tr><Table.Td>Long Term Liabilities</Table.Td><Table.Td>{formatCurrency(42000000)}</Table.Td></Table.Tr>
                        <Table.Tr><Table.Td>Shareholders Equity</Table.Td><Table.Td>{formatCurrency(135000000)}</Table.Td></Table.Tr>
                        <Table.Tr className="bg-gray-50"><Table.Td className="font-bold">Total Liabilities & Equity</Table.Td><Table.Td className="font-bold">{formatCurrency(245000000)}</Table.Td></Table.Tr>
                      </Table.Tbody>
                    </Table>
                  </Grid.Col>
                </Grid>
              </>
            )}

            <Divider label="Additional Information" labelPosition="left" />
            <Alert color="gray">
              <p className="text-sm">This report was generated automatically on {selectedReport.generated_on}. For any discrepancies, please contact the finance department.</p>
            </Alert>
          </div>
        )}
      </Modal>

     
    </div>
  );
};