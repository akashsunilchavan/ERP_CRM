import React, { useEffect, useState } from 'react';
import { RoleContextValue } from '../types/OthersTypes';
import RoleContext from './roleContext';
const RoleState = (props: { children: any }) => {
    const [features, setFeatures] = useState<RoleContextValue['features']>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const updateState = (features: RoleContextValue['features']) => {
        setFeatures(features);
    };

    useEffect(() => {
        const firstRole: string | null = localStorage.getItem('currentUserRole');
        const handleStorageChange = () => {
            const stored = localStorage?.getItem('currentUserRole');
            if (stored) {
                const parsed = JSON.parse(stored);
                setFeatures(parsed.features);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        if (firstRole) {
            const Role: { features: RoleContextValue['features'] } = JSON.parse(firstRole);
            if (Role !== null) {
                setFeatures(Role.features);
            }
        }

        setIsLoaded(true);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {}, []);

    if (!isLoaded) return null; // or a loader

    return <RoleContext.Provider value={{ features, updateState }}>{props.children}</RoleContext.Provider>;
};

export default RoleState;
