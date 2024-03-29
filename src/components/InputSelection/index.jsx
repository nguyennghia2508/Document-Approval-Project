import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import './style.scss'
import { Controller } from 'react-hook-form';
const InputSelection = ({
    label,
    value,
    name,
    id,
    onChange,
    options,
    required,
    control,
    defaultValue,
    multifield = false,
    indexInput,
}) => {

    const handleSelected = (e, field) => {
        console.log(e)
        if(multifield)
        {
            onChange(indexInput,e);
        }
        else
        {
            field.onChange(e)
            onChange(e);
        }
    };

    return (
        <div className="antd-select-container">
            <label className="bold-label">{label} {required && <span style={{ color: 'red' }}>*</span>}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    return (
                        <Select
                            id={id}
                            value={value}
                            defaultValue={defaultValue}
                            onChange={e => handleSelected(e, field)}
                        >
                            {options.map(option => (
                                <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
                            ))}
                        </Select>
                    )
                }}
            >
            </Controller>
        </div>
    );
};
export default InputSelection
