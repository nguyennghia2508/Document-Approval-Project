import React, { useState } from 'react';
import './style.scss'
import { Input } from 'antd';
import { Controller } from 'react-hook-form';


const InputText = ({
  placeholder,

  label,
  required,
  disabled,
  type,
  name,
  id,
  control,
  defaultValue,
  handleOnChange,
  value,
}) => {

  const handleChange = (e, field) => {
    field.onChange(e.target.value)
    handleOnChange(e.target.value)
  };

  return (
    <div className="text-input-container"> {/* Wrapper container */}
      <label className="bold-label">{label} {required && <span style={{ color: 'red' }}>*</span>}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          return (
            <Input
              placeholder={placeholder}
              type={type}
              id={id}
              onChange={(e) => handleChange(e, field)}
              value={value}
              disabled={disabled}
            />
          )
        }}
      >
      </Controller>
    </div>
  );
};


export default InputText