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
import Excel from '../Excel';
import PdfDownload from '../PdfDownload';
import { v4 as uuidv4 } from 'uuid';

const { TextArea } = Input;

const TitleBody = ({
    onSubmitFromTitleBody,
    afterSubmit,
    onSubmit,
    label,
    isForm = false,
    isApproval = false,
    href,
    dataDocument,
    currentUser,
    userData,
    handleDocument,
    handleApprover,
    handleSigner,
    handleComment,
    listApprover,
    listSigner,
    comment,
    dataArray,
    setValueInput,
    approveFile,
    referenceFile,
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

    const listUser = userData?.map((value, index) => ({
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

    const [status, setStatus] = useState(null)
    const [modalOpen, setModalOpen] = useState(false);
    const [isLastApprover, setIsLastApprover] = useState(false)
    const [personIndex, setPersonIndex] = useState(null)
    const [personDuty, setPersonDuty] = useState(null)
    const [isForward, setIsForward] = useState(false)
    const openModal = (value, index, PersonDuty) => {
        setPersonDuty(PersonDuty)
        setPersonIndex(index)
        setStatus(value)
        if (value === 5) {
            setIsForward(true)
        }
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
                handleComment(res.comments)
                const document = res.document
                const signers = res.signers
                if (document && document.length) {
                    handleDocument(document)
                }
                if (signers && signers.length) {
                    handleSigner(signers)
                }
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
                handleComment(res.comments)

                const document = res.document
                if (document && document.length) {
                    handleDocument(document)
                }
            }
        }
        if (data.status === 4) {
            setModalOpen(false);
            const dataObject = {
                ApprovalPersonId: currentUser.Id,
                Index: personIndex,
                ApprovalPersonName: currentUser.Username,
                DocumentApprovalId: dataDocument.DocumentApprovalId,
                PersonDuty: personDuty,
                Comment: data.submiModal,
            };
            const res = await approvalPersonApi.RejectDocument(dataObject)
            if (res.state === "true") {
                handleApprover(res.approvers)
                handleSigner(res.signers)
                handleComment(res.comments)
                handleDocument(res.document)
            }
        }
    }

    const handleClick = (actionType) => {
        setValueInput("IsDraft", actionType)
        onSubmit();
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
                listUser={listUser}
                isForward={isForward}
                name="submiModal"
                id="submiModal"
            />

            {isForm ?
                <div className='titlebody-form'>
                    <div className='titlebody-left'>
                        {isApproval ?
                            <>
                                <Link to={href}><SwapLeftOutlined /> Return</Link>
                                <PdfDownload
                                    dataDocument={dataDocument}
                                    listApprover={listApprover}
                                    listSigner={listSigner}
                                    approveFile={approveFile}
                                    referenceFile={referenceFile}
                                    comment={comment}
                                />
                                <Link><ShareAltOutlined />Share</Link>
                                {listApprover && listApprover?.length > 0 && listApprover.map((value, index) => (
                                    value.ApprovalPersonId === currentUser?.Id
                                    && value.IsProcessing
                                    &&
                                    <React.Fragment key={index}>
                                        <Link onClick={() => openModal(2, value.Index)} ><CheckOutlined />Approve</Link>
                                        <Link onClick={() => openModal(4, value.Index, value.PersonDuty)}><CloseOutlined />Reject</Link>
                                        <Link onClick={() => openModal(5, value.Index, value.PersonDuty)}><MailOutlined />Forward</Link>
                                    </React.Fragment>
                                ))}
                                {
                                    listSigner && listSigner?.length > 0 && listSigner.map((value, index) => {
                                        const isCurrentUserSigner = value.ApprovalPersonId === currentUser?.Id && value.IsProcessing;
                                        const isLastApproverApproved = listApprover.some((ap, index) =>
                                            value.Index === 1 &&
                                            value.IsProcessing &&
                                            ap.ApprovalPersonId === value.ApprovalPersonId &&
                                            ap.IsLast &&
                                            ap.IsApprove
                                        );
                                        console.log(isLastApproverApproved); // Đã di chuyển dòng này ra ngoài vòng lặp map
                                        if (isCurrentUserSigner || isLastApproverApproved) {
                                            return (
                                                <React.Fragment key={index}>
                                                    <Link onClick={() => openModal(3, value.Index)}><CheckOutlined />Sign</Link>
                                                    <Link onClick={() => openModal(4, value.Index, value.PersonDuty)}><CloseOutlined />Reject</Link>
                                                    <Link onClick={() => openModal(5, value.Index, value.PersonDuty)}><MailOutlined />Forward</Link>
                                                </React.Fragment>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })
                                }



                            </>
                            :
                            <>
                                <Link to={href}><SwapLeftOutlined /> Return</Link>
                                <Link onClick={() => handleClick(true)}><SaveOutlined />Save draft</Link>
                                {dataDocument && dataDocument.Status === 3 && dataDocument.IsReject ?
                                    <Link to={afterSubmit} onClick={() => handleClick(false)}><SendOutlined />Re-submit</Link>
                                    :
                                    <Link to={afterSubmit} onClick={() => handleClick(false)}><SendOutlined />Submit</Link>
                                }
                            </>
                        }
                    </div >
                    <div className='titlebody-right'>
                    </div>
                </div >
                :
                <div className='titlebody-nonform'>
                    <label className='titlebody-left'>{label}</label>
                    <div className='titlebody-right'>
                        <Excel dataArray={dataArray}> </Excel>
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
