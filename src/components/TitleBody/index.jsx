// TitleBody.js
import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { Link } from "react-router-dom";
import { SwapLeftOutlined, FileTextOutlined, ShareAltOutlined, CheckOutlined, CloseOutlined, MailOutlined, SaveOutlined, SendOutlined, PlusOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import ButtonFilter from '../ButtonFilter';
import './style.scss';
import { useForm } from 'react-hook-form';
import ModalApproval from '../ModalApproval';

const { TextArea } = Input;

const TitleBody = ({
    onSubmitFromTitleBody,
    afterSubmit,
    onSubmit,
    label,
    isForm = false,
    isApproval = false,
    isApproved = false,
    href
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


    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    const submitModal = (data) => {
        console.log("submit", data)
    }

    const handleClick = () => {
        onSubmit('Data to submit');
    };

    const handleSubmitFromTitleBody = (rCode, dType, subject, rProposal, createStart, createEnd, to, author, attoney, periodStart, periodEnd, applicant, depart, section, unit, status, procBy) => {
        onSubmitFromTitleBody(rCode, dType, subject, rProposal, createStart, createEnd, to, author, attoney, periodStart, periodEnd, applicant, depart, section, unit, status, procBy)
    };
    return (
        <>
            <ModalApproval
                isOpen={modalOpen}
                isSubmit={submitModal}
                isClose={closeModal}
                control={control}
                name="submiModal"
                id="submiModal"
            />

            {isForm ?
                <div className='titlebody-form'>
                    <div className='titlebody-left'>
                        {isApproval ?
                            <>
                                <Link to={href}><SwapLeftOutlined /> Return</Link>
                                <Link><FileTextOutlined /> Download file</Link>
                                <Link><ShareAltOutlined />Share</Link>
                                {isApproved ?
                                    <Link><CheckOutlined />Approve</Link> :
                                    <Link onClick={openModal} ><CheckOutlined />Approve1</Link>
                                }

                                <Link onClick={openModal}><CloseOutlined />Reject</Link>
                                <Link><MailOutlined />Forward</Link>
                            </>
                            :
                            <>
                                <Link to={href}><SwapLeftOutlined /> Return</Link>
                                <Link><SaveOutlined />Save draft</Link>
                                <Link to={afterSubmit} onClick={handleClick}><SendOutlined />Submit</Link>
                            </>
                        }
                    </div>
                    <div className='titlebody-right'>
                    </div>
                </div >

                :
                <div className='titlebody-nonform'>
                    <label className='titlebody-left'>{label}</label>
                    <div className='titlebody-right'>
                        <Button><VerticalAlignBottomOutlined style={{ transform: 'rotate(-90deg)' }} />Export excel</Button>
                        <ButtonFilter
                            onFilter={handleSubmitFromTitleBody}
                        />
                        <Link className='link-create' to='/avn/documentapproval/new'><PlusOutlined />Create new</Link>
                    </div>
                </div>
            }
        </>
    )
}

export default TitleBody;
