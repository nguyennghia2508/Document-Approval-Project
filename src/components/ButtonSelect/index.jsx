import React, { useEffect, useState } from 'react';
import { Select, Button, Input } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import './style.scss'
import InputSelection from '../InputSelection';

const { Option } = Select;

const ButtonSelect = ({
    labelName,
    data,
    id,
    name,
    control,
    setValue,
}) => {

    const userData = data.map((value, index) => ({
        value: value.Id,
        label: (
            <div className='filter-option' key={index}>
                <span>{value.Username}</span>
                <span>{value.Email}</span>
            </div>
        ),
        name: value.Username,
    }));
    

    const [editLabelIndex, setEditLabelIndex] = useState(null);
    const [inputSelects, setInputSelects] = useState([]);

    const handleAddInputSelect = () => {
        let maxLabelNumber = 0;
        inputSelects.forEach(inputSelect => {
            const labelNumber = parseInt(inputSelect.label.split(' ')[1]);
            if (!isNaN(labelNumber) && labelNumber > maxLabelNumber) {
                maxLabelNumber = labelNumber;
            }
        });

        const newLabel = `${labelName} ${maxLabelNumber + 1}`;

        setInputSelects(prevInputSelects => {
            const newId = prevInputSelects.length;
            return [...prevInputSelects, { id: newId, userName: undefined, label: newLabel, selectedOption: undefined }];
        });
    };


    const handleDeleteInputSelect = id => {
        setInputSelects(prevInputSelects => {
            const filteredInputSelects = prevInputSelects.filter(inputSelect => inputSelect.id !== id);
            return filteredInputSelects.map((inputSelect, index) => ({
                ...inputSelect,
                id: index,
            }));
        });
    };

    const handleEditLabel = id => {
        setEditLabelIndex(id);
    };

    const handleSaveLabel = (id, newLabel) => {
        console.log(newLabel)
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
                return { ...inputSelect, userName: userData[value].name, selectedOption: value };
            }
            return inputSelect;
        }));
    };

    useEffect(() => {
        setValue(name, inputSelects)
    }, [inputSelects])

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
                                <Button type="danger" icon={<SaveOutlined />} onClick={() => handleSaveLabel(inputSelect.id, inputSelect.label)}>
                                </Button>
                            ) : (
                                <Button type="danger" icon={<EditOutlined />} onClick={() => handleEditLabel(inputSelect.id)} />
                            )}
                            <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDeleteInputSelect(inputSelect.id)}>
                            </Button>
                        </div>


                        <div className='selection'>

                            <InputSelection
                                label="Document Type"
                                id={id}
                                name={name}
                                defaultValue="--Select approver--"
                                control={control}
                                value={inputSelect.selectedOption}
                                onChange={handleSelectChange}
                                indexInput={inputSelect.id}
                                options={userData}
                                multifield={true}
                            >
                            </InputSelection>

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
