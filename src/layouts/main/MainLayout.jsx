import React, { useEffect } from 'react';
import Header from '../../components/Header'
import Footer from '../../components/Footer';
// import TitleBody from '../../components/TitleBody';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
// import { Col, Row, Flex, Layout } from 'antd';
import "./MainStyle.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authUtils from "../../utils/authUtils"
import { useDispatch } from 'react-redux';
import { resetUser, setUser } from '../../redux/features/userSlice'
const MainLayout = ({
    isForm = false,
    href
}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated()
            if (user) {

                dispatch(setUser(user))
            }
            else {
                navigate('/login');
                dispatch(resetUser())
            }
        }
        checkAuth()
    }, [navigate])



    return (
        <>
            <div className='layout-wrapper'>
                <div className='layout-header'>
                    <Header />
                </div>
                <div className='layout-container' >
                    <div className='container-sidebar'>
                        <Sidebar href={href} />
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
