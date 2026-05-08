import { Select, SelectProps } from '@mantine/core';
import React, { useMemo, useRef, useState } from 'react';

const CustomSelectInput = (props: SelectProps) => {
    let [searchValue, setSearchValue] = useState('');
    const selectRef = useRef<HTMLInputElement>(null);
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Tab' && selectRef.current) {
            const focusedOption = selectRef.current.getAttribute('aria-activedescendant');
            props?.onChange &&
                props.onChange(document.getElementById(focusedOption ?? '')?.getAttribute('value') ?? '', {
                    label: document.getElementById(focusedOption ?? '')?.innerText ?? '',
                    value: document.getElementById(focusedOption ?? '')?.getAttribute('value') ?? '',
                });
        }
    };
    useMemo(() => {
        if (props.value === '') {
            setSearchValue('');
        }
    }, [props.value]);

    return (
        <>
            <Select
                {...props}
                size={props?.size ?? 'md'}
                placeholder={props?.placeholder ?? 'Select...'}
                ref={selectRef}
                searchable
                withCheckIcon={false}
                allowDeselect={false}
                withAsterisk={props?.withAsterisk ?? true}
                styles={{ section: { pointerEvents: 'none' } }}
                nothingFoundMessage={props?.nothingFoundMessage ?? 'No Options'}
                onSearchChange={(value: any) => setSearchValue(value)}
                searchValue={searchValue}
                onKeyDown={handleKeyDown}
                radius={10}
            />
        </>
    );
};
export default CustomSelectInput;
