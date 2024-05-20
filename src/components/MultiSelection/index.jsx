import React, { useState } from 'react';
import { Select } from 'antd';
import { Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const MultiSelection = ({
    control,
    label,
    required,
    options,
    name,
    onChange,
    setValue
}) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleChange = (e, field) => {
        setSelectedItems(e);
        onChange(e)
        field.onChange(e)
    };

    return (
        <div>
            <label className="bold-label">{label} {required && <span style={{ color: 'red' }}>*</span>}</label>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Select

                        mode="multiple"
                        placeholder="Inserted are removed"
                        value={selectedItems}

                        onChange={(e) => handleChange(e, field)}
                        style={{ width: '100%' }}
                    >
                        {options.map(option => (
                            <Select.Option key={uuidv4()} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                )}
            />
        </div>
    );
};

export default MultiSelection;
