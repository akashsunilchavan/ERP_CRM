'use client';
import { Button, Card, CardSection, Modal, Textarea } from '@mantine/core';
import React, { useContext, useEffect, useState } from 'react';
import CustomTable from '../customComponents/CustomTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEnvelope, faEye, faLock, faPlus, faTrashAlt, faUser, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons';
import CustomTextInput from '../customComponents/CustomTextInput';
import CustomSelectInput from '../customComponents/CustomSelectInput';
import CustomDateInput from '../customComponents/CustomDateInput';
import CustomNumberInput from '../customComponents/CustomNumberInput';
import { fetchUserDetails, validateAddUserForm } from './UserFunction';
import { APIStatusType, InputErrorType, RoleContextValue } from '../types/OthersTypes';
import { getRecords, handleInputChange, handleOtherInputChange, handleSubmit } from '../CommonFunction';
import { APIStatusData } from '../data/OtherDefalutData';
import { addUsers, getAllUsers, updateUsers } from '@/app/api/UsersAPI';
import { checkRole, dateFormat, Message } from '@/app/helpers/AssetHelpers';
import { useAuth } from '../auth/Auth';
import roleContext from '../context/roleContext';
import { registerUser } from '@/app/api/Requests';

export type ModalModeType = 'create' | 'view' | 'edit';

