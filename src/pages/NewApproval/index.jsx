// import React from 'react'
import InputText from '../../components/InputText'
import InputSelection from '../../components/InputSelection'
import InputSearch from '../../components/InputSearch'
import React, { useEffect, useState } from 'react';
import './style.scss'
import FileUpload from '../../components/FileUpload';
import { Divider } from 'antd';
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
import Loading from "../../components/Loading";



const New = () => {
    const {
        register,
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
    const [isLoading, setIsLoading] = useState(true);

    const department = departments
        .filter(value => value.DepartmentLevel === 1)
        .map(value => ({
            value: value.Id,
            label: value.DepartmentName
        }));


    const handleDepartmentChange = (value) => {

        setSelectedDepartment(value);
        setSelectedSection('Select Section');
        setSelectedUnit('Select Unit');
        setUnitOptions([])
        setValue("section", undefined)
        setValue("unit", undefined)

        const selectedDepartment = departments.find(department => department.Id === value);
        if (selectedDepartment) {
            const sections = (selectedDepartment.Children || [])
                .filter(child => child.DepartmentLevel === 2)
                .map(section => ({
                    value: section.Id,
                    label: section.DepartmentName
                }));
            setSectionOptions(sections);
        } else {
            setSectionOptions([]);
        }
    };

    const handleSectionChange = (value) => {
        setSelectedSection(value);
        setSelectedUnit('Select Unit');
        setUnitOptions([])
        setValue("unit", undefined)

        const selectedSection = departments
            .flatMap(department => department.Children || [])
            .find(section => section.Id === value);
        if (selectedSection) {
            const units = (selectedSection.Children || [])
                .filter(unit => unit.DepartmentLevel === 3)
                .map(unit => ({
                    value: unit.Id,
                    label: unit.DepartmentName
                }));
            setUnitOptions(units);
        } else {
            setUnitOptions([]);
        }
    };

    const handleUnitChange = (value) => {
        setSelectedUnit(value);
    };

    useEffect(() => {
        const getCategory = async () => {
            try {
                if (!categoryData) {

                    const data = await categoryApi.getAllCategory();

                    const listCategory = data.listDocumentType;
                    setCategoryOptions(listCategory.map(value => ({
                        value: value.Id,
                        label: value.CategoryName
                    })));
                    setCategoryData(listCategory);
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
                } else {
                    if (!initialCategorySet) {
                        const initialSelectedCategory = categoryData.length > 0 ? categoryData[0].Id : null;
                        setSelectedCategory(initialSelectedCategory);
                        setInitialCategorySet(true);
                        setValue("category", initialSelectedCategory)
                    } else {
                        const selectedCategoryObject = categoryData.find(item => item.Id === selectedCategory);
                        const documentType = selectedCategoryObject?.Children.map(dctype => ({
                            value: dctype.Id,
                            label: dctype.DocumentTypeName
                        })) || [];
                        setDocumentTypeOptions(documentType);
                        if (documentType.length > 0) {
                            setSelectedDocumentType(documentType[0].value);
                            setValue("documentType", documentType[0].value)
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        getCategory();
    }, [selectedCategory, categoryData, initialCategorySet]);

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);

    };

    const handleDocumentTypeChange = (value) => {
        setSelectedDocumentType(value);
    };



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

    const defaultDate = moment().format('YYYY-MM-DDTHH:mm:ss')

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            const firstErrorMessage = Object.values(errors)[0].message;
            toast.error(firstErrorMessage);
        }
    }, [errors]);

    const onSubmit = async (data) => {
        data.date = defaultDate;
        const formData = new FormData();
        const dataObject = {
            ApplicantId: user.Id,
            ApplicantName: data.applicant,
            CategoryId: data.category,
            DocumentTypeId: data.documentType,
            DepartmentId: data.department,
            SectionId: data.section,
            UnitId: data.unit,
            RelatedProposal: data.proposal,
            CreateDate: data.date,
            Subject: data.subject,
            ContentSum: data.content,
            IsDraft: data.IsDraft,
        };

        formData.append("Data", JSON.stringify(dataObject));

        if (data.approve && data.approve.length > 0) {
            for (let i = 0; i < data.approve.length; i++) {
                formData.append('approve', data.approve[i]);
            }
        }
        if (data.reference && data.reference.length > 0) {
            for (let i = 0; i < data.reference.length; i++) {
                formData.append('reference', data.reference[i]);
            }
        }

        const approvalPerson = {
            approvers: data.approvers.map(value => ({
                ApprovalPersonId: value.selectedOption,
                ApprovalPersonName: value.userName,
                ApprovalPersonEmail: value.email,
                PersonDuty: value.PersonDuty
            })),
            signers: data.signers.map(value => ({
                ApprovalPersonId: value.selectedOption,
                ApprovalPersonName: value.userName,
                ApprovalPersonEmail: value.email,
                PersonDuty: value.PersonDuty,
            }))
        };

        formData.append('ApprovalPerson', JSON.stringify(approvalPerson));
        const res = await documentApprovalApi.addDocumentApproval(formData);
        if (res.state === "true") {
            const dc = res.dc
            if (dc.IsDraft) {
                toast.success(res.message);
                navigate(`/avn/documentapproval/edit/${dc.Id}`)
            }
            else {
                toast.success(res.message);
                navigate(`/avn/documentapproval/view/${dc.Id}`)
            }
        }

    };


    return (
        <>
            {isLoading ? <Loading /> :

                <>
                    <form encType="multipart/form-data">
                        <TitleBody label="eDocument Approval"
                            setValueInput={setValue}
                            onSubmit={handleSubmit(onSubmit)}
                            isForm={true}
                            isApproval={false}
                            href={"/avn/documentapproval"}
                        />
                        <div className='newapproval-container'>
                            <div className="new-title"><h1 style={{ textAlign: 'center' }}>DOCUMENT APPROVAL</h1></div>
                            <div className='input'>
                                <div className='input-top'>
                                    <div className='input-element'>
                                        <InputText label="Applicant" id="applicant" name="applicant" disabled={true} defaultValue={user.Username} control={control} />
                                    </div>
                                    <div className='input-element'>
                                        <InputSelection label="Department" id="department" name="department" value={selectedDepartment} control={control} onChange={handleDepartmentChange} options={department} required />
                                    </div>
                                    <div className='input-element'>
                                        <InputSelection label="Section" id="section" name="section" value={selectedSection} control={control} onChange={handleSectionChange} options={sectionOptions} required />
                                    </div>
                                    <div className='input-element'>
                                        <InputSelection label="Unit" id="unit" name="unit" value={selectedUnit} control={control} onChange={handleUnitChange} options={unitOptions} required />
                                    </div>

                                </div >
                                <div className='input-bot'>
                                    <div className='input-element'>
                                        <InputSelection label="Categories" id="category" name="category" control={control} value={selectedCategory} onChange={handleCategoryChange} options={categoryOptions} required />
                                    </div>
                                    <div className='input-element'>
                                        <InputSelection label="Document Type" id="documentType" name="documentType" control={control} value={selectedDocumentType} onChange={handleDocumentTypeChange} options={documentTypeOptions} required />
                                    </div>
                                    <div className='input-element'>
                                        <InputSearch label="Related Proposal (if any)" id="proposal" name="proposal" control={control} />
                                    </div>
                                    <div className='input-element'>
                                        <InputText label="Date" defaultValue={moment(defaultDate).format('DD/MM/YYYY')} name="date" control={control} required disabled={true} />

                                    </div>

                                </div >
                            </div >
                            <div className='document'>
                                <div className='subject'>
                                    <InputText label="Subject" id="subject" name="subject" control={control} />
                                </div>
                                <div className='content'>
                                    <InputText label="Content summary" id="content" name="content" control={control} />
                                </div>
                                <div className='approve-sign'>
                                    <FileUpload maxSize={50} label="Documents to be approved/signed" id="approve" name="approve"
                                        setValue={setValue} control={control} type="primary" />
                                </div>
                                <div className='reference'>
                                    <FileUpload maxSize={50} label="Documents for reference" id="reference" name="reference"
                                        setValue={setValue} control={control} type="primary" />
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
                                <ButtonSelect PersonDuty={1} id="approvers" name="approvers" control={control} data={userData && userData} setValue={setValue} labelName="A" />
                            </div>
                            <label className='label' style={{ fontWeight: "bold", }}>Signers/Seal (if any)</label>
                            <div className='sign-email'>
                                <ButtonSelect PersonDuty={2} id="signers" name="signers" control={control} data={userData && userData} setValue={setValue} labelName="S" />
                            </div>
                        </div>
                    </form >
                </>
            }

        </>
    );
};



export default New