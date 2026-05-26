'use client';

import React, { useState } from 'react';
import { Button, Modal, Title, TextInput, Textarea, Select, Badge, Divider, Grid, Paper, ActionIcon, Tooltip, Table, Card, Group, Stack, ThemeIcon, NumberInput, Alert } from '@mantine/core';
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
    faCopy,
    faPlusCircle,
    faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';

const DUMMY_BOM_DATA = {
    data: [
        {
            id: 'BOM001',
            bom_code: 'BOM2502',
            product_code: 'GA-1001',
            product_name: 'Gear Assembly',
            bom_version: 'V2.0',
            effective_date: '12 June, 2025',
            status: 'Active',
            created_by: 'Admin',
            created_on: '20 May, 2025',
            description: 'Bill of Materials for Gear Assembly - Standard version',
            components: [
                { id: 1, name: 'Gear Assembly', code: 'CMP-1001', quantity: 1, unit: 'Nos' },
                { id: 2, name: 'Gear Wheel', code: 'CMP-10001', quantity: 2, unit: 'Nos' },
                { id: 3, name: 'Bearing-G25', code: 'CMP-10002', quantity: 2, unit: 'Nos' },
                { id: 4, name: 'Bearing-G204', code: 'CMP-10004', quantity: 1, unit: 'Nos' },
                { id: 5, name: 'Chip: 25mm', code: 'CMP-10051', quantity: 2, unit: 'Nos' },
                { id: 6, name: 'Oil Seal 25×40×7', code: 'CMP-10061', quantity: 1, unit: 'Nos' },
                { id: 7, name: 'Key G-HH+25', code: 'CMP-10075', quantity: 1, unit: 'Nos' },
                { id: 8, name: 'Hex Bolt M8×20', code: 'CMP-1004', quantity: 6, unit: 'Nos' },
            ],
            material_summary: {
                nos: 15,
                kg: 0,
                lit: 0,
                meter: 0,
                other: 0,
                grand_total: 15,
            },
        },
        {
            id: 'BOM002',
            bom_code: 'BOM2503',
            product_code: 'HP-2001',
            product_name: 'Hydraulic Pump',
            bom_version: 'V1.5',
            effective_date: '15 May, 2025',
            status: 'Active',
            created_by: 'Admin',
            created_on: '10 May, 2025',
            description: 'Bill of Materials for Hydraulic Pump',
            components: [
                { id: 1, name: 'Pump Housing', code: 'CMP-2001', quantity: 1, unit: 'Nos' },
                { id: 2, name: 'Piston Assembly', code: 'CMP-2002', quantity: 4, unit: 'Nos' },
                { id: 3, name: 'Valve Plate', code: 'CMP-2003', quantity: 1, unit: 'Nos' },
                { id: 4, name: 'Shaft Seal', code: 'CMP-2004', quantity: 2, unit: 'Nos' },
            ],
            material_summary: {
                nos: 8,
                kg: 0,
                lit: 0,
                meter: 0,
                other: 0,
                grand_total: 8,
            },
        },
        {
            id: 'BOM003',
            bom_code: 'BOM2504',
            product_code: 'CP-3001',
            product_name: 'Control Panel',
            bom_version: 'V3.0',
            effective_date: '20 April, 2025',
            status: 'Draft',
            created_by: 'Engineer',
            created_on: '18 April, 2025',
            description: 'Bill of Materials for Control Panel',
            components: [
                { id: 1, name: 'PCB Board', code: 'CMP-3001', quantity: 1, unit: 'Nos' },
                { id: 2, name: 'Microcontroller', code: 'CMP-3002', quantity: 1, unit: 'Nos' },
                { id: 3, name: 'Resistors', code: 'CMP-3003', quantity: 50, unit: 'Nos' },
                { id: 4, name: 'Capacitors', code: 'CMP-3004', quantity: 30, unit: 'Nos' },
            ],
            material_summary: {
                nos: 82,
                kg: 0,
                lit: 0,
                meter: 0,
                other: 0,
                grand_total: 82,
            },
        },
    ],
};

