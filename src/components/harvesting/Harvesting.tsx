'use client';

import React, { useState } from 'react';
import { Button, Modal, Title, TextInput, Switch } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomDateInput from '../customComponents/CustomDateInput';

const DUMMY_HARVEST_DATA = {
  data: [
    {
      id: 'harv_1',
      department_name: 'Sales',
      code: 'DEP001',
      date: '28-04-2026',
      status: true,
    },
    {
      id: 'harv_2',
      department_name: 'Account',
      code: 'DEP002',
      date: '28-04-2026',
      status: false,
    },
    {
      id: 'harv_3',
      department_name: 'PPC',
      code: 'DEP003',
      date: '28-04-2026',
      status: true,
    },
  ],
};

export const Harvesting = () => {
  const [addOpened, setAddOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);

  const [addField, setAddField] = useState({
    department_name: '',
    code: '',
    date: '',
  });

  const [editField, setEditField] = useState({
    id: '',
    department_name: '',
    code: '',
    date: '',
    status: true,
  });

  const [harvestData] = useState<any>(DUMMY_HARVEST_DATA);

  const handleAddChange = (key: string, value: string) => {
    setAddField({ ...addField, [key]: value });
  };

  const handleEditChange = (key: string, value: string | boolean) => {
    setEditField({ ...editField, [key]: value });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add submitted:', addField);
    setAddField({ department_name: '', code: '', date: '' });
    setAddOpened(false);
    alert('Department added successfully (Demo)');
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Edit submitted:', editField);
    setEditOpened(false);
    alert('Department updated successfully (Demo)');
  };

  const handleEdit = (obj: any) => {
    setEditField({
      id: obj.id,
      department_name: obj.department_name,
      code: obj.code,
      date: obj.date,
      status: obj.status,
    });
    setEditOpened(true);
  };

  const handleDelete = (id: string) => {
    alert(`Delete record ${id} (Demo)`);
  };

  const tableColumns = [
    { th: { id: 'srNo', style: { minWidth: '70px', width: '70px' } }, text: 'SR NO.' },
    { text: 'Department Name', th: { id: 'department_name', style: { minWidth: '230px', width: '230px' } } },
    { text: 'Code', th: { id: 'code', style: { minWidth: '230px', width: '230px' } } },
    { text: 'Created On', th: { id: 'date', style: { minWidth: '200px', width: '200px' } } },
    { text: 'Status', th: { id: 'status', style: { minWidth: '120px', width: '120px' } } },
    { text: 'Action', th: { id: 'action', style: { minWidth: '100px', width: '100px' } }, justifyContent: 'center' },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <Title order={3}>Department Master</Title>
        <Button onClick={() => setAddOpened(true)} color="blue" leftSection={<FontAwesomeIcon icon={faPlus} />}>
          Add Department
        </Button>
      </div>

      <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
        <CustomTable
          data={harvestData}
          setData={() => {}}
          isSearchingRequired={false}
          isSortingRequired={false}
          isPaginationRequired={false}
          tableHeadData={tableColumns}
          tableBody={() =>
            harvestData?.data?.map((obj: any, index: number) => (
              <tr key={obj.id} className="transition border-b hover:bg-gray-50">
                <td className="px-5 py-4">{index + 1}</td>

                <td className="px-3 py-2 text-sm">{obj.department_name ?? '—'}</td>

                <td className="px-3 py-2 text-sm">{obj.code ?? '—'}</td>

                <td className="px-3 py-2 text-sm">{obj.date ?? '—'}</td>

                <td className="px-3 py-2 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    obj.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {obj.status ? 'Active' : 'Inactive'}
                  </span>
                </td>

                <td className="px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEdit(obj)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(obj.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
          url="department?demo=true"
          notFoundMessage="No Department Data Found."
          notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
        />
      </div>

      {/* Add Department Modal */}
      <Modal opened={addOpened} onClose={() => setAddOpened(false)} title="Add Department" centered size="lg">
        <form onSubmit={handleAddSubmit} className="flex flex-col gap-4 mt-2">
          <TextInput
            label="Department Name"
            placeholder="Enter Department Name"
            value={addField.department_name}
            onChange={(e) => handleAddChange('department_name', e.currentTarget.value)}
          />

          <TextInput
            label="Code"
            placeholder="DEP001"
            value={addField.code}
            onChange={(e) => handleAddChange('code', e.currentTarget.value)}
          />

          <CustomDateInput
            label="Date"
            name="date"
            value={addField.date}
            onChange={(e) => handleAddChange('date', e?.currentTarget?.value || '')}
          />

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setAddOpened(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Add Department
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Department Modal */}
      <Modal opened={editOpened} onClose={() => setEditOpened(false)} title="Edit Department" centered size="lg">
        <form onSubmit={handleEditSubmit} className="flex flex-col gap-4 mt-2">
          <TextInput
            label="Department Name"
            placeholder="Enter Department Name"
            value={editField.department_name}
            onChange={(e) => handleEditChange('department_name', e.currentTarget.value)}
          />

          <TextInput
            label="Code"
            placeholder="DEP001"
            value={editField.code}
            onChange={(e) => handleEditChange('code', e.currentTarget.value)}
          />

          <CustomDateInput
            label="Date"
            name="date"
            value={editField.date}
            onChange={(e) => handleEditChange('date', e?.currentTarget?.value || '')}
          />

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <Switch
              checked={editField.status}
              onChange={(e) => handleEditChange('status', e.currentTarget.checked)}
              color="blue"
            />
            <span className="text-sm text-gray-600">{editField.status ? 'Active' : 'Inactive'}</span>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setEditOpened(false)}>
              Cancel
            </Button>
            <Button type="submit" color="blue">
              Update
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};