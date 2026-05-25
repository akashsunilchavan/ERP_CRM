'use client';

import React, { useState } from 'react';
import { Button, Modal, TextInput, Textarea, Group, Badge, Card, Divider } from '@mantine/core';
import { Plus, Edit3, Trash2, Save, X, Check } from 'lucide-react';

// Define types
type PermissionAction = 'View' | 'Add' | 'Edit' | 'Delete';
type ModuleName = 'Dashboard' | 'Companies' | 'Leads' | 'Contacts' | 'Reports' | 'Users' | 'Roles & Permission' | 'Setting';

interface PermissionsPerAction {
  View: boolean;
  Add: boolean;
  Edit: boolean;
  Delete: boolean;
}

interface ModulePermissions {
  Dashboard: PermissionsPerAction;
  Companies: PermissionsPerAction;
  Leads: PermissionsPerAction;
  Contacts: PermissionsPerAction;
  Reports: PermissionsPerAction;
  Users: PermissionsPerAction;
  'Roles & Permission': PermissionsPerAction;
  Setting: PermissionsPerAction;
}

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Partial<ModulePermissions>;
}

interface PermissionsState {
  [key: string]: ModulePermissions;
}

const AddRooms = () => {
  const [selectedRole, setSelectedRole] = useState<string>('Admin');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roleFormData, setRoleFormData] = useState({
    name: '',
    description: '',
  });

  // Dummy roles data
  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: 'Admin', description: 'Administrator', permissions: {} },
    { id: 2, name: 'Manager', description: 'Team Manager', permissions: {} },
    { id: 3, name: 'Employee', description: 'Regular Employee', permissions: {} },
    { id: 4, name: 'Sales Head', description: 'Sales Department', permissions: {} },
  ]);

  // Module permissions structure
  const modules: ModuleName[] = [
    'Dashboard',
    'Companies',
    'Leads',
    'Contacts',
    'Reports',
    'Users',
    'Roles & Permission',
    'Setting',
  ];

  const permissionActions: PermissionAction[] = ['View', 'Add', 'Edit', 'Delete'];

  // Dummy permissions data for each role
  const [permissions, setPermissions] = useState<PermissionsState>({
    Admin: {
      Dashboard: { View: true, Add: true, Edit: true, Delete: true },
      Companies: { View: true, Add: true, Edit: true, Delete: true },
      Leads: { View: true, Add: true, Edit: true, Delete: true },
      Contacts: { View: true, Add: true, Edit: true, Delete: false },
      Reports: { View: true, Add: true, Edit: true, Delete: false },
      Users: { View: true, Add: true, Edit: true, Delete: true },
      'Roles & Permission': { View: true, Add: true, Edit: true, Delete: true },
      Setting: { View: true, Add: true, Edit: true, Delete: true },
    },
    Manager: {
      Dashboard: { View: true, Add: false, Edit: false, Delete: false },
      Companies: { View: true, Add: true, Edit: true, Delete: false },
      Leads: { View: true, Add: true, Edit: true, Delete: false },
      Contacts: { View: true, Add: true, Edit: false, Delete: false },
      Reports: { View: true, Add: false, Edit: false, Delete: false },
      Users: { View: false, Add: false, Edit: false, Delete: false },
      'Roles & Permission': { View: false, Add: false, Edit: false, Delete: false },
      Setting: { View: false, Add: false, Edit: false, Delete: false },
    },
    Employee: {
      Dashboard: { View: true, Add: false, Edit: false, Delete: false },
      Companies: { View: true, Add: false, Edit: false, Delete: false },
      Leads: { View: true, Add: true, Edit: false, Delete: false },
      Contacts: { View: true, Add: true, Edit: false, Delete: false },
      Reports: { View: false, Add: false, Edit: false, Delete: false },
      Users: { View: false, Add: false, Edit: false, Delete: false },
      'Roles & Permission': { View: false, Add: false, Edit: false, Delete: false },
      Setting: { View: false, Add: false, Edit: false, Delete: false },
    },
    'Sales Head': {
      Dashboard: { View: true, Add: false, Edit: false, Delete: false },
      Companies: { View: true, Add: true, Edit: true, Delete: false },
      Leads: { View: true, Add: true, Edit: true, Delete: true },
      Contacts: { View: true, Add: true, Edit: true, Delete: false },
      Reports: { View: true, Add: true, Edit: true, Delete: false },
      Users: { View: false, Add: false, Edit: false, Delete: false },
      'Roles & Permission': { View: false, Add: false, Edit: false, Delete: false },
      Setting: { View: false, Add: false, Edit: false, Delete: false },
    },
  });

  const handlePermissionChange = (module: ModuleName, action: PermissionAction, value: boolean) => {
    setPermissions((prev) => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [module]: {
          ...prev[selectedRole][module],
          [action]: value,
        },
      },
    }));
  };

  const handleAddRole = () => {
    if (!roleFormData.name.trim()) return;
    
    const newRole: Role = {
      id: roles.length + 1,
      name: roleFormData.name,
      description: roleFormData.description,
      permissions: {},
    };
    
    setRoles([...roles, newRole]);
    setPermissions((prev) => ({
      ...prev,
      [roleFormData.name]: {
        Dashboard: { View: false, Add: false, Edit: false, Delete: false },
        Companies: { View: false, Add: false, Edit: false, Delete: false },
        Leads: { View: false, Add: false, Edit: false, Delete: false },
        Contacts: { View: false, Add: false, Edit: false, Delete: false },
        Reports: { View: false, Add: false, Edit: false, Delete: false },
        Users: { View: false, Add: false, Edit: false, Delete: false },
        'Roles & Permission': { View: false, Add: false, Edit: false, Delete: false },
        Setting: { View: false, Add: false, Edit: false, Delete: false },
      },
    }));
    
    setSelectedRole(roleFormData.name);
    setIsRoleModalOpen(false);
    setRoleFormData({ name: '', description: '' });
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setRoleFormData({ name: role.name, description: role.description });
    setIsRoleModalOpen(true);
  };

  const handleUpdateRole = () => {
    if (!roleFormData.name.trim()) return;
    
    const updatedRoles = roles.map((role) =>
      role.id === editingRole?.id
        ? { ...role, name: roleFormData.name, description: roleFormData.description }
        : role
    );
    
    setRoles(updatedRoles);
    
    // Update permissions key if name changed
    if (editingRole && editingRole.name !== roleFormData.name) {
      const permissionsCopy = { ...permissions };
      permissionsCopy[roleFormData.name] = permissionsCopy[editingRole.name];
      delete permissionsCopy[editingRole.name];
      setPermissions(permissionsCopy);
      setSelectedRole(roleFormData.name);
    }
    
    setIsRoleModalOpen(false);
    setEditingRole(null);
    setRoleFormData({ name: '', description: '' });
  };

  const handleDeleteRole = (roleId: number, roleName: string) => {
    if (roleName === 'Admin') {
      alert('Cannot delete Admin role');
      return;
    }
    
    if (confirm(`Are you sure you want to delete the role "${roleName}"?`)) {
      setRoles(roles.filter((role) => role.id !== roleId));
      const newPermissions = { ...permissions };
      delete newPermissions[roleName];
      setPermissions(newPermissions);
      
      if (selectedRole === roleName && roles.length > 1) {
        const remainingRole = roles.find((r) => r.id !== roleId);
        if (remainingRole) {
          setSelectedRole(remainingRole.name);
        }
      }
    }
  };

  const handleSavePermissions = () => {
    console.log('Saving permissions:', permissions);
    alert('Permissions saved successfully!');
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            Roles & Permission
          </h1>
          <p className="text-lg text-gray-600">
            Manage User roles and set module-wise permission
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Roles Sidebar */}
          <div className="lg:col-span-1">
            <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Roles</h2>
                <Button
                  size="sm"
                  variant="light"
                  color="green"
                  leftSection={<Plus size={16} />}
                  onClick={() => {
                    setEditingRole(null);
                    setRoleFormData({ name: '', description: '' });
                    setIsRoleModalOpen(true);
                  }}
                >
                  Add Roles
                </Button>
              </div>

              <Divider mb="md" />

              <div className="space-y-2">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedRole === role.name
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 shadow-sm'
                        : 'hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                    onClick={() => setSelectedRole(role.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{role.name}</h3>
                        <p className="mt-1 text-xs text-gray-500">{role.description}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditRole(role);
                          }}
                          className="p-1 text-blue-600 transition-colors rounded hover:bg-blue-50"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRole(role.id, role.name);
                          }}
                          className="p-1 text-red-600 transition-colors rounded hover:bg-red-50"
                          disabled={role.name === 'Admin'}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Permissions Table */}
          <div className="lg:col-span-3">
            <Card shadow="sm" padding="lg" radius="md" className="bg-white border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Permission for :{' '}
                    <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                      {selectedRole}
                    </span>
                  </h2>
                </div>
                <Button
                  color="green"
                  leftSection={<Save size={16} />}
                  onClick={handleSavePermissions}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  Save Permission
                </Button>
              </div>

              <Divider mb="md" />

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Module</th>
                      {permissionActions.map((action) => (
                        <th key={action} className="px-4 py-3 text-sm font-semibold text-center text-gray-700">
                          {action}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((module) => (
                      <tr key={module} className="transition-colors border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{module}</td>
                        {permissionActions.map((action) => (
                          <td key={action} className="px-4 py-3 text-center">
                            <button
                              onClick={() =>
                                handlePermissionChange(
                                  module,
                                  action,
                                  !permissions[selectedRole]?.[module]?.[action]
                                )
                              }
                              className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
                                permissions[selectedRole]?.[module]?.[action]
                                  ? 'bg-green-500 text-white hover:bg-green-600'
                                  : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                              }`}
                            >
                              {permissions[selectedRole]?.[module]?.[action] && <Check size={14} />}
                            </button>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Add/Edit Role Modal */}
      <Modal
        opened={isRoleModalOpen}
        onClose={() => {
          setIsRoleModalOpen(false);
          setEditingRole(null);
          setRoleFormData({ name: '', description: '' });
        }}
        title={editingRole ? 'Edit Role' : 'Add New Role'}
        centered
        size="md"
        overlayProps={{ blur: 4, opacity: 0.4 }}
      >
        <div className="space-y-4">
          <TextInput
            label="Role Name"
            placeholder="Enter role name (e.g., Super Admin)"
            value={roleFormData.name}
            onChange={(e) => setRoleFormData({ ...roleFormData, name: e.target.value })}
            required
          />
          <Textarea
            label="Description"
            placeholder="Enter role description"
            value={roleFormData.description}
            onChange={(e) => setRoleFormData({ ...roleFormData, description: e.target.value })}
            rows={3}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="outline" color="gray" onClick={() => setIsRoleModalOpen(false)}>
              Cancel
            </Button>
            <Button
              color="green"
              onClick={editingRole ? handleUpdateRole : handleAddRole}
              className="bg-gradient-to-r from-green-500 to-green-600"
            >
              {editingRole ? 'Update Role' : 'Add Role'}
            </Button>
          </Group>
        </div>
      </Modal>
    </div>
  );
};

export default AddRooms;