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
  faUsers,
  faCreditCard,
  faTruck,
  faGlobe,
  faUpload,
  faMapMarker,
} from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';

const DUMMY_CUSTOMERS_DATA = {
  data: [
    {
      id: 'CUST001',
      customer_id: 'CUST001',
      customer_name: 'ABC Elevators',
      company_name: 'ABC Elevators Pvt Ltd',
      location: 'Noida, Uttar Pradesh',
      contact_person: 'Mr. Rajesh',
      email: 'abc@abc.com',
      phone: '+91 9876545678',
      total_orders: 38,
      total_amount: 31090000,
      status: 'Active',
      customer_since: '15 Jan 2023',
      credit_limit: 5000000,
      current_balance: 1245000,
      gstin: '27ABDC1234D125',
      pan: 'AARGL1234D',
      company_type: 'Private Limited',
      website: 'www.abc-elevators.com',
      billing_address: '123, Industrial area, Phase 2, Noida, Uttar Pradesh 201301',
      shipping_address: '123, industrial area, Phase 2, Noida, Uttar Pradesh 201301',
      payment_terms: '30% Advance, 70% Before Delivery',
      available_credit: 3755000,
      last_payment: 157000,
      last_payment_date: '15 May 2025',
      payment_mode: 'NEFT / RTGS',
      delivery_terms: 'Ex-works',
      freight_terms: 'To Pay',
      validity: '30 Days',
      currency: 'INR',
      price_list: 'Default Price list',
      tax_preference: '18% GST',
      recent_orders: [
        { order_no: 'GRH-2025-0018', order_date: '19 Mar 2025', amount: 0, status: 'Completed' },
        { order_no: 'GRH-2025-0021', order_date: '16 Feb 2025', amount: 0, status: 'Completed' },
        { order_no: 'GRH-2035-0027', order_date: '31 Mar 2025', amount: 0, status: 'Completed' },
        { order_no: 'GRH-2055-0046', order_date: '01 Dec 2025', amount: 0, status: 'Completed' },
      ],
      attachments: [
        { name: 'GST_Certificate.pdf', type: 'PDF', size: '1.2 MB' },
        { name: 'PAN_Card.pdf', type: 'PDF', size: '0.5 MB' },
        { name: 'Address_Proof.pdf', type: 'PDF', size: '0.8 MB' },
        { name: 'Company_Profile.pdf', type: 'PDF', size: '2.1 MB' },
      ],
    },
    {
      id: 'CUST002',
      customer_id: 'CUST002',
      customer_name: 'XYZ India Tech',
      company_name: 'XYZ India Tech',
      location: 'Chandigarh, Punjab',
      contact_person: 'Mr. Amit',
      email: 'vijay@abc.com',
      phone: '+91 9988776655',
      total_orders: 19,
      total_amount: 11500000,
      status: 'Active',
      customer_since: '10 Mar 2023',
      credit_limit: 3000000,
      current_balance: 850000,
      gstin: '04ABCD1234E1F2',
      pan: 'AARGL5678E',
      company_type: 'Private Limited',
      website: 'www.xyzindia.com',
      billing_address: '45, Sector 4, Chandigarh, Punjab 160001',
      shipping_address: '45, Sector 4, Chandigarh, Punjab 160001',
      payment_terms: '50% Advance, 50% Delivery',
      available_credit: 2150000,
      last_payment: 250000,
      last_payment_date: '10 May 2025',
      payment_mode: 'Bank Transfer',
      delivery_terms: 'FOB',
      freight_terms: 'Prepaid',
      validity: '45 Days',
      currency: 'INR',
      price_list: 'Standard Price List',
      tax_preference: '18% GST',
      recent_orders: [],
      attachments: [],
    },
    {
      id: 'CUST003',
      customer_id: 'CUST003',
      customer_name: 'PQR Engineers',
      company_name: 'PQR Engineers',
      location: 'Varanasi, Uttar Pradesh',
      contact_person: 'Mr. Sandeep',
      email: 'pqr@abc.com',
      phone: '+91 9876543210',
      total_orders: 22,
      total_amount: 28100000,
      status: 'Active',
      customer_since: '22 Feb 2023',
      credit_limit: 4000000,
      current_balance: 950000,
      gstin: '09ABCD1234G3H4',
      pan: 'AARGL9012F',
      company_type: 'Partnership',
      website: 'www.pqrengineers.com',
      billing_address: '78, Site 4, Varanasi, Uttar Pradesh 221005',
      shipping_address: '78, Site 4, Varanasi, Uttar Pradesh 221005',
      payment_terms: '40% Advance, 60% Delivery',
      available_credit: 3050000,
      last_payment: 180000,
      last_payment_date: '20 Apr 2025',
      payment_mode: 'Cheque',
      delivery_terms: 'CIF',
      freight_terms: 'Collect',
      validity: '60 Days',
      currency: 'INR',
      price_list: 'Premium Price List',
      tax_preference: '18% GST',
      recent_orders: [],
      attachments: [],
    },
    {
      id: 'CUST004',
      customer_id: 'CUST004',
      customer_name: 'LMN Industries',
      company_name: 'LMN Industries Pvt Ltd',
      location: 'Mumbai, Maharashtra',
      contact_person: 'Mr. Vikram',
      email: 'mrv@abc.com',
      phone: '+91 9988001122',
      total_orders: 93,
      total_amount: 9500000,
      status: 'Active',
      customer_since: '05 Jan 2023',
      credit_limit: 6000000,
      current_balance: 2100000,
      gstin: '27ABCD1234I5J6',
      pan: 'AARGL3456G',
      company_type: 'Public Limited',
      website: 'www.lmnindustries.com',
      billing_address: '12, Sector 5, Mumbai, Maharashtra 400001',
      shipping_address: '12, Sector 5, Mumbai, Maharashtra 400001',
      payment_terms: '30% Advance, 70% Delivery',
      available_credit: 3900000,
      last_payment: 500000,
      last_payment_date: '25 May 2025',
      payment_mode: 'NEFT',
      delivery_terms: 'Ex-works',
      freight_terms: 'To Pay',
      validity: '30 Days',
      currency: 'INR',
      price_list: 'Corporate Price List',
      tax_preference: '18% GST',
      recent_orders: [],
      attachments: [],
    },
    {
      id: 'CUST005',
      customer_id: 'CUST005',
      customer_name: 'CPS Steel',
      company_name: 'CPS Steel Pvt Ltd',
      location: 'Murshidabad, West Bengal',
      contact_person: 'Mr. Deepak',
      email: 'deepak@abc.com',
      phone: '+91 8899776655',
      total_orders: 7,
      total_amount: 7000000,
      status: 'Inactive',
      customer_since: '18 Mar 2023',
      credit_limit: 2000000,
      current_balance: 450000,
      gstin: '19ABCD1234K7L8',
      pan: 'AARGL7890H',
      company_type: 'Private Limited',
      website: 'www.cpssteel.com',
      billing_address: '34, Okhla Phase 2, Murshidabad, West Bengal 742001',
      shipping_address: '34, Okhla Phase 2, Murshidabad, West Bengal 742001',
      payment_terms: '100% Advance',
      available_credit: 1550000,
      last_payment: 100000,
      last_payment_date: '05 Apr 2025',
      payment_mode: 'Cash',
      delivery_terms: 'Ex-works',
      freight_terms: 'To Pay',
      validity: '30 Days',
      currency: 'INR',
      price_list: 'Default Price List',
      tax_preference: '18% GST',
      recent_orders: [],
      attachments: [],
    },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  Active: 'green',
  Inactive: 'red',
  Pending: 'yellow',
  Suspended: 'orange',
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
};

export const CustomersManagement = () => {
  const [createOpened, setCreateOpened] = useState(false);
  const [viewOpened, setViewOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const [customerForm, setCustomerForm] = useState({
    customer_name: '',
    phone: '',
    email: '',
    customer_id: '',
    date: '',
    address: '',
    company_name: '',
    company_type: '',
    company_website: '',
    gstin: '',
    pan: '',
    billing_address: '',
    shipping_address: '',
    gst_certificate: null as File | null,
    pan_card: null as File | null,
    address_proof: null as File | null,
    company_profile: null as File | null,
    ship_act_certificate: null as File | null,
  });

  const [editField, setEditField] = useState({
    id: '',
    customer_id: '',
    customer_name: '',
    company_name: '',
    location: '',
    contact_person: '',
    email: '',
    phone: '',
    status: '',
  });

  const [customersData] = useState<any>(DUMMY_CUSTOMERS_DATA);

  const handleCustomerChange = (key: string, value: any) => {
    setCustomerForm({ ...customerForm, [key]: value });
  };

  const handleEditChange = (key: string, value: any) => {
    setEditField({ ...editField, [key]: value });
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Customer created:', customerForm);
    setCreateOpened(false);
    setCustomerForm({
      customer_name: '',
      phone: '',
      email: '',
      customer_id: '',
      date: '',
      address: '',
      company_name: '',
      company_type: '',
      company_website: '',
      gstin: '',
      pan: '',
      billing_address: '',
      shipping_address: '',
      gst_certificate: null,
      pan_card: null,
      address_proof: null,
      company_profile: null,
      ship_act_certificate: null,
    });
    alert('Customer created successfully (Demo)');
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Customer updated:', editField);
    setEditOpened(false);
    alert('Customer updated successfully (Demo)');
  };

  const handleView = (obj: any) => {
    setSelectedCustomer(obj);
    setViewOpened(true);
  };

  const handleEdit = (obj: any) => {
    setEditField({
      id: obj.id,
      customer_id: obj.customer_id,
      customer_name: obj.customer_name,
      company_name: obj.company_name,
      location: obj.location,
      contact_person: obj.contact_person,
      email: obj.email,
      phone: obj.phone,
      status: obj.status,
    });
    setEditOpened(true);
  };

  const handleDelete = (id: string) => {
    alert(`Delete record ${id} (Demo)`);
  };

  const tableColumns = [
    { th: { id: 'srNo', style: { minWidth: '70px', width: '70px' } }, text: 'SR NO.' },
    { text: 'Customer ID', th: { id: 'customer_id', style: { minWidth: '100px' } } },
    { text: 'Customer Name', th: { id: 'customer_name', style: { minWidth: '180px' } } },
    { text: 'Company Name', th: { id: 'company_name', style: { minWidth: '200px' } } },
    { text: 'Location', th: { id: 'location', style: { minWidth: '150px' } } },
    { text: 'Contact Person', th: { id: 'contact_person', style: { minWidth: '130px' } } },
    { text: 'Email/Phone', th: { id: 'contact', style: { minWidth: '180px' } } },
    { text: 'Total Orders', th: { id: 'total_orders', style: { minWidth: '100px' } } },
    { text: 'Total Amount', th: { id: 'total_amount', style: { minWidth: '130px' } } },
    { text: 'Status', th: { id: 'status', style: { minWidth: '100px' } } },
    { text: 'Actions', th: { id: 'action', style: { minWidth: '100px' } }, justifyContent: 'center' },
  ];

  const statsCards = [
    { title: 'Total Customers', value: '246', subtitle: 'All Time', icon: faUsers, color: 'blue' },
    { title: 'Active Customers', value: '198', subtitle: 'This Year', icon: faCheckCircle, color: 'green' },
    { title: 'Inactive Customers', value: '35', subtitle: 'This Month', icon: faTimesCircle, color: 'red' },
    { title: 'Total Business Value', value: '₹18.75 Cr', subtitle: 'This Month', icon: faRupeeSign, color: 'cyan' },
    { title: 'New Customers', value: '126', subtitle: 'This Month', icon: faUser, color: 'yellow' },
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Title order={2} className="text-gray-800">Customers</Title>
          <p className="mt-1 text-gray-500">Manage & view all customer and client information</p>
        </div>
        <Button
          onClick={() => setCreateOpened(true)}
          color="blue"
          leftSection={<FontAwesomeIcon icon={faPlus} />}
          size="md"
        >
          Add new Customer
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-5">
        {statsCards.map((stat, index) => (
          <Paper key={index} withBorder p="md" radius="md" className="bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-500">{stat.title}</p>
                <p className="text-xs text-gray-400">{stat.subtitle}</p>
              </div>
              <ThemeIcon color={stat.color} size="lg" radius="xl" variant="light">
                <FontAwesomeIcon icon={stat.icon} />
              </ThemeIcon>
            </div>
          </Paper>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <Select
          placeholder="Status: All"
          data={['All', 'Active', 'Inactive', 'Pending']}
          className="w-40"
        />
        <Select
          placeholder="Location: All"
          data={['All', 'Uttar Pradesh', 'Punjab', 'Maharashtra', 'West Bengal']}
          className="w-48"
        />
        <Button variant="outline" color="gray">
          Search
        </Button>
      </div>

      {/* Customers Table */}
      <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
        <CustomTable
          data={customersData}
          setData={() => {}}
          isSearchingRequired={true}
          isSortingRequired={true}
          isPaginationRequired={true}
          tableHeadData={tableColumns}
          tableBody={() =>
            customersData?.data?.map((obj: any, index: number) => (
              <tr key={obj.id} className="transition border-b hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-medium text-gray-600">{index + 1}</td>
                <td className="px-3 py-2 text-sm font-medium text-blue-600">{obj.customer_id}</td>
                <td className="px-3 py-2 text-sm font-medium">{obj.customer_name}</td>
                <td className="px-3 py-2 text-sm">{obj.company_name}</td>
                <td className="px-3 py-2 text-sm">{obj.location}</td>
                <td className="px-3 py-2 text-sm">{obj.contact_person}</td>
                <td className="px-3 py-2 text-sm">
                  <div>{obj.email}</div>
                  <div className="text-xs text-gray-400">{obj.phone}</div>
                </td>
                <td className="px-3 py-2 text-sm">{obj.total_orders}</td>
                <td className="px-3 py-2 text-sm font-semibold">{formatCurrency(obj.total_amount)}</td>
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
          url="customers?demo=true"
          notFoundMessage="No Customer Data Found."
          notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
        />
      </div>

      {/* View Customer Modal */}
      <Modal
        opened={viewOpened}
        onClose={() => setViewOpened(false)}
        title={`${selectedCustomer?.customer_name || ''}`}
        size="xl"
        centered
      >
        {selectedCustomer && (
          <div className="space-y-6">
            {/* Header Card */}
            <Card withBorder p="md" className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <div className="flex items-start justify-between">
                <div>
                  <Title order={3}>{selectedCustomer.customer_name}</Title>
                  <Group gap="xs" mt={5}>
                    <Badge size="lg" color="blue">ID: {selectedCustomer.customer_id}</Badge>
                    <Badge size="lg" color="gray">{selectedCustomer.location}</Badge>
                  </Group>
                  <Group gap="md" mt={10}>
                    <div>
                      <p className="text-sm text-gray-500">Customer Since</p>
                      <p className="font-medium">{selectedCustomer.customer_since}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Credit Limit</p>
                      <p className="font-medium">{formatCurrency(selectedCustomer.credit_limit)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Current Balance</p>
                      <p className="font-medium text-red-600">{formatCurrency(selectedCustomer.current_balance)}</p>
                    </div>
                  </Group>
                </div>
                <Button variant="outline" leftSection={<FontAwesomeIcon icon={faEdit} />} size="sm">
                  Edit
                </Button>
              </div>
            </Card>

            <Divider label="Company Information" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Company Name</p>
                <p className="font-medium">{selectedCustomer.company_name}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Customer ID</p>
                <p className="font-medium">{selectedCustomer.customer_id}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">GSTIN</p>
                <p className="font-medium">{selectedCustomer.gstin}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">PAN</p>
                <p className="font-medium">{selectedCustomer.pan}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Company Type</p>
                <p className="font-medium">{selectedCustomer.company_type}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Website</p>
                <a href={`http://${selectedCustomer.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  {selectedCustomer.website}
                </a>
              </Grid.Col>
            </Grid>

            <Divider label="Billing & Shipping Address" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Billing Address</p>
                    <p className="text-sm">{selectedCustomer.billing_address}</p>
                    <Button variant="light" size="xs" mt={5} leftSection={<FontAwesomeIcon icon={faMapMarker} />}>
                      View on Map
                    </Button>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faTruck} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Shipping Address</p>
                    <p className="text-sm">{selectedCustomer.shipping_address}</p>
                    <Button variant="light" size="xs" mt={5} leftSection={<FontAwesomeIcon icon={faMapMarker} />}>
                      View on Maps
                    </Button>
                  </div>
                </div>
              </Grid.Col>
            </Grid>

            <Divider label="Payment & Credit Information" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Payment Terms</p>
                <p className="font-medium">{selectedCustomer.payment_terms}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Credit Limit</p>
                <p className="font-medium">{formatCurrency(selectedCustomer.credit_limit)}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Available Credit</p>
                <p className="font-medium text-green-600">{formatCurrency(selectedCustomer.available_credit)}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Current Balance</p>
                <p className="font-medium text-red-600">{formatCurrency(selectedCustomer.current_balance)}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Last Payment</p>
                <p className="font-medium">{formatCurrency(selectedCustomer.last_payment)} on {selectedCustomer.last_payment_date}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Payment Mode</p>
                <p className="font-medium">{selectedCustomer.payment_mode}</p>
              </Grid.Col>
            </Grid>

            <Divider label="Commercial Terms" labelPosition="left" />
            <Grid>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Delivery Terms</p>
                <p className="font-medium">{selectedCustomer.delivery_terms}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Freight Terms</p>
                <p className="font-medium">{selectedCustomer.freight_terms}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Validity</p>
                <p className="font-medium">{selectedCustomer.validity}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Currency</p>
                <p className="font-medium">{selectedCustomer.currency}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Price List</p>
                <p className="font-medium">{selectedCustomer.price_list}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Tax Preference</p>
                <p className="font-medium">{selectedCustomer.tax_preference}</p>
              </Grid.Col>
            </Grid>

            {selectedCustomer.recent_orders.length > 0 && (
              <>
                <Divider label="Recent Orders" labelPosition="left" />
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Order No.</Table.Th>
                      <Table.Th>Order Date</Table.Th>
                      <Table.Th>Amount</Table.Th>
                      <Table.Th>Status</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {selectedCustomer.recent_orders.map((order: any, idx: number) => (
                      <Table.Tr key={idx}>
                        <Table.Td>{order.order_no}</Table.Td>
                        <Table.Td>{order.order_date}</Table.Td>
                        <Table.Td>{formatCurrency(order.amount)}</Table.Td>
                        <Table.Td>
                          <Badge color="green" variant="light">{order.status}</Badge>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </>
            )}

            {selectedCustomer.attachments.length > 0 && (
              <>
                <Divider label="Attachments" labelPosition="left" />
                <div className="space-y-2">
                  {selectedCustomer.attachments.map((doc: any, idx: number) => (
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

      {/* Create Customer Modal */}
      <Modal
        opened={createOpened}
        onClose={() => setCreateOpened(false)}
        title="Add New Customer"
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
                value={customerForm.customer_name}
                onChange={(e) => handleCustomerChange('customer_name', e.currentTarget.value)}
                required
              />
              <TextInput
                label="Phone"
                placeholder="Enter Phone Number"
                value={customerForm.phone}
                onChange={(e) => handleCustomerChange('phone', e.currentTarget.value)}
                required
              />
              <TextInput
                label="Email"
                placeholder="Enter Email"
                value={customerForm.email}
                onChange={(e) => handleCustomerChange('email', e.currentTarget.value)}
                type="email"
              />
              <TextInput
                label="Customer ID"
                placeholder="CUSTOMER_ID"
                value={customerForm.customer_id}
                onChange={(e) => handleCustomerChange('customer_id', e.currentTarget.value)}
              />
              <CustomDateInput
                label="Date"
                name="date"
                value={customerForm.date}
                onChange={(e) => handleCustomerChange('date', e?.currentTarget?.value || '')}
              />
              <Textarea
                label="Address"
                placeholder="Enter Address"
                value={customerForm.address}
                onChange={(e) => handleCustomerChange('address', e.currentTarget.value)}
                minRows={2}
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Company Information</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput
                label="Company Name"
                placeholder="Enter Company Name"
                value={customerForm.company_name}
                onChange={(e) => handleCustomerChange('company_name', e.currentTarget.value)}
              />
              <TextInput
                label="Company Type"
                placeholder="Enter Type of Company"
                value={customerForm.company_type}
                onChange={(e) => handleCustomerChange('company_type', e.currentTarget.value)}
              />
              <TextInput
                label="Company Website"
                placeholder="Enter Company Website URL"
                value={customerForm.company_website}
                onChange={(e) => handleCustomerChange('company_website', e.currentTarget.value)}
              />
              <TextInput
                label="GSTIN"
                placeholder="Enter GST Number"
                value={customerForm.gstin}
                onChange={(e) => handleCustomerChange('gstin', e.currentTarget.value)}
              />
              <TextInput
                label="PAN Card"
                placeholder="Enter PAN Card number"
                value={customerForm.pan}
                onChange={(e) => handleCustomerChange('pan', e.currentTarget.value)}
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Billing and Shipping Address</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Textarea
                label="Billing Address"
                placeholder="Enter Billing Address"
                value={customerForm.billing_address}
                onChange={(e) => handleCustomerChange('billing_address', e.currentTarget.value)}
                minRows={2}
              />
              <Textarea
                label="Shipping Address"
                placeholder="Enter Shipping Address"
                value={customerForm.shipping_address}
                onChange={(e) => handleCustomerChange('shipping_address', e.currentTarget.value)}
                minRows={2}
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Attachments</Title>
            <div className="space-y-3">
              <FileInput
                label="GST Certificate"
                placeholder="Upload GST Certificate"
                accept=".pdf,.jpg,.jpeg,.png"
                value={customerForm.gst_certificate}
                onChange={(file) => handleCustomerChange('gst_certificate', file)}
                leftSection={<FontAwesomeIcon icon={faUpload} />}
              />
              <FileInput
                label="PAN Card"
                placeholder="Upload PAN Card"
                accept=".pdf,.jpg,.jpeg,.png"
                value={customerForm.pan_card}
                onChange={(file) => handleCustomerChange('pan_card', file)}
                leftSection={<FontAwesomeIcon icon={faUpload} />}
              />
              <FileInput
                label="Address Proof"
                placeholder="Upload Address Proof/Original"
                accept=".pdf,.jpg,.jpeg,.png"
                value={customerForm.address_proof}
                onChange={(file) => handleCustomerChange('address_proof', file)}
                leftSection={<FontAwesomeIcon icon={faUpload} />}
              />
              <FileInput
                label="Company Profile"
                placeholder="Upload Company Profile Document"
                accept=".pdf,.jpg,.jpeg,.png"
                value={customerForm.company_profile}
                onChange={(file) => handleCustomerChange('company_profile', file)}
                leftSection={<FontAwesomeIcon icon={faUpload} />}
              />
              <FileInput
                label="Ship Act Certificate"
                placeholder="Upload Ship Act Certificate"
                accept=".pdf,.jpg,.jpeg,.png"
                value={customerForm.ship_act_certificate}
                onChange={(file) => handleCustomerChange('ship_act_certificate', file)}
                leftSection={<FontAwesomeIcon icon={faUpload} />}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
            <Button variant="outline" onClick={() => setCreateOpened(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Approve
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Customer Modal */}
      <Modal opened={editOpened} onClose={() => setEditOpened(false)} title="Edit Customer" size="lg" centered>
        <form onSubmit={handleEditSubmit} className="mt-2 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextInput
              label="Customer ID"
              value={editField.customer_id}
              disabled
            />
            <TextInput
              label="Customer Name"
              value={editField.customer_name}
              onChange={(e) => handleEditChange('customer_name', e.currentTarget.value)}
              required
            />
            <TextInput
              label="Company Name"
              value={editField.company_name}
              onChange={(e) => handleEditChange('company_name', e.currentTarget.value)}
              required
            />
            <TextInput
              label="Location"
              value={editField.location}
              onChange={(e) => handleEditChange('location', e.currentTarget.value)}
            />
            <TextInput
              label="Contact Person"
              value={editField.contact_person}
              onChange={(e) => handleEditChange('contact_person', e.currentTarget.value)}
            />
            <TextInput
              label="Email"
              value={editField.email}
              onChange={(e) => handleEditChange('email', e.currentTarget.value)}
              type="email"
            />
            <TextInput
              label="Phone"
              value={editField.phone}
              onChange={(e) => handleEditChange('phone', e.currentTarget.value)}
            />
            <Select
              label="Status"
              data={['Active', 'Inactive', 'Pending', 'Suspended']}
              value={editField.status}
              onChange={(value) => handleEditChange('status', value || '')}
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setEditOpened(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Update Customer
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};