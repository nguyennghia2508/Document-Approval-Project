import React, { useState } from 'react';
import { Select, Button, Input } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import './style.scss'

const { Option } = Select;

const ButtonSelect = () => {
    const [inputSelects, setInputSelects] = useState([]);
    const [editLabelIndex, setEditLabelIndex] = useState(null);

    const handleAddInputSelect = () => {
        setInputSelects([...inputSelects, { id: inputSelects.length, label: 'Label', selectedOption: 'option1' }]);
    };

    const handleDeleteInputSelect = id => {
        setInputSelects(inputSelects.filter(inputSelect => inputSelect.id !== id));
    };

    const handleEditLabel = id => {
        setEditLabelIndex(id);
    };

    const handleSaveLabel = (id, newLabel) => {
        setInputSelects(inputSelects.map(inputSelect => {
            if (inputSelect.id === id) {
                return { ...inputSelect, label: newLabel };
            }
            return inputSelect;
        }));
        setEditLabelIndex(null);
    };

    const handleSelectChange = (id, value) => {
        setInputSelects(inputSelects.map(inputSelect => {
            if (inputSelect.id === id) {
                return { ...inputSelect, selectedOption: value };
            }
            return inputSelect;
        }));
    };

    return (
        <>
            <div className='approve-sign' >
                {inputSelects.map(inputSelect => (
                    <div key={inputSelect.id} className='btn-selection-container'>

                        <div className='label'>
                            {editLabelIndex === inputSelect.id ? (
                                <Input
                                    defaultValue={inputSelect.label}
                                    onPressEnter={(e) => handleSaveLabel(inputSelect.id, e.target.value)}
                                    onBlur={(e) => handleSaveLabel(inputSelect.id, e.target.value)}
                                />
                            ) : (
                                <span style={{ marginRight: '8px' }}>{inputSelect.label} </span>
                            )}

                            {editLabelIndex === inputSelect.id ? (
                                <Button type="danger" icon={<SaveOutlined />} onClick={() => handleSaveLabel(inputSelect.id)}>
                                </Button>
                            ) : (
                                <Button type="danger" icon={<EditOutlined />} onClick={() => handleEditLabel(inputSelect.id)} />
                            )}
                            <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDeleteInputSelect(inputSelect.id)}>
                            </Button>
                        </div>


                        <div className='selection'>

                            <Select
                                value={inputSelect.selectedOption}
                                onChange={(value) => handleSelectChange(inputSelect.id, value)}
                            >
                                <Option value="option1">Option 1</Option>
                                <Option value="option2">Option 2</Option>
                                <Option value="option3">Option 3</Option>
                            </Select>

                        </div>


                    </div>
                ))}
                <Button className='btn-add' type="primary" icon={<PlusOutlined />} onClick={handleAddInputSelect}>
                    Add
                </Button>
            </div>

        </>
    );
};

export default ButtonSelect;
