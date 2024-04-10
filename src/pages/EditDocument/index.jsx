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
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from './data';
import FileUpload from '../../components/FileUpload';
import ButtonSelect from '../../components/ButtonSelect';
import categoryApi from '../../api/categoryApi';
import userApi from '../../api/userApi';
import Loading from "../../components/Loading";


const EditDocument = () => {
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
    const { id } = useParams();
    const urlBE = "https://localhost:44389"

    const [sectionOptions, setSectionOptions] = useState([]);
    const [unitOptions, setUnitOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([])
    const [documentTypeOptions, setDocumentTypeOptions] = useState([]);
    const [dataDocument, setDataDocument] = useState([])
    const [selectedApplicant, setSelectedApplicant] = useState("")
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDocumentType, setSelectedDocumentType] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedSubject, setSelectedSubject] = useState(null)
    const [selectedContent, setSelectedContent] = useState(null)

    const [categoryData, setCategoryData] = useState(null);
    const [initialCategorySet, setInitialCategorySet] = useState(false);

    const [userData, setUserData] = useState([])

    const [selectedFilesApproved, setSelectedFilesApproved] = useState([])
    const [selectedFileReference, setSelectedFileReference] = useState([])
    const [approvers, setApprovers] = useState([])
    const [signers, setSigners] = useState([])


    const [isLoading, setIsLoading] = useState(false);




    useEffect(() => {
        const getDocument = async () => {
            try {
                const data = await documentApprovalApi.getEditDocumentById(id, user.Id)
                setIsLoading(true)

                const document = data.document
                const files = data.files
                setDataDocument(data.document)
                setSelectedApplicant(document.ApplicantName)
                setSelectedDepartment(document.DepartmentId)
                setSelectedCategory(document.CategoryId)
                setSelectedDate(document.CreateDate)
                setSelectedSubject(document.Subject)
                setSelectedContent(document.ContentSum)

                const selectedFilesApproved = files.filter(file => file.DocumentType === 1);
                setSelectedFilesApproved(selectedFilesApproved);

                const selectedFilesReference = files.filter(file => file.DocumentType === 2);
                setSelectedFileReference(selectedFilesReference);

                const listApprover = data.persons.filter(value => value.PersonDuty === 1);
                setApprovers(listApprover)

                const listSigner = data.persons.filter(value => value.PersonDuty === 2);
                setSigners(listSigner)
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
                    // setIsLoading(false)
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
                } else {
                    if (!initialCategorySet) {
                        const initialSelectedCategory = categoryData.length > 0 && selectedCategory !== null ? selectedCategory : categoryData[0].Id;
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
    }, [selectedCategory, categoryData, initialCategorySet, setValue]);


    const handleCategoryChange = (value) => {
        setSelectedCategory(value);

    };

    const handleDocumentTypeChange = (value) => {
        setSelectedDocumentType(value);
    };

    useEffect(() => {
        if (selectedDepartment) {
            setSelectedSection(dataDocument.SectionId)
            const existDepartment = departments.find(department => department.Id === selectedDepartment);
            if (existDepartment) {
                const sections = (existDepartment.Children || [])
                    .filter(child => child.DepartmentLevel === 2)
                    .map(section => ({
                        value: section.Id,
                        label: section.DepartmentName
                    }));
                setSectionOptions(sections);
            } else {
                setSectionOptions([]);
            }
        }
    }, [selectedDepartment, departments]);

    useEffect(() => {
        if (selectedSection) {
            setSelectedUnit(dataDocument.UnitId)
            const existSection = departments
                .flatMap(department => department.Children || [])
                .find(section => section.Id === selectedSection);
            if (existSection) {
                const units = (existSection.Children || [])
                    .filter(unit => unit.DepartmentLevel === 3)
                    .map(unit => ({
                        value: unit.Id,
                        label: unit.DepartmentName
                    }));
                setUnitOptions(units);
            } else {
                setUnitOptions([]);
            }
        }
    }, [selectedSection]);

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            const firstErrorMessage = Object.values(errors)[0].message;
            toast.error(firstErrorMessage);
        }
    }, [errors]);

    const onSubmit = async (data) => {
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
                Index: value.Index,
                ApprovalPersonId: value.selectedOption,
                ApprovalPersonName: value.userName,
                PersonDuty: value.PersonDuty,
                DocumentApprovalId: value.DocumentApprovalId,
            })),
            signers: data.signers.map(value => ({
                Index: value.Index,
                ApprovalPersonId: value.selectedOption,
                ApprovalPersonName: value.userName,
                PersonDuty: value.PersonDuty,
                DocumentApprovalId: value.DocumentApprovalId,
            }))
        };

        formData.append('ApprovalPerson', JSON.stringify(approvalPerson));
        const res = await documentApprovalApi.editDocumentApproval(dataDocument.Id, formData);
        if (res.state === "true") {
            const dc = res.dc
            if (dc.IsDraft) {
                navigate(`/avn/documentapproval/edit/${dc.Id}`)
            }
            else {
                navigate(`/avn/documentapproval/view/${dc.Id}`)
            }
        }
    };

    return (
        <>
            {isLoading ? <Loading /> :
                <>
                    <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)} >
                        <TitleBody
                            currentUser={user}
                            dataDocument={dataDocument}
                            label="eDocument Approval"
                            isForm={true}
                            isApproval={false}
                            setValueInput={setValue}
                            onSubmit={handleSubmit(onSubmit)}
                            href={"/avn/documentapproval"}
                        />
                        <div className='viewApproval-container '>
                            <div className="viewtitle">
                                <div className='viewtitle-status'>
                                </div>
                                <h1 >DOCUMENT APPROVAL</h1></div>
                            <div className='viewInput'>
                                <div className='viewInput-top'>
                                    <div className='viewInput-element'>
                                        <InputText label="Applicant"
                                            setValue={setValue}
                                            selectedApplicant={selectedApplicant}
                                            value={selectedApplicant}
                                            id="applicant" name="applicant"
                                            disabled={true} control={control} />
                                    </div>
                                    <div className='viewInput-element'>
                                        <InputSelection label="Department"
                                            id="department"
                                            name="department"
                                            value={selectedDepartment}
                                            control={control}
                                            onChange={handleDepartmentChange}
                                            setValue={setValue}
                                            options={department}
                                            disabled={false}
                                            required />
                                    </div>
                                    <div className='viewInput-element'>
                                        <InputSelection label="Section" id="section" name="section" setValue={setValue} value={selectedSection} control={control} onChange={handleSectionChange} options={sectionOptions} disabled={false} required />
                                    </div>
                                    <div className='viewInput-element'>
                                        <InputSelection label="Unit" id="unit" name="unit" setValue={setValue} value={selectedUnit} control={control} onChange={handleUnitChange} options={unitOptions} disabled={false} required />
                                    </div>

                                </div >
                                <div className='viewInput-bot'>
                                    <div className='viewInput-element'>
                                        <InputSelection label="Categories" id="category" name="category" control={control} value={selectedCategory} onChange={handleCategoryChange} options={categoryOptions} disabled={false} required />
                                    </div>
                                    <div className='viewInput-element'>
                                        <InputSelection label="Document Type" id="documentType" name="documentType" control={control} value={selectedDocumentType} onChange={handleDocumentTypeChange} options={documentTypeOptions} disabled={false} required />
                                    </div>
                                    <div className='viewInput-element'>
                                        <InputSearch label="Related Proposal (if any)" id="proposal" name="proposal" disabled={false} control={control} />
                                    </div>
                                    <div className='viewInput-element'>
                                        <InputText label="Date" name="date" selectedDate={selectedDate && moment(selectedDate).format("DD/MM/YYYY")} control={control} required disabled={true} />

                                    </div>

                                </div >
                            </div >
                            <div className='viewDocument'>
                                <div className='viewDocument-subject'>
                                    <InputText setValue={setValue} label="Subject" id="subject" name="subject" value={selectedSubject} control={control} />
                                </div>
                                <div className='viewDocument-content'>
                                    <InputText setValue={setValue} label="Content summary" id="content" name="content" value={selectedContent} control={control} />
                                </div>
                                <div className='viewDocument-approve'>
                                    <FileUpload DocumentType={1} maxSize={50} label="Documents to be approved/signed" id="approve" name="approve"
                                        setValue={setValue} control={control} type="primary"
                                        files={selectedFilesApproved}
                                    />
                                </div>
                                <div className='viewDocument-reference'>
                                    <FileUpload DocumentType={2} maxSize={50} label="Documents for reference" id="reference" name="reference"
                                        setValue={setValue} control={control} type="primary"
                                        files={selectedFileReference}
                                    />
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
                                <ButtonSelect id="approvers" DocumentApprovalId={dataDocument?.DocumentApprovalId} PersonDuty={1} name="approvers" listPerson={approvers && approvers} control={control} data={userData && userData} setValue={setValue} labelName="A" />
                            </div>
                            <label className='label' style={{ fontWeight: "bold", }}>Signers/Seal (if any)</label>

                            <div className='sign-email'>
                                <ButtonSelect id="signers" DocumentApprovalId={dataDocument?.DocumentApprovalId} PersonDuty={2} name="signers" listPerson={signers && signers} control={control} data={userData && userData} setValue={setValue} labelName="S" />
                            </div>
                        </div>

                    </form >

                </>
            }
        </>

    );
};



export default EditDocument