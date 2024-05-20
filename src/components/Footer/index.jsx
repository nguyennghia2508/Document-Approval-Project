import React from 'react'
import "./index.scss"
import { CopyrightOutlined } from '@ant-design/icons';

import { Col, Row } from 'antd';
import LanguageSwitcher from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';
const Footer = () => {
    const { t } = useTranslation();
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
                    <LanguageSwitcher />
                </Col>
                <Col><a href='https://tasken.io/'>{t('website')}</a></Col>
                <Col><a href='https://tasken.io/terms'>{t('term')}</a></Col>
                <Col><a href='https://tasken.io/about'>{t('about')}</a></Col>
            </Row>
        </Row>
    )
}

export default Footer