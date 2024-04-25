import React, { useEffect, useState } from 'react';
import Header from '../../components/Header'
import Footer from '../../components/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import authUtils from "../../utils/authUtils"
import { useDispatch } from 'react-redux';
import { resetUser, setUser } from '../../redux/features/userSlice'
import './SystemStyle.scss'
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


    return (
        <>
            <div className='SystemLayout__Wrapper'>
                <div className='SystemLayout__Header'>
                    <Header />
                </div>
                <div className='SystemLayout__Container' >
                    <div className='SystemLayout__PageScroll'>
                        <div className='SystemLayout__MainContent'>
                            <div className='SystemLayout__ContentView'>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='SystemLayout__Footer'>
                    <Footer />
                </div>
            </div>
        </>



    )
}
export default MainLayout;
