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
  Table,
  Rating,
  Progress,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faDownload,
  faUpload,
  faMapMarkerAlt,
  faCalendarAlt,
  faUser,
  faPhone,
  faBuilding,
  faClipboardList,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faChartLine,
  faFileAlt,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';

const DUMMY_SITE_VISITS_DATA = {
  data: [
    {
      id: 'SV0025',
      visit_id: 'SV0025',
      customer: 'ABC Elevators Pvt Ltd',
      lead_enquiry: 'ENQ0014',
      site_address: '123 Industrial area, Stellar Park, Sector 62, Noida, Uttar Pradesh 201301',
      visit_date: '25 Apr 2026',
      visit_time: '10:00 AM',
      purpose: 'Site Inspection',
      sales_executive: 'John Doe',
      status: 'Completed',
      created_at: '24 Apr 2026, 10:30 AM',
      last_update: '25 Apr 2026, 02:15 PM',
      project_name: 'ABC Elevators',
      customer_details: {
        name: 'Mr Rajesh',
        contact: '9870367678',
        email: 'rajesh@abc.com',
      },
      visit_type: 'On-site Meeting',
      visit_summary: 'Visited the site and inspected the area for installation of 10 Ton Gantry Crane. Discussed the operational requirements, crane movement area and headroom clearance.',
      next_steps: 'Send the Technical proposal, Share BOQ, Schedule follow-up meeting',
      attachments: [
        { name: 'Site Inspection Report.pdf', type: 'PDF', size: '1.34 MB', uploaded_by: 'John Doe' },
        { name: 'Site Photos.zip', type: 'ZIP', size: '2.45 MB', uploaded_by: 'John Doe' },
        { name: 'Measurement Sheet.xlsx', type: 'XLSX', size: '1.00 MB', uploaded_by: 'John Doe' },
      ],
      visit_outcome: 'Success',
      client_interest: 'High',
      budget_discussed: '₹3.50L - ₹5L',
      decision_maker: 'Mr Rajesh',
      visit_observations: 'Visited site and inspected installation area. Client requests 10 Ton Gantry Crane. Span approx. 20m. Outdoor installation. Power supply available. Structure feasible.',
      location: {
        lat: 28.5355,
        lng: 77.3910,
        address: 'Noida, Uttar Pradesh',
      },
    },
    {
      id: 'SV0024',
      visit_id: 'SV0024',
      customer: 'XYZ Infra Solution',
      lead_enquiry: 'ENQ0023',
      site_address: 'Plot No 24, MIDC, Chakan, Pune, Maharashtra 410501',
      visit_date: '27 Apr 2026',
      visit_time: '02:20 PM',
      purpose: 'Measurement',
      sales_executive: 'John Doe',
      status: 'Scheduled',
      created_at: '25 Apr 2026, 11:00 AM',
      last_update: '27 Apr 2026, 09:00 AM',
      project_name: 'XYZ Infra',
      customer_details: {
        name: 'Mr Amit',
        contact: '9988776655',
        email: 'amit@xyz.com',
      },
      visit_type: 'Technical Assessment',
      visit_summary: 'Conducted detailed measurements for crane installation. Checked beam alignment and column positions.',
      next_steps: 'Prepare technical drawing, Submit quotation',
      attachments: [
        { name: 'Measurements.pdf', type: 'PDF', size: '2.10 MB', uploaded_by: 'John Doe' },
      ],
      visit_outcome: 'Pending',
      client_interest: 'Medium',
      budget_discussed: '₹2.20L - ₹3L',
      decision_maker: 'Mr Amit',
      visit_observations: 'Site has good accessibility. Need to consider height restrictions.',
      location: {
        lat: 18.7589,
        lng: 73.7589,
        address: 'Pune, Maharashtra',
      },
    },
    {
      id: 'SV0023',
      visit_id: 'SV0023',
      customer: 'POR Engineering',
      lead_enquiry: 'ENQ0044',
      site_address: '75, Phase 1, GIDC, Vatva, Ahmedabad, Gujarat 382445',
      visit_date: '22 Apr 2026',
      visit_time: '11:00 AM',
      purpose: 'Site Inspection',
      sales_executive: 'Mike Smith',
      status: 'Completed',
      created_at: '20 Apr 2026, 02:30 PM',
      last_update: '22 Apr 2026, 04:00 PM',
      project_name: 'POR Engine',
      customer_details: {
        name: 'Mr Sandeep',
        contact: '9876543210',
        email: 'sandeep@por.com',
      },
      visit_type: 'On-site Meeting',
      visit_summary: 'Inspected the installation area for JIB Crane. Discussed mounting options.',
      next_steps: 'Send quotation with installation timeline',
      attachments: [
        { name: 'Inspection Report.pdf', type: 'PDF', size: '1.00 MB', uploaded_by: 'Mike Smith' },
      ],
      visit_outcome: 'Success',
      client_interest: 'High',
      budget_discussed: '₹80K - ₹1L',
      decision_maker: 'Mr Sandeep',
      visit_observations: 'Wall mounted JIB crane suitable. Space available for installation.',
      location: {
        lat: 23.0225,
        lng: 72.5714,
        address: 'Ahmedabad, Gujarat',
      },
    },
    {
      id: 'SV0022',
      visit_id: 'SV0022',
      customer: 'LMN Industries',
      lead_enquiry: 'ENQ0019',
      site_address: '40-A, RIICO Industrial Area Bhiwadi, Alwar, Rajasthan 301019',
      visit_date: '25 Apr 2026',
      visit_time: '02:20 PM',
      purpose: 'Requirement Discussion',
      sales_executive: 'John Doe',
      status: 'Completed',
      created_at: '23 Apr 2026, 01:15 PM',
      last_update: '25 Apr 2026, 05:30 PM',
      project_name: 'LMN Industry',
      customer_details: {
        name: 'Mr Vijay',
        contact: '9988001122',
        email: 'vijay@lmn.com',
      },
      visit_type: 'Consultation',
      visit_summary: 'Discussed detailed requirements for 20 Ton crane. Reviewed site layout and operational needs.',
      next_steps: 'Provide detailed engineering drawing, Share cost breakdown',
      attachments: [
        { name: 'Requirements.docx', type: 'DOCX', size: '0.50 MB', uploaded_by: 'John Doe' },
        { name: 'Site Photos.jpg', type: 'JPG', size: '3.20 MB', uploaded_by: 'John Doe' },
      ],
      visit_outcome: 'Success',
      client_interest: 'Very High',
      budget_discussed: '₹8L - ₹10L',
      decision_maker: 'Mr Vijay',
      visit_observations: 'Client is serious about the project. Need heavy duty crane with advanced features.',
      location: {
        lat: 28.2090,
        lng: 76.6926,
        address: 'Bhiwadi, Rajasthan',
      },
    },
    {
      id: 'SV0021',
      visit_id: 'SV0021',
      customer: 'DPS Steel',
      lead_enquiry: 'ENQ0016',
      site_address: '10, road complex, Indirapuram, Kukatpally, Hyderabad, Telangana 500034',
      visit_date: '10 Apr 2026',
      visit_time: '09:30 AM',
      purpose: 'Site Inspection',
      sales_executive: 'John Doe',
      status: 'Completed',
      created_at: '08 Apr 2026, 10:00 AM',
      last_update: '10 Apr 2026, 12:00 PM',
      project_name: 'DPS Steels',
      customer_details: {
        name: 'Mr Deepak',
        contact: '8899776655',
        email: 'deepak@dps.com',
      },
      visit_type: 'Technical Assessment',
      visit_summary: 'Inspected the steel plant area for crane installation. Checked structural integrity.',
      next_steps: 'Share inspection report, Schedule follow-up meeting',
      attachments: [
        { name: 'Inspection_Report.pdf', type: 'PDF', size: '0.80 MB', uploaded_by: 'John Doe' },
      ],
      visit_outcome: 'Success',
      client_interest: 'Medium',
      budget_discussed: '₹1.40L - ₹1.80L',
      decision_maker: 'Mr Deepak',
      visit_observations: 'Existing structure can support the crane. Need minor reinforcements.',
      location: {
        lat: 17.4455,
        lng: 78.3774,
        address: 'Hyderabad, Telangana',
      },
    },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  Scheduled: 'blue',
  Completed: 'green',
  Cancelled: 'red',
  'In Progress': 'yellow',
};

const getStatusBadge = (status: string) => {
  return <Badge color={STATUS_COLORS[status] || 'gray'} variant="light">{status}</Badge>;
};

export const SiteVisitsManagement = () => {
  const [addOpened, setAddOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [viewOpened, setViewOpened] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<any>(null);

  const [addField, setAddField] = useState({
    lead_enquiry: '',
    visit_date: '',
    customer_name: '',
    contact_number: '',
    project_name: '',
    purpose: '',
    visit_type: '',
    sales_executive: '',
    location: '',
    visit_outcome: '',
    client_interest: '',
    budget_discussed: '',
    decision_maker: '',
    visit_summary: '',
    visit_observations: '',
    files: null as File | null,
  });

  const [editField, setEditField] = useState({
    id: '',
    visit_id: '',
    customer: '',
    lead_enquiry: '',
    site_address: '',
    visit_date: '',
    visit_time: '',
    purpose: '',
    sales_executive: '',
    status: '',
    project_name: '',
    customer_name: '',
    contact_number: '',
    visit_type: '',
    visit_summary: '',
    next_steps: '',
    visit_outcome: '',
    client_interest: '',
    budget_discussed: '',
    decision_maker: '',
    visit_observations: '',
  });

  const [visitsData] = useState<any>(DUMMY_SITE_VISITS_DATA);

  const handleAddChange = (key: string, value: string | File | null) => {
    setAddField({ ...addField, [key]: value });
  };

  const handleEditChange = (key: string, value: string) => {
    setEditField({ ...editField, [key]: value });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add submitted:', addField);
    setAddField({
      lead_enquiry: '',
      visit_date: '',
      customer_name: '',
      contact_number: '',
      project_name: '',
      purpose: '',
      visit_type: '',
      sales_executive: '',
      location: '',
      visit_outcome: '',
      client_interest: '',
      budget_discussed: '',
      decision_maker: '',
      visit_summary: '',
      visit_observations: '',
      files: null,
    });
    setAddOpened(false);
    alert('Site Visit added successfully (Demo)');
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Edit submitted:', editField);
    setEditOpened(false);
    alert('Site Visit updated successfully (Demo)');
  };

  const handleView = (obj: any) => {
    setSelectedVisit(obj);
    setViewOpened(true);
  };

  const handleEdit = (obj: any) => {
    setEditField({
      id: obj.id,
      visit_id: obj.visit_id,
      customer: obj.customer,
      lead_enquiry: obj.lead_enquiry,
      site_address: obj.site_address,
      visit_date: obj.visit_date,
      visit_time: obj.visit_time,
      purpose: obj.purpose,
      sales_executive: obj.sales_executive,
      status: obj.status,
      project_name: obj.project_name,
      customer_name: obj.customer_details?.name || '',
      contact_number: obj.customer_details?.contact || '',
      visit_type: obj.visit_type,
      visit_summary: obj.visit_summary,
      next_steps: obj.next_steps,
      visit_outcome: obj.visit_outcome,
      client_interest: obj.client_interest,
      budget_discussed: obj.budget_discussed,
      decision_maker: obj.decision_maker,
      visit_observations: obj.visit_observations,
    });
    setEditOpened(true);
  };

  const handleDelete = (id: string) => {
    alert(`Delete record ${id} (Demo)`);
  };

  const tableColumns = [
    { th: { id: 'srNo', style: { minWidth: '70px', width: '70px' } }, text: 'SR NO.' },
    { text: 'Visit ID', th: { id: 'visit_id', style: { minWidth: '100px' } } },
    { text: 'Customer', th: { id: 'customer', style: { minWidth: '200px' } } },
    { text: 'Lead/Enquiry', th: { id: 'lead_enquiry', style: { minWidth: '120px' } } },
    { text: 'Site Address', th: { id: 'site_address', style: { minWidth: '250px' } } },
    { text: 'Visit Date and Time', th: { id: 'visit_datetime', style: { minWidth: '150px' } } },
    { text: 'Purpose', th: { id: 'purpose', style: { minWidth: '130px' } } },
    { text: 'Sales Executive', th: { id: 'sales_executive', style: { minWidth: '140px' } } },
    { text: 'Status', th: { id: 'status', style: { minWidth: '110px' } } },
    { text: 'Actions', th: { id: 'action', style: { minWidth: '100px' } }, justifyContent: 'center' },
  ];

  const statsCards = [
    { title: 'Total Visits', value: '68', change: '+12%', trend: 'up', icon: faClipboardList },
    { title: 'Upcoming', value: '12', change: 'Next 7 days', trend: 'neutral', icon: faCalendarAlt },
    { title: 'Completed', value: '42', change: '+18%', trend: 'up', icon: faCheckCircle },
    { title: 'Cancelled', value: '6', change: '-5%', trend: 'down', icon: faTimesCircle },
    { title: 'Conversion', value: '32%', change: 'Active Enquiry', trend: 'neutral', icon: faChartLine },
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Title order={2} className="text-gray-800">Site Visits</Title>
          <p className="mt-1 text-gray-500">Manage and track all site visits for leads and enquiries</p>
        </div>
        <Button
          onClick={() => setAddOpened(true)}
          color="blue"
          leftSection={<FontAwesomeIcon icon={faPlus} />}
          size="md"
        >
          Add Visit
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-5">
        {statsCards.map((stat, index) => (
          <Paper key={index} withBorder p="md" radius="md" className="bg-white">
            <div className="flex items-center justify-between mb-2">
              <FontAwesomeIcon icon={stat.icon} className="text-xl text-blue-500" />
              <span className={`text-xs font-medium ${
                stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
              <span className="mt-1 text-sm font-medium text-gray-500">{stat.title}</span>
            </div>
          </Paper>
        ))}
      </div>

      {/* Site Visits Table */}
      <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
        <CustomTable
          data={visitsData}
          setData={() => {}}
          isSearchingRequired={true}
          isSortingRequired={true}
          isPaginationRequired={true}
          tableHeadData={tableColumns}
          tableBody={() =>
            visitsData?.data?.map((obj: any, index: number) => (
              <tr key={obj.id} className="transition border-b hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-medium text-gray-600">{index + 1}</td>
                <td className="px-3 py-2 text-sm font-medium text-blue-600">{obj.visit_id}</td>
                <td className="px-3 py-2 text-sm">{obj.customer}</td>
                <td className="px-3 py-2 font-mono text-sm">{obj.lead_enquiry}</td>
                <td className="max-w-xs px-3 py-2 text-sm truncate">{obj.site_address}</td>
                <td className="px-3 py-2 text-sm">
                  {obj.visit_date}<br />
                  <span className="text-xs text-gray-400">{obj.visit_time}</span>
                </td>
                <td className="px-3 py-2 text-sm">{obj.purpose}</td>
                <td className="px-3 py-2 text-sm">{obj.sales_executive}</td>
                <td className="px-3 py-2">{getStatusBadge(obj.status)}</td>
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
          url="site-visits?demo=true"
          notFoundMessage="No Site Visit Data Found."
          notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
        />
      </div>

      {/* View Site Visit Modal */}
      <Modal
        opened={viewOpened}
        onClose={() => setViewOpened(false)}
        title={`${selectedVisit?.visit_id || ''} | ${selectedVisit?.customer || ''}`}
        size="xl"
        centered
      >
        {selectedVisit && (
          <div className="space-y-6">
            {/* Header Info */}
            <div className="flex items-start justify-between pb-4 border-b">
              <div>
                <Badge color="blue" size="lg">Site visited on {selectedVisit.visit_date} at {selectedVisit.visit_time}</Badge>
              </div>
              <div className="flex gap-2">
                <Button size="xs" variant="outline" leftSection={<FontAwesomeIcon icon={faEdit} />}>
                  Edit
                </Button>
                <Button size="xs" variant="filled" color="green" leftSection={<FontAwesomeIcon icon={faDownload} />}>
                  Report
                </Button>
              </div>
            </div>

            <Grid>
              <Grid.Col span={6}>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Project Name</p>
                  <p className="font-medium">{selectedVisit.project_name}</p>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="font-medium">{selectedVisit.sales_executive}</p>
                  <p className="text-xs text-gray-400">Sales Executive</p>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Created On</p>
                  <p className="font-medium">{selectedVisit.created_at}</p>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Last Update</p>
                  <p className="font-medium">{selectedVisit.last_update}</p>
                </div>
              </Grid.Col>
            </Grid>

            <Divider label="Visit Details" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faBuilding} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Lead/Enquiry</p>
                    <p className="font-medium">{selectedVisit.lead_enquiry}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faUser} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Customer Name</p>
                    <p className="font-medium">{selectedVisit.customer_details.name}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faPhone} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{selectedVisit.customer_details.contact}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faClipboardList} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Purpose</p>
                    <p className="font-medium">{selectedVisit.purpose}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Visit Type</p>
                    <p className="font-medium">{selectedVisit.visit_type}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faUser} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Sales Executive</p>
                    <p className="font-medium">{selectedVisit.sales_executive}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faClock} className="mt-1 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Created On</p>
                    <p className="font-medium">{selectedVisit.created_at}</p>
                  </div>
                </div>
              </Grid.Col>
            </Grid>

            <Divider label="Site Location" labelPosition="left" />
            <Paper withBorder p="md" bg="gray.0" className="text-center">
              <div className="flex items-center justify-center h-48 bg-gray-200 rounded-lg">
                <div className="text-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mb-2 text-4xl text-blue-500" />
                  <p className="text-sm text-gray-600">{selectedVisit.site_address}</p>
                  <Button variant="light" size="xs" mt="md" leftSection={<FontAwesomeIcon icon={faMapMarkerAlt} />}>
                    View on Map
                  </Button>
                </div>
              </div>
            </Paper>

            <Divider label="Visit Summary" labelPosition="left" />
            <Paper withBorder p="md" bg="gray.0">
              <p className="mb-4 text-sm">{selectedVisit.visit_summary}</p>
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700">Next Steps:</p>
                <p className="mt-1 text-sm text-gray-600">{selectedVisit.next_steps}</p>
              </div>
            </Paper>

            <Divider label="Attachments" labelPosition="left" />
            <div className="space-y-2">
              {selectedVisit.attachments.map((doc: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faFileAlt} className="text-blue-500" />
                    <div>
                      <span className="text-sm">{doc.name}</span>
                      <p className="text-xs text-gray-400">{doc.type} • {doc.size} • Uploaded by {doc.uploaded_by}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tooltip label="Download">
                      <ActionIcon variant="subtle" color="blue" size="sm">
                        <FontAwesomeIcon icon={faDownload} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Delete">
                      <ActionIcon variant="subtle" color="red" size="sm">
                        <FontAwesomeIcon icon={faTrash} />
                      </ActionIcon>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>

            <Divider label="Visit Report" labelPosition="left" />
            <Grid>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Visit Outcome</p>
                <Badge color={selectedVisit.visit_outcome === 'Success' ? 'green' : 'yellow'} size="lg">
                  {selectedVisit.visit_outcome}
                </Badge>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Client Interest</p>
                <div className="flex items-center gap-2">
                  <Badge color="blue">{selectedVisit.client_interest}</Badge>
                  <Progress value={selectedVisit.client_interest === 'High' ? 80 : selectedVisit.client_interest === 'Very High' ? 95 : 50} size="sm" className="flex-1" />
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Budget Discussed</p>
                <p className="font-medium">{selectedVisit.budget_discussed}</p>
              </Grid.Col>
              <Grid.Col span={6}>
                <p className="text-sm text-gray-500">Decision Maker</p>
                <p className="font-medium">{selectedVisit.decision_maker}</p>
              </Grid.Col>
            </Grid>

            <Divider label="Visit Observation" labelPosition="left" />
            <Paper withBorder p="md" bg="gray.0">
              <ul className="space-y-1 text-sm list-disc list-inside">
                {selectedVisit.visit_observations.split('. ').map((obs: string, idx: number) => (
                  obs && <li key={idx}>{obs}</li>
                ))}
              </ul>
            </Paper>
          </div>
        )}
      </Modal>

      {/* Add Site Visit Modal */}
      <Modal opened={addOpened} onClose={() => setAddOpened(false)} title="Add Site Visit" size="lg" centered>
        <form onSubmit={handleAddSubmit} className="mt-2 space-y-6">
          <div>
            <Title order={5} className="mb-3 text-gray-700">Visit Details</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Select
                label="Lead/Enquiry"
                placeholder="Select Lead/Enquiry"
                data={['ENQ0014 - ABC Elevators', 'ENQ0023 - XYZ Infra', 'ENQ0044 - POR Engineering', 'ENQ0019 - LMN Industries', 'ENQ0016 - DPS Steel']}
                value={addField.lead_enquiry}
                onChange={(value) => handleAddChange('lead_enquiry', value || '')}
                required
              />
              <CustomDateInput
                label="Date"
                name="visit_date"
                value={addField.visit_date}
                onChange={(e) => handleAddChange('visit_date', e?.currentTarget?.value || '')}
              />
              <TextInput
                label="Customer Name"
                placeholder="Enter Customer Name"
                value={addField.customer_name}
                onChange={(e) => handleAddChange('customer_name', e.currentTarget.value)}
                required
              />
              <TextInput
                label="Contact Number"
                placeholder="Enter Contact Number"
                value={addField.contact_number}
                onChange={(e) => handleAddChange('contact_number', e.currentTarget.value)}
                required
              />
              <TextInput
                label="Project Name"
                placeholder="Enter Project Name"
                value={addField.project_name}
                onChange={(e) => handleAddChange('project_name', e.currentTarget.value)}
                required
              />
              <Select
                label="Purpose"
                placeholder="Select visit purpose"
                data={['Site Inspection', 'Measurement', 'Requirement Discussion', 'Sales Inspection', 'Technical Assessment', 'Consultation']}
                value={addField.purpose}
                onChange={(value) => handleAddChange('purpose', value || '')}
                required
              />
              <Select
                label="Visit Type"
                placeholder="Select visit type"
                data={['On-site Meeting', 'Technical Assessment', 'Consultation', 'Site Survey', 'Installation Review']}
                value={addField.visit_type}
                onChange={(value) => handleAddChange('visit_type', value || '')}
                required
              />
              <Select
                label="Sales Executive"
                placeholder="Select Sales executive"
                data={['John Doe', 'Mike Smith', 'Tim Doe', 'Sarah Johnson']}
                value={addField.sales_executive}
                onChange={(value) => handleAddChange('sales_executive', value || '')}
                required
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Site Location</Title>
            <TextInput
              label="Choose Location"
              placeholder="Search location..."
              value={addField.location}
              onChange={(e) => handleAddChange('location', e.currentTarget.value)}
              leftSection={<FontAwesomeIcon icon={faMapMarkerAlt} />}
            />
            <div className="flex items-center justify-center h-32 mt-2 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-400">Map preview will appear here</p>
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Visit Report</Title>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Select
                label="Visit Outcome"
                placeholder="Select visit outcome"
                data={['Success', 'Pending', 'Failed', 'Rescheduled']}
                value={addField.visit_outcome}
                onChange={(value) => handleAddChange('visit_outcome', value || '')}
              />
              <Select
                label="Client Interest"
                placeholder="Select interest level"
                data={['Low', 'Medium', 'High', 'Very High']}
                value={addField.client_interest}
                onChange={(value) => handleAddChange('client_interest', value || '')}
              />
              <TextInput
                label="Budget Discussed"
                placeholder="Enter discussed budget"
                value={addField.budget_discussed}
                onChange={(e) => handleAddChange('budget_discussed', e.currentTarget.value)}
              />
              <TextInput
                label="Decision Maker"
                placeholder="Enter decision maker name"
                value={addField.decision_maker}
                onChange={(e) => handleAddChange('decision_maker', e.currentTarget.value)}
              />
              <Textarea
                label="Visit Summary"
                placeholder="Enter visit summary..."
                value={addField.visit_summary}
                onChange={(e) => handleAddChange('visit_summary', e.currentTarget.value)}
                minRows={3}
              />
            </div>
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Visit Observation</Title>
            <Textarea
              label="Add your notes..."
              placeholder="Enter visit observations..."
              value={addField.visit_observations}
              onChange={(e) => handleAddChange('visit_observations', e.currentTarget.value)}
              minRows={3}
            />
          </div>

          <Divider />

          <div>
            <Title order={5} className="mb-3 text-gray-700">Upload Documents</Title>
            <FileInput
              placeholder="Drag & Drop files here or click to Upload"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip"
              value={addField.files}
              onChange={(file) => handleAddChange('files', file)}
              className="w-full"
              leftSection={<FontAwesomeIcon icon={faUpload} />}
            />
            <p className="mt-1 text-xs text-gray-400">Upload - PDF, DOC, XLS, Images, ZIP (Max 10MB)</p>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
            <Button variant="outline" onClick={() => setAddOpened(false)}>
              Cancel
            </Button>
            <Button variant="outline" color="blue">
              Add Site Visit
            </Button>
            <Button variant="filled" color="blue">
              Submit to Documentation
            </Button>
            <Button variant="filled" color="green">
              Send for Approval
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Site Visit Modal */}
      <Modal opened={editOpened} onClose={() => setEditOpened(false)} title="Edit Site Visit" size="lg" centered>
        <form onSubmit={handleEditSubmit} className="mt-2 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TextInput
              label="Visit ID"
              value={editField.visit_id}
              disabled
            />
            <Select
              label="Lead/Enquiry"
              data={['ENQ0014', 'ENQ0023', 'ENQ0044', 'ENQ0019', 'ENQ0016']}
              value={editField.lead_enquiry}
              onChange={(value) => handleEditChange('lead_enquiry', value || '')}
              required
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
              label="Site Address"
              value={editField.site_address}
              onChange={(e) => handleEditChange('site_address', e.currentTarget.value)}
              required
            />
            <CustomDateInput
              label="Visit Date"
              name="visit_date"
              value={editField.visit_date}
              onChange={(e) => handleEditChange('visit_date', e?.currentTarget?.value || '')}
            />
            <TextInput
              label="Visit Time"
              placeholder="10:00 AM"
              value={editField.visit_time}
              onChange={(e) => handleEditChange('visit_time', e.currentTarget.value)}
            />
            <Select
              label="Purpose"
              data={['Site Inspection', 'Measurement', 'Requirement Discussion', 'Sales Inspection']}
              value={editField.purpose}
              onChange={(value) => handleEditChange('purpose', value || '')}
            />
            <Select
              label="Visit Type"
              data={['On-site Meeting', 'Technical Assessment', 'Consultation']}
              value={editField.visit_type}
              onChange={(value) => handleEditChange('visit_type', value || '')}
            />
            <Select
              label="Sales Executive"
              data={['John Doe', 'Mike Smith', 'Tim Doe']}
              value={editField.sales_executive}
              onChange={(value) => handleEditChange('sales_executive', value || '')}
            />
            <Select
              label="Status"
              data={['Scheduled', 'Completed', 'Cancelled', 'In Progress']}
              value={editField.status}
              onChange={(value) => handleEditChange('status', value || 'Scheduled')}
            />
            <Select
              label="Visit Outcome"
              data={['Success', 'Pending', 'Failed', 'Rescheduled']}
              value={editField.visit_outcome}
              onChange={(value) => handleEditChange('visit_outcome', value || '')}
            />
            <Select
              label="Client Interest"
              data={['Low', 'Medium', 'High', 'Very High']}
              value={editField.client_interest}
              onChange={(value) => handleEditChange('client_interest', value || '')}
            />
            <TextInput
              label="Budget Discussed"
              value={editField.budget_discussed}
              onChange={(e) => handleEditChange('budget_discussed', e.currentTarget.value)}
            />
            <TextInput
              label="Decision Maker"
              value={editField.decision_maker}
              onChange={(e) => handleEditChange('decision_maker', e.currentTarget.value)}
            />
          </div>
          <Textarea
            label="Visit Summary"
            value={editField.visit_summary}
            onChange={(e) => handleEditChange('visit_summary', e.currentTarget.value)}
            minRows={3}
          />
          <Textarea
            label="Next Steps"
            value={editField.next_steps}
            onChange={(e) => handleEditChange('next_steps', e.currentTarget.value)}
            minRows={2}
          />
          <Textarea
            label="Visit Observations"
            value={editField.visit_observations}
            onChange={(e) => handleEditChange('visit_observations', e.currentTarget.value)}
            minRows={3}
          />
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setEditOpened(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Update Site Visit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};