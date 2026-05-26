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
  Tabs,
  Avatar,
  RingProgress,
  SimpleGrid,
  Rating,
  Chip,
  Checkbox,
  Switch,
  Accordion,
  Timeline,
  Stepper,
  Spoiler,
  Kbd,
  Breadcrumbs,
  Pagination,
  Affix,
  Transition,
  Loader,
  Skeleton,
  Notification,
  Popover,
  HoverCard,
  ScrollArea,
  Indicator,
  ColorSwatch,
  ColorPicker,
  Slider,
  SegmentedControl,
  Radio,
  NativeSelect,
  MultiSelect,
  TagsInput,
  JsonInput,
  CopyButton,
  ThemeIconProps,
  Menu,
  AvatarGroup,
  TimelineItem,
  StepperCompleted,
  SpoilerProps,
  PaginationProps,
  AffixProps,
  TransitionProps,
  LoaderProps,
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
  faChartPie,
  faChartBar,
  faChartSimple,
  faMagnifyingGlass,
  faArrowUp,
  faArrowDown,
  faArrowRight,
  faArrowLeft,
  faUpload,
  faLink,
  faLock,
  faUnlock,
  faStar,
  faStarHalfAlt,
  faHeart,
  faThumbsUp,
  faThumbsDown,
  faShare,
  faBookmark,
  faFlag,
  faBell,
  faEnvelope,
  faPhone,
  faLocationDot,
  faClock,
  faHistory,
  faCopy,
  faCut,
  faPaste,
  faSave,
  faUndo,
  faRedo,
  faSearch,
  faSlidersH,
  faSort,
  faSortUp,
  faSortDown,
  faColumns,
  faTable,
  faThLarge,
  faTh,
  faBars,
  faEllipsisV,
  faEllipsisH,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
  faTimes,
  faMinus,
  faPlusCircle,
  faMinusCircle,
  faInfoCircle,
  faQuestionCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faCheck,
  faCheckDouble,
  faXmark,
  faXmarkCircle,
  faBan,
  faStop,
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
  faFastForward,
  faFastBackward,
  faForward,
  faBackward,
} from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';

