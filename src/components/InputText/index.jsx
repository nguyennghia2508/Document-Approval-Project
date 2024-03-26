import React, { useState } from 'react';
import './style.scss'
import { Input } from 'antd';
import { Controller } from 'react-hook-form';


const InputText = ({ 
  label,
  required, 
  disabled, 
  type, 
  name, 
  id, 
  control 
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
        render={({ field }) => {
          return (
            <Input 
            type={type}
            id={id}
            onChange={(e) => handleChange(e)} 
            value={value}
            disabled={disabled} 
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