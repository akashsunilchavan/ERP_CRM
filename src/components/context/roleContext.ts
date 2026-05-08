import { createContext } from 'react';
import { RoleContextValue } from '../types/OthersTypes';

const roleContext = createContext<RoleContextValue>({
    features: [],
    updateState: () => {},
});

export default roleContext;