// Extended dummy data for Material Planning with more realistic scenarios
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
      stock_status_percent: 65,
      priority: 'High',
      category: 'Metal',
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
      production_plan: {
        week1: 2000,
        week2: 2500,
        week3: 2000,
        week4: 1500,
      },
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
      status: 'Low Stock',
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
      stock_status_percent: 12,
      priority: 'Critical',
      category: 'Bearing',
      purchase_history: [],
      attachments: [],
      notes: 'Urgent requirement - priority order',
      production_plan: {
        week1: 300,
        week2: 250,
        week3: 150,
        week4: 100,
      },
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
      stock_status_percent: 50,
      priority: 'Medium',
      category: 'Metal',
      purchase_history: [],
      attachments: [],
      notes: '',
      production_plan: {
        week1: 800,
        week2: 700,
        week3: 600,
        week4: 400,
      },
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
      status: 'Out of Stock',
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
      stock_status_percent: 25,
      priority: 'High',
      category: 'Wire',
      purchase_history: [],
      attachments: [],
      notes: '',
      production_plan: {
        week1: 400,
        week2: 300,
        week3: 200,
        week4: 100,
      },
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
      status: 'In Transit',
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
      stock_status_percent: 15,
      priority: 'Critical',
      category: 'Motor',
      purchase_history: [],
      attachments: [],
      notes: '',
      production_plan: {
        week1: 400,
        week2: 350,
        week3: 300,
        week4: 150,
      },
    },
    {
      id: 'MP006',
      run_no: '101-1021',
      product_name: 'Cooling Fan Assembly',
      material_name: 'Aluminum Sheet 5mm',
      material_code: 'RM-ALUM-006',
      material_type: 'Raw Material',
      uom: 'Nos',
      required_qty: 3000,
      available_stock: 2800,
      to_be_purchased: 200,
      status: 'Stocking',
      supplier: 'Aluminum Industries',
      plan_no: 'MP-1006',
      plan_date: '07 May, 2026',
      created_by: 'Manager',
      created_on: '05 May, 2026',
      lead_time: 4,
      warehouse: 'Main Warehouse',
      reserved_stock: 200,
      usable_stock: 2600,
      reorder_level: 500,
      last_purchase_rate: 45.00,
      shortage_qty: 200,
      stock_status_percent: 93,
      priority: 'Low',
      category: 'Metal',
      purchase_history: [
        { po_no: 'PO-7890', supplier: 'AlumCo', po_date: '25 April, 2026', received_qty: 3000, rate: 45.00 },
      ],
      attachments: [],
      notes: 'Stock is sufficient for next month',
      production_plan: {
        week1: 1000,
        week2: 800,
        week3: 700,
        week4: 500,
      },
    },
    {
      id: 'MP007',
      run_no: '101-1023',
      product_name: 'Control Panel',
      material_name: 'PCB Board',
      material_code: 'CMP-PCB-007',
      material_type: 'Component',
      uom: 'Nos',
      required_qty: 500,
      available_stock: 50,
      to_be_purchased: 450,
      status: 'Low Stock',
      supplier: 'Electro Components',
      plan_no: 'MP-1007',
      plan_date: '08 May, 2026',
      created_by: 'Admin',
      created_on: '06 May, 2026',
      lead_time: 14,
      warehouse: 'Electronic Warehouse',
      reserved_stock: 10,
      usable_stock: 40,
      reorder_level: 100,
      last_purchase_rate: 350.00,
      shortage_qty: 450,
      stock_status_percent: 10,
      priority: 'High',
      category: 'Electronic',
      purchase_history: [],
      attachments: [{ name: 'PCB_Specification.pdf', size: '2.1 MB' }],
      notes: 'Long lead time, place order immediately',
      production_plan: {
        week1: 150,
        week2: 150,
        week3: 100,
        week4: 100,
      },
    },
    {
      id: 'MP008',
      run_no: '101-1025',
      product_name: 'Gear Box Assembly',
      material_name: 'Lubricant Oil',
      material_code: 'RM-OIL-008',
      material_type: 'Consumable',
      uom: 'Ltr',
      required_qty: 500,
      available_stock: 300,
      to_be_purchased: 200,
      status: 'Stocking',
      supplier: 'PetroChem Ltd',
      plan_no: 'MP-1008',
      plan_date: '09 May, 2026',
      created_by: 'Store Manager',
      created_on: '07 May, 2026',
      lead_time: 3,
      warehouse: 'Chemical Warehouse',
      reserved_stock: 50,
      usable_stock: 250,
      reorder_level: 100,
      last_purchase_rate: 120.00,
      shortage_qty: 200,
      stock_status_percent: 60,
      priority: 'Medium',
      category: 'Chemical',
      purchase_history: [],
      attachments: [],
      notes: 'Bulk order discount available',
      production_plan: {
        week1: 150,
        week2: 150,
        week3: 100,
        week4: 100,
      },
    },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  Stocking: 'green',
  'Out of Stock': 'red',
  'Low Stock': 'orange',
  'In Transit': 'blue',
};

const PRIORITY_COLORS: Record<string, string> = {
  Critical: 'red',
  High: 'orange',
  Medium: 'yellow',
  Low: 'blue',
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-IN').format(value);
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(value);
};

