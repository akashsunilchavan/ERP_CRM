'use client';

import React, { useState } from 'react';
import { 
  Card, Badge, Button, Modal, TextInput, Select, Group, 
  Tabs, Progress, Divider, Tooltip, Table, 
  SegmentedControl, Grid, RingProgress, SimpleGrid
} from '@mantine/core';
import { 
  Plus, Search, Eye, Edit3, Trash2, TrendingUp, 
  TrendingDown, CreditCard, Banknote, Building, 
  Wallet, Zap, Shield, CheckCircle, XCircle, 
  Calendar, DollarSign, Users, LayoutGrid, List,
  Phone, Smartphone, Landmark, Receipt
} from 'lucide-react';

interface PaymentMode {
  id: number;
  name: string;
  code: string;
  category: string;
  status: string;
  charges: string;
  date: string;
  totalTransactions: number;
  successfulTransactions: number;
  failedTransactions: number;
  totalAmount: number;
  lastUsed: string;
  companies: { name: string; transactions: number }[];
  gateways: { name: string; status: string }[];
}

const AddLabours = () => {
  const [activeTab, setActiveTab] = useState<string | null>('list');
  const [selectedMode, setSelectedMode] = useState<PaymentMode | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
const [viewType, setViewType] = useState<string>('list');

  const paymentModes: PaymentMode[] = [
    {
      id: 1,
      name: 'Cash',
      code: 'CASH001',
      category: 'Offline',
      status: 'Active',
      charges: '0%',
      date: '22 Apr 2028, 04:15 PM',
      totalTransactions: 542,
      successfulTransactions: 530,
      failedTransactions: 12,
      totalAmount: 245000,
      lastUsed: 'Today, 10:30 AM',
      companies: [
        { name: 'Company 1', transactions: 210 },
        { name: 'Company 2', transactions: 180 },
        { name: 'Company 3', transactions: 152 }
      ],
      gateways: []
    },
    {
      id: 2,
      name: 'UPI',
      code: 'UPI001',
      category: 'Online',
      status: 'Active',
      charges: '0%',
      date: '22 Apr 2028, 04:15 PM',
      totalTransactions: 1245,
      successfulTransactions: 1190,
      failedTransactions: 55,
      totalAmount: 845000,
      lastUsed: 'Today, 11:20 AM',
      companies: [
        { name: 'Company 1', transactions: 492 },
        { name: 'Company 2', transactions: 398 },
        { name: 'Company 3', transactions: 355 }
      ],
      gateways: [
        { name: 'Razorpay', status: 'Active' },
        { name: 'PhonePe', status: 'Active' },
        { name: 'PayTM', status: 'Active' }
      ]
    },
    {
      id: 3,
      name: 'Bank Transfer',
      code: 'BT001',
      category: 'Online',
      status: 'Active',
      charges: '0%',
      date: '22 Apr 2028, 04:15 PM',
      totalTransactions: 324,
      successfulTransactions: 310,
      failedTransactions: 14,
      totalAmount: 1250000,
      lastUsed: 'Yesterday, 03:45 PM',
      companies: [
        { name: 'Company 1', transactions: 145 },
        { name: 'Company 2', transactions: 98 },
        { name: 'Company 3', transactions: 81 }
      ],
      gateways: [
        { name: 'Razorpay', status: 'Active' },
        { name: 'PhonePe', status: 'Active' }
      ]
    },
    {
      id: 4,
      name: 'Credit Card',
      code: 'CC001',
      category: 'Online',
      status: 'Active',
      charges: '2.5%',
      date: '22 Apr 2028, 04:15 PM',
      totalTransactions: 198,
      successfulTransactions: 185,
      failedTransactions: 13,
      totalAmount: 456000,
      lastUsed: 'Today, 09:15 AM',
      companies: [
        { name: 'Company 1', transactions: 89 },
        { name: 'Company 2', transactions: 67 },
        { name: 'Company 3', transactions: 42 }
      ],
      gateways: [
        { name: 'Razorpay', status: 'Active' },
        { name: 'PayTM', status: 'Active' }
      ]
    },
    {
      id: 5,
      name: 'Debit Card',
      code: 'DC001',
      category: 'Online',
      status: 'Active',
      charges: '1.8%',
      date: '22 Apr 2028, 04:15 PM',
      totalTransactions: 112,
      successfulTransactions: 108,
      failedTransactions: 4,
      totalAmount: 234000,
      lastUsed: 'Yesterday, 02:30 PM',
      companies: [
        { name: 'Company 1', transactions: 56 },
        { name: 'Company 2', transactions: 34 },
        { name: 'Company 3', transactions: 22 }
      ],
      gateways: [
        { name: 'PhonePe', status: 'Active' }
      ]
    },
    {
      id: 6,
      name: 'Net Banking',
      code: 'NB001',
      category: 'Online',
      status: 'Active',
      charges: '0%',
      date: '22 Apr 2028, 04:15 PM',
      totalTransactions: 63,
      successfulTransactions: 61,
      failedTransactions: 2,
      totalAmount: 178000,
      lastUsed: 'Yesterday, 11:00 AM',
      companies: [
        { name: 'Company 1', transactions: 28 },
        { name: 'Company 2', transactions: 22 },
        { name: 'Company 3', transactions: 13 }
      ],
      gateways: [
        { name: 'Razorpay', status: 'Active' }
      ]
    },
    {
      id: 7,
      name: 'Cheque',
      code: 'CHQ001',
      category: 'Offline',
      status: 'Active',
      charges: '0%',
      date: '22 Apr 2028, 04:15 PM',
      totalTransactions: 74,
      successfulTransactions: 72,
      failedTransactions: 2,
      totalAmount: 892000,
      lastUsed: '2 days ago, 04:00 PM',
      companies: [
        { name: 'Company 1', transactions: 38 },
        { name: 'Company 2', transactions: 22 },
        { name: 'Company 3', transactions: 14 }
      ],
      gateways: []
    }
  ];

  const totalModes = paymentModes.length;
  const onlineModes = paymentModes.filter(m => m.category === 'Online').length;
  const offlineModes = paymentModes.filter(m => m.category === 'Offline').length;
  const upiMode = paymentModes.find(m => m.name === 'UPI');

  const getCategoryColor = (category: string) => {
    return category === 'Online' ? 'cyan' : 'orange';
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'green' : 'red';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredModes = paymentModes.filter(mode =>
    mode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mode.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewMode = (mode: PaymentMode) => {
    setSelectedMode(mode);
    setIsViewModalOpen(true);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Payment Modes
              </h1>
              <p className="mt-1 text-gray-600">Manage available payment methods across all companies.</p>
            </div>
            <div className="flex gap-3">
              <SegmentedControl
  value={viewType}
  onChange={(value: string) => setViewType(value)}
  data={[
    { label: <LayoutGrid size={16} />, value: 'grid' },
    { label: <List size={16} />, value: 'list' }
  ]}
/>
              <Button color="green" leftSection={<Plus size={16} />} onClick={() => setIsAddModalOpen(true)}>
                Add Payment Mode
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Modes</p>
                <h3 className="mt-1 text-3xl font-bold text-gray-800">{totalModes}</h3>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <Wallet className="text-blue-600" size={24} />
              </div>
            </div>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Online Modes</p>
                <h3 className="mt-1 text-3xl font-bold text-gray-800">{onlineModes}</h3>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-100">
                <Smartphone className="text-cyan-600" size={24} />
              </div>
            </div>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Offline Modes</p>
                <h3 className="mt-1 text-3xl font-bold text-gray-800">{offlineModes}</h3>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full">
                <Banknote className="text-orange-600" size={24} />
              </div>
            </div>
          </Card>
        </div>

        {/* UPI Highlight Card */}
        {upiMode && (
          <Card shadow="sm" padding="lg" radius="md" className="mb-8 border border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="text-blue-600" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">Most Used UPI</h3>
                </div>
                <p className="text-2xl font-bold text-gray-800">{upiMode.totalTransactions.toLocaleString()} Transactions</p>
                <p className="mt-1 text-sm text-gray-600">{formatCurrency(upiMode.totalAmount)} collected</p>
              </div>
              <div className="text-right">
                <Badge color="green" size="lg">Active</Badge>
                <p className="mt-2 text-xs text-gray-500">Success Rate: {((upiMode.successfulTransactions / upiMode.totalTransactions) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </Card>
        )}

        {/* Search and Content */}
        <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Payment Methods</h2>
            <div className="relative">
              <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
              <TextInput
                placeholder="Search payment modes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '300px', paddingLeft: '30px' }}
              />
            </div>
          </div>

          {viewType === 'list' ? (
            <div className="overflow-x-auto">
              <Table>
                <Table.Thead>
                  <Table.Tr className="border-b-2 border-gray-200">
                    <Table.Th className="text-sm font-semibold text-gray-700">#</Table.Th>
                    <Table.Th className="text-sm font-semibold text-gray-700">Payment Mode</Table.Th>
                    <Table.Th className="text-sm font-semibold text-gray-700">Category</Table.Th>
                    <Table.Th className="text-sm font-semibold text-gray-700">Charges %</Table.Th>
                    <Table.Th className="text-sm font-semibold text-gray-700">Unique Count</Table.Th>
                    <Table.Th className="text-sm font-semibold text-center text-gray-700">Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredModes.map((mode, index) => (
                    <Table.Tr key={mode.id} className="transition-colors border-b border-gray-100 hover:bg-gray-50">
                      <Table.Td className="text-sm text-gray-600">{index + 1}</Table.Td>
                      <Table.Td>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{mode.name}</p>
                          <p className="text-xs text-gray-500">{mode.code}</p>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <Badge color={getCategoryColor(mode.category)} size="sm">
                          {mode.category}
                        </Badge>
                      </Table.Td>
                      <Table.Td className="text-sm text-gray-600">{mode.charges}</Table.Td>
                      <Table.Td className="text-sm font-semibold text-gray-800">{mode.totalTransactions.toLocaleString()}</Table.Td>
                      <Table.Td className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Tooltip label="View Details">
                            <button 
                              onClick={() => handleViewMode(mode)}
                              className="p-1 text-green-600 transition-colors rounded hover:bg-green-50"
                            >
                              <Eye size={16} />
                            </button>
                          </Tooltip>
                          <Tooltip label="Edit">
                            <button className="p-1 text-blue-600 transition-colors rounded hover:bg-blue-50">
                              <Edit3 size={16} />
                            </button>
                          </Tooltip>
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
              {filteredModes.map((mode) => (
                <Card key={mode.id} shadow="sm" padding="md" radius="md" className="transition-shadow border border-gray-200 hover:shadow-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{mode.name}</h3>
                      <p className="text-xs text-gray-500">{mode.code}</p>
                    </div>
                    <Badge color={getCategoryColor(mode.category)}>{mode.category}</Badge>
                  </div>
                  <div className="mb-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Charges:</span>
                      <span className="font-medium">{mode.charges}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Transactions:</span>
                      <span className="font-medium">{mode.totalTransactions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total Amount:</span>
                      <span className="font-medium">{formatCurrency(mode.totalAmount)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="xs" variant="light" color="green" onClick={() => handleViewMode(mode)} fullWidth>
                      <Eye size={14} className="mr-1" /> View
                    </Button>
                    <Button size="xs" variant="light" color="blue" fullWidth>
                      <Edit3 size={14} className="mr-1" /> Edit
                    </Button>
                  </div>
                </Card>
              ))}
            </SimpleGrid>
          )}

          <div className="pt-4 mt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing 1 to {filteredModes.length} of {filteredModes.length} entries
            </p>
          </div>
        </Card>

        {/* View Details Modal */}
        <Modal
          opened={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={null}
          centered
          size="xl"
          overlayProps={{ blur: 4, opacity: 0.4 }}
        >
          {selectedMode && (
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedMode.name}</h2>
                    <p className="mt-1 text-gray-500">{selectedMode.code}</p>
                  </div>
                  <Badge color={getStatusColor(selectedMode.status)} size="lg">
                    {selectedMode.status}
                  </Badge>
                </div>
              </div>

              <Divider label="Basic Information" labelPosition="center" mb="md" />
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Payment Mode Name</p>
                  <p className="text-sm font-medium text-gray-800">{selectedMode.name}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Code</p>
                  <p className="text-sm font-medium text-gray-800">{selectedMode.code}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Category</p>
                  <Badge color={getCategoryColor(selectedMode.category)}>{selectedMode.category}</Badge>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Status</p>
                  <Badge color={getStatusColor(selectedMode.status)}>{selectedMode.status}</Badge>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Charges</p>
                  <p className="text-sm font-medium text-gray-800">{selectedMode.charges}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm font-medium text-gray-800">{selectedMode.date}</p>
                </div>
              </div>

              <Divider label="Usage Statistics" labelPosition="center" mb="md" />
              <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-5">
                <div className="p-3 text-center rounded-lg bg-blue-50">
                  <p className="text-xs text-gray-500">Total Transactions</p>
                  <p className="text-xl font-bold text-gray-800">{selectedMode.totalTransactions.toLocaleString()}</p>
                </div>
                <div className="p-3 text-center rounded-lg bg-green-50">
                  <p className="text-xs text-gray-500">Successful</p>
                  <p className="text-xl font-bold text-green-600">{selectedMode.successfulTransactions.toLocaleString()}</p>
                </div>
                <div className="p-3 text-center rounded-lg bg-red-50">
                  <p className="text-xs text-gray-500">Failed</p>
                  <p className="text-xl font-bold text-red-600">{selectedMode.failedTransactions.toLocaleString()}</p>
                </div>
                <div className="p-3 text-center rounded-lg bg-purple-50">
                  <p className="text-xs text-gray-500">Total Amount</p>
                  <p className="text-xl font-bold text-gray-800">{formatCurrency(selectedMode.totalAmount)}</p>
                </div>
                <div className="p-3 text-center rounded-lg bg-orange-50">
                  <p className="text-xs text-gray-500">Last Used</p>
                  <p className="text-sm font-medium text-gray-800">{selectedMode.lastUsed}</p>
                </div>
              </div>

              {selectedMode.companies.length > 0 && (
                <>
                  <Divider label="Used By Companies" labelPosition="center" mb="md" />
                  <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
                    {selectedMode.companies.map((company, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-gray-50">
                        <p className="text-sm font-medium text-gray-800">{company.name}</p>
                        <p className="mt-1 text-xs text-gray-500">{company.transactions.toLocaleString()} transactions</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {selectedMode.gateways.length > 0 && (
                <>
                  <Divider label="Integrations / Gateways" labelPosition="center" mb="md" />
                  <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
                    {selectedMode.gateways.map((gateway, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <p className="text-sm font-medium text-gray-800">{gateway.name}</p>
                        <Badge color={getStatusColor(gateway.status)} size="sm">{gateway.status}</Badge>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <Group justify="flex-end">
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                  Close
                </Button>
                <Button color="green">
                  Edit Mode
                </Button>
              </Group>
            </div>
          )}
        </Modal>

        {/* Add Payment Mode Modal */}
        <Modal
          opened={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add Payment Mode"
          centered
          size="lg"
          overlayProps={{ blur: 4, opacity: 0.4 }}
        >
          <div className="space-y-4">
            <TextInput label="Payment Mode Name" placeholder="Enter payment mode name" required />
            <TextInput label="Code" placeholder="Enter unique code" required />
            <Select
              label="Category"
              placeholder="Select category"
              data={['Online', 'Offline']}
              required
            />
            <Select
              label="Status"
              placeholder="Select status"
              data={['Active', 'Inactive']}
              required
            />
            <TextInput label="Charges (%)" placeholder="Enter charges percentage" />
            <Group justify="flex-end" mt="md">
              <Button variant="outline" color="gray" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button color="green" onClick={() => setIsAddModalOpen(false)}>
                Add Payment Mode
              </Button>
            </Group>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AddLabours;