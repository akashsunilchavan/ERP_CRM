import { createContext } from 'react';
import { QueryParamContextValue } from '../types/OthersTypes';

const queryParamContext = createContext<QueryParamContextValue>({
    sort: '',
    search: '',
    sortBy: '',
    updateState: () => {},
});

export default queryParamContext;
