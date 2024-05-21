import React, { useState } from 'react'
import TitleBody from "../../components/TitleBody";
import { Row, Col, Avatar, Image, Typography, Input } from 'antd';
import { FaUserEdit } from "react-icons/fa";
import './style.scss'
import { Tabs } from 'antd';
import { Table } from 'antd';
import SignatureUpload from '../../components/SignatureUpload';
import { useSelector } from 'react-redux';
const { TabPane } = Tabs;

const SystemEmployee = () => {

    const user = useSelector((state) => state.user.value)
    const [isOpen, setIsOpen] = useState(false)
    const [switchTab, setSwitchTab] = useState(false)

    const renderTabLabel = (Icon, label1) => (
        < div className='SystemEmployee__Container'>
            <Row>asdasd</Row>
            <Icon />
            <span>{label1}</span>

        </div>
    );
    const columnsAddition = [
        {
            title: 'Contract type',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'From',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'To',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Signing date',
            key: 'tags',
            dataIndex: 'tags',

        },
        {
            title: 'Subject',
            key: 'tags',
            dataIndex: 'tags',

        },
        {
            title: 'Department	',
            key: 'tags',
            dataIndex: 'tags',

        },
        {
            title: 'Note',
            key: 'tags',
            dataIndex: 'tags',

        },

    ];

    const columnsFamily = [

        {
            title: 'Contact name',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Birth day',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Relationship',
            key: 'tags',
            dataIndex: 'tags',

        },
        {
            title: 'Note',
            key: 'tags',
            dataIndex: 'tags',

        },
        {
            title: 'Subject',
            key: 'tags',
            dataIndex: 'tags',

        },

    ];
    const columnsProperties = [

        {
            title: 'Title',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Description',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Information',
            key: 'tags',
            dataIndex: 'tags',

        },
        {
            title: 'Status',
            key: 'tags',
            dataIndex: 'tags',

        },
        {
            title: 'Note',
            key: 'tags',
            dataIndex: 'tags',

        },

    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },

    ];

    const handleSwitchTable = (key) => {
        if (key === "5") {
            setIsOpen(true)
            setSwitchTab(true)
        }
        else {
            setIsOpen(false)
            setSwitchTab(false)
        }
    }

    return (
        <div className='SystemEmployee'>
            <Row className='SystemEmployee__Header'>
                <TitleBody href={"/setting"} isSysTemEmployee={true} />
            </Row>
            <Row className='SystemEmployee__User'>
                <Col className='SystemEmployee__Avatar'>
                    <Avatar src="/logo192.png"
                        size={{
                            xs: 40,
                            sm: 60,
                            md: 80,
                            lg: 100,
                            xl: 100,
                            xxl: 100,
                        }}
                    />
                </Col>
                <Col className='SystemEmployee__UserName'>
                    <Typography.Paragraph>{user?.Username}</Typography.Paragraph>
                </Col>
                <Col className='SystemEmployy__EditIcon'>
                    <FaUserEdit />
                </Col>
            </Row>
            <Row className='SystemEmployee__Tabs'>
                <Tabs defaultActiveKey="1" onChange={handleSwitchTable}>
                    <TabPane
                        tab={'Overview'}
                        key="1"
                    >
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Login</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Email</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Employee number</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>First name</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input disabled size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Last name</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Sex</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Birth day</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Job title</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Position</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Company</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Unit</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Function</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Department</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Sections/Teams</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Groups</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Office location</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Line Manager</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Belong to departments</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Cost Center</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Rank</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Employee type</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Rights</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane
                        tab={'Additional'}
                        key="2"
                    >
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Nation</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Phone</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>ID card number</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Date of ID card</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Place of ID card</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Health insurance</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Starting date</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Starting date offical</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Leaving date</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        < div className='SystemEmployee__Container'>
                            <Row className='SystemEmployee__Title'>Literacy</Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Academic level</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Specialized qualification</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                        </div>
                        < div className='SystemEmployee__Container'>
                            <Row className='SystemEmployee__Title'>Contact Info</Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Business phone</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Home phone</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>Personal email</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                        </div>
                        < div className='SystemEmployee__Container'>
                            <Row className='SystemEmployee__Title'>Bank account</Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                        </div>
                        < div className='SystemEmployee__Container'>
                            <Row className='SystemEmployee__Title'>Address</Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                        </div>

                        <div className='SystemEmployee__Table' >
                            <Row className='SystemEmployee__Title'>Contract</Row>
                            <Row>
                                <Table
                                    pagination={false}
                                    style={{ width: '100%' }} // Thiết lập chiều rộng của bảng
                                    columns={columnsAddition} dataSource={data} />
                            </Row>
                        </div>
                    </TabPane>
                    <TabPane
                        tab={'Family'}
                        key="3"
                    >
                        <Row className='SystemEmployee__TabElement'>
                            <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                            <Col xs={16} md={18} lg={18}>
                                <Input size="large" className='SystemEmployee__Input' />
                            </Col>
                        </Row>
                        < div className='SystemEmployee__Container'>
                            <Row className='SystemEmployee__Title'>Address</Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>

                        </div>
                        < div className='SystemEmployee__Container'>
                            <Row className='SystemEmployee__Title'>Address</Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                            <Row className='SystemEmployee__TabElement'>
                                <Col xs={8} md={6} lg={4} className='SystemEmployee__Label'>asdasdsad</Col>
                                <Col xs={16} md={18} lg={20}>
                                    <Input size="large" className='SystemEmployee__Input' />
                                </Col>
                            </Row>
                        </div>
                        <div className='SystemEmployee__Table'>
                            <Row className='SystemEmployee__Title'>Contract</Row>
                            <Row>
                                <Table
                                    locale={{ emptyText: 'There are no properties information' }}
                                    pagination={false}
                                    style={{ width: '100%' }} // Thiết lập chiều rộng của bảng
                                    columns={columnsProperties} dataSource={""} />
                            </Row>
                        </div>
                    </TabPane>
                    <TabPane
                        tab={'Properties'}
                        key="4"
                    >
                        <div className='SystemEmployee__TableTab4'>
                            <Row className='SystemEmployee__Title'>Contract</Row>
                            <Row>
                                <Table
                                    locale={{ emptyText: 'There are no properties information' }}
                                    pagination={false}
                                    style={{ width: '100%' }} // Thiết lập chiều rộng của bảng
                                    columns={columnsProperties} dataSource={""} />
                            </Row>
                        </div>
                        <div className='SystemEmployee__TableTab4'>
                            <Row className='SystemEmployee__Title'>Contract</Row>
                            <Row>
                                <Table
                                    locale={{ emptyText: 'There are no properties information' }}
                                    pagination={false}
                                    style={{ width: '100%' }} // Thiết lập chiều rộng của bảng
                                    columns={columnsProperties} dataSource={""} />
                            </Row>
                        </div>
                        <div className='SystemEmployee__TableTab4'>
                            <Row className='SystemEmployee__Title'>Contract</Row>
                            <Row>
                                <Table
                                    locale={{ emptyText: 'There are no properties information' }}
                                    pagination={false}
                                    style={{ width: '100%' }} // Thiết lập chiều rộng của bảng
                                    columns={columnsProperties} dataSource={""} />
                            </Row>
                        </div>
                        <div className='SystemEmployee__TableTab4'>
                            <Row className='SystemEmployee__Title'>Contract</Row>
                            <Row>
                                <Table
                                    locale={{ emptyText: 'There are no properties information' }}
                                    pagination={false}
                                    style={{ width: '100%' }} // Thiết lập chiều rộng của bảng
                                    columns={columnsProperties} dataSource={""} />
                            </Row>
                        </div>
                        <div className='SystemEmployee__TableTab4'>
                            <Row className='SystemEmployee__Title'>Contract</Row>
                            <Row>
                                <Table
                                    locale={{ emptyText: 'There are no properties information' }}
                                    pagination={false}
                                    style={{ width: '100%' }} // Thiết lập chiều rộng của bảng
                                    columns={columnsProperties} dataSource={""} />
                            </Row>
                        </div>
                    </TabPane>
                    <TabPane
                        tab={'Signature'}
                        key="5"
                    >
                        <Row>
                            <Col span={8} offset={8} style={{ textAlign: "center" }}>
                                <SignatureUpload isOpen={isOpen} switchTab={switchTab} />
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </Row>
        </div>
    )
}

export default SystemEmployee