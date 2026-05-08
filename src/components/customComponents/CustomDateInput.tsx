import { TextInput, TextInputProps } from '@mantine/core';
import React from 'react';

const CustomDateInput = (props: TextInputProps) => {
    return (
        <>
            <TextInput {...props} type="date" withAsterisk={props.withAsterisk ?? true} radius={10} size={props.size ?? 'md'} />
        </>
    );
};

export default CustomDateInput;
