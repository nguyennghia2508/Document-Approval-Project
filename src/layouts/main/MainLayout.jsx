import React, { useEffect, useState } from 'react';
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
    const [isRotated, setIsRotated] = useState(false);

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


    console.log("isrotate", isRotated)
    return (
        <>
            <div className='layout-wrapper'>
                <div className='layout-header'>
                    <Header />
                </div>
                <div className='layout-container' >
                    <div className='container-sidebar'>
                        <Sidebar isRotated={isRotated} setIsRotated={setIsRotated} href={href} />
                    </div>
                    {/* <div className='container-body'> */}
                    <div className={isRotated ? 'container-bodyRotated' : 'container-body'}>
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
