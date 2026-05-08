import React, { useEffect, useState } from 'react';
import QueryParamContext from './queryParamContext';

const QueryParamState = (props: { children: any }) => {
    const [search, setSearch] = useState<string>('');
    const [sort, setSort] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('');
    const updateState = (search: string, sort: string, sortBy: string) => {
        setSearch(search);
        setSort(sort);
        setSortBy(sortBy);
    };

    useEffect(() => {
        const firstQueryParam: string | null = sessionStorage.getItem('currentQueryParam');
        if (firstQueryParam) {
            const QueryParam: {
                search: string;
                sort: string;
                sortBy: string;
            } = JSON.parse(firstQueryParam);
            if (QueryParam !== null) {
                setSearch(QueryParam.search);
                setSort(QueryParam.sort);
                setSortBy(QueryParam.sortBy);
            }
        }
    }, []);

    return (
        <>
            <QueryParamContext.Provider value={{ search, sort, sortBy, updateState }}>{props.children}</QueryParamContext.Provider>
        </>
    );
};

export default QueryParamState;
