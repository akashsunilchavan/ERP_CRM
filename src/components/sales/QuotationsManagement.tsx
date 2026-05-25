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
  NumberInput,
  rem,
  ThemeIcon,
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
  faClock,
  faPrint,
  faExchangeAlt,
  faPlusCircle,
  faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';

const DUMMY_QUOTATIONS_DATA = {
  data: [
    {
      id: 'QTN001',
      quotation_id: 'QTN-2025-0014',
      date: '24 Apr 2026',
      customer_name: 'ABC Elevators Pvt Ltd',
      project_name: 'ABC Elevators',
      quantity: 1,
      total_amount: 690000,
      status: 'Approved',
      code: 'QTN001',
      valid_upto: '25 June 2026',
      terms: '20% Advance, 70% Balance Delivery',
      sales_person: 'John Doe',
      site_location: 'Noida, Uttar Pradesh',
      created_on: '24 Apr 2026',
      price_list: 'Default Plan/Lot1',
      company: 'ABC Pvt. Ltd.',
      attached_payment: 25000,
      payment_terms: '20% Advance, 70% Balance Delivery',
      customer_details: {
        name: 'Mr Rajesh',
        phone: '98176461476',
        email: 'acg@abc.com',
        company: 'ABC Pvt. Ltd.',
        address: '123, residential area, Phase 2, Noida, Uttar Pradesh 201301',
      },
      products: [
        { id: 1, name: 'Gantry Crane', quantity: 1, unit_rate: 150000, discount: 5, tax: 10, total: 155000 },
        { id: 2, name: 'EOT Crane', quantity: 2, unit_rate: 165000, discount: 8, tax: 10, total: 385000 },
        { id: 3, name: 'JIB Crane', quantity: 1, unit_rate: 136000, discount: 6, tax: 10, total: 150000 },
      ],
      commercial_terms: {
        delivery_days: '30-90 Days',
        payment_tenure: '36 Months, 70% Before Delivery',
        yearly_buy: '30 Days',
      },
      attachments: [
        { name: 'Project_Assessment.pdf', size: '1.2 MB' },
        { name: 'Student_Application.pdf', size: '0.8 MB' },
      ],
    },
    {
      id: 'QTN002',
      quotation_id: 'QTN-2025-0025',
      date: '21 Apr 2026',
      customer_name: 'XYZ Infra Solution',
      project_name: 'XYZ Infra',
      quantity: 1,
      total_amount: 176200,
      status: 'Approved',
      code: 'QTN002',
      valid_upto: '21 June 2026',
      terms: '30% Advance, 70% Delivery',
      sales_person: 'John Doe',
      site_location: 'Greater Noida, Uttar Pradesh',
      created_on: '21 Apr 2026',
      price_list: 'Standard Plan',
      company: 'XYZ Infra Pvt Ltd',
      attached_payment: 15000,
      payment_terms: '30% Advance, 70% Balance Delivery',
      customer_details: {
        name: 'Mr Amit',
        phone: '9988776655',
        email: 'amit@xyz.com',
        company: 'XYZ Infra Pvt Ltd',
        address: '45, Sector 4, Greater Noida, Uttar Pradesh 201310',
      },
      products: [
        { id: 1, name: 'EOT Crane', quantity: 1, unit_rate: 176200, discount: 5, tax: 10, total: 176200 },
      ],
      commercial_terms: {
        delivery_days: '45 Days',
        payment_tenure: '30% Advance, 70% Before Delivery',
        yearly_buy: '45 Days',
      },
      attachments: [
        { name: 'Technical_Specs.pdf', size: '2.1 MB' },
      ],
    },
    {
      id: 'QTN003',
      quotation_id: 'QTN-2025-0034',
      date: '18 Jan 2026',
      customer_name: 'POR Engineering',
      project_name: 'POR Engine',
      quantity: 1,
      total_amount: 106800,
      status: 'Approved',
      code: 'QTN003',
      valid_upto: '18 Jan 2026',
      terms: '50% Advance',
      sales_person: 'Mike Smith',
      site_location: 'Ghaziabad, Uttar Pradesh',
      created_on: '18 Jan 2026',
      price_list: 'Budget Plan',
      company: 'POR Engineering Works',
      attached_payment: 10000,
      payment_terms: '50% Advance, 50% Delivery',
      customer_details: {
        name: 'Mr Sandeep',
        phone: '9876543210',
        email: 'sandeep@por.com',
        company: 'POR Engineering Works',
        address: '78, Site 4, Sahibabad, Ghaziabad, Uttar Pradesh 201005',
      },
      products: [
        { id: 1, name: 'JIB Crane', quantity: 1, unit_rate: 106800, discount: 0, tax: 10, total: 106800 },
      ],
      commercial_terms: {
        delivery_days: '30 Days',
        payment_tenure: '50% Advance, 50% Before Delivery',
        yearly_buy: '30 Days',
      },
      attachments: [],
    },
    {
      id: 'QTN004',
      quotation_id: 'QTN-2025-0041',
      date: '19 Apr 2026',
      customer_name: 'LMN Industries',
      project_name: 'LMN Industry',
      quantity: 1,
      total_amount: 108000,
      status: 'Approved',
      code: 'QTN004',
      valid_upto: '19 Apr 2026',
      terms: '25% Advance',
      sales_person: 'John Doe',
      site_location: 'Faridabad, Haryana',
      created_on: '19 Apr 2026',
      price_list: 'Premium Plan',
      company: 'LMN Industries Ltd',
      attached_payment: 20000,
      payment_terms: '25% Advance, 75% Delivery',
      customer_details: {
        name: 'Mr Vijay',
        phone: '9988001122',
        email: 'vijay@lmn.com',
        company: 'LMN Industries Ltd',
        address: '12, Sector 5, Faridabad, Haryana 121006',
      },
      products: [
        { id: 1, name: 'Gantry Crane', quantity: 1, unit_rate: 108000, discount: 10, tax: 10, total: 108000 },
      ],
      commercial_terms: {
        delivery_days: '60 Days',
        payment_tenure: '25% Advance, 75% Before Delivery',
        yearly_buy: '60 Days',
      },
      attachments: [],
    },
    {
      id: 'QTN005',
      quotation_id: 'QTN-2025-0049',
      date: '05 May 2026',
      customer_name: 'DPS Steel',
      project_name: 'DPS Steels',
      quantity: 3,
      total_amount: 950000,
      status: 'Approved',
      code: 'QTN005',
      valid_upto: '05 May 2026',
      terms: '40% Advance',
      sales_person: 'Tim Doe',
      site_location: 'Delhi NCR',
      created_on: '05 May 2026',
      price_list: 'Corporate Plan',
      company: 'DPS Steels Pvt Ltd',
      attached_payment: 50000,
      payment_terms: '40% Advance, 60% Delivery',
      customer_details: {
        name: 'Mr Deepak',
        phone: '8899776655',
        email: 'deepak@dps.com',
        company: 'DPS Steels Pvt Ltd',
        address: '34, Okhla Phase 2, New Delhi, Delhi 110020',
      },
      products: [
        { id: 1, name: 'EOT Crane', quantity: 3, unit_rate: 316667, discount: 5, tax: 10, total: 950000 },
      ],
      commercial_terms: {
        delivery_days: '90 Days',
        payment_tenure: '40% Advance, 60% Before Delivery',
        yearly_buy: '90 Days',
      },
      attachments: [],
    },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  Approved: 'green',
  Pending: 'yellow',
  Rejected: 'red',
  Draft: 'gray',
  'Sent for Approval': 'cyan',
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
};

export const QuotationsManagement = () => {
  const [createOpened, setCreateOpened] = useState(false);
  const [viewOpened, setViewOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [convertOpened, setConvertOpened] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState<any>(null);

  const [products, setProducts] = useState([
    { id: 1, name: '', quantity: 1, unit_rate: 0, discount: 0, tax: 10, total: 0 },
  ]);

  const [quotationForm, setQuotationForm] = useState({
    customer_name: '',
    phone: '',
    email: '',
    company: '',
    address: '',
    sales_person: '',
    created_on: '',
    price_list: '',
    attached_payment: 0,
    payment_terms: '',
    delivery_days: '',
    payment_tenure: '',
    yearly_buy: '',
    remarks: '',
  });

  const [convertForm, setConvertForm] = useState({
    order_date: '',
    quotation_date: '',
    quotation_status: '',
    delivery_timeframe: '',
    payment_method: '',
  });

  const [quotationsData] = useState<any>(DUMMY_QUOTATIONS_DATA);

  const handleQuotationChange = (key: string, value: any) => {
    setQuotationForm({ ...quotationForm, [key]: value });
  };

  const handleConvertChange = (key: string, value: string) => {
    setConvertForm({ ...convertForm, [key]: value });
  };

  const handleProductChange = (id: number, key: string, value: any) => {
    const updatedProducts = products.map(product => {
      if (product.id === id) {
        const updated = { ...product, [key]: value };
        if (key === 'quantity' || key === 'unit_rate' || key === 'discount' || key === 'tax') {
          const subtotal = updated.quantity * updated.unit_rate;
          const discountAmount = subtotal * (updated.discount / 100);
          const taxAmount = (subtotal - discountAmount) * (updated.tax / 100);
          updated.total = subtotal - discountAmount + taxAmount;
        }
        return updated;
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    setProducts([...products, { id: newId, name: '', quantity: 1, unit_rate: 0, discount: 0, tax: 10, total: 0 }]);
  };

  const removeProduct = (id: number) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const calculateGrandTotal = () => {
    return products.reduce((sum, product) => sum + product.total, 0);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quotation created:', { quotationForm, products });
    setCreateOpened(false);
    setProducts([{ id: 1, name: '', quantity: 1, unit_rate: 0, discount: 0, tax: 10, total: 0 }]);
    setQuotationForm({
      customer_name: '',
      phone: '',
      email: '',
      company: '',
      address: '',
      sales_person: '',
      created_on: '',
      price_list: '',
      attached_payment: 0,
      payment_terms: '',
      delivery_days: '',
      payment_tenure: '',
      yearly_buy: '',
      remarks: '',
    });
    alert('Quotation created successfully (Demo)');
  };

  const handleConvertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order created from quotation:', { quotation: selectedQuotation, convertForm });
    setConvertOpened(false);
    setConvertForm({
      order_date: '',
      quotation_date: '',
      quotation_status: '',
      delivery_timeframe: '',
      payment_method: '',
    });
    alert('Order created successfully from quotation (Demo)');
  };

  const handleView = (obj: any) => {
    setSelectedQuotation(obj);
    setViewOpened(true);
  };

  const handleConvertToOrder = (obj: any) => {
    setSelectedQuotation(obj);
    setConvertOpened(true);
  };

  const handleDelete = (id: string) => {
    alert(`Delete record ${id} (Demo)`);
  };

  const tableColumns = [
    { th: { id: 'srNo', style: { minWidth: '70px', width: '70px' } }, text: 'SR NO.' },
    { text: 'Date', th: { id: 'date', style: { minWidth: '100px' } } },
    { text: 'Customer Name', th: { id: 'customer_name', style: { minWidth: '200px' } } },
    { text: 'Project Name', th: { id: 'project_name', style: { minWidth: '180px' } } },
    { text: 'Quantity', th: { id: 'quantity', style: { minWidth: '80px' } } },
    { text: 'Total Amount', th: { id: 'total_amount', style: { minWidth: '120px' } } },
    { text: 'Status', th: { id: 'status', style: { minWidth: '100px' } } },
    { text: 'Code', th: { id: 'code', style: { minWidth: '100px' } } },
    { text: 'Valid Upto', th: { id: 'valid_upto', style: { minWidth: '110px' } } },
    { text: 'Terms', th: { id: 'terms', style: { minWidth: '150px' } } },
    { text: 'Actions', th: { id: 'action', style: { minWidth: '120px' } }, justifyContent: 'center' },
  ];

  const statsCards = [
    { title: 'Total Quotation', value: '156', change: '+12%', trend: 'up' },
    { title: 'Approve Quotations', value: '89', change: '+8%', trend: 'up' },
    { title: 'Pending Quotations', value: '45', change: '-5%', trend: 'down' },
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Title order={2} className="text-gray-800">Quotations</Title>
          <p className="mt-1 text-gray-500">Manage and track all quotations</p>
        </div>
        <Button
          onClick={() => setCreateOpened(true)}
          color="blue"
          leftSection={<FontAwesomeIcon icon={faPlus} />}
          size="md"
        >
          Create Quotation
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Quotation Value</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(24000000)}</p>
              <p className="mt-1 text-sm text-gray-500">Total Quotation Value</p>
            </div>
            <ThemeIcon color="blue" size="lg" radius="xl" variant="light">
              <FontAwesomeIcon icon={faRupeeSign} />
            </ThemeIcon>
          </div>
        </Paper>
        {statsCards.map((stat, index) => (
          <Paper key={index} withBorder p="md" radius="md" className="bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} vs last month
                </p>
              </div>
              <ThemeIcon color="gray" size="lg" radius="xl" variant="light">
                <FontAwesomeIcon icon={faFileAlt} />
              </ThemeIcon>
            </div>
          </Paper>
        ))}
      </div>

      {/* Search Filters */}
      <div className="flex gap-3 mb-4">
        <Select
          placeholder="Search All"
          data={['All', 'Customer', 'Project', 'Code']}
          className="w-48"
        />
        <Select
          placeholder="Assigned To All"
          data={['John Doe', 'Mike Smith', 'Tim Doe', 'All']}
          className="w-48"
        />
        <Button variant="outline" color="gray">
          Clear Filters
        </Button>
      </div>

      {/* Quotations Table */}
      <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
        <CustomTable
          data={quotationsData}
          setData={() => {}}
          isSearchingRequired={true}
          isSortingRequired={true}
          isPaginationRequired={true}
          tableHeadData={tableColumns}
          tableBody={() =>
            quotationsData?.data?.map((obj: any, index: number) => (
              <tr key={obj.id} className="transition border-b hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-medium text-gray-600">{index + 1}</td>
                <td className="px-3 py-2 text-sm">{obj.date}</td>
                <td className="px-3 py-2 text-sm font-medium">{obj.customer_name}</td>
                <td className="px-3 py-2 text-sm">{obj.project_name}</td>
                <td className="px-3 py-2 text-sm">{obj.quantity}</td>
                <td className="px-3 py-2 text-sm font-semibold">{formatCurrency(obj.total_amount)}</td>
                <td className="px-3 py-2">
                  <Badge color={STATUS_COLORS[obj.status]} variant="light">{obj.status}</Badge>
                </td>
                <td className="px-3 py-2 font-mono text-sm">{obj.code}</td>
                <td className="px-3 py-2 text-sm">{obj.valid_upto}</td>
                <td className="max-w-xs px-3 py-2 text-sm truncate">{obj.terms}</td>
                <td className="px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Tooltip label="View Details">
                      <ActionIcon variant="subtle" color="blue" onClick={() => handleView(obj)}>
                        <FontAwesomeIcon icon={faEye} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Convert to Order">
                      <ActionIcon variant="subtle" color="green" onClick={() => handleConvertToOrder(obj)}>
                        <FontAwesomeIcon icon={faExchangeAlt} />
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
          url="quotations?demo=true"
          notFoundMessage="No Quotation Data Found."
          notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
        />
      </div>

      {/* View Quotation Modal */}
      <Modal
        opened={viewOpened}
        onClose={() => setViewOpened(false)}
        title={`${selectedQuotation?.quotation_id || ''} | ${selectedQuotation?.customer_name || ''}`}
        size="xl"
        centered
      >
        {selectedQuotation && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b">
              <div>
                <Badge color="blue" size="lg">Updated Quotation</Badge>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{selectedQuotation.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Valid Upto</p>
                    <p className="font-medium">{selectedQuotation.valid_upto}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-bold text-blue-600">{formatCurrency(selectedQuotation.total_amount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge color={STATUS_COLORS[selectedQuotation.status]}>{selectedQuotation.status}</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" leftSection={<FontAwesomeIcon icon={faPrint} />} size="sm">
                Print
              </Button>
            </div>

            <Divider label="Customer Details" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faUser} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Customer Name</p>
                    <p className="font-medium">{selectedQuotation.customer_details.name}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faPhone} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedQuotation.customer_details.phone}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedQuotation.customer_details.email}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faBuilding} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="font-medium">{selectedQuotation.customer_details.company}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={12}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-sm">{selectedQuotation.customer_details.address}</p>
                  </div>
                </div>
              </Grid.Col>
            </Grid>

            <Divider label="Quotation Details" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Sales Person</p>
                <p className="font-medium">{selectedQuotation.sales_person}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Site Location</p>
                <p className="font-medium">{selectedQuotation.site_location}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Created On</p>
                <p className="font-medium">{selectedQuotation.created_on}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Price List</p>
                <p className="font-medium">{selectedQuotation.price_list}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Attached Payment</p>
                <p className="font-medium">{formatCurrency(selectedQuotation.attached_payment)}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Payment Terms (Customer)</p>
                <p className="font-medium">{selectedQuotation.payment_terms}</p>
              </Grid.Col>
            </Grid>

            <Divider label="Product Details" labelPosition="left" />
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>#</Table.Th>
                  <Table.Th>Product Name</Table.Th>
                  <Table.Th>Quantity</Table.Th>
                  <Table.Th>Unit Rate</Table.Th>
                  <Table.Th>Discount</Table.Th>
                  <Table.Th>Tax</Table.Th>
                  <Table.Th>Total Amount</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {selectedQuotation.products.map((product: any, idx: number) => (
                  <Table.Tr key={product.id}>
                    <Table.Td>{idx + 1}</Table.Td>
                    <Table.Td>{product.name}</Table.Td>
                    <Table.Td>{product.quantity}</Table.Td>
                    <Table.Td>{formatCurrency(product.unit_rate)}</Table.Td>
                    <Table.Td>{product.discount}%</Table.Td>
                    <Table.Td>{product.tax}%</Table.Td>
                    <Table.Td className="font-semibold">{formatCurrency(product.total)}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>

            <Divider label="Commercial Terms" labelPosition="left" />
            <Grid>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Delivery Days</p>
                <p className="font-medium">{selectedQuotation.commercial_terms.delivery_days}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Payment Tenure</p>
                <p className="font-medium">{selectedQuotation.commercial_terms.payment_tenure}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Yearly Buy</p>
                <p className="font-medium">{selectedQuotation.commercial_terms.yearly_buy}</p>
              </Grid.Col>
            </Grid>

            {selectedQuotation.attachments.length > 0 && (
              <>
                <Divider label="Attachments" labelPosition="left" />
                <div className="space-y-2">
                  {selectedQuotation.attachments.map((doc: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faFileAlt} className="text-blue-500" />
                        <span className="text-sm">{doc.name}</span>
                        <span className="text-xs text-gray-400">{doc.size}</span>
                      </div>
                      <Tooltip label="Download">
                        <ActionIcon variant="subtle" color="blue" size="sm">
                          <FontAwesomeIcon icon={faDownload} />
                        </ActionIcon>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* Convert to Order Modal */}
      <Modal
        opened={convertOpened}
        onClose={() => setConvertOpened(false)}
        title="Convert Quotation to Order"
        size="lg"
        centered
      >
        <form onSubmit={handleConvertSubmit} className="space-y-6">
          <Card withBorder p="md" radius="md" className="border-blue-200 bg-blue-50">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-500">Quotation Name</p>
                <p className="font-medium">{selectedQuotation?.quotation_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-bold text-blue-600">{formatCurrency(selectedQuotation?.total_amount || 0)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Quotation Date</p>
                <p className="font-medium">{selectedQuotation?.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Vendor Type</p>
                <p className="font-medium">Vendor</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer Name</p>
                <p className="font-medium">{selectedQuotation?.customer_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sales Person</p>
                <p className="font-medium">{selectedQuotation?.sales_person}</p>
              </div>
            </div>
          </Card>

          <Divider label="Order Information" labelPosition="left" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <CustomDateInput
              label="Order Date"
              name="order_date"
              value={convertForm.order_date}
              onChange={(e) => handleConvertChange('order_date', e?.currentTarget?.value || '')}
              required
            />
            <CustomDateInput
              label="Quotation Date"
              name="quotation_date"
              value={convertForm.quotation_date}
              onChange={(e) => handleConvertChange('quotation_date', e?.currentTarget?.value || '')}
              required
            />
            <Select
              label="Quotation Status"
              placeholder="Select status"
              data={['Approved', 'Pending', 'Draft', 'Sent for Approval']}
              value={convertForm.quotation_status}
              onChange={(value) => handleConvertChange('quotation_status', value || '')}
              required
            />
            <Select
              label="Delivery Timeframe"
              placeholder="Select timeframe"
              data={['30 Days', '45 Days', '60 Days', '90 Days']}
              value={convertForm.delivery_timeframe}
              onChange={(value) => handleConvertChange('delivery_timeframe', value || '')}
              required
            />
            <Select
              label="Payment Method"
              placeholder="Select payment method"
              data={['Cash on Delivery', 'Bank Transfer', 'Cheque', 'Credit Card']}
              value={convertForm.payment_method}
              onChange={(value) => handleConvertChange('payment_method', value || '')}
              required
            />
            <div className="flex items-center justify-center">
              <Button variant="light" color="blue" fullWidth>
                Print & Sign Invoice
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
            <Button variant="outline" onClick={() => setConvertOpened(false)}>
              Cancel
            </Button>
            <Button type="submit" color="green">
              Create Order
            </Button>
          </div>
        </form>
      </Modal>

      {/* Create Quotation Modal */}
      <Modal
        opened={createOpened}
        onClose={() => setCreateOpened(false)}
        title="Create Quotation"
        size="xl"
        centered
      >
        <form onSubmit={handleCreateSubmit} className="mt-2 space-y-6">
          <div>
            <Title order={5} className="mb-3 text-gray-700">Customer Details</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput
                label="Customer Name"
                placeholder="Enter Customer Name"
                value={quotationForm.customer_name}
                onChange={(e) => handleQuotationChange('customer_name', e.currentTarget.value)}
                required
              />
              <TextInput
                label="Phone"
                placeholder="Enter Phone Number"
                value={quotationForm.phone}
                onChange={(e) => handleQuotationChange('phone', e.currentTarget.value)}
                required
              />
              <TextInput
                label="Email"
                placeholder="Enter Email"
                value={quotationForm.email}
                onChange={(e) => handleQuotationChange('email', e.currentTarget.value)}
                type="email"
              />
              <TextInput
                label="Company"
                placeholder="Enter Company Name"
                value={quotationForm.company}
                onChange={(e) => handleQuotationChange('company', e.currentTarget.value)}
              />
              <Textarea
                label="Address"
                placeholder="Enter Address"
                value={quotationForm.address}
                onChange={(e) => handleQuotationChange('address', e.currentTarget.value)}
                
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Quotation Details</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Select
                label="Sales Person"
                placeholder="Select Sales Person"
                data={['John Doe', 'Mike Smith', 'Tim Doe']}
                value={quotationForm.sales_person}
                onChange={(value) => handleQuotationChange('sales_person', value || '')}
                required
              />
              <CustomDateInput
                label="Created On"
                name="created_on"
                value={quotationForm.created_on}
                onChange={(e) => handleQuotationChange('created_on', e?.currentTarget?.value || '')}
              />
              <Select
                label="Price List"
                placeholder="Select Price List"
                data={['Default Plan/Lot1', 'Standard Plan', 'Premium Plan', 'Budget Plan']}
                value={quotationForm.price_list}
                onChange={(value) => handleQuotationChange('price_list', value || '')}
              />
              <NumberInput
                label="Attached Payment"
                placeholder="Enter attached payment"
                value={quotationForm.attached_payment}
                onChange={(value) => handleQuotationChange('attached_payment', value || 0)}
                leftSection="₹"
                thousandSeparator=","
              />
              <Textarea
                label="Payment Terms"
                placeholder="Enter payment terms"
                value={quotationForm.payment_terms}
                onChange={(e) => handleQuotationChange('payment_terms', e.currentTarget.value)}
               
                minRows={2}
              />
            </div>
          </div>

          <Divider />

          <div>
            <div className="flex items-center justify-between mb-3">
              <Title order={5} className="text-gray-700">Product Details</Title>
              <Button size="xs" variant="light" leftSection={<FontAwesomeIcon icon={faPlusCircle} />} onClick={addProduct}>
                Add More Product
              </Button>
            </div>
            <div className="space-y-3">
              {products.map((product, idx) => (
                <Paper key={product.id} withBorder p="md" className="relative">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-6">
                    <TextInput
                      label="Product Name"
                      placeholder="Product Name"
                      value={product.name}
                      onChange={(e) => handleProductChange(product.id, 'name', e.currentTarget.value)}
                      className="sm:col-span-2"
                      required
                    />
                    <NumberInput
                      label="Quantity"
                      placeholder="Quantity"
                      value={product.quantity}
                      onChange={(value) => handleProductChange(product.id, 'quantity', value || 0)}
                      min={1}
                      required
                    />
                    <NumberInput
                      label="Unit Rate"
                      placeholder="Unit Rate"
                      value={product.unit_rate}
                      onChange={(value) => handleProductChange(product.id, 'unit_rate', value || 0)}
                      leftSection="₹"
                      required
                    />
                    <NumberInput
                      label="Discount %"
                      placeholder="Discount"
                      value={product.discount}
                      onChange={(value) => handleProductChange(product.id, 'discount', value || 0)}
                      min={0}
                      max={100}
                    />
                    <NumberInput
                      label="Tax %"
                      placeholder="Tax"
                      value={product.tax}
                      onChange={(value) => handleProductChange(product.id, 'tax', value || 0)}
                      min={0}
                    />
                    <div>
                      <p className="mb-1 text-sm font-medium text-gray-700">Total Amount</p>
                      <p className="text-lg font-bold text-blue-600">{formatCurrency(product.total)}</p>
                    </div>
                  </div>
                  {products.length > 1 && (
                    <ActionIcon
                      color="red"
                      variant="subtle"
                      onClick={() => removeProduct(product.id)}
                      className="absolute top-2 right-2"
                    >
                      <FontAwesomeIcon icon={faMinusCircle} />
                    </ActionIcon>
                  )}
                </Paper>
              ))}
            </div>
            <div className="mt-4 text-right">
              <p className="text-lg font-bold">Grand Total: {formatCurrency(calculateGrandTotal())}</p>
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Commercial Terms</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <TextInput
                label="Delivery Days"
                placeholder="Enter delivery days"
                value={quotationForm.delivery_days}
                onChange={(e) => handleQuotationChange('delivery_days', e.currentTarget.value)}
              />
              <TextInput
                label="Payment Tenure"
                placeholder="Enter payment tenure"
                value={quotationForm.payment_tenure}
                onChange={(e) => handleQuotationChange('payment_tenure', e.currentTarget.value)}
              />
              <TextInput
                label="Yearly Buy"
                placeholder="Enter yearly buy terms"
                value={quotationForm.yearly_buy}
                onChange={(e) => handleQuotationChange('yearly_buy', e.currentTarget.value)}
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Remarks/Special Note</Title>
            <Textarea
              placeholder="Enter remarks or special notes"
              value={quotationForm.remarks}
              onChange={(e) => handleQuotationChange('remarks', e.currentTarget.value)}
              minRows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
            <Button variant="outline" onClick={() => setCreateOpened(false)}>
              Cancel
            </Button>
            <Button variant="outline" color="blue">
              Create Quotation
            </Button>
            <Button type="submit" color="green">
              Convert into Invoice
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};