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
  Progress,
  ThemeIcon,
  Table,
  Card,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faDownload,
  faPaperPlane,
  faFileAlt,
  faBuilding,
  faUser,
  faSpinner,
  faCheckCircle,
  faExclamationTriangle,
  faHourglassHalf,
  faFilter,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';

const DUMMY_DOCUMENTATION_DATA = {
  data: [
    {
      id: 'DOC001',
      enquiry_id: 'ENQ0014',
      customer: 'ABC Elevators Pvt Ltd',
      project_name: 'ABC Elevators',
      assigned_to: 'John Doe',
      doc_engineer: 'Amit Sharma',
      status: 'In Progress',
      priority: 'High',
      last_updated: '25 Apr 2026',
      created_at: '24 Apr 2026, 10:30 AM',
      sent_to_documentation: '25 Apr 2026, 10:30 AM',
      expected_completion: '28 Apr 2026',
      last_update: '24 Apr 2026, 01:15 AM',
      project_type: 'Gantry Crane',
      requirement: '10 Ton | 20m Span',
      est_value: 350000,
      attachments: [
        { name: 'SHL_PHYSICS.doc', type: 'DOC', size: '1.04 MB', uploaded_by: 'admin', date: '24 Apr 2026' },
        { name: 'Client_Inventory.doc', type: 'DOC', size: '124 KB', uploaded_by: 'Jan 08', date: '23 Apr 2026' },
        { name: 'UserManagement.pdf', type: 'PDF', size: '100 KB', uploaded_by: 'Jan 08', date: '22 Apr 2026' },
        { name: 'Notes.doc', type: 'DOC', size: '80 KB', uploaded_by: 'Jan 08', date: '21 Apr 2026' },
      ],
      customer_details: {
        name: 'ABC Elevators Pvt Ltd',
        phone: '9876545678',
        email: 'abc@demo.com',
        company: 'ABC Pvt. Ltd.',
      },
      timeline: [
        { title: 'Documentation Started', description: 'Documentation initiated by John Doe', date: '24 Apr 2026' },
        { title: 'Technical Review', description: 'Documents under technical review', date: '25 Apr 2026' },
      ],
      notes: 'Need quick approval for documentation. Client waiting for technical specs.',
    },
    {
      id: 'DOC002',
      enquiry_id: 'ENQ0023',
      customer: 'XYZ Infra Solution',
      project_name: 'XYZ Infra',
      assigned_to: 'John Doe',
      doc_engineer: 'N/A',
      status: 'Completed',
      priority: 'Medium',
      last_updated: '27 Apr 2026',
      created_at: '25 Apr 2026, 11:00 AM',
      sent_to_documentation: '25 Apr 2026, 02:30 PM',
      expected_completion: '27 Apr 2026',
      last_update: '27 Apr 2026, 05:00 PM',
      project_type: 'EOT Crane',
      requirement: '5 Ton | 12m Span',
      est_value: 220000,
      attachments: [
        { name: 'Technical_Specs.pdf', type: 'PDF', size: '3.2 MB', uploaded_by: 'John Doe', date: '26 Apr 2026' },
      ],
      customer_details: {
        name: 'XYZ Infra Solution',
        phone: '9988776655',
        email: 'xyz@demo.com',
        company: 'XYZ Infra Pvt Ltd',
      },
      timeline: [
        { title: 'Documentation Started', description: 'Documentation initiated', date: '25 Apr 2026' },
        { title: 'Technical Review', description: 'Review completed', date: '26 Apr 2026' },
        { title: 'Documentation Completed', description: 'All documents approved', date: '27 Apr 2026' },
      ],
      notes: 'Documentation completed successfully. Ready for quotation.',
    },
    {
      id: 'DOC003',
      enquiry_id: 'ENQ0044',
      customer: 'POR Engineering',
      project_name: 'POR Engine',
      assigned_to: 'Mike Smith',
      doc_engineer: 'Ben Brown',
      status: 'In Progress',
      priority: 'Low',
      last_updated: '22 Apr 2026',
      created_at: '20 Apr 2026, 02:30 PM',
      sent_to_documentation: '20 Apr 2026, 04:00 PM',
      expected_completion: '25 Apr 2026',
      last_update: '22 Apr 2026, 11:00 AM',
      project_type: 'JIB Crane',
      requirement: '2 Ton | 8m Span',
      est_value: 82000,
      attachments: [
        { name: 'Inspection_Report.pdf', type: 'PDF', size: '1.0 MB', uploaded_by: 'Mike Smith', date: '21 Apr 2026' },
      ],
      customer_details: {
        name: 'POR Engineering',
        phone: '9876543210',
        email: 'por@demo.com',
        company: 'POR Engineering Works',
      },
      timeline: [
        { title: 'Documentation Started', description: 'Documentation initiated by Mike Smith', date: '20 Apr 2026' },
        { title: 'Under Review', description: 'Technical documents under review', date: '22 Apr 2026' },
      ],
      notes: 'Pending client approval for technical drawings.',
    },
    {
      id: 'DOC004',
      enquiry_id: 'ENQ0019',
      customer: 'LMN Industries',
      project_name: 'LMN Industry',
      assigned_to: 'John Doe',
      doc_engineer: 'Boris Moros',
      status: 'Prioritized',
      priority: 'High',
      last_updated: '28 Aug 2024',
      created_at: '27 Aug 2024, 09:00 AM',
      sent_to_documentation: '27 Aug 2024, 11:00 AM',
      expected_completion: '30 Aug 2024',
      last_update: '28 Aug 2024, 03:00 PM',
      project_type: 'Gantry Crane',
      requirement: '20 Ton | 30m Span',
      est_value: 875000,
      attachments: [
        { name: 'Requirement_Doc.pdf', type: 'PDF', size: '5.1 MB', uploaded_by: 'John Doe', date: '27 Aug 2024' },
        { name: 'Site_Plan.dwg', type: 'DWG', size: '1.8 MB', uploaded_by: 'John Doe', date: '28 Aug 2024' },
      ],
      customer_details: {
        name: 'LMN Industries',
        phone: '9988001122',
        email: 'lmn@demo.com',
        company: 'LMN Industries Ltd',
      },
      timeline: [
        { title: 'Documentation Started', description: 'Priority documentation initiated', date: '27 Aug 2024' },
        { title: 'Urgent Review', description: 'High priority review', date: '28 Aug 2024' },
      ],
      notes: 'Urgent documentation required. Client needs immediate processing.',
    },
    {
      id: 'DOC005',
      enquiry_id: 'ENQ0016',
      customer: 'DPS Steel',
      project_name: 'DPS Steels',
      assigned_to: 'John Doe',
      doc_engineer: 'Nikita Verma',
      status: 'Sent to Quality',
      priority: 'Medium',
      last_updated: '18 Jul 2024',
      created_at: '15 Jul 2024, 10:00 AM',
      sent_to_documentation: '15 Jul 2024, 02:00 PM',
      expected_completion: '20 Jul 2024',
      last_update: '18 Jul 2024, 04:00 PM',
      project_type: 'EOT Crane',
      requirement: '3 Ton | 10m Span',
      est_value: 145000,
      attachments: [
        { name: 'Initial_Enquiry.pdf', type: 'PDF', size: '0.8 MB', uploaded_by: 'John Doe', date: '16 Jul 2024' },
      ],
      customer_details: {
        name: 'DPS Steel',
        phone: '8899776655',
        email: 'dps@demo.com',
        company: 'DPS Steels Pvt Ltd',
      },
      timeline: [
        { title: 'Documentation Started', description: 'Documentation initiated', date: '15 Jul 2024' },
        { title: 'Quality Check', description: 'Sent to quality assurance', date: '18 Jul 2024' },
      ],
      notes: 'Documentation sent to quality team for final approval.',
    },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  'In Progress': 'yellow',
  Completed: 'green',
  Prioritized: 'red',
  'Sent to Quality': 'cyan',
  'Pending Review': 'orange',
};

const getStatusBadge = (status: string) => {
  return (
    <Badge color={STATUS_COLORS[status] || 'gray'} variant="light">
      {status}
    </Badge>
  );
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
};

export const DocumentationManagement = () => {
  const [editOpened, setEditOpened] = useState(false);
  const [viewOpened, setViewOpened] = useState(false);
  const [quotationOpened, setQuotationOpened] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const [quotationData, setQuotationData] = useState({
    designDuration: '',
    submissionDate: '',
    status: '',
    estimatedValue: '',
    notes: '',
  });

  const [editField, setEditField] = useState({
    id: '',
    enquiry_id: '',
    customer: '',
    project_name: '',
    assigned_to: '',
    doc_engineer: '',
    status: '',
    priority: '',
    expected_completion: '',
    notes: '',
  });

  const [documentsData] = useState<any>(DUMMY_DOCUMENTATION_DATA);

  const handleQuotationChange = (key: string, value: string) => {
    setQuotationData({ ...quotationData, [key]: value });
  };

  const handleEditChange = (key: string, value: string) => {
    setEditField({ ...editField, [key]: value });
  };

  const handleQuotationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quotation submitted:', { document: selectedDocument, quotationData });
    setQuotationData({
      designDuration: '',
      submissionDate: '',
      status: '',
      estimatedValue: '',
      notes: '',
    });
    setQuotationOpened(false);
    alert('Quotation request created successfully (Demo)');
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Edit submitted:', editField);
    setEditOpened(false);
    alert('Documentation updated successfully (Demo)');
  };

  const handleView = (obj: any) => {
    setSelectedDocument(obj);
    setViewOpened(true);
  };

  const handleEdit = (obj: any) => {
    setEditField({
      id: obj.id,
      enquiry_id: obj.enquiry_id,
      customer: obj.customer,
      project_name: obj.project_name,
      assigned_to: obj.assigned_to,
      doc_engineer: obj.doc_engineer,
      status: obj.status,
      priority: obj.priority,
      expected_completion: obj.expected_completion,
      notes: obj.notes,
    });
    setEditOpened(true);
  };

  const handleSendToQuotation = (obj: any) => {
    setSelectedDocument(obj);
    setQuotationOpened(true);
  };

  const handleDelete = (id: string) => {
    alert(`Delete record ${id} (Demo)`);
  };

  const tableColumns = [
    { th: { id: 'srNo', style: { minWidth: '70px', width: '70px' } }, text: 'SR NO.' },
    { text: 'ID', th: { id: 'enquiry_id', style: { minWidth: '100px' } } },
    { text: 'Customer', th: { id: 'customer', style: { minWidth: '200px' } } },
    { text: 'Project Name', th: { id: 'project_name', style: { minWidth: '180px' } } },
    { text: 'Assigned To', th: { id: 'assigned_to', style: { minWidth: '130px' } } },
    { text: 'Doc Engineer', th: { id: 'doc_engineer', style: { minWidth: '130px' } } },
    { text: 'Status', th: { id: 'status', style: { minWidth: '140px' } } },
    { text: 'Priority', th: { id: 'priority', style: { minWidth: '100px' } } },
    { text: 'Last Updated', th: { id: 'last_updated', style: { minWidth: '120px' } } },
    { text: 'Actions', th: { id: 'action', style: { minWidth: '150px' } }, justifyContent: 'center' },
  ];

  const statsData = [
    { label: 'Pending Decommissioning', value: '12', percentage: '1%', color: 'red' },
    { label: 'In Progress', value: '08', percentage: '0.8%', color: 'yellow' },
    { label: 'Completed', value: '18', percentage: '2.3%', color: 'green' },
    { label: 'Sent to Quality', value: '11', percentage: '1.6%', color: 'cyan' },
  ];

  const totalDocs = 12 + 8 + 18 + 11;

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Title order={2} className="text-gray-800">Documentation</Title>
          <p className="mt-1 text-gray-500">Track and manage documentation for enquiries</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" color="gray" leftSection={<FontAwesomeIcon icon={faFilter} />}>
            Clear Filters
          </Button>
          <Button variant="filled" color="blue" leftSection={<FontAwesomeIcon icon={faSearch} />}>
            Search
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800">{totalDocs}</div>
            <div className="text-sm text-gray-500">Total Documents</div>
          </div>
          <div className="flex-1">
            <Progress.Root size="xl">
              <Progress.Section value={12} color="red">
                <Progress.Label>12</Progress.Label>
              </Progress.Section>
              <Progress.Section value={8} color="yellow">
                <Progress.Label>8</Progress.Label>
              </Progress.Section>
              <Progress.Section value={18} color="green">
                <Progress.Label>18</Progress.Label>
              </Progress.Section>
              <Progress.Section value={11} color="cyan">
                <Progress.Label>11</Progress.Label>
              </Progress.Section>
            </Progress.Root>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <Paper key={index} withBorder p="md" radius="md" className="bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="mt-1 text-xs text-gray-400">{stat.percentage} of total</p>
                </div>
                <ThemeIcon color={stat.color} size="lg" radius="xl" variant="light">
                  <FontAwesomeIcon icon={faFileAlt} />
                </ThemeIcon>
              </div>
            </Paper>
          ))}
        </div>
      </div>

      {/* Documentation Table */}
      <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
        <CustomTable
          data={documentsData}
          setData={() => {}}
          isSearchingRequired={true}
          isSortingRequired={true}
          isPaginationRequired={true}
          tableHeadData={tableColumns}
          tableBody={() =>
            documentsData?.data?.map((obj: any, index: number) => (
              <tr key={obj.id} className="transition border-b hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-medium text-gray-600">{index + 1}</td>
                <td className="px-3 py-2 text-sm font-medium text-blue-600">{obj.enquiry_id}</td>
                <td className="px-3 py-2 text-sm">{obj.customer}</td>
                <td className="px-3 py-2 text-sm">{obj.project_name}</td>
                <td className="px-3 py-2 text-sm">{obj.assigned_to}</td>
                <td className="px-3 py-2 text-sm">{obj.doc_engineer === 'N/A' ? '—' : obj.doc_engineer}</td>
                <td className="px-3 py-2">{getStatusBadge(obj.status)}</td>
                <td className="px-3 py-2">
                  <Badge color={obj.priority === 'High' ? 'red' : obj.priority === 'Medium' ? 'yellow' : 'gray'} variant="outline">
                    {obj.priority}
                  </Badge>
                </td>
                <td className="px-3 py-2 text-sm">{obj.last_updated}</td>
                <td className="px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Tooltip label="View Details">
                      <ActionIcon variant="subtle" color="blue" onClick={() => handleView(obj)}>
                        <FontAwesomeIcon icon={faEye} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Send to Quotation">
                      <ActionIcon variant="subtle" color="green" onClick={() => handleSendToQuotation(obj)}>
                        <FontAwesomeIcon icon={faPaperPlane} />
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
          url="documentation?demo=true"
          notFoundMessage="No Documentation Data Found."
          notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
        />
      </div>

      {/* View Documentation Modal */}
      <Modal
        opened={viewOpened}
        onClose={() => setViewOpened(false)}
        title={`${selectedDocument?.enquiry_id || ''} | ${selectedDocument?.customer || ''}`}
        size="xl"
        centered
      >
        {selectedDocument && (
          <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between pb-4 border-b">
              <Badge color="blue" size="lg">Site visited on 25 Apr 2026, 10:30 AM</Badge>
              <div className="flex gap-2">
                <Button size="xs" variant="outline" leftSection={<FontAwesomeIcon icon={faEye} />}>
                  View Display
                </Button>
                <Button size="xs" variant="outline" leftSection={<FontAwesomeIcon icon={faBuilding} />}>
                  View Site Walk
                </Button>
              </div>
            </div>

            <Grid>
              <Grid.Col span={6}>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Project Name</p>
                    <p className="font-medium">{selectedDocument.project_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Assignee To</p>
                    <p className="font-medium">{selectedDocument.assigned_to}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Documentation Engineer</p>
                    <p className="font-medium">{selectedDocument.doc_engineer !== 'N/A' ? selectedDocument.doc_engineer : 'Not Assigned'}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Priority</p>
                    <Badge color={selectedDocument.priority === 'High' ? 'red' : selectedDocument.priority === 'Medium' ? 'yellow' : 'gray'} size="lg">
                      {selectedDocument.priority}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sent to Documentation</p>
                    <p className="font-medium">{selectedDocument.sent_to_documentation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expected Completion</p>
                    <p className="font-medium">{selectedDocument.expected_completion}</p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={12}>
                <div>
                  <p className="text-sm text-gray-500">Last Update</p>
                  <p className="font-medium">{selectedDocument.last_update}</p>
                </div>
              </Grid.Col>
            </Grid>

            <Divider label="Attachments" labelPosition="left" />
            <div className="space-y-2">
              <p className="mb-2 text-sm text-gray-500">Uploaded File(s): ({selectedDocument.attachments.length})</p>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>File</Table.Th>
                    <Table.Th>Type</Table.Th>
                    <Table.Th>Size</Table.Th>
                    <Table.Th>Uploaded By</Table.Th>
                    <Table.Th>Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {selectedDocument.attachments.map((doc: any, idx: number) => (
                    <Table.Tr key={idx}>
                      <Table.Td className="font-medium">{doc.name}</Table.Td>
                      <Table.Td>{doc.type}</Table.Td>
                      <Table.Td>{doc.size}</Table.Td>
                      <Table.Td>{doc.uploaded_by}</Table.Td>
                      <Table.Td>
                        <div className="flex gap-2">
                          <ActionIcon variant="subtle" color="blue" size="sm">
                            <FontAwesomeIcon icon={faEdit} />
                          </ActionIcon>
                          <ActionIcon variant="subtle" color="red" size="sm">
                            <FontAwesomeIcon icon={faTrash} />
                          </ActionIcon>
                          <ActionIcon variant="subtle" color="green" size="sm">
                            <FontAwesomeIcon icon={faDownload} />
                          </ActionIcon>
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>

            {selectedDocument.notes && (
              <>
                <Divider label="Notes" labelPosition="left" />
                <Paper withBorder p="md" bg="gray.0">
                  <p className="text-sm">{selectedDocument.notes}</p>
                </Paper>
              </>
            )}

            <Divider label="Timeline" labelPosition="left" />
            <div className="space-y-3">
              {selectedDocument.timeline.map((item: any, idx: number) => (
                <div key={idx} className="flex items-start justify-between pb-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <p className="text-sm text-gray-400">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Send to Quotation Modal */}
      <Modal
        opened={quotationOpened}
        onClose={() => setQuotationOpened(false)}
        title="Send to Quotation"
        size="lg"
        centered
      >
        <form onSubmit={handleQuotationSubmit} className="space-y-6">
          <div className="mb-4">
            <p className="mb-3 text-sm text-gray-500">Create quotation request from this documentation</p>
            <Card withBorder p="md" radius="md" className="border-blue-200 bg-blue-50">
              <div>
                <Badge color="blue" variant="light" size="lg" className="mb-2">
                  {selectedDocument?.enquiry_id}
                </Badge>
                <Title order={4} className="mb-1 text-gray-800">{selectedDocument?.customer}</Title>
                <p className="mb-1 text-sm text-gray-600">{selectedDocument?.project_type} | {selectedDocument?.requirement}</p>
                <p className="text-sm font-semibold text-gray-700">Estimated: {formatCurrency(selectedDocument?.est_value || 0)}</p>
              </div>
            </Card>
          </div>

          <Divider label="Design Coordination Requirements" labelPosition="left" />

          <div className="space-y-4">
            <Select
              label="Design Duration"
              placeholder="Select duration"
              data={['Ongoing', '1 Week', '2 Weeks', '3 Weeks', '1 Month']}
              value={quotationData.designDuration}
              onChange={(value) => handleQuotationChange('designDuration', value || '')}
            />

            <CustomDateInput
              label="Submission Date"
              name="submission_date"
              value={quotationData.submissionDate}
              onChange={(e) => handleQuotationChange('submissionDate', e?.currentTarget?.value || '')}
            />

            <Select
              label="Status"
              placeholder="Select status"
              data={['Not Started', 'In Progress', 'Under Review', 'Approved', 'Rejected']}
              value={quotationData.status}
              onChange={(value) => handleQuotationChange('status', value || '')}
            />

            <TextInput
              label="Estimated Project Value"
              placeholder="Enter estimated project value"
              type="number"
              value={quotationData.estimatedValue}
              onChange={(e) => handleQuotationChange('estimatedValue', e.currentTarget.value)}
              leftSection="₹"
            />

            <Textarea
              label="Notes / Instructions"
              placeholder="Notes / Instructions..."
              minRows={3}
              value={quotationData.notes}
              onChange={(e) => handleQuotationChange('notes', e.currentTarget.value)}
            />
          </div>

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

      {/* Edit Documentation Modal */}
      <Modal opened={editOpened} onClose={() => setEditOpened(false)} title="Edit Documentation" size="lg" centered>
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
              label="Assigned To"
              value={editField.assigned_to}
              onChange={(e) => handleEditChange('assigned_to', e.currentTarget.value)}
            />
            <TextInput
              label="Documentation Engineer"
              value={editField.doc_engineer}
              onChange={(e) => handleEditChange('doc_engineer', e.currentTarget.value)}
              placeholder="Enter engineer name"
            />
            <Select
              label="Status"
              data={['In Progress', 'Completed', 'Prioritized', 'Sent to Quality', 'Pending Review']}
              value={editField.status}
              onChange={(value) => handleEditChange('status', value || '')}
            />
            <Select
              label="Priority"
              data={['Low', 'Medium', 'High']}
              value={editField.priority}
              onChange={(value) => handleEditChange('priority', value || '')}
            />
            <CustomDateInput
              label="Expected Completion"
              name="expected_completion"
              value={editField.expected_completion}
              onChange={(e) => handleEditChange('expected_completion', e?.currentTarget?.value || '')}
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
              Update Documentation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};