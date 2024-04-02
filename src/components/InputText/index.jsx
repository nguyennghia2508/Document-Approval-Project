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
  defaultValue
}) => {

  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value)
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
              onChange={(e) => handleChange(e)}
              value={value}
              disabled={disabled}
              autoSize={{ minRows: 2, maxRows: 6 }}
              {...field}
            />
          )
        }}
      >
      </Controller>
    </div>
  );
};


export default InputText