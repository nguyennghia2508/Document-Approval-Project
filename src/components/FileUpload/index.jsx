import React, { useState } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './style.scss'
import { Controller } from 'react-hook-form';

const FileUpload = ({ 
    label, 
    type,
    name, 
    id, 
    control 
}) => {
    const [fileList, setFileList] = useState([]);

    const beforeUpload = (file) => {
        const isDuplicate = fileList.some(existingFile => existingFile.name === file.name);
        if (!isDuplicate) {
            setFileList([...fileList, file]);
        }
        return false;
    };

    return (
        <label className='file-upload-container'>
            <label className="bold-label">{label}</label>
            <div>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => {
                    return (
                        <Upload 
                            id={id}
                            name={name}
                            multiple
                            beforeUpload={beforeUpload}
                            onChange={(info) => {
                                field.onChange(info.fileList.map(file => file.originFileObj));
                            }}
                        >
                            <Button 
                                type={type}
                                icon={<UploadOutlined />}
                            >
                                Add attachments
                            </Button>
                        </Upload>
                    )
                    }}
                >
                </Controller>
                <span style={{ paddingLeft: "10px" }}>(Maximum 20MB per file)</span>
            </div>
        </label>
    );
};

export default FileUpload;