const Users = () => {
    const initialState = { firstName: '', email: '', role: '', mobileNumber: '', password: '' };

    const { currentUser } = useAuth();

    let roleState: RoleContextValue = useContext(roleContext);

    const [inputField, setInputField] = useState(initialState);

    const [inputError, setInputError] = useState<InputErrorType>({});

    const [modalMode, setModalMode] = useState<ModalModeType>('create');

    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    const [roles, setRoles] = useState<{ data?: any[] }>({});

    const [data, setData] = useState<{ data: [] }>({ data: [] });

    const [supervisor, setSupervisors] = useState<any>();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [submitAPIStatus, setSubmitAPIStatus] = useState<APIStatusType>(APIStatusData);

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
                    minWidth: '250px',
                    width: '250px',
                },
            },
            text: 'Name',
        },
        {
            th: {
                id: 'role',
                style: {
                    minWidth: '120px',
                    width: '100px',
                },
            },
            text: 'Role',
        },

        {
            th: {
                id: 'mobileNumber',
                style: {
                    minWidth: '170px',
                    width: '120px',
                },
            },
            text: 'Mobile Number',
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

    const [addUserModal, setAddUserModal] = useState(false);

    const handleView = (currentUser: string, userId: string) => {
        setModalMode('view');
        setSelectedUserId(userId);
        fetchUserDetails(currentUser, userId, setInputField);
        setAddUserModal(true);
    };

    const handleEdit = (currentUser: string, userId: string) => {
        setModalMode('edit');
        setSelectedUserId(userId);
        fetchUserDetails(currentUser, userId, setInputField);
        setAddUserModal(true);
    };

    const handleSubmit = async () => {
        const errors = validateAddUserForm(inputField);

        if (Object.keys(errors).length > 0) {
            setInputError(errors);
            return;
        }

        setIsSubmitting(true);
        const res = await registerUser(inputField?.firstName, inputField?.email, inputField?.password, inputField?.mobileNumber, inputField?.role);

        if (res?.statusCode === 200) {
            getAllUsers()?.then((res) => {
                if (res?.statusCode === 200) {
                    setData(res);
                }
            });
            setInputField(initialState);
            setInputError({});
            setAddUserModal(false);
        } else {
            Message(res?.message, 'error');
            setAddUserModal(false);
        }
        setIsSubmitting(false);
    };

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getRecords(`fetchAll-role`, setRoles);
            getAllUsers()?.then((res) => {
                if (res?.statusCode === 200) {
                    setData(res);
                }
            });
        }
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <>
            <div className="w-full h-full flex flex-col gap-4 p-4">
                <Card radius="md" padding="lg" shadow="sm" withBorder className="w-full h-full bg-white dark:bg-gray-800 shadow-md p-4">
                    <CardSection>
                        <div className="relative overflow-hidden bg-gradient-to-br from-blue-800 to-cyan-500 text-white pt-5 pb-5 px-6 rounded-t-2xl">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-300/50 via-white/30 to-blue-400/50"></div>
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/10"></div>
                            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-white/15"></div>

                            <div className="relative z-10 flex items-center justify-center gap-4">
                                <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                                    <FontAwesomeIcon icon={faUsers} className="w-6 h-6 text-white/100 animate-[pulse_2s_ease-in-out_infinite]" />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                                    <h3 className="text-xl font-bold text-center sm:text-left tracking-tight">Users</h3>
                                </div>
                            </div>
                        </div>
                    </CardSection>
                    <CustomTable
                        data={data}
                        setData={setData}
                        isSearchingRequired={false}
                        isSortingRequired={false}
                        isPaginationRequired={false}
                        tableHeadData={tableColumns}
                        tableBody={() => {
                            return data?.data?.map((obj: any, index: number) => (
                                <tr key={obj?.staff_user_id} className="border-b">
                                    <td className="py-6 px-5">{index + 1}</td>
                                    <td>
                                        {obj?.first_name ?? '-'}
                                        <br />
                                        {obj?.email ?? '-'}
                                    </td>
                                    <td>{obj?.role?.name ?? '-'}</td>
                                    <td>{obj?.phone ?? '-'}</td>
                                    <td className="text-center">
                                        <Button
                                            // hidden={!checkRole(['user management'], roleState?.features, 'view')}
                                            variant="transparent"
                                            size="sm"
                                            className="p-2"
                                            onClick={() => handleView(currentUser?.user?.user_id ?? '', obj?.user_id)}
                                        >
                                            <FontAwesomeIcon icon={faEye} />
                                        </Button>
                                        <Button
                                            // hidden={!checkRole(['user management'], roleState?.features, 'update')}
                                            variant="transparent"
                                            size="sm"
                                            className="p-2"
                                            onClick={() => handleEdit(currentUser?.user?.user_id ?? '', obj?.user_id)}
                                        >
                                            <FontAwesomeIcon icon={faEdit} color="green" />
                                        </Button>
                                        {/* <Button
                                            variant="transparent"
                                            className="p-2"
                                            hidden={!checkRole(['user management'], roleState?.features, 'delete')}
                                            onClick={() => {
                                                deleteRecord(
                                                    `delete-staff-user/${obj?.user_id}`,
                                                    async () => {
                                                        await getAllUsers()?.then((res) => {
                                                            if (res.statusCode === 200) {
                                                                setData(res);
                                                            }
                                                        });
                                                    },
                                                    setInputField,
                                                    setInputError,
                                                    initialState,
                                                );
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} color="red" />
                                        </Button> */}
                                    </td>
                                </tr>
                            ));
                        }}
                        notFoundMessage="User Not Found"
                        notFoundImage="/assets/images/businessWorld/WorkInProgress.svg"
                        url="fetchAll-staff-user"
                        newRecordButton={
                            <Button
                                leftSection={<FontAwesomeIcon icon={faPlus} />}
                                variant="gradient"
                                gradient={{ from: 'blue', to: 'cyan' }}
                                radius="md"
                                className="mt-5"
                                onClick={() => {
                                    setAddUserModal(true);
                                }}
                                // hidden={!checkRole(['user management'], roleState?.features, 'create')}
                            >
                                Add User
                            </Button>
                        }
                    />
                </Card>
            </div>
            <Modal
                opened={addUserModal}
                onClose={() => {
                    setAddUserModal(false);
                }}
                size="50rem"
                withCloseButton={false}
                transitionProps={{
                    transition: 'fade',
                    duration: 400,
                    timingFunction: 'linear',
                }}
                centered
            >
                <Modal.Header className="flex justify-between border-b p-0">
                    <Modal.Title>
                        <div className="text-lg font-bold text-[#26448C]"> {modalMode === 'create' ? 'Add User' : modalMode === 'view' ? 'View User' : 'Update User'}</div>
                    </Modal.Title>
                    <button
                        onClick={() => {
                            setInputError({});
                            setInputField(initialState);
                            setAddUserModal(false);
                            setModalMode('create');
                            setSelectedUserId(null);
                        }}
                        className="text-gray-500 hover:text-red-600 text-xl"
                    >
                        <FontAwesomeIcon icon={faXmark} size="lg" />
                    </button>
                </Modal.Header>

                <Modal.Body className="mt-5 border-b mb-5 p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
                        <CustomTextInput
                            label="Full Name"
                            placeholder="Enter First Name"
                            autoComplete="off"
                            name="firstName"
                            value={inputField?.firstName}
                            error={inputError?.firstName}
                            onChange={(event) => {
                                handleInputChange(event, setInputField, inputError, setInputError);
                            }}
                            disabled={modalMode === 'view'}
                            leftSection={<FontAwesomeIcon icon={faUser} className="text-sm" />}
                        />
                        <CustomTextInput
                            label="Email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            value={inputField?.email}
                            error={inputError?.email}
                            onChange={(event) => {
                                handleInputChange(event, setInputField, inputError, setInputError);
                            }}
                            disabled={modalMode === 'view'}
                            leftSection={<FontAwesomeIcon icon={faEnvelope} className="text-sm" />}
                        />
                        <CustomSelectInput
                            label="Role"
                            data={
                                roles?.data?.map((role) => ({
                                    label: role?.name,
                                    value: role?.role_id || '',
                                })) || []
                            }
                            name="role"
                            value={inputField?.role}
                            error={inputError?.role}
                            onChange={(event) => {
                                handleOtherInputChange(event, 'role', setInputField, inputError, setInputError);
                            }}
                            disabled={modalMode === 'view'}
                        />

                        {/* <CustomSelectInput
                            label="Supervisor"
                            data={
                                supervisor?.data?.map((obj: any) => ({
                                    label: obj?.first_name,
                                    value: obj?.user_id || '',
                                })) || []
                            }
                            name="role"
                            value={inputField?.role}
                            error={inputError?.role}
                            onChange={(event) => {
                                handleOtherInputChange(event, 'role', setInputField, inputError, setInputError);
                            }}
                            onBlur={() => {
                                handleOnBlur(`role`);
                            }}
                            disabled={modalMode === 'view'}
                        /> */}
                        <CustomNumberInput
                            label="Mobile Number"
                            size="md"
                            leftSection={<span>+91</span>}
                            placeholder="XXXXXXXXXX"
                            name="mobileNumber"
                            autoComplete="off"
                            value={inputField?.mobileNumber}
                            error={inputError?.mobileNumber}
                            onChange={(event) => {
                                handleInputChange(event, setInputField, inputError, setInputError);
                            }}
                            disabled={modalMode === 'view'}
                            maxLength={10}
                        />
                        <CustomTextInput
                            label="Password"
                            value={inputField.password}
                            name="password"
                            onChange={(e) => handleInputChange(e, setInputField, inputError, setInputError)}
                            placeholder="Enter password"
                            error={inputError.password}
                            autoComplete="off"
                            disabled={modalMode === 'view'}
                            leftSection={<FontAwesomeIcon icon={faLock} className="text-sm" />}
                            className="mb-5"
                        />
                    </div>
                </Modal.Body>
                {modalMode !== 'view' && (
                    <div className="flex justify-end">
                        <Button
                            radius="md"
                            color="gray"
                            className="me-2"
                            onClick={() => {
                                setInputError({});
                                setInputField(initialState);
                                setSelectedUserId(null);
                            }}
                        >
                            Clear
                        </Button>
                        <Button
                            radius="md"
                            loading={submitAPIStatus?.loading}
                            onClick={() => {
                                if (modalMode === 'create') {
                                    handleSubmit();
                                }

                                // else if (modalMode === 'edit' && selectedUserId) {
                                //     handleUpdate(selectedUserId);
                                // }
                            }}
                        >
                            {modalMode === 'create' ? 'Submit' : 'Update'}
                        </Button>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default Users;
