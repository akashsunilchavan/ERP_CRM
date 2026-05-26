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
  faCalendarAlt,
  faRupeeSign,
  faCheckCircle,
  faTimesCircle,
  faChartLine,
  faMoneyBill,
  faHardHat,
  faTools,
  faChartPie,
  faUpload,
  faFilter,
  faPrint,
  faShare,
  faPlusCircle,
  faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DUMMY_COSTING_DATA = {
  data: [
    {
      id: 'CS001',
      cost_sheet_no: 'CS0084',
      project: 'ABC Elevators',
      prepared_by: 'John Doe',
      date: '20 May, 2026',
      material_cost: 425000,
      labor_cost: 88500,
      overhead_cost: 56200,
      total_cost: 579700,
      status: 'Approved',
      cost_per_unit: 5797,
      cost_breakdown: {
        material: [
          { id: 1, category: 'Steel', description: 'TMT Bars, Angles, Plates', quantity: '2,500 kg', rate: 60, amount: 150000, percentage: 8.04 },
          { id: 2, category: 'Cement', description: 'UltraTech OPC 53 Grade', quantity: '600 bags', rate: 400, amount: 200000, percentage: 11.61 },
          { id: 3, category: 'Electrical Items', description: 'Wires, Cables, Switches', quantity: '1 Lot', rate: 45000, amount: 45000, percentage: 2.55 },
          { id: 4, category: 'Others', description: 'Consumables, Minor Items', quantity: '1 Lot', rate: 90000, amount: 90000, percentage: 1.73 },
        ],
        labor: [
          { id: 1, category: 'Skilled Labour', description: 'Technicians, Fitter', quantity: '480 Hrs', rate: 150, amount: 72000, percentage: 4.14 },
          { id: 2, category: 'Unskilled Labor', description: 'Helpers, Support Staff', quantity: '200 Hrs', rate: 55, amount: 32800, percentage: 3.72 },
          { id: 3, category: 'Site Supervisor', description: 'Supervisor Charges', quantity: '1 Lot', rate: 21000, amount: 15000, percentage: 1.44 },
        ],
        overhead: [
          { id: 1, category: 'Site Expenses', description: 'Transport, Taxes, Fuel', quantity: '1 Lot', rate: 18000, amount: 18000, percentage: 1.02 },
          { id: 2, category: 'Machinery Charges', description: 'Equipment & Tools', quantity: '1 Lot', rate: 22000, amount: 22000, percentage: 1.27 },
          { id: 3, category: 'Administrative', description: 'Office & Admin Expenses', quantity: '1 Lot', rate: 16000, amount: 16000, percentage: 0.94 },
        ],
      },
      cost_comparison: {
        material: { estimated: 462000, actual: 425000, variance: -37000, variance_percent: -8.01 },
        labor: { estimated: 165000, actual: 88500, variance: -76500, variance_percent: -46.36 },
        overhead: { estimated: 60000, actual: 56200, variance: -3800, variance_percent: -6.33 },
        total: { estimated: 687000, actual: 569700, variance: -117300, variance_percent: -17.07 },
      },
      attachments: [
        { name: 'CSM_Reference.pdf', size: '1.2 MB' },
        { name: 'Material_protocol.pdf', size: '0.8 MB' },
        { name: 'Labour_TimeChart.pdf', size: '0.5 MB' },
        { name: 'CSM_CareerPlan.pdf', size: '0.6 MB' },
      ],
    },
    {
      id: 'CS002',
      cost_sheet_no: 'CS0090',
      project: 'LMN Industries',
      prepared_by: 'Tim Doe',
      date: '19 May, 2026',
      material_cost: 380000,
      labor_cost: 85600,
      overhead_cost: 48300,
      total_cost: 513900,
      status: 'Draft',
      cost_per_unit: 15138,
      cost_breakdown: {
        material: [
          { id: 1, category: 'Raw Materials', description: 'Steel, Iron', quantity: '3,000 kg', rate: 75, amount: 225000, percentage: 14.86 },
          { id: 2, category: 'Components', description: 'Motors, Bearings', quantity: '1 Lot', rate: 155000, amount: 155000, percentage: 10.24 },
        ],
        labor: [
          { id: 1, category: 'Skilled Labour', description: 'Technicians', quantity: '400 Hrs', rate: 160, amount: 64000, percentage: 4.23 },
          { id: 2, category: 'Unskilled Labor', description: 'Helpers', quantity: '180 Hrs', rate: 120, amount: 21600, percentage: 1.43 },
        ],
        overhead: [
          { id: 1, category: 'Transport', description: 'Logistics', quantity: '1 Lot', rate: 48300, amount: 48300, percentage: 3.19 },
        ],
      },
      cost_comparison: {
        material: { estimated: 400000, actual: 380000, variance: -20000, variance_percent: -5.00 },
        labor: { estimated: 90000, actual: 85600, variance: -4400, variance_percent: -4.89 },
        overhead: { estimated: 50000, actual: 48300, variance: -1700, variance_percent: -3.40 },
        total: { estimated: 540000, actual: 513900, variance: -26100, variance_percent: -4.83 },
      },
      attachments: [],
    },
    {
      id: 'CS003',
      cost_sheet_no: 'CS0076',
      project: 'PQR Engineering',
      prepared_by: 'Joana Doe',
      date: '24 May, 2026',
      material_cost: 295000,
      labor_cost: 69400,
      overhead_cost: 36100,
      total_cost: 400500,
      status: 'Approved',
      cost_per_unit: 4005,
      cost_breakdown: {
        material: [
          { id: 1, category: 'Construction Material', description: 'Bricks, Cement', quantity: '1,000 units', rate: 295, amount: 295000, percentage: 73.66 },
        ],
        labor: [
          { id: 1, category: 'Skilled Labour', description: 'Workers', quantity: '350 Hrs', rate: 140, amount: 49000, percentage: 12.23 },
          { id: 2, category: 'Supervision', description: 'Supervisor', quantity: '1 Lot', rate: 20400, amount: 20400, percentage: 5.09 },
        ],
        overhead: [
          { id: 1, category: 'Miscellaneous', description: 'Other Expenses', quantity: '1 Lot', rate: 36100, amount: 36100, percentage: 9.01 },
        ],
      },
      cost_comparison: {
        material: { estimated: 310000, actual: 295000, variance: -15000, variance_percent: -4.84 },
        labor: { estimated: 75000, actual: 69400, variance: -5600, variance_percent: -7.47 },
        overhead: { estimated: 38000, actual: 36100, variance: -1900, variance_percent: -5.00 },
        total: { estimated: 423000, actual: 400500, variance: -22500, variance_percent: -5.32 },
      },
      attachments: [],
    },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  Approved: 'green',
  Draft: 'yellow',
  'Under Review': 'blue',
  Rejected: 'red',
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
};

interface BreakdownItem {
  id: number;
  category: string;
  description: string;
  quantity: string;
  hours: string;
  rate: number;
  estimated: number;
  percentage: number;
}

export const CostingManagement = () => {
  const [createOpened, setCreateOpened] = useState(false);
  const [viewOpened, setViewOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [selectedCostSheet, setSelectedCostSheet] = useState<any>(null);

  const [costBreakdownItems, setCostBreakdownItems] = useState<BreakdownItem[]>([
    { id: 1, category: '', description: '', quantity: '', hours: '', rate: 0, estimated: 0, percentage: 0 },
  ]);

  const [costSheetForm, setCostSheetForm] = useState({
    cost_sheet_number: '',
    date: '',
    project_name: '',
    total_material_cost: 0,
    total_labor_cost: 0,
    cost_per_unit: 0,
    total_cost: 0,
    attachments: null as File | null,
  });

  const [editField, setEditField] = useState({
    id: '',
    cost_sheet_no: '',
    project: '',
    prepared_by: '',
    date: '',
    total_cost: 0,
    status: '',
  });

  const [costingData] = useState<any>(DUMMY_COSTING_DATA);

  const handleCostSheetChange = (key: string, value: any) => {
    setCostSheetForm({ ...costSheetForm, [key]: value });
  };

  const handleBreakdownChange = (id: number, key: string, value: any) => {
    const updatedItems = costBreakdownItems.map(item => {
      if (item.id === id) {
        const updated = { ...item, [key]: value };
        if (key === 'quantity' || key === 'rate' || key === 'estimated') {
          const qty = parseFloat(updated.quantity) || 0;
          const rte = parseFloat(String(updated.rate)) || 0;
          const est = parseFloat(String(updated.estimated)) || 0;
          updated.estimated = qty * rte || est;
        }
        return updated;
      }
      return item;
    });
    setCostBreakdownItems(updatedItems);
  };

  const addBreakdownItem = () => {
    const newId = Math.max(...costBreakdownItems.map(i => i.id), 0) + 1;
    setCostBreakdownItems([...costBreakdownItems, { id: newId, category: '', description: '', quantity: '', hours: '', rate: 0, estimated: 0, percentage: 0 }]);
  };

  const removeBreakdownItem = (id: number) => {
    if (costBreakdownItems.length > 1) {
      setCostBreakdownItems(costBreakdownItems.filter(i => i.id !== id));
    }
  };

  const handleEditChange = (key: string, value: any) => {
    setEditField({ ...editField, [key]: value });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cost Sheet created:', { costSheetForm, costBreakdownItems });
    setCreateOpened(false);
    setCostBreakdownItems([{ id: 1, category: '', description: '', quantity: '', hours: '', rate: 0, estimated: 0, percentage: 0 }]);
    setCostSheetForm({
      cost_sheet_number: '',
      date: '',
      project_name: '',
      total_material_cost: 0,
      total_labor_cost: 0,
      cost_per_unit: 0,
      total_cost: 0,
      attachments: null,
    });
    alert('Cost Sheet created successfully (Demo)');
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cost Sheet updated:', editField);
    setEditOpened(false);
    alert('Cost Sheet updated successfully (Demo)');
  };

  const handleView = (obj: any) => {
    setSelectedCostSheet(obj);
    setViewOpened(true);
  };

  const handleEdit = (obj: any) => {
    setEditField({
      id: obj.id,
      cost_sheet_no: obj.cost_sheet_no,
      project: obj.project,
      prepared_by: obj.prepared_by,
      date: obj.date,
      total_cost: obj.total_cost,
      status: obj.status,
    });
    setEditOpened(true);
  };

  const handleDelete = (id: string) => {
    alert(`Delete record ${id} (Demo)`);
  };

  const tableColumns = [
    { th: { id: 'srNo', style: { minWidth: '70px', width: '70px' } }, text: 'SR NO.' },
    { text: 'Cost Sheet No.', th: { id: 'cost_sheet_no', style: { minWidth: '120px' } } },
    { text: 'Project', th: { id: 'project', style: { minWidth: '180px' } } },
    { text: 'Prepared By', th: { id: 'prepared_by', style: { minWidth: '130px' } } },
    { text: 'Date', th: { id: 'date', style: { minWidth: '100px' } } },
    { text: 'Material Cost', th: { id: 'material_cost', style: { minWidth: '130px' } } },
    { text: 'Labor Cost', th: { id: 'labor_cost', style: { minWidth: '130px' } } },
    { text: 'Overhead Cost', th: { id: 'overhead_cost', style: { minWidth: '130px' } } },
    { text: 'Total Cost', th: { id: 'total_cost', style: { minWidth: '130px' } } },
    { text: 'Actions', th: { id: 'action', style: { minWidth: '100px' } }, justifyContent: 'center' },
  ];

  const statsCards = [
    { title: 'Total Cost Sheets', value: '156', subtitle: 'This Month', icon: faFileAlt, color: 'blue' },
    { title: 'Total Material Cost', value: formatCurrency(2845750), icon: faMoneyBill, color: 'cyan' },
    { title: 'Total Labor Cost', value: formatCurrency(678400), icon: faHardHat, color: 'green' },
    { title: 'Total Overhead Cost', value: formatCurrency(324180), icon: faTools, color: 'orange' },
    { title: 'Total Cost Value', value: formatCurrency(3848330), icon: faChartLine, color: 'red' },
  ];

  const chartData = {
    series: [
      { name: 'Estimated Costs', type: 'line' as const, data: [4.2, 4.5, 4.8, 5.1, 5.4, 5.7, 6.0, 6.3, 6.6, 6.9, 7.2, 7.5] },
      { name: 'Direct Costs', type: 'line' as const, data: [3.8, 4.1, 4.3, 4.6, 4.9, 5.2, 5.5, 5.8, 6.1, 6.4, 6.7, 7.0] },
      { name: 'Overhead Costs', type: 'area' as const, data: [0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9] },
    ],
    options: {
      chart: { 
        type: 'line' as const, 
        height: 350, 
        toolbar: { show: true }, 
        zoom: { enabled: true } 
      },
      title: { text: 'Cost Trend (₹ in Lakhs)', align: 'left' as const },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
      yaxis: { title: { text: 'Cost (₹ in Lakhs)' } },
      colors: ['#3b82f6', '#f59e0b', '#10b981'],
      stroke: { width: [2, 2, 0] },
      fill: { type: ['solid', 'solid', 'solid'] },
      legend: { position: 'top' as const },
    },
  };

  const calculateTotalCost = () => {
    return costBreakdownItems.reduce((sum, item) => sum + (item.estimated || 0), 0);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header Section */}
      <div className="mb-6">
        <Title order={2} className="text-gray-800">Costing</Title>
        <p className="mt-1 text-gray-500">Manage and track all Cost sheets</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-5">
        {statsCards.map((stat, index) => (
          <Paper key={index} withBorder p="md" radius="md" className="bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-500">{stat.title}</p>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
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
        <TextInput placeholder="Search..." leftSection={<FontAwesomeIcon icon={faFilter} />} />
        <Select placeholder="Status: All" data={['All', 'Approved', 'Draft', 'Under Review', 'Rejected']} />
        <Select placeholder="Prepared By: All" data={['All', 'John Doe', 'Tim Doe', 'Joana Doe', 'Neha Sharma']} />
        <CustomDateInput placeholder="Date Range" name="date_range" />
        <Button variant="outline" color="gray">Clear Filters</Button>
      </div>

      {/* Costing Table */}
      <div className="p-4 mb-6 bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="flex justify-end mb-4">
          <Button onClick={() => setCreateOpened(true)} color="blue" leftSection={<FontAwesomeIcon icon={faPlus} />}>
            Create New Cost Sheet
          </Button>
        </div>
        <CustomTable
          data={costingData}
          setData={() => {}}
          isSearchingRequired={false}
          isSortingRequired={true}
          isPaginationRequired={true}
          tableHeadData={tableColumns}
          tableBody={() =>
            costingData?.data?.map((obj: any, index: number) => (
              <tr key={obj.id} className="transition border-b hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-medium text-gray-600">{index + 1}</td>
                <td className="px-3 py-2 text-sm font-medium text-blue-600">{obj.cost_sheet_no}</td>
                <td className="px-3 py-2 text-sm font-medium">{obj.project}</td>
                <td className="px-3 py-2 text-sm">{obj.prepared_by}</td>
                <td className="px-3 py-2 text-sm">{obj.date}</td>
                <td className="px-3 py-2 text-sm font-semibold">{formatCurrency(obj.material_cost)}</td>
                <td className="px-3 py-2 text-sm font-semibold">{formatCurrency(obj.labor_cost)}</td>
                <td className="px-3 py-2 text-sm font-semibold">{formatCurrency(obj.overhead_cost)}</td>
                <td className="px-3 py-2 text-sm font-bold text-blue-600">{formatCurrency(obj.total_cost)}</td>
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
          url="costing?demo=true"
          notFoundMessage="No Cost Sheet Data Found."
          notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
        />
      </div>

      {/* Chart and Status Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Paper withBorder p="md" radius="md" className="bg-white lg:col-span-2">
          <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div><span className="text-sm">Estimated Costs</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full"></div><span className="text-sm">Direct Costs</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div><span className="text-sm">Overhead Costs</span></div>
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={5} className="mb-4 text-gray-700">Cost Sheet Status</Title>
          <div className="flex flex-col items-center">
            <RingProgress
              size={180}
              thickness={16}
              sections={[
                { value: 23, color: 'yellow', tooltip: 'Draft - 23%' },
                { value: 61, color: 'green', tooltip: 'Approved - 61%' },
                { value: 12, color: 'blue', tooltip: 'Under Review - 12%' },
                { value: 4, color: 'red', tooltip: 'Rejected - 4%' },
              ]}
              label={
                <div className="text-center">
                  <span className="text-2xl font-bold">100%</span>
                  <span className="block text-xs text-gray-500">Total</span>
                </div>
              }
            />
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div><span className="text-sm">Draft 23%</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div><span className="text-sm">Approved 61%</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div><span className="text-sm">Under Review 12%</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span className="text-sm">Rejected 4%</span></div>
            </div>
          </div>
        </Paper>
      </div>

      {/* View Cost Sheet Modal */}
      <Modal
        opened={viewOpened}
        onClose={() => setViewOpened(false)}
        title={`${selectedCostSheet?.cost_sheet_no || ''} | ${selectedCostSheet?.project || ''}`}
        size="xl"
        centered
      >
        {selectedCostSheet && (
          <div className="space-y-6">
            <div className="flex items-start justify-between pb-4 border-b">
              <div>
                <Badge color={STATUS_COLORS[selectedCostSheet.status]} size="lg">{selectedCostSheet.status}</Badge>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Date: {selectedCostSheet.date} | Project: {selectedCostSheet.project}</p>
                </div>
                <div className="flex gap-4 mt-2">
                  <p className="text-sm">Total Material Cost: <span className="font-semibold">{formatCurrency(selectedCostSheet.material_cost)}</span></p>
                  <p className="text-sm">Total Labor Cost: <span className="font-semibold">{formatCurrency(selectedCostSheet.labor_cost)}</span></p>
                  <p className="text-sm">Total Cost: <span className="font-semibold text-blue-600">{formatCurrency(selectedCostSheet.total_cost)}</span></p>
                  <p className="text-sm">Cost Per Unit: <span className="font-semibold">{formatCurrency(selectedCostSheet.cost_per_unit)}</span></p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" leftSection={<FontAwesomeIcon icon={faDownload} />} size="sm">Export</Button>
                <Button variant="outline" leftSection={<FontAwesomeIcon icon={faPrint} />} size="sm">Print</Button>
              </div>
            </div>

            <Divider label="Cost Breakdown" labelPosition="left" />
            <div className="space-y-6">
              <div>
                <Title order={6} className="mb-3 text-gray-600">Material Cost</Title>
                <Table striped highlightOnHover>
                  <Table.Thead><Table.Tr><Table.Th>#</Table.Th><Table.Th>Category</Table.Th><Table.Th>Description</Table.Th><Table.Th>Quantity / Hours</Table.Th><Table.Th>Rate (₹)</Table.Th><Table.Th>Amount (₹)</Table.Th><Table.Th>% of Total</Table.Th></Table.Tr></Table.Thead>
                  <Table.Tbody>
                    {selectedCostSheet.cost_breakdown.material.map((item: any, idx: number) => (
                      <Table.Tr key={idx}><Table.Td>{idx + 1}</Table.Td><Table.Td><strong>{item.category}</strong></Table.Td><Table.Td>{item.description}</Table.Td><Table.Td>{item.quantity}</Table.Td><Table.Td>{formatCurrency(item.rate)}</Table.Td><Table.Td>{formatCurrency(item.amount)}</Table.Td><Table.Td>{item.percentage}%</Table.Td></Table.Tr>
                    ))}
                    <Table.Tr className="font-bold bg-gray-50"><Table.Td colSpan={5}>Total Material Cost</Table.Td><Table.Td>{formatCurrency(selectedCostSheet.material_cost)}</Table.Td><Table.Td>{((selectedCostSheet.material_cost / selectedCostSheet.total_cost) * 100).toFixed(2)}%</Table.Td></Table.Tr>
                  </Table.Tbody>
                </Table>
              </div>
              <div>
                <Title order={6} className="mb-3 text-gray-600">Labor Cost</Title>
                <Table striped highlightOnHover>
                  <Table.Thead><Table.Tr><Table.Th>#</Table.Th><Table.Th>Category</Table.Th><Table.Th>Description</Table.Th><Table.Th>Quantity / Hours</Table.Th><Table.Th>Rate (₹)</Table.Th><Table.Th>Amount (₹)</Table.Th><Table.Th>% of Total</Table.Th></Table.Tr></Table.Thead>
                  <Table.Tbody>
                    {selectedCostSheet.cost_breakdown.labor.map((item: any, idx: number) => (
                      <Table.Tr key={idx}><Table.Td>{idx + 1}</Table.Td><Table.Td><strong>{item.category}</strong></Table.Td><Table.Td>{item.description}</Table.Td><Table.Td>{item.quantity}</Table.Td><Table.Td>{formatCurrency(item.rate)}</Table.Td><Table.Td>{formatCurrency(item.amount)}</Table.Td><Table.Td>{item.percentage}%</Table.Td></Table.Tr>
                    ))}
                    <Table.Tr className="font-bold bg-gray-50"><Table.Td colSpan={5}>Total Labor Cost</Table.Td><Table.Td>{formatCurrency(selectedCostSheet.labor_cost)}</Table.Td><Table.Td>{((selectedCostSheet.labor_cost / selectedCostSheet.total_cost) * 100).toFixed(2)}%</Table.Td></Table.Tr>
                  </Table.Tbody>
                </Table>
              </div>
              <div>
                <Title order={6} className="mb-3 text-gray-600">Overhead Cost</Title>
                <Table striped highlightOnHover>
                  <Table.Thead><Table.Tr><Table.Th>#</Table.Th><Table.Th>Category</Table.Th><Table.Th>Description</Table.Th><Table.Th>Quantity / Hours</Table.Th><Table.Th>Rate (₹)</Table.Th><Table.Th>Amount (₹)</Table.Th><Table.Th>% of Total</Table.Th></Table.Tr></Table.Thead>
                  <Table.Tbody>
                    {selectedCostSheet.cost_breakdown.overhead.map((item: any, idx: number) => (
                      <Table.Tr key={idx}><Table.Td>{idx + 1}</Table.Td><Table.Td><strong>{item.category}</strong></Table.Td><Table.Td>{item.description}</Table.Td><Table.Td>{item.quantity}</Table.Td><Table.Td>{formatCurrency(item.rate)}</Table.Td><Table.Td>{formatCurrency(item.amount)}</Table.Td><Table.Td>{item.percentage}%</Table.Td></Table.Tr>
                    ))}
                    <Table.Tr className="font-bold bg-gray-50"><Table.Td colSpan={5}>Total Overhead Cost</Table.Td><Table.Td>{formatCurrency(selectedCostSheet.overhead_cost)}</Table.Td><Table.Td>{((selectedCostSheet.overhead_cost / selectedCostSheet.total_cost) * 100).toFixed(2)}%</Table.Td></Table.Tr>
                  </Table.Tbody>
                </Table>
              </div>
            </div>

            <Divider label="Cost Comparison" labelPosition="left" />
            <Table striped highlightOnHover>
              <Table.Thead><Table.Tr><Table.Th>Particulars</Table.Th><Table.Th>Estimated (₹)</Table.Th><Table.Th>Actual (₹)</Table.Th><Table.Th>Variance (₹)</Table.Th><Table.Th>Variance (%)</Table.Th></Table.Tr></Table.Thead>
              <Table.Tbody>
                <Table.Tr><Table.Td>Material Cost</Table.Td><Table.Td>{formatCurrency(selectedCostSheet.cost_comparison.material.estimated)}</Table.Td><Table.Td>{formatCurrency(selectedCostSheet.cost_comparison.material.actual)}</Table.Td><Table.Td className={selectedCostSheet.cost_comparison.material.variance >= 0 ? 'text-green-600' : 'text-red-600'}>{formatCurrency(selectedCostSheet.cost_comparison.material.variance)}</Table.Td><Table.Td className={selectedCostSheet.cost_comparison.material.variance_percent >= 0 ? 'text-green-600' : 'text-red-600'}>{selectedCostSheet.cost_comparison.material.variance_percent}%</Table.Td></Table.Tr>
                <Table.Tr><Table.Td>Labor Cost</Table.Td><Table.Td>{formatCurrency(selectedCostSheet.cost_comparison.labor.estimated)}</Table.Td><Table.Td>{formatCurrency(selectedCostSheet.cost_comparison.labor.actual)}</Table.Td><Table.Td className={selectedCostSheet.cost_comparison.labor.variance >= 0 ? 'text-green-600' : 'text-red-600'}>{formatCurrency(selectedCostSheet.cost_comparison.labor.variance)}</Table.Td><Table.Td className={selectedCostSheet.cost_comparison.labor.variance_percent >= 0 ? 'text-green-600' : 'text-red-600'}>{selectedCostSheet.cost_comparison.labor.variance_percent}%</Table.Td></Table.Tr>
                <Table.Tr><Table.Td>Overhead Cost</Table.Td><Table.Td>{formatCurrency(selectedCostSheet.cost_comparison.overhead.estimated)}</Table.Td><Table.Td>{formatCurrency(selectedCostSheet.cost_comparison.overhead.actual)}</Table.Td><Table.Td className={selectedCostSheet.cost_comparison.overhead.variance >= 0 ? 'text-green-600' : 'text-red-600'}>{formatCurrency(selectedCostSheet.cost_comparison.overhead.variance)}</Table.Td><Table.Td className={selectedCostSheet.cost_comparison.overhead.variance_percent >= 0 ? 'text-green-600' : 'text-red-600'}>{selectedCostSheet.cost_comparison.overhead.variance_percent}%</Table.Td></Table.Tr>
                <Table.Tr className="font-bold bg-gray-50"><Table.Td>Total Cost</Table.Td><Table.Td>{formatCurrency(selectedCostSheet.cost_comparison.total.estimated)}</Table.Td><Table.Td>{formatCurrency(selectedCostSheet.cost_comparison.total.actual)}</Table.Td><Table.Td>{formatCurrency(selectedCostSheet.cost_comparison.total.variance)}</Table.Td><Table.Td>{selectedCostSheet.cost_comparison.total.variance_percent}%</Table.Td></Table.Tr>
              </Table.Tbody>
            </Table>

            {selectedCostSheet.attachments.length > 0 && (
              <>
                <Divider label="Attachments" labelPosition="left" />
                <div className="space-y-2">
                  {selectedCostSheet.attachments.map((doc: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                      <div className="flex items-center gap-2"><FontAwesomeIcon icon={faFileAlt} className="text-blue-500" /><span className="text-sm">{doc.name}</span><span className="text-xs text-gray-400">{doc.size}</span></div>
                      <div className="flex gap-2"><ActionIcon variant="subtle" color="blue" size="sm"><FontAwesomeIcon icon={faEye} /></ActionIcon><ActionIcon variant="subtle" color="green" size="sm"><FontAwesomeIcon icon={faDownload} /></ActionIcon></div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* Create Cost Sheet Modal */}
      <Modal opened={createOpened} onClose={() => setCreateOpened(false)} title="Create Cost Sheet" size="xl" centered>
        <form onSubmit={handleAddSubmit} className="mt-2 space-y-6">
          <div>
            <Title order={5} className="mb-3 text-gray-700">Cost Sheet Details</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput label="Cost Sheet Number" placeholder="CS0000" value={costSheetForm.cost_sheet_number} onChange={(e) => handleCostSheetChange('cost_sheet_number', e.currentTarget.value)} required />
              <CustomDateInput label="Date" name="date" value={costSheetForm.date} onChange={(e) => handleCostSheetChange('date', e?.currentTarget?.value || '')} />
              <TextInput label="Project Name" placeholder="Enter Project Name" value={costSheetForm.project_name} onChange={(e) => handleCostSheetChange('project_name', e.currentTarget.value)} required />
              <NumberInput label="Total Material Cost" placeholder="Total Material Cost" value={costSheetForm.total_material_cost} onChange={(value) => handleCostSheetChange('total_material_cost', Number(value) || 0)} leftSection="₹" />
              <NumberInput label="Total Labor Cost" placeholder="Total Labor Cost" value={costSheetForm.total_labor_cost} onChange={(value) => handleCostSheetChange('total_labor_cost', Number(value) || 0)} leftSection="₹" />
              <NumberInput label="Cost Per Unit" placeholder="Cost Per Unit" value={costSheetForm.cost_per_unit} onChange={(value) => handleCostSheetChange('cost_per_unit', Number(value) || 0)} leftSection="₹" />
              <NumberInput label="Total Cost" placeholder="Total Cost" value={costSheetForm.total_cost} onChange={(value) => handleCostSheetChange('total_cost', Number(value) || 0)} leftSection="₹" />
            </div>
          </div>

          <Divider />

          <div>
            <div className="flex items-center justify-between mb-3"><Title order={5} className="text-gray-700">Cost Breakdown</Title><Button size="xs" variant="light" leftSection={<FontAwesomeIcon icon={faPlusCircle} />} onClick={addBreakdownItem}>Add More Category</Button></div>
            <div className="space-y-3">
              {costBreakdownItems.map((item) => (
                <Paper key={item.id} withBorder p="md" className="relative">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                    <Select label="Cost Category" placeholder="Select Category" data={['Material Cost', 'Labor Cost', 'Overhead Cost']} value={item.category} onChange={(value) => handleBreakdownChange(item.id, 'category', value || '')} />
                    <TextInput label="Description" placeholder="Description" value={item.description} onChange={(e) => handleBreakdownChange(item.id, 'description', e.currentTarget.value)} />
                    <TextInput label="Quantity / Hours" placeholder="Quantity" value={item.quantity} onChange={(e) => handleBreakdownChange(item.id, 'quantity', e.currentTarget.value)} />
                    <NumberInput label="Rate (₹)" placeholder="Rate" value={item.rate} onChange={(value) => handleBreakdownChange(item.id, 'rate', Number(value) || 0)} />
                    <NumberInput label="Estimated (₹)" placeholder="Estimated Amount" value={item.estimated} onChange={(value) => handleBreakdownChange(item.id, 'estimated', Number(value) || 0)} />
                    <NumberInput label="Percentage of Total" placeholder="%" value={item.percentage} onChange={(value) => handleBreakdownChange(item.id, 'percentage', Number(value) || 0)} min={0} max={100} />
                  </div>
                  {costBreakdownItems.length > 1 && (<ActionIcon color="red" variant="subtle" onClick={() => removeBreakdownItem(item.id)} className="absolute top-2 right-2"><FontAwesomeIcon icon={faMinusCircle} /></ActionIcon>)}
                </Paper>
              ))}
            </div>
            <div className="mt-4 text-right"><p className="text-lg font-bold">Total Estimated Cost: {formatCurrency(calculateTotalCost())}</p></div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Upload Files</Title>
            <FileInput placeholder="Drag & Drop files here or click to upload" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.svg" value={costSheetForm.attachments} onChange={(file) => handleCostSheetChange('attachments', file)} leftSection={<FontAwesomeIcon icon={faUpload} />} />
            <p className="mt-1 text-xs text-gray-400">Upload a file (DOC, DOCX, PDF, JPEG, PNG, SVG)</p>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
            <Button variant="outline" onClick={() => setCreateOpened(false)}>Cancel</Button>
            <Button type="submit" color="blue">Add Cost Sheet</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Cost Sheet Modal */}
      <Modal opened={editOpened} onClose={() => setEditOpened(false)} title="Edit Cost Sheet" size="lg" centered>
        <form onSubmit={handleEditSubmit} className="mt-2 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextInput label="Cost Sheet No." value={editField.cost_sheet_no} disabled />
            <TextInput label="Project" value={editField.project} onChange={(e) => handleEditChange('project', e.currentTarget.value)} required />
            <TextInput label="Prepared By" value={editField.prepared_by} onChange={(e) => handleEditChange('prepared_by', e.currentTarget.value)} />
            <CustomDateInput label="Date" name="date" value={editField.date} onChange={(e) => handleEditChange('date', e?.currentTarget?.value || '')} />
            <NumberInput label="Total Cost" value={editField.total_cost} onChange={(value) => handleEditChange('total_cost', Number(value) || 0)} leftSection="₹" />
            <Select label="Status" data={['Approved', 'Draft', 'Under Review', 'Rejected']} value={editField.status} onChange={(value) => handleEditChange('status', value || '')} />
          </div>
          <div className="flex justify-end gap-3 mt-4"><Button variant="outline" onClick={() => setEditOpened(false)}>Cancel</Button><Button type="submit" color="blue">Update Cost Sheet</Button></div>
        </form>
      </Modal>

    </div>
  );
};