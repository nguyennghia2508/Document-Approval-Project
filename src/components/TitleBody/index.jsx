// TitleBody.js
import React, { useEffect, useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { Link } from "react-router-dom";
import { SwapLeftOutlined, FileTextOutlined, ShareAltOutlined, CheckOutlined, CloseOutlined, MailOutlined, SaveOutlined, SendOutlined, PlusOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import ButtonFilter from '../ButtonFilter';
import './style.scss';
import { useForm } from 'react-hook-form';
import ModalApproval from '../ModalApproval';
import approvalPersonApi from '../../api/approvalPersonApi';

const { TextArea } = Input;

const TitleBody = ({
    onSubmitFromTitleBody,
    afterSubmit,
    onSubmit,
    label,
    isForm = false,
    isApproval = false,
    isApproved = false,
    href,
    dataDocument,
    currentUser,
    selectedSigner,
    handleApprover,
    handleSigner,
    listApprover,
    listSigner,
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

    const [status, setStatus] = useState(null)
    const [modalOpen, setModalOpen] = useState(false);
    const [isLastApprover, setIsLastApprover] = useState(false)
    const [personIndex, setPersonIndex] = useState(null)

    const openModal = (value, index) => {
        setPersonIndex(index)
        setStatus(value)
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    const submitModal = async (data) => {
        if (data.status === 2) {
            setModalOpen(false);
            const dataObject = {
                ApprovalPersonId: currentUser.Id,
                Index: personIndex,
                ApprovalPersonName: currentUser.Username,
                DocumentApprovalId: dataDocument.DocumentApprovalId,
                Comment: data.submiModal,
            };
            const res = await approvalPersonApi.addApproval(dataObject)
            if (res.state === "true") {
                handleApprover(res.approvers)
                setIsLastApprover(res.isLast)
            }
        }
        if (data.status === 3) {
            setModalOpen(false);
            const dataObject = {
                ApprovalPersonId: currentUser.Id,
                Index: personIndex,
                ApprovalPersonName: currentUser.Username,
                DocumentApprovalId: dataDocument.DocumentApprovalId,
                Comment: data.submiModal,
            };
            const res = await approvalPersonApi.addSigned(dataObject)
            if (res.state === "true") {
                handleSigner(res.signers)
            }
        }
    }

    const handleClick = () => {
        onSubmit('Data to submit');
    };

    const handleSubmitFromTitleBody = (rCode, dType, subject, rProposal, createStart, createEnd, to, author, attoney, periodStart, periodEnd, applicant, depart, section, unit, status, procBy) => {
        onSubmitFromTitleBody(rCode, dType, subject, rProposal, createStart, createEnd, to, author, attoney, periodStart, periodEnd, applicant, depart, section, unit, status, procBy)
    };
    // console.log("IDPERSON", currentUser)
    // console.log("IDPERSON", listSigner)



    return (
        <>
            <ModalApproval
                status={status}
                isOpen={modalOpen}
                isSubmit={submitModal}
                isClose={closeModal}
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
                                {listApprover && listApprover?.length > 0 && listApprover.map((value, index) => (
                                    value.ApprovalPersonId === currentUser?.Id
                                    && value.IsProcessing
                                    &&
                                    <React.Fragment key={index}>
                                        <Link onClick={() => openModal(2, value.Index)} ><CheckOutlined />Approve</Link>
                                        <Link onClick={() => openModal(4)}><CloseOutlined />Reject</Link>
                                        <Link><MailOutlined />Forward</Link>
                                    </React.Fragment>
                                ))}
                                {listSigner && listSigner?.length > 0 && listSigner.map((value, index) => (
                                    value.ApprovalPersonId === currentUser?.Id
                                    && value.IsProcessing
                                    &&
                                    <React.Fragment key={index}>
                                        <Link onClick={() => openModal(3, value.Index)} ><CheckOutlined />Sign</Link>
                                        <Link onClick={() => openModal(4)}><CloseOutlined />Reject</Link>
                                        <Link><MailOutlined />Forward</Link>
                                    </React.Fragment>
                                ))}

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
