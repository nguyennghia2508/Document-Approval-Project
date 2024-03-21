import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

import { Outlet } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import { Col, Row } from 'antd';


const MainLayout = () => {
    return (
        <>


            <div style={{ height: "100vh" }} >

                <Row><Header /></Row>
                <Row style={{ height: '100%' }}>
                    <Col span={3}>
                        <Sidebar />
                    </Col>
                    <Col span={21}>
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