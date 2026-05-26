'use client';

import React, { useState } from 'react';
import {
  Button,
  Modal,
  Title,
  TextInput,
  Textarea,
  Select,
  Badge,
  Divider,
  Grid,
  Paper,
  ActionIcon,
  Tooltip,
  Table,
  Card,
  Group,
  Stack,
  ThemeIcon,
  NumberInput,
  FileInput,
  Tabs,
  Alert,
  Progress,
  RingProgress,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faDownload,
  faFileAlt,
  faBuilding,
  faUser,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faCalendarAlt,
  faRupeeSign,
  faCheckCircle,
  faTimesCircle,
  faChartLine,
  faMoneyBill,
  faWallet,
  faCreditCard,
  faBook,
  faFilter,
  faPrint,
  faShare,
  faPlusCircle,
  faMinusCircle,
  faPercent,
} from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DUMMY_LEDGER_DATA = {
  data: [
    {
      id: 'LED001',
      ledger_code: 'LED001',
      ledger_name: 'ABC Elevators',
      ledger_type: 'Customer',
      group: 'Security Deposits',
      description: 'Customer Ledger for ABC Elevators',
      phone: '08076545678',
      email: 'abc@elevators.com',
      pan: 'AABCL1234F',
      gstin: '27ABCDE1234F125',
      billing_address: 'A-251, Industrial area, Andheri East, Mumbai, Maharashtra - 400093',
      credit_limit: 5000000,
      credit_days: 30,
      currency: 'INR',
      status: 'Active',
      created_by: 'John Doe',
      created_on: '01 Feb, 2025',
      opening_balance: 1275000,
      total_debit: 3860000,
      total_credit: 1380000,
      closing_balance: 3755000,
      transactions: [
        { date: '04 April 2025', number_in: 'BWC0023', source_type: 'Sales Invoice', function: 'Invoice for Sale', debit: 1426004, credit: 0, balance: 1000000, debt: 0, reference: 'A00003' },
        { date: '05 April 2025', number_in: 'KCF11002', source_type: 'Receipt', function: 'Payment received via Bank Transfer', debit: 0, credit: 215800, balance: 1000000, debt: 0, reference: 'VTHSFS045120' },
        { date: '06 April 2025', number_in: 'BWC010', source_type: 'Sales Invoice', function: 'Invoice for Services', debit: 7000000, credit: 0, balance: 1000000, debt: 0, reference: 'A00009' },
        { date: '11 April 2025', number_in: 'BWC012', source_type: 'Sales Invoice', function: 'Invoice for Products', debit: 1000000, credit: 0, balance: 1000000, debt: 0, reference: 'A00012' },
        { date: '22 April 2025', number_in: 'BCFT008', source_type: 'Receipt', function: 'Payment received via Cheque', debit: 0, credit: 1380000, balance: 1100000, debt: 0, reference: 'VTHSFS005105' },
        { date: '25 April 2025', number_in: 'BGFT002', source_type: 'Receipt', function: 'Payment received via Cheque', debit: 0, credit: 975000, balance: 625000, debt: 0, reference: 'UTSG009006' },
      ],
      attachments: [
        { name: 'Credit Card Approval.pdf', size: '1.2 MB' },
        { name: 'XLSX Download.pdf', size: '0.8 MB' },
        { name: 'Letter.pdf', size: '0.5 MB' },
      ],
    },
    {
      id: 'LED002',
      ledger_code: 'LED002',
      ledger_name: 'LMN Industries',
      ledger_type: 'Vendor',
      group: 'Trade Payables',
      description: 'Vendor Ledger for LMN Industries',
      phone: '9876543210',
      email: 'lmn@industries.com',
      pan: 'LMNCD5678G',
      gstin: '27LMNIND1234G125',
      billing_address: '12, Sector 5, Faridabad, Haryana - 121006',
      credit_limit: 3000000,
      credit_days: 45,
      currency: 'INR',
      status: 'Active',
      created_by: 'Tim Doe',
      created_on: '15 Jan, 2025',
      opening_balance: 850000,
      total_debit: 2250000,
      total_credit: 1850000,
      closing_balance: 1250000,
      transactions: [],
      attachments: [],
    },
    {
      id: 'LED003',
      ledger_code: 'LED003',
      ledger_name: 'PQR Engineering',
      ledger_type: 'Customer',
      group: 'Security Deposits',
      description: 'Customer Ledger for PQR Engineering',
      phone: '9988776655',
      email: 'pqr@engineering.com',
      pan: 'PQRGH9012H',
      gstin: '27PQRENG1234H125',
      billing_address: '78, Site 4, Sahibabad, Ghaziabad, UP - 201005',
      credit_limit: 2500000,
      credit_days: 30,
      currency: 'INR',
      status: 'Active',
      created_by: 'Joana Doe',
      created_on: '20 Feb, 2025',
      opening_balance: 950000,
      total_debit: 1850000,
      total_credit: 1650000,
      closing_balance: 1150000,
      transactions: [],
      attachments: [],
    },
  ],
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
};

