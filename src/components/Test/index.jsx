import React from 'react';
import { DatePicker } from 'antd';
import './style.scss'

const { RangePicker } = DatePicker;

const Test = () => (
    <div className="custom-range-picker">
        <RangePicker />
    </div>
);

export default Test;