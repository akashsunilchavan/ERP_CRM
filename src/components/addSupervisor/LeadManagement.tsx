'use client';

import React, { useState } from 'react';
import { 
  Card, Badge, Button, Modal, TextInput, Select, Group, 
  Tabs, Progress, Divider, Tooltip, Textarea, Title 
} from '@mantine/core';
import { 
  Plus, Search, Mail, Eye, Edit3, Trash2, TrendingUp, 
  TrendingDown, CheckCircle, Clock, XCircle, Phone, 
  Calendar, Building, MapPin, Users, Star, Activity, 
  Send, PhoneCall, Video, Download, Filter, ArrowLeft,
  User, Briefcase, MessageCircle, Award, Target, AlertCircle
} from 'lucide-react';

const LeadManagement = () => {
  const [activeTab, setActiveTab] = useState<string>('leads');
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('Company 1');

  // Pipeline stages data
  const pipelineStages = {
    'Company 1': {
      New: 120,
      'In Progress': 45,
      Converted: 32,
      Lost: 12
    },
    'Company 2': {
      New: 85,
      'In Progress': 38,
      Converted: 28,
      Lost: 8
    },
    'Company 3': {
      New: 200,
      'In Progress': 95,
      Converted: 67,
      Lost: 23
    }
  };

  // Leads table data
  const [leadsData, setLeadsData] = useState([
    { 
      id: 1, 
      name: 'Haley Reece', 
      email: 'haley.reece@demo.com',
      phone: '9687564335',
      company: 'ABC Pvt. Ltd.',
      status: 'New', 
      leadsCount: 245, 
      contact: '9687564335',
      priority: 'High',
      source: 'Website',
      expectedClose: '15 June 2025',
      leadScore: 85,
      industry: 'Technology',
      location: 'New York, USA',
      employees: '250-500',
      interestedIn: 'Cloud computing solutions and enterprise software',
      description: 'Looking for scalable ERP solution for their growing business',
      activities: {
        total: 14,
        emailSent: 7,
        callsMade: 5,
        meetings: 2
      }
    },
    { 
      id: 2, 
      name: 'John Doe', 
      email: 'john.doe@demo.com',
      phone: '9876432567',
      company: 'XYZ Corp',
      status: 'Contacted', 
      leadsCount: 182, 
      contact: '9876432567',
      priority: 'Medium',
      source: 'Referral',
      expectedClose: '20 July 2025',
      leadScore: 65,
      industry: 'Finance',
      location: 'London, UK',
      employees: '100-250',
      interestedIn: 'Financial management and reporting tools',
      description: 'Need comprehensive financial software',
      activities: {
        total: 8,
        emailSent: 4,
        callsMade: 3,
        meetings: 1
      }
    },
    { 
      id: 3, 
      name: 'Tim Hardy', 
      email: 'tim.hardy@demo.com',
      phone: '8767654345',
      company: 'Tech Solutions',
      status: 'In Progress', 
      leadsCount: 96, 
      contact: '8767654345',
      priority: 'High',
      source: 'LinkedIn',
      expectedClose: '10 August 2025',
      leadScore: 92,
      industry: 'Software',
      location: 'San Francisco, USA',
      employees: '500-1000',
      interestedIn: 'AI and machine learning solutions',
      description: 'Interested in implementing AI solutions',
      activities: {
        total: 22,
        emailSent: 12,
        callsMade: 7,
        meetings: 3
      }
    },
    { 
      id: 4, 
      name: 'Robert Doe', 
      email: 'robert.doe@demo.com',
      phone: '8976789876',
      company: 'Global Inc',
      status: 'Proposal Sent', 
      leadsCount: 41, 
      contact: '8976789876',
      priority: 'Low',
      source: 'Conference',
      expectedClose: '25 September 2025',
      leadScore: 45,
      industry: 'Retail',
      location: 'Toronto, Canada',
      employees: '50-100',
      interestedIn: 'E-commerce platform',
      description: 'Looking to build online presence',
      activities: {
        total: 6,
        emailSent: 3,
        callsMade: 2,
        meetings: 1
      }
    },
    { 
      id: 5, 
      name: 'Joana Reece', 
      email: 'joana.reece@demo.com',
      phone: '6543213456',
      company: 'Creative Agency',
      status: 'Negotiation', 
      leadsCount: 22, 
      contact: '6543213456',
      priority: 'High',
      source: 'Website',
      expectedClose: '05 October 2025',
      leadScore: 78,
      industry: 'Marketing',
      location: 'Los Angeles, USA',
      employees: '25-50',
      interestedIn: 'Digital marketing tools',
      description: 'Need marketing automation platform',
      activities: {
        total: 18,
        emailSent: 9,
        callsMade: 6,
        meetings: 3
      }
    },
    { 
      id: 6, 
      name: 'Sam Doe', 
      email: 'sam.doe@demo.com',
      phone: '9807896543',
      company: 'Healthcare Plus',
      status: 'Converted', 
      leadsCount: 74, 
      contact: '9807896543',
      priority: 'Medium',
      source: 'Partner',
      expectedClose: '15 November 2025',
      leadScore: 88,
      industry: 'Healthcare',
      location: 'Chicago, USA',
      employees: '300-500',
      interestedIn: 'Healthcare management system',
      description: 'Looking for patient management solution',
      activities: {
        total: 28,
        emailSent: 15,
        callsMade: 8,
        meetings: 5
      }
    },
    { 
      id: 7, 
      name: 'Peter Robert', 
      email: 'peter.robert@demo.com',
      phone: '687890545',
      company: 'Education Hub',
      status: 'Lost', 
      leadsCount: 33, 
      contact: '687890545',
      priority: 'Low',
      source: 'Email Campaign',
      expectedClose: '20 December 2025',
      leadScore: 32,
      industry: 'Education',
      location: 'Boston, USA',
      employees: '100-250',
      interestedIn: 'Learning management system',
      description: 'Need online course platform',
      activities: {
        total: 5,
        emailSent: 3,
        callsMade: 1,
        meetings: 1
      }
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: '',
    priority: '',
    source: '',
    expectedClose: '',
    industry: '',
    location: '',
    employees: '',
    interestedIn: '',
    description: ''
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'New': 'blue',
      'Contacted': 'cyan',
      'In Progress': 'orange',
      'Proposal Sent': 'purple',
      'Negotiation': 'yellow',
      'Converted': 'green',
      'Lost': 'red'
    };
    return colors[status] || 'gray';
  };

  const getPriorityColor = (priority: string) => {
    switch(priority.toLowerCase()) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const totalLoads = pipelineStages[selectedCompany as keyof typeof pipelineStages];
  const total = totalLoads ? Object.values(totalLoads).reduce((a, b) => a + b, 0) : 0;

  const filteredLeads = leadsData.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewLead = (lead: any) => {
    setSelectedLead(lead);
    setIsViewModalOpen(true);
  };

  const handleAddLead = () => {
    const newLead = {
      id: leadsData.length + 1,
      ...formData,
      leadsCount: 0,
      contact: formData.phone,
      activities: {
        total: 0,
        emailSent: 0,
        callsMade: 0,
        meetings: 0
      }
    };
    setLeadsData([...leadsData, newLead]);
    setIsAddModalOpen(false);
    setFormData({
      name: '', email: '', phone: '', company: '', status: '', priority: '',
      source: '', expectedClose: '', industry: '', location: '', employees: '',
      interestedIn: '', description: ''
    });
    alert('Lead added successfully!');
  };

  const handleDeleteLead = (id: number) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      setLeadsData(leadsData.filter(lead => lead.id !== id));
      alert('Lead deleted successfully!');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Lead Management
              </h1>
              <p className="mt-1 text-gray-600">Manage and track your leads effectively</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" leftSection={<Filter size={16} />}>
                Filter
              </Button>
              <Button variant="outline" leftSection={<Download size={16} />}>
                Export
              </Button>
              <Button color="green" leftSection={<Plus size={16} />} onClick={() => setIsAddModalOpen(true)}>
                Add Lead
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onChange={setActiveTab} mb="lg">
          <Tabs.List grow>
            <Tabs.Tab value="leads" leftSection={<Users size={16} />}>Leads Overview</Tabs.Tab>
            <Tabs.Tab value="pipeline" leftSection={<TrendingUp size={16} />}>Pipeline Stages</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {activeTab === 'pipeline' && (
          <>
            {/* Company Selector */}
            <div className="mb-6">
              <Select
                label="Select Company"
                placeholder="Choose company"
                value={selectedCompany}
                onChange={(value) => setSelectedCompany(value || 'Company 1')}
                data={['Company 1', 'Company 2', 'Company 3']}
                className="max-w-xs"
              />
            </div>

            {/* Pipeline Stages Cards */}
            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
              {totalLoads && Object.entries(totalLoads).map(([stage, count]) => {
                const percentage = (count / total) * 100;
                const icons = {
                  'New': <TrendingUp size={24} className="text-blue-600" />,
                  'In Progress': <Clock size={24} className="text-orange-600" />,
                  'Converted': <CheckCircle size={24} className="text-green-600" />,
                  'Lost': <XCircle size={24} className="text-red-600" />
                };
                
                return (
                  <Card key={stage} shadow="sm" padding="lg" radius="md" className="transition-shadow bg-white border border-gray-200 hover:shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">{stage}</h3>
                      {icons[stage as keyof typeof icons]}
                    </div>
                    <p className="mb-2 text-3xl font-bold text-gray-800">{count}</p>
                    <p className="mb-3 text-sm text-gray-500">Loads</p>
                    <Progress value={percentage} size="sm" radius="xl" 
                      color={stage === 'New' ? 'blue' : stage === 'In Progress' ? 'orange' : stage === 'Converted' ? 'green' : 'red'} 
                    />
                    <p className="mt-2 text-xs text-gray-400">{percentage.toFixed(1)}% of total</p>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {/* Leads Table */}
        {activeTab === 'leads' && (
          <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">All Leads</h2>
              <div className="relative">
                <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
                <TextInput
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  style={{ width: '300px' }}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">sr no</th>
                    <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Name</th>
                    <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Status</th>
                    <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Priority</th>
                    <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Leads Count</th>
                    <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Contact</th>
                    <th className="px-4 py-3 text-sm font-semibold text-center text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead, index) => (
                    <tr key={lead.id} className="transition-colors border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{lead.name}</p>
                          <p className="text-xs text-gray-500">{lead.email}</p>
                        </div>
                       </td>
                      <td className="px-4 py-3">
                        <Badge color={getStatusColor(lead.status)} size="sm">
                          {lead.status}
                        </Badge>
                       </td>
                      <td className="px-4 py-3">
                        <Badge color={getPriorityColor(lead.priority)} size="sm">
                          {lead.priority}
                        </Badge>
                       </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-800">{lead.leadsCount}</span>
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-green-500 h-1.5 rounded-full" 
                              style={{ width: `${(lead.leadsCount / 245) * 100}%` }}
                            />
                          </div>
                        </div>
                       </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{lead.contact}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Tooltip label="Send Email">
                            <button className="p-1 text-blue-600 transition-colors rounded hover:bg-blue-50">
                              <Mail size={16} />
                            </button>
                          </Tooltip>
                          <Tooltip label="View Details">
                            <button 
                              onClick={() => handleViewLead(lead)}
                              className="p-1 text-green-600 transition-colors rounded hover:bg-green-50"
                            >
                              <Eye size={16} />
                            </button>
                          </Tooltip>
                          <Tooltip label="Edit">
                            <button className="p-1 text-orange-600 transition-colors rounded hover:bg-orange-50">
                              <Edit3 size={16} />
                            </button>
                          </Tooltip>
                          <Tooltip label="Delete">
                            <button 
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1 text-red-600 transition-colors rounded hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </button>
                          </Tooltip>
                        </div>
                       </td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Showing 1 to {filteredLeads.length} of {filteredLeads.length} entries
              </p>
            </div>
          </Card>
        )}

        {/* View Lead Modal */}
        <Modal
          opened={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={null}
          centered
          size="xl"
          overlayProps={{ blur: 4, opacity: 0.4 }}
        >
          {selectedLead && (
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedLead.name}</h2>
                    <p className="mt-1 text-gray-500">{selectedLead.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge color={getStatusColor(selectedLead.status)} size="lg">
                      {selectedLead.status}
                    </Badge>
                    <Badge color={getPriorityColor(selectedLead.priority)} size="lg">
                      {selectedLead.priority} Priority
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Activity Cards */}
              <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
                <div className="p-4 rounded-lg bg-blue-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Activities</p>
                      <h3 className="text-2xl font-bold text-gray-800">{selectedLead.activities.total}</h3>
                    </div>
                    <Activity size={24} className="text-blue-600" />
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-green-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Email Sent</p>
                      <h3 className="text-2xl font-bold text-gray-800">{selectedLead.activities.emailSent}</h3>
                    </div>
                    <Mail size={24} className="text-green-600" />
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-purple-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Calls Made</p>
                      <h3 className="text-2xl font-bold text-gray-800">{selectedLead.activities.callsMade}</h3>
                    </div>
                    <Phone size={24} className="text-purple-600" />
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-orange-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Meetings</p>
                      <h3 className="text-2xl font-bold text-gray-800">{selectedLead.activities.meetings}</h3>
                    </div>
                    <Calendar size={24} className="text-orange-600" />
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <Divider label="Basic Information" labelPosition="center" mb="md" />
              <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-sm font-medium text-gray-800">{selectedLead.name}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-800">{selectedLead.email}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-800">{selectedLead.phone}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Company</p>
                  <p className="text-sm font-medium text-gray-800">{selectedLead.company}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Source</p>
                  <p className="text-sm font-medium text-gray-800">{selectedLead.source}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Expected Close Date</p>
                  <p className="text-sm font-medium text-gray-800">{selectedLead.expectedClose}</p>
                </div>
              </div>

              {/* Lead Score */}
              <div className="p-4 mb-6 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">Lead Score</p>
                  <p className="text-sm font-bold text-gray-800">{selectedLead.leadScore}%</p>
                </div>
                <Progress value={selectedLead.leadScore} size="lg" radius="xl" color="green" />
              </div>

              {/* Additional Information */}
              <Divider label="Additional Information" labelPosition="center" mb="md" />
              <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Industry</p>
                  <p className="text-sm font-medium text-gray-800">{selectedLead.industry}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium text-gray-800">{selectedLead.location}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">No. of Employees</p>
                  <p className="text-sm font-medium text-gray-800">{selectedLead.employees}</p>
                </div>
              </div>

              <div className="p-3 mb-4 rounded-lg bg-gray-50">
                <p className="mb-1 text-xs text-gray-500">Interested In</p>
                <p className="text-sm text-gray-800">{selectedLead.interestedIn}</p>
              </div>

              <div className="p-3 mb-6 rounded-lg bg-gray-50">
                <p className="mb-1 text-xs text-gray-500">Description</p>
                <p className="text-sm text-gray-800">{selectedLead.description}</p>
              </div>

              <Group justify="flex-end">
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                  Close
                </Button>
                <Button color="green">
                  Edit Lead
                </Button>
              </Group>
            </div>
          )}
        </Modal>

        {/* Add Lead Modal */}
        <Modal
          opened={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Lead"
          centered
          size="lg"
          overlayProps={{ blur: 4, opacity: 0.4 }}
        >
          <div className="space-y-4 max-h-[60vh] overflow-y-auto px-2">
            <TextInput
              label="Full Name"
              placeholder="Enter lead name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextInput
              label="Email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <TextInput
              label="Phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <TextInput
              label="Company"
              placeholder="Enter company name"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
            <Select
              label="Status"
              placeholder="Select status"
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value || '' })}
              data={['New', 'Contacted', 'In Progress', 'Proposal Sent', 'Negotiation', 'Converted', 'Lost']}
            />
            <Select
              label="Priority"
              placeholder="Select priority"
              value={formData.priority}
              onChange={(value) => setFormData({ ...formData, priority: value || '' })}
              data={['High', 'Medium', 'Low']}
            />
            <Select
              label="Source"
              placeholder="Select source"
              value={formData.source}
              onChange={(value) => setFormData({ ...formData, source: value || '' })}
              data={['Website', 'Referral', 'LinkedIn', 'Conference', 'Email Campaign', 'Partner']}
            />
            <TextInput
              label="Expected Close Date"
              placeholder="DD Month YYYY"
              value={formData.expectedClose}
              onChange={(e) => setFormData({ ...formData, expectedClose: e.target.value })}
            />
            <TextInput
              label="Industry"
              placeholder="Enter industry"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            />
            <TextInput
              label="Location"
              placeholder="Enter location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <Select
              label="No. of Employees"
              placeholder="Select range"
              value={formData.employees}
              onChange={(value) => setFormData({ ...formData, employees: value || '' })}
              data={['1-25', '25-50', '50-100', '100-250', '250-500', '500-1000', '1000+']}
            />
            <Textarea
              label="Interested In"
              placeholder="What is the lead interested in?"
              value={formData.interestedIn}
              onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
              rows={2}
            />
            <Textarea
              label="Description"
              placeholder="Additional description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
            <Group justify="flex-end" mt="md">
              <Button variant="outline" color="gray" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button color="green" onClick={handleAddLead}>
                Add Lead
              </Button>
            </Group>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default LeadManagement;