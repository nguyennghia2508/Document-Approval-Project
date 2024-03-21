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
                    <div ><Sidebar /></div>
                    <div><Outlet /></div>
                </div>
                <div className='layout-footer'>
                    <div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>

    )
}
export default MainLayout;