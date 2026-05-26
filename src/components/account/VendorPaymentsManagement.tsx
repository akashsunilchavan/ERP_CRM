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
  faPercent,
} from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';

const DUMMY_VENDOR_PAYMENTS_DATA = {
  data: [
    {
      id: 'VPAY001',
      payment_no: 'VP0126',
      vendor_name: 'Steel India Ltd.',
      bill_no: 'BLL-2025-0021',
      gst_rate: '18%',
      bill_date: '25 May, 2026',
      due_date: '28 June, 2026',
      amount: 450000,
      payment_mode: 'Bank Transfer',
      payment_date: '12 June, 2026',
      status: 'Paid',
      vendor_id: 'VEN0095',
      vendor_details: {
        name: 'Steel India Ltd.',
        phone: '9876545678',
        email: 'steel@demo.com',
        gstin: '27ABCDE1234F125',
        billing_address: 'A-203, Industrial area, Andheri East, Mumbai, Maharashtra - 400093',
      },
      bank_name: 'HDFC',
      reference_no: 'UTR1234567890',
      remark: 'Payment for raw material supply as per PO-456/ABC/20',
      created_by: 'Joanna Doe',
      invoices_paid: [
        {
          bill_no: 'BLL-2025-0021',
          bill_date: '25 May, 2026',
          due_date: '20 June, 2026',
          bill_amount: 450000,
          outstanding_before: 430000,
          payment_paid: 450000,
          outstanding_after: 0,
        },
        {
          bill_no: 'BLL-2015-0011',
          bill_date: '19 Nov, 2025',
          due_date: '15 Feb, 2026',
          bill_amount: 50000,
          outstanding_before: 50000,
          payment_paid: 50000,
          outstanding_after: 0,
        },
      ],
      payment_history: [
        { payment_no: 'VP0126', payment_date: '12 June, 2026', payment_mode: 'Bank Transfer', amount: 450000, status: 'Paid' },
        { payment_no: 'VP0039', payment_date: '20 March, 2026', payment_mode: 'RTGS', amount: 125000, status: 'Paid' },
        { payment_no: 'VP0199', payment_date: '30 Dec, 2025', payment_mode: 'NEFT', amount: 250000, status: 'Paid' },
      ],
      ledger_impact: [
        { ledger_id: '100001', item_id: '100001', description: 'Stock In Stock', amount: 10.00 },
        { ledger_id: '100002', item_id: '100002', description: 'Cash In Hand', amount: 10.00 },
        { ledger_id: '100003', item_id: '100003', description: 'Carried Forward', amount: 10.00 },
      ],
    },
    {
      id: 'VPAY002',
      payment_no: 'VPC028',
      vendor_name: 'Melco Pvt. Ltd.',
      bill_no: 'MLL-2025-0079',
      gst_rate: '18%',
      bill_date: '23 May, 2026',
      due_date: '19 June, 2026',
      amount: 220000,
      payment_mode: 'NEFT',
      payment_date: '27 June, 2026',
      status: 'Paid',
      vendor_id: 'VEN0082',
      vendor_details: {
        name: 'Melco Pvt. Ltd.',
        phone: '9988776655',
        email: 'melco@demo.com',
        gstin: '27MELCO1234G125',
        billing_address: 'B-45, Sector 5, Noida, Uttar Pradesh - 201301',
      },
      bank_name: 'ICICI',
      reference_no: 'NEFT12345678',
      remark: 'Payment for electronic components',
      created_by: 'John Doe',
      invoices_paid: [
        {
          bill_no: 'MLL-2025-0079',
          bill_date: '23 May, 2026',
          due_date: '19 June, 2026',
          bill_amount: 220000,
          outstanding_before: 220000,
          payment_paid: 220000,
          outstanding_after: 0,
        },
      ],
      payment_history: [],
      ledger_impact: [],
    },
    {
      id: 'VPAY003',
      payment_no: 'VPC009',
      vendor_name: 'Global Industries',
      bill_no: 'GBL-2025-0025',
      gst_rate: '18%',
      bill_date: '25 May, 2026',
      due_date: '24 June, 2026',
      amount: 350000,
      payment_mode: 'RTGS',
      payment_date: '26 May, 2026',
      status: 'Paid',
      vendor_id: 'VEN0078',
      vendor_details: {
        name: 'Global Industries',
        phone: '8899776655',
        email: 'global@demo.com',
        gstin: '27GLOBAL1234H125',
        billing_address: 'C-12, Industrial Area, Faridabad, Haryana - 121006',
      },
      bank_name: 'SBI',
      reference_no: 'RTGS98765432',
      remark: 'Advance payment for raw materials',
      created_by: 'Mike Smith',
      invoices_paid: [
        {
          bill_no: 'GBL-2025-0025',
          bill_date: '25 May, 2026',
          due_date: '24 June, 2026',
          bill_amount: 350000,
          outstanding_before: 350000,
          payment_paid: 350000,
          outstanding_after: 0,
        },
      ],
      payment_history: [],
      ledger_impact: [],
    },
    {
      id: 'VPAY004',
      payment_no: 'VPC024',
      vendor_name: 'ABC Logistics',
      bill_no: 'BLL-2025-0039',
      gst_rate: '5%',
      bill_date: '17 May, 2026',
      due_date: '15 June, 2026',
      amount: 132000,
      payment_mode: 'Bank Transfer',
      payment_date: '',
      status: 'Processing',
      vendor_id: 'VEN0065',
      vendor_details: {
        name: 'ABC Logistics',
        phone: '7788996655',
        email: 'abc@demo.com',
        gstin: '27ABCLOG1234I125',
        billing_address: 'D-78, Transport Nagar, Ghaziabad, Uttar Pradesh - 201001',
      },
      bank_name: '',
      reference_no: '',
      remark: 'Payment under process',
      created_by: 'Tim Doe',
      invoices_paid: [],
      payment_history: [],
      ledger_impact: [],
    },
    {
      id: 'VPAY005',
      payment_no: 'VPC025',
      vendor_name: 'XYZ India Ltd.',
      bill_no: 'BLL-2025-0015',
      gst_rate: '18%',
      bill_date: '05 May, 2026',
      due_date: '06 June, 2026',
      amount: 250000,
      payment_mode: 'Cheque',
      payment_date: '',
      status: 'Overdue',
      vendor_id: 'VEN0056',
      vendor_details: {
        name: 'XYZ India Ltd.',
        phone: '6677889900',
        email: 'xyz@demo.com',
        gstin: '27XYZIND1234J125',
        billing_address: 'E-34, Sector 8, Gurugram, Haryana - 122001',
      },
      bank_name: '',
      reference_no: '',
      remark: 'Payment overdue - needs follow up',
      created_by: 'John Doe',
      invoices_paid: [],
      payment_history: [],
      ledger_impact: [],
    },
    {
      id: 'VPAY006',
      payment_no: 'VPC027',
      vendor_name: 'CMMI India',
      bill_no: 'BLL-2025-0076',
      gst_rate: '18%',
      bill_date: '10 May, 2026',
      due_date: '08 June, 2026',
      amount: 130000,
      payment_mode: 'NEFT',
      payment_date: '20 May, 2026',
      status: 'Paid',
      vendor_id: 'VEN0045',
      vendor_details: {
        name: 'CMMI India',
        phone: '5544332211',
        email: 'cmmi@demo.com',
        gstin: '27CMMIIND1234K125',
        billing_address: 'F-56, Electronic City, Bengaluru, Karnataka - 560100',
      },
      bank_name: 'Axis Bank',
      reference_no: 'NEFT55667788',
      remark: 'Payment for certification services',
      created_by: 'Sarah Johnson',
      invoices_paid: [
        {
          bill_no: 'BLL-2025-0076',
          bill_date: '10 May, 2026',
          due_date: '08 June, 2026',
          bill_amount: 130000,
          outstanding_before: 130000,
          payment_paid: 130000,
          outstanding_after: 0,
        },
      ],
      payment_history: [],
      ledger_impact: [],
    },
    {
      id: 'VPAY007',
      payment_no: 'VPC008',
      vendor_name: 'TUV Builders',
      bill_no: 'BLL-2025-0040',
      gst_rate: '5%',
      bill_date: '16 May, 2026',
      due_date: '14 June, 2026',
      amount: 145000,
      payment_mode: 'Bank Transfer',
      payment_date: '30 May, 2026',
      status: 'Paid',
      vendor_id: 'VEN0034',
      vendor_details: {
        name: 'TUV Builders',
        phone: '4433221100',
        email: 'tuv@demo.com',
        gstin: '27TUVBLD1234L125',
        billing_address: 'G-89, Construction Area, Pune, Maharashtra - 411001',
      },
      bank_name: 'HDFC',
      reference_no: 'UTR99887766',
      remark: 'Payment for construction materials',
      created_by: 'Mike Smith',
      invoices_paid: [
        {
          bill_no: 'BLL-2025-0040',
          bill_date: '16 May, 2026',
          due_date: '14 June, 2026',
          bill_amount: 145000,
          outstanding_before: 145000,
          payment_paid: 145000,
          outstanding_after: 0,
        },
      ],
      payment_history: [],
      ledger_impact: [],
    },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  Paid: 'green',
  Processing: 'yellow',
  Overdue: 'red',
  Pending: 'orange',
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
};

export const VendorPaymentsManagement = () => {
  const [addOpened, setAddOpened] = useState(false);
  const [viewOpened, setViewOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const [paymentForm, setPaymentForm] = useState({
    vendor_name: '',
    vendor_id: '',
    phone: '',
    email: '',
    gstin: '',
    billing_address: '',
    payment_no: '',
    payment_date: '',
    payment_mode: '',
    bank_name: '',
    reference_no: '',
    remark: '',
    bill_no: '',
    bill_date: '',
    due_date: '',
    amount: 0,
    gst_rate: '',
    created_by: '',
    payment_proof: null as File | null,
  });

  const [editField, setEditField] = useState({
    id: '',
    payment_no: '',
    vendor_name: '',
    bill_no: '',
    amount: 0,
    payment_mode: '',
    payment_date: '',
    status: '',
  });

  const [paymentsData] = useState<any>(DUMMY_VENDOR_PAYMENTS_DATA);

  const handlePaymentChange = (key: string, value: any) => {
    setPaymentForm({ ...paymentForm, [key]: value });
  };

  const handleEditChange = (key: string, value: any) => {
    setEditField({ ...editField, [key]: value });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Vendor Payment added:', paymentForm);
    setAddOpened(false);
    setPaymentForm({
      vendor_name: '',
      vendor_id: '',
      phone: '',
      email: '',
      gstin: '',
      billing_address: '',
      payment_no: '',
      payment_date: '',
      payment_mode: '',
      bank_name: '',
      reference_no: '',
      remark: '',
      bill_no: '',
      bill_date: '',
      due_date: '',
      amount: 0,
      gst_rate: '',
      created_by: '',
      payment_proof: null,
    });
    alert('Vendor payment recorded successfully (Demo)');
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
      payment_no: obj.payment_no,
      vendor_name: obj.vendor_name,
      bill_no: obj.bill_no,
      amount: obj.amount,
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
    { text: 'Payment No', th: { id: 'payment_no', style: { minWidth: '100px' } } },
    { text: 'Vendor Name', th: { id: 'vendor_name', style: { minWidth: '180px' } } },
    { text: 'Bill No.', th: { id: 'bill_no', style: { minWidth: '120px' } } },
    { text: 'Bill Date', th: { id: 'bill_date', style: { minWidth: '100px' } } },
    { text: 'Due Date', th: { id: 'due_date', style: { minWidth: '100px' } } },
    { text: 'Amount', th: { id: 'amount', style: { minWidth: '120px' } } },
    { text: 'Payment Mode', th: { id: 'payment_mode', style: { minWidth: '120px' } } },
    { text: 'Payment Date', th: { id: 'payment_date', style: { minWidth: '100px' } } },
    { text: 'Status', th: { id: 'status', style: { minWidth: '100px' } } },
    { text: 'Actions', th: { id: 'action', style: { minWidth: '100px' } }, justifyContent: 'center' },
  ];

  const statsCards = [
    { title: 'Pending Payments', value: 1845620, icon: faClock, color: 'orange' },
    { title: 'Paid Payments', value: 3284950, icon: faCheckCircle, color: 'green' },
    { title: 'Overdue Amount', value: 845300, icon: faTimesCircle, color: 'red' },
    { title: 'Outstanding Amount', value: 2510670, icon: faWallet, color: 'blue' },
  ];

  const topVendors = [
    { name: 'Steel India Ltd.', amount: 450000, rank: 1 },
    { name: 'Global Industries', amount: 350000, rank: 2 },
    { name: 'O&M Infra', amount: 353000, rank: 3 },
  ];

  const paymentModeSummary = [
    { mode: 'Bank Transfer', count: 4, percentage: 40 },
    { mode: 'NEFT', count: 2, percentage: 20 },
    { mode: 'RTGS', count: 2, percentage: 20 },
    { mode: 'Cheque', count: 1, percentage: 10 },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header Section */}
      <div className="mb-6">
        <Title order={2} className="text-gray-800">Vendor Payments</Title>
        <p className="mt-1 text-gray-500">Manage and track all vendor payment record</p>
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
      <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-white border border-gray-200 rounded-xl sm:grid-cols-2 lg:grid-cols-5">
        <TextInput placeholder="Search..." className="lg:col-span-1" />
        <Select placeholder="Payment Status: All" data={['All', 'Paid', 'Processing', 'Overdue', 'Pending']} />
        <Select placeholder="Payment Mode: All" data={['All', 'Bank Transfer', 'NEFT', 'RTGS', 'Cheque', 'Cash']} />
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
                <td className="px-3 py-2 text-sm font-medium text-blue-600">{obj.payment_no}</td>
                <td className="px-3 py-2 text-sm font-medium">{obj.vendor_name}</td>
                <td className="px-3 py-2 text-sm">{obj.bill_no}</td>
                <td className="px-3 py-2 text-sm">{obj.bill_date}</td>
                <td className="px-3 py-2 text-sm">{obj.due_date}</td>
                <td className="px-3 py-2 text-sm font-semibold">{formatCurrency(obj.amount)}</td>
                <td className="px-3 py-2 text-sm">{obj.payment_mode}</td>
                <td className="px-3 py-2 text-sm">{obj.payment_date || '-'}</td>
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
          url="vendor-payments?demo=true"
          notFoundMessage="No Payment Data Found."
          notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
        />
      </div>

      {/* Payment Summary Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Vendors by Payment */}
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-3 text-gray-700">Top Vendors by Payment (This Month)</Title>
          <div className="space-y-3">
            {topVendors.map((vendor) => (
              <div key={vendor.rank} className="flex items-center justify-between p-2 border-b last:border-0">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                    <FontAwesomeIcon icon={faTrophy} className="text-xs text-yellow-500" />
                  </div>
                  <span className="font-medium">{vendor.name}</span>
                </div>
                <span className="font-semibold">{formatCurrency(vendor.amount)}</span>
              </div>
            ))}
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
                  <span className="font-semibold">{item.count} payments</span>
                </div>
                <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Paper>
      </div>

      {/* View Payment Modal */}
      <Modal
        opened={viewOpened}
        onClose={() => setViewOpened(false)}
        title={`${selectedPayment?.payment_no || ''} | ${selectedPayment?.vendor_name || ''}`}
        size="xl"
        centered
      >
        {selectedPayment && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b">
              <div>
                <Badge color="blue" size="lg">Payment No. {selectedPayment.payment_no}</Badge>
                <div className="mt-2">
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(selectedPayment.amount)}</p>
                  <p className="text-sm text-gray-500">Payment Date: {selectedPayment.payment_date} | Payment Mode: {selectedPayment.payment_mode}</p>
                </div>
              </div>
              <Button variant="outline" leftSection={<FontAwesomeIcon icon={faDownload} />} size="sm">
                Download Receipt
              </Button>
            </div>

            <Divider label="Vendor Details" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faBuilding} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Vendor Name</p>
                    <p className="font-medium">{selectedPayment.vendor_details.name}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCreditCard} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Vendor ID</p>
                    <p className="font-medium">{selectedPayment.vendor_id}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faPhone} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedPayment.vendor_details.phone}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedPayment.vendor_details.email}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faPercent} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">GSTIN</p>
                    <p className="font-medium">{selectedPayment.vendor_details.gstin}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={12}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Billing Address</p>
                    <p className="text-sm">{selectedPayment.vendor_details.billing_address}</p>
                    <Button variant="light" size="xs" mt={5}>View Vendor Details →</Button>
                  </div>
                </div>
              </Grid.Col>
            </Grid>

            <Divider label="Payment Details" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Payment No.</p>
                <p className="font-medium">{selectedPayment.payment_no}</p>
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
                <p className="font-mono font-medium">{selectedPayment.reference_no || 'N/A'}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Remark</p>
                <p className="font-medium">{selectedPayment.remark || 'N/A'}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Created By</p>
                <p className="font-medium">{selectedPayment.created_by}</p>
              </Grid.Col>
            </Grid>

            {selectedPayment.invoices_paid && selectedPayment.invoices_paid.length > 0 && (
              <>
                <Divider label="Invoice Paid" labelPosition="left" />
                <div className="overflow-x-auto">
                  <Table striped highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>Bill No.</Table.Th>
                        <Table.Th>Bill Date</Table.Th>
                        <Table.Th>Due Date</Table.Th>
                        <Table.Th>Bill Amount</Table.Th>
                        <Table.Th>Outstanding (Before)</Table.Th>
                        <Table.Th>Payment Paid</Table.Th>
                        <Table.Th>Outstanding (After)</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {selectedPayment.invoices_paid.map((invoice: any, idx: number) => (
                        <Table.Tr key={idx}>
                          <Table.Td>{idx + 1}</Table.Td>
                          <Table.Td>{invoice.bill_no}</Table.Td>
                          <Table.Td>{invoice.bill_date}</Table.Td>
                          <Table.Td>{invoice.due_date}</Table.Td>
                          <Table.Td>{formatCurrency(invoice.bill_amount)}</Table.Td>
                          <Table.Td>{formatCurrency(invoice.outstanding_before)}</Table.Td>
                          <Table.Td className="font-semibold text-green-600">{formatCurrency(invoice.payment_paid)}</Table.Td>
                          <Table.Td className="font-semibold">{formatCurrency(invoice.outstanding_after)}</Table.Td>
                        </Table.Tr>
                      ))}
                      <Table.Tr className="font-bold bg-gray-50">
                        <Table.Td colSpan={4}>Total</Table.Td>
                        <Table.Td>{formatCurrency(selectedPayment.invoices_paid.reduce((sum: number, inv: any) => sum + inv.bill_amount, 0))}</Table.Td>
                        <Table.Td>{formatCurrency(selectedPayment.invoices_paid.reduce((sum: number, inv: any) => sum + inv.outstanding_before, 0))}</Table.Td>
                        <Table.Td>{formatCurrency(selectedPayment.invoices_paid.reduce((sum: number, inv: any) => sum + inv.payment_paid, 0))}</Table.Td>
                        <Table.Td>{formatCurrency(selectedPayment.invoices_paid.reduce((sum: number, inv: any) => sum + inv.outstanding_after, 0))}</Table.Td>
                      </Table.Tr>
                    </Table.Tbody>
                  </Table>
                </div>
              </>
            )}

            {selectedPayment.payment_history && selectedPayment.payment_history.length > 0 && (
              <>
                <Divider label="Payment History" labelPosition="left" />
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Payment No.</Table.Th>
                      <Table.Th>Payment Date</Table.Th>
                      <Table.Th>Payment Mode</Table.Th>
                      <Table.Th>Amount</Table.Th>
                      <Table.Th>Status</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {selectedPayment.payment_history.map((payment: any, idx: number) => (
                      <Table.Tr key={idx}>
                        <Table.Td>{payment.payment_no}</Table.Td>
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

            {selectedPayment.ledger_impact && selectedPayment.ledger_impact.length > 0 && (
              <>
                <Divider label="Ledger Impact" labelPosition="left" />
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Ledger Id</Table.Th>
                      <Table.Th>Item Id</Table.Th>
                      <Table.Th>Description</Table.Th>
                      <Table.Th>Amount</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {selectedPayment.ledger_impact.map((ledger: any, idx: number) => (
                      <Table.Tr key={idx}>
                        <Table.Td>{ledger.ledger_id}</Table.Td>
                        <Table.Td>{ledger.item_id}</Table.Td>
                        <Table.Td>{ledger.description}</Table.Td>
                        <Table.Td>{formatCurrency(ledger.amount)}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* Add Payment Modal */}
      <Modal opened={addOpened} onClose={() => setAddOpened(false)} title="Add Vendor Payment" size="xl" centered>
        <form onSubmit={handleAddSubmit} className="mt-2 space-y-6">
          <div>
            <Title order={5} className="mb-3 text-gray-700">Vendor Details</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput
                label="Vendor Name"
                placeholder="Vendor Name"
                value={paymentForm.vendor_name}
                onChange={(e) => handlePaymentChange('vendor_name', e.currentTarget.value)}
                required
              />
              <TextInput
                label="Vendor ID"
                placeholder="Vendor ID"
                value={paymentForm.vendor_id}
                onChange={(e) => handlePaymentChange('vendor_id', e.currentTarget.value)}
              />
              <TextInput
                label="Phone"
                placeholder="Phone Number"
                value={paymentForm.phone}
                onChange={(e) => handlePaymentChange('phone', e.currentTarget.value)}
              />
              <TextInput
                label="Email"
                placeholder="Email"
                value={paymentForm.email}
                onChange={(e) => handlePaymentChange('email', e.currentTarget.value)}
                type="email"
              />
              <TextInput
                label="GSTIN"
                placeholder="GST Number"
                value={paymentForm.gstin}
                onChange={(e) => handlePaymentChange('gstin', e.currentTarget.value)}
              />
              <Textarea
                label="Billing Address"
                placeholder="Billing Address"
                value={paymentForm.billing_address}
                onChange={(e) => handlePaymentChange('billing_address', e.currentTarget.value)}
                minRows={2}
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Payment Details</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <TextInput
                label="Payment No."
                placeholder="Payment Number"
                value={paymentForm.payment_no}
                onChange={(e) => handlePaymentChange('payment_no', e.currentTarget.value)}
              />
              <CustomDateInput
                label="Payment Date"
                name="payment_date"
                value={paymentForm.payment_date}
                onChange={(e) => handlePaymentChange('payment_date', e?.currentTarget?.value || '')}
              />
              <Select
                label="Payment Mode"
                placeholder="Select Payment Mode"
                data={['Bank Transfer', 'NEFT', 'RTGS', 'Cheque', 'Cash']}
                value={paymentForm.payment_mode}
                onChange={(value) => handlePaymentChange('payment_mode', value || '')}
              />
              <TextInput
                label="Bank Name"
                placeholder="Bank Name"
                value={paymentForm.bank_name}
                onChange={(e) => handlePaymentChange('bank_name', e.currentTarget.value)}
              />
              <TextInput
                label="Reference No."
                placeholder="Reference Number"
                value={paymentForm.reference_no}
                onChange={(e) => handlePaymentChange('reference_no', e.currentTarget.value)}
              />
              <Textarea
                label="Remark"
                placeholder="Remark"
                value={paymentForm.remark}
                onChange={(e) => handlePaymentChange('remark', e.currentTarget.value)}
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Bill Details</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput
                label="Bill No."
                placeholder="Bill Number"
                value={paymentForm.bill_no}
                onChange={(e) => handlePaymentChange('bill_no', e.currentTarget.value)}
                required
              />
              <CustomDateInput
                label="Bill Date"
                name="bill_date"
                value={paymentForm.bill_date}
                onChange={(e) => handlePaymentChange('bill_date', e?.currentTarget?.value || '')}
              />
              <CustomDateInput
                label="Due Date"
                name="due_date"
                value={paymentForm.due_date}
                onChange={(e) => handlePaymentChange('due_date', e?.currentTarget?.value || '')}
              />
              <NumberInput
                label="Amount"
                placeholder="Amount"
                value={paymentForm.amount}
                onChange={(value) => handlePaymentChange('amount', value || 0)}
                leftSection="₹"
                required
              />
              <Select
                label="GST Rate"
                placeholder="GST Rate"
                data={['5%', '12%', '18%', '28%']}
                value={paymentForm.gst_rate}
                onChange={(value) => handlePaymentChange('gst_rate', value || '')}
              />
              <TextInput
                label="Created By"
                placeholder="Created By"
                value={paymentForm.created_by}
                onChange={(e) => handlePaymentChange('created_by', e.currentTarget.value)}
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Upload Payment Proof</Title>
            <FileInput
              placeholder="Upload Payment Proof"
              accept=".pdf,.jpg,.jpeg,.png"
              value={paymentForm.payment_proof}
              onChange={(file) => handlePaymentChange('payment_proof', file)}
              leftSection={<FontAwesomeIcon icon={faUpload} />}
            />
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
      <Modal opened={editOpened} onClose={() => setEditOpened(false)} title="Edit Vendor Payment" size="lg" centered>
        <form onSubmit={handleEditSubmit} className="mt-2 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextInput
              label="Payment No."
              value={editField.payment_no}
              disabled
            />
            <TextInput
              label="Vendor Name"
              value={editField.vendor_name}
              onChange={(e) => handleEditChange('vendor_name', e.currentTarget.value)}
              required
            />
            <TextInput
              label="Bill No."
              value={editField.bill_no}
              onChange={(e) => handleEditChange('bill_no', e.currentTarget.value)}
            />
            <NumberInput
              label="Amount"
              value={editField.amount}
              onChange={(value) => handleEditChange('amount', value || 0)}
              leftSection="₹"
            />
            <Select
              label="Payment Mode"
              data={['Bank Transfer', 'NEFT', 'RTGS', 'Cheque', 'Cash']}
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
              data={['Paid', 'Processing', 'Overdue', 'Pending']}
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

  
  
    </div>
  );
};