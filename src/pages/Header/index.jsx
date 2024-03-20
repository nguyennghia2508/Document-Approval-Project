import './index.scss'
import React from 'react'
import { MenuOutlined, UserOutlined, SettingOutlined, BellOutlined, QuestionOutlined } from '@ant-design/icons';
import { Col, Row, Image } from 'antd';


const Header = () => {
    return (

        <div className='header'>
            <Row className='header-left '>
                <Col className='header-menu'>
                    <MenuOutlined />
                </Col>
                <Col className='header-brand'>
                    <Image
                        width={200}
                        src="/brand.png"
                    />
                </Col>
                <Col className='header-span'>
                    <span>
                        eOffice
                    </span>
                </Col>
            </Row>

            <Row className='header-right '>
                <Col className='header-icon'><QuestionOutlined /></Col>
                <Col className='header-icon'><BellOutlined /></Col>
                <Col className='header-icon'><SettingOutlined /></Col>
                <Col className='header-icon'><UserOutlined /></Col>
            </Row>


        </div>
    )
}
export default Header

