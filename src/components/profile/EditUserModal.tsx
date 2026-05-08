// components/EditUserModal.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Modal, Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../utils/Constants';
import CustomTextInput from '../customComponents/CustomTextInput';
import CustomSelectInput from '../customComponents/CustomSelectInput';
import { Message } from '@/app/helpers/AssetHelpers';
import { validateUserForm } from './UserFunction';
import { InputErrorType } from '../types/OthersTypes';

interface EditUserModalProps {
    opened: boolean;
    onClose: () => void;
    userData: any;
    onSuccess: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ opened, onClose, userData, onSuccess }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        status: 'active',
        is_email_alerts: true,
    });
    const [isLoading, setIsLoading] = useState(false);

    const [inputError, setInputError] = useState<InputErrorType>({});

    useEffect(() => {
        console.log('User data changed:', userData);
        if (userData) {
            setFormData({
                first_name: userData?.data?.first_name,
                last_name: userData?.data?.last_name,
                phone: userData?.data?.phone,
                email: userData?.data?.email,
                status: userData?.data?.status,
                is_email_alerts: userData?.data?.is_email_alerts ?? true,
            });
        }
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name } = event?.target;
        const { error } = validateUserForm(formData);
        setInputError((prevErrors: any) => ({ ...prevErrors, [name]: error[name as keyof InputErrorType] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { cnt, error } = validateUserForm(formData);

        if (cnt > 0) {
            setInputError(error);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userData?.data?.user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                if (data?.statusCode === 200) {
                    Message('User Updated Successfully', 'success');
                    onSuccess();
                    onClose();
                } else {
                    setInputError(data?.message || 'Failed to update user');
                }
            }

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            onSuccess();
            onClose();
        } catch (err: any) {
            setInputError(err.message || 'Failed to update user');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
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
                    <div className="text-lg font-bold text-[#26448C]">Update User Details</div>
                </Modal.Title>
                <button
                    onClick={() => {
                        onClose();
                        setInputError({});
                    }}
                    className="text-gray-500 hover:text-red-600 text-xl"
                >
                    <FontAwesomeIcon icon={faXmark} size="lg" />
                </button>
            </Modal.Header>
            <Modal.Body className="mt-5 border-b mb-5 p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <CustomTextInput
                            label="First Name"
                            autoComplete="off"
                            placeholder="Enter first name"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={inputError.first_name}
                        />
                    </div>

                    <div>
                        <CustomTextInput
                            id="last_name"
                            error={inputError.last_name}
                            label="Last Name"
                            autoComplete="off"
                            onBlur={handleBlur}
                            placeholder="Enter last name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <CustomTextInput
                            label="Email"
                            type="email"
                            onBlur={handleBlur}
                            error={inputError.email}
                            id="email"
                            autoComplete="off"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <CustomTextInput
                            label="Phone"
                            type="tel"
                            error={inputError.phone}
                            onBlur={handleBlur}
                            id="phone"
                            autoComplete="off"
                            placeholder="Enter phone number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-md font-medium text-black mb-3">
                            Email Alerts <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center space-x-4 mb-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="is_email_alerts"
                                    value="true"
                                    checked={formData.is_email_alerts === true}
                                    onChange={() => setFormData((prev) => ({ ...prev, is_email_alerts: true }))}
                                    className="h-6 w-6 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <span className="ml-2 text-sm text-gray-700">Enabled</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="is_email_alerts"
                                    value="false"
                                    checked={formData.is_email_alerts === false}
                                    onChange={() => setFormData((prev) => ({ ...prev, is_email_alerts: false }))}
                                    className="h-6 w-6 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <span className="ml-2 text-sm text-gray-700">Disabled</span>
                            </label>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <div className="flex justify-end space-x-3 mt-6">
                <Button
                    type="button"
                    variant="filled"
                    color="gray"
                    onClick={() => {
                        onClose(), setInputError({});
                    }}
                    disabled={isLoading}
                    radius="md"
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading} variant="filled" radius="md" onClick={handleSubmit}>
                    {isLoading ? 'Saving...' : <>Update</>}
                </Button>
            </div>
        </Modal>
    );
};

export default EditUserModal;
