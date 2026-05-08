'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Modal, Textarea, Title } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faEraser } from '@fortawesome/free-solid-svg-icons';
import CustomTable from '../customComponents/CustomTable';
import CustomSelectInput from '../customComponents/CustomSelectInput';
import CustomTextInput from '../customComponents/CustomTextInput';
import { getRecords } from '../CommonFunction';
import CustomDateInput from '../customComponents/CustomDateInput';
import { useAuth } from '../auth/Auth';
import { addHarvesting } from '@/app/api/HarvestingAPI';
import { Message } from '@/app/helpers/AssetHelpers';

export const SupervisorHarvesting = () => {
    const { currentUser } = useAuth();

    const [opened, setOpened] = useState(false);
    const [inputField, setInputField] = useState({
        labour: '',
        room: '',
        emptyWeight: '',
        filledWeight: '',
        supervisor: '',
        date: '',
        status: '',
        note: '',
    });

    const [labours, setLabours] = useState<any>([]);

    const [rooms, setRooms] = useState<any>([]);

    const [users, setUsers] = useState<any>([]);

    const [filterLabours, setfilterLabours] = useState<any>([]);

    const [filterStartDate, setfilterStartDate] = useState<any>([]);

    const [filterEndDate, setfilterEndDate] = useState<any>([]);

    const [filterRoom, setfilterRoom] = useState<any>([]);

    const [filteredSupervisors, setfilterSupervisors] = useState<any>([]);

    const [harvestData, setHarvestData] = useState<any>([]);

    const handleChange = (key: string, value: string) => {
        setInputField({ ...inputField, [key]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addHarvesting(currentUser?.user?.user_id ?? '', inputField).then((res) => {
            if (res?.statusCode === 200) {
                Message(res?.message, 'success');
                getRecords(`harvesting`, setHarvestData);
                setInputField({ labour: '', room: '', emptyWeight: '', filledWeight: '', supervisor: '', date: '', status: '', note: '' });
                setOpened(false);
            } else {
                Message(res?.message, 'error');
            }
        });
    };

    const tableColumns = [
        { th: { id: 'srNo', style: { minWidth: '70px', width: '70px' } }, text: 'SR NO.' },
        { text: 'Date', th: { id: 'date', style: { minWidth: '100px', width: '100px' } }, justifyContent: 'center' },

        { text: 'Labour Name', th: { id: 'labour', style: { minWidth: '230px', width: '230px' } } },
        { text: 'Room Number', th: { id: 'room', style: { minWidth: '230px', width: '230px' } } },
        { text: 'Supervisor', th: { id: 'supervisor', style: { minWidth: '230px', width: '230px' } } },
        { text: 'Empty Weight', th: { id: 'emptyWeight', style: { minWidth: '200px', width: '200px' } } },
        { text: 'Filled Weight', th: { id: 'filledWeight', style: { minWidth: '200px', width: '200px' } } },
        { text: 'Note', th: { id: 'note', style: { minWidth: '250px', width: '250px' } } },
        { text: 'Status', th: { id: 'status', style: { minWidth: '100px', width: '100px' } } },
        { text: 'Action', th: { id: 'action', style: { minWidth: '100px', width: '100px' } }, justifyContent: 'center' },
    ];

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getRecords(`labours`, setLabours);
            getRecords(`rooms`, setRooms);
            // getRecords(`users`, setUsers);
            getRecords(`harvesting?supervisor=${currentUser?.user?.user_id}`, setHarvestData);
        }
        return () => {
            mounted = false;
        };
    }, []);

    let searchQuery = useMemo(() => {
        getRecords(`harvesting?supervisor=${currentUser?.user?.user_id}&start_date=${filterStartDate}&end_date=${filterEndDate}&labour=${filterLabours}&room=${filterRoom}`, setHarvestData);
        return `harvesting?supervisor=${currentUser?.user?.user_id}&start_date=${filterStartDate}&end_date=${filterEndDate}&labour=${filterLabours}&supervisor=${currentUser?.user?.user_id}&room=${filterRoom}`;
    }, [filterLabours, filterRoom, filteredSupervisors, filterStartDate, filterEndDate]);
    return (
        <div className="p-0">
            <div className="flex justify-between items-center mb-4">
                <Title order={3}>Harvesting Records</Title>
                <Button onClick={() => setOpened(true)} color="green" leftSection={<FontAwesomeIcon icon={faPlus} />}>
                    Add Harvesting
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <CustomTable
                    data={harvestData}
                    setData={setHarvestData}
                    isSearchingRequired={false}
                    isSortingRequired={false}
                    isPaginationRequired={false}
                    tableHeadData={tableColumns}
                    tableBody={() =>
                        harvestData?.data?.map((obj: any, index: number) => (
                            <tr key={obj.id} className="border-b hover:bg-gray-50 transition">
                                <td className="py-6 px-5">{index + 1}</td>
                                <td>{obj.date ?? '—'}</td>

                                <td>{obj.labour ? `${obj.labour.first_name} ${obj.labour.last_name}` : '—'}</td>

                                <td>{obj.room ? obj.room.room_number : '—'}</td>

                                <td>{obj.supervisor?.first_name ?? '—'}</td>

                                <td>{obj.empty_weight ?? '—'}</td>

                                <td>{obj.filled_weight ?? '—'}</td>

                                <td>{obj.note ?? '—'}</td>

                                <td className="px-3 py-2 text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${obj.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {obj.status?.toUpperCase() ?? '—'}
                                    </span>
                                </td>

                                <td className="px-3 py-2 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <button onClick={() => console.log('Edit', obj.id)} className="text-blue-600 hover:text-blue-800" title="Edit">
                                            <FontAwesomeIcon icon={faEdit} />{' '}
                                        </button>
                                        <button onClick={() => console.log('Delete', obj.id)} className="text-red-600 hover:text-red-800" title="Delete">
                                            <FontAwesomeIcon icon={faTrash} />{' '}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                    url={searchQuery}
                    notFoundMessage="No Harvesting Data Found."
                    notFoundImage="/assets/images/eximTrade/WorkInProgress.svg"
                    newRecordButton={
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <CustomDateInput
                                label="Select Start Date"
                                name="filterStartDate"
                                value={filterStartDate}
                                onChange={(e) => {
                                    setfilterStartDate(e?.target?.value);
                                }}
                                className="me-2 mb-5"
                            />
                            <CustomDateInput
                                label="Select End Date"
                                name="filterEndDate"
                                value={filterEndDate}
                                onChange={(e) => {
                                    setfilterEndDate(e?.target?.value);
                                }}
                                className="me-2 mb-5"
                            />
                            <CustomSelectInput
                                label="Select Room"
                                placeholder="Choose room..."
                                data={rooms?.data?.map((obj: any) => ({ label: obj?.room_number, value: obj?.id }))}
                                value={filterRoom}
                                name="filterRoom"
                                onChange={(value) => {
                                    setfilterRoom(value);
                                }}
                                className="me-2 mb-5"
                            />
                            {/* <CustomSelectInput
                                label="Select Supervisor"
                                placeholder="Choose Supervisor..."
                                searchable
                                data={users?.data?.map((obj: any) => ({ label: obj?.first_name, value: obj?.user_id }))}
                                value={filteredSupervisors}
                                onChange={(value) => {
                                    setfilterSupervisors(value);
                                }}
                                name="filteredSupervisors"
                                className="me-2 mb-5"
                            /> */}
                            <div className="flex flex-end">
                                <CustomSelectInput
                                    label="Select Labour"
                                    placeholder="Choose labour..."
                                    data={
                                        labours?.data?.map((obj: any) => ({
                                            label: `${obj?.first_name} ${obj?.last_name}`,
                                            value: obj?.id || '',
                                        })) || []
                                    }
                                    value={filterLabours}
                                    name="filterLabours"
                                    onChange={(value) => {
                                        setfilterLabours(value);
                                    }}
                                    className="me-2 mb-5"
                                />

                                <Button
                                    color="gray"
                                    className="mt-8"
                                    onClick={() => {
                                        setfilterLabours('');
                                        setfilterEndDate(''), setfilterStartDate('');
                                        setfilterRoom(''), setfilterRoom(''), setfilterSupervisors('');
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEraser} />
                                </Button>
                            </div>
                        </div>
                    }
                />
            </div>

            <Modal opened={opened} onClose={() => setOpened(false)} title="Add Harvesting Data" centered size="lg">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
                    <CustomSelectInput
                        label="Select Labour"
                        placeholder="Choose labour..."
                        data={
                            labours?.data?.map((obj: any) => ({
                                label: `${obj?.first_name} ${obj?.last_name}`,
                                value: obj?.id || '',
                            })) || []
                        }
                        value={inputField?.labour}
                        name="labour"
                        onChange={(value) => handleChange('labour', value || '')}
                    />

                    <CustomSelectInput
                        label="Select Room"
                        placeholder="Choose room..."
                        searchable
                        data={rooms?.data?.map((obj: any) => ({ label: obj?.room_name, value: obj?.id }))}
                        value={inputField?.room}
                        name="room"
                        onChange={(value) => handleChange('room', value || '')}
                    />
                    <CustomSelectInput
                        label="Select Supervisor"
                        placeholder="Choose Supervisor..."
                        searchable
                        data={users?.data?.map((obj: any) => ({ label: obj?.first_name, value: obj?.user_id }))}
                        value={inputField?.supervisor}
                        onChange={(value) => handleChange('supervisor', value || '')}
                        name="supervisor"
                    />

                    <CustomTextInput
                        label="Empty Carret Weight"
                        placeholder="Enter empty weight"
                        value={inputField?.emptyWeight}
                        onChange={(e) => handleChange('emptyWeight', e?.currentTarget?.value)}
                        name="emptyWeight"
                        autoComplete="off"
                    />

                    <CustomTextInput
                        label="Filled Carret Weight"
                        placeholder="Enter filled weight"
                        value={inputField?.filledWeight}
                        onChange={(e) => handleChange('filledWeight', e?.currentTarget?.value)}
                        name="filledWeight"
                        autoComplete="off"
                    />

                    <CustomDateInput label="Select Date" name="date" value={inputField?.date} onChange={(e) => handleChange('date', e?.currentTarget?.value)} />

                    <CustomSelectInput
                        label="Select Status"
                        data={[
                            { label: 'Active', value: 'active' },
                            { label: 'Inactive', value: 'inactive' },
                            { label: 'Submitted', value: 'submitted' },
                        ]}
                        value={inputField?.status}
                        name="status"
                        onChange={(value) => handleChange('status', value || '')}
                    />

                    <Textarea
                        label="Note / Message (optional)"
                        placeholder="Enter any notes..."
                        value={inputField.note}
                        onChange={(e) => handleChange('note', e.currentTarget.value)}
                        autosize
                        size="md"
                        minRows={3}
                    />

                    <Button type="submit" color="green" fullWidth mt="md">
                        Submit
                    </Button>
                </form>
            </Modal>
        </div>
    );
};
