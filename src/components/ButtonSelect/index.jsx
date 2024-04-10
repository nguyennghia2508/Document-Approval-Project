import React, { useEffect, useState } from 'react';
import { Select, Button, Input } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import './style.scss'
import InputSelection from '../InputSelection';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

const ButtonSelect = ({
    labelName,
    data,
    id,
    name,
    control,
    PersonDuty,
    setValue,
    listPerson,
    DocumentApprovalId,
}) => {

    const userData = data.map((value, index) => ({
        value: value.Id,
        label: (
            <div className='filter-option' key={uuidv4()}>
                <span>{value.Username}</span>
                <span>{value.Email}</span>
            </div>
        ),
        name: value.Username,
    }));
    

    const [editLabelIndex, setEditLabelIndex] = useState(null);
    const [inputSelects, setInputSelects] = useState([]);

    useEffect(() => {
        if (data && data.length > 0 && listPerson && listPerson.length > 0) {
            const initialInputSelects = listPerson.map((person, index) => ({
                id: person.ApprovalPersonId,
                userName: person.ApprovalPersonName,
                label: `${labelName} ${index + 1}`, 
                selectedOption: userData?.find(user => user.value === person.ApprovalPersonId)?.value,
                PersonDuty:person.PersonDuty,
                DocumentApprovalId:person.DocumentApprovalId,
                Index:person.Index,
            }));
            
            setInputSelects(initialInputSelects);
        }
    }, [listPerson,data]);

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
            return [...prevInputSelects, { id: newId, userName: undefined, 
                label: newLabel, selectedOption: undefined, 
                PersonDuty: undefined,
                DocumentApprovalId: undefined,
                Index: undefined,
            }];
        });
    };


    const handleDeleteInputSelect = (indexInput) => {
        setInputSelects(prevInputSelects => {
            const filteredInputSelects = prevInputSelects.filter(inputSelect => inputSelect.Index !== indexInput);
            return filteredInputSelects.map((inputSelect, index) => ({
                ...inputSelect,
                id: index,
                Index:index+1,
            }));
        });
    };

    const handleEditLabel = (id) => {
        setEditLabelIndex(id);
    };

    const handleSaveLabel = (id,indexInput, newLabel) => {
        setInputSelects(inputSelects.map(inputSelect => {
            if (inputSelect.Index === indexInput && inputSelect.id === id) {
                return { ...inputSelect, label: newLabel };
            }
            return inputSelect;
        }));
        setEditLabelIndex(null);
    };

    const handleSelectChange = (id,indexInput, value) => {
        setInputSelects(inputSelects.map((inputSelect,index) => {
            if (inputSelect.Index === indexInput && inputSelect.id === id) {
                const updatedInputSelect = {
                    ...inputSelect,
                    userName: userData[value].name,
                    selectedOption: value,
                    PersonDuty: PersonDuty && PersonDuty === 1 ? 1 : 2,
                    Index:index+1,
                };
    
                if (DocumentApprovalId) {
                    updatedInputSelect.DocumentApprovalId = DocumentApprovalId;
                }
    
                return updatedInputSelect;
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
                    <div key={uuidv4()} className='btn-selection-container'>

                        <div className='label'>
                            {editLabelIndex === inputSelect.Index ? (
                                <Input
                                    defaultValue={inputSelect.label}
                                    onPressEnter={(e) => handleSaveLabel(inputSelect.id,inputSelect.Index, e.target.value)}
                                    onBlur={(e) => handleSaveLabel(inputSelect.id,inputSelect.Index, e.target.value)}
                                />
                            ) : (
                                <span style={{ marginRight: '8px' }}>{inputSelect.label} </span>
                            )}

                            {editLabelIndex === inputSelect.Index ? (
                                <Button type="danger" icon={<SaveOutlined />} onClick={() => handleSaveLabel(inputSelect.id,inputSelect.Index, inputSelect.label)}>
                                </Button>
                            ) : (
                                <Button type="danger" icon={<EditOutlined />} onClick={() => handleEditLabel(inputSelect.Index)} />
                            )}
                            <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDeleteInputSelect(inputSelect.Index)}>
                            </Button>
                        </div>


                        <div className='selection'>

                            <InputSelection
                                id={id}
                                name={name}
                                defaultValue="--Select approver--"
                                control={control}
                                value={inputSelect.selectedOption}
                                onChange={handleSelectChange}
                                indexInput={inputSelect.Index}
                                idInput={inputSelect.id}
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
