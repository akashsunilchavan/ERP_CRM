import { Grid, GridCol, Group, Pagination, Text } from '@mantine/core';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import CustomSelectInput from './CustomSelectInput';
import { setupAxios } from '../auth/AuthHelpers';
import { APIResponse, CommonApiDataType, QueryParamContextValue } from '../types/OthersTypes';
import { api } from '@/app/apiMiddleware/ApiMiddleWare';
import queryParamContext from '../context/queryParamContext';
import { getFilterLengthData } from '../CommonFunction';

const CustomPagination = (props: { data: any; setData: Function | undefined; url: any }) => {
    let queryParamState: QueryParamContextValue = useContext(queryParamContext);
    let { setData, data, url } = props;
    const [activePage, setActivePage] = useState(1);
    const [filterLength, setFilterLength] = useState<string | null>('10');
    const range = useMemo(() => {
        let range = ``;
        let start = 0;
        let end = 0;
        if (activePage === Math?.ceil(Number(data?.queryData?.total ?? 0) / Number(filterLength))) {
            end = Number(data?.queryData?.total ?? 0);
            if (activePage === 1) {
                start = data?.data ? 1 : 0;
            } else {
                start = end - Number(data?.data?.length ?? 0) + 1;
            }
        } else if (activePage === 1) {
            end = Number(data?.data?.length ?? 0);
            start = data?.data ? 1 : 0;
        } else if (activePage > 1) {
            end = Number(data?.data?.length ?? 0) * activePage;
            start = end - Number(data?.data?.length ?? 0) + 1;
        }
        range = start + ' - ' + end;
        return range;
    }, [filterLength, activePage, data]);
    const getData = (pageNumber: number, filterLength: string | null) => {
        const { token } = setupAxios();
        let otherQuery = url.includes('?');

        api.get(
            `/${url}${otherQuery ? `&` : '?'}page=${pageNumber ?? null}&size=${filterLength}&sort=${data?.queryData?.sort}&sortBy=${''}${
                data?.queryData?.search ? `&search=${data?.queryData?.search}` : ''
            }`,
            token,
            false,
        ).then((res: APIResponse) => {
            if (res?.statusCode === 200) {
                setActivePage(pageNumber);
                setData &&
                    setData((prev: CommonApiDataType) => ({
                        ...prev,
                        error: null,
                        data: res?.data?.content ?? res?.data,
                        queryData: {
                            page: res?.data?.pageNumber + 1,
                            sort: queryParamState?.sort,
                            sortBy: queryParamState?.sortBy,
                            search: queryParamState?.search,
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
                    updatedStorageData = { ...storageData, [key]: filterLength };
                } else {
                    updatedStorageData[key] = filterLength;
                }
                sessionStorage.setItem('filterLength', JSON.stringify(updatedStorageData));
            } else {
                setData &&
                    setData((prev: CommonApiDataType) => ({
                        ...prev,
                        error: res?.message,
                        data: res?.data?.result,
                        queryData: {
                            page: res?.data?.number + 1,
                            sort: queryParamState?.sort,
                            sortBy: queryParamState?.sortBy,
                            search: queryParamState?.search,
                            take: res?.data?.size ?? 0,
                            total: res?.data?.totalElements ?? 0,
                        },
                    }));
            }
        });
    };
    useEffect(() => {
        const { filterDataLength } = getFilterLengthData(url);
        setActivePage(Number(data?.queryData?.page ?? 1));
        setFilterLength((data?.queryData?.take ?? filterDataLength ?? 10)?.toString());
    }, [data]);
    return (
        <>
            <Grid gutter="sm" align="center" justify="space-between">
                <GridCol span={{ base: 12, md: 6 }}>
                    <Text size="sm" c="dimmed">
                        Showing {range} of {Math?.ceil(Number(data?.queryData?.total ?? 0))} items
                    </Text>
                </GridCol>

                {data?.data && (
                    <GridCol span={{ base: 12, md: 6 }}>
                        <Group justify="flex-end" gap="sm" wrap="nowrap">
                            <CustomSelectInput
                                value={filterLength}
                                onChange={(value) => {
                                    setFilterLength(value);
                                    getData(1, value);
                                }}
                                radius="md"
                                data={[
                                    { value: '5', label: '5 per page' },
                                    { value: '10', label: '10 per page' },
                                    { value: '25', label: '25 per page' },
                                    { value: '50', label: '50 per page' },
                                    { value: '100', label: '100 per page' },
                                ]}
                                w={120}
                                size="sm"
                            />

                            <Pagination
                                value={activePage}
                                size="sm"
                                siblings={1}
                                boundaries={1}
                                withEdges
                                onChange={(page) => {
                                    getData(page, filterLength);
                                }}
                                total={Math?.ceil(Number(data?.queryData?.total ?? 0) / Number(filterLength))}
                                // styles={(theme) => ({
                                //     control: {
                                //         '&[data-active]': {
                                //             backgroundColor: theme?.colors?.blue[6],
                                //             color: theme?.white,
                                //             '&:hover': {
                                //                 backgroundColor: theme?.colors?.blue[7],
                                //             },
                                //         },
                                //     },
                                // })}
                            />
                        </Group>
                    </GridCol>
                )}
            </Grid>
        </>
    );
};

export default CustomPagination;
