// import React from 'react'
import InputText from '../../components/InputText'
import InputSelection from '../../components/InputSelection'
import InputSearch from '../../components/InputSearch'
import React, { useEffect, useState } from 'react';
import './style.scss'
import FileUpload from '../../components/FileUpload';
import { Avatar, Divider, Image } from 'antd';
import ButtonSelect from '../../components/ButtonSelect';
import TitleBody from '../../components/TitleBody';
import { useForm } from 'react-hook-form';
import departmentApi from '../../api/departmentApi';
import categoryApi from '../../api/categoryApi'
import documentApprovalApi from '../../api/documentApprovalApi'
import userApi from "../../api/userApi"
import moment from 'moment'
import { useSelector } from 'react-redux';
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from './data';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CommentOutlined, EnterOutlined } from '@ant-design/icons';
import CommentInput from '../../components/CommentInput';
import PersonApproved from '../../components/PersonApproved';


const ViewDocument = () => {
    const {
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm({
        mode: "onsubmit",
        resolver: yupResolver(schema()),
        shouldFocusError: false,
    });

    const navigate = useNavigate()
    const { id } = useParams();
    const urlBE = "https://localhost:44389"
    
    const [departmentData, setDepartmentData] = useState([]);
    const [sectionOptions, setSectionOptions] = useState([]);
    const [unitOptions, setUnitOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([])
    const [documentTypeOptions, setDocumentTypeOptions] = useState([]);
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
    const [selectedFileReference , setSelectedFileReference] = useState([])
    const [approvers, setApprovers] = useState([])
    const [signers, setSigners] = useState([])
    const [initialCategorySet, setInitialCategorySet] = useState(false);
    const [userData, setUserData] = useState([])


    useEffect(() => {
        const getDocument = async () => {
            try {
                const data = await documentApprovalApi.getDocumentById(id)
                const document = data.document
                const files = data.files

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

                setApprovers(data.approvers)
                setSigners(data.signers)
            } catch (err) {
                const data = err.data
                if(data.state === "false")
                {
                    toast.error(data.message);
                    navigate("/avn/documentapproval")
                }
            }
        }
        getDocument();
    }, []);


    const onSubmit = async (data) => {
        console.log(data)
        // // Tiếp tục xử lý dữ liệu
        // data.date = defaultDate;
        // const formData = new FormData();
        // const dataObject = {
        //     ApplicantId: user.Id,
        //     ApplicantName: data.applicant,
        //     CategoryId: data.category,
        //     DocumentTypeId: data.documentType,
        //     DepartmentId: data.department,
        //     SectionId: data.section,
        //     UnitId: data.unit,
        //     RelatedProposal: data.proposal,
        //     CreateDate: data.date,
        //     Subject: data.subject,
        //     ContentSum: data.content
        // };

        // formData.append("Data", JSON.stringify(dataObject));

        // if (data.approve && data.approve.length > 0) {
        //     for (let i = 0; i < data.approve.length; i++) {
        //         formData.append('approve', data.approve[i]);
        //     }
        // }
        // if (data.reference && data.reference.length > 0) {
        //     for (let i = 0; i < data.reference.length; i++) {
        //         formData.append('reference', data.reference[i]);
        //     }
        // }

        // const approvalPerson = {
        //     approvers: data.approvers.map(value => ({
        //         ApprovalPersonId: value.selectedOption,
        //         ApprovalPersonName: value.userName,
        //     })),
        //     signers: data.signers.map(value => ({
        //         ApprovalPersonId: value.selectedOption,
        //         ApprovalPersonName: value.userName,
        //     }))
        // };
        // formData.append('ApprovalPerson', JSON.stringify(approvalPerson));
        // const res = await documentApprovalApi.addDocumentApproval(formData);
        // if (res.state === "true") {
        //     const dc = res.dc
        //     navigate(`/avn/documentapproval/view/${dc.Id}`)
        // }
    };

    return (
        <>
            <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                <TitleBody label="eDocument Approval" onSubmit={handleSubmit(onSubmit)} isForm={true} isApproval={true} href={"/avn/documentapproval"} />
                <div className='viewApproval-container'>
                    <div className="viewtitle"><h1 style={{ textAlign: 'center' }}>DOCUMENT APPROVAL</h1></div>
                    <div className='viewInput'>
                        <div className='viewInput-top'>
                            <div className='viewInput-element'>
                                <InputText label="Applicant" value={selectedApplicant} id="applicant" name="applicant" disabled={true} control={control} />
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
                                <InputText label="Date" name="date" value={moment(selectedDate).format("DD/MM/YYYY")} control={control} required disabled={true} />

                            </div>

                        </div >
                    </div >
                    <div className='viewDocument'>
                        <div className='viewDocument-subject'>
                            <InputText label="Subject" id="subject" name="subject"  value={selectedSubject} control={control} disabled={true} />
                        </div>
                        <div className='viewDocument-content'>
                            <InputText label="Content summary" id="content" name="content" value={selectedContent} control={control} disabled={true} />
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
                    <PersonApproved options={approvers}/>

                    {/* <div className='approval-email' style={{ paddingBottom: "20px" }}>
                        <ButtonSelect id="approvers" name="approvers" control={control} data={userData} setValue={setValue} labelName="A" />
                    </div> */}
                    <label className='label' style={{ fontWeight: "bold", }}>Signers/Seal (if any)</label>
                    <PersonApproved options={signers}/>
                    {/* <div className='sign-email'>
                        <ButtonSelect id="signers" name="signers" control={control} data={userData} setValue={setValue} labelName="S" />
                    </div> */}



                    <div className='comment'>
                        <div className='commentInput'>
                            <CommentInput></CommentInput>
                        </div>


                        <div className="commentShow">
                            <div className='commentGroup'>
                                <div className='commentParent'>
                                    <hr></hr>
                                    <div className='comment-element' >
                                        <Avatar className='comment-avarta'></Avatar>
                                        <div className='comment-body'>
                                            <div>
                                                <label style={{ fontWeight: "bold", marginRight: "20px" }}>Nguyễn Minh Nhân</label>
                                                <span>29/03/2024</span>
                                            </div>
                                            <div>Comment input</div>
                                        </div>
                                        <EnterOutlined className='comment-reply' />
                                    </div>
                                </div>
                                <div className='conment-Children'>
                                    <hr></hr>
                                    <div className='comment-element' >
                                        <Avatar></Avatar>
                                        <div className='comment-body'>
                                            <div>
                                                <label>Nguyễn Minh Nhân children</label>
                                                <span>29/03/2024</span>
                                            </div>
                                            <div>Comment input</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='commentGroup'>
                                <div className='commentParent'>
                                    <hr></hr>
                                    <div className='comment-element' >
                                        <Avatar className='comment-avarta'></Avatar>
                                        <div className='comment-body'>
                                            <div>
                                                <label style={{ fontWeight: "bold", marginRight: "20px" }}>Nguyễn Minh Nhân</label>
                                                <span>29/03/2024</span>
                                            </div>
                                            <div>Comment input</div>
                                        </div>
                                        <EnterOutlined className='comment-reply' />
                                    </div>
                                </div>
                                <div className='conment-Children'>
                                    <hr></hr>
                                    <div className='comment-element' >
                                        <Avatar></Avatar>
                                        <div className='comment-body'>
                                            <div>
                                                <label>Nguyễn Minh Nhân children</label>
                                                <span>29/03/2024</span>
                                            </div>
                                            <div>Comment input</div>
                                        </div>
                                    </div>
                                </div>
                            </div><div className='commentGroup'>
                                <div className='commentParent'>
                                    <hr></hr>
                                    <div className='comment-element' >
                                        <Avatar className='comment-avarta'></Avatar>
                                        <div className='comment-body'>
                                            <div>
                                                <label style={{ fontWeight: "bold", marginRight: "20px" }}>Nguyễn Minh Nhân</label>
                                                <span>29/03/2024</span>
                                            </div>
                                            <div>Comment input</div>
                                        </div>
                                        <EnterOutlined className='comment-reply' />
                                    </div>
                                </div>
                                <div className='conment-Children'>
                                    <hr></hr>
                                    <div className='comment-element' >
                                        <Avatar></Avatar>
                                        <div className='comment-body'>
                                            <div>
                                                <label>Nguyễn Minh Nhân children</label>
                                                <span>29/03/2024</span>
                                            </div>
                                            <div>Comment input</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </>



    );
};



export default ViewDocument