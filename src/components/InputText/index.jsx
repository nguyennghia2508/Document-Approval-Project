import React, { useState } from 'react';
import './style.scss'
import { Input } from 'antd';
import { Controller } from 'react-hook-form';


const InputText = ({ label, onChange, required, disabled, type, name, id, field, control }) => {

  const [value, setValue] = useState('');

  const handleChange = (e) => {
    console.log(e)
  };

  return (
    <div className="text-input-container"> {/* Wrapper container */}
      <label className="bold-label">{label} {required && <span style={{ color: 'red' }}>*</span>}</label>
      <Controller
        id="applicant"
        name='applicant'
        control={control}
        render={({ field }) => {
          <Input type={type} value={value} onChange={handleChange(field)} disabled={disabled} />

        }}
      >
      </Controller>
    </div>
  );
};


export default InputText