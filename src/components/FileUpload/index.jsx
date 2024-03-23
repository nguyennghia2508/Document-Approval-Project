import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './style.scss'

const FileUpload = ({ label, type }) => {
    return (
        <label className='file-upload-container'>
            <label className="bold-label">{label}</label>
            <div>
                <Upload>
                    <Button type={type} icon={<UploadOutlined />}>Add attachments</Button>
                </Upload>
                <span style={{ paddingLeft: "10px" }}>(Maximum 20MB per file)</span>
            </div>
        </label>
    );
};

export default FileUpload;
