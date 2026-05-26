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
  faClock,
  faWallet,
  faCreditCard,
  faMoneyBill,
  faBank,
  faUpload,
  faReceipt,
  faChartPie,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';

const DUMMY_PAYMENTS_DATA = {
  data: [
    {
      id: 'PAY001',
      receipt_no: 'RCPT0028',
      invoice_no: 'INV0021',
      customer_name: 'ABC Elevators',
      invoice_date: '25 May, 2026',
      due_date: '20 June, 2026',
      amount_received: 450000,
      payment_mode: 'Bank Transfer',
      payment_date: '12 June, 2026',
      reference_no: 'UTR1224567890',
      status: 'Received',
      customer_id: 'CUST001',
      customer_details: {
        name: 'Mr Rajesh',
        phone: '9876545678',
        email: 'abc@demo.com',
        company: 'ABC Pvt. Ltd.',
        billing_address: '123, industrial area, Phase 2, Noida, Uttar Pradesh 201301',
      },
      bank_name: 'HDFC',
      remark: 'Payment against Invoice INV0021',
      recorded_by: 'Tim Doe',
      payment_proof: 'PIC-45A/AC/04.pdf',
      invoice_settled: [
        {
          invoice_no: 'INV0021',
          invoice_date: '25 May, 2026',
          due_date: '20 June, 2026',
          invoice_amount: 450000,
          outstanding_before: 450000,
          payment_applied: 450000,
          outstanding_after: 0,
        },
      ],
      payment_history: [
        { receipt_no: 'RCPT0028', payment_date: '12 June, 2026', payment_mode: 'Bank Transfer', amount: 450000, status: 'Received' },
        { receipt_no: 'RCPT0029', payment_date: '20 March, 2026', payment_mode: 'Cheque', amount: 125000, status: 'Received' },
        { receipt_no: 'RCPT0032', payment_date: '30 Dec, 2025', payment_mode: 'NEFT', amount: 250000, status: 'Received' },
      ],
      ledger_impact: {
        customer_ledger: 'ABC Elevators (CUST001)',
        debit: 450000,
        credit: 450000,
        closing_balance: 37350,
      },
    },
    {
      id: 'PAY002',
      receipt_no: 'RCPT0019',
      invoice_no: 'INV0029',
      customer_name: 'FGR Engineering',
      invoice_date: '20 May, 2026',
      due_date: '19 June, 2026',
      amount_received: 225000,
      payment_mode: 'Cash',
      payment_date: '02 June, 2026',
      reference_no: 'CASH-2025-00126',
      status: 'Received',
      customer_id: 'CUST002',
      customer_details: {
        name: 'Mr Sandeep',
        phone: '9876543210',
        email: 'fgr@demo.com',
        company: 'FGR Engineering Pvt. Ltd.',
        billing_address: '78, Site 4, Sahibabad, Ghaziabad, Uttar Pradesh 201005',
      },
      bank_name: 'N/A',
      remark: 'Cash payment received',
      recorded_by: 'John Doe',
      payment_proof: null,
      invoice_settled: [
        {
          invoice_no: 'INV0029',
          invoice_date: '20 May, 2026',
          due_date: '19 June, 2026',
          invoice_amount: 225000,
          outstanding_before: 225000,
          payment_applied: 225000,
          outstanding_after: 0,
        },
      ],
      payment_history: [],
      ledger_impact: {
        customer_ledger: 'FGR Engineering (CUST002)',
        debit: 225000,
        credit: 225000,
        closing_balance: 125000,
      },
    },
    {
      id: 'PAY003',
      receipt_no: 'RCPT0059',
      invoice_no: 'INV0013',
      customer_name: 'DPS Steel',
      invoice_date: '25 May, 2026',
      due_date: '24 June, 2026',
      amount_received: 350000,
      payment_mode: 'Bank Transfer',
      payment_date: '28 May, 2026',
      reference_no: 'UTR01234567890',
      status: 'Received',
      customer_id: 'CUST003',
      customer_details: {
        name: 'Mr Deepak',
        phone: '8899776655',
        email: 'dps@demo.com',
        company: 'DPS Steels Pvt Ltd',
        billing_address: '34, Okhla Phase 2, New Delhi, Delhi 110020',
      },
      bank_name: 'ICICI',
      remark: 'Advance payment',
      recorded_by: 'Mike Smith',
      payment_proof: 'payment_receipt.pdf',
      invoice_settled: [
        {
          invoice_no: 'INV0013',
          invoice_date: '25 May, 2026',
          due_date: '24 June, 2026',
          invoice_amount: 350000,
          outstanding_before: 350000,
          payment_applied: 350000,
          outstanding_after: 0,
        },
      ],
      payment_history: [],
      ledger_impact: {
        customer_ledger: 'DPS Steel (CUST003)',
        debit: 350000,
        credit: 350000,
        closing_balance: 425000,
      },
    },
    {
      id: 'PAY004',
      receipt_no: 'RCPT0025',
      invoice_no: 'INV0045',
      customer_name: 'DLP Construction',
      invoice_date: '10 May, 2026',
      due_date: '10 June, 2026',
      amount_received: 0,
      payment_mode: '-',
      payment_date: '-',
      reference_no: '-',
      status: 'Pending',
      customer_id: 'CUST004',
      customer_details: {
        name: 'Mr Vikram',
        phone: '9988001122',
        email: 'dlp@demo.com',
        company: 'DLP Construction Ltd',
        billing_address: '12, Sector 5, Faridabad, Haryana 121006',
      },
      bank_name: '-',
      remark: 'Awaiting payment',
      recorded_by: '-',
      payment_proof: null,
      invoice_settled: [],
      payment_history: [],
      ledger_impact: null,
    },
    {
      id: 'PAY005',
      receipt_no: 'RCPT0029',
      invoice_no: 'INV0076',
      customer_name: 'TNC INFRA',
      invoice_date: '05 May, 2026',
      due_date: '06 June, 2026',
      amount_received: 0,
      payment_mode: '-',
      payment_date: '-',
      reference_no: '-',
      status: 'Overdue',
      customer_id: 'CUST005',
      customer_details: {
        name: 'Mr Amit',
        phone: '9988776655',
        email: 'tnc@demo.com',
        company: 'TNC Infra Pvt Ltd',
        billing_address: '45, Sector 4, Greater Noida, Uttar Pradesh 201310',
      },
      bank_name: '-',
      remark: 'Payment overdue',
      recorded_by: '-',
      payment_proof: null,
      invoice_settled: [],
      payment_history: [],
      ledger_impact: null,
    },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  Received: 'green',
  Pending: 'yellow',
  Overdue: 'red',
  Partial: 'orange',
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
};

export const CustomerPaymentsManagement = () => {
  const [addOpened, setAddOpened] = useState(false);
  const [viewOpened, setViewOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const [paymentForm, setPaymentForm] = useState({
    customer_name: '',
    company_name: '',
    contact_information: '',
    payment_number: '',
    payment_mode: '',
    balance_balance: 0,
    bonus: 0,
    inactive: false,
    invoice_number: '',
    invoice_amount: 0,
    outstanding_amount: 0,
    payment_applied: 0,
    customer_ledger: '',
    bill: 0,
    credit: 0,
    current_balance: 0,
    payment_date: '',
    reference_no: '',
    remark: '',
    bank_name: '',
    payment_proof: null as File | null,
  });

  const [editField, setEditField] = useState({
    id: '',
    receipt_no: '',
    invoice_no: '',
    customer_name: '',
    amount_received: 0,
    payment_mode: '',
    payment_date: '',
    status: '',
  });

  const [paymentsData] = useState<any>(DUMMY_PAYMENTS_DATA);

  const handlePaymentChange = (key: string, value: any) => {
    setPaymentForm({ ...paymentForm, [key]: value });
  };

  const handleEditChange = (key: string, value: any) => {
    setEditField({ ...editField, [key]: value });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment added:', paymentForm);
    setAddOpened(false);
    setPaymentForm({
      customer_name: '',
      company_name: '',
      contact_information: '',
      payment_number: '',
      payment_mode: '',
      balance_balance: 0,
      bonus: 0,
      inactive: false,
      invoice_number: '',
      invoice_amount: 0,
      outstanding_amount: 0,
      payment_applied: 0,
      customer_ledger: '',
      bill: 0,
      credit: 0,
      current_balance: 0,
      payment_date: '',
      reference_no: '',
      remark: '',
      bank_name: '',
      payment_proof: null,
    });
    alert('Payment recorded successfully (Demo)');
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment updated:', editField);
    setEditOpened(false);
    alert('Payment updated successfully (Demo)');
  };

  const handleView = (obj: any) => {
    setSelectedPayment(obj);
    setViewOpened(true);
  };

  const handleEdit = (obj: any) => {
    setEditField({
      id: obj.id,
      receipt_no: obj.receipt_no,
      invoice_no: obj.invoice_no,
      customer_name: obj.customer_name,
      amount_received: obj.amount_received,
      payment_mode: obj.payment_mode,
      payment_date: obj.payment_date,
      status: obj.status,
    });
    setEditOpened(true);
  };

  const handleDelete = (id: string) => {
    alert(`Delete record ${id} (Demo)`);
  };

  const tableColumns = [
    { th: { id: 'srNo', style: { minWidth: '70px', width: '70px' } }, text: 'SR NO.' },
    { text: 'Receipt No.', th: { id: 'receipt_no', style: { minWidth: '100px' } } },
    { text: 'Invoice No.', th: { id: 'invoice_no', style: { minWidth: '100px' } } },
    { text: 'Customer Name', th: { id: 'customer_name', style: { minWidth: '180px' } } },
    { text: 'Invoice Date', th: { id: 'invoice_date', style: { minWidth: '100px' } } },
    { text: 'Due Date', th: { id: 'due_date', style: { minWidth: '100px' } } },
    { text: 'Amount Received', th: { id: 'amount_received', style: { minWidth: '120px' } } },
    { text: 'Payment Mode', th: { id: 'payment_mode', style: { minWidth: '120px' } } },
    { text: 'Payment Date', th: { id: 'payment_date', style: { minWidth: '100px' } } },
    { text: 'Reference No.', th: { id: 'reference_no', style: { minWidth: '130px' } } },
    { text: 'Status', th: { id: 'status', style: { minWidth: '100px' } } },
    { text: 'Actions', th: { id: 'action', style: { minWidth: '100px' } }, justifyContent: 'center' },
  ];

  const statsCards = [
    { title: 'Pending Payments', value: 1845750, icon: faClock, color: 'orange' },
    { title: 'Received Payments', value: 3276540, icon: faCheckCircle, color: 'green' },
    { title: 'Overdue Amount', value: 1267890, icon: faTimesCircle, color: 'red' },
    { title: 'Total Outstanding', value: 5122300, icon: faWallet, color: 'blue' },
  ];

  const paymentModeSummary = [
    { mode: 'Bank Transfer', amount: 2500000, percentage: 60 },
    { mode: 'Cash', amount: 750000, percentage: 18 },
    { mode: 'Cheque', amount: 500000, percentage: 12 },
    { mode: 'NEFT', amount: 420000, percentage: 10 },
  ];

  const topCustomers = [
    { name: 'ABC Elevators', amount: 450000, rank: 1 },
    { name: 'DPS Steel', amount: 350000, rank: 2 },
    { name: 'LMN Industries', amount: 330000, rank: 3 },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header Section */}
      <div className="mb-6">
        <Title order={2} className="text-gray-800">Customer Payments</Title>
        <p className="mt-1 text-gray-500">Manage and track all customers payment record</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Paper key={index} withBorder p="md" radius="md" className="bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(stat.value)}</p>
              </div>
              <ThemeIcon color={stat.color} size="xl" radius="xl" variant="light">
                <FontAwesomeIcon icon={stat.icon} size="lg" />
              </ThemeIcon>
            </div>
          </Paper>
        ))}
      </div>

      {/* Search Filters */}
      <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-white border border-gray-200 rounded-xl sm:grid-cols-2 lg:grid-cols-6">
        <TextInput placeholder="Search..." className="lg:col-span-2" />
        <Select placeholder="Payment Status: All" data={['All', 'Received', 'Pending', 'Overdue', 'Partial']} />
        <Select placeholder="Payment Mode: All" data={['All', 'Bank Transfer', 'Cash', 'Cheque', 'NEFT', 'Credit Card']} />
        <CustomDateInput placeholder="Date Range" name="date_range" />
        <Button variant="outline" color="gray">Clear Filters</Button>
      </div>

      {/* Payments Table */}
      <div className="p-4 mb-6 bg-white border border-gray-200 shadow-sm rounded-xl">
        <CustomTable
          data={paymentsData}
          setData={() => {}}
          isSearchingRequired={false}
          isSortingRequired={true}
          isPaginationRequired={true}
          tableHeadData={tableColumns}
          tableBody={() =>
            paymentsData?.data?.map((obj: any, index: number) => (
              <tr key={obj.id} className="transition border-b hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-medium text-gray-600">{index + 1}</td>
                <td className="px-3 py-2 text-sm font-medium text-blue-600">{obj.receipt_no}</td>
                <td className="px-3 py-2 text-sm">{obj.invoice_no}</td>
                <td className="px-3 py-2 text-sm font-medium">{obj.customer_name}</td>
                <td className="px-3 py-2 text-sm">{obj.invoice_date}</td>
                <td className="px-3 py-2 text-sm">{obj.due_date}</td>
                <td className="px-3 py-2 text-sm font-semibold">{obj.amount_received > 0 ? formatCurrency(obj.amount_received) : '-'}</td>
                <td className="px-3 py-2 text-sm">{obj.payment_mode}</td>
                <td className="px-3 py-2 text-sm">{obj.payment_date}</td>
                <td className="px-3 py-2 font-mono text-sm">{obj.reference_no !== '-' ? obj.reference_no : '-'}</td>
                <td className="px-3 py-2">
                  <Badge color={STATUS_COLORS[obj.status]} variant="light">{obj.status}</Badge>
                </td>
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
          url="customer-payments?demo=true"
          notFoundMessage="No Payment Data Found."
          notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
        />
      </div>

      {/* Payment Summary and Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Payment Summary Cards */}
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-3 text-gray-700">Payment Summary</Title>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 border-b">
              <span className="text-sm">Received</span>
              <span className="font-bold text-green-600">{formatCurrency(3276540)}</span>
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <span className="text-sm">Pending</span>
              <span className="font-bold text-yellow-600">{formatCurrency(1845750)}</span>
            </div>
            <div className="flex items-center justify-between p-2">
              <span className="text-sm">Overdue</span>
              <span className="font-bold text-red-600">{formatCurrency(1267890)}</span>
            </div>
          </div>
        </Paper>

        {/* Payment Mode Summary */}
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-3 text-gray-700">Payment Mode Summary</Title>
          <div className="space-y-3">
            {paymentModeSummary.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-1 text-sm">
                  <span>{item.mode}</span>
                  <span className="font-semibold">{formatCurrency(item.amount)}</span>
                </div>
                <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Paper>

        {/* Top Paying Customers */}
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-3 text-gray-700">Top Paying Customers (This Month)</Title>
          <div className="space-y-3">
            {topCustomers.map((customer) => (
              <div key={customer.rank} className="flex items-center justify-between p-2 border-b last:border-0">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                    <FontAwesomeIcon icon={faTrophy} className="text-xs text-yellow-500" />
                  </div>
                  <span className="font-medium">{customer.name}</span>
                </div>
                <span className="font-semibold">{formatCurrency(customer.amount)}</span>
              </div>
            ))}
          </div>
        </Paper>
      </div>

      {/* View Payment Modal */}
      <Modal
        opened={viewOpened}
        onClose={() => setViewOpened(false)}
        title={`${selectedPayment?.receipt_no || ''} | ${selectedPayment?.customer_name || ''}`}
        size="xl"
        centered
      >
        {selectedPayment && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b">
              <div>
                <Badge color="blue" size="lg">Receipt No. {selectedPayment.receipt_no}</Badge>
                <Badge color={STATUS_COLORS[selectedPayment.status]} size="lg" ml="md">{selectedPayment.status}</Badge>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Payment Date: {selectedPayment.payment_date} | Payment Mode: {selectedPayment.payment_mode}</p>
                </div>
                <p className="mt-2 text-2xl font-bold text-blue-600">{formatCurrency(selectedPayment.amount_received)}</p>
              </div>
              <Button variant="outline" leftSection={<FontAwesomeIcon icon={faDownload} />} size="sm">
                Download Receipt
              </Button>
            </div>

            <Divider label="Customer Details" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faUser} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Customer Name</p>
                    <p className="font-medium">{selectedPayment.customer_details.name}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCreditCard} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Customer ID</p>
                    <p className="font-medium">{selectedPayment.customer_id}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faPhone} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedPayment.customer_details.phone}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedPayment.customer_details.email}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faBuilding} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="font-medium">{selectedPayment.customer_details.company}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={12}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Billing Address</p>
                    <p className="text-sm">{selectedPayment.customer_details.billing_address}</p>
                    <Button variant="light" size="xs" mt={5}>View Customer Details →</Button>
                  </div>
                </div>
              </Grid.Col>
            </Grid>

            <Divider label="Payment Details" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Receipt No.</p>
                <p className="font-medium">{selectedPayment.receipt_no}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Payment Date</p>
                <p className="font-medium">{selectedPayment.payment_date}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Payment Mode</p>
                <p className="font-medium">{selectedPayment.payment_mode}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Bank Name</p>
                <p className="font-medium">{selectedPayment.bank_name || 'N/A'}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Reference No.</p>
                <p className="font-mono font-medium">{selectedPayment.reference_no}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Remark</p>
                <p className="font-medium">{selectedPayment.remark || 'N/A'}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Recorded by</p>
                <p className="font-medium">{selectedPayment.recorded_by}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Payment Proof</p>
                {selectedPayment.payment_proof ? (
                  <Button variant="light" size="xs" leftSection={<FontAwesomeIcon icon={faFileAlt} />}>
                    {selectedPayment.payment_proof}
                  </Button>
                ) : <p className="font-medium">No proof uploaded</p>}
              </Grid.Col>
            </Grid>

            {selectedPayment.invoice_settled.length > 0 && (
              <>
                <Divider label="Invoice Settled" labelPosition="left" />
                <div className="overflow-x-auto">
                  <Table striped highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>Invoice No.</Table.Th>
                        <Table.Th>Invoice Date</Table.Th>
                        <Table.Th>Due Date</Table.Th>
                        <Table.Th>Invoice Amount</Table.Th>
                        <Table.Th>Outstanding (Before)</Table.Th>
                        <Table.Th>Payment Applied</Table.Th>
                        <Table.Th>Outstanding (After)</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {selectedPayment.invoice_settled.map((invoice: any, idx: number) => (
                        <Table.Tr key={idx}>
                          <Table.Td>{idx + 1}</Table.Td>
                          <Table.Td>{invoice.invoice_no}</Table.Td>
                          <Table.Td>{invoice.invoice_date}</Table.Td>
                          <Table.Td>{invoice.due_date}</Table.Td>
                          <Table.Td>{formatCurrency(invoice.invoice_amount)}</Table.Td>
                          <Table.Td>{formatCurrency(invoice.outstanding_before)}</Table.Td>
                          <Table.Td className="font-semibold text-green-600">{formatCurrency(invoice.payment_applied)}</Table.Td>
                          <Table.Td className="font-semibold">{formatCurrency(invoice.outstanding_after)}</Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </div>
              </>
            )}

            {selectedPayment.payment_history.length > 0 && (
              <>
                <Divider label="Payment History" labelPosition="left" />
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Receipt No.</Table.Th>
                      <Table.Th>Payment Date</Table.Th>
                      <Table.Th>Payment Mode</Table.Th>
                      <Table.Th>Amount</Table.Th>
                      <Table.Th>Status</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {selectedPayment.payment_history.map((payment: any, idx: number) => (
                      <Table.Tr key={idx}>
                        <Table.Td>{payment.receipt_no}</Table.Td>
                        <Table.Td>{payment.payment_date}</Table.Td>
                        <Table.Td>{payment.payment_mode}</Table.Td>
                        <Table.Td>{formatCurrency(payment.amount)}</Table.Td>
                        <Table.Td><Badge color="green" variant="light">{payment.status}</Badge></Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </>
            )}

            {selectedPayment.ledger_impact && (
              <>
                <Divider label="Ledger Impact" labelPosition="left" />
                <Grid>
                  <Grid.Col span={6}>
                    <p className="text-sm text-gray-500">Customer Ledger</p>
                    <p className="font-medium">{selectedPayment.ledger_impact.customer_ledger}</p>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <p className="text-sm text-gray-500">Debit (Payment)</p>
                    <p className="font-medium text-green-600">{formatCurrency(selectedPayment.ledger_impact.debit)}</p>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <p className="text-sm text-gray-500">Credit (Invoice Settled)</p>
                    <p className="font-medium text-red-600">{formatCurrency(selectedPayment.ledger_impact.credit)}</p>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <p className="text-sm text-gray-500">Closing Balance</p>
                    <p className="font-medium font-bold">{formatCurrency(selectedPayment.ledger_impact.closing_balance)}</p>
                  </Grid.Col>
                </Grid>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* Add Payment Modal */}
      <Modal opened={addOpened} onClose={() => setAddOpened(false)} title="Add Customer Payment" size="xl" centered>
        <form onSubmit={handleAddSubmit} className="mt-2 space-y-6">
          <div>
            <Title order={5} className="mb-3 text-gray-700">Customer Details</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput
                label="Customer Name"
                placeholder="Customer Name"
                value={paymentForm.customer_name}
                onChange={(e) => handlePaymentChange('customer_name', e.currentTarget.value)}
                required
              />
              <TextInput
                label="Company Name"
                placeholder="Company Name"
                value={paymentForm.company_name}
                onChange={(e) => handlePaymentChange('company_name', e.currentTarget.value)}
              />
              <TextInput
                label="Contact Information"
                placeholder="Contact Information"
                value={paymentForm.contact_information}
                onChange={(e) => handlePaymentChange('contact_information', e.currentTarget.value)}
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Payment Details</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <TextInput
                label="Payment Number"
                placeholder="Payment Number"
                value={paymentForm.payment_number}
                onChange={(e) => handlePaymentChange('payment_number', e.currentTarget.value)}
              />
              <Select
                label="Payment Mode"
                placeholder="Payment Mode"
                data={['Bank Transfer', 'Cash', 'Cheque', 'NEFT', 'RTGS', 'Credit Card']}
                value={paymentForm.payment_mode}
                onChange={(value) => handlePaymentChange('payment_mode', value || '')}
              />
              <CustomDateInput
                label="Payment Date"
                name="payment_date"
                value={paymentForm.payment_date}
                onChange={(e) => handlePaymentChange('payment_date', e?.currentTarget?.value || '')}
              />
              <NumberInput
                label="Balance Balance"
                placeholder="Balance Balance"
                value={paymentForm.balance_balance}
                onChange={(value) => handlePaymentChange('balance_balance', value || 0)}
                leftSection="₹"
              />
              <NumberInput
                label="Bonus"
                placeholder="Bonus"
                value={paymentForm.bonus}
                onChange={(value) => handlePaymentChange('bonus', value || 0)}
                leftSection="₹"
              />
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Inactive</label>
                <input
                  type="checkbox"
                  checked={paymentForm.inactive}
                  onChange={(e) => handlePaymentChange('inactive', e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Invoice</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput
                label="Invoice Number"
                placeholder="Invoice Number"
                value={paymentForm.invoice_number}
                onChange={(e) => handlePaymentChange('invoice_number', e.currentTarget.value)}
              />
              <NumberInput
                label="Invoice Amount"
                placeholder="Invoice Amount"
                value={paymentForm.invoice_amount}
                onChange={(value) => handlePaymentChange('invoice_amount', value || 0)}
                leftSection="₹"
              />
              <NumberInput
                label="Outstanding Amount (Total)"
                placeholder="Outstanding Amount"
                value={paymentForm.outstanding_amount}
                onChange={(value) => handlePaymentChange('outstanding_amount', value || 0)}
                leftSection="₹"
              />
              <NumberInput
                label="Payment Applied"
                placeholder="Payment Applied Amount"
                value={paymentForm.payment_applied}
                onChange={(value) => handlePaymentChange('payment_applied', value || 0)}
                leftSection="₹"
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Customer Ledger</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput
                label="Customer Ledger"
                placeholder="Customer Ledger"
                value={paymentForm.customer_ledger}
                onChange={(e) => handlePaymentChange('customer_ledger', e.currentTarget.value)}
              />
              <NumberInput
                label="Bill"
                placeholder="Bill"
                value={paymentForm.bill}
                onChange={(value) => handlePaymentChange('bill', value || 0)}
                leftSection="₹"
              />
              <NumberInput
                label="Credit"
                placeholder="Credit"
                value={paymentForm.credit}
                onChange={(value) => handlePaymentChange('credit', value || 0)}
                leftSection="₹"
              />
              <NumberInput
                label="Current Balance"
                placeholder="Current Balance"
                value={paymentForm.current_balance}
                onChange={(value) => handlePaymentChange('current_balance', value || 0)}
                leftSection="₹"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
            <Button variant="outline" onClick={() => setAddOpened(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Record Payment
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Payment Modal */}
      <Modal opened={editOpened} onClose={() => setEditOpened(false)} title="Edit Payment" size="lg" centered>
        <form onSubmit={handleEditSubmit} className="mt-2 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextInput
              label="Receipt No."
              value={editField.receipt_no}
              disabled
            />
            <TextInput
              label="Invoice No."
              value={editField.invoice_no}
              onChange={(e) => handleEditChange('invoice_no', e.currentTarget.value)}
            />
            <TextInput
              label="Customer Name"
              value={editField.customer_name}
              onChange={(e) => handleEditChange('customer_name', e.currentTarget.value)}
              required
            />
            <NumberInput
              label="Amount Received"
              value={editField.amount_received}
              onChange={(value) => handleEditChange('amount_received', value || 0)}
              leftSection="₹"
            />
            <Select
              label="Payment Mode"
              data={['Bank Transfer', 'Cash', 'Cheque', 'NEFT', 'RTGS', 'Credit Card']}
              value={editField.payment_mode}
              onChange={(value) => handleEditChange('payment_mode', value || '')}
            />
            <CustomDateInput
              label="Payment Date"
              name="payment_date"
              value={editField.payment_date}
              onChange={(e) => handleEditChange('payment_date', e?.currentTarget?.value || '')}
            />
            <Select
              label="Status"
              data={['Received', 'Pending', 'Overdue', 'Partial']}
              value={editField.status}
              onChange={(value) => handleEditChange('status', value || '')}
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setEditOpened(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Update Payment
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Payment Button - Fixed at bottom right */}
      <Button
        onClick={() => setAddOpened(true)}
        color="blue"
        size="lg"
        radius="xl"
        className="fixed shadow-lg bottom-8 right-8"
        leftSection={<FontAwesomeIcon icon={faPlus} />}
      >
        Add Payment
      </Button>
    </div>
  );
};