export const MaterialPlanning = () => {
  const [createOpened, setCreateOpened] = useState(false);
  const [viewOpened, setViewOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string | null>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>('All');
  const [selectedMaterialType, setSelectedMaterialType] = useState<string | null>('All');
  const [selectedStatus, setSelectedStatus] = useState<string | null>('All');
  const [selectedPriority, setSelectedPriority] = useState<string | null>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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
    priority: '',
    category: '',
  });

  const [editField, setEditField] = useState({
    id: '',
    run_no: '',
    product_name: '',
    material_name: '',
    required_qty: 0,
    status: '',
    priority: '',
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
      priority: '',
      category: '',
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
      priority: obj.priority || 'Medium',
    });
    setEditOpened(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this material plan?')) {
      alert(`Delete record ${id} (Demo)`);
    }
  };

  // Filter data based on search and filters
  const filteredData = planningData?.data?.filter((item: any) => {
    const matchesSearch = searchQuery === '' || 
      item.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material_code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProduct = selectedProduct === 'All' || item.product_name === selectedProduct;
    const matchesMaterialType = selectedMaterialType === 'All' || item.material_type === selectedMaterialType;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    const matchesPriority = selectedPriority === 'All' || item.priority === selectedPriority;
    return matchesSearch && matchesProduct && matchesMaterialType && matchesStatus && matchesPriority;
  });

  // Pagination logic
  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedProduct, selectedMaterialType, selectedStatus, selectedPriority]);

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
    { text: 'Stock %', th: { id: 'stock_percent', style: { minWidth: '100px' } } },
    { text: 'Priority', th: { id: 'priority', style: { minWidth: '90px' } } },
    { text: 'Status', th: { id: 'status', style: { minWidth: '100px' } } },
    { text: 'Actions', th: { id: 'action', style: { minWidth: '100px' } }, justifyContent: 'center' },
  ];

  const statsCards = [
    { title: 'Total Materials', value: formatNumber(planningData?.data?.length || 0), subtitle: 'Active Items', icon: faBox, color: 'blue', trend: '+12%', trendUp: true },
    { title: 'Total Required Qty', value: formatNumber(planningData?.data?.reduce((acc: number, curr: any) => acc + curr.required_qty, 0) || 0), subtitle: 'Units', icon: faCube, color: 'cyan', trend: '+8%', trendUp: true },
    { title: 'Available Stock', value: formatNumber(planningData?.data?.reduce((acc: number, curr: any) => acc + curr.available_stock, 0) || 0), subtitle: 'Units', icon: faWarehouse, color: 'green', trend: '-5%', trendUp: false },
    { title: 'To be Purchased', value: formatNumber(planningData?.data?.reduce((acc: number, curr: any) => acc + curr.to_be_purchased, 0) || 0), subtitle: 'Units', icon: faTruck, color: 'orange', trend: '+15%', trendUp: true },
    { title: 'Shortage Items', value: planningData?.data?.filter((item: any) => item.status === 'Out of Stock' || item.status === 'Low Stock').length || 0, subtitle: 'Critical Items', icon: faWarning, color: 'red', trend: '+3', trendUp: true },
  ];

  const getUniqueValues = (key: string) => {
    const values = planningData?.data?.map((item: any) => item[key]) || [];
    return ['All', ...new Set(values.filter(Boolean))];
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header Section with Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs className="mb-2">
          <a href="#" className="text-gray-500 hover:text-blue-600">Dashboard</a>
          <a href="#" className="text-gray-500 hover:text-blue-600">Inventory</a>
          <span className="font-semibold text-gray-800">Material Planning</span>
        </Breadcrumbs>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Title order={2} className="text-gray-800">Material Planning</Title>
            <p className="mt-1 text-gray-500">Plan and track material requirements for production</p>
          </div>
          <Button
            onClick={() => setCreateOpened(true)}
            color="blue"
            leftSection={<FontAwesomeIcon icon={faPlus} />}
            size="md"
            className="transition-shadow shadow-md hover:shadow-lg"
          >
            Create Material Plan
          </Button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-5">
        {statsCards.map((stat, index) => (
          <Paper key={index} withBorder p="md" radius="md" className="transition-shadow bg-white hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  <p className="text-xs text-gray-400">{stat.subtitle}</p>
                  <span className={`text-xs ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
              <ThemeIcon color={stat.color} size="lg" radius="xl" variant="light">
                <FontAwesomeIcon icon={stat.icon} size="lg" />
              </ThemeIcon>
            </div>
          </Paper>
        ))}
      </div>

      {/* Tabs for different views */}
      <Tabs value={activeTab} onChange={setActiveTab} className="mb-6">
        <Tabs.List>
          <Tabs.Tab value="all" leftSection={<FontAwesomeIcon icon={faList} />}>All Materials</Tabs.Tab>
          <Tabs.Tab value="critical" leftSection={<FontAwesomeIcon icon={faExclamationTriangle} />}>Critical Stock</Tabs.Tab>
          <Tabs.Tab value="lowstock" leftSection={<FontAwesomeIcon icon={faWarning} />}>Low Stock</Tabs.Tab>
          <Tabs.Tab value="intransit" leftSection={<FontAwesomeIcon icon={faTruck} />}>In Transit</Tabs.Tab>
          <Tabs.Tab value="stocking" leftSection={<FontAwesomeIcon icon={faCheckCircle} />}>Stocking</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {/* Advanced Search and Filters */}
      <div className="grid grid-cols-1 gap-4 p-5 mb-6 bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-semibold text-gray-700">Filters</h3>
          <Button variant="subtle" size="xs" color="gray" onClick={() => {
            setSearchQuery('');
            setSelectedProduct('All');
            setSelectedMaterialType('All');
            setSelectedStatus('All');
            setSelectedPriority('All');
          }}>
            Clear All
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <TextInput 
            placeholder="Search by Product or Material..." 
            leftSection={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
          />
          <Select 
            placeholder="Product" 
            data={getUniqueValues('product_name')} 
            value={selectedProduct}
            onChange={setSelectedProduct}
          />
          <Select 
            placeholder="Material Type" 
            data={getUniqueValues('material_type')} 
            value={selectedMaterialType}
            onChange={setSelectedMaterialType}
          />
          <Select 
            placeholder="Status" 
            data={getUniqueValues('status')} 
            value={selectedStatus}
            onChange={setSelectedStatus}
          />
          <Select 
            placeholder="Priority" 
            data={getUniqueValues('priority')} 
            value={selectedPriority}
            onChange={setSelectedPriority}
          />
        </div>
      </div>

      {/* Material Planning Table */}
      <div className="p-4 mb-6 bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Showing {paginatedData?.length || 0} of {filteredData?.length || 0} records</p>
          </div>
          <div className="flex gap-2">
            <Button variant="light" size="xs" leftSection={<FontAwesomeIcon icon={faDownload} />}>Export</Button>
            <Button variant="light" size="xs" leftSection={<FontAwesomeIcon icon={faPrint} />}>Print</Button>
          </div>
        </div>
        <CustomTable
          data={{ data: paginatedData || [] }}
          setData={() => {}}
          isSearchingRequired={false}
          isSortingRequired={true}
          isPaginationRequired={false}
          tableHeadData={tableColumns}
          tableBody={() =>
            paginatedData?.map((obj: any, index: number) => (
              <tr key={obj.id} className="transition border-b hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-medium text-gray-600">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-3 py-2 font-mono text-sm text-blue-600">{obj.run_no}</td>
                <td className="px-3 py-2 text-sm font-medium">{obj.product_name}</td>
                <td className="px-3 py-2 text-sm">{obj.material_name}</td>
                <td className="px-3 py-2 text-sm">
                  <Badge variant="outline" color="gray">{obj.material_type}</Badge>
                </td>
                <td className="px-3 py-2 text-sm">{obj.uom}</td>
                <td className="px-3 py-2 text-sm font-semibold">{formatNumber(obj.required_qty)}</td>
                <td className="px-3 py-2 text-sm">{formatNumber(obj.available_stock)}</td>
                <td className="px-3 py-2 text-sm font-semibold text-orange-600">{formatNumber(obj.to_be_purchased)}</td>
                <td className="w-24 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Progress value={obj.stock_status_percent} size="sm" className="flex-1" color={obj.stock_status_percent < 30 ? 'red' : obj.stock_status_percent < 60 ? 'orange' : 'green'} />
                    <span className="text-xs font-medium">{obj.stock_status_percent}%</span>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <Badge color={PRIORITY_COLORS[obj.priority]} variant="light">{obj.priority}</Badge>
                </td>
                <td className="px-3 py-2">
                  <Badge color={STATUS_COLORS[obj.status]} variant="light">{obj.status}</Badge>
                </td>
                <td className="px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-1">
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
        {totalPages > 1 && (
          <div className="flex justify-end mt-4">
            <Pagination total={totalPages} value={currentPage} onChange={setCurrentPage} />
          </div>
        )}
      </div>

      {/* Material Requirement Summary & Charts Section */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <div className="flex items-center justify-between mb-4">
            <Title order={4} className="text-gray-700">Material Requirement Summary</Title>
            <FontAwesomeIcon icon={faChartPie} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
              <span className="font-medium">Total Materials</span>
              <span className="text-2xl font-bold text-blue-600">{formatNumber(planningData?.data?.length || 0)}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50">
              <span className="font-medium">To be Purchased (Qty)</span>
              <span className="text-2xl font-bold text-orange-600">{formatNumber(planningData?.data?.reduce((acc: number, curr: any) => acc + curr.to_be_purchased, 0) || 0)}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
              <span className="font-medium">Shortage Items</span>
              <span className="text-2xl font-bold text-red-600">{planningData?.data?.filter((item: any) => item.status === 'Out of Stock' || item.status === 'Low Stock').length || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
              <span className="font-medium">Stock Value</span>
              <span className="text-2xl font-bold text-green-600">{formatCurrency(planningData?.data?.reduce((acc: number, curr: any) => acc + (curr.available_stock * curr.last_purchase_rate), 0) || 0)}</span>
            </div>
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <div className="flex items-center justify-between mb-4">
            <Title order={4} className="text-gray-700">Top Shortage Material List</Title>
            <FontAwesomeIcon icon={faChartBar} className="text-gray-400" />
          </div>
          <div className="space-y-3">
            {planningData?.data?.filter((item: any) => item.shortage_qty > 0).sort((a: any, b: any) => b.shortage_qty - a.shortage_qty).slice(0, 5).map((item: any, idx: number) => (
              <div key={idx} className="p-3 transition-colors border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{item.material_name}</span>
                  <Badge color="red" size="sm">Shortage: {formatNumber(item.shortage_qty)}</Badge>
                </div>
                <Progress value={(item.available_stock / item.required_qty) * 100} size="sm" color="red" />
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>Required: {formatNumber(item.required_qty)}</span>
                  <span>Available: {formatNumber(item.available_stock)}</span>
                </div>
              </div>
            ))}
          </div>
        </Paper>
      </div>

      {/* Production Plan Preview */}
      <Paper withBorder p="md" radius="md" className="mb-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <Title order={4} className="text-gray-700">Production Plan Overview</Title>
          <Button variant="light" size="xs">View All</Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {planningData?.data?.slice(0, 4).map((item: any, idx: number) => (
            <Card key={idx} withBorder padding="sm" radius="md">
              <div className="flex items-center justify-between mb-2">
                <select>{item.material_name}</select>
                <Badge size="sm" color={PRIORITY_COLORS[item.priority]}>{item.priority}</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Week 1</span>
                  <span className="font-medium">{formatNumber(item.production_plan?.week1 || 0)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Week 2</span>
                  <span className="font-medium">{formatNumber(item.production_plan?.week2 || 0)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Week 3</span>
                  <span className="font-medium">{formatNumber(item.production_plan?.week3 || 0)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Week 4</span>
                  <span className="font-medium">{formatNumber(item.production_plan?.week4 || 0)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Paper>

      {/* View Material Plan Modal - Enhanced */}
      <Modal
        opened={viewOpened}
        onClose={() => setViewOpened(false)}
        title={
          <div className="flex items-center gap-2">
            <ThemeIcon color="blue" size="md" radius="xl" variant="light">
              <FontAwesomeIcon icon={faEye} />
            </ThemeIcon>
            <span>Material Planning Details | {selectedPlan?.material_name || ''}</span>
          </div>
        }
        size="xl"
        centered
        scrollAreaComponent={ScrollArea}
      >
        {selectedPlan && (
          <ScrollArea h="70vh">
            <div className="pr-3 space-y-6">
              {/* Header with Status and Priority */}
              <div className="flex items-start justify-between p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                <div>
                  <p className="text-sm text-gray-500">Plan No.</p>
                  <p className="font-mono text-xl font-bold text-blue-700">{selectedPlan.plan_no}</p>
                </div>
                <div className="text-right">
                  <Badge color={STATUS_COLORS[selectedPlan.status]} size="lg">{selectedPlan.status}</Badge>
                  <Badge color={PRIORITY_COLORS[selectedPlan.priority]} size="lg" className="ml-2">{selectedPlan.priority}</Badge>
                </div>
              </div>

              {/* Material Information */}
              <div>
                <Title order={5} className="flex items-center gap-2 mb-3 text-gray-700">
                  <FontAwesomeIcon icon={faBox} className="text-blue-500" /> Material Information
                </Title>
                <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-gray-50">
                  <div><p className="text-sm text-gray-500">Product Name</p><p className="font-semibold">{selectedPlan.product_name}</p></div>
                  <div><p className="text-sm text-gray-500">Material Name</p><p className="font-semibold">{selectedPlan.material_name}</p></div>
                  <div><p className="text-sm text-gray-500">Material Code</p><p className="font-mono text-blue-600">{selectedPlan.material_code}</p></div>
                  <div><p className="text-sm text-gray-500">Material Type</p><Badge variant="outline">{selectedPlan.material_type}</Badge></div>
                  <div><p className="text-sm text-gray-500">Supplier</p><p className="font-semibold">{selectedPlan.supplier}</p></div>
                  <div><p className="text-sm text-gray-500">UOM</p><p className="font-semibold">{selectedPlan.uom}</p></div>
                  <div><p className="text-sm text-gray-500">Plan Date</p><p className="font-semibold">{selectedPlan.plan_date}</p></div>
                  <div><p className="text-sm text-gray-500">Created By</p><p className="font-semibold">{selectedPlan.created_by}</p></div>
                </div>
              </div>

              <Divider label="Requirement Details" labelPosition="left" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Paper withBorder p="sm" className="text-center">
                  <p className="text-sm text-gray-500">Required Qty</p>
                  <p className="text-xl font-bold">{formatNumber(selectedPlan.required_qty)}</p>
                </Paper>
                <Paper withBorder p="sm" className="text-center">
                  <p className="text-sm text-gray-500">Available Stock</p>
                  <p className="text-xl font-bold text-green-600">{formatNumber(selectedPlan.available_stock)}</p>
                </Paper>
                <Paper withBorder p="sm" className="text-center">
                  <p className="text-sm text-gray-500">Required Purchase</p>
                  <p className="text-xl font-bold text-orange-600">{formatNumber(selectedPlan.to_be_purchased)}</p>
                </Paper>
                <Paper withBorder p="sm" className="text-center">
                  <p className="text-sm text-gray-500">Lead Time</p>
                  <p className="text-xl font-bold">{selectedPlan.lead_time} Days</p>
                </Paper>
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
                          <Table.Td className="font-mono text-blue-600">{po.po_no}</Table.Td>
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

              {selectedPlan.notes && (
                <>
                  <Divider label="Material Plan Notes" labelPosition="left" />
                  <Alert color="blue" title="Note">
                    <p className="text-sm">{selectedPlan.notes}</p>
                  </Alert>
                </>
              )}
            </div>
          </ScrollArea>
        )}
      </Modal>

      {/* Create Material Plan Modal - Enhanced */}
      <Modal
        opened={createOpened}
        onClose={() => setCreateOpened(false)}
        title={
          <div className="flex items-center gap-2">
            <ThemeIcon color="green" size="md" radius="xl" variant="light">
              <FontAwesomeIcon icon={faPlus} />
            </ThemeIcon>
            <span>Create Material Plan</span>
          </div>
        }
        size="xl"
        centered
      >
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
              <Select label="Priority" placeholder="Select Priority" data={['Critical', 'High', 'Medium', 'Low']} value={planForm.priority} onChange={(value) => handlePlanChange('priority', value || '')} />
              <TextInput label="Category" placeholder="Enter Category" value={planForm.category} onChange={(e) => handlePlanChange('category', e.currentTarget.value)} />
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
      <Modal
        opened={editOpened}
        onClose={() => setEditOpened(false)}
        title={
          <div className="flex items-center gap-2">
            <ThemeIcon color="yellow" size="md" radius="xl" variant="light">
              <FontAwesomeIcon icon={faEdit} />
            </ThemeIcon>
            <span>Edit Material Plan</span>
          </div>
        }
        size="lg"
        centered
      >
        <form onSubmit={handleEditSubmit} className="mt-2 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextInput label="Run No." value={editField.run_no} disabled />
            <TextInput label="Product Name" value={editField.product_name} onChange={(e) => handleEditChange('product_name', e.currentTarget.value)} required />
            <TextInput label="Material Name" value={editField.material_name} onChange={(e) => handleEditChange('material_name', e.currentTarget.value)} required />
            <NumberInput label="Required Quantity" value={editField.required_qty} onChange={(value) => handleEditChange('required_qty', Number(value) || 0)} />
            <Select label="Status" data={['Stocking', 'Out of Stock', 'Low Stock', 'In Transit']} value={editField.status} onChange={(value) => handleEditChange('status', value || '')} />
            <Select label="Priority" data={['Critical', 'High', 'Medium', 'Low']} value={editField.priority} onChange={(value) => handleEditChange('priority', value || '')} />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setEditOpened(false)}>Cancel</Button>
            <Button type="submit" color="blue">Update Plan</Button>
          </div>
        </form>
      </Modal>

     
    </div>
  );
};