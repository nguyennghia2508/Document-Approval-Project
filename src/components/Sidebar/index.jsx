import React from 'react'
import './index.scss'
import CustomMenu from '../CustomMenu'
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='page-scroll'>
                <CustomMenu/>
            </div>
        </div>
    )
}

export default Sidebar