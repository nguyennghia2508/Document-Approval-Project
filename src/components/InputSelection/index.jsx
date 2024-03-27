import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Select } from 'antd';
import './style.scss'
const InputSelection = ({ label, value, onChange, options, required, control, name }) => {

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
                                <Select.Option key={option.value} value={option.value}> {option.label}</Select.Option>
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
