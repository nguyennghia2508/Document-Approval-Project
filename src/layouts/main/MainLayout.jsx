import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router';
const MainLayout = () => (
    <div className="main-body">
        <Header/>
        <Outlet />
        <Footer/>
    </div>
);
export default MainLayout;