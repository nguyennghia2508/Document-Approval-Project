import React from 'react'
import { Col, Row, Image, Button } from 'antd';
import { Link } from 'react-router-dom';
import { FaUsers, FaUsersCog } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import './style.scss'
const Setting = () => {
    return (
        <Row className='Setting'>
            <Col md={24} xs={24} lg={18}>
                <Row className='Setting__Header'>System</Row>
                <Row >
                    <Col className='Setting__Element'>
                        <Link className='Setting__Link'>
                            <Row className='Setting__Title'>Organizational Structure</Row>
                            <Row className='Setting__Icon'>
                                <FaUsers />
                            </Row>
                        </Link>
                    </Col>
                    <Col className='Setting__Element' >
                        <Link className='Setting__Link'>
                            <Row className='Setting__Title'>Group Management</Row>
                            <Row className='Setting__Icon'>
                                <FaUsersCog />
                            </Row>
                        </Link>
                    </Col>
                    <Col className='Setting__Element'>
                        <Link to={'/setting/system/employee'} className='Setting__Link'>
                            <Row className='Setting__Title'>Personal</Row>
                            <Row className='Setting__Icon'>
                                <FaUser />
                            </Row>
                        </Link>
                    </Col>
                </Row>
            </Col >
            <Col lg={6}>
                <Row className='Setting__Header'>Integration</Row>
                <Row>
                    <Col className='Setting__Element'>
                        <Link className='Setting__Link'>
                            <Row className='Setting__Title'>Office 365</Row>
                            <Row className='Setting__Office'>
                                <Image className='Setting_Image' src='./office-365.svg'></Image>
                                <Button className='Setting__Button'>On</Button>
                            </Row>
                        </Link>
                    </Col>
                </Row>
            </Col>
        </Row >
    )
}

export default Setting