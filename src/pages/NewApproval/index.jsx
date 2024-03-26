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




const New = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        control 
    } = useForm({ mode: "all" });

    const onSubmit = (data) => {
        console.log('submit data', data); // Dữ liệu form được gửi
    };

    const [username, setUsername] = useState('');
    const [departmentData, setDepartmentData] = useState([]);
    const [sectionOptions, setSectionOptions] = useState([]);
    const [unitOptions, setUnitOptions] = useState([]);

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

    const handleUsernameChange = (e) => {
        console.log(e.target)
        setUsername(e.target.value);
    };

    const [selectedDepartment, setSelectedDepartment] = useState('Select Department');
    const [selectedSection, setSelectedSection] = useState('Select Section');
    const [selectedUnit, setSelectedUnit] = useState('Select Unit');

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

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TitleBody label="eDocument Approval" isForm={true} isApproval={false} href={"/avn/documentapproval"} />
                <div className='newapproval-container'>
                    <div className="new-title"><h1 style={{ textAlign: 'center' }}>DOCUMENT APPROVAL</h1></div>
                    <div className='input'>
                        <div className='input-top'>
                            <div className='input-element'>
                                <InputText label="Applicant" id="applicant" name="applicant" control={control}/>
                            </div>
                            <div className='input-element'>
                                <InputSelection label="Department" value={selectedDepartment} onChange={handleDepartmentChange} options={department} required />
                            </div>
                            <div className='input-element'>
                                <InputSelection label="Section" value={selectedSection} onChange={handleSectionChange} options={sectionOptions} required />
                            </div>
                            <div className='input-element'>
                                <InputSelection label="Unit" value={selectedUnit} onChange={handleUnitChange} options={unitOptions} required />
                            </div>

                        </div>
                        <div className='input-bot'>
                            <div className='input-element'>
                                <InputSelection label="Categories" value={selectedOption} onChange={handleSelectionChange} options={selectionOptions} required />
                            </div>
                            <div className='input-element'>
                                <InputSelection label="Document Type" value={selectedOption} onChange={handleSelectionChange} options={selectionOptions} required />
                            </div>
                            <div className='input-element'>
                                <InputSearch label="Related Proposal (if any)" />
                            </div>
                            <div className='input-element'>
                                <InputText label="Date" value={username} onChange={handleUsernameChange} required disabled={true} />
                            </div>

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