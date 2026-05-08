'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faPlus, faXmark, faUser, faEnvelope, faPhone, faLock, faShield } from '@fortawesome/free-solid-svg-icons';
import CustomTextInput from '../customComponents/CustomTextInput';
import { getRecords, handleInputChange, handleOtherInputChange } from '../CommonFunction';
import { InputErrorType } from '../types/OthersTypes';
import { registerUser } from '@/app/api/Requests';
import { Message } from '@/app/helpers/AssetHelpers';
import CustomSelectInput from '../customComponents/CustomSelectInput';
import { fetchSupervisorDetails, validateSupervisor } from './AddSupervisorsFunction';
import CustomTable from '../customComponents/CustomTable';
import { useAuth } from '../auth/Auth';

const AddSupervisors = () => {
    const { currentUser } = useAuth();

    const initialState = {
        name: '',
        email: '',
        number: '',
        password: '',
        role: '',
        confirmPassword: '',
        isActive: true,
    };

    const [inputField, setInputField] = useState(initialState);
    const [supervisors, setSupervisors] = useState([
        { id: 1, name: 'John Doe', email: 'john@farm.com', number: '9876543210', isActive: true },
        { id: 2, name: 'Jane Smith', email: 'jane@farm.com', number: '8765432109', isActive: false },
        { id: 3, name: 'Mike Johnson', email: 'mike@farm.com', number: '7654321098', isActive: true },
    ]);
    const [searchValue, setSearchValue] = useState('');
    const [inputError, setInputError] = useState<InputErrorType>({});
    const [editModal, setEditModal] = useState(false);
    const [editSupervisorId, setEditSupervisorId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [users, setUsers] = useState<any>([]);
    const [allUsers, setAllUsers] = useState<any[]>([]);

    const [rolesData, setRolesData] = useState<any>();

    const tableColumns = [
        {
            th: {
                id: 'srNo',
                style: {
                    minWidth: '70px',
                    width: '60px',
                },
            },
            text: 'SR NO.',
        },
        {
            th: {
                id: 'name',
                style: {
                    minWidth: '300px',
                    width: '300px',
                },
            },
            text: 'Full Name',
        },
        {
            th: {
                id: 'email',
                style: {
                    minWidth: '250px',
                    width: '250px',
                },
            },
            text: 'Email',
        },
        {
            th: {
                id: 'role',
                style: {
                    minWidth: '180px',
                    width: '180px',
                },
            },
            text: 'Role',
        },
        {
            th: {
                id: 'phoneNumber',
                style: {
                    minWidth: '300px',
                    width: '300px',
                },
            },
            text: 'Phone Number',
        },
        {
            th: {
                id: 'status',
                style: {
                    minWidth: '100px',
                    width: '100px',
                },
            },
            text: 'Status',
        },
        {
            th: {
                id: 'action',
                style: {
                    minWidth: '100px',
                    width: '100px',
                },
            },
            text: 'Action',
            justifyContent: 'center',
        },
    ];

    const handleSubmit = async () => {
        const errors = validateSupervisor(inputField, false);
        if (Object.keys(errors).length > 0) {
            setInputError(errors);
            return;
        }

        setIsSubmitting(true);
        await registerUser(inputField?.name, inputField?.email, inputField?.password, inputField?.number, inputField?.role).then((res) => {
            if (res?.statusCode === 200) {
                getRecords(`users?search=${searchValue}`, setUsers);

                setInputField(initialState);
                setInputError({});
                setIsSubmitting(false);
            } else {
                Message(res?.message, 'error');
                setIsSubmitting(false);
            }
        });
    };

    const handleUpdate = () => {
        const errors = validateSupervisor(inputField, true);
        if (Object.keys(errors).length > 0) {
            setInputError(errors);
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            setSupervisors((prev) =>
                prev.map((sup) => (sup.id === editSupervisorId ? { ...sup, name: inputField.name, email: inputField.email, number: inputField.number, isActive: inputField.isActive } : sup)),
            );
            setEditModal(false);
            setInputField(initialState);
            setInputError({});
            setIsSubmitting(false);
        }, 800);
    };

    {
        console.log('inputError', inputError);
    }

    const handleEditClick = (supervisor: any) => {
        setEditSupervisorId(supervisor?.user_id);
        fetchSupervisorDetails(supervisor?.user_id, setInputField);
        setEditModal(true);
        setInputError({});
    };

    const filteredSupervisors = supervisors.filter(
        (sup) => sup.name.toLowerCase().includes(searchValue.toLowerCase()) || sup.email.toLowerCase().includes(searchValue.toLowerCase()) || sup.number.includes(searchValue),
    );

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getRecords(`fetchAll-role`, setRolesData);

            getRecords(`users?search=${searchValue}`, setUsers);
        }
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white shadow-sm rounded-lg p-6 mb-6 border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Supervisor</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <CustomTextInput
                            label="Full Name"
                            value={inputField.name}
                            name="name"
                            onChange={(e) => handleInputChange(e, setInputField, inputError, setInputError)}
                            placeholder="Enter full name"
                            error={inputError.name}
                            leftSection={<FontAwesomeIcon icon={faUser} className="text-sm" />}
                        />

                        <CustomTextInput
                            label="Email"
                            value={inputField.email}
                            name="email"
                            type="email"
                            onChange={(e) => handleInputChange(e, setInputField, inputError, setInputError)}
                            placeholder="Enter email"
                            error={inputError.email}
                            withAsterisk={false}
                            leftSection={<FontAwesomeIcon icon={faEnvelope} className="text-sm" />}
                        />

                        <CustomTextInput
                            label="Phone Number"
                            value={inputField.number}
                            name="number"
                            type="tel"
                            onChange={(e) => handleInputChange(e, setInputField, inputError, setInputError)}
                            placeholder="Enter phone number"
                            error={inputError.number}
                            leftSection={<FontAwesomeIcon icon={faPhone} className="text-sm" />}
                        />

                        <CustomTextInput
                            label="Password"
                            value={inputField.password}
                            name="password"
                            onChange={(e) => handleInputChange(e, setInputField, inputError, setInputError)}
                            placeholder="Enter password"
                            error={inputError.password}
                        />
                        <CustomSelectInput
                            label="Select Role"
                            placeholder="Choose role"
                            name="role"
                            value={inputField?.role}
                            onChange={(event) => {
                                handleOtherInputChange(event, `role`, setInputField, inputError, setInputError);
                            }}
                            data={
                                rolesData?.data?.map((role: any) => ({
                                    label: role?.name,
                                    value: role?.role_id,
                                })) || []
                            }
                            error={inputError?.role}
                        />

                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faPlus} />
                                    Add Supervisor
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <p className="font-semibold text-gray-700">Total Supervisors: {users?.data?.length}</p>
                    </div>

                    <div className="overflow-x-auto">
                        <CustomTable
                            data={users}
                            setData={setUsers}
                            isSearchingRequired={false}
                            isSortingRequired={false}
                            isPaginationRequired={true}
                            tableHeadData={tableColumns}
                            tableBody={() => {
                                return users?.data?.map((user: any, index: number) => (
                                    <tr key={user?.user_id} className="border-b">
                                        <td className="py-6 px-5">{index + 1}</td>
                                        <td>
                                            <span className="me-2">{user?.first_name ?? '-'}</span>
                                        </td>
                                        <td>{user?.email ?? '-'}</td>
                                        <td>{user?.role?.name ?? '-'}</td>
                                        <td>{user?.phone ?? '-'}</td>
                                        <td>{user?.status ?? '-'}</td>
                                        <td className="py-4 px-5 text-center">
                                            <button onClick={() => handleEditClick(user)} className="text-blue-600 hover:text-blue-800 p-2 transition-colors">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                        </td>{' '}
                                    </tr>
                                ));
                            }}
                            url={`users?search=${searchValue}`}
                            notFoundMessage="No Users Found."
                            notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
                        />
                    </div>
                </div>

                {editModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center border-b p-6">
                                <h3 className="text-xl font-bold text-blue-600">Update Supervisor</h3>
                                <button
                                    onClick={() => {
                                        setEditModal(false);
                                        setInputField(initialState);
                                        setInputError({});
                                    }}
                                    className="text-gray-500 hover:text-red-600 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faXmark} size="lg" />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <CustomTextInput
                                    label="Full Name"
                                    value={inputField.name}
                                    name="name"
                                    onChange={(e) => handleInputChange(e, setInputField, inputError, setInputError)}
                                    placeholder="Enter full name"
                                    error={inputError.name}
                                    leftSection={<FontAwesomeIcon icon={faUser} className="text-sm" />}
                                />

                                <CustomTextInput
                                    label="Email"
                                    value={inputField.email}
                                    name="email"
                                    type="email"
                                    onChange={(e) => handleInputChange(e, setInputField, inputError, setInputError)}
                                    placeholder="Enter email"
                                    error={inputError.email}
                                    leftSection={<FontAwesomeIcon icon={faEnvelope} className="text-sm" />}
                                />

                                <CustomTextInput
                                    label="Phone Number"
                                    value={inputField.number}
                                    name="number"
                                    type="tel"
                                    onChange={(e) => handleInputChange(e, setInputField, inputError, setInputError)}
                                    placeholder="Enter phone number"
                                    error={inputError.number}
                                    leftSection={<FontAwesomeIcon icon={faPhone} className="text-sm" />}
                                />

                                <CustomTextInput
                                    label="Password"
                                    value={inputField.password}
                                    name="password"
                                    onChange={(e) => handleInputChange(e, setInputField, inputError, setInputError)}
                                    placeholder="Enter password"
                                    error={inputError.password}
                                    leftSection={<FontAwesomeIcon icon={faLock} className="text-sm" />}
                                />
                                <CustomSelectInput
                                    label="Select Role"
                                    placeholder="Choose role"
                                    name="role"
                                    value={inputField?.role}
                                    onChange={(event) => {
                                        handleOtherInputChange(event, `role`, setInputField, inputError, setInputError);
                                    }}
                                    data={
                                        rolesData?.data?.map((role: any) => ({
                                            label: role?.name,
                                            value: role?.role_id,
                                        })) || []
                                    }
                                    error={inputError?.role}
                                />
                            </div>

                            <div className="flex justify-end p-6 border-t">
                                <button
                                    onClick={handleUpdate}
                                    disabled={isSubmitting}
                                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        'Update Supervisor'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddSupervisors;