export const LedgerManagement = () => {
  const [createOpened, setCreateOpened] = useState(false);
  const [viewOpened, setViewOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [selectedLedger, setSelectedLedger] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string | null>('details');

  const [ledgerTransactions, setLedgerTransactions] = useState([
    { id: 1, debit: '', credit: '', voucher_type: '', debit_amount: 0, balance: 0, voucher_no: '', particulars: '', reference_no: '' },
  ]);

  const [ledgerForm, setLedgerForm] = useState({
    ledger_code: '',
    ledger_type: '',
    service_group: '',
    description: '',
    project_name: '',
    contact_number: '',
    email: '',
    gstin: '',
    web: '',
    credit_limit: 0,
    email_subject: '',
    current_balance: 0,
    currency: '',
    opening_balance: 0,
    created_by: '',
    total_credit: 0,
    total_debit: 0,
    enter_other_amount: 0,
    closing_balance: 0,
  });

  const [editField, setEditField] = useState({
    id: '',
    ledger_code: '',
    ledger_name: '',
    ledger_type: '',
    status: '',
    closing_balance: 0,
  });

  const [ledgerData] = useState<any>(DUMMY_LEDGER_DATA);

  const handleLedgerChange = (key: string, value: any) => {
    setLedgerForm({ ...ledgerForm, [key]: value });
  };

  const handleTransactionChange = (id: number, key: string, value: any) => {
    const updatedTransactions = ledgerTransactions.map(transaction => {
      if (transaction.id === id) {
        return { ...transaction, [key]: value };
      }
      return transaction;
    });
    setLedgerTransactions(updatedTransactions);
  };

  const addTransaction = () => {
    const newId = Math.max(...ledgerTransactions.map(t => t.id), 0) + 1;
    setLedgerTransactions([...ledgerTransactions, { id: newId, debit: '', credit: '', voucher_type: '', debit_amount: 0, balance: 0, voucher_no: '', particulars: '', reference_no: '' }]);
  };

  const removeTransaction = (id: number) => {
    if (ledgerTransactions.length > 1) {
      setLedgerTransactions(ledgerTransactions.filter(t => t.id !== id));
    }
  };

  const handleEditChange = (key: string, value: any) => {
    setEditField({ ...editField, [key]: value });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ledger created:', { ledgerForm, ledgerTransactions });
    setCreateOpened(false);
    setLedgerTransactions([{ id: 1, debit: '', credit: '', voucher_type: '', debit_amount: 0, balance: 0, voucher_no: '', particulars: '', reference_no: '' }]);
    setLedgerForm({
      ledger_code: '',
      ledger_type: '',
      service_group: '',
      description: '',
      project_name: '',
      contact_number: '',
      email: '',
      gstin: '',
      web: '',
      credit_limit: 0,
      email_subject: '',
      current_balance: 0,
      currency: '',
      opening_balance: 0,
      created_by: '',
      total_credit: 0,
      total_debit: 0,
      enter_other_amount: 0,
      closing_balance: 0,
    });
    alert('Ledger created successfully (Demo)');
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ledger updated:', editField);
    setEditOpened(false);
    alert('Ledger updated successfully (Demo)');
  };

  const handleView = (obj: any) => {
    setSelectedLedger(obj);
    setViewOpened(true);
  };

  const handleEdit = (obj: any) => {
    setEditField({
      id: obj.id,
      ledger_code: obj.ledger_code,
      ledger_name: obj.ledger_name,
      ledger_type: obj.ledger_type,
      status: obj.status,
      closing_balance: obj.closing_balance,
    });
    setEditOpened(true);
  };

  const handleDelete = (id: string) => {
    alert(`Delete record ${id} (Demo)`);
  };

  const tableColumns = [
    { th: { id: 'srNo', style: { minWidth: '70px', width: '70px' } }, text: 'SR NO.' },
    { text: 'Ledger Code', th: { id: 'ledger_code', style: { minWidth: '100px' } } },
    { text: 'Ledger Name', th: { id: 'ledger_name', style: { minWidth: '180px' } } },
    { text: 'Ledger Type', th: { id: 'ledger_type', style: { minWidth: '120px' } } },
    { text: 'Group', th: { id: 'group', style: { minWidth: '150px' } } },
    { text: 'Phone', th: { id: 'phone', style: { minWidth: '120px' } } },
    { text: 'Email', th: { id: 'email', style: { minWidth: '180px' } } },
    { text: 'Status', th: { id: 'status', style: { minWidth: '100px' } } },
    { text: 'Closing Balance', th: { id: 'closing_balance', style: { minWidth: '130px' } } },
    { text: 'Actions', th: { id: 'action', style: { minWidth: '100px' } }, justifyContent: 'center' },
  ];

  const statsCards = [
    { title: 'Total Ledgers', value: '248', subtitle: 'Last Update', icon: faBook, color: 'blue' },
    { title: 'Total Debit', value: formatCurrency(12548750), icon: faMoneyBill, color: 'red' },
    { title: 'Total Credit', value: formatCurrency(11822210), icon: faCreditCard, color: 'green' },
    { title: 'Closing Balance', value: formatCurrency(7656400), icon: faWallet, color: 'cyan' },
  ];

  const pieChartData = {
    series: [15, 10, 20, 30, 25],
    options: {
      chart: { type: 'donut' as const, height: 300 },
      labels: ['Assets', 'Liabilities', 'Equity', 'Income', 'Expenses'],
      colors: ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'],
      legend: { position: 'bottom' as const },
      dataLabels: { enabled: true, formatter: (val: number) => `${val.toFixed(1)}%` },
    },
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header Section */}
      <div className="mb-6">
        <Title order={2} className="text-gray-800">Ledger</Title>
        <p className="mt-1 text-gray-500">Manage and track all Ledgers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Paper key={index} withBorder p="md" radius="md" className="bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                {stat.subtitle && <p className="mt-1 text-xs text-gray-400">{stat.subtitle}</p>}
              </div>
              <ThemeIcon color={stat.color} size="lg" radius="xl" variant="light">
                <FontAwesomeIcon icon={stat.icon} size="lg" />
              </ThemeIcon>
            </div>
          </Paper>
        ))}
      </div>

      {/* Closing Balance Card */}
      <div className="grid grid-cols-1 gap-4 mb-6 lg:grid-cols-2">
        <Paper withBorder p="md" radius="md" className="text-white bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm opacity-90">Closing Balance (This Month)</p>
              <p className="text-3xl font-bold">{formatCurrency(7656540)}</p>
              <p className="mt-1 text-xs opacity-75">Last Updated: 25 May, 2026</p>
            </div>
            <ThemeIcon color="white" size="xl" radius="xl" variant="light" className="bg-white/20">
              <FontAwesomeIcon icon={faWallet} size="lg" className="text-white" />
            </ThemeIcon>
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-3 text-gray-700">Ledger Type Distribution</Title>
          <ReactApexChart options={pieChartData.options} series={pieChartData.series} type="donut" height={280} />
        </Paper>
      </div>

      {/* Search Filters */}
      <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-white border border-gray-200 rounded-xl sm:grid-cols-2 lg:grid-cols-4">
        <TextInput placeholder="Search Ledger..." leftSection={<FontAwesomeIcon icon={faFilter} />} />
        <Select placeholder="Ledger Type: All" data={['All', 'Customer', 'Vendor', 'Asset', 'Liability', 'Equity']} />
        <Select placeholder="Status: All" data={['All', 'Active', 'Inactive', 'Suspended']} />
        <Button variant="outline" color="gray">Clear Filters</Button>
      </div>

      {/* Ledger Table */}
      <div className="p-4 mb-6 bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="flex justify-end mb-4">
          <Button onClick={() => setCreateOpened(true)} color="blue" leftSection={<FontAwesomeIcon icon={faPlus} />}>
            Create New Ledger
          </Button>
        </div>
        <CustomTable
          data={ledgerData}
          setData={() => {}}
          isSearchingRequired={false}
          isSortingRequired={true}
          isPaginationRequired={true}
          tableHeadData={tableColumns}
          tableBody={() =>
            ledgerData?.data?.map((obj: any, index: number) => (
              <tr key={obj.id} className="transition border-b hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-medium text-gray-600">{index + 1}</td>
                <td className="px-3 py-2 text-sm font-medium text-blue-600">{obj.ledger_code}</td>
                <td className="px-3 py-2 text-sm font-medium">{obj.ledger_name}</td>
                <td className="px-3 py-2 text-sm">{obj.ledger_type}</td>
                <td className="px-3 py-2 text-sm">{obj.group}</td>
                <td className="px-3 py-2 text-sm">{obj.phone}</td>
                <td className="px-3 py-2 text-sm">{obj.email}</td>
                <td className="px-3 py-2">
                  <Badge color={obj.status === 'Active' ? 'green' : 'red'} variant="light">{obj.status}</Badge>
                </td>
                <td className="px-3 py-2 text-sm font-semibold">{formatCurrency(obj.closing_balance)}</td>
                <td className="px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Tooltip label="View Details">
                      <ActionIcon variant="subtle" color="blue" onClick={() => handleView(obj)}>
                        <FontAwesomeIcon icon={faEye} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Edit">
                      <ActionIcon variant="subtle" color="yellow" onClick={() => handleEdit(obj)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Print">
                      <ActionIcon variant="subtle" color="gray">
                        <FontAwesomeIcon icon={faPrint} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Delete">
                      <ActionIcon variant="subtle" color="red" onClick={() => handleDelete(obj.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </ActionIcon>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))
          }
          url="ledger?demo=true"
          notFoundMessage="No Ledger Data Found."
          notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
        />
      </div>

      {/* View Ledger Modal */}
      <Modal
        opened={viewOpened}
        onClose={() => setViewOpened(false)}
        title={`${selectedLedger?.ledger_name || ''} | ${selectedLedger?.ledger_code || ''}`}
        size="xl"
        centered
      >
        {selectedLedger && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b">
              <div>
                <Badge color="blue" size="lg">Ledger Name: {selectedLedger.ledger_name}</Badge>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Date: 29 May, 2026 | Project: {selectedLedger.ledger_name}</p>
                </div>
                <div className="flex flex-wrap gap-4 mt-2">
                  <p className="text-sm">Opening Balance: <span className="font-semibold">{formatCurrency(selectedLedger.opening_balance)}</span></p>
                  <p className="text-sm">Total Debit: <span className="font-semibold text-red-600">{formatCurrency(selectedLedger.total_debit)}</span></p>
                  <p className="text-sm">Total Credit: <span className="font-semibold text-green-600">{formatCurrency(selectedLedger.total_credit)}</span></p>
                  <p className="text-sm">Closing Balance: <span className="font-semibold text-blue-600">{formatCurrency(selectedLedger.closing_balance)}</span></p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" leftSection={<FontAwesomeIcon icon={faPrint} />} size="sm">Print</Button>
                <Button variant="outline" leftSection={<FontAwesomeIcon icon={faDownload} />} size="sm">Export</Button>
              </div>
            </div>

            <Divider label="Ledger Details" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2"><FontAwesomeIcon icon={faBook} className="mt-1 text-gray-400" /><div><p className="text-sm text-gray-500">Ledger Type</p><p className="font-medium">{selectedLedger.ledger_type}</p></div></div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2"><FontAwesomeIcon icon={faBuilding} className="mt-1 text-gray-400" /><div><p className="text-sm text-gray-500">Group</p><p className="font-medium">{selectedLedger.group}</p></div></div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2"><FontAwesomeIcon icon={faCreditCard} className="mt-1 text-gray-400" /><div><p className="text-sm text-gray-500">Credit Limit</p><p className="font-medium">{formatCurrency(selectedLedger.credit_limit)}</p></div></div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2"><FontAwesomeIcon icon={faCalendarAlt} className="mt-1 text-gray-400" /><div><p className="text-sm text-gray-500">Credit Days</p><p className="font-medium">{selectedLedger.credit_days} Days</p></div></div>
              </Grid.Col>
              <Grid.Col span={12}>
                <div className="flex items-start gap-2"><FontAwesomeIcon icon={faFileAlt} className="mt-1 text-gray-400" /><div><p className="text-sm text-gray-500">Description</p><p className="font-medium">{selectedLedger.description}</p></div></div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2"><FontAwesomeIcon icon={faPercent} className="mt-1 text-gray-400" /><div><p className="text-sm text-gray-500">Currency</p><p className="font-medium">{selectedLedger.currency}</p></div></div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2"><FontAwesomeIcon icon={faPhone} className="mt-1 text-gray-400" /><div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{selectedLedger.phone}</p></div></div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2"><FontAwesomeIcon icon={faUser} className="mt-1 text-gray-400" /><div><p className="text-sm text-gray-500">Created By</p><p className="font-medium">{selectedLedger.created_by}</p></div></div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2"><FontAwesomeIcon icon={faCalendarAlt} className="mt-1 text-gray-400" /><div><p className="text-sm text-gray-500">Created On</p><p className="font-medium">{selectedLedger.created_on}</p></div></div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2"><FontAwesomeIcon icon={faEnvelope} className="mt-1 text-gray-400" /><div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{selectedLedger.email}</p></div></div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2"><FontAwesomeIcon icon={faFileAlt} className="mt-1 text-gray-400" /><div><p className="text-sm text-gray-500">PAN</p><p className="font-medium">{selectedLedger.pan}</p></div></div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2"><FontAwesomeIcon icon={faPercent} className="mt-1 text-gray-400" /><div><p className="text-sm text-gray-500">GSTIN</p><p className="font-medium">{selectedLedger.gstin}</p></div></div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 text-gray-400" /><div><p className="text-sm text-gray-500">Status</p><Badge color={selectedLedger.status === 'Active' ? 'green' : 'red'}>{selectedLedger.status}</Badge></div></div>
              </Grid.Col>
              <Grid.Col span={12}>
                <div className="flex items-start gap-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 text-gray-400" /><div><p className="text-sm text-gray-500">Billing Address</p><p className="text-sm">{selectedLedger.billing_address}</p></div></div>
              </Grid.Col>
            </Grid>

            <Divider label="Ledger Transactions" labelPosition="left" />
            <div className="overflow-x-auto">
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Date</Table.Th>
                    <Table.Th>Number In</Table.Th>
                    <Table.Th>Source Type</Table.Th>
                    <Table.Th>Function</Table.Th>
                    <Table.Th>Debit</Table.Th>
                    <Table.Th>Credit</Table.Th>
                    <Table.Th>Balance</Table.Th>
                    <Table.Th>Reference</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {selectedLedger.transactions.map((transaction: any, idx: number) => (
                    <Table.Tr key={idx}>
                      <Table.Td>{transaction.date}</Table.Td>
                      <Table.Td>{transaction.number_in}</Table.Td>
                      <Table.Td>{transaction.source_type}</Table.Td>
                      <Table.Td>{transaction.function}</Table.Td>
                      <Table.Td className="text-red-600">{transaction.debit > 0 ? formatCurrency(transaction.debit) : '-'}</Table.Td>
                      <Table.Td className="text-green-600">{transaction.credit > 0 ? formatCurrency(transaction.credit) : '-'}</Table.Td>
                      <Table.Td className="font-semibold">{formatCurrency(transaction.balance)}</Table.Td>
                      <Table.Td className="font-mono">{transaction.reference}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>

            {selectedLedger.attachments.length > 0 && (
              <>
                <Divider label="Attachments" labelPosition="left" />
                <div className="space-y-2">
                  {selectedLedger.attachments.map((doc: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                      <div className="flex items-center gap-2"><FontAwesomeIcon icon={faFileAlt} className="text-blue-500" /><span className="text-sm">{doc.name}</span><span className="text-xs text-gray-400">{doc.size}</span></div>
                      <div className="flex gap-2"><ActionIcon variant="subtle" color="blue" size="sm"><FontAwesomeIcon icon={faEye} /></ActionIcon><ActionIcon variant="subtle" color="green" size="sm"><FontAwesomeIcon icon={faDownload} /></ActionIcon></div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <Divider label="Ledger Impact" labelPosition="left" />
            <Alert color="blue" className="text-center">
              <p className="text-2xl font-bold">{formatCurrency(selectedLedger.closing_balance)}</p>
              <p className="text-sm">Amount Invested</p>
            </Alert>
          </div>
        )}
      </Modal>

      {/* Create Ledger Modal */}
      <Modal opened={createOpened} onClose={() => setCreateOpened(false)} title="Create Ledger" size="xl" centered>
        <form onSubmit={handleAddSubmit} className="mt-2 space-y-6">
          <div>
            <Title order={5} className="mb-3 text-gray-700">Ledger Details</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput label="Ledger Code" placeholder="LED01" value={ledgerForm.ledger_code} onChange={(e) => handleLedgerChange('ledger_code', e.currentTarget.value)} required />
              <Select label="Ledger Type" placeholder="Select Ledger Type" data={['Customer', 'Vendor', 'Asset', 'Liability', 'Equity', 'Income', 'Expense']} value={ledgerForm.ledger_type} onChange={(value) => handleLedgerChange('ledger_type', value || '')} />
              <TextInput label="Service Group" placeholder="ETHG1" value={ledgerForm.service_group} onChange={(e) => handleLedgerChange('service_group', e.currentTarget.value)} />
              <Textarea label="Description" placeholder="Enter Description" value={ledgerForm.description} onChange={(e) => handleLedgerChange('description', e.currentTarget.value)} minRows={2} />
              <TextInput label="Project Name" placeholder="Enter Project Name" value={ledgerForm.project_name} onChange={(e) => handleLedgerChange('project_name', e.currentTarget.value)} />
              <TextInput label="Contact Number" placeholder="+91 9840884835" value={ledgerForm.contact_number} onChange={(e) => handleLedgerChange('contact_number', e.currentTarget.value)} />
              <TextInput label="Email" placeholder="Email" value={ledgerForm.email} onChange={(e) => handleLedgerChange('email', e.currentTarget.value)} type="email" />
              <TextInput label="GSTIN" placeholder="GST Number" value={ledgerForm.gstin} onChange={(e) => handleLedgerChange('gstin', e.currentTarget.value)} />
              <TextInput label="Web / Wallet Address" placeholder="Web / Wallet Address" value={ledgerForm.web} onChange={(e) => handleLedgerChange('web', e.currentTarget.value)} />
              <NumberInput label="Credit Limit" placeholder="Credit Limit" value={ledgerForm.credit_limit} onChange={(value) => handleLedgerChange('credit_limit', Number(value) || 0)} leftSection="₹" />
              <TextInput label="Email Subject" placeholder="Email Subject" value={ledgerForm.email_subject} onChange={(e) => handleLedgerChange('email_subject', e.currentTarget.value)} />
              <NumberInput label="Current Balance" placeholder="Current Balance" value={ledgerForm.current_balance} onChange={(value) => handleLedgerChange('current_balance', Number(value) || 0)} leftSection="₹" />
              <Select label="Currency" placeholder="Select Currency" data={['INR', 'USD', 'EUR', 'GBP']} value={ledgerForm.currency} onChange={(value) => handleLedgerChange('currency', value || '')} />
              <NumberInput label="Opening Balance" placeholder="Opening Balance" value={ledgerForm.opening_balance} onChange={(value) => handleLedgerChange('opening_balance', Number(value) || 0)} leftSection="₹" />
              <TextInput label="Created By" placeholder="Created By" value={ledgerForm.created_by} onChange={(e) => handleLedgerChange('created_by', e.currentTarget.value)} />
              <NumberInput label="Total Credit" placeholder="Total Credit" value={ledgerForm.total_credit} onChange={(value) => handleLedgerChange('total_credit', Number(value) || 0)} leftSection="₹" />
              <NumberInput label="Total Debit" placeholder="Total Debit" value={ledgerForm.total_debit} onChange={(value) => handleLedgerChange('total_debit', Number(value) || 0)} leftSection="₹" />
              <NumberInput label="Enter Other Amount" placeholder="Enter Other Amount" value={ledgerForm.enter_other_amount} onChange={(value) => handleLedgerChange('enter_other_amount', Number(value) || 0)} leftSection="₹" />
              <NumberInput label="Closing Balance" placeholder="Closing Balance" value={ledgerForm.closing_balance} onChange={(value) => handleLedgerChange('closing_balance', Number(value) || 0)} leftSection="₹" />
            </div>
          </div>

          <Divider />

          <div>
            <div className="flex items-center justify-between mb-3"><Title order={5} className="text-gray-700">Ledger Transaction</Title><Button size="xs" variant="light" leftSection={<FontAwesomeIcon icon={faPlusCircle} />} onClick={addTransaction}>Add More</Button></div>
            <div className="space-y-3">
              {ledgerTransactions.map((transaction) => (
                <Paper key={transaction.id} withBorder p="md" className="relative">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                    <TextInput label="Debit" placeholder="Debit" value={transaction.debit} onChange={(e) => handleTransactionChange(transaction.id, 'debit', e.currentTarget.value)} />
                    <TextInput label="Credit" placeholder="Credit" value={transaction.credit} onChange={(e) => handleTransactionChange(transaction.id, 'credit', e.currentTarget.value)} />
                    <TextInput label="Voucher Type" placeholder="Voucher Type" value={transaction.voucher_type} onChange={(e) => handleTransactionChange(transaction.id, 'voucher_type', e.currentTarget.value)} />
                    <NumberInput label="Debit Amount" placeholder="Debit Amount" value={transaction.debit_amount} onChange={(value) => handleTransactionChange(transaction.id, 'debit_amount', Number(value) || 0)} />
                    <NumberInput label="Balance" placeholder="Balance" value={transaction.balance} onChange={(value) => handleTransactionChange(transaction.id, 'balance', Number(value) || 0)} />
                    <TextInput label="Voucher No." placeholder="Voucher No." value={transaction.voucher_no} onChange={(e) => handleTransactionChange(transaction.id, 'voucher_no', e.currentTarget.value)} />
                    <Textarea label="Particulars" placeholder="Particulars" value={transaction.particulars} onChange={(e) => handleTransactionChange(transaction.id, 'particulars', e.currentTarget.value)}  />
                    <TextInput label="Reference No." placeholder="Reference No." value={transaction.reference_no} onChange={(e) => handleTransactionChange(transaction.id, 'reference_no', e.currentTarget.value)} />
                  </div>
                  {ledgerTransactions.length > 1 && (<ActionIcon color="red" variant="subtle" onClick={() => removeTransaction(transaction.id)} className="absolute top-2 right-2"><FontAwesomeIcon icon={faMinusCircle} /></ActionIcon>)}
                </Paper>
              ))}
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Ledger Fees</Title>
            <Alert color="blue">
              <p className="text-sm">Sign in to Crypto Wallet to start trading. Your crypto wallet address is displayed here.</p>
            </Alert>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
            <Button variant="outline" onClick={() => setCreateOpened(false)}>Cancel</Button>
            <Button type="submit" color="blue">Create Ledger</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Ledger Modal */}
      <Modal opened={editOpened} onClose={() => setEditOpened(false)} title="Edit Ledger" size="lg" centered>
        <form onSubmit={handleEditSubmit} className="mt-2 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextInput label="Ledger Code" value={editField.ledger_code} disabled />
            <TextInput label="Ledger Name" value={editField.ledger_name} onChange={(e) => handleEditChange('ledger_name', e.currentTarget.value)} required />
            <Select label="Ledger Type" data={['Customer', 'Vendor', 'Asset', 'Liability', 'Equity']} value={editField.ledger_type} onChange={(value) => handleEditChange('ledger_type', value || '')} />
            <Select label="Status" data={['Active', 'Inactive', 'Suspended']} value={editField.status} onChange={(value) => handleEditChange('status', value || '')} />
            <NumberInput label="Closing Balance" value={editField.closing_balance} onChange={(value) => handleEditChange('closing_balance', Number(value) || 0)} leftSection="₹" />
          </div>
          <div className="flex justify-end gap-3 mt-4"><Button variant="outline" onClick={() => setEditOpened(false)}>Cancel</Button><Button type="submit" color="blue">Update Ledger</Button></div>
        </form>
      </Modal>

      <Button onClick={() => setCreateOpened(true)} color="blue" size="lg" radius="xl" className="fixed shadow-lg bottom-8 right-8" leftSection={<FontAwesomeIcon icon={faPlus} />}>Create Ledger</Button>
    </div>
  );
};