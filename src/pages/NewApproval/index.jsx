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
import moment from 'moment'




const New = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue
    } = useForm({ mode: "all" });

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

    useEffect(() => {


        const getDepartment = async () => {
            try {
                const data = await departmentApi.getAllDepartment()
                setDepartmentData(data.departmentHierarchy)
            } catch (err) {
                console.log(err)
            }
        }
        getDepartment();
    }, []);

    const department = departmentData
        .filter(value => value.DepartmentLevel === 1)
        .map(value => ({
            value: value.Id,
            label: value.DepartmentName
        }));


    const handleDepartmentChange = (value) => {

        setSelectedDepartment(value);
        setSelectedSection('Select Section');
        setSelectedUnit('Select Unit');
        setValue("section", undefined)
        setValue("unit", undefined)

        const selectedDepartment = departmentData.find(department => department.Id === value);
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
        setValue("unit", undefined)

        const selectedSection = departmentData
            .flatMap(department => department.Children || [])
            .find(section => section.Id === value);
        console.log("asdasd", selectedSection)
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



    const defaultDate = moment().format('YYYY-MM-DDTHH:mm:ss')

    const onSubmit = async (data) => {
        console.log(data)
        data.date = defaultDate;
        // const formData = new FormData();
        // const dataObject = {
        //     applicant: data.applicant,
        //     category: data.category,
        //     department: data.department,
        //     documentType: data.documentType,
        //     section: data.section,
        //     unit: data.unit
        //
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
        // const res = await  documentApprovalApi.addDocumentApproval(formData)
    };

    return (
        <>
            <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                <TitleBody label="eDocument Approval" isForm={true} isApproval={false} href={"/avn/documentapproval"} />
                <div className='newapproval-container'>
                    <div className="new-title"><h1 style={{ textAlign: 'center' }}>DOCUMENT APPROVAL</h1></div>
                    <div className='input'>
                        <div className='input-top'>
                            <div className='input-element'>
                                <InputText label="Applicant" id="applicant" name="applicant" control={control} />
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
                            <FileUpload label="Documents to be approved/signed" id="approve" name="approve" control={control} type="primary" />
                        </div>
                        <div className='reference'>
                            <FileUpload label="Documents for reference" id="reference" name="reference" control={control} type="primary" />
                        </div>
                        <div></div>
                    </div>
                    <Divider style={{
                        backgroundColor: 'GREY',
                        height: '3px',
                        margin: '20px 0',
                        border: 'none'
                    }} />

                </div >
                <div className='signapproval-container'>
                    <label className='label' style={{ fontWeight: "bold", }}>Aprover</label>
                    <div className='approval-email' style={{ paddingBottom: "20px" }}>
                        <ButtonSelect label1="ASD" label2="2132" />
                    </div>
                    <label className='label' style={{ fontWeight: "bold", }}>Aprover</label>

                    <div className='sign-email'>
                        <ButtonSelect label1="ASD" label2="2132" />
                    </div>
                </div>
                <button type="submit">submit</button>
            </form >
        </>



    );
};



export default New