const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-IN').format(value);
};

export const BOMManagement = () => {
    const [createOpened, setCreateOpened] = useState(false);
    const [viewOpened, setViewOpened] = useState(false);
    const [editOpened, setEditOpened] = useState(false);
    const [selectedBOM, setSelectedBOM] = useState<any>(null);

    const [components, setComponents] = useState([{ id: 1, name: '', code: '', quantity: 0, unit: 'Nos' }]);

    const [bomForm, setBomForm] = useState({
        product_name: '',
        bom_version: '',
        effective_date: '',
        description: '',
    });

    const [editField, setEditField] = useState({
        id: '',
        bom_code: '',
        product_name: '',
        bom_version: '',
        status: '',
        effective_date: '',
    });

    const [bomData] = useState<any>(DUMMY_BOM_DATA);

    const handleBomChange = (key: string, value: any) => {
        setBomForm({ ...bomForm, [key]: value });
    };

    const handleComponentChange = (id: number, key: string, value: any) => {
        const updatedComponents = components.map((comp) => {
            if (comp.id === id) {
                return { ...comp, [key]: value };
            }
            return comp;
        });
        setComponents(updatedComponents);
    };

    const addComponent = () => {
        const newId = Math.max(...components.map((c) => c.id), 0) + 1;
        setComponents([...components, { id: newId, name: '', code: '', quantity: 0, unit: 'Nos' }]);
    };

    const removeComponent = (id: number) => {
        if (components.length > 1) {
            setComponents(components.filter((c) => c.id !== id));
        }
    };

    const handleEditChange = (key: string, value: any) => {
        setEditField({ ...editField, [key]: value });
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('BOM created:', { bomForm, components });
        setCreateOpened(false);
        setComponents([{ id: 1, name: '', code: '', quantity: 0, unit: 'Nos' }]);
        setBomForm({
            product_name: '',
            bom_version: '',
            effective_date: '',
            description: '',
        });
        alert('BOM created successfully (Demo)');
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('BOM updated:', editField);
        setEditOpened(false);
        alert('BOM updated successfully (Demo)');
    };

    const handleView = (obj: any) => {
        setSelectedBOM(obj);
        setViewOpened(true);
    };

    const handleEdit = (obj: any) => {
        setEditField({
            id: obj.id,
            bom_code: obj.bom_code,
            product_name: obj.product_name,
            bom_version: obj.bom_version,
            status: obj.status,
            effective_date: obj.effective_date,
        });
        setEditOpened(true);
    };

    const handleDelete = (id: string) => {
        alert(`Delete record ${id} (Demo)`);
    };

    const handleCopy = (obj: any) => {
        alert(`Copy BOM ${obj.bom_code} (Demo)`);
    };

    const tableColumns = [
        { th: { id: 'srNo', style: { minWidth: '70px', width: '70px' } }, text: 'SR NO.' },
        { text: 'BOM Code', th: { id: 'bom_code', style: { minWidth: '100px' } } },
        { text: 'Product Name', th: { id: 'product_name', style: { minWidth: '180px' } } },
        { text: 'Product Code', th: { id: 'product_code', style: { minWidth: '100px' } } },
        { text: 'BOM Version', th: { id: 'bom_version', style: { minWidth: '100px' } } },
        { text: 'Effective Date', th: { id: 'effective_date', style: { minWidth: '120px' } } },
        { text: 'Status', th: { id: 'status', style: { minWidth: '100px' } } },
        { text: 'Created By', th: { id: 'created_by', style: { minWidth: '120px' } } },
        { text: 'Created On', th: { id: 'created_on', style: { minWidth: '120px' } } },
        { text: 'Actions', th: { id: 'action', style: { minWidth: '130px' } }, justifyContent: 'center' },
    ];

    const totalQuantity = components.reduce((sum, comp) => sum + (comp.quantity || 0), 0);

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Title order={2} className="text-gray-800">
                        Bill of Materials (BOM)
                    </Title>
                    <p className="mt-1 text-gray-500">Manage and track all BOMs for production</p>
                </div>
                <Button onClick={() => setCreateOpened(true)} color="blue" leftSection={<FontAwesomeIcon icon={faPlus} />} size="md">
                    Create New BOM
                </Button>
            </div>

            {/* Search Filters */}
            <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-white border border-gray-200 rounded-xl sm:grid-cols-2 lg:grid-cols-5">
                <TextInput placeholder="Search BOM..." leftSection={<FontAwesomeIcon icon={faFilter} />} />
                <Select placeholder="Status: All" data={['All', 'Active', 'Draft', 'Archived']} />
                <Select placeholder="Product: All" data={['All', 'Gear Assembly', 'Hydraulic Pump', 'Control Panel']} />
                <CustomDateInput placeholder="Date Range" name="date_range" />
                <Button variant="outline" color="gray">
                    Clear Filters
                </Button>
            </div>

            {/* BOM Table */}
            <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
                <CustomTable
                    data={bomData}
                    setData={() => {}}
                    isSearchingRequired={false}
                    isSortingRequired={true}
                    isPaginationRequired={true}
                    tableHeadData={tableColumns}
                    tableBody={() =>
                        bomData?.data?.map((obj: any, index: number) => (
                            <tr key={obj.id} className="transition border-b hover:bg-gray-50">
                                <td className="px-5 py-4 text-sm font-medium text-gray-600">{index + 1}</td>
                                <td className="px-3 py-2 text-sm font-medium text-blue-600">{obj.bom_code}</td>
                                <td className="px-3 py-2 text-sm font-medium">{obj.product_name}</td>
                                <td className="px-3 py-2 font-mono text-sm">{obj.product_code}</td>
                                <td className="px-3 py-2 text-sm">{obj.bom_version}</td>
                                <td className="px-3 py-2 text-sm">{obj.effective_date}</td>
                                <td className="px-3 py-2">
                                    <Badge color={obj.status === 'Active' ? 'green' : 'yellow'} variant="light">
                                        {obj.status}
                                    </Badge>
                                </td>
                                <td className="px-3 py-2 text-sm">{obj.created_by}</td>
                                <td className="px-3 py-2 text-sm">{obj.created_on}</td>
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
                                            <ActionIcon variant="subtle" color="green" onClick={() => handleCopy(obj)}>
                                                <FontAwesomeIcon icon={faCopy} />
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
                    url="bom?demo=true"
                    notFoundMessage="No BOM Data Found."
                    notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
                />
            </div>

            {/* View BOM Modal */}
            <Modal opened={viewOpened} onClose={() => setViewOpened(false)} title={`BOM Details | ${selectedBOM?.product_name || ''}`} size="xl" centered>
                {selectedBOM && (
                    <div className="space-y-6">
                        {/* BOM Summary */}
                        <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-blue-50">
                            <div>
                                <p className="text-sm text-gray-500">Product Code</p>
                                <p className="font-semibold">{selectedBOM.product_code}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Product Name</p>
                                <p className="font-semibold">{selectedBOM.product_name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">BOM Version</p>
                                <p className="font-semibold">{selectedBOM.bom_version}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Effective Date</p>
                                <p className="font-semibold">{selectedBOM.effective_date}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <Badge color={selectedBOM.status === 'Active' ? 'green' : 'yellow'}>{selectedBOM.status}</Badge>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Created By</p>
                                <p className="font-semibold">{selectedBOM.created_by}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Created On</p>
                                <p className="font-semibold">{selectedBOM.created_on}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Description</p>
                                <p className="font-semibold">{selectedBOM.description}</p>
                            </div>
                        </div>

                        <Divider label="Material Quantity Summary" labelPosition="left" />
                        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                            <Paper withBorder p="sm" className="text-center">
                                <p className="text-sm text-gray-500">Nos</p>
                                <p className="text-xl font-bold">{selectedBOM.material_summary.nos.toFixed(3)}</p>
                            </Paper>
                            <Paper withBorder p="sm" className="text-center">
                                <p className="text-sm text-gray-500">Kg</p>
                                <p className="text-xl font-bold">{selectedBOM.material_summary.kg.toFixed(3)}</p>
                            </Paper>
                            <Paper withBorder p="sm" className="text-center">
                                <p className="text-sm text-gray-500">Lit</p>
                                <p className="text-xl font-bold">{selectedBOM.material_summary.lit.toFixed(3)}</p>
                            </Paper>
                            <Paper withBorder p="sm" className="text-center">
                                <p className="text-sm text-gray-500">Meter</p>
                                <p className="text-xl font-bold">{selectedBOM.material_summary.meter.toFixed(3)}</p>
                            </Paper>
                            <Paper withBorder p="sm" className="text-center">
                                <p className="text-sm text-gray-500">Other</p>
                                <p className="text-xl font-bold">{selectedBOM.material_summary.other.toFixed(3)}</p>
                            </Paper>
                            <Paper withBorder p="sm" className="text-center bg-blue-50">
                                <p className="text-sm text-gray-500">Grand Total</p>
                                <p className="text-xl font-bold text-blue-600">{selectedBOM.material_summary.grand_total.toFixed(3)}</p>
                            </Paper>
                        </div>

                        <Divider label="Components" labelPosition="left" />
                        <Table striped highlightOnHover>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>#</Table.Th>
                                    <Table.Th>Component Name</Table.Th>
                                    <Table.Th>Component Code</Table.Th>
                                    <Table.Th>Required Quantity</Table.Th>
                                    <Table.Th>Unit</Table.Th>
                                    <Table.Th>Actions</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {selectedBOM.components.map((comp: any, idx: number) => (
                                    <Table.Tr key={comp.id}>
                                        <Table.Td>{idx + 1}</Table.Td>
                                        <Table.Td className="font-medium">{comp.name}</Table.Td>
                                        <Table.Td className="font-mono text-sm">{comp.code}</Table.Td>
                                        <Table.Td>{formatNumber(comp.quantity)}</Table.Td>
                                        <Table.Td>{comp.unit}</Table.Td>
                                        <Table.Td>
                                            <ActionIcon variant="subtle" color="green" size="sm">
                                                <FontAwesomeIcon icon={faCheckCircle} />
                                            </ActionIcon>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>

                        <Alert color="blue" className="mt-4">
                            <div className="flex items-center justify-between">
                                <span>Total Components: {selectedBOM.components.length}</span>
                                <span>Total Quantity: {selectedBOM.components.reduce((sum: number, c: any) => sum + c.quantity, 0)} Nos</span>
                            </div>
                        </Alert>
                    </div>
                )}
            </Modal>

            {/* Create BOM Modal */}
            <Modal opened={createOpened} onClose={() => setCreateOpened(false)} title="Create New BOM" size="xl" centered>
                <form onSubmit={handleAddSubmit} className="mt-2 space-y-6">
                    <div>
                        <Title order={5} className="mb-3 text-gray-700">
                            BOM Details
                        </Title>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <TextInput
                                label="Product Name"
                                placeholder="Enter Product Name"
                                value={bomForm.product_name}
                                onChange={(e) => handleBomChange('product_name', e.currentTarget.value)}
                                required
                            />
                            <TextInput label="BOM Version" placeholder="V1.0" value={bomForm.bom_version} onChange={(e) => handleBomChange('bom_version', e.currentTarget.value)} required />
                            <CustomDateInput
                                label="Effective Date"
                                name="effective_date"
                                value={bomForm.effective_date}
                                onChange={(e) => handleBomChange('effective_date', e?.currentTarget?.value || '')}
                                required
                            />
                            <Textarea
                                label="Description"
                                placeholder="Enter Description"
                                value={bomForm.description}
                                onChange={(e) => handleBomChange('description', e.currentTarget.value)}
                                minRows={2}
                            />
                        </div>
                    </div>

                    <Divider />

                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <Title order={5} className="text-gray-700">
                                Components
                            </Title>
                            <Button size="xs" variant="light" leftSection={<FontAwesomeIcon icon={faPlusCircle} />} onClick={addComponent}>
                                Add Component
                            </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <Table striped>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>#</Table.Th>
                                        <Table.Th>Component Name</Table.Th>
                                        <Table.Th>Component Code</Table.Th>
                                        <Table.Th>Required Quantity</Table.Th>
                                        <Table.Th>Unit</Table.Th>
                                        <Table.Th>Actions</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {components.map((component, idx) => (
                                        <Table.Tr key={component.id}>
                                            <Table.Td>{idx + 1}</Table.Td>
                                            <Table.Td>
                                                <TextInput
                                                    placeholder="Component Name"
                                                    value={component.name}
                                                    onChange={(e) => handleComponentChange(component.id, 'name', e.currentTarget.value)}
                                                    required
                                                />
                                            </Table.Td>
                                            <Table.Td>
                                                <TextInput placeholder="Code" value={component.code} onChange={(e) => handleComponentChange(component.id, 'code', e.currentTarget.value)} />
                                            </Table.Td>
                                            <Table.Td>
                                                <NumberInput
                                                    placeholder="Quantity"
                                                    value={component.quantity}
                                                    onChange={(value) => handleComponentChange(component.id, 'quantity', Number(value) || 0)}
                                                    min={0}
                                                    step={0.001}
                                                    required
                                                />
                                            </Table.Td>
                                            <Table.Td>
                                                <Select
                                                    placeholder="Unit"
                                                    data={['Nos', 'Kg', 'Ltr', 'Meter', 'Piece', 'Set']}
                                                    value={component.unit}
                                                    onChange={(value) => handleComponentChange(component.id, 'unit', value || 'Nos')}
                                                />
                                            </Table.Td>
                                            <Table.Td>
                                                <div className="flex gap-1">
                                                    <ActionIcon variant="subtle" color="green" size="sm">
                                                        <FontAwesomeIcon icon={faCheckCircle} />
                                                    </ActionIcon>
                                                    {components.length > 1 && (
                                                        <ActionIcon variant="subtle" color="red" size="sm" onClick={() => removeComponent(component.id)}>
                                                            <FontAwesomeIcon icon={faMinusCircle} />
                                                        </ActionIcon>
                                                    )}
                                                </div>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </div>
                        <div className="p-3 mt-4 rounded-lg bg-gray-50">
                            <div className="flex justify-between">
                                <span className="font-medium">Total Components: {components.length}</span>
                                <span className="font-medium">Total Quantity: {totalQuantity.toFixed(3)} Nos</span>
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-400">Note: Click on Show/Edit to show the components and quantity</p>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
                        <Button variant="outline" onClick={() => setCreateOpened(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" color="blue">
                            Create BOM
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Edit BOM Modal */}
            <Modal opened={editOpened} onClose={() => setEditOpened(false)} title="Edit BOM" size="lg" centered>
                <form onSubmit={handleEditSubmit} className="mt-2 space-y-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <TextInput label="BOM Code" value={editField.bom_code} disabled />
                        <TextInput label="Product Name" value={editField.product_name} onChange={(e) => handleEditChange('product_name', e.currentTarget.value)} required />
                        <TextInput label="BOM Version" value={editField.bom_version} onChange={(e) => handleEditChange('bom_version', e.currentTarget.value)} required />
                        <CustomDateInput
                            label="Effective Date"
                            name="effective_date"
                            value={editField.effective_date}
                            onChange={(e) => handleEditChange('effective_date', e?.currentTarget?.value || '')}
                        />
                        <Select label="Status" data={['Active', 'Draft', 'Archived']} value={editField.status} onChange={(value) => handleEditChange('status', value || '')} />
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <Button variant="outline" onClick={() => setEditOpened(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" color="blue">
                            Update BOM
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
