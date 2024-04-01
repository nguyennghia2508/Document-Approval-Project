import { Dropdown, Button, Menu, DatePicker } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './style.scss';
import InputText from '../InputText';
import { useForm } from 'react-hook-form';
import InputSelection from '../InputSelection';// import React from 'react'
import React, { useEffect, useState } from 'react';
import departmentApi from '../../api/departmentApi';
import categoryApi from '../../api/categoryApi'
import documentApprovalApi from '../../api/documentApprovalApi'
import userApi from "../../api/userApi"
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import InputSearch from '../InputSearch';
const ButtonFilter = ({
    onFilter,
}

) => {
    const {

        data,
        setValue,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({ mode: "all" });
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
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
    const [disableSection, setDisableSection] = useState(true)
    const [disableUnit, setDisableUnit] = useState(true)
    const [selectUser, setSelectUser] = useState("All")
    const [selectAuthor, setSelectAuthor] = useState("")
    const [selectAttoney, setSelectAttoney] = useState("")
    const [selectStatus, setSelectStatus] = useState("")
    const [selectProcessingBy, setSelectProcessingBy] = useState("")

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

    useEffect(() => {
        const getAllUser = async () => {
            try {
                const data = await userApi.getAll()
                const listUser = data.listUser
                setUserData(listUser.map(item => ({

                    value: item.Id,
                    label: item.Username
                })
                ))

            } catch (err) {
                console.log(err)
            }
        }
        getAllUser();
    }, []);

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
        setUnitOptions([])
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
        setDisableSection(false)
    };

    const handleSectionChange = (value) => {
        setSelectedSection(value);
        setSelectedUnit('Select Unit');
        setUnitOptions([])
        setValue("unit", undefined)

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
        setDisableUnit(false)

    };

    const handleUnitChange = (value) => {
        setSelectedUnit(value);
    };



    const handleCategoryChange = (value) => {
        setSelectedCategory(value);

    };

    const handleDocumentTypeChange = (value) => {
        console.log("aaa", selectedDocumentType)
        setSelectedDocumentType(value);


    };

    const handleUserSelectChange = (value) => {
        setSelectUser(value)
    };
    const handleAuthorSelectChange = (value) => {
        setSelectAuthor(value)
    }
    const handleAttoneySelectChange = (value) => {
        setSelectAttoney(value)
    }
    const handleStatusChange = (value => {
        setSelectStatus(value)
    })
    const handleProcessingBy = (value) => {
        setSelectProcessingBy(value)
    }

    const defaultDate = moment().format('YYYY-MM-DDTHH:mm:ss')

    const onSubmit = async (data) => {
        // rCode, dType, subject, rProposal, createStart, createEnd, to, author, attoney, periodStart, periodEnd, applicant, depart, section, unit, status, procBy
        const rCode = data.requestcode
        const dType = documentTypeOptions.find(option => option.value === data.documentType)?.label;
        const subject = data.subject
        const rProposal = data.proposal
        const createStart = data.createStart
        const createEnd = data.createEnd
        const to = data.to
        const author = userData.find(option => option.value === data.authorizer)?.label;
        const attoney = userData.find(option => option.value === data.attorney)?.label;
        const periodStart = data.periodStart
        const periodEnd = data.periodEnd
        const applicant = userData.find(option => option.value === data.applicant)?.label;
        const depart = department.find(option => option.value === data.department)?.label;
        const section = sectionOptions.find(option => option.value === data.section)?.label;
        const unit = unitOptions.find(option => option.value === data.unit)?.label;
        const status = department.find(option => option.value === data.status)?.label;
        const procBy = department.find(option => option.value === data.processingby)?.label;


        onFilter(rCode, dType, subject, rProposal, createStart, createEnd, to, author, attoney, periodStart, periodEnd, applicant, depart, section, unit, status, procBy)


    };

    // const handleFilterData = () => {
    //     console.log("handle", labelOfDocumentType)
    // }





    const menu = (
        <form encType="multipart/form-data">
            <Menu className="buttonFilter-menu" mode="vertical" direction="rtl">
                <div className='buttonFilter-title'>
                    <label className='buttonFilter-title-left'>Filter</label>
                    <div className='buttonFilter-title-right' >
                        <a onClick={handleSubmit(onSubmit)} style={{ backgroundColor: "#5cb85c", color: "#fff" }}>Apply</a>
                        <a style={{ color: "#5cb85c" }}>Clear</a>

                    </div>
                </div>
                <hr />
                <Menu.Item className="menu-animation" >
                    <InputText label="Request Code" id="requestcode" name="requestcode" control={control} />
                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputSelection label="Document Type" id="documentType" name="documentType" control={control} value={selectedDocumentType} onChange={handleDocumentTypeChange} options={documentTypeOptions} required />
                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputText label="Subject" id="subject" name="subject" control={control} />
                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputSearch label="Related Proposal (if any)" id="proposal" name="proposal" control={control} />
                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputText label="Created" type="date" name="createStart" control={control} required disabled={false} />
                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputText type="date" name="createEnd" control={control} disabled={false} />
                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputText label="To" id="to" name="to" control={control} />

                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputSelection label="The Authorizer" filter={true} id="authorizer" name="authorizer" control={control} value={selectAuthor} onChange={handleAuthorSelectChange} options={userData} required />

                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputSelection label="The Attorney" filter={true} id="attorney" name="attorney" control={control} value={selectAttoney} onChange={handleAttoneySelectChange} options={userData} required />

                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputText label="Authorization period" name="periodStart" control={control} type="date" required disabled={false} />
                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputText name="periodEnd" control={control} type="date" disabled={false} />
                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputSelection label="Applicant" id="applicant" name="applicant" control={control} value={selectUser} onChange={handleUserSelectChange} options={userData} required />
                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputSelection label="Department" id="department" name="department" value={selectedDepartment} control={control} onChange={handleDepartmentChange} options={department} required />

                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputSelection label="Section" id="section" name="section" value={selectedSection} control={control} onChange={handleSectionChange} options={sectionOptions} required disabled={disableSection} />

                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputSelection label="Unit" id="unit" name="unit" value={selectedUnit} control={control} onChange={handleUnitChange} options={unitOptions} required disabled={disableUnit} />

                </Menu.Item>

                <Menu.Item className="menu-animation" >
                    <InputSelection label="Status" id="status" name="status" value={selectStatus} control={control} onChange={handleStatusChange} options={department} required />
                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputSelection label="Processing by" id="processingBy" name="processingby" value={selectProcessingBy} control={control} onChange={handleProcessingBy} options={department} required />
                </Menu.Item>
            </Menu>
        </form >

    );
    return (
        <Dropdown overlay={menu} placement="bottomLeft" arrow trigger={['click']} visible={isOpen} onVisibleChange={setIsOpen}>
            <Button>
                Dropdown <DownOutlined />
            </Button>
        </Dropdown>
    );

};

export default ButtonFilter;
