import React, { useEffect, useState } from 'react';
import { Button, Modal, Image, Upload } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import './style.scss'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import userApi from '../../api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../redux/features/userSlice"

const ModalSignature = () => {
    const {
        rows,
        formState: { errors },
        handleSubmit,
        control,
        setValue,
    } = useForm({
        mode: "onsubmit",

    });

    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.value)
    const urlBE = "https://localhost:44389"

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([])
    const [fileListUpload, setFileListUpload] = useState(null)
    const maxSize = 5
    const allowedFileTypes = ['.png', '.jpg', '.jpeg'];
    const name = "signature"

    useEffect(() => {
        if (user.SignatureFileName && user.SignatureFilePath && open) {
            setFileListUpload(null)
            const fileObj = new File([null], user.SignatureFileName, {
                type: "image/png",
            });
            fileObj.path = user.SignatureFilePath

            setFileListUpload(fileObj)
            setValue(name, fileObj);
        } else {
            setFileListUpload(null);
            setFileList([])
            setValue(name, null);
        }
    }, [user, open]);

    const showModal = () => {
        setOpen(true);
    };
    const onSubmit = async (data) => {
        setConfirmLoading(true);
        if (fileList.length === 0) {
            toast.error("File not empty");
            setConfirmLoading(false);
        }
        else {
            const formData = new FormData();
            if (data.signature && data.signature.length > 0) {
                for (let i = 0; i < data.signature.length; i++) {
                    formData.append('signature', data.signature[i]);
                }
            }
            const res = await userApi.addSignature(user.Id, formData);
            if (res.state === "true") {
                setConfirmLoading(false);
                dispatch(setUser(res.user))
                setFileList([])
                toast.success(res.msg)
            }
        }
        // setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const handleUploadChange = (info) => {
        const { fileList: newFileList } = info;
        if (fileList.length === 0) {

            const filteredFileList = newFileList.filter(file => file.size / 1024 / 1024 <= maxSize && allowedFileTypes.some(type => file.name.endsWith(type)));

            if (filteredFileList) {
                setFileList(filteredFileList);
                const files = filteredFileList.map(file => file.originFileObj);

                setValue(name, files);
            }
        }
    };

    const handleRemove = (file) => {
        const updatedFileList = fileList.filter(item => item.uid !== file.uid);
        setFileList(updatedFileList);
        setValue(name, updatedFileList.map(file => {
            if (file.originFileObj) {
                return file.originFileObj
            }
            return file
        }))
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
        const isValidType = allowedFileTypes.some(type => file.name.endsWith(type));
        if (!isValidType) {
            toast.error('Only image are allowed!');
            return false
        }
        return false;
    };

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleRemoveUpload = () => {
        setFileListUpload(null);
        setValue(name, null);
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    return (

        <>
            <Link className='btn-Dropdown-Qa' onClick={showModal}>
                <span>My Signature</span>
            </Link>
            <Modal
                width={800}
                title="My Signature"
                open={open}
                onOk={handleSubmit(onSubmit)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    accept='.png,.jpg,.jpeg'
                    beforeUpload={beforeUpload}
                    onPreview={handlePreview}
                    onChange={handleUploadChange}
                    onRemove={handleRemove}
                    className='ModalSignature__Upload'
                >
                    {fileListUpload ? null : fileList.length >= 1 ? null : uploadButton}
                </Upload>
                {fileListUpload !== null ?
                    <>
                        <Image
                            wrapperStyle={
                                {
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center"
                                }
                            }
                            // style={{ width: "auto", }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                mask: (
                                    <>
                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                                                <Button
                                                    type="text"
                                                    icon={<EyeOutlined />}
                                                    onClick={() => setPreviewOpen(!previewOpen)}
                                                    style={{ color: '#fff' }}
                                                />
                                                <Button
                                                    type="text"
                                                    icon={<DeleteOutlined />}
                                                    onClick={handleRemoveUpload}
                                                    style={{ color: '#fff' }}
                                                />
                                            </div>
                                        </div>
                                    </>
                                ),
                            }}
                            src={`${urlBE}/${fileListUpload?.path}`}
                        />
                    </>
                    :
                    previewImage && (
                        <Image

                            wrapperStyle={{
                                display: 'none',
                            }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )
                }
            </Modal>
        </>
    )
}

export default ModalSignature