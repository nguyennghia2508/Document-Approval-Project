import React from 'react';
import './style.scss'
import { Input } from 'antd';


const InputText = ({ label, value, onChange, required, disabled }) => {
  return (
    <div className="text-input-container"> {/* Wrapper container */}
      <label className="bold-label">{label} {required && <span style={{ color: 'red' }}>*</span>}</label>
      <Input type="text" value={value} onChange={onChange} disabled={disabled} />
    </div>
  );
};


export default InputText