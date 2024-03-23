import React from 'react';
import { Select } from 'antd';
import './style.scss'
const InputSelection = ({ label, value, onChange, options, required }) => {
    return (
        <div className="antd-select-container">
            <label className="bold-label">{label} {required && <span style={{ color: 'red' }}>*</span>}</label>
            <Select value={value} onChange={onChange}>
                {options.map(option => (
                    <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
                ))}
            </Select>
        </div>
    );
};
export default InputSelection
