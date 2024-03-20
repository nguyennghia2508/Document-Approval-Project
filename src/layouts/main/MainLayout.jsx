import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

import { Outlet } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import { Col, Row } from 'antd';


const MainLayout = () => {
    return (
        <>


            {/* <div style={{ height: '100%' }}> */}
            <div style={{ height: '100vh' }}>
                <Row span={24}>
                    <Header />
                </Row>
                <Row style={{ height: '100%' }}

                    span={24}>
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
            {/* </div> */}
        </>

    )
}
export default MainLayout;