'use client';
import { TableHTMLAttributes, useContext, useState } from 'react';
import { APIResponse, CommonApiDataType, QueryParamContextValue, TableHeaderDataType } from '../types/OthersTypes';
import queryParamContext from '../context/queryParamContext';
import { getFilterLengthData } from '../CommonFunction';
import { setupAxios } from '../auth/AuthHelpers';
import QueryParamState from '../context/QueryParamState';
import { Flex, Grid, GridCol } from '@mantine/core';
import CustomSearching from './CustomSearching';
import { api } from '@/app/apiMiddleware/ApiMiddleWare';
import { changeTextCamal } from '@/app/helpers/AssetHelpers';
import LoadingSkeleton from './LoadingSkeleton';
import CustomPagination from './CustomPagination';

const CustomTable = (props: {
    data?: any;
    setData?: Function;
    tableHeadData: TableHeaderDataType[];
    tableBody: Function;
    tableAttributes?: TableHTMLAttributes<HTMLTableElement>;
    url?: string;
    tableLabel?: string;
    newRecordButton?: any;
    isSearchingRequired?: boolean;
    isSortingRequired?: boolean;
    isPaginationRequired?: boolean;
    defaultSorting?: string;
    notFoundMessage?: string;
    notFoundImage?: string;
}) => {
    let queryParamState: QueryParamContextValue = useContext(queryParamContext);
    const [isActive, setIsActive] = useState<string | undefined>(props?.defaultSorting ?? '');
    const [isActiveSortType, setIsActiveSortType] = useState<string | null>(props?.defaultSorting ? 'DESC' : null);
    const sortTableData = (sortBy: string | undefined, isSortable: boolean | undefined) => {
        if (isSortable === undefined || isSortable) {
            let sort = 'DESC';
            if (sortBy === isActive) {
                sort = !isActiveSortType ? 'DESC' : isActiveSortType === 'ASC' ? 'DESC' : 'ASC';
            }
            setIsActive(sortBy);
            setIsActiveSortType(sort);
            const { token } = setupAxios();
            let otherQuery = props?.url?.includes('?');
            const { filterDataLength } = getFilterLengthData(props?.url ?? '');
            sessionStorage.setItem(
                'currentQueryParam',
                JSON.stringify({
                    search: '',
                    sort: sort,
                    sortBy: sortBy ?? '',
                }),
            );
            queryParamState.updateState(queryParamState.search, sort, sortBy ?? '');
            api.get(
                `/${props.url}${otherQuery ? `&` : '?'}sort=${sort ?? null}&sortBy=${sortBy ?? null}&take=${props.data?.queryData?.take ?? filterDataLength ?? 10}&pageNumber=1${
                    props.data?.queryData?.search ? `&search=${props.data?.queryData?.search}` : ''
                }`,
                token,
                false,
            ).then((res: APIResponse) => {
                if (res.statusCode === 200) {
                    props?.setData &&
                        props?.setData((prev: CommonApiDataType) => ({
                            ...prev,
                            data: res.data.result,
                            queryData: {
                                pageNumber: res?.data?.pageNumber + 1,
                                sort: sort,
                                sortBy: sortBy,
                                search: queryParamState?.search,
                                take: res?.data?.size ?? 0,
                                total: res?.data?.totalElements ?? 0,
                            },
                        }));
                } else {
                    props?.setData &&
                        props?.setData((prev: CommonApiDataType) => ({
                            ...prev,
                            error: res.message,
                            data: res.data?.result,
                            queryData: {
                                pageNumber: res?.data?.pageNumber + 1,
                                sort: sort,
                                sortBy: sortBy,
                                search: queryParamState?.search,
                                take: res?.data?.size ?? 0,
                                total: res?.data?.totalElements ?? 0,
                            },
                        }));
                }
            });
        }
    };

    return (
        <>
            <QueryParamState>
                <div>
                    {(props?.tableLabel || (props?.newRecordButton !== null && props?.newRecordButton !== undefined) || props?.isSearchingRequired !== false) && (
                        <div className="w-full">
                            <Grid className="w-full" gutter={'xs'} align={'center'} justify={'space-between'}>
                                <h4 className="flex-grow" hidden={!props?.tableLabel}>
                                    {props.tableLabel}
                                </h4>
                                {props?.isSearchingRequired !== false ? (
                                    <GridCol span={{ lg: 3 }}>
                                        <CustomSearching data={props?.data} url={props?.url ?? ''} setData={props?.setData} />
                                    </GridCol>
                                ) : (
                                    ''
                                )}
                                <GridCol className="flex justify-end" span={{ lg: 'auto' }}>
                                    {props?.newRecordButton ?? ''}
                                </GridCol>
                            </Grid>
                        </div>
                    )}
                    <div className="border-b border-gray-200 mb-5">
                        <div className="overflow-x-auto">
                            <table className={`table-auto w-full mt-4 ${props?.tableAttributes?.className ?? ''}`}>
                                <thead className="bg-gray-50">
                                    <tr className="font-bold uppercase text-gray-500 text-xs">
                                        {props?.tableHeadData?.map((obj: TableHeaderDataType) => {
                                            return (
                                                <th
                                                    {...obj?.th}
                                                    key={obj?.th.id}
                                                    style={{
                                                        ...obj?.th?.style,
                                                        fontSize: '0.870rem',
                                                    }}
                                                    className={`py-3 ${props?.isSortingRequired && obj?.isSortable !== false ? 'cursor-pointer' : ''}`}
                                                    onClick={() => props?.isSortingRequired && sortTableData(obj.th.id, obj.isSortable)}
                                                >
                                                    <Flex mih={50} gap="xs" align="center" justify={obj?.justifyContent ?? 'start'} direction="row" wrap="wrap">
                                                        {typeof obj?.text === 'string' ? changeTextCamal(obj?.text) : obj?.text}
                                                        {(props?.isSortingRequired === undefined || props?.isSortingRequired) && (
                                                            <>
                                                                <i className="fas fa-arrow-up ml-1" hidden={isActive === obj?.th?.id && isActiveSortType === 'DESC' ? false : true} />
                                                                <i className="fas fa-arrow-down ml-1" hidden={isActive === obj?.th?.id && isActiveSortType === 'ASC' ? false : true} />
                                                            </>
                                                        )}
                                                    </Flex>
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700 font-semibold">
                                    {props?.data ? (
                                        props?.data?.loading ? (
                                            <tr className="">
                                                <td colSpan={props?.tableHeadData?.length} className="text-center py-4">
                                                    <LoadingSkeleton />
                                                </td>
                                            </tr>
                                        ) : props?.data?.error != null && !props?.data?.error?.includes('found') ? (
                                            <tr>
                                                <td colSpan={props?.tableHeadData?.length} className="text-center py-4">
                                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                                        <div className="font-bold">{props?.data?.error}</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : props?.data?.data?.length > 0 ? (
                                            props.tableBody()
                                        ) : (
                                            <tr>
                                                <td colSpan={props?.tableHeadData?.length} className="text-center py-8">
                                                    <div className="flex flex-col items-center justify-center gap-4">
                                                        {props?.notFoundImage && <img src={props.notFoundImage} alt="Not Found" className="w-40 h-40 object-contain" />}
                                                        <div className="text-lg text-gray-500 font-bold">{props?.notFoundMessage}</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    ) : (
                                        props.tableBody()
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {(props?.isPaginationRequired === undefined || props?.isPaginationRequired) && (
                        <div className="mb-5">
                            <CustomPagination data={props.data} setData={props.setData} url={props?.url ?? ''} />
                        </div>
                    )}
                </div>
            </QueryParamState>
        </>
    );
};

export default CustomTable;
