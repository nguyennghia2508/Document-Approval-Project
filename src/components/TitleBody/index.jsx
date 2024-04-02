import { Button } from 'antd'
import {
    SwapLeftOutlined, SaveOutlined, SendOutlined, PlusOutlined,
    FilterOutlined, VerticalAlignBottomOutlined, FileTextOutlined, ShareAltOutlined, CheckOutlined, CloseOutlined, MailOutlined
} from '@ant-design/icons';
import React from 'react'
import './style.scss'
import { Link, useNavigate } from "react-router-dom";
import ButtonFilter from '../ButtonFilter';

// import Link from 'antd/es/typography/Link'


// const handleLinkCreateNew = () => {
//     history.push("/")
// }

const TitleBody = ({
    onSubmitFromTitleBody,
    afterSubmit,
    onSubmit,
    label,
    isForm = false,
    isApproval = false,
    href
}) => {

    const handleClick = () => {
        // Xử lý submit dữ liệu tại đây
        onSubmit('Data to submit');
    };
    const handleSubmitFromTitleBody = (rCode, dType, subject, rProposal, createStart, createEnd, to, author, attoney, periodStart, periodEnd, applicant, depart, section, unit, status, procBy) => {

        onSubmitFromTitleBody(rCode, dType, subject, rProposal, createStart, createEnd, to, author, attoney, periodStart, periodEnd, applicant, depart, section, unit, status, procBy)
    };

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
                                <Link><CheckOutlined />
                                    Approve</Link>
                                <Link><CloseOutlined />Reject</Link>
                                <Link><MailOutlined />Forward</Link>
                            </>
                            :
                            <>
                                <Link to={href}><SwapLeftOutlined /> Return</Link>
                                <Link><SaveOutlined />Save draft</Link>
                                <Link to={afterSubmit} onClick={handleClick}><SendOutlined />Submit</Link>
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
                    <ButtonFilter
                        onFilter={handleSubmitFromTitleBody}
                    />

                    <Link className='link-create' to='/avn/documentapproval/new'><PlusOutlined />Create new</Link>
                </div>
            </div>
    )
}

export default TitleBody