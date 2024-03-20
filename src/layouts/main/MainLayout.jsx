import React from 'react';
import Header from '../../components/Header'
import Footer from '../../components/Footer';

import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { Col, Row } from 'antd';
import "./MainStyle.scss"

const MainLayout = () => {
    return (
        <>
            <div className='wrapper'>
                <Row span={24}>
                    <Header />
                </Row>
                <Row

                    span={24}>
                    <Col span={4} className='sidebar'>
                        <Sidebar />
                    </Col>
                    <Col span={20} className='main-content'>
                        <Outlet />
                    </Col>
                </Row>

                <Row span={24}>
                    <Footer />
                </Row>
            </div>
        </>

    )
}
export default MainLayout;