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
import ButtonSelect from '../../components/ButtonSelect';
import commentApi from "../../api/commentApi"

const EditDocument = () => {
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
    const [initialCategorySet, setInitialCategorySet] = useState(false);
    const [userData, setUserData] = useState([])
    const [activeCommentIndex, setActiveCommentIndex] = useState(null);

    useEffect(() => {
        const getDocument = async () => {
            try {
                const data = await documentApprovalApi.getDocumentById(id)
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

                setApprovers(data.approvers)
                setSigners(data.signers)

                setComment(data.comments)
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
            console.log(res)
            const selectedFilesComment = files.filter(file => file.DocumentType === 3);
            setSelectedFileComment(selectedFilesComment);
        }
    };



















    console.log(user)
    return (
        <>
            <form>
                <TitleBody label="eDocument Approval" isForm={true} isApproval={true} href={"/avn/documentapproval"} />
                <div className='editApproval-container'>
                    <div className="edittitle">
                        <div className='edittitle-status'>
                            <div className='edittitle-statusRcode'  >
                                <span >Request Code:</span>
                                <p style={{ fontWeight: "bold" }}>{dataDocument.RequestCode} </p>
                            </div>
                            <div className='edittitle-statusState'>
                                <span>Status:</span>
                                {dataDocument.Status === 1 ?
                                    <p style={{ color: "#2F85EF" }}> Approved</p>
                                    :
                                    null
                                }{
                                    dataDocument.Status === 2 ?
                                        <p>approving</p>
                                        :
                                        null
                                }
                            </div>
                        </div>
                        <h1 >DOCUMENT APPROVAL</h1></div>
                    <div className='editInput'>
                        <div className='editInput-top'>
                            <div className='editInput-element'>
                                <InputText label="Applicant" value={selectedApplicant} id="applicant" name="applicant" disabled={true} control={control} />
                            </div>
                            <div className='editInput-element'>
                                <InputSelection label="Department" id="department" name="department" value={selectedDepartment} control={control} options={departmentData} disabled={false} required />
                            </div>
                            <div className='editInput-element'>
                                <InputSelection label="Section" id="section" name="section" value={selectedSection} control={control} options={sectionOptions} disabled={false} required />
                            </div>
                            <div className='editInput-element'>
                                <InputSelection label="Unit" id="unit" name="unit" value={selectedUnit} control={control} options={unitOptions} disabled={false} required />
                            </div>

                        </div >
                        <div className='editInput-bot'>
                            <div className='editInput-element'>
                                <InputSelection label="Categories" id="category" name="category" control={control} value={selectedCategory} options={categoryOptions} disabled={false} required />
                            </div>
                            <div className='editInput-element'>
                                <InputSelection label="Document Type" id="documentType" name="documentType" control={control} value={selectedDocumentType} options={documentTypeOptions} disabled={false} required />
                            </div>
                            <div className='editInput-element'>
                                <InputSearch label="Related Proposal (if any)" id="proposal" name="proposal" disabled={false} control={control} />
                            </div>
                            <div className='editInput-element'>
                                <InputText label="Date" name="date" value={moment(selectedDate).format("DD/MM/YYYY")} control={control} required disabled={true} />

                            </div>

                        </div >
                    </div >
                    <div className='editDocument'>
                        <div className='editDocument-subject'>
                            <InputText label="Subject" id="subject" name="subject" value={selectedSubject} control={control} disabled={false} />
                        </div>
                        <div className='editDocument-content'>
                            <InputText label="Content summary" id="content" name="content" value={selectedContent} control={control} disabled={false} />
                        </div>
                        <div className='editDocument-approve'>
                            <label>Documents to be approved/signed</label>
                            {selectedFilesApproved.map((value => (
                                <Link key={value.Id} to={`${urlBE}/${value.FilePath}`} target="_blank" download>{value.FileName}</Link>
                            )))}
                        </div>
                        <div className='editDocument-reference'>
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
                <div className='editSignapproval-container'>
                    <label className='label' style={{ fontWeight: "bold", }}>Approvers</label>


                    <div className='approval-email' style={{ paddingBottom: "20px" }}>
                        <ButtonSelect id="approvers" name="approvers" control={control} data={approvers} setValue={setValue} labelName="A" />
                    </div>
                    <label className='label' style={{ fontWeight: "bold", }}>Signers/Seal (if any)</label>

                    <div className='sign-email'>
                        <ButtonSelect id="signers" name="signers" control={control} data={signers} setValue={setValue} labelName="S" />
                    </div>

                </div>

            </form >

        </>



    );
};



export default EditDocument