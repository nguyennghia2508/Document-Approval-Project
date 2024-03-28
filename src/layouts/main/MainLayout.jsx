import React from 'react';
import Header from '../../components/Header'
import Footer from '../../components/Footer';
// import TitleBody from '../../components/TitleBody';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
// import { Col, Row, Flex, Layout } from 'antd';
import "./MainStyle.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({
    isForm = false
}) => {
    return (
        <>
            <div className='layout-wrapper'>
                <div className='layout-header'>
                    <Header />
                </div>
                <div className='layout-container' >
                    <div className='container-sidebar'>
                        <Sidebar />
                    </div>
                    <div className='container-body'>
                        {/* <div className='body-title'><TitleBody label="ASDASD" /></div> */}
                        <div className='page-scroll'>
                            <div className='main-content'>
                                <div className='content-view'>
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='layout-footer'>
                    <Footer />
                </div>
            </div>
        </>



    )
}
export default MainLayout;
