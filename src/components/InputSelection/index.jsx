import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import './style.scss'
import { Controller } from 'react-hook-form';
const InputSelection = ({
    disabled,
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
        if (multifield) {
            onChange(indexInput, e);
        }
        else {
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
                defaultValue={defaultValue}
                render={({ field }) => {
                    return (
                        <Select
                            id={id}
                            value={value}
                            defaultValue={defaultValue}
                            disabled={disabled}
                            onChange={(e) => handleSelected(e, field)}
                        >
                            {options.map(option => (
                                <Select.Option key={option.value} value={option.value} >{option.label} </Select.Option>
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
