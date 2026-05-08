'use client';
import React, { useEffect, useState } from 'react';
import { Modal, TextInput, Textarea, Select, Button, Group, ActionIcon } from '@mantine/core';
import { Plus, Edit3, X } from 'lucide-react';
import { Message } from '@/app/helpers/AssetHelpers';
import CustomTable from '../customComponents/CustomTable';
import CustomTextInput from '../customComponents/CustomTextInput';
import CustomSelectInput from '../customComponents/CustomSelectInput';
import { addRooms, updateRooms } from '@/app/api/RoomsAPI';
import { getRecords } from '../CommonFunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { fetchRoomDetailsById } from './AddRoomsFunction';

const AddRooms = () => {
    const [formData, setFormData] = useState({
        roomName: '',
        roomNumber: '',
        roomArea: '',
        roomDescription: '',
        roomStatus: 'active',
    });

    const [rooms, setRooms] = useState<any>([]);
    const [errors, setErrors] = useState<any>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const [roomId, setRoomId] = useState();

    const statuses = [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
    ];

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev: any) => ({ ...prev, [name]: '' }));
    };

    const handleSelectChange = (value: string | null, name: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev: any) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors: any = {};
        if (!formData.roomName.trim()) newErrors.roomName = 'Room name is required';
        if (!formData.roomNumber.trim()) newErrors.roomNumber = 'Room number is required';
        if (!formData.roomArea.trim()) newErrors.roomArea = 'Room area is required';
        if (!formData.roomStatus) newErrors.roomStatus = 'Status is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        {
            console.log('inputField', formData);
        }

        isEditing
            ? updateRooms(roomId ?? '', formData).then((res) => {
                  if (res?.statusCode === 200) {
                      getRecords(`/rooms`, setRooms);
                      Message(res?.message, 'success');

                      setFormData({
                          roomName: '',
                          roomNumber: '',
                          roomArea: '',
                          roomDescription: '',
                          roomStatus: 'active',
                      });
                      setIsEditing(false);
                      setEditIndex(null);
                      setIsModalOpen(false);
                  } else {
                      Message(res?.message, 'error');
                  }
              })
            : addRooms(formData).then((res) => {
                  if (res?.statusCode === 200) {
                      getRecords(`/rooms`, setRooms);
                      Message(res?.message, 'success');

                      setFormData({
                          roomName: '',
                          roomNumber: '',
                          roomArea: '',
                          roomDescription: '',
                          roomStatus: 'active',
                      });
                      setIsEditing(false);
                      setEditIndex(null);
                      setIsModalOpen(false);
                  } else {
                      Message(res?.message, 'error');
                  }
              });
    };

    {
        console.log(errors, 'errors');
    }

    const handleEdit = (roomId: any) => {
        fetchRoomDetailsById(roomId, setFormData);
        setIsEditing(true);
        setIsModalOpen(true);
        setRoomId(roomId);
    };

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
                id: 'number',
                style: {
                    minWidth: '150px',
                    width: '150px',
                },
            },
            text: 'Room Number',
        },
        {
            th: {
                id: 'name',
                style: {
                    minWidth: '250px',
                    width: '250px',
                },
            },
            text: 'Room Name',
        },
        {
            th: {
                id: 'area',
                style: {
                    minWidth: '200px',
                    width: '200px',
                },
            },
            text: 'Area',
        },
        {
            th: {
                id: 'description',
                style: {
                    minWidth: '300px',
                    width: '300px',
                },
            },
            text: 'Description',
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

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getRecords(`/rooms`, setRooms);
        }
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Room Management</h1>
                    <Button
                        leftSection={<Plus size={16} />}
                        color="green"
                        onClick={() => {
                            setIsModalOpen(true);
                            setIsEditing(false);
                            setFormData({
                                roomName: '',
                                roomNumber: '',
                                roomArea: '',
                                roomDescription: '',
                                roomStatus: 'active',
                            });
                        }}
                    >
                        Add Room
                    </Button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <CustomTable
                        data={rooms}
                        setData={setRooms}
                        isSearchingRequired={false}
                        isSortingRequired={false}
                        isPaginationRequired={false}
                        tableHeadData={tableColumns}
                        tableBody={() => {
                            return rooms?.data?.map((obj: any, index: number) => (
                                <tr key={obj?.id} className="border-b">
                                    <td className="py-6 px-5">{index + 1}</td>
                                    <td>{obj?.room_number ?? '-'}</td>
                                    <td>{obj?.room_name ?? '-'}</td>
                                    <td>{obj?.room_area ?? '-'}</td>
                                    <td>{obj?.room_description ?? '-'}</td>
                                    <td>{obj?.room_status ?? '-'}</td>
                                    <td className="py-4 px-5 text-center">
                                        <button
                                            className="text-blue-600 hover:text-blue-800 p-2 transition-colors"
                                            onClick={(event) => {
                                                handleEdit(obj?.id);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    </td>{' '}
                                </tr>
                            ));
                        }}
                        url={`users`}
                        notFoundMessage="No Users Found."
                        notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
                    />{' '}
                </div>

                <Modal
                    opened={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false), setErrors({});
                    }}
                    title={isEditing ? 'Update Room' : 'Add New Room'}
                    centered
                    overlayProps={{ blur: 4, opacity: 0.4 }}
                    size="lg"
                >
                    <div className="space-y-4">
                        <CustomTextInput
                            withAsterisk={false}
                            label="Room Name"
                            placeholder="Enter room name"
                            name="roomName"
                            value={formData.roomName}
                            onChange={handleInputChange}
                            error={errors.roomName}
                        />
                        <CustomTextInput label="Room Number" placeholder="Enter room number" name="roomNumber" value={formData.roomNumber} onChange={handleInputChange} error={errors.roomName} />
                        <CustomTextInput label="Room Area (sq ft)" placeholder="Enter area" name="roomArea" value={formData.roomArea} onChange={handleInputChange} error={errors.roomArea} />
                        <Textarea label="Room Description" placeholder="Enter description" name="roomDescription" value={formData.roomDescription} onChange={handleInputChange} />
                        <CustomSelectInput
                            label="Room Status"
                            data={statuses}
                            value={formData.roomStatus}
                            onChange={(value) => handleSelectChange(value, 'roomStatus')}
                            error={errors.roomStatus}
                            name="roomStatus"
                        />

                        <Group justify="flex-end" mt="md">
                            <Button variant="outline" color="gray" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    handleSubmit();
                                }}
                            >
                                {isEditing ? 'Update Room' : 'Save Room'}
                            </Button>
                        </Group>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default AddRooms;
