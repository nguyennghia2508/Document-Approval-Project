import React, { useEffect, useState } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import './style.scss'
import { Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import moment from 'moment';
import PDFViewer from '../PdfViewer';
import { Link } from 'react-router-dom';

const FileUpload = ({
    disabled,
    label,
    type,
    name,
    id,
    control,
    maxSize,
    setValue,
    handleFileListReset,
    files,
    DocumentType,
    document
}) => {
    const [fileList, setFileList] = useState([]);
    const [fileListUpload, setFileListUpload] = useState([])

    useEffect(() => {
        if (files && files.length > 0) {
            const formattedFiles = files.map((file) => {
                const fileObj = new File([null], file.FileName, {
                    type: file.FileType,
                    lastModified: new Date(file.CreateDate).getTime(),
                });
                fileObj.id = file.DocumentFileId;
                fileObj.DocumentApprovalId = file.DocumentApprovalId
                fileObj.length = parseInt(file.FileSize);
                fileObj.DocumentType = file.DocumentType
                fileObj.path = file.FilePath
                return fileObj;
            });
            setFileListUpload(formattedFiles)
            setValue(name, formattedFiles);
        } else {
            setFileList([]);
            setValue(name, []); // Reset the value in react-hook-form when files are null or empty
        }
    }, [files]);

    const handleUploadChange = (info) => {
        const { fileList: newFileList } = info;
        if (fileList.length === 0) {
            const filteredFileList = newFileList.filter(file => file.size / 1024 / 1024 <= maxSize);
            const uniqueNewFiles = !filteredFileList.every(newFile => fileListUpload.some(existingFile => existingFile.name.toLowerCase().trim() === newFile.name.toLowerCase().trim()));
            if (uniqueNewFiles) {
                setFileList(filteredFileList);
                const files = filteredFileList.map(file => file.originFileObj);
                const combinedFiles = [...files, ...fileListUpload];

                setValue(name, combinedFiles);
            }
        } else {
            // Lọc ra các file mới không trùng tên với bất kỳ file nào đã có trong mảng fileList
            // const normalizedFileName = newFileList[0].name.toLowerCase().trim();
            const uniqueNewFiles = !newFileList.every(newFile =>
                fileList.some(existingFile => existingFile.name.toLowerCase().trim() === newFile.name.toLowerCase().trim())
                || fileListUpload.some(existingFile => existingFile.name.toLowerCase().trim() === newFile.name.toLowerCase().trim())
            );
            if (uniqueNewFiles) {
                const filteredFileList = newFileList.filter(file => file.size / 1024 / 1024 <= maxSize);
                // Thêm các tệp mới vào fileList
                setFileList(filteredFileList);
                const files = filteredFileList.map(file => {
                    if (DocumentType) {
                        if (file.originFileObj) {
                            file.originFileObj.DocumentType = DocumentType
                            return file.originFileObj
                        }
                        else {
                            return file
                        }
                    }
                    else {
                        if (file.originFileObj) {
                            return file.originFileObj
                        }
                        return file
                    }
                })

                const combinedFiles = [...files, ...fileListUpload];

                setValue(name, combinedFiles);
            }
        }
    };


    const beforeUpload = (file) => {
        const normalizedFileName = file.name.toLowerCase().trim();
        const isDuplicate = fileList.some(existingFile => existingFile.name.toLowerCase().trim() === normalizedFileName) || fileListUpload.some(existingFile =>
            existingFile.name.toLowerCase().trim() === normalizedFileName);
        const isSizeAcceptable = file.size / 1024 / 1024 <= maxSize;

        if (!isSizeAcceptable) {
            toast.error("Maximum 50MB per file");
            return false; // Loại bỏ file vượt quá kích thước
        }

        if (isDuplicate) {
            toast.error("File already exists");
            // const index = fileList.findIndex(existingFile => existingFile.name.toLowerCase().trim() === normalizedFileName);
            // if (index !== -1) {
            //     const updatedFileList = [...fileList];
            //     updatedFileList.splice(index, 1);
            //     setFileList(updatedFileList);
            // }
            return false
        }

        return false; // Thêm file hợp lệ vào fileList
    };

    const handleRemove = (file) => {
        const updatedFileList = fileList.filter(item => item.uid !== file.uid);
        setFileList(updatedFileList);
        if (fileListUpload.length) {
            const combinedFiles = [...updatedFileList.map(file => {
                if (file.originFileObj) {
                    return file.originFileObj
                }
                return file
            }), ...fileListUpload];
            setValue(name, combinedFiles)
        }
        else {
            setValue(name, updatedFileList.map(file => {
                if (file.originFileObj) {
                    return file.originFileObj
                }
                return file
            }))
        }

    };

    const handleRemoveFileUpload = (file) => {
        const updatedFileList = fileListUpload.filter(item => item.id !== file.id);
        setFileListUpload(updatedFileList)
        if (fileList.length) {
            const fileObjects = fileList.map(file => {
                const fileObj = new File([file], file.name, {
                    type: file.type
                })
                return fileObj;
            });
            const combinedFiles = [...fileObjects, ...updatedFileList];
            setValue(name, combinedFiles);
        }
        else {
            setValue(name, updatedFileList);
        }
    };

    const handleViewFile = (file) => {
        console.log(file)
    };

    useEffect(() => {
        if (handleFileListReset) {
            setFileList([])
        }
    }, [handleFileListReset]);

    return (
        <>
            <div className='file-upload-container'>
                <label className="bold-label">{label}</label>
                <div>
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => {
                            return (
                                <Upload
                                    disabled={disabled}
                                    id={id}
                                    name={name}
                                    multiple
                                    fileList={fileList}
                                    beforeUpload={beforeUpload}
                                    onRemove={handleRemove}
                                    onChange={handleUploadChange}
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
                    <span style={{ paddingLeft: "10px", width: "100%" }}>(Maximum 20MB per file)</span>
                </div>
            </div>
            {fileListUpload.map((file, index) => (
                <div key={index} className="file-item">
                    <span className='fileUpload-fileItem'>{file.name}</span>
                    <Button className='fileUpload-viewDetail'>
                        <Link to={`/test/${file.id}?id=${file.DocumentApprovalId}`}>Tag</Link>
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveFileUpload(file)}
                    />
                </div>
            ))}
        </>
    );
};

export default FileUpload;
