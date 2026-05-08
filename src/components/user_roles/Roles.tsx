    'use client';
    import {
        faCheck,
        faEye,
        faEdit,
        faPlug,
        faPlus,
        faXmark,
        faGear,
        faTimes,
        faInfoCircle,
        faPlusCircle,
        faTrashAlt,
        faCog,
        faKey,
        faCheckCircle,
        faUserShield,
        faListCheck,
    } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { Badge, Button, Modal, Tooltip } from '@mantine/core';
    import React, { useContext, useEffect, useState } from 'react';
    import CustomTextInput from '../customComponents/CustomTextInput';
    import { addRoles, getFeatures, getRoleById, updateRoles } from '@/app/api/RolesAPI';
    import { getRecords } from '../CommonFunction';
    import { checkRole, Message } from '@/app/helpers/AssetHelpers';
    import { APIStatusType, InputErrorType, RoleContextValue } from '../types/OthersTypes';
    import InputErrorBox from '../customComponents/InputErrorBox';
    import { APIStatusData } from '../data/OtherDefalutData';
    import roleContext from '../context/roleContext';

    interface Permission {
        permission_id: string;
        name: string;
        feature: string;
        description?: string;
    }

    interface Role {
        role_id: string;
        name: string;
        description?: string;
        permissions: Permission[];
    }

    interface FeatureGroup {
        icon: JSX.Element;
        permissions: {
            id: string;
            name: string;
            description: string;
        }[];
    }

    const Roles = () => {
        const [showForm, setShowForm] = useState(false);
        const [showPermissionsModal, setShowPermissionsModal] = useState(false);
        const [selectedRole, setSelectedRole] = useState<Role | null>(null);
        const [roles, setRoles] = useState<{ data?: Role[] }>({});
        const [loading, setLoading] = useState(true);
        const [isEditMode, setIsEditMode] = useState(false);
        const [editingRoleId, setEditingRoleId] = useState<string | null>(null);

        const [submitAPIStatus, setSubmitAPIStatus] = useState<APIStatusType>(APIStatusData);

        const [formData, setFormData] = useState({
            name: '',
            description: '',
            permission_ids: [] as string[],
        });

        let roleState: RoleContextValue = useContext(roleContext);

        const [features, setFeatures] = useState<Record<string, FeatureGroup>>({});

        const [inputError, setInputError] = useState<InputErrorType>({});

        const formatText = (text: string) => {
            return text.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
        };

        const handleCreateNewRole = () => {
            setFormData({ name: '', description: '', permission_ids: [] });
            setShowForm(true);
        };

        const resetForm = () => {
            setFormData({ name: '', description: '', permission_ids: [] });
            setInputError({});
            setIsEditMode(false);
            setEditingRoleId(null);
        };

        const handleModalClose = () => {
            setShowForm(false);
            resetForm();
        };

        const togglePermission = (permissionId: string) => {
            setFormData((prev) => {
                const hasPermission = prev?.permission_ids?.includes(permissionId);
                return {
                    ...prev,
                    permission_ids: hasPermission ? prev?.permission_ids?.filter((id) => id !== permissionId) : [...prev?.permission_ids, permissionId],
                };
            });
        };

        const validateName = (value: string) => {
            if (!value?.trim()) {
                return 'Please enter Role Name.';
            }
            return '';
        };

        const validatePermissions = (permissions: string[]) => {
            if (formData?.permission_ids?.length === 0) {
                return 'Please select at least one Permission.';
            }
            return '';
        };
        const handleEditRole = async (role: any) => {
            try {
                await getRoleById(role?.role_id)?.then((res) => {
                    if (res?.statusCode === 200) {
                        setFormData({
                            name: res?.data?.name,
                            description: res?.data?.description || '',
                            permission_ids: res?.data?.permissions?.map((p: any) => p?.permission_id),
                        });
                        setIsEditMode(true);
                        setEditingRoleId(role?.role_id);
                        setShowForm(true);
                    }
                });
            } catch (error) {
                console.error('Error fetching role data:', error);
                Message('Failed to load role data', 'error');
            } finally {
                setLoading(false);
            }
        };

        const handleNameBlur = () => {
            setInputError((prev) => ({
                ...prev,
                name: validateName(formData?.name),
            }));
        };

        const saveRole = async () => {
            const nameError = validateName(formData?.name);
            const permissionError = validatePermissions(formData?.permission_ids);

            setInputError({
                name: nameError,
                permission_ids: permissionError,
            });

            if (nameError || permissionError) {
                return;
            }

            try {
                const payload = {
                    name: formData?.name,
                    description: formData?.description,
                    permission_ids: formData?.permission_ids,
                };

                if (isEditMode && editingRoleId) {
                    setSubmitAPIStatus((prev: APIStatusType) => ({ ...prev, loading: true }));

                    await updateRoles(editingRoleId, payload)?.then((res) => {
                        if (res?.statusCode === 200) {
                            fetchRoles();
                            setIsEditMode(false);
                            setEditingRoleId(null);
                            setSubmitAPIStatus((prev: APIStatusType) => ({ ...prev, loading: false }));
                        } else {
                            Message(res?.message || 'Failed to update role', 'error');
                            setSubmitAPIStatus((prev: APIStatusType) => ({ ...prev, loading: false }));
                            setIsEditMode(false);
                            setEditingRoleId(null);
                        }
                    });
                } else {
                    setSubmitAPIStatus((prev: APIStatusType) => ({ ...prev, loading: true }));

                    await addRoles(payload)?.then((res) => {
                        if (res?.statusCode === 200) {
                            fetchRoles();
                            setSubmitAPIStatus((prev: APIStatusType) => ({ ...prev, loading: false }));
                        } else {
                            Message(res?.message, 'error');
                            setSubmitAPIStatus((prev: APIStatusType) => ({ ...prev, loading: false }));
                        }
                    });
                }

                setShowForm(false);
                fetchRoles();
            } catch (error) {
                console.error('Error creating role:', error);
            }
        };

        const fetchRoles = async () => {
            try {
                setLoading(true);
                getRecords(`fetchAll-role`, setRoles);
            } catch (error) {
                console.error('Error fetching roles:', error);
            } finally {
                setLoading(false);
            }
        };

        const handleViewPermissions = (role: any) => {
            setSelectedRole(role);
            setShowPermissionsModal(true);
        };

        useEffect(() => {
            const fetchPermissions = async () => {
                const res = await getFeatures();
                const grouped: Record<string, any> = {};

                res?.data?.forEach((perm: any) => {
                    const featureName = perm?.feature?.trim().replace(/\b\w/g, (l: any) => l?.toUpperCase());
                    if (!grouped[featureName]) {
                        grouped[featureName] = {
                            icon: <FontAwesomeIcon icon={faGear} className="w-5 h-5 text-blue-500" />,
                            permissions: [],
                        };
                    }
                    grouped[featureName]?.permissions?.push({
                        id: perm?.permission_id,
                        name: `${perm?.name?.replace(/\s+/g, '_')}`,
                        description: `${perm?.feature} access for ${perm?.name}`,
                    });
                });

                setFeatures(grouped);
            };

            fetchPermissions();
            fetchRoles();
        }, []);

        return (
            <div className="p-4 sm:p-6 min-h-screen bg-gray-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {loading ? (
                        <div>Loading roles...</div>
                    ) : (
                        roles?.data?.map((role: any) => {
                            const permissionCount = role?.permissions?.length;
                            const displayedPermissions = role?.permissions?.slice(0, 3);
                            const remainingCount = permissionCount - 3;
                            const featureIcons = {
                                view: faEye,
                                create: faPlus,
                                edit: faEdit,
                                delete: faTrashAlt,
                                manage: faGear,
                                default: faPlug,
                            };

                            return (
                                <div
                                    key={role?.role_id}
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100 flex flex-col h-full group relative"
                                >
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>

                                    <div className={`p-6 pb-4 text-black border-b border-gray-100 group-hover:bg-gray-50 transition-colors duration-200`}>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">{role?.name}</h3>
                                            <Badge radius="sm" className="bg-blue-50 text-blue-600 font-medium shadow-sm">
                                                {permissionCount} {permissionCount === 1 ? 'permission' : 'permissions'}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">{role?.description || 'No description provided'}</p>
                                    </div>

                                    <div className="p-6 flex-grow">
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                                                <FontAwesomeIcon icon={faCheck} className="mr-2 text-blue-500" />
                                                Permissions Granted
                                            </h4>
                                            <div className="space-y-3">
                                                {displayedPermissions?.map((permission: any) => {
                                                    const icon = featureIcons[permission?.name as keyof typeof featureIcons] || featureIcons.default;
                                                    return (
                                                        <div key={permission?.permission_id} className="flex items-center p-2 -m-2 rounded-lg hover:bg-blue-50 transition-colors duration-150">
                                                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                                                <FontAwesomeIcon icon={icon} className="w-4 h-4 text-blue-600" />
                                                            </div>
                                                            <div className="ml-3">
                                                                <div className="text-sm font-medium text-gray-800">{formatText(`${permission?.feature} ${permission?.name}`)}</div>
                                                                <div className="text-xs text-gray-500 mt-1">{permission?.feature} access</div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                                {remainingCount > 0 && (
                                                    <button
                                                        onClick={() => handleViewPermissions(role)}
                                                        hidden={!checkRole(['roles and permissions'], roleState?.features, 'view')}
                                                        className="w-full text-center py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center justify-center"
                                                    >
                                                        <span className="mr-1">+{remainingCount} more permissions</span>
                                                        <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-6 py-4 bg-gray-50 flex justify-between border-t border-gray-100">
                                        <button
                                            onClick={() => handleViewPermissions(role)}
                                            hidden={!checkRole(['roles and permissions'], roleState?.features, 'view')}
                                            className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center group"
                                        >
                                            <FontAwesomeIcon icon={faEye} className="mr-2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                            <span className="group-hover:translate-x-0.5 transition-transform">Details</span>
                                        </button>
                                        <button
                                            onClick={() => handleEditRole(role)}
                                            hidden={!checkRole(['roles and permissions'], roleState?.features, 'update')}
                                            className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm flex items-center group"
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="mr-2 text-white group-hover:scale-110 transition-transform" />
                                            <span className="group-hover:translate-x-0.5 transition-transform">Edit Role</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}

                    <div
                        onClick={handleCreateNewRole}
                        className={`bg-white rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-500 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-8 text-center group h-full relative overflow-hidden 
                        `}
                    >
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors mx-auto">
                                <FontAwesomeIcon icon={faPlus} className="w-6 h-6 text-blue-500 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Add New Role</h3>
                            <p className="mt-2 text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Create a custom role with specific permissions</p>
                        </div>
                    </div>
                </div>

                {showForm && (
                    <Modal opened={showForm} onClose={() => setShowForm(false)} size="50rem" withCloseButton={false} centered closeOnClickOutside={false}>
                        <Modal.Header className="flex justify-between border-b p-0">
                            <Modal.Title>
                                <div className="text-lg font-bold text-[#26448C]"> {isEditMode ? `Edit Role` : 'Create New Role'}</div>
                            </Modal.Title>
                            <button
                                onClick={() => {
                                    handleModalClose();
                                }}
                                className="text-gray-500 hover:text-red-600 text-xl"
                            >
                                <FontAwesomeIcon icon={faXmark} size="lg" />
                            </button>
                        </Modal.Header>

                        <Modal.Body className="mt-5 border-b mb-5 p-0">
                            <div className="p-6 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <CustomTextInput
                                            label="Role Name"
                                            name="name"
                                            value={formData?.name}
                                            error={inputError?.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g. Content Moderator"
                                            onBlur={handleNameBlur}
                                            autoComplete="off"
                                            disabled={isEditMode}
                                        />
                                    </div>
                                    <div>
                                        <CustomTextInput
                                            label="Description"
                                            value={formData?.description}
                                            withAsterisk={false}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Brief description of the role"
                                            disabled={isEditMode}
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-4 bg-white text-base font-medium text-gray-500">Permissions Configuration</span>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {Object?.entries(features)?.map(([featureName, { icon, permissions }]: any) => (
                                        <div key={featureName} className="space-y-4">
                                            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                <div className="flex-shrink-0 p-2 rounded-lg bg-white shadow-sm border border-gray-200">{icon}</div>
                                                <div className="ml-4">
                                                    <h4 className="font-medium text-gray-900 text-lg">{featureName}</h4>
                                                    <p className="text-sm text-gray-500">{permissions?.length} available permissions</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {permissions?.map((perm: any) => {
                                                    const isSelected = formData?.permission_ids?.includes(perm?.id);
                                                    return (
                                                        <div
                                                            key={perm?.id}
                                                            onClick={() => togglePermission(perm?.id)}
                                                            className={`p-4 border rounded-xl cursor-pointer transition-all ${
                                                                isSelected ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            <div className="flex items-start space-x-3">
                                                                <div
                                                                    className={`flex-shrink-0 h-6 w-6 rounded-md flex items-center justify-center mt-0.5 ${
                                                                        isSelected ? 'bg-blue-500 text-white' : 'border border-gray-300 bg-white'
                                                                    }`}
                                                                >
                                                                    {isSelected && <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />}
                                                                </div>
                                                                <div>
                                                                    <h5 className="text-sm font-medium text-gray-800">{formatText(perm?.name)}</h5>
                                                                    <p className="text-xs text-gray-500 mt-1">{perm?.description}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                    {inputError?.permission_ids && <InputErrorBox Message={inputError?.permission_ids} />}
                                </div>
                            </div>
                        </Modal.Body>
                        <div className="flex justify-end">
                            <Button
                                radius="md"
                                color="gray"
                                className="me-2"
                                onClick={() => {
                                    setFormData({ name: '', description: '', permission_ids: [] });
                                    setInputError({ name: '', permission_ids: '' });
                                }}
                            >
                                Clear
                            </Button>
                            <Button radius="md" onClick={saveRole} loading={submitAPIStatus?.loading}>
                                {isEditMode ? 'Update' : 'Submit'}
                            </Button>
                        </div>
                    </Modal>
                )}

                <Modal
                    opened={showPermissionsModal}
                    onClose={() => setShowPermissionsModal(false)}
                    size="50rem"
                    overlayProps={{
                        backgroundOpacity: 0.25,
                        blur: 2,
                    }}
                    transitionProps={{
                        transition: 'pop',
                        duration: 200,
                    }}
                    classNames={{
                        header: 'border-b border-gray-200 pb-4 mb-4',
                        title: 'text-xl font-bold text-gray-800',
                    }}
                    withCloseButton={false}
                >
                    <Modal.Header className="flex justify-between border-b p-0">
                        <Modal.Title>
                            <div className="text-lg font-bold text-[#26448C]">Role Permissions</div>
                        </Modal.Title>
                        <button onClick={() => setShowPermissionsModal(false)} className="text-gray-500 hover:text-red-600 text-xl">
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </button>
                    </Modal.Header>

                    <Modal.Body className="mt-5 border-b mb-5 p-0">
                        {selectedRole && (
                            <div className="space-y-6">
                                <div className="p-5 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 flex items-center">
                                                <FontAwesomeIcon icon={faUserShield} className="text-blue-600 mr-2" />
                                                {selectedRole?.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1 pl-7">{selectedRole?.description || 'No description provided'}</p>
                                        </div>
                                        <Badge radius="md" variant="filled" color="blue" className="shadow-sm">
                                            {selectedRole?.permissions?.length} Permissions
                                        </Badge>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center">
                                            <FontAwesomeIcon icon={faListCheck} className="text-blue-500 mr-2" />
                                            Permission Details
                                        </h4>
                                        <div className="text-xs text-gray-500">Grouped by feature</div>
                                    </div>

                                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                                        {Object?.entries(
                                            selectedRole?.permissions?.reduce((acc: Record<string, any[]>, permission: any) => {
                                                if (!acc[permission?.feature]) {
                                                    acc[permission?.feature] = [];
                                                }
                                                acc[permission?.feature]?.push(permission);
                                                return acc;
                                            }, {}),
                                        ).map(([featureName, permissions]) => {
                                            const iconMap = {
                                                view: faEye,
                                                create: faPlusCircle,
                                                edit: faEdit,
                                                delete: faTrashAlt,
                                                manage: faCog,
                                                default: faKey,
                                            };

                                            const icon = iconMap[permissions[0]?.name as keyof typeof iconMap] || iconMap?.default;

                                            return (
                                                <div key={featureName} className="p-4 flex items-start hover:bg-blue-50 transition-colors duration-150 group">
                                                    <div className="flex-shrink-0 mt-0.5">
                                                        <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                                            <FontAwesomeIcon icon={icon} className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                                                        </div>
                                                    </div>

                                                    <div className="ml-4 flex-grow">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <div className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">{formatText(featureName)}</div>
                                                                <div className="text-xs text-gray-500 mt-1">
                                                                    {permissions?.length > 1 ? `${permissions?.length} actions` : `${permissions[0]?.name} action`}
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-wrap gap-1 max-w-[200px] justify-end">
                                                                {permissions?.map((p) => (
                                                                    <Badge key={p?.permission_id} variant="light" color="blue" radius="sm" className="text-xs capitalize">
                                                                        {p?.name}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="mt-2 text-xs text-gray-400 flex items-center">
                                                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                                                            {permissions?.length > 1 ? (
                                                                <Tooltip label={permissions?.map((p) => p?.permission_id)?.join(', ')} withArrow position="right">
                                                                    <span>Multiple permission IDs (hover to view)</span>
                                                                </Tooltip>
                                                            ) : (
                                                                `Permission ID: ${permissions[0]?.permission_id}`
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Modal.Body>

                    <div className="flex justify-end">
                        <Button radius="md" color="gray" className="me-2" onClick={() => setShowPermissionsModal(false)}>
                            Close
                        </Button>
                    </div>
                </Modal>
            </div>
        );
    };

    export default Roles;
