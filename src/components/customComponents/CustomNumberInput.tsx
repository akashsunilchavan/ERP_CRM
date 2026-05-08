import { TextInput, TextInputProps } from '@mantine/core';
import React from 'react';

const CustomNumberInput = (props: TextInputProps) => {
    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        const input = event?.currentTarget;
        input.value = input?.value?.replace(/[^0-9]/g, '');
    };

    return (
        <>
            <TextInput {...props} withAsterisk={props.withAsterisk ?? true} radius={10} size={props.size ?? 'md'} onInput={handleInput} />
        </>
    );
};

export default CustomNumberInput;
