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
  FileInput,
  Card,
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
  faPaperPlane,
  faCalendarCheck,
  faFileAlt,
  faBuilding,
  faUser,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faFlag,
  faBox,
  faRuler,
  faCog,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';

const DUMMY_ENQUIRIES_DATA = {
  data: [
    {
      id: 'ENQ0014',
      enquiry_id: 'ENQ0014',
      customer: 'ABC Elevators Pvt Ltd',
      project_name: 'ABC Elevators',
      requirement: '10 Ton | 20m Span',
      est_value: 350000,
      status: 'Documentation',
      assigned_to: 'John Doe',
      enquiry_date: '24 Apr 2026',
      created_at: '24 Apr 2026, 10:30 AM',
      last_update: '25 Apr 2026, 02:15 PM',
      project_type: 'Gantry Crane',
      customer_details: {
        name: 'ABC Elevators Pvt Ltd',
        phone: '9876545678',
        email: 'abc@demo.com',
        company: 'ABC Pvt. Ltd.',
        source: 'Website',
      },
      project_details: {
        name: 'ABC Elevators',
        start_date: '10 May, 2026',
        completion_date: '30 June, 2026',
        location: 'Noida, Uttar Pradesh',
        priority: 'Medium',
        address: '123, industrial area, Phase 2, Noida, Uttar Pradesh 201301',
      },
      technical_requirements: {
        capacity: '10 Ton',
        span: '20 Meter',
        quantity: '1 Unit',
        material_type: 'Mild Steel',
      },
      timeline: [
        { title: 'Enquiry Created', description: 'Enquiry has been created by John Doe', date: '24 Apr 2026' },
        { title: 'Downloaded', description: 'Documents downloaded', date: '24 Apr 2026' },
        { title: 'Sent to Documentation', description: 'Updated by John Doe', date: '25 Apr 2026' },
      ],
      notes: 'Corrosion resistant structure required. Need quick delivery and installation support.',
      documents: [
        { name: 'Drawing.pdf', size: '2.4 MB' },
        { name: 'BOQ.xlsx', size: '1.1 MB' },
      ],
    },
    {
      id: 'ENQ0023',
      enquiry_id: 'ENQ0023',
      customer: 'XYZ Infra Solution',
      project_name: 'XYZ Infra',
      requirement: '5 Ton | 12m Span',
      est_value: 220000,
      status: 'Sent for Quotation',
      assigned_to: 'John Doe',
      enquiry_date: '24 Apr 2026',
      created_at: '24 Apr 2026, 11:15 AM',
      last_update: '26 Apr 2026, 09:30 AM',
      project_type: 'EOT Crane',
      customer_details: {
        name: 'XYZ Infra Solution',
        phone: '9988776655',
        email: 'xyz@demo.com',
        company: 'XYZ Infra Pvt Ltd',
        source: 'Reference',
      },
      project_details: {
        name: 'XYZ Infra',
        start_date: '15 May, 2026',
        completion_date: '10 July, 2026',
        location: 'Greater Noida, Uttar Pradesh',
        priority: 'High',
        address: '45, Sector 4, Greater Noida, Uttar Pradesh 201310',
      },
      technical_requirements: {
        capacity: '5 Ton',
        span: '12 Meter',
        quantity: '2 Units',
        material_type: 'Mild Steel',
      },
      timeline: [
        { title: 'Enquiry Created', description: 'Enquiry has been created by John Doe', date: '24 Apr 2026' },
        { title: 'Sent for Quotation', description: 'Quotation requested', date: '25 Apr 2026' },
      ],
      notes: 'Need anti-corrosion coating. Delivery required within 4 weeks.',
      documents: [{ name: 'Technical_Specs.pdf', size: '3.2 MB' }],
    },
    {
      id: 'ENQ0044',
      enquiry_id: 'ENQ0044',
      customer: 'POR Engineering',
      project_name: 'POR Engine',
      requirement: '2 Ton | 8m Span',
      est_value: 82000,
      status: 'Draft',
      assigned_to: 'John Doe',
      enquiry_date: '24 Apr 2026',
      created_at: '24 Apr 2026, 02:45 PM',
      last_update: '24 Apr 2026, 04:00 PM',
      project_type: 'JIB Crane',
      customer_details: {
        name: 'POR Engineering',
        phone: '9876543210',
        email: 'por@demo.com',
        company: 'POR Engineering Works',
        source: 'Walk-in',
      },
      project_details: {
        name: 'POR Engine',
        start_date: '20 May, 2026',
        completion_date: '15 June, 2026',
        location: 'Ghaziabad, Uttar Pradesh',
        priority: 'Low',
        address: '78, Site 4, Sahibabad, Ghaziabad, Uttar Pradesh 201005',
      },
      technical_requirements: {
        capacity: '2 Ton',
        span: '8 Meter',
        quantity: '1 Unit',
        material_type: 'Cast Iron',
      },
      timeline: [
        { title: 'Enquiry Created', description: 'Enquiry has been created by John Doe', date: '24 Apr 2026' },
      ],
      notes: 'Need wall mounted type. Budget is tight.',
      documents: [],
    },
    {
      id: 'ENQ0019',
      enquiry_id: 'ENQ0019',
      customer: 'LMN Industries',
      project_name: 'LMN Industry',
      requirement: '20 Ton | 30m Span',
      est_value: 875000,
      status: 'Documentation',
      assigned_to: 'John Doe',
      enquiry_date: '24 Apr 2026',
      created_at: '24 Apr 2026, 09:00 AM',
      last_update: '25 Apr 2026, 11:00 AM',
      project_type: 'Gantry Crane',
      customer_details: {
        name: 'LMN Industries',
        phone: '9988001122',
        email: 'lmn@demo.com',
        company: 'LMN Industries Ltd',
        source: 'Website',
      },
      project_details: {
        name: 'LMN Industry',
        start_date: '05 May, 2026',
        completion_date: '25 June, 2026',
        location: 'Faridabad, Haryana',
        priority: 'High',
        address: '12, Sector 5, Faridabad, Haryana 121006',
      },
      technical_requirements: {
        capacity: '20 Ton',
        span: '30 Meter',
        quantity: '1 Unit',
        material_type: 'High Tensile Steel',
      },
      timeline: [
        { title: 'Enquiry Created', description: 'Enquiry has been created by John Doe', date: '24 Apr 2026' },
        { title: 'Sent to Documentation', description: 'Technical review pending', date: '25 Apr 2026' },
      ],
      notes: 'Requires heavy duty configuration. Need 3 phase power supply setup.',
      documents: [{ name: 'Requirement_Doc.pdf', size: '5.1 MB' }, { name: 'Site_Plan.dwg', size: '1.8 MB' }],
    },
    {
      id: 'ENQ0016',
      enquiry_id: 'ENQ0016',
      customer: 'DPS Steel',
      project_name: 'DPS Steels',
      requirement: '3 Ton | 10m Span',
      est_value: 145000,
      status: 'Sent for Quotation',
      assigned_to: 'Tim Doe',
      enquiry_date: '02 Apr 2026',
      created_at: '02 Apr 2026, 01:30 PM',
      last_update: '20 Apr 2026, 10:00 AM',
      project_type: 'EOT Crane',
      customer_details: {
        name: 'DPS Steel',
        phone: '8899776655',
        email: 'dps@demo.com',
        company: 'DPS Steels Pvt Ltd',
        source: 'Reference',
      },
      project_details: {
        name: 'DPS Steels',
        start_date: '12 May, 2026',
        completion_date: '05 July, 2026',
        location: 'Delhi NCR',
        priority: 'Medium',
        address: '34, Okhla Phase 2, New Delhi, Delhi 110020',
      },
      technical_requirements: {
        capacity: '3 Ton',
        span: '10 Meter',
        quantity: '1 Unit',
        material_type: 'Mild Steel',
      },
      timeline: [
        { title: 'Enquiry Created', description: 'Enquiry has been created by Tim Doe', date: '02 Apr 2026' },
        { title: 'Sent for Quotation', description: 'Quotation sent to customer', date: '20 Apr 2026' },
      ],
      notes: 'Customer requested a site visit before finalizing.',
      documents: [{ name: 'Initial_Enquiry.pdf', size: '0.8 MB' }],
    },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  Draft: 'gray',
  Documentation: 'blue',
  'Sent for Quotation': 'yellow',
  Quoted: 'cyan',
  'Order Confirmed': 'green',
  Lost: 'red',
};

const getStatusBadge = (status: string) => {
  return <Badge color={STATUS_COLORS[status] || 'gray'} variant="light">{status}</Badge>;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
};

export const EnquiriesManagement = () => {
  const [addOpened, setAddOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [viewOpened, setViewOpened] = useState(false);
  const [quotationOpened, setQuotationOpened] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);

  const [quotationData, setQuotationData] = useState({
    submissionGate: '',
    priority: '',
    estimatedValue: '',
    notes: '',
  });

  const [addField, setAddField] = useState({
    customer_name: 'ABC Electronics Pvt Ltd',
    company_name: 'ABC Pvt Ltd',
    contact_number: '+91 9876545678',
    email: 'abc@email.com',
    lead_source: 'Website',
    project_name: '',
    project_start_date: '',
    project_completion_date: '',
    material_type: '',
    quantity: '',
    special_requirements: '',
    notes: '',
    files: null as File | null,
  });

  const [editField, setEditField] = useState({
    id: '',
    enquiry_id: '',
    customer: '',
    project_name: '',
    requirement: '',
    est_value: '',
    status: '',
    assigned_to: '',
    enquiry_date: '',
    project_type: '',
    priority: '',
    location: '',
    capacity: '',
    span: '',
    quantity: '',
    material_type: '',
    notes: '',
  });

  const [enquiriesData] = useState<any>(DUMMY_ENQUIRIES_DATA);

  const handleAddChange = (key: string, value: string | File | null) => {
    setAddField({ ...addField, [key]: value });
  };

  const handleEditChange = (key: string, value: string) => {
    setEditField({ ...editField, [key]: value });
  };

  const handleQuotationChange = (key: string, value: string) => {
    setQuotationData({ ...quotationData, [key]: value });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add submitted:', addField);
    setAddField({
      customer_name: 'ABC Electronics Pvt Ltd',
      company_name: 'ABC Pvt Ltd',
      contact_number: '+91 9876545678',
      email: 'abc@email.com',
      lead_source: 'Website',
      project_name: '',
      project_start_date: '',
      project_completion_date: '',
      material_type: '',
      quantity: '',
      special_requirements: '',
      notes: '',
      files: null,
    });
    setAddOpened(false);
    alert('Enquiry added successfully (Demo)');
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Edit submitted:', editField);
    setEditOpened(false);
    alert('Enquiry updated successfully (Demo)');
  };

  const handleQuotationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quotation submitted:', { enquiry: selectedEnquiry, quotationData });
    setQuotationData({
      submissionGate: '',
      priority: '',
      estimatedValue: '',
      notes: '',
    });
    setQuotationOpened(false);
    alert('Quotation request created successfully (Demo)');
  };

  const handleView = (obj: any) => {
    setSelectedEnquiry(obj);
    setViewOpened(true);
  };

  const handleEdit = (obj: any) => {
    setEditField({
      id: obj.id,
      enquiry_id: obj.enquiry_id,
      customer: obj.customer,
      project_name: obj.project_name,
      requirement: obj.requirement,
      est_value: obj.est_value.toString(),
      status: obj.status,
      assigned_to: obj.assigned_to,
      enquiry_date: obj.enquiry_date,
      project_type: obj.project_type || '',
      priority: obj.project_details?.priority || '',
      location: obj.project_details?.location || '',
      capacity: obj.technical_requirements?.capacity.split(' ')[0] || '',
      span: obj.technical_requirements?.span.split(' ')[0] || '',
      quantity: obj.technical_requirements?.quantity.split(' ')[0] || '',
      material_type: obj.technical_requirements?.material_type || '',
      notes: obj.notes || '',
    });
    setEditOpened(true);
  };

  const handleSendForQuotation = (obj: any) => {
    setSelectedEnquiry(obj);
    setQuotationOpened(true);
  };

  const handleDelete = (id: string) => {
    alert(`Delete record ${id} (Demo)`);
  };

  const tableColumns = [
    { th: { id: 'srNo', style: { minWidth: '70px', width: '70px' } }, text: 'SR NO.' },
    { text: 'Enquiry ID', th: { id: 'enquiry_id', style: { minWidth: '100px' } } },
    { text: 'Customer', th: { id: 'customer', style: { minWidth: '200px' } } },
    { text: 'Project Name', th: { id: 'project_name', style: { minWidth: '180px' } } },
    { text: 'Requirement', th: { id: 'requirement', style: { minWidth: '150px' } } },
    { text: 'Est. Value', th: { id: 'est_value', style: { minWidth: '120px' } } },
    { text: 'Status', th: { id: 'status', style: { minWidth: '140px' } } },
    { text: 'Assigned To', th: { id: 'assigned_to', style: { minWidth: '130px' } } },
    { text: 'Enquiry Date', th: { id: 'enquiry_date', style: { minWidth: '120px' } } },
    { text: 'Actions', th: { id: 'action', style: { minWidth: '150px' } }, justifyContent: 'center' },
  ];

  const statsCards = [
    { title: 'Total Enquiries', value: '120', change: '+18.2%', trend: 'up' },
    { title: 'Draft', value: '25', change: '-8.3%', trend: 'down' },
    { title: 'Sent to Documentation', value: '45', change: '+12.5%', trend: 'up' },
    { title: 'Sent for Quotation', value: '32', change: '+15.6%', trend: 'up' },
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Title order={2} className="text-gray-800">Enquiries</Title>
          <p className="mt-1 text-gray-500">Manage all project enquiries across your company</p>
        </div>
        <Button
          onClick={() => setAddOpened(true)}
          color="blue"
          leftSection={<FontAwesomeIcon icon={faPlus} />}
          size="md"
        >
          Add Enquiry
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Paper key={index} withBorder p="md" radius="md" className="bg-white">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">{stat.title}</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <span className="mt-1 text-xs text-gray-400">vs last month</span>
            </div>
          </Paper>
        ))}
      </div>

      {/* Enquiries Table */}
      <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
        <CustomTable
          data={enquiriesData}
          setData={() => {}}
          isSearchingRequired={true}
          isSortingRequired={true}
          isPaginationRequired={true}
          tableHeadData={tableColumns}
          tableBody={() =>
            enquiriesData?.data?.map((obj: any, index: number) => (
              <tr key={obj.id} className="transition border-b hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-medium text-gray-600">{index + 1}</td>
                <td className="px-3 py-2 text-sm font-medium text-blue-600">{obj.enquiry_id}</td>
                <td className="px-3 py-2 text-sm">{obj.customer}</td>
                <td className="px-3 py-2 text-sm">{obj.project_name}</td>
                <td className="px-3 py-2 text-sm">{obj.requirement}</td>
                <td className="px-3 py-2 text-sm font-medium">{formatCurrency(obj.est_value)}</td>
                <td className="px-3 py-2">{getStatusBadge(obj.status)}</td>
                <td className="px-3 py-2 text-sm">{obj.assigned_to}</td>
                <td className="px-3 py-2 text-sm">{obj.enquiry_date}</td>
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
                    <Tooltip label="Send for Quotation">
                      <ActionIcon variant="subtle" color="green" onClick={() => handleSendForQuotation(obj)}>
                        <FontAwesomeIcon icon={faPaperPlane} />
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
          url="enquiries?demo=true"
          notFoundMessage="No Enquiry Data Found."
          notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
        />
      </div>

      {/* Send for Quotation Modal */}
      <Modal
        opened={quotationOpened}
        onClose={() => setQuotationOpened(false)}
        title="Send to Quotation"
        size="lg"
        centered
        className="rounded-lg"
      >
        <form onSubmit={handleQuotationSubmit} className="space-y-6">
          {/* Header Info */}
          <div className="mb-4">
            <p className="mb-2 text-sm text-gray-500">Create quotation request from this enquiry</p>
            <Card withBorder p="md" radius="md" className="border-blue-200 bg-blue-50">
              <div className="flex items-start justify-between">
                <div>
                  <Badge color="blue" variant="light" size="lg" className="mb-2">
                    {selectedEnquiry?.enquiry_id}
                  </Badge>
                  <Title order={4} className="mb-1 text-gray-800">{selectedEnquiry?.customer}</Title>
                  <p className="mb-1 text-sm text-gray-600">{selectedEnquiry?.project_type} | {selectedEnquiry?.requirement}</p>
                  <p className="text-sm font-semibold text-gray-700">Estimated: {formatCurrency(selectedEnquiry?.est_value || 0)}</p>
                </div>
                <ActionIcon variant="subtle" color="gray" onClick={() => setQuotationOpened(false)}>
                  <FontAwesomeIcon icon={faTimes} />
                </ActionIcon>
              </div>
            </Card>
          </div>

          <Divider label="Assign Quotation Encounter" labelPosition="left" />

          {/* Form Fields */}
          <div className="space-y-4">
            <Select
              label="Submission Gate"
              placeholder="Select Gate"
              required
              data={['Gate 1', 'Gate 2', 'Gate 3', 'Gate 4', 'Gate 5']}
              value={quotationData.submissionGate}
              onChange={(value) => handleQuotationChange('submissionGate', value || '')}
            />

            <Select
              label="Priority"
              placeholder="Select Priority"
              required
              data={['Low', 'Medium', 'High', 'Urgent']}
              value={quotationData.priority}
              onChange={(value) => handleQuotationChange('priority', value || '')}
            />

            <TextInput
              label="Estimated Project Value"
              placeholder="Enter estimated project value"
              required
              type="number"
              value={quotationData.estimatedValue}
              onChange={(e) => handleQuotationChange('estimatedValue', e.currentTarget.value)}
              leftSection="₹"
            />

            <Textarea
              label="Notes / Instructions"
              placeholder="Notes / Instructions..."
              minRows={4}
              value={quotationData.notes}
              onChange={(e) => handleQuotationChange('notes', e.currentTarget.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
            <Button variant="outline" onClick={() => setQuotationOpened(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Create
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Enquiry Modal */}
      <Modal
        opened={viewOpened}
        onClose={() => setViewOpened(false)}
        title={`${selectedEnquiry?.enquiry_id || ''} | ${selectedEnquiry?.customer || ''}`}
        size="xl"
        centered
      >
        {selectedEnquiry && (
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pb-4 border-b">
              <Button variant="filled" color="blue" leftSection={<FontAwesomeIcon icon={faFileAlt} />}>
                Submit to Documentation
              </Button>
              <Button 
                variant="outline" 
                color="green" 
                leftSection={<FontAwesomeIcon icon={faPaperPlane} />}
                onClick={() => {
                  setViewOpened(false);
                  handleSendForQuotation(selectedEnquiry);
                }}
              >
                Send for Quotation
              </Button>
              <Button variant="outline" color="teal" leftSection={<FontAwesomeIcon icon={faCalendarCheck} />}>
                Schedule Visit
              </Button>
            </div>

            <Grid>
              <Grid.Col span={6}>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Project Type</p>
                  <p className="font-medium">{selectedEnquiry.project_type}</p>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="font-medium">{selectedEnquiry.assigned_to}</p>
                  <p className="text-xs text-gray-400">Sales Executive</p>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Created On</p>
                  <p className="font-medium">{selectedEnquiry.created_at}</p>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Last Update</p>
                  <p className="font-medium">{selectedEnquiry.last_update}</p>
                </div>
              </Grid.Col>
            </Grid>

            <Divider label="Customer Details" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faUser} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Customer Name</p>
                    <p className="font-medium">{selectedEnquiry.customer_details.name}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faPhone} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedEnquiry.customer_details.phone}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedEnquiry.customer_details.email}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faBuilding} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="font-medium">{selectedEnquiry.customer_details.company}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faFlag} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Source</p>
                    <p className="font-medium">{selectedEnquiry.customer_details.source}</p>
                  </div>
                </div>
              </Grid.Col>
            </Grid>

            <Divider label="Project Details" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Project Name</p>
                <p className="font-medium">{selectedEnquiry.project_details.name}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Project Start Date</p>
                <p className="font-medium">{selectedEnquiry.project_details.start_date}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Project Completion Date</p>
                <p className="font-medium">{selectedEnquiry.project_details.completion_date}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{selectedEnquiry.project_details.location}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Priority</p>
                <Badge color={selectedEnquiry.project_details.priority === 'High' ? 'red' : selectedEnquiry.project_details.priority === 'Medium' ? 'yellow' : 'gray'}>
                  {selectedEnquiry.project_details.priority}
                </Badge>
              </Grid.Col>
              <Grid.Col span={12}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-sm">{selectedEnquiry.project_details.address}</p>
                  </div>
                </div>
              </Grid.Col>
            </Grid>

            <Divider label="Technical Requirements" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faBox} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Capacity</p>
                    <p className="font-medium">{selectedEnquiry.technical_requirements.capacity}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faRuler} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Span</p>
                    <p className="font-medium">{selectedEnquiry.technical_requirements.span}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCog} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Quantity Required</p>
                    <p className="font-medium">{selectedEnquiry.technical_requirements.quantity}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faBuilding} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Material Type</p>
                    <p className="font-medium">{selectedEnquiry.technical_requirements.material_type}</p>
                  </div>
                </div>
              </Grid.Col>
            </Grid>

            <Divider label="Timeline" labelPosition="left" />
            <div className="space-y-4">
              {selectedEnquiry.timeline.map((item: any, idx: number) => (
                <div key={idx} className="flex items-start justify-between pb-3 border-b last:border-0">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <p className="text-sm text-gray-400">{item.date}</p>
                </div>
              ))}
            </div>

            {selectedEnquiry.notes && (
              <>
                <Divider label="Notes" labelPosition="left" />
                <Paper withBorder p="md" bg="gray.0">
                  <p className="text-sm">{selectedEnquiry.notes}</p>
                </Paper>
              </>
            )}

            {selectedEnquiry.documents.length > 0 && (
              <>
                <Divider label="Documents" labelPosition="left" />
                <div className="space-y-2">
                  {selectedEnquiry.documents.map((doc: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faFileAlt} className="text-blue-500" />
                        <span className="text-sm">{doc.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">{doc.size}</span>
                        <Tooltip label="Download">
                          <ActionIcon variant="subtle" color="blue" size="sm">
                            <FontAwesomeIcon icon={faDownload} />
                          </ActionIcon>
                        </Tooltip>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* Add Enquiry Modal */}
      <Modal opened={addOpened} onClose={() => setAddOpened(false)} title="Add Enquiry" size="lg" centered>
        <form onSubmit={handleAddSubmit} className="mt-2 space-y-6">
          <div>
            <Title order={5} className="mb-3 text-gray-700">Customer Details</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput
                label="Customer Name"
                placeholder="Enter Customer Name"
                value={addField.customer_name}
                onChange={(e) => handleAddChange('customer_name', e.currentTarget.value)}
                required
              />
              <TextInput
                label="Company Name"
                placeholder="Enter Company Name"
                value={addField.company_name}
                onChange={(e) => handleAddChange('company_name', e.currentTarget.value)}
              />
              <TextInput
                label="Contact Number"
                placeholder="+91 9876545678"
                value={addField.contact_number}
                onChange={(e) => handleAddChange('contact_number', e.currentTarget.value)}
                required
              />
              <TextInput
                label="Email"
                placeholder="abc@email.com"
                value={addField.email}
                onChange={(e) => handleAddChange('email', e.currentTarget.value)}
                type="email"
              />
              <Select
                label="Lead Source"
                placeholder="Select Lead Source"
                data={['Website', 'Reference', 'Walk-in', 'Call', 'Email', 'Social Media']}
                value={addField.lead_source}
                onChange={(value) => handleAddChange('lead_source', value || 'Website')}
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Project Details</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput
                label="Project Name"
                placeholder="Enter Project Name"
                value={addField.project_name}
                onChange={(e) => handleAddChange('project_name', e.currentTarget.value)}
                required
              />
              <CustomDateInput
                label="Project Start Date"
                name="start_date"
                value={addField.project_start_date}
                onChange={(e) => handleAddChange('project_start_date', e?.currentTarget?.value || '')}
              />
              <CustomDateInput
                label="Project Completion Date"
                name="completion_date"
                value={addField.project_completion_date}
                onChange={(e) => handleAddChange('project_completion_date', e?.currentTarget?.value || '')}
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Requirements</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextInput
                label="Material Type"
                placeholder="Enter Material Type"
                value={addField.material_type}
                onChange={(e) => handleAddChange('material_type', e.currentTarget.value)}
              />
              <Select
                label="Quantity"
                placeholder="Select Quantity"
                data={['1 Unit', '2 Units', '3 Units', '4 Units', '5 Units', '6+ Units']}
                value={addField.quantity}
                onChange={(value) => handleAddChange('quantity', value || '')}
              />
              <Textarea
                label="Special Requirements"
                placeholder="Remarks..."
                value={addField.special_requirements}
                onChange={(e) => handleAddChange('special_requirements', e.currentTarget.value)}
                minRows={2}
              />
              <Textarea
                label="Notes"
                placeholder="Remarks..."
                value={addField.notes}
                onChange={(e) => handleAddChange('notes', e.currentTarget.value)}
                minRows={2}
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Upload files</Title>
            <FileInput
              placeholder="Drag & Drop files here or click to Upload"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg,.webp"
              value={addField.files}
              onChange={(file) => handleAddChange('files', file)}
              className="w-full"
            />
            <p className="mt-1 text-xs text-gray-400">Upload - PDF, DOC, DOCX, XLS, PPT, PNG, JPG, WEBP</p>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
            <Button variant="outline" onClick={() => setAddOpened(false)}>
              Cancel
            </Button>
            <Button variant="outline" color="blue">
              Add Enquiry
            </Button>
            <Button variant="filled" color="blue">
              Submit to Documentation
            </Button>
            <Button variant="filled" color="green">
              Send for Quotation
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Enquiry Modal */}
      <Modal opened={editOpened} onClose={() => setEditOpened(false)} title="Edit Enquiry" size="lg" centered>
        <form onSubmit={handleEditSubmit} className="mt-2 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextInput
              label="Enquiry ID"
              value={editField.enquiry_id}
              disabled
            />
            <TextInput
              label="Customer Name"
              value={editField.customer}
              onChange={(e) => handleEditChange('customer', e.currentTarget.value)}
              required
            />
            <TextInput
              label="Project Name"
              value={editField.project_name}
              onChange={(e) => handleEditChange('project_name', e.currentTarget.value)}
              required
            />
            <TextInput
              label="Requirement"
              value={editField.requirement}
              onChange={(e) => handleEditChange('requirement', e.currentTarget.value)}
              placeholder="e.g., 10 Ton | 20m Span"
            />
            <TextInput
              label="Est. Value (₹)"
              value={editField.est_value}
              onChange={(e) => handleEditChange('est_value', e.currentTarget.value)}
              type="number"
            />
            <Select
              label="Status"
              data={['Draft', 'Documentation', 'Sent for Quotation', 'Quoted', 'Order Confirmed', 'Lost']}
              value={editField.status}
              onChange={(value) => handleEditChange('status', value || 'Draft')}
            />
            <TextInput
              label="Assigned To"
              value={editField.assigned_to}
              onChange={(e) => handleEditChange('assigned_to', e.currentTarget.value)}
            />
            <TextInput
              label="Project Type"
              value={editField.project_type}
              onChange={(e) => handleEditChange('project_type', e.currentTarget.value)}
              placeholder="Gantry Crane / EOT Crane / JIB Crane"
            />
            <Select
              label="Priority"
              data={['Low', 'Medium', 'High']}
              value={editField.priority}
              onChange={(value) => handleEditChange('priority', value || 'Medium')}
            />
            <TextInput
              label="Location"
              value={editField.location}
              onChange={(e) => handleEditChange('location', e.currentTarget.value)}
            />
            <TextInput
              label="Capacity (Ton)"
              value={editField.capacity}
              onChange={(e) => handleEditChange('capacity', e.currentTarget.value)}
            />
            <TextInput
              label="Span (Meter)"
              value={editField.span}
              onChange={(e) => handleEditChange('span', e.currentTarget.value)}
            />
            <TextInput
              label="Quantity"
              value={editField.quantity}
              onChange={(e) => handleEditChange('quantity', e.currentTarget.value)}
            />
            <TextInput
              label="Material Type"
              value={editField.material_type}
              onChange={(e) => handleEditChange('material_type', e.currentTarget.value)}
            />
          </div>
          <Textarea
            label="Notes"
            value={editField.notes}
            onChange={(e) => handleEditChange('notes', e.currentTarget.value)}
            minRows={3}
          />
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setEditOpened(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Update Enquiry
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};