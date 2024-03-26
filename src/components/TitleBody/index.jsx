import { Button } from 'antd'
import {
    SwapLeftOutlined, SaveOutlined, SendOutlined, PlusOutlined,
    FilterOutlined, VerticalAlignBottomOutlined, FileTextOutlined, ShareAltOutlined, CheckOutlined, CloseOutlined, MailOutlined
} from '@ant-design/icons';
import React from 'react'
import './style.scss'
import { Link, useNavigate } from "react-router-dom";

// import Link from 'antd/es/typography/Link'


// const handleLinkCreateNew = () => {
//     history.push("/")
// }

const TitleBody = ({
    label,
    isForm = false,
    isApproval = false,
    href
}) => {

    return (
        isForm ?
            <div className='titlebody-form'>
                <div className='titlebody-left'>
                    {
                        isApproval ?
                            <>
                                <Link to={href}><SwapLeftOutlined /> Return</Link>
                                <Link><FileTextOutlined /> Download file</Link>
                                <Link><ShareAltOutlined />Share</Link>
                                <Link><CheckOutlined />Approve</Link>
                                <Link><CloseOutlined />Reject</Link>
                                <Link><MailOutlined />Forward</Link>
                            </>
                            :
                            <>
                                <Link to={href}><SwapLeftOutlined /> Return</Link>
                                <Link><SaveOutlined />Save draft</Link>
                                <Link ><SendOutlined />Submit</Link>
                            </>
                    }

                </div>
                <div className='titlebody-right'>
                </div>
            </div >

            :
            <div className='titlebody-nonform'>
                <label className='titlebody-left'>{label}</label>
                <div className='titlebody-right'>
                    <Button><VerticalAlignBottomOutlined style={{ transform: 'rotate(-90deg)' }} />Export excel</Button>
                    <Button><FilterOutlined />Filer</Button>
                    <Link className='link-create' to='/avn/documentapproval/new'><PlusOutlined />Create new</Link>
                </div>
            </div>
    )
}

export default TitleBody