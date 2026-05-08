'use client';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Group, ActionIcon, Text, Textarea } from '@mantine/core';
import { Plus, Edit3, X, User, Phone, MapPin, FileText, Upload, Trash2, Download } from 'lucide-react';
import { Message } from '@/app/helpers/AssetHelpers';
import CustomTable from '../customComponents/CustomTable';
import CustomTextInput from '../customComponents/CustomTextInput';
import CustomSelectInput from '../customComponents/CustomSelectInput';
import { getRecords } from '../CommonFunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { addLabour, updateLabour } from '@/app/api/LaboursAPI';
import { useAuth } from '../auth/Auth';
import { DocumentViewer } from './DocumentViewer';
import { fetchLabourDetailsById } from './AddLaboursFunction';

interface Document {
    id: string;
    file: File;
    preview: string;
    name: string;
    type: string;
}

const AddLabours = () => {
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        contactNumber: '',
        address: '',
        status: 'active',
    });

    const [documents, setDocuments] = useState<Document[]>([]);
    const [labours, setLabours] = useState<any>([]);
    const [errors, setErrors] = useState<any>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [labourId, setLabourId] = useState<string>('');

    const statuses = [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
    ];

    const [documentViewerOpen, setDocumentViewerOpen] = useState(false);
    const [selectedLabourDocuments, setSelectedLabourDocuments] = useState<any[]>([]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev: any) => ({ ...prev, [name]: '' }));
    };

    const handleSelectChange = (value: string | null, name: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev: any) => ({ ...prev, [name]: '' }));
    };

    const handleDocumentUpload = (e: any) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        if (files.length > 10) {
            Message('You can only upload up to 10 files at a time.', 'info');
            e.target.value = '';
            return;
        }

        const newDocuments: Document[] = [];

        Array.from(files).forEach((file: any) => {
            const documentId = Date.now().toString() + Math.random().toString(36).substr(2, 9);

            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const newDoc: Document = {
                        id: documentId,
                        file: file,
                        preview: reader.result as string,
                        name: file.name,
                        type: file.type,
                    };
                    setDocuments((prev) => [...prev, newDoc]);
                };
                reader.readAsDataURL(file);
            } else {
                const newDoc: Document = {
                    id: documentId,
                    file: file,
                    preview: '',
                    name: file.name,
                    type: file.type,
                };
                newDocuments.push(newDoc);
            }
        });

        if (newDocuments.length > 0) {
            setDocuments((prev) => [...prev, ...newDocuments]);
        }

        e.target.value = '';
    };

    const removeDocument = (id: string) => {
        setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    };

    const downloadDocument = (doc: Document) => {
        const url = URL.createObjectURL(doc.file);
        const a = window.document.createElement('a');
        a.href = url;
        a.download = doc.name;
        window.document.body.appendChild(a);
        a.click();
        window.document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const validateForm = () => {
        const newErrors: any = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.contactNumber.trim()) {
            newErrors.contactNumber = 'Contact number is required';
        } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
            newErrors.contactNumber = 'Please enter a valid 10-digit number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const submitData = new FormData();
        submitData.append('first_name', formData.firstName);
        submitData.append('last_name', formData.lastName);
        submitData.append('contact', formData.contactNumber);
        submitData.append('address', formData.address);
        submitData.append('status', formData.status);
        submitData.append('created_by', currentUser?.user?.user_id ?? '');

        documents.forEach((doc, index) => {
            submitData.append(`documents`, doc.file);
        });

        isEditing
            ? updateLabour(labourId, submitData).then((res) => {
                  if (res?.statusCode === 200) {
                      getRecords(`/labours`, setLabours);
                      Message(res?.message, 'success');
                      resetForm();
                      setIsModalOpen(false);
                  } else {
                      Message(res?.message, 'error');
                  }
              })
            : addLabour(submitData).then((res) => {
                  if (res?.statusCode === 200) {
                      getRecords(`/labours`, setLabours);
                      Message(res?.message, 'success');
                      resetForm();
                      setIsModalOpen(false);
                  } else {
                      Message(res?.message, 'error');
                  }
              });
    };

    const handleEdit = (id: string) => {
        fetchLabourDetailsById(id, setFormData);
        setIsEditing(true);
        setLabourId(id);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        // deleteLabour(id).then((res) => {
        //     if (res?.statusCode === 200) {
        //         getRecords(`/labours`, setLabours);
        //         Message(res?.message, 'success');
        //     } else {
        //         Message(res?.message, 'error');
        //     }
        // });
    };

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            contactNumber: '',
            address: '',
            status: 'active',
        });
        setDocuments([]);
        setErrors({});
        setIsEditing(false);
        setLabourId('');
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
                id: 'name',
                style: {
                    minWidth: '200px',
                    width: '200px',
                },
            },
            text: 'Full Name',
        },
        {
            th: {
                id: 'contact',
                style: {
                    minWidth: '250px',
                    width: '250px',
                },
            },
            text: 'Contact Number',
        },
        {
            th: {
                id: 'address',
                style: {
                    minWidth: '250px',
                    width: '250px',
                },
            },
            text: 'Address',
        },
        {
            th: {
                id: 'documents',
                style: {
                    minWidth: '180px',
                    width: '180px',
                },
            },
            text: 'Documents',
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
                    minWidth: '120px',
                    width: '120px',
                },
            },
            text: 'Actions',
            justifyContent: 'center',
        },
    ];

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getRecords(`/labours`, setLabours);
        }
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <User className="w-6 h-6 text-green-600" /> Labour Management
                    </h1>
                    <Button
                        leftSection={<Plus size={16} />}
                        color="green"
                        onClick={() => {
                            setIsModalOpen(true);
                            resetForm();
                        }}
                    >
                        Add Labour
                    </Button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <CustomTable
                        data={labours}
                        setData={setLabours}
                        isSearchingRequired={false}
                        isSortingRequired={false}
                        isPaginationRequired={false}
                        tableHeadData={tableColumns}
                        tableBody={() => {
                            return labours?.data?.map((obj: any, index: number) => (
                                <tr key={obj?.id} className="border-b">
                                    <td className="py-6 px-5">{index + 1}</td>
                                    <td>{`${obj?.first_name || ''} ${obj?.last_name || ''}`.trim() || '-'}</td>
                                    <td>{obj?.contact ?? '-'}</td>
                                    <td>{obj?.address ?? '-'}</td>
                                    <td>
                                        {obj?.documents && obj.documents.length > 0 ? (
                                            <div className="flex flex-wrap gap-1">
                                                <Button
                                                    variant="light"
                                                    size="xs"
                                                    color="blue"
                                                    onClick={() => {
                                                        setSelectedLabourDocuments(obj.documents);
                                                        setDocumentViewerOpen(true);
                                                    }}
                                                >
                                                    View Documents ({obj.documents.length})
                                                </Button>
                                            </div>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${obj?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {obj?.status ? obj.status.charAt(0).toUpperCase() + obj.status.slice(1) : '-'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-5 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                className="text-blue-600 hover:text-blue-800 p-2 transition-colors"
                                                onClick={() => handleEdit(obj?.id)}
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            {/* <button className="text-red-600 hover:text-red-800 p-2 transition-colors" onClick={() => handleDelete(obj?.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button> */}
                                        </div>
                                    </td>
                                </tr>
                            ));
                        }}
                        url={`labours`}
                        notFoundMessage="No Labours Found."
                        notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
                    />
                </div>

                <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditing ? 'Update Labour' : 'Add New Labour'} centered overlayProps={{ blur: 4, opacity: 0.4 }} size="lg">
                    <div className="space-y-4">
                        <CustomTextInput
                            label="First Name"
                            placeholder="Enter first name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            error={errors.firstName}
                            autoComplete="off"
                            leftSection={<User className="w-4 h-4 text-gray-400" />}
                        />

                        <CustomTextInput
                            label="Last Name"
                            placeholder="Enter last name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            error={errors.lastName}
                            autoComplete="off"
                            leftSection={<User className="w-4 h-4 text-gray-400" />}
                        />

                        <CustomTextInput
                            label="Contact Number"
                            placeholder="Enter contact number"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleInputChange}
                            error={errors.contactNumber}
                            autoComplete="off"
                            leftSection={<Phone className="w-4 h-4 text-gray-400" />}
                        />

                        <Textarea
                            label="Address"
                            placeholder="Enter address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows={3}
                            autoComplete="off"
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Documents (Optional)</label>

                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors mb-4">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                    <p className="mb-1 text-sm text-gray-600">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 5MB per file)</p>
                                    <p className="text-xs text-gray-400 mt-1">You can select multiple files</p>
                                </div>
                                <input type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" onChange={handleDocumentUpload} className="hidden" />
                            </label>

                            {documents.length > 0 && (
                                <div className="space-y-3">
                                    <Text size="sm" className="font-medium text-gray-700">
                                        Uploaded Documents ({documents.length})
                                    </Text>
                                    {documents.map((document) => (
                                        <div key={document.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                                            <div className="flex items-center space-x-3 flex-1">
                                                {document.preview && document.type.startsWith('image/') ? (
                                                    <img src={document.preview} alt="Document preview" className="w-10 h-10 object-cover rounded" />
                                                ) : (
                                                    <FileText className="w-8 h-8 text-gray-400" />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-700 truncate">{document.name}</p>
                                                    <p className="text-xs text-gray-500">{document.type}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <ActionIcon color="blue" variant="subtle" onClick={() => downloadDocument(document)} title="Download">
                                                    <Download className="w-4 h-4" />
                                                </ActionIcon>
                                                <ActionIcon color="red" variant="subtle" onClick={() => removeDocument(document.id)} title="Remove">
                                                    <Trash2 className="w-4 h-4" />
                                                </ActionIcon>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <CustomSelectInput label="Status" data={statuses} value={formData.status} onChange={(value) => handleSelectChange(value, 'status')} error={errors.status} name="status" />

                        <Group justify="flex-end" mt="md">
                            <Button variant="outline" color="gray" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} color="green">
                                {isEditing ? 'Update Labour' : 'Save Labour'}
                            </Button>
                        </Group>
                    </div>
                </Modal>
            </div>

            <DocumentViewer documents={selectedLabourDocuments} isOpen={documentViewerOpen} onClose={() => setDocumentViewerOpen(false)} />
        </div>
    );
};

export default AddLabours;
