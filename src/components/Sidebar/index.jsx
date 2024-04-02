import React from 'react'
import './index.scss'
import CustomMenu from '../CustomMenu'
const Sidebar = ({
    href,
}) => {
    return (
        <div className='sidebar'>
            <div className='page-scroll'>
                <CustomMenu href={href}/>
            </div>
        </div>
    )
}

export default Sidebar