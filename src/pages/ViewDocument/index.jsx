// import React from 'react'
import InputText from '../../components/InputText'
import InputSelection from '../../components/InputSelection'
import InputSearch from '../../components/InputSearch'
import React, { useEffect, useState } from 'react';
import './style.scss'
import { Avatar, Divider, Image } from 'antd';
import TitleBody from '../../components/TitleBody';
import { useForm } from 'react-hook-form';
import documentApprovalApi from '../../api/documentApprovalApi'
import moment from 'moment'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CommentOutlined, EnterOutlined } from '@ant-design/icons';
import CommentInput from '../../components/CommentInput';
import PersonApproved from '../../components/PersonApproved';
import commentApi from "../../api/commentApi"
import userApi from '../../api/userApi';
import Loading from "../../components/Loading";

const ViewDocument = () => {
    const {
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm({
        mode: "onsubmit",
    });

    const navigate = useNavigate()
    const user = useSelector((state) => state.user.value)
    const { id } = useParams();
    const urlBE = "https://localhost:44389"

    const [userData, setUserData] = useState([])
    const [departmentData, setDepartmentData] = useState([]);
    const [sectionOptions, setSectionOptions] = useState([]);
    const [unitOptions, setUnitOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([])
    const [documentTypeOptions, setDocumentTypeOptions] = useState([]);
    const [dataDocument, setDataDocument] = useState([])
    const [selectedApplicant, setSelectedApplicant] = useState("")
    const [selectedDepartment, setSelectedDepartment] = useState('Select Department');
    const [selectedSection, setSelectedSection] = useState('Select Section');
    const [selectedUnit, setSelectedUnit] = useState('Select Unit');
    const [selectedCategory, setSelectedCategory] = useState('Choose category');
    const [selectedDocumentType, setSelectedDocumentType] = useState('Choose document type');
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedSubject, setSelectedSubject] = useState(null)
    const [selectedContent, setSelectedContent] = useState(null)
    const [selectedFilesApproved, setSelectedFilesApproved] = useState([])
    const [selectedFileReference, setSelectedFileReference] = useState([])
    const [selectedFileComment, setSelectedFileComment] = useState([])
    const [approvers, setApprovers] = useState([])
    const [signers, setSigners] = useState([])
    const [comment, setComment] = useState([])
    const [activeCommentIndex, setActiveCommentIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getDocument = async () => {
            try {
                const data = await documentApprovalApi.getDocumentById(id, user.Id)
                const document = data.document
                const files = data.files
                setDataDocument(data.document)
                setSelectedApplicant(document.ApplicantName)
                setSelectedDepartment(document.DepartmentName)
                setSelectedSection(document.SectionName)
                setSelectedUnit(document.UnitName)
                setSelectedCategory(document.CategoryName)
                setSelectedDocumentType(document.DocumentTypeName)
                setSelectedDate(document.CreateDate)
                setSelectedSubject(document.Subject)
                setSelectedContent(document.ContentSum)

                const selectedFilesApproved = files.filter(file => file.DocumentType === 1);
                setSelectedFilesApproved(selectedFilesApproved);

                const selectedFilesReference = files.filter(file => file.DocumentType === 2);
                setSelectedFileReference(selectedFilesReference);

                const selectedFilesComment = files.filter(file => file.DocumentType === 3);
                setSelectedFileComment(selectedFilesComment);

                const listApprover = data.persons.filter(value => value.PersonDuty === 1);
                setApprovers(listApprover)

                const listSigner = data.persons.filter(value => value.PersonDuty === 2);
                setSigners(listSigner)

                setComment(data.comments)

                if (data.state === "true") {
                    const timeout = setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                    return () => clearTimeout(timeout);

                } else {
                    const timeout = setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                    return () => clearTimeout(timeout);
                }

            } catch (err) {
                const data = err.data
                if (data.state && data.state === "false") {
                    toast.error(data.message);
                    navigate("/avn/documentapproval")
                }
            }
        }
        getDocument();
    }, []);

    useEffect(() => {
        const getAllUser = async () => {
            try {
                const data = await userApi.getAll()
                setUserData(data.listUser)
            } catch (err) {
                console.log(err)
            }
        }
        getAllUser();
    }, []);

    const handleToggleCommentInput = (index) => {
        setActiveCommentIndex(activeCommentIndex === index ? null : index);
    }

    const onSubmit = async (data) => {

        const formData = new FormData();
        const dataObject = {
            CommentContent: data.content,
            ParentNode: data.commentId,
            DocumentApprovalId: data.documentId,
            ApprovalPersonId: data.userId,
            ApprovalPersonName: data.userName,
            IsSubComment: data.children,
        };

        formData.append("Data", JSON.stringify(dataObject));
        if (data.reference && data.reference.length > 0) {
            for (let i = 0; i < data.reference.length; i++) {
                formData.append('reference', data.reference[i]);
            }
        }

        setActiveCommentIndex(null)
        const res = await commentApi.addComment(formData)
        if (res.state === "true") {
            setComment(res.comments)
            const files = res.files
            const selectedFilesComment = files.filter(file => file.DocumentType === 3);
            setSelectedFileComment(selectedFilesComment);
        }
    };

    const handleSelectedApprover = (value) => {
        setApprovers(value)
    }

    const handleSelectedSigner = (value) => {
        setSigners(value)
    }

    const handleComment = (value) => {
        setComment(value)
    }

    const handleDocument = (value) => {
        setDataDocument(value)
    }

    return (
        <>
            <form>
                <TitleBody
                    handleDocument={handleDocument}
                    handleApprover={handleSelectedApprover}
                    handleSigner={handleSelectedSigner}
                    handleComment={handleComment}
                    approveFile={selectedFilesApproved}
                    referenceFile={selectedFileReference}
                    listApprover={approvers}
                    listSigner={signers}
                    comment={comment}
                    userData={userData}
                    currentUser={user}
                    dataDocument={dataDocument}
                    label="eDocument Approval"
                    isForm={true}
                    isApproval={true}
                    href={"/avn/documentapproval"}
                />
                <div className='viewApproval-container'>
                    <div className="viewtitle">
                        <div className='viewtitle-status'>
                            <div className='viewtitle-statusRcode'  >
                                <span >Request Code:</span>
                                <p style={{ fontWeight: "bold" }}>{dataDocument.RequestCode} </p>
                            </div>
                            <div className='viewtitle-statusState'>
                                <span>Status:</span>
                                {
                                    dataDocument.Status === 1 ?
                                    <p style={{ color: "#2F85EF" }}>approving</p>
                                    :
                                    null
                                }
                                {dataDocument.Status === 2 ?
                                    <p style={{ color: "#4BA747" }}> Approved</p>
                                    :
                                    null
                                }
                                {
                                    dataDocument.Status === 4 ?
                                    <p style={{ color: "#ECD13E" }}>Signed</p>
                                    :
                                    null
                                }
                                {
                                    dataDocument.Status === 3 ?
                                    <p style={{ color: "#FF3030" }}>Reject</p>
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <h1 >DOCUMENT APPROVAL</h1></div>
                    <div className='viewInput'>
                        <div className='viewInput-top'>
                            <div className='viewInput-element'>
                                <InputText label="Applicant" 
                                value={selectedApplicant} 
                                setValue={setValue} 
                                selectedApplicant={selectedApplicant} 
                                id="applicant" name="applicant" disabled={true} control={control} />
                            </div>
                            <div className='viewInput-element'>
                                <InputSelection label="Department" id="department" name="department" value={selectedDepartment} control={control} options={departmentData} disabled={true} required />
                            </div>
                            <div className='viewInput-element'>
                                <InputSelection label="Section" id="section" name="section" value={selectedSection} control={control} options={sectionOptions} disabled={true} required />
                            </div>
                            <div className='viewInput-element'>
                                <InputSelection label="Unit" id="unit" name="unit" value={selectedUnit} control={control} options={unitOptions} disabled={true} required />
                            </div>
                            <Divider style={{
                                backgroundColor: 'GREY',
                                height: '3px',
                                margin: '20px 0',
                                border: 'none'
                            }} />

                        </div >
                        <div className='viewInput-bot'>
                            <div className='viewInput-element'>
                                <InputSelection label="Categories" id="category" name="category" control={control} value={selectedCategory} options={categoryOptions} disabled={true} required />
                            </div>
                            <div className='viewInput-element'>
                                <InputSelection label="Document Type" id="documentType" name="documentType" control={control} value={selectedDocumentType} options={documentTypeOptions} disabled={true} required />
                            </div>
                            <div className='viewInput-element'>
                                <InputSearch label="Related Proposal (if any)" id="proposal" name="proposal" disabled={true} control={control} />
                            </div>
                            <div className='viewInput-element'>
                                <InputText label="Date" name="date" selectedDate={selectedDate && moment(selectedDate).format("DD/MM/YYYY")} control={control} required disabled={true} />
                            </div>
                        </div >
                    </div >
                    <div className='viewDocument'>
                        <div className='viewDocument-subject'>
                            <InputText setValue={setValue} label="Subject" id="subject" name="subject" value={selectedSubject} disabled={true} control={control} />
                        </div>
                        <div className='viewDocument-content'>
                            <InputText setValue={setValue} label="Content summary" id="content" name="content" value={selectedContent} disabled={true} control={control} />
                        </div>
                        <div className='viewDocument-approve'>
                            <label>Documents to be approved/signed</label>
                            {selectedFilesApproved.map((value => (
                                <Link key={value.Id} to={`${urlBE}/${value.FilePath}`} target="_blank" download>{value.FileName}</Link>
                            )))}
                        </div>
                        <div className='viewDocument-reference'>
                            <label>Documents for reference</label>
                            {selectedFileReference.map((value => (
                                <Link key={value.Id} to={`${urlBE}/${value.FilePath}`} target="_blank" download>{value.FileName}</Link>
                            )))}
                        </div>

                    </div>
                    <Divider style={{
                        backgroundColor: 'GREY',
                        height: '3px',
                        margin: '20px 0',
                        border: 'none'
                    }} />

                </div >
                <div className='viewSignapproval-container'>
                    <label className='label' style={{ fontWeight: "bold", }}>Approvers</label>
                    <PersonApproved options={approvers} />

                    {/* <div className='approval-email' style={{ paddingBottom: "20px" }}>
                        <ButtonSelect id="approvers" name="approvers" control={control} data={userData} setValue={setValue} labelName="A" />
                    </div> */}
                            <label className='label' style={{ fontWeight: "bold", }}>Signers/Seal (if any)</label>
                            <PersonApproved options={signers} />
                            {/* <div className='sign-email'>
                        <ButtonSelect id="signers" name="signers" control={control} data={userData} setValue={setValue} labelName="S" />
                    </div> */}

                </div>
            </form >
            <div className='comment'>
                <div className='commentInput'>
                    <label className='commentInput-label'><CommentOutlined />Comment</label>

                    {activeCommentIndex === null && <CommentInput
                        documentId={dataDocument.DocumentApprovalId}
                        userId={user.Id}
                        userName={user.Username}
                        showCancelButton={false}
                        submitComment={onSubmit}
                    />}
                </div>
                <div className="commentShow">
                {comment && comment.length > 0 && comment.map((value, index) => (
                    <div className='commentGroup' key={index}>
                        <div className='commentParent '>
                            <div className='comment-element' >
                            {/* <Avatar className='comment-avarta'></Avatar> */}
                            <Image className='comment-avarta' src='/logo192.png'></Image>
                            <div className='comment-body'>
                                <div>
                                    <label className='comment-bodyTitle'>{value.comment.ApprovalPersonName}</label>
                                    <span>{moment(value.comment.CreateDate).format('DD/MM/YYYY HH:mm:ss')}</span>
                                    {value.comment.CommentStatus === 1 && 
                                    <img src="/status-approved.svg"/>
                                    }
                                    {value.comment.CommentStatus === 2 && 
                                    <img src="/status-signed.svg"/>
                                    }
                                    {value.comment.CommentStatus === 3 && 
                                    <img src="/status-rejected.svg"/>
                                    }
                                </div>
                                {value.comment.CommentStatus === 1 ? 
                                    <>
                                    <div className='comment-bodyComment'>Request 
                                        <Link to=''>
                                            {dataDocument.RequestCode}
                                        </Link>
                                        has been approved
                                    </div>
                                    <div className='comment-bodyComment'>Note:{value.comment.CommentContent}</div>
                                    </>
                                : value.comment.CommentStatus === 2 ?
                                    <>
                                    <div className='comment-bodyComment'>Request 
                                        <Link to="">
                                            {dataDocument.RequestCode}
                                        </Link>
                                        has been signed
                                    </div>
                                    <div className='comment-bodyComment'>Note:{value.comment.CommentContent}</div>
                                    </>
                                : value.comment.CommentStatus === 3 ?
                                    <>
                                    <div className='comment-bodyComment'>Request 
                                        <Link to="">
                                            has been rejected
                                        </Link>
                                    </div>
                                    <div className='comment-bodyComment'>Reason:{value.comment.CommentContent}</div>
                                    </>
                                :
                                    value.comment.IsFirst ? 
                                    <div className='comment-bodyComment'>{value.comment.CommentContent}
                                        <Link to="">
                                            {dataDocument.RequestCode}
                                        </Link>
                                    </div>
                                    :
                                    <div className='comment-bodyComment'>{value.comment.CommentContent}</div>
                                }
                                {selectedFileComment.map((file) => (
                                    file.CommentId === value.comment.CommentId && <Link key={file.Id} to={`${urlBE}/${file.FilePath}`} download>{file.FileName}</Link>
                                ))}

                            </div>
                            <div className='conment-Children'>
                                {activeCommentIndex === index && <CommentInput
                                    documentId={dataDocument.DocumentApprovalId}
                                    commentId={value.comment.Id}
                                    userId={user.Id}
                                    userName={user.Username}
                                    isChildren={true}
                                    submitComment={onSubmit}
                                    onCancel={() => handleToggleCommentInput(index)} showCancelButton={true} control={control}
                                />}
                            </div>
                            {value.children && value.children.length > 0 && value.children.map((value, index) => (
                                <div className='conment-Children' key={index}>
                                    <div className='comment-element' >
                                        <Avatar className='comment-avarta'></Avatar>
                                        <div className='comment-body'>
                                            <div>
                                                <label className='comment-bodyTitle'>{value.ApprovalPersonName}</label>
                                                <span>{moment(value.CreateDate).format('DD/MM/YYYY HH:mm:ss')}</span>
                                            </div>
                                            <div className='comment-bodyComment'>{value.CommentContent}</div>
                                            {selectedFileComment.map((file) => (
                                                file.CommentId === value.CommentId && <Link key={file.Id} to={`${urlBE}/${file.FilePath}`} download>{file.FileName}</Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    );
};



export default ViewDocument