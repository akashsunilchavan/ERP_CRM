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
  Progress,
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
  faCalendarAlt,
  faChartLine,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faFilter,
  faPrint,
  faCopy,
  faPlusCircle,
  faMinusCircle,
  faIndustry,
  faUsers,
  faBox,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DUMMY_PRODUCTION_PLANS_DATA = {
  data: [
    {
      id: 'PP001',
      plan_no: 'RP-1001',
      plan_date: '31 May, 2026',
      product: 'Gear Assembly',
      product_code: 'GA-9001',
      customer: 'ABC Electronics',
      plan_type: 'Make to Stock',
      planned_quantity: 1600,
      planned_value: 12500000,
      status: 'In Progress',
      progress: 40,
      created_by: 'Admin',
      created_on: '28 May, 2026',
      production_start_date: '31 May, 2026',
      production_end_date: '06 June, 2026',
      production_schedule: [
        { id: 1, operation: 'Cutting', machine: 'CNC Cutting Machine - 01', plan_start: '20 April, 2026', plan_end: '28 April, 2026', duration: '3 hrs', status: 'Completed' },
        { id: 2, operation: 'Machining', machine: 'CNC VMC Machine - 02', plan_start: '2 May, 2026', plan_end: '8 May, 2026', duration: '0 hrs', status: 'Completed' },
        { id: 3, operation: 'Drilling', machine: 'Drilling Machine - 01', plan_start: '12 May, 2026', plan_end: '20 May, 2026', duration: '4 hrs', status: 'Completed' },
        { id: 4, operation: 'Assembly', machine: 'Assembly Station - 01', plan_start: '20 May, 2026', plan_end: '26 May, 2026', duration: '15 hrs', status: 'Not Started' },
        { id: 5, operation: 'Inspection', machine: 'QC Inspection Table - 01', plan_start: '28 May, 2026', plan_end: '29 May, 2026', duration: '4 hrs', status: 'Not Started' },
        { id: 6, operation: 'Packing', machine: 'Packing Station - 01', plan_start: '30 May, 2026', plan_end: '31 May, 2026', duration: '3 hrs', status: 'Not Started' },
      ],
      machine_assignment: [
        { operation: 'Cutting', machine: 'CNC Cutting Machine - 01', capacity: '100 Nos/Day', load: 80 },
        { operation: 'Machining', machine: 'CNC VMC Machine - 02', capacity: '80 Nos/Day', load: 60 },
        { operation: 'Drilling', machine: 'Drilling Machine - 01', capacity: '120 Nos/Day', load: 90 },
        { operation: 'Assembly', machine: 'Assembly Station - 01', capacity: '100 Nos/Day', load: 80 },
        { operation: 'Inspection', machine: 'QC Inspection Table - 01', capacity: '150 Nos/Day', load: 100 },
        { operation: 'Packing', machine: 'Packing Station - 01', capacity: '200 Nos/Day', load: 100 },
      ],
      resource_allocation: [
        { type: 'Operator', name: 'Gear Assembly', required: 2, allocated: 2 },
        { type: 'Operator', name: 'Sunking Vadas', required: 2, allocated: 2 },
        { type: 'Fitter', name: 'Manoj Singh', required: 1, allocated: 1 },
        { type: 'Quality Inspector', name: 'Avil Sharma', required: 1, allocated: 1 },
        { type: 'Helper', name: 'Vijay Patel', required: 2, allocated: 2 },
      ],
      material_requirement: [
        { code: 'CMP-1001', name: 'Gear Shaft', required_qty: 100, available: 120, status: 'Available' },
        { code: 'CMP-3002', name: 'Gear Wheel', required_qty: 100, available: 95, status: 'Available' },
        { code: 'CMP-1033', name: 'Bearing 2035', required_qty: 200, available: 200, status: 'Available' },
        { code: 'CMP-3034', name: 'Chisel 25mm', required_qty: 100, available: 150, status: 'Available' },
      ],
      attachments: ['PO-CE4V4BC0E4C'],
    },
    {
      id: 'PP002',
      plan_no: 'RP-1002',
      plan_date: '30 May, 2026',
      product: 'InfraRed Pump',
      product_code: 'IP-2001',
      customer: 'XYZ Elite',
      plan_type: 'Make to Order',
      planned_quantity: 850,
      planned_value: 37000000,
      status: 'Planned',
      progress: 0,
      created_by: 'Admin',
      created_on: '29 May, 2026',
      production_start_date: '01 June, 2026',
      production_end_date: '15 June, 2026',
      production_schedule: [],
      machine_assignment: [],
      resource_allocation: [],
      material_requirement: [],
      attachments: [],
    },
    {
      id: 'PP003',
      plan_no: 'RP-1003',
      plan_date: '28 May, 2026',
      product: 'Control Panel',
      product_code: 'CP-3001',
      customer: 'LAM Industries',
      plan_type: 'Make to Order',
      planned_quantity: 320,
      planned_value: 11200000,
      status: 'In Progress',
      progress: 60,
      created_by: 'Admin',
      created_on: '27 May, 2026',
      production_start_date: '28 May, 2026',
      production_end_date: '10 June, 2026',
      production_schedule: [],
      machine_assignment: [],
      resource_allocation: [],
      material_requirement: [],
      attachments: [],
    },
    {
      id: 'PP004',
      plan_no: 'RP-1004',
      plan_date: '27 May, 2026',
      product: 'Motor Housing',
      product_code: 'MH-4001',
      customer: 'PQR Engineering',
      plan_type: 'Make to Order',
      planned_quantity: 450,
      planned_value: 18000000,
      status: 'Delayed',
      progress: 100,
      created_by: 'Admin',
      created_on: '26 May, 2026',
      production_start_date: '27 May, 2026',
      production_end_date: '05 June, 2026',
      production_schedule: [],
      machine_assignment: [],
      resource_allocation: [],
      material_requirement: [],
      attachments: [],
    },
    {
      id: 'PP005',
      plan_no: 'RP-1005',
      plan_date: '26 May, 2026',
      product: 'Valve Body',
      product_code: 'VB-5001',
      customer: 'DPS Steel',
      plan_type: 'Make to Order',
      planned_quantity: 280,
      planned_value: 16500000,
      status: 'Planned',
      progress: 0,
      created_by: 'Admin',
      created_on: '25 May, 2026',
      production_start_date: '26 May, 2026',
      production_end_date: '08 June, 2026',
      production_schedule: [],
      machine_assignment: [],
      resource_allocation: [],
      material_requirement: [],
      attachments: [],
    },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  'In Progress': 'yellow',
  Planned: 'blue',
  Delayed: 'red',
  Completed: 'green',
  Cancelled: 'gray',
};

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

export const ProductionPlanning = () => {
  const [createOpened, setCreateOpened] = useState(false);
  const [viewOpened, setViewOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const [operations, setOperations] = useState([
    { id: 1, operation: '', month: '', plan_start: '', plan_end: '', basis: '', status: '', capacity: '' },
  ]);

  const [resources, setResources] = useState([
    { id: 1, type: '', name: '', required: 0, allocated: 0 },
  ]);

  const [components, setComponents] = useState([
    { id: 1, code: '', name: '', required_qty: 0, material_status: '' },
  ]);

  const [planForm, setPlanForm] = useState({
    plan_number: '',
    product_name: '',
    drilled_by: '',
    drilled_by_id: '',
    plan_type: '',
    quantity: 0,
    drilled_country: '',
    drilled_name: '',
    drilled_city: '',
    drilled_state: '',
    drilled_zip: '',
    notes: '',
  });

  const [editField, setEditField] = useState({
    id: '',
    plan_no: '',
    product: '',
    plan_type: '',
    status: '',
    planned_quantity: 0,
    planned_value: 0,
  });

  const [plansData] = useState<any>(DUMMY_PRODUCTION_PLANS_DATA);

  const handlePlanChange = (key: string, value: any) => {
    setPlanForm({ ...planForm, [key]: value });
  };

  const handleOperationChange = (id: number, key: string, value: any) => {
    setOperations(operations.map(op => op.id === id ? { ...op, [key]: value } : op));
  };

  const addOperation = () => {
    const newId = Math.max(...operations.map(o => o.id), 0) + 1;
    setOperations([...operations, { id: newId, operation: '', month: '', plan_start: '', plan_end: '', basis: '', status: '', capacity: '' }]);
  };

  const removeOperation = (id: number) => {
    if (operations.length > 1) {
      setOperations(operations.filter(o => o.id !== id));
    }
  };

  const handleResourceChange = (id: number, key: string, value: any) => {
    setResources(resources.map(r => r.id === id ? { ...r, [key]: value } : r));
  };

  const addResource = () => {
    const newId = Math.max(...resources.map(r => r.id), 0) + 1;
    setResources([...resources, { id: newId, type: '', name: '', required: 0, allocated: 0 }]);
  };

  const removeResource = (id: number) => {
    if (resources.length > 1) {
      setResources(resources.filter(r => r.id !== id));
    }
  };

  const handleComponentChange = (id: number, key: string, value: any) => {
    setComponents(components.map(c => c.id === id ? { ...c, [key]: value } : c));
  };

  const addComponent = () => {
    const newId = Math.max(...components.map(c => c.id), 0) + 1;
    setComponents([...components, { id: newId, code: '', name: '', required_qty: 0, material_status: '' }]);
  };

  const removeComponent = (id: number) => {
    if (components.length > 1) {
      setComponents(components.filter(c => c.id !== id));
    }
  };

  const handleEditChange = (key: string, value: any) => {
    setEditField({ ...editField, [key]: value });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Production Plan created:', { planForm, operations, resources, components });
    setCreateOpened(false);
    setPlanForm({
      plan_number: '',
      product_name: '',
      drilled_by: '',
      drilled_by_id: '',
      plan_type: '',
      quantity: 0,
      drilled_country: '',
      drilled_name: '',
      drilled_city: '',
      drilled_state: '',
      drilled_zip: '',
      notes: '',
    });
    setOperations([{ id: 1, operation: '', month: '', plan_start: '', plan_end: '', basis: '', status: '', capacity: '' }]);
    setResources([{ id: 1, type: '', name: '', required: 0, allocated: 0 }]);
    setComponents([{ id: 1, code: '', name: '', required_qty: 0, material_status: '' }]);
    alert('Production Plan created successfully (Demo)');
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Production Plan updated:', editField);
    setEditOpened(false);
    alert('Production Plan updated successfully (Demo)');
  };

  const handleView = (obj: any) => {
    setSelectedPlan(obj);
    setViewOpened(true);
  };

  const handleEdit = (obj: any) => {
    setEditField({
      id: obj.id,
      plan_no: obj.plan_no,
      product: obj.product,
      plan_type: obj.plan_type,
      status: obj.status,
      planned_quantity: obj.planned_quantity,
      planned_value: obj.planned_value,
    });
    setEditOpened(true);
  };

  const handleDelete = (id: string) => {
    alert(`Delete record ${id} (Demo)`);
  };

  const tableColumns = [
    { th: { id: 'srNo', style: { minWidth: '70px', width: '70px' } }, text: 'SR NO.' },
    { text: 'Plan No.', th: { id: 'plan_no', style: { minWidth: '100px' } } },
    { text: 'Plan Date', th: { id: 'plan_date', style: { minWidth: '100px' } } },
    { text: 'Product', th: { id: 'product', style: { minWidth: '180px' } } },
    { text: 'Customer', th: { id: 'customer', style: { minWidth: '150px' } } },
    { text: 'Plan Type', th: { id: 'plan_type', style: { minWidth: '120px' } } },
    { text: 'Planned Value', th: { id: 'planned_value', style: { minWidth: '120px' } } },
    { text: 'Status', th: { id: 'status', style: { minWidth: '100px' } } },
    { text: 'Progress', th: { id: 'progress', style: { minWidth: '100px' } } },
    { text: 'Created By', th: { id: 'created_by', style: { minWidth: '120px' } } },
    { text: 'Actions', th: { id: 'action', style: { minWidth: '130px' } }, justifyContent: 'center' },
  ];

  const statsCards = [
    { title: 'Total Plans', value: '128', change: '+12.5%', trend: 'up', icon: faFileAlt, color: 'blue' },
    { title: 'Planned Quantity', value: '24,50,600', change: '+1.6%', trend: 'up', icon: faBox, color: 'cyan' },
    { title: 'Planned Value', value: '₹15.68 Cr', change: '+15.2%', trend: 'up', icon: faChartLine, color: 'green' },
    { title: 'Confirmed Plans', value: '92', change: '+1.8%', trend: 'up', icon: faCheckCircle, color: 'teal' },
    { title: 'In Progress', value: '28', change: '+1.8%', trend: 'up', icon: faClock, color: 'orange' },
    { title: 'Delayed Plans', value: '8', change: '-20.0%', trend: 'down', icon: faTimesCircle, color: 'red' },
  ];

  const planByStatusData = {
    series: [42, 28, 18, 12],
    options: {
      chart: { type: 'donut' as const, height: 280 },
      labels: ['In Progress', 'Planned', 'Completed', 'Delayed'],
      colors: ['#f59e0b', '#3b82f6', '#10b981', '#ef4444'],
      legend: { position: 'bottom' as const },
      dataLabels: { enabled: true, formatter: (val: number) => `${val.toFixed(1)}%` },
    },
  };

  const planTypeDistributionData = {
    series: [65, 35],
    options: {
      chart: { type: 'pie' as const, height: 280 },
      labels: ['Make to Stock', 'Make to Order'],
      colors: ['#8b5cf6', '#ec4899'],
      legend: { position: 'bottom' as const },
      dataLabels: { enabled: true, formatter: (val: number) => `${val.toFixed(1)}%` },
    },
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header Section */}
      <div className="mb-6">
        <Title order={2} className="text-gray-800">Production Planning</Title>
        <p className="mt-1 text-gray-500">Manage and track all production plans</p>
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
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-500">{stat.title}</p>
            </div>
          </Paper>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Plan by Status</Title>
          <ReactApexChart options={planByStatusData.options} series={planByStatusData.series} type="donut" height={300} />
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full"></div><span className="text-xs">In Progress (42%)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div><span className="text-xs">Planned (28%)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div><span className="text-xs">Completed (18%)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span className="text-xs">Delayed (12%)</span></div>
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Plan Type Distribution</Title>
          <ReactApexChart options={planTypeDistributionData.options} series={planTypeDistributionData.series} type="pie" height={300} />
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded-full"></div><span className="text-xs">Make to Stock (65%)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-pink-500 rounded-full"></div><span className="text-xs">Make to Order (35%)</span></div>
          </div>
        </Paper>
      </div>

      {/* Search Filters */}
      <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-white border border-gray-200 rounded-xl sm:grid-cols-2 lg:grid-cols-5">
        <TextInput placeholder="Search..." leftSection={<FontAwesomeIcon icon={faFilter} />} />
        <Select placeholder="Status: All" data={['All', 'Planned', 'In Progress', 'Completed', 'Delayed']} />
        <Select placeholder="Plan Type: All" data={['All', 'Make to Stock', 'Make to Order']} />
        <CustomDateInput placeholder="Date Range" name="date_range" />
        <Button variant="outline" color="gray">Clear Filters</Button>
      </div>

      {/* Production Plans Table */}
      <div className="p-4 mb-6 bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="flex justify-end mb-4">
          <Button onClick={() => setCreateOpened(true)} color="blue" leftSection={<FontAwesomeIcon icon={faPlus} />}>
            Add Production Plan
          </Button>
        </div>
        <CustomTable
          data={plansData}
          setData={() => {}}
          isSearchingRequired={false}
          isSortingRequired={true}
          isPaginationRequired={true}
          tableHeadData={tableColumns}
          tableBody={() =>
            plansData?.data?.map((obj: any, index: number) => (
              <tr key={obj.id} className="transition border-b hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-medium text-gray-600">{index + 1}</td>
                <td className="px-3 py-2 text-sm font-medium text-blue-600">{obj.plan_no}</td>
                <td className="px-3 py-2 text-sm">{obj.plan_date}</td>
                <td className="px-3 py-2 text-sm font-medium">{obj.product}</td>
                <td className="px-3 py-2 text-sm">{obj.customer}</td>
                <td className="px-3 py-2 text-sm">{obj.plan_type}</td>
                <td className="px-3 py-2 text-sm font-semibold">{formatCurrency(obj.planned_value)}</td>
                <td className="px-3 py-2"><Badge color={STATUS_COLORS[obj.status]} variant="light">{obj.status}</Badge></td>
                <td className="px-3 py-2">
                  <div className="w-24">
                    <Progress value={obj.progress} size="sm" color={obj.progress === 100 ? 'green' : 'blue'} />
                    <span className="text-xs text-gray-500">{obj.progress}%</span>
                  </div>
                </td>
                <td className="px-3 py-2 text-sm">{obj.created_by}</td>
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
                    <Tooltip label="Copy">
                      <ActionIcon variant="subtle" color="green">
                        <FontAwesomeIcon icon={faCopy} />
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
          url="production-plans?demo=true"
          notFoundMessage="No Production Plan Data Found."
          notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
        />
      </div>

      {/* View Production Plan Modal */}
      <Modal opened={viewOpened} onClose={() => setViewOpened(false)} title={`Production Plan Details | ${selectedPlan?.plan_no || ''}`} size="xl" centered>
        {selectedPlan && (
          <div className="space-y-6">
            {/* Plan Information */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-blue-50">
              <div><p className="text-sm text-gray-500">Plan Number</p><p className="font-semibold">{selectedPlan.plan_no}</p></div>
              <div><p className="text-sm text-gray-500">Plan Type</p><p className="font-semibold">{selectedPlan.plan_type}</p></div>
              <div><p className="text-sm text-gray-500">Product Name</p><p className="font-semibold">{selectedPlan.product} ({selectedPlan.product_code})</p></div>
              <div><p className="text-sm text-gray-500">Quantity</p><p className="font-semibold">{formatNumber(selectedPlan.planned_quantity)} Nos</p></div>
              <div><p className="text-sm text-gray-500">Status</p><Badge color={STATUS_COLORS[selectedPlan.status]}>{selectedPlan.status}</Badge></div>
              <div><p className="text-sm text-gray-500">Progress</p><Progress value={selectedPlan.progress} size="sm" className="w-32" /></div>
              <div><p className="text-sm text-gray-500">Production start Date</p><p className="font-semibold">{selectedPlan.production_start_date}</p></div>
              <div><p className="text-sm text-gray-500">Production end Date</p><p className="font-semibold">{selectedPlan.production_end_date}</p></div>
              <div><p className="text-sm text-gray-500">Created By</p><p className="font-semibold">{selectedPlan.created_by}</p></div>
              <div><p className="text-sm text-gray-500">Created On</p><p className="font-semibold">{selectedPlan.created_on}</p></div>
            </div>

            {selectedPlan.production_schedule.length > 0 && (
              <>
                <Divider label="Production Schedule" labelPosition="left" />
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>#</Table.Th>
                      <Table.Th>Operation</Table.Th>
                      <Table.Th>Machine</Table.Th>
                      <Table.Th>Plan Start</Table.Th>
                      <Table.Th>Plan End</Table.Th>
                      <Table.Th>Duration</Table.Th>
                      <Table.Th>Status</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {selectedPlan.production_schedule.map((op: any, idx: number) => (
                      <Table.Tr key={op.id}>
                        <Table.Td>{idx + 1}</Table.Td>
                        <Table.Td>{op.operation}</Table.Td>
                        <Table.Td>{op.machine}</Table.Td>
                        <Table.Td>{op.plan_start}</Table.Td>
                        <Table.Td>{op.plan_end}</Table.Td>
                        <Table.Td>{op.duration}</Table.Td>
                        <Table.Td><Badge color={op.status === 'Completed' ? 'green' : 'yellow'} variant="light">{op.status}</Badge></Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </>
            )}

            {selectedPlan.machine_assignment.length > 0 && (
              <>
                <Divider label="Machine Assignment" labelPosition="left" />
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Operation</Table.Th>
                      <Table.Th>Machine</Table.Th>
                      <Table.Th>Capacity</Table.Th>
                      <Table.Th>Load (%)</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {selectedPlan.machine_assignment.map((mac: any, idx: number) => (
                      <Table.Tr key={idx}>
                        <Table.Td>{mac.operation}</Table.Td>
                        <Table.Td>{mac.machine}</Table.Td>
                        <Table.Td>{mac.capacity}</Table.Td>
                        <Table.Td>
                          <div className="flex items-center gap-2">
                            <Progress value={mac.load} size="sm" className="w-20" />
                            <span className="text-sm">{mac.load}%</span>
                          </div>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </>
            )}

            {selectedPlan.resource_allocation.length > 0 && (
              <>
                <Divider label="Resource Allocation" labelPosition="left" />
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Resource Type</Table.Th>
                      <Table.Th>Resource Name</Table.Th>
                      <Table.Th>Required Hours</Table.Th>
                      <Table.Th>Allocated</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {selectedPlan.resource_allocation.map((res: any, idx: number) => (
                      <Table.Tr key={idx}>
                        <Table.Td>{res.type}</Table.Td>
                        <Table.Td>{res.name}</Table.Td>
                        <Table.Td>{res.required}</Table.Td>
                        <Table.Td>{res.allocated}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </>
            )}

            {selectedPlan.material_requirement.length > 0 && (
              <>
                <Divider label="Material Requirement Summary" labelPosition="left" />
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Component Name</Table.Th>
                      <Table.Th>Component Code</Table.Th>
                      <Table.Th>Required Quantity</Table.Th>
                      <Table.Th>Availability</Table.Th>
                      <Table.Th>Material Status</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {selectedPlan.material_requirement.map((mat: any, idx: number) => (
                      <Table.Tr key={idx}>
                        <Table.Td>{mat.name}</Table.Td>
                        <Table.Td className="font-mono">{mat.code}</Table.Td>
                        <Table.Td>{mat.required_qty}</Table.Td>
                        <Table.Td>{mat.available}</Table.Td>
                        <Table.Td><Badge color="green" variant="light">{mat.status}</Badge></Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </>
            )}

            {selectedPlan.attachments.length > 0 && (
              <>
                <Divider label="Attachments" labelPosition="left" />
                <div className="space-y-2">
                  {selectedPlan.attachments.map((doc: string, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                      <div className="flex items-center gap-2"><FontAwesomeIcon icon={faFileAlt} className="text-blue-500" /><span className="text-sm">{doc}</span></div>
                      <ActionIcon variant="subtle" color="blue" size="sm"><FontAwesomeIcon icon={faDownload} /></ActionIcon>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* Add Production Plan Modal */}
      <Modal opened={createOpened} onClose={() => setCreateOpened(false)} title="Add Production Plan" size="xl" centered>
        <form onSubmit={handleAddSubmit} className="mt-2 space-y-6">
          <div>
            <Title order={5} className="mb-3 text-gray-700">Plan Information</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput label="Plan Number" placeholder="Enter Plan Number" value={planForm.plan_number} onChange={(e) => handlePlanChange('plan_number', e.currentTarget.value)} required />
              <TextInput label="Product Name" placeholder="Enter Product Name" value={planForm.product_name} onChange={(e) => handlePlanChange('product_name', e.currentTarget.value)} required />
              <TextInput label="Drilled By" placeholder="Enter Name" value={planForm.drilled_by} onChange={(e) => handlePlanChange('drilled_by', e.currentTarget.value)} />
              <TextInput label="Drilled By ID" placeholder="ID" value={planForm.drilled_by_id} onChange={(e) => handlePlanChange('drilled_by_id', e.currentTarget.value)} />
              <Select label="Plan Type" placeholder="Select Plan Type" data={['Make to Stock', 'Make to Order']} value={planForm.plan_type} onChange={(value) => handlePlanChange('plan_type', value || '')} required />
              <NumberInput label="Quantity" placeholder="Enter Quantity" value={planForm.quantity} onChange={(value) => handlePlanChange('quantity', Number(value) || 0)} required />
              <TextInput label="Driller Country" placeholder="Country" value={planForm.drilled_country} onChange={(e) => handlePlanChange('drilled_country', e.currentTarget.value)} />
              <TextInput label="Driller Name" placeholder="Driller Name" value={planForm.drilled_name} onChange={(e) => handlePlanChange('drilled_name', e.currentTarget.value)} />
              <TextInput label="Driller City" placeholder="City" value={planForm.drilled_city} onChange={(e) => handlePlanChange('drilled_city', e.currentTarget.value)} />
              <TextInput label="Driller State" placeholder="State" value={planForm.drilled_state} onChange={(e) => handlePlanChange('drilled_state', e.currentTarget.value)} />
              <TextInput label="Driller Zip" placeholder="Zip Code" value={planForm.drilled_zip} onChange={(e) => handlePlanChange('drilled_zip', e.currentTarget.value)} />
            </div>
          </div>

          <Divider />

          <div>
            <div className="flex items-center justify-between mb-3"><Title order={5} className="text-gray-700">Production Schedule</Title><Button size="xs" variant="light" leftSection={<FontAwesomeIcon icon={faPlusCircle} />} onClick={addOperation}>Add More Operations</Button></div>
            <div className="space-y-3">
              {operations.map((op) => (
                <Paper key={op.id} withBorder p="md" className="relative">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                    <TextInput label="Operation" placeholder="Operation" value={op.operation} onChange={(e) => handleOperationChange(op.id, 'operation', e.currentTarget.value)} />
                    <TextInput label="Month" placeholder="Month" value={op.month} onChange={(e) => handleOperationChange(op.id, 'month', e.currentTarget.value)} />
                    <CustomDateInput label="Plan Start Date" name="plan_start" value={op.plan_start} onChange={(e) => handleOperationChange(op.id, 'plan_start', e?.currentTarget?.value || '')} />
                    <CustomDateInput label="Plan End Date" name="plan_end" value={op.plan_end} onChange={(e) => handleOperationChange(op.id, 'plan_end', e?.currentTarget?.value || '')} />
                    <TextInput label="Basis" placeholder="Basis" value={op.basis} onChange={(e) => handleOperationChange(op.id, 'basis', e.currentTarget.value)} />
                    <Select label="Status" placeholder="Status" data={['Not Started', 'In Progress', 'Completed']} value={op.status} onChange={(value) => handleOperationChange(op.id, 'status', value || '')} />
                    <TextInput label="Capacity" placeholder="Capacity" value={op.capacity} onChange={(e) => handleOperationChange(op.id, 'capacity', e.currentTarget.value)} />
                  </div>
                  {operations.length > 1 && (<ActionIcon color="red" variant="subtle" onClick={() => removeOperation(op.id)} className="absolute top-2 right-2"><FontAwesomeIcon icon={faMinusCircle} /></ActionIcon>)}
                </Paper>
              ))}
            </div>
          </div>

          <Divider />

          <div>
            <div className="flex items-center justify-between mb-3"><Title order={5} className="text-gray-700">Resource Allocations</Title><Button size="xs" variant="light" leftSection={<FontAwesomeIcon icon={faPlusCircle} />} onClick={addResource}>Add More Resources</Button></div>
            <div className="space-y-3">
              {resources.map((res) => (
                <Paper key={res.id} withBorder p="md" className="relative">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                    <TextInput label="Resource Type" placeholder="Type" value={res.type} onChange={(e) => handleResourceChange(res.id, 'type', e.currentTarget.value)} />
                    <TextInput label="Resource Name" placeholder="Name" value={res.name} onChange={(e) => handleResourceChange(res.id, 'name', e.currentTarget.value)} />
                    <NumberInput label="Required" placeholder="Required Hours" value={res.required} onChange={(value) => handleResourceChange(res.id, 'required', Number(value) || 0)} />
                    <NumberInput label="Allocated" placeholder="Allocated Hours" value={res.allocated} onChange={(value) => handleResourceChange(res.id, 'allocated', Number(value) || 0)} />
                  </div>
                  {resources.length > 1 && (<ActionIcon color="red" variant="subtle" onClick={() => removeResource(res.id)} className="absolute top-2 right-2"><FontAwesomeIcon icon={faMinusCircle} /></ActionIcon>)}
                </Paper>
              ))}
            </div>
          </div>

          <Divider />

          <div>
            <div className="flex items-center justify-between mb-3"><Title order={5} className="text-gray-700">Material Requirement Summary</Title><Button size="xs" variant="light" leftSection={<FontAwesomeIcon icon={faPlusCircle} />} onClick={addComponent}>Add More Components</Button></div>
            <div className="space-y-3">
              {components.map((comp) => (
                <Paper key={comp.id} withBorder p="md" className="relative">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
                    <TextInput label="Component Code" placeholder="Code" value={comp.code} onChange={(e) => handleComponentChange(comp.id, 'code', e.currentTarget.value)} />
                    <TextInput label="Component Name" placeholder="Name" value={comp.name} onChange={(e) => handleComponentChange(comp.id, 'name', e.currentTarget.value)} />
                    <NumberInput label="Required Quantity" placeholder="Qty" value={comp.required_qty} onChange={(value) => handleComponentChange(comp.id, 'required_qty', Number(value) || 0)} />
                    <Select label="Required Quality" placeholder="Quality" data={['Standard', 'Premium', 'Economy']} />
                    <Select label="Material Status" placeholder="Status" data={['Available', 'Backordered', 'Not Available']} value={comp.material_status} onChange={(value) => handleComponentChange(comp.id, 'material_status', value || '')} />
                  </div>
                  {components.length > 1 && (<ActionIcon color="red" variant="subtle" onClick={() => removeComponent(comp.id)} className="absolute top-2 right-2"><FontAwesomeIcon icon={faMinusCircle} /></ActionIcon>)}
                </Paper>
              ))}
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Other Notes</Title>
            <Textarea placeholder="Enter notes..." minRows={3} value={planForm.notes} onChange={(e) => handlePlanChange('notes', e.currentTarget.value)} />
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
            <Button variant="outline" onClick={() => setCreateOpened(false)}>Cancel</Button>
            <Button type="submit" color="blue">Add Plan</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Production Plan Modal */}
      <Modal opened={editOpened} onClose={() => setEditOpened(false)} title="Edit Production Plan" size="lg" centered>
        <form onSubmit={handleEditSubmit} className="mt-2 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextInput label="Plan No." value={editField.plan_no} disabled />
            <TextInput label="Product" value={editField.product} onChange={(e) => handleEditChange('product', e.currentTarget.value)} required />
            <Select label="Plan Type" data={['Make to Stock', 'Make to Order']} value={editField.plan_type} onChange={(value) => handleEditChange('plan_type', value || '')} />
            <Select label="Status" data={['Planned', 'In Progress', 'Completed', 'Delayed']} value={editField.status} onChange={(value) => handleEditChange('status', value || '')} />
            <NumberInput label="Planned Quantity" value={editField.planned_quantity} onChange={(value) => handleEditChange('planned_quantity', Number(value) || 0)} />
            <NumberInput label="Planned Value" value={editField.planned_value} onChange={(value) => handleEditChange('planned_value', Number(value) || 0)} leftSection="₹" />
          </div>
          <div className="flex justify-end gap-3 mt-4"><Button variant="outline" onClick={() => setEditOpened(false)}>Cancel</Button><Button type="submit" color="blue">Update Plan</Button></div>
        </form>
      </Modal>

     
    </div>
  );
};