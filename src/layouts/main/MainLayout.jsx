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
import { useSelector } from 'react-redux';
import { hubConnection } from 'signalr-no-jquery';

const MainLayout = ({
    isForm = false,
    href
}) => {

    const user = useSelector((state) => state.user.value)
    const isLogin = useSelector((state) => state.user.isLogin)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isRotated, setIsRotated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated()
            if (user) {

                dispatch(setUser({
                    value: user,
                    isLogin: true
                }))
            }
            else {
                navigate('/login');
                dispatch(resetUser())
            }
        }
        checkAuth()
    }, [navigate])

    useEffect(() => {
        if (user && isLogin) {
            console.log("true")
            const connection = hubConnection("https://localhost:44389", {
                qs: { "userId": `${user.Id}` }
            });

            const hubProxy = connection.createHubProxy('SignalRHub');

            hubProxy.on("addNotification", (data) => {
                if (data) {
                    if (data.type === "WAITING_FOR_APPROVAL") {
                        toast.success(`Request ${data.parameter.code} is waiting for your approval`)
                    }
                }
            })

            connection.start()
                .done(() => {
                    console.log('SignalR connected');
                })
                .fail((error) => {
                    console.error('SignalR connection error: ' + error);
                })
        }
    }, [isLogin]);

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
