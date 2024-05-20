// TitleBody.js
import React, { useState } from 'react';
import { Button, Modal, Input, Row, Col } from 'antd';
import { Link } from "react-router-dom";
import { SwapLeftOutlined, ShareAltOutlined, CheckOutlined, CloseOutlined, MailOutlined, SaveOutlined, SendOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import ButtonFilter from '../ButtonFilter';
import './style.scss';
import { useForm } from 'react-hook-form';
import ModalApproval from '../ModalApproval';
import approvalPersonApi from '../../api/approvalPersonApi';
import Excel from '../Excel';
import PdfDownload from '../PdfDownload';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { FaRegSave } from "react-icons/fa";

const TitleBody = ({
    onSubmitFromTitleBody,
    afterSubmit,
    onSubmit,
    label,
    isForm = false,
    isApproval = false,
    isNoForm = false,
    isSysTemEmployee = false,
    isSystemEmployeeSave = false,
    href,
    handleLoading,
    dataDocument,
    currentUser,
    userData,
    handleDocument,
    handleApprover,
    handleSigner,
    handleComment,
    handleApproveFile,
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
    const [isShare, setIsShare] = useState(false)

    const [disableNew, setDisableNew] = useState(false)



    const openModal = (value, index, PersonDuty) => {
        setPersonDuty(PersonDuty)
        setPersonIndex(index)
        setStatus(value)
        if (value === 5) {
            setIsForward(true)
            setIsShare(false)

        }
        else if (value === 6) {
            setIsShare(true)
            setIsForward(false)

        }

        else {

            setIsForward(false)
            setIsShare(false)
        }
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    const submitModal = async (data) => {
        handleLoading(true)
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
                handleLoading(false)
                toast.success(res.message)
                handleApprover(res.approvers)
                handleComment(res.comments)
                const document = res.document
                const signers = res.signers
                if (document) {
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
                handleLoading(false)
                toast.success(res.message)
                handleSigner(res.signers)
                handleComment(res.comments)

                const files = res.files
                if (files) {
                    const selectedFilesApproved = files.filter(file => file.DocumentType === 1)
                    handleApproveFile(selectedFilesApproved)
                }

                const document = res.document
                if (document) {
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
            const res = await approvalPersonApi.rejectDocument(dataObject)
            if (res.state === "true") {
                handleLoading(false)
                handleApprover(res.approvers)
                handleSigner(res.signers)
                handleComment(res.comments)
                handleDocument(res.document)
            }
        }
        if (data.status === 5) {

            setModalOpen(false);
            const user = userData.find(user => user.Id === data.selectUser);

            const dataObject = {
                ApprovalPersonId: data.selectUser,
                Index: personIndex,
                ApprovalPersonName: user.Username,
                DocumentApprovalId: dataDocument.DocumentApprovalId,
                PersonDuty: personDuty,
                Comment: data.submiModal,
                ApprovalPersonEmail: user.Email,
            }
            const res = await approvalPersonApi.forwardPerson(dataObject)
            if (res.state === "true") {
                handleLoading(false)
                handleApprover(res.approvers)
                handleSigner(res.signers)
                handleComment(res.comments)
                handleDocument(res.document)
            }



        }
        if (data.status === 6) {
            setModalOpen(false);
            const dataObject = data.selectUser.map((item => ({
                ApprovalPersonId: item,
                DocumentApprovalId: dataDocument.DocumentApprovalId,
                Comment: data.submiModal,
            })))

            const res = await approvalPersonApi.sharePerson(dataObject)
            if (res.state === "true") {
                handleLoading(false)
            }

        }
    }

    const handleClick = (actionType) => {
        setValueInput("IsDraft", actionType)
        onSubmit();
        setDisableNew(true);
        setTimeout(() => {
            setDisableNew(false);
        }, 1000);
    };

    const handleSubmitFromTitleBody = (rCode, dType, subject, rProposal, createStart, createEnd, to, author, attoney, periodStart, periodEnd, applicant, depart, section, unit, status, procBy) => {
        onSubmitFromTitleBody(rCode, dType, subject, rProposal, createStart, createEnd, to, author, attoney, periodStart, periodEnd, applicant, depart, section, unit, status, procBy)
    };



    return (
        <>
            <ModalApproval
                status={status}
                isOpen={modalOpen}
                isSubmit={submitModal}
                isClose={closeModal}
                listUser={listUser}
                isForward={isForward}
                isShare={isShare}
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


                                {listApprover && listApprover?.length > 0 && listApprover.map((value, index) => (
                                    value.ApprovalPersonId === currentUser?.Id
                                    && value.IsProcessing
                                    &&
                                    <React.Fragment key={index}>
                                        <Link onClick={() => openModal(6, value.Index, value.PersonDuty)}><ShareAltOutlined />Share</Link>
                                        <Link onClick={() => openModal(2, value.Index)} ><CheckOutlined />Approve</Link>
                                        <Link onClick={() => openModal(4, value.Index, value.PersonDuty)}><CloseOutlined />Reject</Link>
                                        <Link onClick={() => openModal(5, value.Index, value.PersonDuty)}><MailOutlined />Forward</Link>
                                    </React.Fragment>
                                ))}
                                {listSigner && listSigner?.length > 0 && listSigner.map((value, index) => {
                                    const isCurrentUserSigner = value.ApprovalPersonId === currentUser?.Id && value.IsProcessing;
                                    const isLastApproverApproved = listApprover.some((ap, index) =>
                                        value.Index === 1 &&
                                        value.IsProcessing &&
                                        ap.ApprovalPersonId === value.ApprovalPersonId &&
                                        ap.IsLast &&
                                        ap.IsApprove
                                    );

                                    if (isCurrentUserSigner || isLastApproverApproved) {
                                        return (
                                            <React.Fragment key={index}>
                                                <Link onClick={() => openModal(6, value.Index, value.PersonDuty)}><ShareAltOutlined />Share</Link>
                                                <Link onClick={() => openModal(3, value.Index)}><CheckOutlined />Sign</Link>
                                                <Link onClick={() => openModal(4, value.Index, value.PersonDuty)}><CloseOutlined />Reject</Link>
                                                <Link onClick={() => openModal(5, value.Index, value.PersonDuty)}><MailOutlined />Forward</Link>
                                            </React.Fragment>
                                        );
                                    }

                                    else {
                                        return null;
                                    }
                                })
                                }
                            </>
                            :
                            <>
                                <Link to={href}><SwapLeftOutlined /> Return</Link>
                                <Button disabled={disableNew} onClick={() => handleClick(true)}><SaveOutlined />Save draft</Button>
                                {dataDocument && dataDocument.Status === 3 && dataDocument.IsReject ?
                                    <>
                                        <Link to={afterSubmit} onClick={() => handleClick(false)}><DeleteOutlined /> Delete</Link>
                                        <Link to={afterSubmit} onClick={() => handleClick(false)}><SendOutlined />Re-submit</Link>
                                    </>
                                    :
                                    <Button disabled={disableNew} to={afterSubmit} onClick={() => handleClick(false)}><SendOutlined />Submit</Button>
                                }
                            </>
                        }
                    </div >
                    <div className='titlebody-right'>
                    </div>
                </div >
                :
                isNoForm ?
                    <div className='titlebody-nonform'>
                        <label className='titlebody-left'>{label}</label>
                        <div className='titlebody-right'>
                            <Excel dataArray={dataArray}> </Excel>
                            <ButtonFilter
                                onFilter={handleSubmitFromTitleBody}
                            />
                            <Row className='link-create'>
                                <Link to='/avn/documentapproval/new'><PlusOutlined />Create new</Link>

                            </Row>
                        </div>
                    </div>
                    : null
            }
            {
                isSysTemEmployee ?
                    <Row className='TitleBody__Return'>
                        <Link to={href}><SwapLeftOutlined /> Return</Link>
                    </Row>
                    : null
            }
            {
                isSystemEmployeeSave ?
                    <Row className='TitleBody__Return'>
                        <Link to={href}><SwapLeftOutlined /> Return</Link>
                        <Button><FaRegSave />Save</Button>
                    </Row>
                    : null
            }
        </>
    )
}


export default TitleBody;
