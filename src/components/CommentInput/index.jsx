import React from 'react'
import './style.scss'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from './data';
import FileUpload from '../FileUpload';
import { Input, Button, Avatar } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useState,useEffect} from 'react';
const { TextArea } = Input;
const CommentInput = ({ 
    onCancel,
    submitComment,
    showCancelButton,
    isChildren=false,
    documentId,
    commentId,
    userId,
    userName,
    isActive,
    index,
}) => {

    const {
        rows,
        formState: { errors },
        handleSubmit,
        control,
        reset,
        setValue,
    } = useForm({
        mode: "onsubmit",
        resolver: yupResolver(schema()),
    });

    const [visible, setVisible] = useState(true);
    const [text, setText] = useState(null)
    const [resetFileList, setResetFileList] = useState(false);

    const handleTextChange = (e) => {
        console.log(e.target.value)
        setText(e.target.value);
    };

    const handleCancel = () => {
        setVisible(false);
        onCancel();
    };

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            const firstErrorMessage = Object.values(errors)[0].message;
            toast.error(firstErrorMessage);
        }
    }, [errors]);

    const handleFileListReset = () => {
        setResetFileList(true);
    };

    const onSubmit = async (data) => {
        data.documentId = documentId
        data.userId = userId
        data.userName = userName
        if(isChildren)
        {
            data.children = true
            data.commentId = commentId
        }
        submitComment(data)
        handleFileListReset();
        reset();
    };
    
    return (
        <form encType="multipart/form-data">
            <div className='commentInput'>
                <div className='commentInput-container'>
                    <Avatar className='commentInput-avarta'></Avatar>
                    <Controller
                        name="content"
                        control={control}
                        render={({ field }) => {
                            return (
                                <TextArea 
                                    name="content" 
                                    value={text} 
                                    onChange={(e) => handleTextChange(e)}
                                    {...field}
                                    className='commentInput-body' 
                                    placeplaceholder="Input here" 
                                />
                            )
                        }}
                    >
                    </Controller>
                    <Button type='primary' onClick={handleSubmit(onSubmit)}>Save</Button>
                    {showCancelButton && <Button type='primary' onClick={handleCancel} danger>Cancel</Button>}

                </div>
                <div className='commentInput-upload'>
                    <FileUpload
                    maxSize={50}
                    label="Documents for reference" 
                    id="reference" name="reference"
                    setValue={setValue} control={control}
                    type="primary"
                    handleFileListReset={resetFileList}
                    />
                </div>
            </div>
        </form>
    )
}

export default CommentInput