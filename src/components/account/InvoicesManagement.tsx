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
  faPercent,
  faFileInvoice,
  faFilter,
  faPrint,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';

const DUMMY_INVOICES_DATA = {
  data: [
    {
      id: 'INV001',
      invoice_no: 'INV0021',
      customer_name: 'ABC Elevators',
      invoice_date: '25 May, 2026',
      due_date: '20 June, 2026',
      po_number: 'PO-456/ABC/26',
      invoice_amount: 450000,
      balance_amount: 0,
      status: 'Paid',
      payment_status: 'Paid',
      customer_id: 'CUST001',
      customer_details: {
        name: 'ABC Elevators',
        customer_name: 'Mr Rajesh',
        phone: '9876545678',
        email: 'abc@demo.com',
        gstin: '27ABCD1234F125',
        billing_address: 'A-203, Industrial Area, Andheri East, Mumbai, Maharashtra - 400093',
      },
      invoice_info: {
        sales_executive: 'Tim Doe',
        discount: 10,
        trade_invoice_amount: 423204,
        costing: 342203,
        postponed: 142203,
        koshtenki: 10,
        tds: 0,
        net_payable: 450000,
      },
      payment_info: {
        payment_mode: 'Cash',
        payment_received: 450000,
        balance_amount: 0,
        advance_accepted: 0,
        payroll_debt: 0,
        reference_no: 'UTR1234567890',
      },
      items: [
        { item_code: 'ITM0001', item_name: 'Gantry Crane', qty: 2, rate: 12000, discount: 60, taxable_amount: 72000, tax: 43350, total: 115350 },
        { item_code: 'ITM3003', item_name: 'EOT Crane', qty: 1, rate: 30000, discount: 30, taxable_amount: 30, tax: 12900, total: 42900 },
        { item_code: 'ITM5002', item_name: 'Freight Charges', qty: 1, rate: 30000, discount: 30, taxable_amount: 30, tax: 9000, total: 39000 },
        { item_code: 'ITM6002', item_name: 'Installation Charges', qty: 1, rate: 30000, discount: 30, taxable_amount: 30, tax: 13334, total: 43334 },
      ],
      attachments: [
        { name: 'PDF-Marketing.pdf', size: '1.2 MB' },
        { name: 'Software_User.pdf', size: '0.8 MB' },
        { name: 'Testimonial_Post.pdf', size: '0.5 MB' },
      ],
      ledger_impact: {
        customer_ledger: 'ABC Elevators/CUST001',
        debit: 443500,
        credit: 443500,
        closing_balance: 0,
      },
    },
    {
      id: 'INV002',
      invoice_no: 'INV0002',
      customer_name: 'LMN Industries',
      invoice_date: '29 May, 2026',
      due_date: '10 June, 2026',
      po_number: 'PO-109/LMN/26',
      invoice_amount: 225000,
      balance_amount: 75000,
      status: 'Partially Paid',
      payment_status: 'Partially Paid',
      customer_id: 'CUST002',
      customer_details: {
        name: 'LMN Industries',
        customer_name: 'Mr Vikram',
        phone: '9988001122',
        email: 'lmn@demo.com',
        gstin: '27LMNIND1234G125',
        billing_address: '12, Sector 5, Faridabad, Haryana - 121006',
      },
      invoice_info: {
        sales_executive: 'John Doe',
        discount: 5,
        trade_invoice_amount: 213750,
        costing: 180000,
        postponed: 33750,
        koshtenki: 5,
        tds: 0,
        net_payable: 225000,
      },
      payment_info: {
        payment_mode: 'Bank Transfer',
        payment_received: 150000,
        balance_amount: 75000,
        advance_accepted: 0,
        payroll_debt: 0,
        reference_no: 'UTR9876543210',
      },
      items: [
        { item_code: 'ITM0010', item_name: 'Industrial Crane', qty: 1, rate: 225000, discount: 11250, taxable_amount: 213750, tax: 38475, total: 252225 },
      ],
      attachments: [],
      ledger_impact: {
        customer_ledger: 'LMN Industries/CUST002',
        debit: 252225,
        credit: 150000,
        closing_balance: 102225,
      },
    },
    {
      id: 'INV003',
      invoice_no: 'INV0038',
      customer_name: 'PQR Engineering',
      invoice_date: '25 May, 2026',
      due_date: '24 June, 2026',
      po_number: 'PO-009/PQR/26',
      invoice_amount: 356000,
      balance_amount: 350000,
      status: 'Converted',
      payment_status: 'Closed',
      customer_id: 'CUST003',
      customer_details: {
        name: 'PQR Engineering',
        customer_name: 'Mr Sandeep',
        phone: '9876543210',
        email: 'pqr@demo.com',
        gstin: '27PQRENG1234H125',
        billing_address: '78, Site 4, Sahibabad, Ghaziabad, Uttar Pradesh - 201005',
      },
      invoice_info: {
        sales_executive: 'Mike Smith',
        discount: 8,
        trade_invoice_amount: 327520,
        costing: 280000,
        postponed: 47520,
        koshtenki: 8,
        tds: 0,
        net_payable: 356000,
      },
      payment_info: {
        payment_mode: 'NEFT',
        payment_received: 6000,
        balance_amount: 350000,
        advance_accepted: 0,
        payroll_debt: 0,
        reference_no: 'NEFT55667788',
      },
      items: [
        { item_code: 'ITM0020', item_name: 'JIB Crane', qty: 1, rate: 356000, discount: 28480, taxable_amount: 327520, tax: 58954, total: 386474 },
      ],
      attachments: [],
      ledger_impact: {
        customer_ledger: 'PQR Engineering/CUST003',
        debit: 386474,
        credit: 6000,
        closing_balance: 380474,
      },
    },
    {
      id: 'INV004',
      invoice_no: 'INV0019',
      customer_name: 'DPS Steels',
      invoice_date: '12 May, 2026',
      due_date: '10 June, 2026',
      po_number: 'PO-100/DPS/26',
      invoice_amount: 122000,
      balance_amount: 0,
      status: 'Paid',
      payment_status: 'Paid',
      customer_id: 'CUST004',
      customer_details: {
        name: 'DPS Steels',
        customer_name: 'Mr Deepak',
        phone: '8899776655',
        email: 'dps@demo.com',
        gstin: '27DPSSTE1234I125',
        billing_address: '34, Okhla Phase 2, New Delhi, Delhi - 110020',
      },
      invoice_info: {
        sales_executive: 'Tim Doe',
        discount: 5,
        trade_invoice_amount: 115900,
        costing: 98000,
        postponed: 17900,
        koshtenki: 5,
        tds: 0,
        net_payable: 122000,
      },
      payment_info: {
        payment_mode: 'Cheque',
        payment_received: 122000,
        balance_amount: 0,
        advance_accepted: 0,
        payroll_debt: 0,
        reference_no: 'CHQ99887766',
      },
      items: [
        { item_code: 'ITM0030', item_name: 'Steel Structure', qty: 1, rate: 122000, discount: 6100, taxable_amount: 115900, tax: 20862, total: 136762 },
      ],
      attachments: [],
      ledger_impact: {
        customer_ledger: 'DPS Steels/CUST004',
        debit: 136762,
        credit: 122000,
        closing_balance: 14762,
      },
    },
    {
      id: 'INV005',
      invoice_no: 'INV0005',
      customer_name: 'XYZ India Ltd.',
      invoice_date: '05 May, 2026',
      due_date: '06 June, 2026',
      po_number: 'PO-119/XYZ/26',
      invoice_amount: 250000,
      balance_amount: 250000,
      status: 'Closed',
      payment_status: 'Closed',
      customer_id: 'CUST005',
      customer_details: {
        name: 'XYZ India Ltd.',
        customer_name: 'Mr Amit',
        phone: '9988776655',
        email: 'xyz@demo.com',
        gstin: '27XYZIND1234J125',
        billing_address: '45, Sector 4, Greater Noida, Uttar Pradesh - 201310',
      },
      invoice_info: {
        sales_executive: 'John Doe',
        discount: 10,
        trade_invoice_amount: 225000,
        costing: 190000,
        postponed: 35000,
        koshtenki: 10,
        tds: 0,
        net_payable: 250000,
      },
      payment_info: {
        payment_mode: 'Bank Transfer',
        payment_received: 0,
        balance_amount: 250000,
        advance_accepted: 0,
        payroll_debt: 0,
        reference_no: '',
      },
      items: [
        { item_code: 'ITM0040', item_name: 'Construction Materials', qty: 1, rate: 250000, discount: 25000, taxable_amount: 225000, tax: 40500, total: 265500 },
      ],
      attachments: [],
      ledger_impact: {
        customer_ledger: 'XYZ India Ltd./CUST005',
        debit: 265500,
        credit: 0,
        closing_balance: 265500,
      },
    },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  Paid: 'green',
  'Partially Paid': 'orange',
  Converted: 'blue',
  Closed: 'cyan',
  Overdue: 'red',
  Pending: 'yellow',
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
};

export const InvoicesManagement = () => {
  const [createOpened, setCreateOpened] = useState(false);
  const [viewOpened, setViewOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const [invoiceForm, setInvoiceForm] = useState({
    customer_name: '',
    customer_id: '',
    email: '',
    phone: '',
    gstin: '',
    billing_address: '',
    invoice_number: '',
    invoice_date: '',
    due_date: '',
    po_number: '',
    gst_rate: '',
    invoice_type: '',
    invoice_amount: 0,
    invoice_period_amount: 0,
    discount: 0,
    trade_invoice_amount: 0,
    costing: 0,
    tds: 0,
    payment_status: '',
    payment_mode: '',
    payment_period: '',
    cheque_number: '',
    reference_no: '',
    transaction_ledger: '',
    chkp: '',
    ref_document: '',
    items: [{ item_code: '', item_name: '', qty: 1, rate: 0, discount: 0, tax: 0, total: 0 }],
  });

  const [editField, setEditField] = useState({
    id: '',
    invoice_no: '',
    customer_name: '',
    invoice_date: '',
    due_date: '',
    invoice_amount: 0,
    status: '',
    payment_status: '',
  });

  const [invoicesData] = useState<any>(DUMMY_INVOICES_DATA);

  const handleInvoiceChange = (key: string, value: any) => {
    setInvoiceForm({ ...invoiceForm, [key]: value });
  };

  const handleEditChange = (key: string, value: any) => {
    setEditField({ ...editField, [key]: value });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Invoice created:', invoiceForm);
    setCreateOpened(false);
    alert('Invoice created successfully (Demo)');
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Invoice updated:', editField);
    setEditOpened(false);
    alert('Invoice updated successfully (Demo)');
  };

  const handleView = (obj: any) => {
    setSelectedInvoice(obj);
    setViewOpened(true);
  };

  const handleEdit = (obj: any) => {
    setEditField({
      id: obj.id,
      invoice_no: obj.invoice_no,
      customer_name: obj.customer_name,
      invoice_date: obj.invoice_date,
      due_date: obj.due_date,
      invoice_amount: obj.invoice_amount,
      status: obj.status,
      payment_status: obj.payment_status,
    });
    setEditOpened(true);
  };

  const handleDelete = (id: string) => {
    alert(`Delete record ${id} (Demo)`);
  };

  const tableColumns = [
    { th: { id: 'srNo', style: { minWidth: '70px', width: '70px' } }, text: 'SR NO.' },
    { text: 'Invoice No.', th: { id: 'invoice_no', style: { minWidth: '100px' } } },
    { text: 'Customer Name', th: { id: 'customer_name', style: { minWidth: '180px' } } },
    { text: 'Invoice Date', th: { id: 'invoice_date', style: { minWidth: '100px' } } },
    { text: 'Due Date', th: { id: 'due_date', style: { minWidth: '100px' } } },
    { text: 'PO Number', th: { id: 'po_number', style: { minWidth: '120px' } } },
    { text: 'Invoice Amount', th: { id: 'invoice_amount', style: { minWidth: '130px' } } },
    { text: 'Balance Amount', th: { id: 'balance_amount', style: { minWidth: '130px' } } },
    { text: 'Status', th: { id: 'status', style: { minWidth: '120px' } } },
    { text: 'Payment Status', th: { id: 'payment_status', style: { minWidth: '120px' } } },
    { text: 'Actions', th: { id: 'action', style: { minWidth: '100px' } }, justifyContent: 'center' },
  ];

  const statsCards = [
    { title: 'Total Invoices', value: '156', icon: faFileInvoice, color: 'blue' },
    { title: 'Total Invoice Amount', value: formatCurrency(58457750), icon: faRupeeSign, color: 'cyan' },
    { title: 'Paid Amount', value: formatCurrency(32764540), icon: faCheckCircle, color: 'green' },
    { title: 'Outstanding Amount', value: formatCurrency(25689210), icon: faWallet, color: 'orange' },
    { title: 'Overdue Amount', value: formatCurrency(8453300), icon: faTimesCircle, color: 'red' },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header Section */}
      <div className="mb-6">
        <Title order={2} className="text-gray-800">Invoices</Title>
        <p className="mt-1 text-gray-500">Manage and track all invoices</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-5">
        {statsCards.map((stat, index) => (
          <Paper key={index} withBorder p="md" radius="md" className="bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-500">{stat.title}</p>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              </div>
              {/* <ThemeIcon color={stat.color} size="lg" radius="xl" variant="light">
                <FontAwesomeIcon icon={stat.icon} size="lg" />
              </ThemeIcon> */}
            </div>
          </Paper>
        ))}
      </div>

      {/* Search Filters */}
      <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-white border border-gray-200 rounded-xl sm:grid-cols-2 lg:grid-cols-5">
        <TextInput placeholder="Search..." className="lg:col-span-1" leftSection={<FontAwesomeIcon icon={faFilter} />} />
        <Select placeholder="Payment Status: All" data={['All', 'Paid', 'Partially Paid', 'Unpaid', 'Overdue']} />
        <Select placeholder="Invoice Status: All" data={['All', 'Paid', 'Partially Paid', 'Converted', 'Closed', 'Pending']} />
        <CustomDateInput placeholder="Date Range" name="date_range" />
        <Button variant="outline" color="gray">Clear Filters</Button>
      </div>

      {/* Invoices Table */}
      <div className="p-4 mb-6 bg-white border border-gray-200 shadow-sm rounded-xl">
        <CustomTable
          data={invoicesData}
          setData={() => {}}
          isSearchingRequired={false}
          isSortingRequired={true}
          isPaginationRequired={true}
          tableHeadData={tableColumns}
          tableBody={() =>
            invoicesData?.data?.map((obj: any, index: number) => (
              <tr key={obj.id} className="transition border-b hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-medium text-gray-600">{index + 1}</td>
                <td className="px-3 py-2 text-sm font-medium text-blue-600">{obj.invoice_no}</td>
                <td className="px-3 py-2 text-sm font-medium">{obj.customer_name}</td>
                <td className="px-3 py-2 text-sm">{obj.invoice_date}</td>
                <td className="px-3 py-2 text-sm">{obj.due_date}</td>
                <td className="px-3 py-2 font-mono text-sm">{obj.po_number}</td>
                <td className="px-3 py-2 text-sm font-semibold">{formatCurrency(obj.invoice_amount)}</td>
                <td className="px-3 py-2 text-sm">{formatCurrency(obj.balance_amount)}</td>
                <td className="px-3 py-2">
                  <Badge color={STATUS_COLORS[obj.status]} variant="light">{obj.status}</Badge>
                </td>
                <td className="px-3 py-2">
                  <Badge color={STATUS_COLORS[obj.payment_status]} variant="light">{obj.payment_status}</Badge>
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
                    <Tooltip label="Download">
                      <ActionIcon variant="subtle" color="green">
                        <FontAwesomeIcon icon={faDownload} />
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
          url="invoices?demo=true"
          notFoundMessage="No Invoice Data Found."
          notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
        />
      </div>

      {/* Invoice Summary Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-3 text-gray-700">Payment Status Summary</Title>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 border-b">
              <span className="text-sm">Total Invoices</span>
              <span className="font-bold">156</span>
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <span className="text-sm">Paid Amount</span>
              <span className="font-bold text-green-600">{formatCurrency(32764540)}</span>
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <span className="text-sm">Outstanding Amount</span>
              <span className="font-bold text-orange-600">{formatCurrency(25689210)}</span>
            </div>
            <div className="flex items-center justify-between p-2">
              <span className="text-sm">Overdue Amount</span>
              <span className="font-bold text-red-600">{formatCurrency(8453300)}</span>
            </div>
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-3 text-gray-700">Invoices by Business Project</Title>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 border-b">
              <span className="text-sm">Total Projects</span>
              <span className="font-bold">24</span>
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <span className="text-sm">Active Projects</span>
              <span className="font-bold text-blue-600">18</span>
            </div>
            <div className="flex items-center justify-between p-2 border-b">
              <span className="text-sm">Completed Projects</span>
              <span className="font-bold text-green-600">42</span>
            </div>
            <div className="flex items-center justify-between p-2">
              <span className="text-sm">Total Revenue</span>
              <span className="font-bold text-purple-600">{formatCurrency(58457750)}</span>
            </div>
          </div>
        </Paper>
      </div>

      {/* View Invoice Modal */}
      <Modal
        opened={viewOpened}
        onClose={() => setViewOpened(false)}
        title={`${selectedInvoice?.invoice_no || ''} | ${selectedInvoice?.customer_name || ''}`}
        size="xl"
        centered
      >
        {selectedInvoice && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b">
              <div>
                <Badge color="blue" size="lg">Invoice No.: {selectedInvoice.invoice_no}</Badge>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Invoice Date: {selectedInvoice.invoice_date} | Due Date: {selectedInvoice.due_date} | PO Number: {selectedInvoice.po_number}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" leftSection={<FontAwesomeIcon icon={faDownload} />} size="sm">Download</Button>
                <Button variant="outline" leftSection={<FontAwesomeIcon icon={faPrint} />} size="sm">Print</Button>
                <Button variant="outline" leftSection={<FontAwesomeIcon icon={faShare} />} size="sm">Share</Button>
              </div>
            </div>

            <Divider label="Customer Details" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faUser} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Customer Name</p>
                    <p className="font-medium">{selectedInvoice.customer_details.name}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCreditCard} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Customer ID</p>
                    <p className="font-medium">{selectedInvoice.customer_id}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faPhone} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedInvoice.customer_details.phone}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedInvoice.customer_details.email}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faPercent} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">GSTIN</p>
                    <p className="font-medium">{selectedInvoice.customer_details.gstin}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={12}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Billing Address</p>
                    <p className="text-sm">{selectedInvoice.customer_details.billing_address}</p>
                    <Button variant="light" size="xs" mt={5}>View Customer Details →</Button>
                  </div>
                </div>
              </Grid.Col>
            </Grid>

            <Divider label="Invoice Information" labelPosition="left" />
            <Grid>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Invoice No.</p>
                <p className="font-medium">{selectedInvoice.invoice_no}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Invoice Date</p>
                <p className="font-medium">{selectedInvoice.invoice_date}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="font-medium">{selectedInvoice.due_date}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">PO No.</p>
                <p className="font-medium">{selectedInvoice.po_number}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Sales Executive</p>
                <p className="font-medium">{selectedInvoice.invoice_info.sales_executive}</p>
              </Grid.Col>
            </Grid>

            <Divider label="Payment Information" labelPosition="left" />
            <Grid>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Invoice Amount</p>
                <p className="font-bold">{formatCurrency(selectedInvoice.invoice_amount)}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Discount</p>
                <p className="font-medium">{formatCurrency(selectedInvoice.invoice_info.discount)}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Trade Invoice Amount</p>
                <p className="font-medium">{formatCurrency(selectedInvoice.invoice_info.trade_invoice_amount)}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">COSTING</p>
                <p className="font-medium">{formatCurrency(selectedInvoice.invoice_info.costing)}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">POSTPONED</p>
                <p className="font-medium">{formatCurrency(selectedInvoice.invoice_info.postponed)}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">TDS</p>
                <p className="font-medium">{formatCurrency(selectedInvoice.invoice_info.tds)}</p>
              </Grid.Col>
              <Grid.Col span={12}>
                <Alert color="blue" className="mt-2">
                  <p className="text-lg font-bold">Net Payable Amount: {formatCurrency(selectedInvoice.invoice_info.net_payable)}</p>
                </Alert>
              </Grid.Col>
            </Grid>

            <Divider label="Payment Status" labelPosition="left" />
            <Grid>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Status</p>
                <Badge color={STATUS_COLORS[selectedInvoice.status]} size="lg">{selectedInvoice.status}</Badge>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Payment Mode</p>
                <p className="font-medium">{selectedInvoice.payment_info.payment_mode}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Payment Received</p>
                <p className="font-medium text-green-600">{formatCurrency(selectedInvoice.payment_info.payment_received)}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Balance Amount</p>
                <p className="font-medium text-red-600">{formatCurrency(selectedInvoice.payment_info.balance_amount)}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Reference No.</p>
                <p className="font-mono font-medium">{selectedInvoice.payment_info.reference_no || 'N/A'}</p>
              </Grid.Col>
            </Grid>

            <Divider label="Invoice Items" labelPosition="left" />
            <div className="overflow-x-auto">
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Item Code</Table.Th>
                    <Table.Th>Item Name</Table.Th>
                    <Table.Th>Qty</Table.Th>
                    <Table.Th>Rate</Table.Th>
                    <Table.Th>Discount</Table.Th>
                    <Table.Th>Taxable Amount</Table.Th>
                    <Table.Th>Tax</Table.Th>
                    <Table.Th>Total Amount</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {selectedInvoice.items.map((item: any, idx: number) => (
                    <Table.Tr key={idx}>
                      <Table.Td>{item.item_code}</Table.Td>
                      <Table.Td>{item.item_name}</Table.Td>
                      <Table.Td>{item.qty}</Table.Td>
                      <Table.Td>{formatCurrency(item.rate)}</Table.Td>
                      <Table.Td>{formatCurrency(item.discount)}</Table.Td>
                      <Table.Td>{formatCurrency(item.taxable_amount)}</Table.Td>
                      <Table.Td>{formatCurrency(item.tax)}</Table.Td>
                      <Table.Td className="font-semibold">{formatCurrency(item.total)}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>

            <div className="space-y-1 text-right">
              <p>Total Tendered: {formatCurrency(9333594)}</p>
              <p>Gross Total: {formatCurrency(9533594)}</p>
              <p>Sub-Total: {formatCurrency(9533594)}</p>
              <p className="text-xl font-bold">Grand Total: {formatCurrency(selectedInvoice.invoice_amount)}</p>
            </div>

            {selectedInvoice.attachments.length > 0 && (
              <>
                <Divider label="Attachments" labelPosition="left" />
                <div className="space-y-2">
                  {selectedInvoice.attachments.map((doc: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faFileAlt} className="text-blue-500" />
                        <span className="text-sm">{doc.name}</span>
                        <span className="text-xs text-gray-400">{doc.size}</span>
                      </div>
                      <div className="flex gap-2">
                        <ActionIcon variant="subtle" color="blue" size="sm"><FontAwesomeIcon icon={faEye} /></ActionIcon>
                        <ActionIcon variant="subtle" color="green" size="sm"><FontAwesomeIcon icon={faDownload} /></ActionIcon>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <Divider label="Ledger Impact" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Customer Ledger</p>
                <p className="font-medium">{selectedInvoice.ledger_impact.customer_ledger}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Debit/Invoice</p>
                <p className="font-medium text-red-600">{formatCurrency(selectedInvoice.ledger_impact.debit)}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Credit/Payment</p>
                <p className="font-medium text-green-600">{formatCurrency(selectedInvoice.ledger_impact.credit)}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Closing Balance</p>
                <p className="font-medium font-bold">{formatCurrency(selectedInvoice.ledger_impact.closing_balance)}</p>
              </Grid.Col>
            </Grid>
          </div>
        )}
      </Modal>

      {/* Create Invoice Modal */}
      <Modal
        opened={createOpened}
        onClose={() => setCreateOpened(false)}
        title="Create Invoice"
        size="xl"
        centered
      >
        <form onSubmit={handleAddSubmit} className="mt-2 space-y-6">
          <div>
            <Title order={5} className="mb-3 text-gray-700">Customer Details</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput
                label="Customer Name"
                placeholder="Customer Name"
                value={invoiceForm.customer_name}
                onChange={(e) => handleInvoiceChange('customer_name', e.currentTarget.value)}
                required
              />
              <TextInput
                label="Customer ID"
                placeholder="Customer ID"
                value={invoiceForm.customer_id}
                onChange={(e) => handleInvoiceChange('customer_id', e.currentTarget.value)}
              />
              <TextInput
                label="Email"
                placeholder="Email"
                value={invoiceForm.email}
                onChange={(e) => handleInvoiceChange('email', e.currentTarget.value)}
                type="email"
              />
              <TextInput
                label="Phone Number"
                placeholder="Phone Number"
                value={invoiceForm.phone}
                onChange={(e) => handleInvoiceChange('phone', e.currentTarget.value)}
              />
              <TextInput
                label="GSTIN"
                placeholder="GST Number"
                value={invoiceForm.gstin}
                onChange={(e) => handleInvoiceChange('gstin', e.currentTarget.value)}
              />
              <Textarea
                label="Billing Address"
                placeholder="Billing Address"
                value={invoiceForm.billing_address}
                onChange={(e) => handleInvoiceChange('billing_address', e.currentTarget.value)}
                minRows={2}
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Invoice Information</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput
                label="Invoice Number"
                placeholder="Invoice Number"
                value={invoiceForm.invoice_number}
                onChange={(e) => handleInvoiceChange('invoice_number', e.currentTarget.value)}
                required
              />
              <CustomDateInput
                label="Invoice Date"
                name="invoice_date"
                value={invoiceForm.invoice_date}
                onChange={(e) => handleInvoiceChange('invoice_date', e?.currentTarget?.value || '')}
              />
              <CustomDateInput
                label="Due Date"
                name="due_date"
                value={invoiceForm.due_date}
                onChange={(e) => handleInvoiceChange('due_date', e?.currentTarget?.value || '')}
              />
              <TextInput
                label="PO Number"
                placeholder="PO Number"
                value={invoiceForm.po_number}
                onChange={(e) => handleInvoiceChange('po_number', e.currentTarget.value)}
              />
              <Select
                label="GST Rate"
                placeholder="GST Rate"
                data={['5%', '12%', '18%', '28%']}
                value={invoiceForm.gst_rate}
                onChange={(value) => handleInvoiceChange('gst_rate', value || '')}
              />
              <Select
                label="Invoice Type"
                placeholder="Invoice Type"
                data={['Tax Invoice', 'Proforma Invoice', 'Commercial Invoice', 'Credit Note']}
                value={invoiceForm.invoice_type}
                onChange={(value) => handleInvoiceChange('invoice_type', value || '')}
              />
              <NumberInput
                label="Invoice Amount"
                placeholder="Invoice Amount"
                value={invoiceForm.invoice_amount}
                onChange={(value) => handleInvoiceChange('invoice_amount', value || 0)}
                leftSection="₹"
              />
              <NumberInput
                label="Discount"
                placeholder="Discount"
                value={invoiceForm.discount}
                onChange={(value) => handleInvoiceChange('discount', value || 0)}
                leftSection="₹"
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Payment Information</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Select
                label="Payment Status"
                placeholder="Payment Status"
                data={['Paid', 'Partially Paid', 'Unpaid', 'Overdue']}
                value={invoiceForm.payment_status}
                onChange={(value) => handleInvoiceChange('payment_status', value || '')}
              />
              <Select
                label="Payment Mode"
                placeholder="Payment Mode"
                data={['Cash', 'Bank Transfer', 'Cheque', 'NEFT', 'RTGS', 'Credit Card']}
                value={invoiceForm.payment_mode}
                onChange={(value) => handleInvoiceChange('payment_mode', value || '')}
              />
              <CustomDateInput
                label="Payment Period"
                name="payment_period"
                value={invoiceForm.payment_period}
                onChange={(e) => handleInvoiceChange('payment_period', e?.currentTarget?.value || '')}
              />
              <TextInput
                label="Cheque Number"
                placeholder="Cheque Number"
                value={invoiceForm.cheque_number}
                onChange={(e) => handleInvoiceChange('cheque_number', e.currentTarget.value)}
              />
              <TextInput
                label="Reference No."
                placeholder="Reference Number"
                value={invoiceForm.reference_no}
                onChange={(e) => handleInvoiceChange('reference_no', e.currentTarget.value)}
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Ledger Impact</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput
                label="Transaction Ledger"
                placeholder="Transaction Ledger"
                value={invoiceForm.transaction_ledger}
                onChange={(e) => handleInvoiceChange('transaction_ledger', e.currentTarget.value)}
              />
              <TextInput
                label="CHKP"
                placeholder="CHKP"
                value={invoiceForm.chkp}
                onChange={(e) => handleInvoiceChange('chkp', e.currentTarget.value)}
              />
              <TextInput
                label="REF. DOCUMENT REFERENCE"
                placeholder="Reference Document"
                value={invoiceForm.ref_document}
                onChange={(e) => handleInvoiceChange('ref_document', e.currentTarget.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
            <Button variant="outline" onClick={() => setCreateOpened(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Create Invoice
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Invoice Modal */}
      <Modal opened={editOpened} onClose={() => setEditOpened(false)} title="Edit Invoice" size="lg" centered>
        <form onSubmit={handleEditSubmit} className="mt-2 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextInput
              label="Invoice No."
              value={editField.invoice_no}
              disabled
            />
            <TextInput
              label="Customer Name"
              value={editField.customer_name}
              onChange={(e) => handleEditChange('customer_name', e.currentTarget.value)}
              required
            />
            <CustomDateInput
              label="Invoice Date"
              name="invoice_date"
              value={editField.invoice_date}
              onChange={(e) => handleEditChange('invoice_date', e?.currentTarget?.value || '')}
            />
            <CustomDateInput
              label="Due Date"
              name="due_date"
              value={editField.due_date}
              onChange={(e) => handleEditChange('due_date', e?.currentTarget?.value || '')}
            />
            <NumberInput
              label="Invoice Amount"
              value={editField.invoice_amount}
              onChange={(value) => handleEditChange('invoice_amount', value || 0)}
              leftSection="₹"
            />
            <Select
              label="Status"
              data={['Paid', 'Partially Paid', 'Converted', 'Closed', 'Pending', 'Overdue']}
              value={editField.status}
              onChange={(value) => handleEditChange('status', value || '')}
            />
            <Select
              label="Payment Status"
              data={['Paid', 'Partially Paid', 'Unpaid', 'Overdue']}
              value={editField.payment_status}
              onChange={(value) => handleEditChange('payment_status', value || '')}
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setEditOpened(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Update Invoice
            </Button>
          </div>
        </form>
      </Modal>

      {/* Create Invoice Button */}
      <Button
        onClick={() => setCreateOpened(true)}
        color="blue"
        size="lg"
        radius="xl"
        className="fixed shadow-lg bottom-8 right-8"
        leftSection={<FontAwesomeIcon icon={faPlus} />}
      >
        Create Invoice
      </Button>
    </div>
  );
};