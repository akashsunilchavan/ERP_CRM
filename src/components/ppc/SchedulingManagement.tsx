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
  faCalendarAlt,
  faClock,
  faCheckCircle,
  faTimesCircle,
  faFilter,
  faPrint,
  faCopy,
  faPlusCircle,
  faMinusCircle,
  faIndustry,
  faUsers,
  faExclamationTriangle,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';

const DUMMY_SCHEDULES_DATA = {
  data: [
    {
      id: 'SCH001',
      schedule_no: 'SCH-0067',
      order_no: 'PP-1002',
      product: 'Hydraulic Pump',
      machine: 'CNC - 02',
      start_date: '02 May 2026',
      end_date: '07 May 2026',
      status: 'In Progress',
      priority: 'High',
      unit: '90 Nos',
      created_by: 'Admin',
      created_on: '30 April 2026',
      operations: [
        { id: 1, operation: 'Cutting', machine: 'CNC Cutting Machine - 01', plan_start: '02 May 2026', plan_end: '03 May 2026', duration: '6 hrs', status: 'Completed', progress: 100 },
        { id: 2, operation: 'Machining', machine: 'CNC VMC Machine - 02', plan_start: '03 May 2026', plan_end: '04 May 2026', duration: '16 hrs', status: 'In Progress', progress: 80 },
        { id: 3, operation: 'Drilling', machine: 'Drilling Machine - 01', plan_start: '04 May 2026', plan_end: '06 May 2026', duration: '4 hrs', status: 'In Progress', progress: 40 },
        { id: 4, operation: 'Assembly', machine: 'Assembly Station - 01', plan_start: '07 May 2026', plan_end: '08 May 2026', duration: '15 hrs', status: 'In Progress', progress: 20 },
        { id: 5, operation: 'Inspection', machine: 'QC Inspection Table - 01', plan_start: '08 May 2026', plan_end: '09 May 2026', duration: '4 hrs', status: 'In Progress', progress: 80 },
        { id: 6, operation: 'Testing', machine: 'Testing Station - 01', plan_start: '10 May 2026', plan_end: '10 May 2026', duration: '7 hrs', status: 'In Progress', progress: 95 },
      ],
      resources: [
        { operation: 1, type: 'Helpers', name: 'Repairs Home', role: 'Operate', allocated_operations: 'Cutting, Machine, Billing', working_hours: '28 hrs' },
        { operation: 2, type: 'Repair-Komar', name: 'Operate', role: 'Operator', allocated_operations: 'Cutting, Machine, Billing', working_hours: '28 hrs' },
        { operation: 3, type: 'Select Video', name: 'Operate', role: 'Operator', allocated_operations: 'Scheduling, Assembly', working_hours: '28 hrs' },
        { operation: 4, type: 'Mark Sign', name: 'Operate', role: 'Operator', allocated_operations: 'Assembly, Testing', working_hours: '32 hrs' },
      ],
      attachments: ['Hydraulic Pump Cleaning pad.pdf', 'Pneumatic Jiggle pad.pdf'],
      notes: 'Ensure all cost materials are available before start of execution. Preparation is crucial to complete before final testing.',
    },
    {
      id: 'SCH002',
      schedule_no: 'SCH-0068',
      order_no: 'PP-1001',
      product: 'Gear Assembly',
      machine: 'CNC - 01',
      start_date: '01 May 2026',
      end_date: '01 May 2026',
      status: 'Completed',
      priority: 'Medium',
      unit: '50 Nos',
      created_by: 'Admin',
      created_on: '28 April 2026',
      operations: [],
      resources: [],
      attachments: [],
      notes: '',
    },
    {
      id: 'SCH003',
      schedule_no: 'SCH-0069',
      order_no: 'PP-1003',
      product: 'Control Panel',
      machine: 'BLK - 01',
      start_date: '03 May 2026',
      end_date: '03 May 2026',
      status: 'Completed',
      priority: 'Low',
      unit: '30 Nos',
      created_by: 'Admin',
      created_on: '29 April 2026',
      operations: [],
      resources: [],
      attachments: [],
      notes: '',
    },
    {
      id: 'SCH004',
      schedule_no: 'SCH-0070',
      order_no: 'PP-1004',
      product: 'Motor Housing',
      machine: 'KBM - 01',
      start_date: '04 May 2026',
      end_date: '04 May 2026',
      status: 'Completed',
      priority: 'Medium',
      unit: '75 Nos',
      created_by: 'Admin',
      created_on: '30 April 2026',
      operations: [],
      resources: [],
      attachments: [],
      notes: '',
    },
    {
      id: 'SCH005',
      schedule_no: 'SCH-0071',
      order_no: 'PP-1005',
      product: 'Valve Body',
      machine: 'CNC - 01',
      start_date: '05 May 2026',
      end_date: '05 May 2026',
      status: 'Delayed',
      priority: 'High',
      unit: '60 Nos',
      created_by: 'Admin',
      created_on: '01 May 2026',
      operations: [],
      resources: [],
      attachments: [],
      notes: '',
    },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  Completed: 'green',
  'In Progress': 'yellow',
  Planned: 'blue',
  Delayed: 'red',
  Pending: 'orange',
};

const PRIORITY_COLORS: Record<string, string> = {
  High: 'red',
  Medium: 'yellow',
  Low: 'green',
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-IN').format(value);
};

export const SchedulingManagement = () => {
  const [createOpened, setCreateOpened] = useState(false);
  const [viewOpened, setViewOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);

  const [operations, setOperations] = useState([
    { id: 1, operation: '', machine: '', plan_start: '', plan_end: '', duration: '', status: '', progress: 0 },
  ]);

  const [resources, setResources] = useState([
    { id: 1, type: '', name: '', role: '', allocated_operations: '', working_hours: '' },
  ]);

  const [scheduleForm, setScheduleForm] = useState({
    schedule_number: '',
    order_number: '',
    product_name: '',
    unit: '',
    created_by: '',
    start_date: '',
    created_on: '',
    end_date: '',
    priority: '',
    notes: '',
    attachments: null as File | null,
  });

  const [editField, setEditField] = useState({
    id: '',
    schedule_no: '',
    order_no: '',
    product: '',
    status: '',
    priority: '',
  });

  const [schedulesData] = useState<any>(DUMMY_SCHEDULES_DATA);

  const handleScheduleChange = (key: string, value: any) => {
    setScheduleForm({ ...scheduleForm, [key]: value });
  };

  const handleOperationChange = (id: number, key: string, value: any) => {
    setOperations(operations.map(op => op.id === id ? { ...op, [key]: value } : op));
  };

  const addOperation = () => {
    const newId = Math.max(...operations.map(o => o.id), 0) + 1;
    setOperations([...operations, { id: newId, operation: '', machine: '', plan_start: '', plan_end: '', duration: '', status: '', progress: 0 }]);
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
    setResources([...resources, { id: newId, type: '', name: '', role: '', allocated_operations: '', working_hours: '' }]);
  };

  const removeResource = (id: number) => {
    if (resources.length > 1) {
      setResources(resources.filter(r => r.id !== id));
    }
  };

  const handleEditChange = (key: string, value: any) => {
    setEditField({ ...editField, [key]: value });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Schedule created:', { scheduleForm, operations, resources });
    setCreateOpened(false);
    setScheduleForm({
      schedule_number: '',
      order_number: '',
      product_name: '',
      unit: '',
      created_by: '',
      start_date: '',
      created_on: '',
      end_date: '',
      priority: '',
      notes: '',
      attachments: null,
    });
    setOperations([{ id: 1, operation: '', machine: '', plan_start: '', plan_end: '', duration: '', status: '', progress: 0 }]);
    setResources([{ id: 1, type: '', name: '', role: '', allocated_operations: '', working_hours: '' }]);
    alert('Schedule created successfully (Demo)');
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Schedule updated:', editField);
    setEditOpened(false);
    alert('Schedule updated successfully (Demo)');
  };

  const handleView = (obj: any) => {
    setSelectedSchedule(obj);
    setViewOpened(true);
  };

  const handleEdit = (obj: any) => {
    setEditField({
      id: obj.id,
      schedule_no: obj.schedule_no,
      order_no: obj.order_no,
      product: obj.product,
      status: obj.status,
      priority: obj.priority,
    });
    setEditOpened(true);
  };

  const handleDelete = (id: string) => {
    alert(`Delete record ${id} (Demo)`);
  };

  const tableColumns = [
    { th: { id: 'srNo', style: { minWidth: '70px', width: '70px' } }, text: 'SR NO.' },
    { text: 'Order No.', th: { id: 'order_no', style: { minWidth: '100px' } } },
    { text: 'Product', th: { id: 'product', style: { minWidth: '180px' } } },
    { text: 'Machine', th: { id: 'machine', style: { minWidth: '130px' } } },
    { text: 'Start Date', th: { id: 'start_date', style: { minWidth: '100px' } } },
    { text: 'End Date', th: { id: 'end_date', style: { minWidth: '100px' } } },
    { text: 'Status', th: { id: 'status', style: { minWidth: '100px' } } },
    { text: 'Priority', th: { id: 'priority', style: { minWidth: '80px' } } },
    { text: 'Actions', th: { id: 'action', style: { minWidth: '100px' } }, justifyContent: 'center' },
  ];

  const statsCards = [
    { title: 'Total Schedules', value: '142', subtitle: '112.5% of total', icon: faCalendarAlt, color: 'blue' },
    { title: 'Completed', value: '68', subtitle: '75.3% of total', icon: faCheckCircle, color: 'green' },
    { title: 'In Progress', value: '47', subtitle: '1.81% of total', icon: faClock, color: 'yellow' },
    { title: 'Pending', value: '21', subtitle: '1.42% of total', icon: faExclamationTriangle, color: 'orange' },
    { title: 'Delayed', value: '6', subtitle: '1.96% of total', icon: faTimesCircle, color: 'red' },
  ];

  const upcomingSchedules = [
    { order_no: 'PP-1005', product: 'Valve Body', machine: 'CNC - 01' },
    { order_no: 'PP-1006', product: 'Filter Assembly', machine: 'BLK - 01' },
    { order_no: 'PP-1007', product: 'Circuit Board', machine: 'BLK - 01' },
    { order_no: 'PP-1008', product: 'Gear Assembly', machine: 'CNC - 02' },
  ];

  const alerts = [
    { title: 'PP-1006 is Delayed', status: 'In Progress', message: 'Delayed due to 2 Days' },
    { title: 'Machine CNC-02 Overload', status: 'In Progress', message: 'Machine CNC-02 Overloaded due to 3 Day Delay' },
    { title: 'Maintenance Due', status: 'In Progress', message: 'Maintenance Due' },
    { title: 'Low Resource', status: 'In Progress', message: 'Low Resource' },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Title order={2} className="text-gray-800">Scheduling</Title>
          <p className="mt-1 text-gray-500">Manage and track all production schedules</p>
        </div>
        <Button onClick={() => setCreateOpened(true)} color="blue" leftSection={<FontAwesomeIcon icon={faPlus} />} size="md">
          Create Schedule
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-5">
        {statsCards.map((stat, index) => (
          <Paper key={index} withBorder p="md" radius="md" className="bg-white">
            <div className="flex items-center justify-between mb-2">
              <ThemeIcon color={stat.color} size="lg" radius="xl" variant="light">
                <FontAwesomeIcon icon={stat.icon} />
              </ThemeIcon>
              <span className="text-xs text-gray-500">{stat.subtitle}</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-500">{stat.title}</p>
            </div>
          </Paper>
        ))}
      </div>

      {/* Search Filters */}
      <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-white border border-gray-200 rounded-xl sm:grid-cols-2 lg:grid-cols-5">
        <Select placeholder="Sort: All" data={['All', 'Order No.', 'Product', 'Machine', 'Status']} />
        <Select placeholder="Product: All" data={['All', 'Gear Assembly', 'Hydraulic Pump', 'Control Panel', 'Motor Housing', 'Valve Body']} />
        <CustomDateInput placeholder="Date Range" name="date_range" />
        <Button variant="outline" color="gray" leftSection={<FontAwesomeIcon icon={faDownload} />}>Export</Button>
        <Button variant="outline" color="gray" leftSection={<FontAwesomeIcon icon={faFileAlt} />}>Open Files</Button>
      </div>

      {/* Schedules Table */}
      <div className="p-4 mb-6 bg-white border border-gray-200 shadow-sm rounded-xl">
        <CustomTable
          data={schedulesData}
          setData={() => {}}
          isSearchingRequired={true}
          isSortingRequired={true}
          isPaginationRequired={true}
          tableHeadData={tableColumns}
          tableBody={() =>
            schedulesData?.data?.map((obj: any, index: number) => (
              <tr key={obj.id} className="transition border-b hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-medium text-gray-600">{index + 1}</td>
                <td className="px-3 py-2 text-sm font-medium text-blue-600">{obj.order_no}</td>
                <td className="px-3 py-2 text-sm font-medium">{obj.product}</td>
                <td className="px-3 py-2 text-sm">{obj.machine}</td>
                <td className="px-3 py-2 text-sm">{obj.start_date}</td>
                <td className="px-3 py-2 text-sm">{obj.end_date}</td>
                <td className="px-3 py-2"><Badge color={STATUS_COLORS[obj.status]} variant="light">{obj.status}</Badge></td>
                <td className="px-3 py-2"><Badge color={PRIORITY_COLORS[obj.priority]} variant="outline">{obj.priority}</Badge></td>
                <td className="px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Tooltip label="View Details"><ActionIcon variant="subtle" color="blue" onClick={() => handleView(obj)}><FontAwesomeIcon icon={faEye} /></ActionIcon></Tooltip>
                    <Tooltip label="Edit"><ActionIcon variant="subtle" color="yellow" onClick={() => handleEdit(obj)}><FontAwesomeIcon icon={faEdit} /></ActionIcon></Tooltip>
                    <Tooltip label="Copy"><ActionIcon variant="subtle" color="green"><FontAwesomeIcon icon={faCopy} /></ActionIcon></Tooltip>
                    <Tooltip label="Delete"><ActionIcon variant="subtle" color="red" onClick={() => handleDelete(obj.id)}><FontAwesomeIcon icon={faTrash} /></ActionIcon></Tooltip>
                  </div>
                </td>
              </tr>
            ))
          }
          url="schedules?demo=true"
          notFoundMessage="No Schedule Data Found."
          notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
        />
      </div>

      {/* Upcoming Schedules and Alerts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Upcoming Schedules</Title>
          <div className="space-y-3">
            {upcomingSchedules.map((schedule, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium text-blue-600">{schedule.order_no}</p>
                  <p className="text-sm text-gray-600">{schedule.product}</p>
                </div>
                <Badge color="cyan">{schedule.machine}</Badge>
              </div>
            ))}
          </div>
        </Paper>

        <Paper withBorder p="md" radius="md" className="bg-white">
          <Title order={4} className="mb-4 text-gray-700">Alert & Notifications</Title>
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <div key={idx} className="p-3 border-l-4 border-red-500 rounded-lg bg-red-50">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faBell} className="text-red-500" />
                  <p className="font-medium text-red-700">{alert.title}</p>
                </div>
                <p className="mt-1 text-sm text-gray-600">Status: {alert.status}</p>
                <p className="text-sm text-gray-500">{alert.message}</p>
              </div>
            ))}
          </div>
        </Paper>
      </div>

      {/* View Schedule Modal */}
      <Modal opened={viewOpened} onClose={() => setViewOpened(false)} title={`Schedule Details | ${selectedSchedule?.schedule_no || ''}`} size="xl" centered>
        {selectedSchedule && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-blue-50">
              <div><p className="text-sm text-gray-500">Schedule No.</p><p className="font-semibold">{selectedSchedule.schedule_no}</p></div>
              <div><p className="text-sm text-gray-500">Order No.</p><p className="font-semibold">{selectedSchedule.order_no}</p></div>
              <div><p className="text-sm text-gray-500">Product</p><p className="font-semibold">{selectedSchedule.product}</p></div>
              <div><p className="text-sm text-gray-500">Unit</p><p className="font-semibold">{selectedSchedule.unit}</p></div>
              <div><p className="text-sm text-gray-500">Priority</p><Badge color={PRIORITY_COLORS[selectedSchedule.priority]}>{selectedSchedule.priority}</Badge></div>
              <div><p className="text-sm text-gray-500">Status</p><Badge color={STATUS_COLORS[selectedSchedule.status]}>{selectedSchedule.status}</Badge></div>
              <div><p className="text-sm text-gray-500">Start Date</p><p className="font-semibold">{selectedSchedule.start_date}</p></div>
              <div><p className="text-sm text-gray-500">End Date</p><p className="font-semibold">{selectedSchedule.end_date}</p></div>
              <div><p className="text-sm text-gray-500">Created By</p><p className="font-semibold">{selectedSchedule.created_by}</p></div>
              <div><p className="text-sm text-gray-500">Created On</p><p className="font-semibold">{selectedSchedule.created_on}</p></div>
            </div>

            {selectedSchedule.operations.length > 0 && (
              <>
                <Divider label="Operation Schedule" labelPosition="left" />
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr><Table.Th>#</Table.Th><Table.Th>Operation</Table.Th><Table.Th>Machine</Table.Th><Table.Th>Plan Start</Table.Th><Table.Th>Plan End</Table.Th><Table.Th>Duration</Table.Th><Table.Th>Status</Table.Th><Table.Th>Progress</Table.Th></Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {selectedSchedule.operations.map((op: any, idx: number) => (
                      <Table.Tr key={op.id}>
                        <Table.Td>{idx + 1}</Table.Td>
                        <Table.Td>{op.operation}</Table.Td>
                        <Table.Td>{op.machine}</Table.Td>
                        <Table.Td>{op.plan_start}</Table.Td>
                        <Table.Td>{op.plan_end}</Table.Td>
                        <Table.Td>{op.duration}</Table.Td>
                        <Table.Td><Badge color={STATUS_COLORS[op.status]} variant="light">{op.status}</Badge></Table.Td>
                        <Table.Td><div className="flex items-center gap-2"><Progress value={op.progress} size="sm" className="w-20" /><span className="text-xs">{op.progress}%</span></div></Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </>
            )}

            {selectedSchedule.resources.length > 0 && (
              <>
                <Divider label="Resource Allocation" labelPosition="left" />
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr><Table.Th>Operations</Table.Th><Table.Th>Helpers</Table.Th><Table.Th>Inspectors</Table.Th><Table.Th>Allocated Operations</Table.Th><Table.Th>Working Hours</Table.Th></Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {selectedSchedule.resources.map((res: any, idx: number) => (
                      <Table.Tr key={idx}>
                        <Table.Td>{res.operation}</Table.Td>
                        <Table.Td>{res.type}</Table.Td>
                        <Table.Td>{res.name}</Table.Td>
                        <Table.Td>{res.allocated_operations}</Table.Td>
                        <Table.Td>{res.working_hours}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </>
            )}

            {selectedSchedule.attachments.length > 0 && (
              <>
                <Divider label="Attachments" labelPosition="left" />
                <div className="space-y-2">
                  {selectedSchedule.attachments.map((doc: string, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                      <div className="flex items-center gap-2"><FontAwesomeIcon icon={faFileAlt} className="text-blue-500" /><span className="text-sm">{doc}</span></div>
                      <ActionIcon variant="subtle" color="blue" size="sm"><FontAwesomeIcon icon={faDownload} /></ActionIcon>
                    </div>
                  ))}
                </div>
              </>
            )}

            {selectedSchedule.notes && (
              <>
                <Divider label="Plan Notes" labelPosition="left" />
                <Alert color="blue"><p className="text-sm">{selectedSchedule.notes}</p></Alert>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* Add Schedule Modal */}
      <Modal opened={createOpened} onClose={() => setCreateOpened(false)} title="Add Schedule" size="xl" centered>
        <form onSubmit={handleAddSubmit} className="mt-2 space-y-6">
          <div>
            <Title order={5} className="mb-3 text-gray-700">Schedule Information</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput label="Schedule Number" placeholder="SCH0000" value={scheduleForm.schedule_number} onChange={(e) => handleScheduleChange('schedule_number', e.currentTarget.value)} required />
              <TextInput label="Order Number" placeholder="Order Number" value={scheduleForm.order_number} onChange={(e) => handleScheduleChange('order_number', e.currentTarget.value)} required />
              <TextInput label="Product Name" placeholder="Product Name" value={scheduleForm.product_name} onChange={(e) => handleScheduleChange('product_name', e.currentTarget.value)} required />
              <TextInput label="Unit" placeholder="Enter Unit" value={scheduleForm.unit} onChange={(e) => handleScheduleChange('unit', e.currentTarget.value)} />
              <TextInput label="Created By" placeholder="Enter Name" value={scheduleForm.created_by} onChange={(e) => handleScheduleChange('created_by', e.currentTarget.value)} />
              <CustomDateInput label="Start Date" name="start_date" value={scheduleForm.start_date} onChange={(e) => handleScheduleChange('start_date', e?.currentTarget?.value || '')} />
              <CustomDateInput label="Created On" name="created_on" value={scheduleForm.created_on} onChange={(e) => handleScheduleChange('created_on', e?.currentTarget?.value || '')} />
              <CustomDateInput label="End Date" name="end_date" value={scheduleForm.end_date} onChange={(e) => handleScheduleChange('end_date', e?.currentTarget?.value || '')} />
              <Select label="Priority" placeholder="Select Priority" data={['High', 'Medium', 'Low']} value={scheduleForm.priority} onChange={(value) => handleScheduleChange('priority', value || '')} />
            </div>
          </div>

          <Divider />

          <div>
            <div className="flex items-center justify-between mb-3"><Title order={5} className="text-gray-700">Operations</Title><Button size="xs" variant="light" leftSection={<FontAwesomeIcon icon={faPlusCircle} />} onClick={addOperation}>Add More Operations</Button></div>
            <div className="space-y-3">
              {operations.map((op) => (
                <Paper key={op.id} withBorder p="md" className="relative">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                    <Select label="Operation" placeholder="Select Operation" data={['Cutting', 'Machining', 'Drilling', 'Assembly', 'Inspection', 'Packing', 'Testing']} value={op.operation} onChange={(value) => handleOperationChange(op.id, 'operation', value || '')} />
                    <Select label="Machine" placeholder="Select Machine" data={['CNC Cutting Machine - 01', 'CNC VMC Machine - 02', 'Drilling Machine - 01', 'Assembly Station - 01', 'QC Inspection Table - 01', 'Packing Station - 01', 'Testing Station - 01']} value={op.machine} onChange={(value) => handleOperationChange(op.id, 'machine', value || '')} />
                    <CustomDateInput label="Plan Start Date" name="plan_start" value={op.plan_start} onChange={(e) => handleOperationChange(op.id, 'plan_start', e?.currentTarget?.value || '')} />
                    <CustomDateInput label="Plan End Date" name="plan_end" value={op.plan_end} onChange={(e) => handleOperationChange(op.id, 'plan_end', e?.currentTarget?.value || '')} />
                    <TextInput label="Duration" placeholder="Enter Duration" value={op.duration} onChange={(e) => handleOperationChange(op.id, 'duration', e.currentTarget.value)} />
                    <Select label="Status" placeholder="Select Status" data={['Completed', 'In Progress', 'Pending', 'Planned']} value={op.status} onChange={(value) => handleOperationChange(op.id, 'status', value || '')} />
                    <NumberInput label="Progress (%)" placeholder="Enter Progress %" value={op.progress} onChange={(value) => handleOperationChange(op.id, 'progress', Number(value) || 0)} min={0} max={100} />
                  </div>
                  {operations.length > 1 && (<ActionIcon color="red" variant="subtle" onClick={() => removeOperation(op.id)} className="absolute top-2 right-2"><FontAwesomeIcon icon={faMinusCircle} /></ActionIcon>)}
                </Paper>
              ))}
            </div>
          </div>

          <Divider />

          <div>
            <div className="flex items-center justify-between mb-3"><Title order={5} className="text-gray-700">Resource Allocation</Title><Button size="xs" variant="light" leftSection={<FontAwesomeIcon icon={faPlusCircle} />} onClick={addResource}>Add More Resources</Button></div>
            <div className="space-y-3">
              {resources.map((res) => (
                <Paper key={res.id} withBorder p="md" className="relative">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <Select label="Resource Type" placeholder="Select Resource Type" data={['Operators', 'Helpers', 'Inspectors', 'Fitters', 'Supervisors']} value={res.type} onChange={(value) => handleResourceChange(res.id, 'type', value || '')} />
                    <TextInput label="Resource Name" placeholder="Enter Resource Name" value={res.name} onChange={(e) => handleResourceChange(res.id, 'name', e.currentTarget.value)} />
                    <Select label="Resource Role" placeholder="Select Role" data={['Operator', 'Helper', 'Quality Inspector', 'Fitter', 'Supervisor']} value={res.role} onChange={(value) => handleResourceChange(res.id, 'role', value || '')} />
                    <TextInput label="Allocated Operations" placeholder="Enter Allocated Operations" value={res.allocated_operations} onChange={(e) => handleResourceChange(res.id, 'allocated_operations', e.currentTarget.value)} />
                    <TextInput label="Working Hours" placeholder="Enter Working Hours" value={res.working_hours} onChange={(e) => handleResourceChange(res.id, 'working_hours', e.currentTarget.value)} />
                  </div>
                  {resources.length > 1 && (<ActionIcon color="red" variant="subtle" onClick={() => removeResource(res.id)} className="absolute top-2 right-2"><FontAwesomeIcon icon={faMinusCircle} /></ActionIcon>)}
                </Paper>
              ))}
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Schedule Notes</Title>
            <Textarea placeholder="Add Notes here..." minRows={3} value={scheduleForm.notes} onChange={(e) => handleScheduleChange('notes', e.currentTarget.value)} />
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Upload Files</Title>
            <FileInput placeholder="Drag & Drop files here or click to upload" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" value={scheduleForm.attachments} onChange={(file) => handleScheduleChange('attachments', file)} />
            <p className="mt-1 text-xs text-gray-400">Upload Files (PDF, DOC, DOCX, JPG, PNG)</p>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
            <Button variant="outline" onClick={() => setCreateOpened(false)}>Cancel</Button>
            <Button type="submit" color="blue">Create Schedule</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Schedule Modal */}
      <Modal opened={editOpened} onClose={() => setEditOpened(false)} title="Edit Schedule" size="lg" centered>
        <form onSubmit={handleEditSubmit} className="mt-2 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextInput label="Schedule No." value={editField.schedule_no} disabled />
            <TextInput label="Order No." value={editField.order_no} onChange={(e) => handleEditChange('order_no', e.currentTarget.value)} required />
            <TextInput label="Product" value={editField.product} onChange={(e) => handleEditChange('product', e.currentTarget.value)} required />
            <Select label="Status" data={['Completed', 'In Progress', 'Planned', 'Delayed', 'Pending']} value={editField.status} onChange={(value) => handleEditChange('status', value || '')} />
            <Select label="Priority" data={['High', 'Medium', 'Low']} value={editField.priority} onChange={(value) => handleEditChange('priority', value || '')} />
          </div>
          <div className="flex justify-end gap-3 mt-4"><Button variant="outline" onClick={() => setEditOpened(false)}>Cancel</Button><Button type="submit" color="blue">Update Schedule</Button></div>
        </form>
      </Modal>

    </div>
  );
};