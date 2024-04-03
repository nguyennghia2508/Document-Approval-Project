import React from 'react'
import './style.scss'
import { CommentOutlined, Avarta } from '@ant-design/icons';
import FileUpload from '../FileUpload';
import { Input, Button, Avatar } from 'antd';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
const { TextArea } = Input;
const CommentInput = ({ 
    onCancel, 
    showCancelButton 
}) => {

    const {
        rows,
        formState: { errors },
        handleSubmit,
        control,
        setValue,
    } = useForm({
        mode: "onsubmit",

    });

    const [visible, setVisible] = useState(true);

    const handleCancel = () => {
        setVisible(false);
        onCancel(); // Gọi hàm onCancel được truyền từ CommentShow
    };

    const onSubmit = async (data) => {
        console.log(data)
    };

    return (
        <form encType="multipart/form-data">
            <div className='commentInput'>
                <div className='commentInput-container'>
                    <Avatar className='commentInput-avarta'></Avatar>
                    <TextArea rows={rows} className='commentInput-body' placeplaceholder="Input here" />
                    <Button type='primary' onSubmit={handleSubmit(onSubmit)}>Save</Button>
                    {showCancelButton && <Button type='primary' onClick={handleCancel} danger>Cancel</Button>}

                </div>
                <div className='commentInput-upload'>
                    <FileUpload maxSize={50} label="Documents for reference" id="reference" name="reference"
                        setValue={setValue} control={control} type="primary" />
                </div>
            </div>
        </form>
    )
}

export default CommentInput