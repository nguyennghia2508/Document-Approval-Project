import React from 'react'
import './style.scss'
import { CommentOutlined, Avarta } from '@ant-design/icons';
import FileUpload from '../FileUpload';
import { Input, Button, Avatar } from 'antd';
import { useForm } from 'react-hook-form';
const { TextArea } = Input;
const CommentInput = () => {

    const {
        formState: { errors },
        control,
        setValue,
    } = useForm({
        mode: "onsubmit",

    });

    return (
        <div className='commentInput'>
            <label className='commentInput-label'><CommentOutlined />Comment</label>
            <div className='commentInput-container'>
                <Avatar className='commentInput-avarta'></Avatar>
                <TextArea rows={4} className='commentInput-body' placeplaceholder="Input here" />
                <Button type='primary'>Save</Button>
            </div>
            <div className='commentInput-upload'>
                <FileUpload maxSize={50} label="Documents for reference" id="reference" name="reference"
                    setValue={setValue} control={control} type="primary" />
            </div>

        </div>
    )
}

export default CommentInput