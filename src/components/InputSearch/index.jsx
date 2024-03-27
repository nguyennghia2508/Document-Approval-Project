
import { SearchOutlined } from '@ant-design/icons';
import './style.scss'
import React, { useState } from 'react';
import { Input } from 'antd';
import { Controller } from 'react-hook-form';

const InputSearch = ({
  label,
  disabled,
  type,
  name,
  id,
  control,
  defaultValue }) => {

  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value)
  };
  return (
    <div className="search-input-container">
      <label className="bold-label">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          return (
            <Input
              type={type}
              id={id}
              onChange={(e) => handleChange(e)}
              value={value}
              disabled={disabled}
              suffix={<SearchOutlined />}
              {...field}
            />
          )
        }}
      >

      </Controller>


    </div>
  );
};

export default InputSearch;