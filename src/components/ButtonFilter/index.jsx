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
import { useSelector } from 'react-redux';

const ButtonFilter = ({
    onFilter,
}

) => {
    const {
        setValue,
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm({ mode: "all" });

    const navigate = useNavigate();

    const departments = useSelector((state) => state.department.value)
    const tabView = useSelector((state) => state.tabview.value)

    const [isOpen, setIsOpen] = useState(false);

    const [sectionOptions, setSectionOptions] = useState([]);
    const [unitOptions, setUnitOptions] = useState([]);
    const [documentTypeOptions, setDocumentTypeOptions] = useState([]);

    const [selectedDepartment, setSelectedDepartment] = useState('Select Department');
    const [selectedSection, setSelectedSection] = useState('Select Section');
    const [selectedUnit, setSelectedUnit] = useState('Select Unit');
    const [selectedCategory, setSelectedCategory] = useState('Choose category');
    const [selectedDocumentType, setSelectedDocumentType] = useState('Choose document type');
    const [initialCategorySet, setInitialCategorySet] = useState(false);
    const [userData, setUserData] = useState([])
    const [selectUser, setSelectUser] = useState("All")
    const [selectAuthor, setSelectAuthor] = useState("")
    const [selectAttoney, setSelectAttoney] = useState("")
    const [selectStatus, setSelectStatus] = useState("All requests")
    const [selectProcessingBy, setSelectProcessingBy] = useState("")
    const [requestcode, setRequestCode] = useState("")
    const [subject, setSubject] = useState("")

    const all = {
        value: "all",
        label: "All"
    }

    const status = [
        { value: "all", label: "All requests" },
        { value: 0, label: "Draft" },
        { value: 1, label: "Approving" },
        { value: 2, label: "Approved" },
        { value: 4, label: "Signed" },
        { value: 3, label: "Rejected" },
    ];

    const department = [];

    department.push({
        value: "all",
        label: "All"
    });

    department.push(...departments
        .filter(value => value.DepartmentLevel === 1)
        .map(value => ({
            value: value.Id,
            label: value.DepartmentName
        }))
    );

    useEffect(() => {
        const getDepartment = async () => {
            try {
                if (department.length > 0) {
                    setSelectedDepartment(department[0].value)
                }
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
                const options = [];
                options.unshift(all);

                listUser.forEach(item => {
                    options.push({
                        value: item.Id,
                        label: item.Username
                    })
                });

                if (options.length > 0) {
                    setSelectAuthor(options[0].value);
                    setSelectAttoney(options[0].value)
                    setSelectProcessingBy(options[0].value)
                }

                // Thêm giá trị "All" vào mảng options

                setValue("authorizer", options[0].value)
                setValue("attorney", options[0].value)
                setValue("processingby", options[0].value)
                setUserData(options)

            } catch (err) {
                console.log(err)
            }
        }
        getAllUser();
    }, []);

    useEffect(() => {
        const getCategory = async () => {
            try {
                const data = await categoryApi.getAllCategory();
                const listDocumentType = data.listDocumentType;
                const options = [];
                options.unshift(all);

                listDocumentType.forEach(category => {
                    // Duyệt qua từng documentType trong children của category
                    category.Children.forEach(documentType => {
                        // Thêm documentType vào mảng options
                        options.push({
                            value: documentType.Id,
                            label: documentType.DocumentTypeName
                        });
                    });
                });

                // Nếu mảng options không rỗng, chọn giá trị đầu tiên
                if (options.length > 0) {
                    setSelectedDocumentType(options[0].value);
                }

                // Thêm giá trị "All" vào mảng options

                setValue("documentType", options[0].value)

                // Cập nhật setDocumentTypeOptions với mảng options mới
                setDocumentTypeOptions(options);
            } catch (err) {
                console.log(err);
            }
        };
        getCategory();
    }, []);

    useEffect(() => {
        const handleReset = () => {
            if (!tabView.filter && tabView.switchTable) {
                reset();
                setRequestCode("");
                setSubject("")
                setSelectedDocumentType(documentTypeOptions[0]?.value)
                setSelectUser(userData[0]?.value);
                setSelectAuthor(userData[0]?.value);
                setSelectAttoney(userData[0]?.value);
                setSelectStatus(status[0]?.value);
                setSelectedDepartment(department[0]?.value)
                setSelectedSection("Select Section")
                setSelectedUnit("Select Unit")
                setSelectProcessingBy(userData[0]?.value);
            }
            const regex = /^status(\d+)$/;
            const match = tabView.tabName.match(regex);

            if (match) {
                // Lấy số cuối cùng từ tabView.TabName
                const tabIndexNumber = parseInt(match[1]);
                // Kiểm tra xem số cuối cùng có phù hợp với value của status không
                if (status.some(st => st.value === tabIndexNumber)) {
                    // Nếu có, in ra value của status tương ứng
                    setSelectStatus(status.find(st => st.value === tabIndexNumber).value);
                    setValue("status", status.find(st => st.value === tabIndexNumber).value)
                }
            }
        };
        handleReset()
    }, [tabView.tabName, tabView.filter])

    const handleDepartmentChange = (value) => {

        setSelectedDepartment(value);
        setSelectedSection('Select Section');
        setSelectedUnit('Select Unit');
        setUnitOptions([])

        const sections = []
        sections.push({
            value: "all",
            label: "All"
        });

        if (selectedDepartment === 'all') {
            setValue("section", sections[0].value)
            setValue("unit", undefined)
            setSelectedSection(sections[0].value)
        }
        else {
            setValue("section", undefined)
            setValue("unit", undefined)
        }

        const departmentData = departments.find(department => department.Id === value);
        if (departmentData) {
            sections.push(...(departmentData?.Children || [])
                .filter(child => child.DepartmentLevel === 2)
                .map(section => ({
                    value: section.Id,
                    label: section.DepartmentName
                })));
            setSelectedSection(sections[0].value)
            setSectionOptions(sections);

        } else {
            setSectionOptions([]);
        }
    };

    const handleSectionChange = (value) => {
        setSelectedSection(value);
        setSelectedUnit('Select Unit');

        const units = []
        units.push({
            value: "all",
            label: "All"
        });

        setUnitOptions([])

        if (selectedSection === 'all') {
            setValue("unit", units[0].value)
            setSelectedUnit(units[0].value)
        }
        else {
            setValue("unit", undefined)
        }

        const selectedData = departments
            .flatMap(department => department.Children || [])
            .find(section => section.Id === value);
        if (selectedData) {
            units.push(...(selectedData.Children || [])
                .filter(unit => unit.DepartmentLevel === 3)
                .map(unit => ({
                    value: unit.Id,
                    label: unit.DepartmentName
                })));
            setSelectedUnit(units[0].value)
            setUnitOptions(units);
        } else {
            setUnitOptions([]);
        }
    };

    const handleUnitChange = (value) => {
        setSelectedUnit(value);
    };

    const handleDocumentTypeChange = (value) => {
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

    const handleRequestCode = (value) => {
        setRequestCode(value)
    }

    const handleSubject = (value) => {
        setSubject(value)
    }

    const onSubmit = async (data) => {
        onFilter(data)
    };

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
                    <InputText label="Request Code" value={requestcode} handleOnChange={handleRequestCode} id="requestcode" name="requestcode" control={control} />
                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputSelection label="Document Type" id="documentType" name="documentType" control={control} value={selectedDocumentType} onChange={handleDocumentTypeChange} options={documentTypeOptions} required />
                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputText label="Subject" handleField={true} value={subject} handleOnChange={handleSubject} id="subject" name="subject" control={control} />
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
                    <InputText label="Authorization period" name="periodStart" control={control} type="datetime-local" required disabled={false} />
                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputText name="periodEnd" control={control} type="datetime-local" disabled={false} />
                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputSelection label="Applicant" id="applicant" name="applicant" control={control} value={selectUser} onChange={handleUserSelectChange} options={userData} required />
                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputSelection label="Department" defaultValue={department[0].value} id="department" name="department" value={selectedDepartment} control={control} onChange={handleDepartmentChange} options={department} required />

                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputSelection label="Section" id="section" name="section" value={selectedSection} control={control} onChange={handleSectionChange} options={sectionOptions} required disabled={selectedDepartment === "all" ? true : false} />

                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputSelection label="Unit" id="unit" name="unit" value={selectedUnit} control={control} onChange={handleUnitChange} options={unitOptions} required disabled={selectedDepartment === "all" ? true : selectedSection === "all" ? true : false} />

                </Menu.Item>

                <Menu.Item className="menu-animation" >
                    <InputSelection
                        defaultValue={status.some(status => status + 5 === tabView.tabIndex) ? status[tabView.Tabindex - 5].value : status[0].value}
                        label="Status" id="status" name="status"
                        value={selectStatus} control={control} onChange={handleStatusChange} options={status} required />
                </Menu.Item>
                <Menu.Item className="menu-animation" >
                    <InputSelection label="Processing by" id="processingBy" name="processingby" value={selectProcessingBy} control={control} onChange={handleProcessingBy} options={userData} required />
                </Menu.Item>
            </Menu>
        </form >

    );
    return (
        <Dropdown placement="bottomLeft" arrow trigger={['click']}>
            <Button>
                Dropdown <DownOutlined />
            </Button>
        </Dropdown>
    );

};

export default ButtonFilter;
