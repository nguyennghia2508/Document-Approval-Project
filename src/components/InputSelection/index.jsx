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
}) => {

    const [inputValue, setInputValue] = useState(null)

    const handleSelected = (e, field) => {
        field.onChange(e)
        onChange(e);
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
                            value={value}
                            onChange={(e) => handleSelected(e, field)}
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
