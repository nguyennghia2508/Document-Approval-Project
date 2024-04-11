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
        email: value.Email,
    }));

    const [nextId, setNextId] = useState(1);
    const [lastDeletedId, setLastDeletedId] = useState(null);
    const [editLabelIndex, setEditLabelIndex] = useState(null);
    const [editLabelId, setEditLabelId] = useState(null);
    const [inputSelects, setInputSelects] = useState([]);

    useEffect(() => {
        if (data && data.length > 0 && listPerson && listPerson.length > 0) {
            const initialInputSelects = listPerson.map((person, index) => ({
                id: index + 1,
                userName: person.ApprovalPersonName,
                label: `${labelName} ${index + 1}`,
                selectedOption: userData?.find(user => user.value === person.ApprovalPersonId)?.value,
                PersonDuty: person.PersonDuty,
                DocumentApprovalId: person.DocumentApprovalId,
                email: person.ApprovalPersonEmail,
                Index: person.Index,
            }));
            setNextId(initialInputSelects[initialInputSelects.length - 1]?.id + 1)
            setInputSelects(initialInputSelects);
        }
    }, [listPerson, data]);

    const handleAddInputSelect = () => {
        setInputSelects(prevInputSelects => {
            let newId;

            if (lastDeletedId !== null && prevInputSelects.length > 0) {
                const lastItem = prevInputSelects[prevInputSelects.length - 1];
                newId = lastItem.id + 1;
                setNextId(nextId)
            } else {
                newId = nextId;
                setNextId(prevNextId => prevNextId + 1);
            }

            const newLabel = `${labelName} ${newId}`;

            return [
                ...prevInputSelects,
                {
                    id: newId,
                    userName: undefined,
                    label: newLabel,
                    selectedOption: undefined,
                    PersonDuty: undefined,
                    DocumentApprovalId: undefined,
                    email: undefined,
                    Index: undefined,
                }
            ];
        });
    };

    const handleDeleteInputSelect = (id, indexInput) => {
        setInputSelects(prevInputSelects => {
            const filteredInputSelects = prevInputSelects.filter(inputSelect => {
                return inputSelect.id !== id || inputSelect.Index !== indexInput;
            });

            if (id === prevInputSelects[prevInputSelects.length - 1].id) {
                setNextId(id + 1)
                setLastDeletedId(id + 1);
            }

            // Cập nhật lại id và Index của các phần tử còn lại
            const updatedInputSelects = filteredInputSelects.map((inputSelect, index) => ({
                ...inputSelect,
                Index: index + 1,
            }));

            return updatedInputSelects;
        });
    };


    const handleEditLabel = (id, index) => {
        setEditLabelId(id)
        setEditLabelIndex(index);
    };

    const handleSaveLabel = (id, indexInput, newLabel) => {
        setInputSelects(inputSelects.map(inputSelect => {
            if (inputSelect.Index === indexInput && inputSelect.id === id) {
                return { ...inputSelect, label: newLabel };
            }
            return inputSelect;
        }));
        setEditLabelId(null);
        setEditLabelIndex(null);
    };

    const handleSelectChange = (id, indexInput, value) => {
        setInputSelects(inputSelects.map((inputSelect, index) => {
            if (inputSelect.Index === indexInput && inputSelect.id === id) {
                const updatedInputSelect = {
                    ...inputSelect,
                    userName: userData[value].name,
                    selectedOption: value,
                    PersonDuty: PersonDuty && PersonDuty === 1 ? 1 : 2,
                    email: userData[value].email,
                    Index: index + 1,
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
        if (inputSelects.length > 0 && lastDeletedId > inputSelects[inputSelects.length - 1]?.id) {
            const lastItemId = inputSelects[inputSelects.length - 1]?.id;
            setLastDeletedId(null);
            setNextId(lastItemId + 1)
        }
        if (inputSelects.length === 0 && lastDeletedId) {
            setNextId(1);
        }
        setValue(name, inputSelects);
    }, [inputSelects]);


    return (
        <>
            <div className='approve-sign' >
                {inputSelects.map(inputSelect => (
                    <div key={uuidv4()} className='btn-selection-container'>

                        <div className='label'>
                            {editLabelId === inputSelect.id
                                ||
                                editLabelIndex && editLabelIndex === inputSelect.Index && editLabelId === inputSelect.id ? (
                                <Input
                                    defaultValue={inputSelect.label}
                                    onPressEnter={(e) => handleSaveLabel(inputSelect.id, inputSelect.Index, e.target.value)}
                                    onBlur={(e) => handleSaveLabel(inputSelect.id, inputSelect.Index, e.target.value)}
                                />
                            ) : (
                                <span style={{ marginRight: '8px' }}>{inputSelect.label} </span>
                            )}

                            {editLabelId === inputSelect.id
                                ||
                                editLabelIndex && editLabelIndex === inputSelect.Index && editLabelId === inputSelect.id ? (
                                <Button type="danger" icon={<SaveOutlined />} onClick={() => handleSaveLabel(inputSelect.id, inputSelect.Index, inputSelect.label)}>
                                </Button>
                            ) : (
                                <Button type="danger" icon={<EditOutlined />} onClick={() => handleEditLabel(inputSelect.id, inputSelect.Index)} />
                            )}
                            <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDeleteInputSelect(inputSelect.id, inputSelect.Index)}>
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
