import { TextInput, TextInputProps } from '@mantine/core';
import React from 'react';

const CustomTextInput = (props: TextInputProps) => {
    return (
        <>
            <TextInput {...props} minLength={props.minLength ?? 2} maxLength={props.maxLength ?? 250} withAsterisk={props.withAsterisk ?? true} radius={10} size={props.size ?? 'md'} />
        </>
    );
};

export default CustomTextInput;
