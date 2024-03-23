import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './style.scss'

const InputSearch = ({ label, placeholder }) => {
  return (
    <div className="search-input-container">
      <label className="bold-label">{label}</label>
      <Input
        placeholder={placeholder}
        suffix={<SearchOutlined />}
      />
    </div>
  );
};

export default InputSearch;