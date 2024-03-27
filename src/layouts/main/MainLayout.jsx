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
                    <div xs={24}>
                        <Header />
                    </div>
                </div>
                <div className='layout-container' >
                    <Sidebar />
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


            {/* <div className='layout-wrapper'>
                <div className='layout-header'>
                    <div xs={24}>
                        <Header />
                    </div>
                </div>
                <div className='layout-container'>
                    <div className='sidebar'><Sidebar /></div>
                    <div className='body'>
                        <div className='body-title'><TitleBody /></div>
                        <div className='body-container' style={{ width: '100%' }}><Outlet /></div>
                    </div>
                </div>
                <div className='layout-footer'>
                    <Footer />
                </div>
            </div> */}

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            {/* Same as */}
            <ToastContainer />
        </>



    )
}
export default MainLayout;
