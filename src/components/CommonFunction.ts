import { clearInputError } from '@/app/helpers/AssetHelpers';
import { APIResponse, CommonApiDataType, InputErrorType, QueryParams, SubmitAPIStatusType } from './types/OthersTypes';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { AlertProps } from './data/AlertDefault';
import { DELETE_MESSAGE, UPDATE_MESSAGE } from './utils/Constants';
import { setupAxios } from './auth/AuthHelpers';
import { api } from '@/app/apiMiddleware/ApiMiddleWare';

export const currencyList = [
    {
        label: 'AED',
        value: 'AED',
        symbol: 'د.إ',
    },
    { label: 'USD', value: 'USD', symbol: '$' },

    { label: 'INR', value: 'INR', symbol: '₹' },
];

//to handle text,number and check input field value change
export const handleInputChange = (event: React.SyntheticEvent, setFormField: Function, InputError: InputErrorType, setInputError: Function) => {
    let target = event.target as HTMLInputElement;
    clearInputError(target.name, InputError, setInputError);
    setFormField((prev: any) => ({
        ...prev,
        [target.name]: target.type === 'checkbox' ? target.checked : target?.value?.length === 1 ? target.value?.trim() : target?.value,
    }));
};

//to handle select, radio input field value change
export const handleOtherInputChange = (value: string | null | number | '' | string[] | File, inputName: string, setFormField: Function, InputError: InputErrorType, setInputError: Function) => {
    clearInputError(inputName, InputError, setInputError);
    setFormField((prev: any) => ({
        ...prev,
        [inputName]: value,
    }));
};

//to delete record from given master
export const deleteRecord = (
    url: string,
    setData: Function,
    setFormField: Function,
    // setEditId: Function,
    setInputError: Function,
    formFieldInitialState: any,
    setShowForm?: Function,
    otherUrl?: string,
) => {
    cancelSubmit(setFormField, setInputError, formFieldInitialState, setShowForm);
    const { token } = setupAxios();
    Swal.fire({ ...AlertProps, icon: 'warning', title: DELETE_MESSAGE }).then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
            api.delete(`/${url}`, token, true).then((res: APIResponse) => {
                if (res.statusCode === 200) {
                    getRecords(otherUrl ? otherUrl : url.split('/')[0], setData);
                }
            });
        }
    });
};
//to get all records from given master
export const getRecords = (url: string, setData: Function, searchTerm: string = '') => {
    let otherQuery = url?.includes('?');
    const { filterDataLength } = getFilterLengthData(otherQuery ? url?.split('?')[0] : url);
    let queryData: QueryParams | null = {
        page: 1,
        sort: null,
        sortBy: '',
        take: filterDataLength?.toString    () ?? '10',
        total: '0',
        search: searchTerm, // Use the passed search term
    };

    setData((prev: CommonApiDataType) => {
        queryData = prev?.queryData;
        return { ...prev, loading: true };
    });

    const { token } = setupAxios();

    api.get(
        `/${url}${otherQuery ? `&` : '?'}size=${queryData?.take ?? '10'}&page=1&sort=${queryData?.sort ?? null}&${
            queryData?.sortBy ? `&sortBy=${queryData?.sortBy}` : ''
        }${queryData?.search ? `&search=${queryData?.search}` : ''}`,
        token,
        false,
    ).then((res: APIResponse) => {
        if (res?.statusCode === 200) {
            sessionStorage.setItem('currentQueryParam', JSON.stringify({ sort: '', search: '', sortBy: '' }));
            setData((prev: CommonApiDataType) => ({
                ...prev,
                loading: false,
                data: res?.data?.content ?? res?.data,
                error: null,
                queryData: {
                    page: res?.data?.pageNumber + 1,
                    sort: queryData?.sortBy ?? null,
                    sortBy: '',
                    take: res?.data?.size ?? 0,
                    search: queryData?.search,
                    total: res?.data?.totalElements ?? 0,
                },
            }));
        } else {
            sessionStorage.setItem('currentQueryParam', JSON.stringify({ sort: '', search: '', sortBy: '' }));
            setData((prev: CommonApiDataType) => ({
                ...prev,
                loading: false,
                error: res?.message,
                data: res?.data?.result,
                queryData: {
                    page: 1,
                    sort: queryData?.sortBy ?? null,
                    sortBy: queryData?.sort ?? null,
                    take: queryData?.take ?? 10,
                    search: queryData?.search,
                    total: 0,
                },
            }));
        }
    });
};
// //to add/update record for a given master
// export const handleSubmit = (
//     url: string,
//     formField: any,
//     formFieldInitialState: any,
//     setData: Function,
//     setEditId: Function,
//     setFormField: Function,
//     editId: string | null,
//     setInputError: Function,
//     validateForm: Function,
//     setSubmitAPIStatus: Function,
//     addRecord: Function,
//     updateRecord: Function,
//     setShowForm?: Function,
// ) => {
//     let { cnt, error } = validateForm(formField);
//     setInputError(error);
//     if (cnt === 0) {
//         if (editId === null) {
//             setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({
//                 ...prev,
//                 loading: true,
//             }));
//             addRecord(formField).then((res: APIResponse) => {
//                 if (res.statusCode === 200) {
//                     if (url !== '') {
//                         getRecords(url, setData);
//                     }
//                     cancelSubmit(setFormField, setEditId, setInputError, formFieldInitialState, setShowForm);
//                 }
//                 setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({
//                     ...prev,
//                     loading: false,
//                 }));
//             });
//         } else {
//             Swal.fire({ ...AlertProps, icon: 'warning', title: UPDATE_MESSAGE }).then((result: SweetAlertResult) => {
//                 if (result.isConfirmed) {
//                     setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({
//                         ...prev,
//                         loading: true,
//                     }));
//                     updateRecord(formField, editId).then((res: APIResponse) => {
//                         if (res.statusCode === 200) {
//                             if (url !== '') {
//                                 getRecords(url, setData);
//                             }
//                             cancelSubmit(setFormField, setEditId, setInputError, formFieldInitialState, setShowForm);
//                         }
//                         setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({
//                             ...prev,
//                             loading: false,
//                         }));
//                     });
//                 }
//             });
//         }
//     }
// };
// //to reset form and its error message
// export const cancelSubmit = (setFormField: Function, setEditId: Function, setInputError: Function, formFieldInitialState: any, setShowForm?: Function) => {
//     setEditId(null);
//     if (setShowForm) setShowForm(false);
//     setFormField(formFieldInitialState);
//     setInputError({});
// };

