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
import FileUpload from '../../components/FileUpload';
import ButtonSelect from '../../components/ButtonSelect';

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

                const listApprover = data.persons.filter(value => value.PersonDuty === 1);
                setApprovers(listApprover)

                const listSigner = data.persons.filter(value => value.PersonDuty === 2);
                setSigners(listSigner)

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
    const onSubmit = async (data) => {
        console.log("data", data)
    };

    const handleSelectedApprover = (value) => {
        setApprovers(value)
    }

    const handleSelectedSigner = (value) => {
        setSigners(value)
    }









    return (
        <>
            <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)} >

                <TitleBody
                    handleApprover={handleSelectedApprover}
                    handleSigner={handleSelectedSigner}
                    listApprover={approvers}
                    listSigner={signers}
                    currentUser={user}
                    dataDocument={dataDocument}
                    label="eDocument Approval"
                    isForm={true}
                    isApproval={true}
                    href={"/avn/documentapproval"}
                />
                <div className='viewApproval-container '>
                    <button type='submit'  >Submit</button>

                    <div className="viewtitle">
                        <div className='viewtitle-status'>
                            <div className='viewtitle-statusRcode'  >
                                <span >Request Code:</span>
                                <p style={{ fontWeight: "bold" }}>{dataDocument.RequestCode} </p>
                            </div>
                            <div className='viewtitle-statusState'>
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
                    <div className='viewInput'>
                        <div className='viewInput-top'>
                            <div className='viewInput-element'>
                                <InputText label="Applicant" value={selectedApplicant} id="applicant" name="applicant" disabled={true} control={control} />
                            </div>
                            <div className='viewInput-element'>
                                <InputSelection label="Department" id="department" name="department" value={selectedDepartment} control={control} options={departmentData} disabled={false} required />
                            </div>
                            <div className='viewInput-element'>
                                <InputSelection label="Section" id="section" name="section" value={selectedSection} control={control} options={sectionOptions} disabled={false} required />
                            </div>
                            <div className='viewInput-element'>
                                <InputSelection label="Unit" id="unit" name="unit" value={selectedUnit} control={control} options={unitOptions} disabled={false} required />
                            </div>

                        </div >
                        <div className='viewInput-bot'>
                            <div className='viewInput-element'>
                                <InputSelection label="Categories" id="category" name="category" control={control} value={selectedCategory} options={categoryOptions} disabled={false} required />
                            </div>
                            <div className='viewInput-element'>
                                <InputSelection label="Document Type" id="documentType" name="documentType" control={control} value={selectedDocumentType} options={documentTypeOptions} disabled={false} required />
                            </div>
                            <div className='viewInput-element'>
                                <InputSearch label="Related Proposal (if any)" id="proposal" name="proposal" disabled={false} control={control} />
                            </div>
                            <div className='viewInput-element'>
                                <InputText label="Date" name="date" value={moment(selectedDate).format("DD/MM/YYYY")} control={control} required disabled={true} />

                            </div>

                        </div >
                    </div >
                    <div className='viewDocument'>
                        <div className='viewDocument-subject'>
                            <InputText label="Subject" id="subject" name="subject" value={selectedSubject} control={control} disabled={true} />
                        </div>
                        <div className='viewDocument-content'>
                            <InputText label="Content summary" id="content" name="content" value={selectedContent} control={control} disabled={true} />
                        </div>
                        <div className='viewDocument-approve'>
                            <FileUpload maxSize={50} label="Documents to be approved/signed" id="approve" name="approve"
                                setValue={setValue} control={control} type="primary" />

                            {selectedFilesApproved.map((value => (
                                <Link key={value.Id} to={`${urlBE}/${value.FilePath}`} target="_blank" download>{value.FileName}</Link>
                            )))}
                        </div>
                        <div className='viewDocument-reference'>
                            <FileUpload maxSize={50} label="Documents for reference" id="reference" name="reference"
                                setValue={setValue} control={control} type="primary" />
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
                <div className='signapproval-container'>
                    <label className='label' style={{ fontWeight: "bold", }}>Approvers</label>
                    <div className='approval-email' style={{ paddingBottom: "20px" }}>
                        <ButtonSelect id="approvers" name="approvers" control={control} data={sectionOptions} setValue={setValue} labelName="A" />
                    </div>
                    <label className='label' style={{ fontWeight: "bold", }}>Signers/Seal (if any)</label>

                    <div className='sign-email'>
                        <ButtonSelect id="signers" name="signers" control={control} data={sectionOptions} setValue={setValue} labelName="S" />
                    </div>
                </div>

            </form >

        </>



    );
};



export default EditDocument