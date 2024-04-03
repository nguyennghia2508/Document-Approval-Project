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
import { useNavigate } from 'react-router-dom';
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
    const user = useSelector((state) => state.user.value)
    const departments = useSelector((state) => state.department.value)


    const [departmentData, setDepartmentData] = useState([]);

    const [sectionOptions, setSectionOptions] = useState([]);
    const [unitOptions, setUnitOptions] = useState([]);
    const [categoryData, setCategoryData] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([])
    const [documentTypeOptions, setDocumentTypeOptions] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('Select Department');
    const [selectedSection, setSelectedSection] = useState('Select Section');
    const [selectedUnit, setSelectedUnit] = useState('Select Unit');
    const [selectedCategory, setSelectedCategory] = useState('Choose category');
    const [selectedDocumentType, setSelectedDocumentType] = useState('Choose document type');
    const [initialCategorySet, setInitialCategorySet] = useState(false);
    const [userData, setUserData] = useState([])

    const department = departments
        .filter(value => value.DepartmentLevel === 1)
        .map(value => ({
            value: value.Id,
            label: value.DepartmentName
        }));



    const handleUnitChange = (value) => {
        setSelectedUnit(value);
    };


    const handleCategoryChange = (value) => {
        setSelectedCategory(value);

    };

    const handleDocumentTypeChange = (value) => {
        setSelectedDocumentType(value);
    };


    const onSubmit = async (data) => {

    };
    const [showCommentInput, setShowCommentInput] = useState(false);
    const handleToggleCommentInput = () => {
        setShowCommentInput(!showCommentInput);
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
                                <InputText label="Applicant" id="applicant" name="applicant" disabled={true} defaultValue={user.Username} control={control} />
                            </div>
                            <div className='viewInput-element'>
                                <InputSelection label="Department" id="department" name="department" value={selectedDepartment} control={control} options={department} disabled={true} required />
                            </div>
                            <div className='viewInput-element'>
                                <InputSelection label="Section" id="section" name="section" value={selectedSection} control={control} options={sectionOptions} disabled={true} required />
                            </div>
                            <div className='viewInput-element'>
                                <InputSelection label="Unit" id="unit" name="unit" value={selectedUnit} control={control} onChange={handleUnitChange} options={unitOptions} disabled={true} required />
                            </div>

                        </div >
                        <div className='viewInput-bot'>
                            <div className='viewInput-element'>
                                <InputSelection label="Categories" id="category" name="category" control={control} value={selectedCategory} onChange={handleCategoryChange} options={categoryOptions} disabled={true} required />
                            </div>
                            <div className='viewInput-element'>
                                <InputSelection label="Document Type" id="documentType" name="documentType" control={control} value={selectedDocumentType} onChange={handleDocumentTypeChange} options={documentTypeOptions} disabled={true} required />
                            </div>
                            <div className='viewInput-element'>
                                <InputSearch label="Related Proposal (if any)" id="proposal" name="proposal" disabled={true} control={control} />
                            </div>
                            <div className='viewInput-element'>
                                <InputText label="Date" name="date" control={control} required disabled={true} />

                            </div>

                        </div >
                    </div >
                    <div className='viewDocument'>
                        <div className='viewDocument-subject'>
                            <InputText label="Subject" id="subject" name="subject" control={control} disabled={true} />
                        </div>
                        <div className='viewDocument-content'>
                            <InputText label="Content summary" id="content" name="content" control={control} disabled={true} />
                        </div>
                        <div className='viewDocument-approve'>
                            <label>Documents to be approved/signed</label>

                        </div>
                        <div className='viewDocument-reference'>
                            <label>Documents for reference</label>

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
                    <PersonApproved></PersonApproved>

                    {/* <div className='approval-email' style={{ paddingBottom: "20px" }}>
                        <ButtonSelect id="approvers" name="approvers" control={control} data={userData} setValue={setValue} labelName="A" />
                    </div> */}
                    <label className='label' style={{ fontWeight: "bold", }}>Signers/Seal (if any)</label>
                    <PersonApproved></PersonApproved>
                    {/* <div className='sign-email'>
                        <ButtonSelect id="signers" name="signers" control={control} data={userData} setValue={setValue} labelName="S" />
                    </div> */}

                </div>

            </form >
            <form >
                <div className='comment'>
                    <div className='commentInput'>
                        <label className='commentInput-label'><CommentOutlined />Comment</label>

                        {!showCommentInput && <CommentInput showCancelButton={false} control={control} />}
                    </div>


                    <div className="commentShow">
                        <div className='commentGroup'>
                            <div className='commentParent'>
                                <hr></hr>
                                <div className='comment-element' >
                                    <Avatar className='comment-avarta'></Avatar>
                                    <div className='comment-body'>
                                        <div>
                                            <label className='comment-bodyTitle' >Nguyễn Minh Nhân</label>
                                            <span>29/03/2024</span>
                                        </div>
                                        <div>Comment input</div>
                                    </div>

                                    <EnterOutlined className='comment-reply' onClick={handleToggleCommentInput} />
                                </div>
                            </div>
                            <div className='conment-Children'>
                                {showCommentInput && <CommentInput onCancel={handleToggleCommentInput} showCancelButton={true} control={control} />}
                            </div>

                            <div className='conment-Children'>
                                <hr></hr>
                                <div className='comment-element' >
                                    <Avatar></Avatar>
                                    <div className='comment-body'>
                                        <div>
                                            <label className='comment-bodyTitle'>Nguyễn Minh Nhân children</label>
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
            </form>

        </>



    );
};



export default ViewDocument