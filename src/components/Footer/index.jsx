import React from 'react'
import "./index.scss"
import { CopyrightOutlined } from '@ant-design/icons';

import { Col, Row, Image } from 'antd';

const Footer = () => {
    return (

        <Row className='footer'>
            <Row className='footer-left'>
                <Col>
                    <span>Tasken</span>
                </Col>
                <Col>
                    <CopyrightOutlined />
                </Col>
                <Col>
                    <a href='https://o365.vn/'>Opus Solution</a>
                </Col>
            </Row>
            <Row className='footer-right'>
                <Col className='footer-lang' >
                    <Image src='united-states.svg'></Image>
                    <span>VN</span>
                </Col>
                <Col><a href='https://tasken.io/'>Website</a></Col>
                <Col><a href='https://tasken.io/terms'>Term</a></Col>
                <Col><a href='https://tasken.io/about'>About</a></Col>
            </Row>
        </Row>
    )
}

export default Footer