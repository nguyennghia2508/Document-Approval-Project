import React from 'react';
import Header from '../../components/Header'
import Footer from '../../components/Footer';

import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
// import { Col, Row, Flex, Layout } from 'antd';
import "./MainStyle.scss"

const MainLayout = () => {
    return (
        <>
            <div className='layout-wrapper'>
                <div className='layout-header'>
                    <div xs={24}>
                        <Header />
                    </div>
                </div>
                <div className='layout-container'>
                    <div><Sidebar /></div>
                    <div style={{ display: '', width: '100%' }}><Outlet /></div>
                </div>
                <div className='layout-footer'>
                    <Footer />
                </div>
            </div>
        </>

    )
}
export default MainLayout;
