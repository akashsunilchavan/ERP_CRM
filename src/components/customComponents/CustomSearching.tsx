import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';

import CustomTextInput from './CustomTextInput';
import { APIResponse, CommonApiDataType, QueryParamContextValue } from '../types/OthersTypes';
import queryParamContext from '../context/queryParamContext';
import { setupAxios } from '../auth/AuthHelpers';
import { getFilterLengthData } from '../CommonFunction';
import { api } from '@/app/apiMiddleware/ApiMiddleWare';

const CustomSearching = (props: { data: any; url: any; setData: Function | undefined }) => {
    let { setData, data, url } = props;
    const [value, setValue] = useState('');

    let queryParamState: QueryParamContextValue = useContext(queryParamContext);
    const getData = () => {
        const { token } = setupAxios();
        const { filterDataLength } = getFilterLengthData(props?.url ?? '');
        let otherQuery = url.includes('?');
        queryParamState.updateState(value, data?.queryData?.sort ?? null, data?.queryData?.sortBy ?? null);
        api.get(`/${url}${otherQuery ? `&` : '?'}page=1&size=${data?.queryData?.take ?? filterDataLength ?? 10}&sort=${data?.queryData?.sort ?? null}&sortBy=${''}&search=${value}`, token, false).then(
            (res: APIResponse) => {
                if (res.statusCode === 200) {
                    setData &&
                        setData((prev: CommonApiDataType) => ({
                            ...prev,
                            data: res?.data?.content ?? [],
                            queryData: {
                                page: res?.data?.pageNumber + 1,
                                sort: queryParamState?.sort,
                                sortBy: queryParamState?.sortBy,
                                search: value,
                                take: res?.data?.size ?? 0,
                                total: res?.data?.totalElements ?? 0,
                            },
                        }));
                    let storageData: any = sessionStorage.getItem('filterLength');
                    const pattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]/g;
                    let updatedStorageData: any = {};
                    let key = url.replaceAll(pattern, '');
                    if (storageData) {
                        storageData = JSON.parse(storageData);
                        updatedStorageData = { ...storageData, [key]: res.data.take };
                    } else {
                        updatedStorageData[key] = res.data.take;
                    }
                    sessionStorage.setItem('filterLength', JSON.stringify(updatedStorageData));
                } else {
                    setData &&
                        setData((prev: CommonApiDataType) => ({
                            ...prev,
                            error: res.message,
                            data: res?.data?.content ?? [],
                            queryData: {
                                page: 1,
                                sort: queryParamState?.sort,
                                sortBy: queryParamState?.sortBy,
                                search: value,
                                take: filterDataLength ?? 10,
                                total: res?.data?.totalElements ?? 0,
                            },
                        }));
                }
            },
        );
    };

    return (
        // <div className='d-flex flex-row'>
        //   <CustomTextInput
        //     value={value}
        //     onChange={(event) => setValue(event.currentTarget.value)}
        //     placeholder='Search here...'
        //     onBlur={() => {
        //       if (!value) getData();
        //     }}
        //     my={4}
        //   />
        //   <Button
        //     name='viewDetails'
        //     className='btn btn-icon btn-secondary btn-sm mt-1'
        //     onClick={() => getData()}
        //   >
        //     <i className='fa-solid fa-magnifying-glass'></i>
        //   </Button>
        // </div>

        <CustomTextInput
            rightSection={<FontAwesomeIcon icon={faSearch} className="fs-1 position-absolute" style={{ color: '#828282', cursor: 'pointer' }} onClick={() => getData()} />}
            value={value}
            className=""
            placeholder="Search...."
            onChange={(event) => {
                setValue(event.currentTarget.value);
            }}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    getData();
                }
            }}
            onBlur={() => {
                if (!value) getData();
            }}
        />
    );
};

export default CustomSearching;
