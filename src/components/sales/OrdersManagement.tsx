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
  NumberInput,
  ThemeIcon,
  Group,
  Stack,
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
  faTruck,
  faMoneyBill,
  faPlusCircle,
  faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';

const DUMMY_ORDERS_DATA = {
  data: [
    {
      id: 'ORD001',
      order_number: 'ORD-2025-0016',
      customer: 'ABC Elevators Pvt Ltd',
      order_date: '21 May 2026',
      po_number: 'PO-456/ABC/26',
      po_expiration: '21 June 2026',
      address_arrival: 'FLS, JULY 25',
      delivery_time: '25 June 2026',
      status: 'Approved',
      amount: 690000,
      quotation_ref: 'QTN-2025-0014',
      total_amount: 690000,
      advance_payment: 378000,
      payment_terms: '30% Advance, 70% Balance Delivery',
      delivery_timeline: '25 June 2026',
      customer_details: {
        name: 'Mr Rajesh',
        phone: '9876545678',
        email: 'abc@domain.com',
        company: 'ABC Pvt. Ltd',
        address: '123, Industrial area, Phase 2, Noida, Uttar Pradesh- 201301',
      },
      products: [
        { id: 1, name: 'Gantry Crane', quantity: 1, unit_rate: 115000, discount: 5, tax: 15, delivery_date: '15 June 2026', total: 115000 },
        { id: 2, name: 'EOT Crane', quantity: 1, unit_rate: 115000, discount: 5, tax: 15, delivery_date: '20 June 2026', total: 115000 },
        { id: 3, name: 'JIB Crane', quantity: 1, unit_rate: 165000, discount: 0, tax: 10, delivery_date: '10 June 2026', total: 165000 },
      ],
      commercial_terms: {
        ecommerce_terms: 'E-commerce',
        payment_terms: '30% Advance, 70% Online Delivery',
        validity_date: '30 Days',
      },
    },
    {
      id: 'ORD002',
      order_number: 'GRG-3028-0045',
      customer: 'CIE VISION SRL',
      order_date: '21 May 2023',
      po_number: 'PO-0000001',
      po_expiration: '21 June 2023',
      address_arrival: 'FLS, JULY 25',
      delivery_time: '25 July 2023',
      status: 'Approved',
      amount: 40800,
      quotation_ref: 'QTN-2023-0012',
      total_amount: 40800,
      advance_payment: 20000,
      payment_terms: '50% Advance, 50% Delivery',
      delivery_timeline: '25 July 2023',
      customer_details: {
        name: 'Mr John',
        phone: '9876543210',
        email: 'john@cievision.com',
        company: 'CIE VISION SRL',
        address: '123 Business Park, Mumbai, Maharashtra 400001',
      },
      products: [
        { id: 1, name: 'Industrial Crane', quantity: 1, unit_rate: 40800, discount: 0, tax: 10, delivery_date: '25 July 2023', total: 40800 },
      ],
      commercial_terms: {
        ecommerce_terms: 'Standard',
        payment_terms: '50% Advance, 50% Delivery',
        validity_date: '45 Days',
      },
    },
    {
      id: 'ORD003',
      order_number: 'EBD-2028-0028',
      customer: 'CIE VISION SRL',
      order_date: '17 Aug 2023',
      po_number: 'PO-0000002',
      po_expiration: '17 Sep 2023',
      address_arrival: 'TTS, JULY 25',
      delivery_time: '25 Sep 2023',
      status: 'Approved',
      amount: 71000,
      quotation_ref: 'QTN-2023-0018',
      total_amount: 71000,
      advance_payment: 35000,
      payment_terms: '40% Advance, 60% Delivery',
      delivery_timeline: '25 Sep 2023',
      customer_details: {
        name: 'Mr John',
        phone: '9876543210',
        email: 'john@cievision.com',
        company: 'CIE VISION SRL',
        address: '123 Business Park, Mumbai, Maharashtra 400001',
      },
      products: [
        { id: 1, name: 'Overhead Crane', quantity: 1, unit_rate: 71000, discount: 5, tax: 10, delivery_date: '20 Sep 2023', total: 71000 },
      ],
      commercial_terms: {
        ecommerce_terms: 'Premium',
        payment_terms: '40% Advance, 60% Delivery',
        validity_date: '30 Days',
      },
    },
    {
      id: 'ORD004',
      order_number: 'GBD-2028-0034',
      customer: 'CIE VISION SRL',
      order_date: '20 May 2023',
      po_number: 'PO-0000003',
      po_expiration: '20 June 2023',
      address_arrival: 'P1,600,000',
      delivery_time: '02 July 2023',
      status: 'Approved',
      amount: 51600,
      quotation_ref: 'QTN-2023-0022',
      total_amount: 51600,
      advance_payment: 25000,
      payment_terms: '30% Advance, 70% Delivery',
      delivery_timeline: '02 July 2023',
      customer_details: {
        name: 'Mr John',
        phone: '9876543210',
        email: 'john@cievision.com',
        company: 'CIE VISION SRL',
        address: '123 Business Park, Mumbai, Maharashtra 400001',
      },
      products: [
        { id: 1, name: 'JIB Crane', quantity: 1, unit_rate: 51600, discount: 0, tax: 10, delivery_date: '02 July 2023', total: 51600 },
      ],
      commercial_terms: {
        ecommerce_terms: 'Standard',
        payment_terms: '30% Advance, 70% Delivery',
        validity_date: '30 Days',
      },
    },
    {
      id: 'ORD005',
      order_number: 'GGB-3035-0013',
      customer: 'CIE VISION SRL',
      order_date: '18 Aug 2023',
      po_number: 'PO-0000004',
      po_expiration: '18 Sep 2023',
      address_arrival: 'P1,600,000',
      delivery_time: '05 Sep 2023',
      status: 'Approved',
      amount: 12800,
      quotation_ref: 'QTN-2023-0025',
      total_amount: 12800,
      advance_payment: 6000,
      payment_terms: '50% Advance, 50% Delivery',
      delivery_timeline: '05 Sep 2023',
      customer_details: {
        name: 'Mr John',
        phone: '9876543210',
        email: 'john@cievision.com',
        company: 'CIE VISION SRL',
        address: '123 Business Park, Mumbai, Maharashtra 400001',
      },
      products: [
        { id: 1, name: 'Workshop Crane', quantity: 1, unit_rate: 12800, discount: 0, tax: 10, delivery_date: '05 Sep 2023', total: 12800 },
      ],
      commercial_terms: {
        ecommerce_terms: 'Basic',
        payment_terms: '50% Advance, 50% Delivery',
        validity_date: '30 Days',
      },
    },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  Approved: 'green',
  Pending: 'yellow',
  Completed: 'blue',
  Cancelled: 'red',
  'In Progress': 'cyan',
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
};

export const OrdersManagement = () => {
  const [createOpened, setCreateOpened] = useState(false);
  const [viewOpened, setViewOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [products, setProducts] = useState([
    { id: 1, name: '', quantity: 1, unit_rate: 0, discount: 0, tax: 10, delivery_date: '', total: 0 },
  ]);

  const [orderForm, setOrderForm] = useState({
    customer_name: '',
    company: '',
    address: '',
    order_number: '',
    delivery_payment: '',
    order_date: '',
    total_amount: 0,
    payment_terms: '',
    delivery_time: '',
    delivery_address: '',
    po_number: '',
    po_expiration: '',
    advance_payment: 0,
    delivery_terms: '',
    validity_day: '',
    minimum_rate: '',
  });

  const [editField, setEditField] = useState({
    id: '',
    order_number: '',
    customer: '',
    order_date: '',
    status: '',
    amount: 0,
    po_number: '',
    delivery_time: '',
    payment_terms: '',
  });

  const [ordersData] = useState<any>(DUMMY_ORDERS_DATA);

  const handleOrderChange = (key: string, value: any) => {
    setOrderForm({ ...orderForm, [key]: value });
  };

  const handleEditChange = (key: string, value: any) => {
    setEditField({ ...editField, [key]: value });
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
    setProducts([...products, { id: newId, name: '', quantity: 1, unit_rate: 0, discount: 0, tax: 10, delivery_date: '', total: 0 }]);
  };

  const removeProduct = (id: number) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const calculateSubTotal = () => {
    return products.reduce((sum, product) => sum + (product.quantity * product.unit_rate), 0);
  };

  const calculateTotalDiscount = () => {
    return products.reduce((sum, product) => sum + (product.quantity * product.unit_rate * product.discount / 100), 0);
  };

  const calculateTotalTax = () => {
    const subtotal = calculateSubTotal();
    const discount = calculateTotalDiscount();
    return (subtotal - discount) * 0.18;
  };

  const calculateGrandTotal = () => {
    const subtotal = calculateSubTotal();
    const discount = calculateTotalDiscount();
    const tax = calculateTotalTax();
    return subtotal - discount + tax;
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order created:', { orderForm, products });
    setCreateOpened(false);
    setProducts([{ id: 1, name: '', quantity: 1, unit_rate: 0, discount: 0, tax: 10, delivery_date: '', total: 0 }]);
    setOrderForm({
      customer_name: '',
      company: '',
      address: '',
      order_number: '',
      delivery_payment: '',
      order_date: '',
      total_amount: 0,
      payment_terms: '',
      delivery_time: '',
      delivery_address: '',
      po_number: '',
      po_expiration: '',
      advance_payment: 0,
      delivery_terms: '',
      validity_day: '',
      minimum_rate: '',
    });
    alert('Order created successfully (Demo)');
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order updated:', editField);
    setEditOpened(false);
    alert('Order updated successfully (Demo)');
  };

  const handleView = (obj: any) => {
    setSelectedOrder(obj);
    setViewOpened(true);
  };

  const handleEdit = (obj: any) => {
    setEditField({
      id: obj.id,
      order_number: obj.order_number,
      customer: obj.customer,
      order_date: obj.order_date,
      status: obj.status,
      amount: obj.amount,
      po_number: obj.po_number,
      delivery_time: obj.delivery_time,
      payment_terms: obj.payment_terms,
    });
    setEditOpened(true);
  };

  const handleDelete = (id: string) => {
    alert(`Delete record ${id} (Demo)`);
  };

  const tableColumns = [
    { th: { id: 'srNo', style: { minWidth: '70px', width: '70px' } }, text: 'SR NO.' },
    { text: 'Order Number', th: { id: 'order_number', style: { minWidth: '150px' } } },
    { text: 'Customer', th: { id: 'customer', style: { minWidth: '200px' } } },
    { text: 'Order Date', th: { id: 'order_date', style: { minWidth: '120px' } } },
    { text: 'PO Number', th: { id: 'po_number', style: { minWidth: '150px' } } },
    { text: 'PO Expiration', th: { id: 'po_expiration', style: { minWidth: '120px' } } },
    { text: 'Address Arrival', th: { id: 'address_arrival', style: { minWidth: '120px' } } },
    { text: 'Delivery Time', th: { id: 'delivery_time', style: { minWidth: '120px' } } },
    { text: 'Status', th: { id: 'status', style: { minWidth: '100px' } } },
    { text: 'Amount', th: { id: 'amount', style: { minWidth: '120px' } } },
    { text: 'Actions', th: { id: 'action', style: { minWidth: '120px' } }, justifyContent: 'center' },
  ];

  const statsCards = [
    { title: 'Total Orders', value: '156', change: '+11.1%', trend: 'up', icon: faFileAlt },
    { title: 'Continue Orders', value: '48', change: '+10.3%', trend: 'up', icon: faClock },
    { title: 'Completed Orders', value: '27', change: '+9.0%', trend: 'up', icon: faCheckCircle },
    { title: 'Canceled Orders', value: '15', change: '-5.2%', trend: 'down', icon: faTrash },
    { title: 'Total Order Value', value: '₹3.45 Cr', change: 'Total Order Value', trend: 'neutral', icon: faRupeeSign },
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Title order={2} className="text-gray-800">Orders</Title>
          <p className="mt-1 text-gray-500">Track and manage Orders</p>
        </div>
        <Button
          onClick={() => setCreateOpened(true)}
          color="blue"
          leftSection={<FontAwesomeIcon icon={faPlus} />}
          size="md"
        >
          Create Order
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-5">
        {statsCards.map((stat, index) => (
          <Paper key={index} withBorder p="md" radius="md" className="bg-white">
            <div className="flex items-center justify-between mb-2">
              <ThemeIcon color="blue" size="lg" radius="xl" variant="light">
                <FontAwesomeIcon icon={stat.icon} />
              </ThemeIcon>
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500">{stat.title}</p>
            </div>
          </Paper>
        ))}
      </div>

      {/* Orders Table */}
      <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
        <CustomTable
          data={ordersData}
          setData={() => {}}
          isSearchingRequired={true}
          isSortingRequired={true}
          isPaginationRequired={true}
          tableHeadData={tableColumns}
          tableBody={() =>
            ordersData?.data?.map((obj: any, index: number) => (
              <tr key={obj.id} className="transition border-b hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-medium text-gray-600">{index + 1}</td>
                <td className="px-3 py-2 text-sm font-medium text-blue-600">{obj.order_number}</td>
                <td className="px-3 py-2 text-sm">{obj.customer}</td>
                <td className="px-3 py-2 text-sm">{obj.order_date}</td>
                <td className="px-3 py-2 font-mono text-sm">{obj.po_number}</td>
                <td className="px-3 py-2 text-sm">{obj.po_expiration}</td>
                <td className="px-3 py-2 text-sm">{obj.address_arrival}</td>
                <td className="px-3 py-2 text-sm">{obj.delivery_time}</td>
                <td className="px-3 py-2">
                  <Badge color={STATUS_COLORS[obj.status]} variant="light">{obj.status}</Badge>
                </td>
                <td className="px-3 py-2 text-sm font-semibold">{formatCurrency(obj.amount)}</td>
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
          url="orders?demo=true"
          notFoundMessage="No Order Data Found."
          notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
        />
      </div>

      {/* View Order Modal */}
      <Modal
        opened={viewOpened}
        onClose={() => setViewOpened(false)}
        title={`${selectedOrder?.order_number || ''} | ${selectedOrder?.customer || ''}`}
        size="xl"
        centered
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b">
              <div>
                <Badge color="blue" size="lg">Order Details</Badge>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{selectedOrder.order_date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">PO Number</p>
                    <p className="font-medium">{selectedOrder.po_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Quotation Reference</p>
                    <p className="font-medium">{selectedOrder.quotation_ref}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-bold text-blue-600">{formatCurrency(selectedOrder.total_amount)}</p>
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
                    <p className="font-medium">{selectedOrder.customer_details.name}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faPhone} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedOrder.customer_details.phone}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedOrder.customer_details.email}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faBuilding} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="font-medium">{selectedOrder.customer_details.company}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={12}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-sm">{selectedOrder.customer_details.address}</p>
                  </div>
                </div>
              </Grid.Col>
            </Grid>

            <Divider label="Order Details" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-medium">{selectedOrder.order_number}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Order Status</p>
                <Badge color={STATUS_COLORS[selectedOrder.status]}>{selectedOrder.status}</Badge>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Advance Payment</p>
                <p className="font-medium">{formatCurrency(selectedOrder.advance_payment)}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Delivery Timeline</p>
                <p className="font-medium">{selectedOrder.delivery_timeline}</p>
              </Grid.Col>
              <Grid.Col span={12}>
                <p className="text-sm text-gray-500">Payment Terms (Customer)</p>
                <p className="font-medium">{selectedOrder.payment_terms}</p>
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
                  <Table.Th>Delivery Date</Table.Th>
                  <Table.Th>Total Amount</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {selectedOrder.products.map((product: any, idx: number) => (
                  <Table.Tr key={product.id}>
                    <Table.Td>{idx + 1}</Table.Td>
                    <Table.Td>{product.name}</Table.Td>
                    <Table.Td>{product.quantity}</Table.Td>
                    <Table.Td>{formatCurrency(product.unit_rate)}</Table.Td>
                    <Table.Td>{product.discount}%</Table.Td>
                    <Table.Td>{product.tax}%</Table.Td>
                    <Table.Td>{product.delivery_date}</Table.Td>
                    <Table.Td className="font-semibold">{formatCurrency(product.total)}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>

            <div className="space-y-1 text-right">
              <p>Sub Total: {formatCurrency(selectedOrder.products.reduce((sum: number, p: any) => sum + (p.quantity * p.unit_rate), 0))}</p>
              <p>Discount (5%): {formatCurrency(selectedOrder.products.reduce((sum: number, p: any) => sum + (p.quantity * p.unit_rate * p.discount / 100), 0))}</p>
              <p>Tax (18%): {formatCurrency(selectedOrder.products.reduce((sum: number, p: any) => sum + ((p.quantity * p.unit_rate - (p.quantity * p.unit_rate * p.discount / 100)) * p.tax / 100), 0))}</p>
              <p className="text-lg font-bold">Grand Total: {formatCurrency(selectedOrder.total_amount)}</p>
            </div>

            <Divider label="Commercial Terms" labelPosition="left" />
            <Grid>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">E-commerce Terms</p>
                <p className="font-medium">{selectedOrder.commercial_terms.ecommerce_terms}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Payment Terms</p>
                <p className="font-medium">{selectedOrder.commercial_terms.payment_terms}</p>
              </Grid.Col>
              <Grid.Col span={4}>
                <p className="text-sm text-gray-500">Validity Date</p>
                <p className="font-medium">{selectedOrder.commercial_terms.validity_date}</p>
              </Grid.Col>
            </Grid>
          </div>
        )}
      </Modal>

      {/* Create Order Modal */}
      <Modal
        opened={createOpened}
        onClose={() => setCreateOpened(false)}
        title="Create Order"
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
                value={orderForm.customer_name}
                onChange={(e) => handleOrderChange('customer_name', e.currentTarget.value)}
                required
              />
              <TextInput
                label="Company"
                placeholder="Enter Company Name"
                value={orderForm.company}
                onChange={(e) => handleOrderChange('company', e.currentTarget.value)}
              />
              <Textarea
                label="Address"
                placeholder="Enter Address"
                value={orderForm.address}
                onChange={(e) => handleOrderChange('address', e.currentTarget.value)}
                minRows={2}
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Order Details</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput
                label="Order Number"
                placeholder="Enter Order Number"
                value={orderForm.order_number}
                onChange={(e) => handleOrderChange('order_number', e.currentTarget.value)}
                required
              />
              <NumberInput
                label="Delivery Payment"
                placeholder="Enter Delivery Payment"
                value={orderForm.delivery_payment}
                onChange={(value) => handleOrderChange('delivery_payment', value || 0)}
                leftSection="₹"
              />
              <CustomDateInput
                label="Order Date"
                name="order_date"
                value={orderForm.order_date}
                onChange={(e) => handleOrderChange('order_date', e?.currentTarget?.value || '')}
                required
              />
              <NumberInput
                label="Total Amount"
                placeholder="Enter Total Amount"
                value={orderForm.total_amount}
                onChange={(value) => handleOrderChange('total_amount', value || 0)}
                leftSection="₹"
                required
              />
              <TextInput
                label="Payment Terms (Cashless)"
                placeholder="Enter Payment Terms"
                value={orderForm.payment_terms}
                onChange={(e) => handleOrderChange('payment_terms', e.currentTarget.value)}
              />
              <TextInput
                label="Delivery Time"
                placeholder="Enter Delivery Time"
                value={orderForm.delivery_time}
                onChange={(e) => handleOrderChange('delivery_time', e.currentTarget.value)}
              />
              <Textarea
                label="Delivery Address"
                placeholder="Enter Delivery Address"
                value={orderForm.delivery_address}
                onChange={(e) => handleOrderChange('delivery_address', e.currentTarget.value)}
                minRows={2}
              />
              <TextInput
                label="PO Number"
                placeholder="Enter PO Number"
                value={orderForm.po_number}
                onChange={(e) => handleOrderChange('po_number', e.currentTarget.value)}
              />
              <CustomDateInput
                label="PO Expiration"
                name="po_expiration"
                value={orderForm.po_expiration}
                onChange={(e) => handleOrderChange('po_expiration', e?.currentTarget?.value || '')}
              />
              <NumberInput
                label="Advance Payment"
                placeholder="Enter Advance Payment"
                value={orderForm.advance_payment}
                onChange={(value) => handleOrderChange('advance_payment', value || 0)}
                leftSection="₹"
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
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
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
                      label="Price per unit"
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
                    <CustomDateInput
                      label="Delivery Date"
                      name="delivery_date"
                      value={product.delivery_date}
                      onChange={(e) => handleProductChange(product.id, 'delivery_date', e?.currentTarget?.value || '')}
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
            <div className="mt-4 space-y-1 text-right">
              <p>Sub Total: {formatCurrency(calculateSubTotal())}</p>
              <p>Discount: {formatCurrency(calculateTotalDiscount())}</p>
              <p>Tax (18%): {formatCurrency(calculateTotalTax())}</p>
              <p className="text-lg font-bold">Grand Total: {formatCurrency(calculateGrandTotal())}</p>
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Commercial Terms</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput
                label="Delivery Terms"
                placeholder="Enter Delivery Terms"
                value={orderForm.delivery_terms}
                onChange={(e) => handleOrderChange('delivery_terms', e.currentTarget.value)}
              />
              <TextInput
                label="Payment Terms"
                placeholder="Enter Payment Terms"
                value={orderForm.payment_terms}
                onChange={(e) => handleOrderChange('payment_terms', e.currentTarget.value)}
              />
              <TextInput
                label="Validity Day"
                placeholder="Enter Validity Day"
                value={orderForm.validity_day}
                onChange={(e) => handleOrderChange('validity_day', e.currentTarget.value)}
              />
              <TextInput
                label="Minimum/Open Rate"
                placeholder="Enter Minimum or Open Rate"
                value={orderForm.minimum_rate}
                onChange={(e) => handleOrderChange('minimum_rate', e.currentTarget.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
            <Button variant="outline" onClick={() => setCreateOpened(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Create Order
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Order Modal */}
      <Modal opened={editOpened} onClose={() => setEditOpened(false)} title="Edit Order" size="lg" centered>
        <form onSubmit={handleEditSubmit} className="mt-2 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextInput
              label="Order Number"
              value={editField.order_number}
              onChange={(e) => handleEditChange('order_number', e.currentTarget.value)}
              required
            />
            <TextInput
              label="Customer Name"
              value={editField.customer}
              onChange={(e) => handleEditChange('customer', e.currentTarget.value)}
              required
            />
            <CustomDateInput
              label="Order Date"
              name="order_date"
              value={editField.order_date}
              onChange={(e) => handleEditChange('order_date', e?.currentTarget?.value || '')}
            />
            <Select
              label="Status"
              data={['Approved', 'Pending', 'Completed', 'Cancelled', 'In Progress']}
              value={editField.status}
              onChange={(value) => handleEditChange('status', value || '')}
            />
            <NumberInput
              label="Amount"
              value={editField.amount}
              onChange={(value) => handleEditChange('amount', value || 0)}
              leftSection="₹"
            />
            <TextInput
              label="PO Number"
              value={editField.po_number}
              onChange={(e) => handleEditChange('po_number', e.currentTarget.value)}
            />
            <TextInput
              label="Delivery Time"
              value={editField.delivery_time}
              onChange={(e) => handleEditChange('delivery_time', e.currentTarget.value)}
            />
            <TextInput
              label="Payment Terms"
              value={editField.payment_terms}
              onChange={(e) => handleEditChange('payment_terms', e.currentTarget.value)}
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setEditOpened(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Update Order
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};