export const handleSubmit = (
    url: string,
    formField: any,
    formFieldInitialState: any,
    setData: Function,
    setFormField: Function,
    setInputError: Function,
    validateForm: Function,
    setSubmitAPIStatus: Function,
    addRecord: Function,
    setShowForm?: Function,
) => {
    let { cnt, error } = validateForm(formField);
    setInputError(error);

    if (cnt === 0) {
        setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({
            ...prev,
            loading: true,
        }));

        addRecord(formField)?.then((res: APIResponse) => {
            if (res.statusCode === 200) {
                if (url !== '') {
                    getRecords(url, setData);
                }
                cancelSubmit(setFormField, setInputError, formFieldInitialState, setShowForm);
            }
            setSubmitAPIStatus((prev: SubmitAPIStatusType) => ({
                ...prev,
                loading: false,
            }));
        });
    }
};

// To reset form and its error message
export const cancelSubmit = (setFormField: Function, setInputError: Function, formFieldInitialState: any, setShowForm?: Function) => {
    if (setShowForm) setShowForm(false);
    setFormField(formFieldInitialState);
    setInputError({});
};

export const getFilterLengthData = (url: string) => {
    let storageData: any = sessionStorage.getItem('filterLength');
    const pattern = /[!@#$%^&*()_{}\[\]:;<>,.?~\\/\-=|]/g;
    let filterDataLength: number | null = null;
    let key = url?.replace(pattern, '');
    if (storageData) {
        storageData = JSON.parse(storageData);
        filterDataLength = isNaN(Number(storageData[key])) ? 10 : Number(storageData[key]);
    } else {
        filterDataLength = 10;
    }
    return { filterDataLength };
};
