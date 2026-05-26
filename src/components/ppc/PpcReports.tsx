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
  Alert,
  Progress,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faDownload,
  faFileAlt,
  faBox,
  faCube,
  faList,
  faCheckCircle,
  faTimesCircle,
  faFilter,
  faPrint,
  faWarning,
  faChartLine,
  faWarehouse,
  faTruck,
  faCalendarAlt,
  faUser,
  faBuilding,
  faPercent,
} from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';

const DUMMY_MATERIAL_PLANNING_DATA = {
  data: [
    {
      id: 'MP001',
      run_no: '101-1011',
      product_name: 'Gear Box Assembly',
      material_name: 'Steel Plate 10mm',
      material_code: 'RM-STEEL-001',
      material_type: 'Raw Material',
      uom: 'Nos',
      required_qty: 8000,
      available_stock: 1150,
      to_be_purchased: 3800,
      status: 'Stocking',
      supplier: 'Shri Steel Industries',
      plan_no: 'MP-1001',
      plan_date: '02 May, 2026',
      created_by: 'Admin',
      created_on: '30 April, 2026',
      lead_time: 5,
      warehouse: 'Main Warehouse',
      reserved_stock: 150,
      usable_stock: 1050,
      reorder_level: 500,
      last_purchase_rate: 78.50,
      shortage_qty: 3800,
      purchase_history: [
        { po_no: 'PO-4564', supplier: 'MGY 2026', po_date: '20 April, 2026', received_qty: 2660, rate: 78.50 },
        { po_no: 'PO-7086', supplier: 'YY 2026', po_date: '15 April, 2026', received_qty: 1660, rate: 76.00 },
        { po_no: 'PO-2345', supplier: 'PQR 2026', po_date: '20 April, 2026', received_qty: 1550, rate: 77.20 },
      ],
      attachments: [
        { name: 'Hydraulic Pump Drawing.pdf', size: '1.2 MB' },
        { name: 'Process Sheet.pdf', size: '0.8 MB' },
      ],
      notes: 'Ensure material is available before the planning period to avoid production delays.',
    },
    {
      id: 'MP002',
      run_no: '101-1013',
      product_name: 'Grade Steel Assembly',
      material_name: 'Bearing 8032',
      material_code: 'CMP-BRG-002',
      material_type: 'Component',
      uom: 'Nos',
      required_qty: 800,
      available_stock: 100,
      to_be_purchased: 800,
      status: 'Stocking',
      supplier: 'Precision Bearings Ltd',
      plan_no: 'MP-1002',
      plan_date: '03 May, 2026',
      created_by: 'Admin',
      created_on: '01 May, 2026',
      lead_time: 7,
      warehouse: 'Component Warehouse',
      reserved_stock: 20,
      usable_stock: 80,
      reorder_level: 200,
      last_purchase_rate: 45.00,
      shortage_qty: 700,
      purchase_history: [],
      attachments: [],
      notes: 'Urgent requirement - priority order',
    },
    {
      id: 'MP003',
      run_no: '101-1015',
      product_name: 'Hydraulic Pump',
      material_name: 'Steel Plate 10mm',
      material_code: 'RM-STEEL-001',
      material_type: 'Raw Material',
      uom: 'Nos',
      required_qty: 2500,
      available_stock: 1250,
      to_be_purchased: 1250,
      status: 'Stocking',
      supplier: 'Shri Steel Industries',
      plan_no: 'MP-1003',
      plan_date: '04 May, 2026',
      created_by: 'Admin',
      created_on: '02 May, 2026',
      lead_time: 5,
      warehouse: 'Main Warehouse',
      reserved_stock: 100,
      usable_stock: 1150,
      reorder_level: 300,
      last_purchase_rate: 78.50,
      shortage_qty: 1250,
      purchase_history: [],
      attachments: [],
      notes: '',
    },
    {
      id: 'MP004',
      run_no: '101-1017',
      product_name: 'Hydraulic Pump',
      material_name: 'Wire Rope 10mm',
      material_code: 'RM-WIRE-003',
      material_type: 'Raw Material',
      uom: 'Meter',
      required_qty: 1000,
      available_stock: 250,
      to_be_purchased: 250,
      status: 'Stocking',
      supplier: 'Steel Wire Industries',
      plan_no: 'MP-1004',
      plan_date: '05 May, 2026',
      created_by: 'Admin',
      created_on: '03 May, 2026',
      lead_time: 6,
      warehouse: 'Raw Material Warehouse',
      reserved_stock: 50,
      usable_stock: 200,
      reorder_level: 100,
      last_purchase_rate: 120.00,
      shortage_qty: 750,
      purchase_history: [],
      attachments: [],
      notes: '',
    },
    {
      id: 'MP005',
      run_no: '101-1019',
      product_name: 'Electric Motor 1kW',
      material_name: 'Electric Motor 1kW',
      material_code: 'CMP-MOT-004',
      material_type: 'Pumpable Part',
      uom: 'Nos',
      required_qty: 1200,
      available_stock: 150,
      to_be_purchased: 600,
      status: 'Stocking',
      supplier: 'Motors Ltd',
      plan_no: 'MP-1005',
      plan_date: '06 May, 2026',
      created_by: 'Admin',
      created_on: '04 May, 2026',
      lead_time: 10,
      warehouse: 'Component Warehouse',
      reserved_stock: 30,
      usable_stock: 120,
      reorder_level: 100,
      last_purchase_rate: 2500.00,
      shortage_qty: 1050,
      purchase_history: [],
      attachments: [],
      notes: '',
    },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  Stocking: 'green',
  'Out of Stock': 'red',
  'Low Stock': 'orange',
  'In Transit': 'blue',
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-IN').format(value);
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(value);
};

export const PpcReports = () => {
  const [createOpened, setCreateOpened] = useState(false);
  const [viewOpened, setViewOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const [planForm, setPlanForm] = useState({
    product_name: '',
    material_name: '',
    material_code: '',
    material_type: '',
    uom: '',
    required_qty: 0,
    available_stock: 0,
    supplier: '',
    plan_date: '',
    warehouse: '',
    lead_time: 0,
    reorder_level: 0,
    last_purchase_rate: 0,
    notes: '',
    attachments: null as File | null,
  });

  const [editField, setEditField] = useState({
    id: '',
    run_no: '',
    product_name: '',
    material_name: '',
    required_qty: 0,
    status: '',
  });

  const [planningData] = useState<any>(DUMMY_MATERIAL_PLANNING_DATA);

  const handlePlanChange = (key: string, value: any) => {
    setPlanForm({ ...planForm, [key]: value });
  };

  const handleEditChange = (key: string, value: any) => {
    setEditField({ ...editField, [key]: value });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Material Plan created:', planForm);
    setCreateOpened(false);
    setPlanForm({
      product_name: '',
      material_name: '',
      material_code: '',
      material_type: '',
      uom: '',
      required_qty: 0,
      available_stock: 0,
      supplier: '',
      plan_date: '',
      warehouse: '',
      lead_time: 0,
      reorder_level: 0,
      last_purchase_rate: 0,
      notes: '',
      attachments: null,
    });
    alert('Material Plan created successfully (Demo)');
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Material Plan updated:', editField);
    setEditOpened(false);
    alert('Material Plan updated successfully (Demo)');
  };

  const handleView = (obj: any) => {
    setSelectedPlan(obj);
    setViewOpened(true);
  };

  const handleEdit = (obj: any) => {
    setEditField({
      id: obj.id,
      run_no: obj.run_no,
      product_name: obj.product_name,
      material_name: obj.material_name,
      required_qty: obj.required_qty,
      status: obj.status,
    });
    setEditOpened(true);
  };

  const handleDelete = (id: string) => {
    alert(`Delete record ${id} (Demo)`);
  };

  const tableColumns = [
    { th: { id: 'srNo', style: { minWidth: '70px', width: '70px' } }, text: 'SR NO.' },
    { text: 'Run No.', th: { id: 'run_no', style: { minWidth: '100px' } } },
    { text: 'Product Name', th: { id: 'product_name', style: { minWidth: '180px' } } },
    { text: 'Material Name', th: { id: 'material_name', style: { minWidth: '180px' } } },
    { text: 'Material Type', th: { id: 'material_type', style: { minWidth: '120px' } } },
    { text: 'UOM', th: { id: 'uom', style: { minWidth: '80px' } } },
    { text: 'Required Qty', th: { id: 'required_qty', style: { minWidth: '120px' } } },
    { text: 'Available Stock', th: { id: 'available_stock', style: { minWidth: '120px' } } },
    { text: 'To be Purchased', th: { id: 'to_be_purchased', style: { minWidth: '130px' } } },
    { text: 'Status', th: { id: 'status', style: { minWidth: '100px' } } },
    { text: 'Actions', th: { id: 'action', style: { minWidth: '100px' } }, justifyContent: 'center' },
  ];

  const statsCards = [
    { title: 'Total Materials', value: '1,268', subtitle: 'Hours', icon: faBox, color: 'blue' },
    { title: 'Total Required Quantity', value: '45,680', subtitle: 'Pcs', icon: faCube, color: 'cyan' },
    { title: 'Available Stocks', value: '32,150', subtitle: 'Hours', icon: faWarehouse, color: 'green' },
    { title: 'To be Purchased', value: '13,530', subtitle: 'Hours', icon: faTruck, color: 'orange' },
    { title: 'Shortage Items', value: '156', subtitle: 'Hours', icon: faWarning, color: 'red' },
  ];

  const topShortageMaterials = [
    { name: 'Steel Plate 10mm', required_qty: 3500, available_stock: 2400, required_purchase: 5000 },
    { name: 'Bearing 8032', required_qty: 1800, available_stock: 125, required_purchase: 1400 },
    { name: 'Wire Rope 10mm', required_qty: 3000, available_stock: 800, required_purchase: 1200 },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Title order={2} className="text-gray-800">Material Planning</Title>
          <p className="mt-1 text-gray-500">Plan and track material requirements for production</p>
        </div>
        <Button
          onClick={() => setCreateOpened(true)}
          color="blue"
          leftSection={<FontAwesomeIcon icon={faPlus} />}
          size="md"
        >
          Create Material Plan
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-5">
        {statsCards.map((stat, index) => (
          <Paper key={index} withBorder p="md" radius="md" className="bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="mt-1 text-xs text-gray-400">{stat.subtitle}</p>
              </div>
              <ThemeIcon color={stat.color} size="lg" radius="xl" variant="light">
                <FontAwesomeIcon icon={stat.icon} size="lg" />
              </ThemeIcon>
            </div>
          </Paper>
        ))}
      </div>

      {/* Search Filters */}
      <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-white border border-gray-200 rounded-xl sm:grid-cols-2 lg:grid-cols-5">
        <TextInput placeholder="Search by Product or Material..." leftSection={<FontAwesomeIcon icon={faFilter} />} />
        <Select placeholder="Product: All" data={['All', 'Gear Box Assembly', 'Hydraulic Pump', 'Electric Motor']} />
        <Select placeholder="Material Type: All" data={['All', 'Raw Material', 'Component', 'Pumpable Part']} />
        <Select placeholder="Status: All" data={['All', 'Stocking', 'Out of Stock', 'Low Stock']} />
        <Button variant="outline" color="gray">Clear Filters</Button>
      </div>

      {/* Material Planning Table */}
      <div className="p-4 mb-6 bg-white border border-gray-200 shadow-sm rounded-xl">
        <CustomTable
          data={planningData}
          setData={() => {}}
          isSearchingRequired={false}
          isSortingRequired={true}
          isPaginationRequired={true}
          tableHeadData={tableColumns}
          tableBody={() =>
            planningData?.data?.map((obj: any, index: number) => (
              <tr key={obj.id} className="transition border-b hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-medium text-gray-600">{index + 1}</td>
                <td className="px-3 py-2 font-mono text-sm text-blue-600">{obj.run_no}</td>
                <td className="px-3 py-2 text-sm font-medium">{obj.product_name}</td>
                <td className="px-3 py-2 text-sm">{obj.material_name}</td>
                <td className="px-3 py-2 text-sm">{obj.material_type}</td>
                <td className="px-3 py-2 text-sm">{obj.uom}</td>
                <td className="px-3 py-2 text-sm font-semibold">{formatNumber(obj.required_qty)}</td>
                <td className="px-3 py-2 text-sm">{formatNumber(obj.available_stock)}</td>
                <td className="px-3 py-2 text-sm font-semibold text-orange-600">{formatNumber(obj.to_be_purchased)}</td>
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
          url="material-planning?demo=true"
          notFoundMessage="No Material Planning Data Found."
          notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
        />
      </div>

      {/* Material Requirement Summary */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Material Requirement Summary</Title>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
              <span className="font-medium">Total Materials</span>
              <span className="text-2xl font-bold text-blue-600">1,268</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50">
              <span className="font-medium">To be Purchased</span>
              <span className="text-2xl font-bold text-orange-600">13,530</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
              <span className="font-medium">Shortage Items</span>
              <span className="text-2xl font-bold text-red-600">156</span>
            </div>
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Top Shortage Material List</Title>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Material Name</Table.Th>
                <Table.Th>Required Qty</Table.Th>
                <Table.Th>Available Stock</Table.Th>
                <Table.Th>Required Purchase</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {topShortageMaterials.map((item, idx) => (
                <Table.Tr key={idx}>
                  <Table.Td className="font-medium">{item.name}</Table.Td>
                  <Table.Td>{formatNumber(item.required_qty)}</Table.Td>
                  <Table.Td className="text-red-600">{formatNumber(item.available_stock)}</Table.Td>
                  <Table.Td className="font-semibold text-orange-600">{formatNumber(item.required_purchase)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </div>

      {/* View Material Plan Modal */}
      <Modal
        opened={viewOpened}
        onClose={() => setViewOpened(false)}
        title={`Material Planning Details | ${selectedPlan?.material_name || ''}`}
        size="xl"
        centered
      >
        {selectedPlan && (
          <div className="space-y-6">
            {/* Material Information */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-blue-50">
              <div><p className="text-sm text-gray-500">Product Name</p><p className="font-semibold">{selectedPlan.product_name}</p></div>
              <div><p className="text-sm text-gray-500">Material Name</p><p className="font-semibold">{selectedPlan.material_name}</p></div>
              <div><p className="text-sm text-gray-500">Material Code</p><p className="font-mono">{selectedPlan.material_code}</p></div>
              <div><p className="text-sm text-gray-500">Material Type</p><p className="font-semibold">{selectedPlan.material_type}</p></div>
              <div><p className="text-sm text-gray-500">Supplier</p><p className="font-semibold">{selectedPlan.supplier}</p></div>
              <div><p className="text-sm text-gray-500">UOM</p><p className="font-semibold">{selectedPlan.uom}</p></div>
              <div><p className="text-sm text-gray-500">Plan No.</p><p className="font-mono">{selectedPlan.plan_no}</p></div>
              <div><p className="text-sm text-gray-500">Status</p><Badge color={STATUS_COLORS[selectedPlan.status]}>{selectedPlan.status}</Badge></div>
              <div><p className="text-sm text-gray-500">Plan Date</p><p className="font-semibold">{selectedPlan.plan_date}</p></div>
              <div><p className="text-sm text-gray-500">Created By</p><p className="font-semibold">{selectedPlan.created_by}</p></div>
              <div><p className="text-sm text-gray-500">Created On</p><p className="font-semibold">{selectedPlan.created_on}</p></div>
            </div>

            <Divider label="Requirement Details" labelPosition="left" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Paper withBorder p="sm" className="text-center"><p className="text-sm text-gray-500">Required Qty</p><p className="text-xl font-bold">{formatNumber(selectedPlan.required_qty)}</p></Paper>
              <Paper withBorder p="sm" className="text-center"><p className="text-sm text-gray-500">Available Stock</p><p className="text-xl font-bold text-green-600">{formatNumber(selectedPlan.available_stock)}</p></Paper>
              <Paper withBorder p="sm" className="text-center"><p className="text-sm text-gray-500">Required Purchase</p><p className="text-xl font-bold text-orange-600">{formatNumber(selectedPlan.to_be_purchased)}</p></Paper>
              <Paper withBorder p="sm" className="text-center"><p className="text-sm text-gray-500">Lead Time</p><p className="text-xl font-bold">{selectedPlan.lead_time} Days</p></Paper>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-sm text-gray-500">Warehouse</p><p className="font-semibold">{selectedPlan.warehouse}</p></div>
              <div><p className="text-sm text-gray-500">Reserved Stock</p><p className="font-semibold">{formatNumber(selectedPlan.reserved_stock)}</p></div>
              <div><p className="text-sm text-gray-500">Usable Stock</p><p className="font-semibold text-green-600">{formatNumber(selectedPlan.usable_stock)}</p></div>
              <div><p className="text-sm text-gray-500">Reorder Level</p><p className="font-semibold">{formatNumber(selectedPlan.reorder_level)}</p></div>
              <div><p className="text-sm text-gray-500">Last Purchase Rate</p><p className="font-semibold">{formatCurrency(selectedPlan.last_purchase_rate)}</p></div>
              <div><p className="text-sm text-gray-500">Shortage Quantity</p><p className="font-semibold text-red-600">{formatNumber(selectedPlan.shortage_qty)}</p></div>
            </div>

            {selectedPlan.purchase_history.length > 0 && (
              <>
                <Divider label="Recent Purchase History" labelPosition="left" />
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>PO No.</Table.Th>
                      <Table.Th>Supplier</Table.Th>
                      <Table.Th>PO Date</Table.Th>
                      <Table.Th>Received Qty</Table.Th>
                      <Table.Th>Rate(₹)</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {selectedPlan.purchase_history.map((po: any, idx: number) => (
                      <Table.Tr key={idx}>
                        <Table.Td className="font-mono">{po.po_no}</Table.Td>
                        <Table.Td>{po.supplier}</Table.Td>
                        <Table.Td>{po.po_date}</Table.Td>
                        <Table.Td>{formatNumber(po.received_qty)}</Table.Td>
                        <Table.Td>{formatCurrency(po.rate)}</Table.Td>
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
                  {selectedPlan.attachments.map((doc: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                      <div className="flex items-center gap-2"><FontAwesomeIcon icon={faFileAlt} className="text-blue-500" /><span className="text-sm">{doc.name}</span><span className="text-xs text-gray-400">{doc.size}</span></div>
                      <div className="flex gap-2"><ActionIcon variant="subtle" color="blue" size="sm"><FontAwesomeIcon icon={faEye} /></ActionIcon><ActionIcon variant="subtle" color="green" size="sm"><FontAwesomeIcon icon={faDownload} /></ActionIcon></div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {selectedPlan.notes && (
              <>
                <Divider label="Material Plan Notes" labelPosition="left" />
                <Alert color="blue">
                  <p className="text-sm">{selectedPlan.notes}</p>
                </Alert>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* Create Material Plan Modal */}
      <Modal opened={createOpened} onClose={() => setCreateOpened(false)} title="Create Material Plan" size="xl" centered>
        <form onSubmit={handleAddSubmit} className="mt-2 space-y-6">
          <div>
            <Title order={5} className="mb-3 text-gray-700">Material Information</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput label="Product Name" placeholder="Enter Product Name" value={planForm.product_name} onChange={(e) => handlePlanChange('product_name', e.currentTarget.value)} required />
              <TextInput label="Material Name" placeholder="Enter Material Name" value={planForm.material_name} onChange={(e) => handlePlanChange('material_name', e.currentTarget.value)} required />
              <TextInput label="Material Code" placeholder="Enter Material Code" value={planForm.material_code} onChange={(e) => handlePlanChange('material_code', e.currentTarget.value)} />
              <Select label="Material Type" placeholder="Select Type" data={['Raw Material', 'Component', 'Pumpable Part', 'Consumable']} value={planForm.material_type} onChange={(value) => handlePlanChange('material_type', value || '')} />
              <Select label="UOM" placeholder="Select Unit" data={['Nos', 'Kg', 'Meter', 'Ltr', 'Piece']} value={planForm.uom} onChange={(value) => handlePlanChange('uom', value || '')} />
              <NumberInput label="Required Quantity" placeholder="Enter Required Quantity" value={planForm.required_qty} onChange={(value) => handlePlanChange('required_qty', Number(value) || 0)} required />
              <NumberInput label="Available Stock" placeholder="Enter Available Stock" value={planForm.available_stock} onChange={(value) => handlePlanChange('available_stock', Number(value) || 0)} />
              <TextInput label="Supplier" placeholder="Enter Supplier Name" value={planForm.supplier} onChange={(e) => handlePlanChange('supplier', e.currentTarget.value)} />
              <CustomDateInput label="Plan Date" name="plan_date" value={planForm.plan_date} onChange={(e) => handlePlanChange('plan_date', e?.currentTarget?.value || '')} />
              <TextInput label="Warehouse" placeholder="Enter Warehouse" value={planForm.warehouse} onChange={(e) => handlePlanChange('warehouse', e.currentTarget.value)} />
              <NumberInput label="Lead Time (Days)" placeholder="Enter Lead Time" value={planForm.lead_time} onChange={(value) => handlePlanChange('lead_time', Number(value) || 0)} />
              <NumberInput label="Reorder Level" placeholder="Enter Reorder Level" value={planForm.reorder_level} onChange={(value) => handlePlanChange('reorder_level', Number(value) || 0)} />
              <NumberInput label="Last Purchase Rate" placeholder="Enter Last Purchase Rate" value={planForm.last_purchase_rate} onChange={(value) => handlePlanChange('last_purchase_rate', Number(value) || 0)} leftSection="₹" />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Additional Information</Title>
            <Textarea label="Notes" placeholder="Enter any additional notes" value={planForm.notes} onChange={(e) => handlePlanChange('notes', e.currentTarget.value)} minRows={3} />
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Upload Attachments</Title>
            <FileInput placeholder="Upload files (PDF, DOC, XLS, Images)" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" value={planForm.attachments} onChange={(file) => handlePlanChange('attachments', file)} leftSection={<FontAwesomeIcon icon={faFileAlt} />} />
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
            <Button variant="outline" onClick={() => setCreateOpened(false)}>Cancel</Button>
            <Button type="submit" color="blue">Create Material Plan</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Material Plan Modal */}
      <Modal opened={editOpened} onClose={() => setEditOpened(false)} title="Edit Material Plan" size="lg" centered>
        <form onSubmit={handleEditSubmit} className="mt-2 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextInput label="Run No." value={editField.run_no} disabled />
            <TextInput label="Product Name" value={editField.product_name} onChange={(e) => handleEditChange('product_name', e.currentTarget.value)} required />
            <TextInput label="Material Name" value={editField.material_name} onChange={(e) => handleEditChange('material_name', e.currentTarget.value)} required />
            <NumberInput label="Required Quantity" value={editField.required_qty} onChange={(value) => handleEditChange('required_qty', Number(value) || 0)} />
            <Select label="Status" data={['Stocking', 'Out of Stock', 'Low Stock', 'In Transit']} value={editField.status} onChange={(value) => handleEditChange('status', value || '')} />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setEditOpened(false)}>Cancel</Button>
            <Button type="submit" color="blue">Update Plan</Button>
          </div>
        </form>
      </Modal>

      {/* Create Material Plan Button */}
      <Button
        onClick={() => setCreateOpened(true)}
        color="blue"
        size="lg"
        radius="xl"
        className="fixed shadow-lg bottom-8 right-8"
        leftSection={<FontAwesomeIcon icon={faPlus} />}
      >
        Create Plan
      </Button>
    </div>
  );
};