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




const New = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "all" });

    const onSubmit = (data) => {
        console.log('submit data', data); // Dữ liệu form được gửi

    };

    const [username, setUsername] = useState('');
    const [departmentData, setDepartmentData] = useState([]);
    const [sectionOptions, setSectionOptions] = useState([]);
    const [unitOptions, setUnitOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([])
    const [documentTypeOptions, setDocumentTypeOptions] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('Select Department');
    const [selectedSection, setSelectedSection] = useState('Select Section');
    const [selectedUnit, setSelectedUnit] = useState('Select Unit');
    const [selectedCategory, setSelectedCategory] = useState('Choose category');
    const [selectedDocumentType, setSelectedDocumentType] = useState('Choose document type');

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
                const data = await categoryApi.getAllCategory()
                const listCategory = data.listDocumentType
                console.log("data listCategory", listCategory)

                setCategoryOptions(listCategory.map(value => ({
                    value: value.Id,
                    label: value.CategoryName
                })))
                if (listCategory.length > 0) {
                    const initialSelectedCategory = categoryOptions.length > 0 ? selectedCategory : listCategory[0].Id;
                    setSelectedCategory(initialSelectedCategory);
                    const selectedCategoryObject = listCategory.find(item => item.Id === initialSelectedCategory);
                    const documentType = selectedCategoryObject?.Children.map(dctype => ({
                        value: dctype.Id,
                        label: dctype.DocumentTypeName
                    })) || [];

                    setDocumentTypeOptions(documentType);
                    if (documentType.length > 0) {
                        setSelectedDocumentType(documentType[0].value)
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        getCategory();
    }, [selectedCategory]);

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);

    };

    const handleDocumentTypeChange = (value) => {
        setSelectedDocumentType(value);
    };





    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TitleBody label="eDocument Approval" isForm={true} isApproval={false} href={"/avn/documentapproval"} />
                <div className='newapproval-container'>
                    <div className="new-title"><h1 style={{ textAlign: 'center' }}>DOCUMENT APPROVAL</h1></div>
                    <div className='input'>
                        <div className='input-top'>
                            <div className='input-element'>
                                <InputText label="Applicant" id="applicant" name="applicant" control={control} />
                            </div>
                            <div className='input-element'>
                                <InputSelection label="Department" name="department" value={selectedDepartment} onChange={handleDepartmentChange} options={department} control={control} required />
                            </div>
                            <div className='input-element'>
                                <InputSelection label="Section" name="section" value={selectedSection} onChange={handleSectionChange} options={sectionOptions} control={control} required />
                            </div>
                            <div className='input-element'>
                                <InputSelection label="Unit" name="unit" value={selectedUnit} onChange={handleUnitChange} options={unitOptions} control={control} required />
                            </div>

                        </div>
                        <div className='input-bot'>
                            <div className='input-element'>
                                <InputSelection label="Categories" name="category" value={selectedCategory} onChange={handleCategoryChange} options={categoryOptions} control={control} required />
                            </div>
                            <div className='input-element'>
                                <InputSelection label="Document Type" name="documentType" value={selectedDocumentType} onChange={handleDocumentTypeChange} options={documentTypeOptions} control={control} required />
                            </div>
                            <div className='input-element'>
                                <InputSearch label="Related Proposal (if any)" />
                            </div>
                            {/* <div className='input-element'>
                                <InputText label="Date" type="date" value={selectedDate} name={selectedDate} onChange={handleDateChange} control={control} required />
                            </div> */}

                        </div>
                    </div>
                    <div className='document'>
                        {/* <div className='subject'>
                            <InputText label="Subject" value={username} onChange={handleUsernameChange} required placeho />
                        </div>
                        <div className='content'>
                            <InputText label="Content summary" value={username} onChange={handleUsernameChange} required />
                        </div> */}
                        <div className='approve-sign'>
                            <FileUpload label="Documents to be approved/signed" type="primary" />
                        </div>
                        <div className='reference'>
                            <FileUpload label="Documents for reference" type="primary" />

                        </div>

                    </div>
                    <Divider style={{
                        backgroundColor: 'GREY',
                        height: '3px',
                        margin: '20px 0',
                        border: 'none'
                    }} />

                </div>
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