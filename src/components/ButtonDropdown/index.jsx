import React from 'react';
import "./style.scss"
import { BellOutlined, CloseOutlined, QuestionOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu, Divider, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetUser } from '../../redux/features/userSlice';
import { useState } from 'react';
import NotificationMenu from '../NotificationMenu';
import { hubConnection } from 'signalr-no-jquery';

const { Item } = Menu;
const ButtonDropdown = ({ isQ, isNo = false, notificationById }) => {

    const dispatch = useDispatch()

    const connection = hubConnection("https://localhost:44389/signalr");

    const user = useSelector((state) => state.user.value)
    const navigate = useNavigate();
    const handleLogout = () => {
        connection.stop()
        dispatch(resetUser())
        localStorage.removeItem('token');
        navigate('/login');
    };
    let items;

    if (isQ) {
        items = [
            {
                label: <div className='btn-Dropdown-QHeader'><span>Help</span><CloseOutlined /></div>,
                key: '1',
            },
            {
                label: <hr className='btn-Dropdown-Hr'></hr>,
                key: '2',
            },
            {
                label: <div className='btn-Dropdown-QLabel'>Opus Helpdesk</div>,
                key: '3',
            },
            {
                label: <a className='btn-Dropdown-Qa' ><span>Introduction</span></a>,
                key: '4',
            },
            {
                label: <a className='btn-Dropdown-Qa'><span>Introduction</span></a>,
                key: '5',
            },
            {
                label: <a className='btn-Dropdown-Qa'><span>Open Ticket</span></a>,
                key: '6',
            },
            {
                label: <a className='btn-Dropdown-Qa'><span>Help</span></a>,
                key: '7',
            },
        ];
    } else if (isNo) {
        items = [
            {
                label: <div className='btn-Dropdown-NoHeader'><span>asdasdasdasd</span><CloseOutlined /></div>,
                key: '1',
            },
            {
                label: <div className='btn-Dropdown-NoLabel'>Opus asdasdas</div>,
                key: '3',
            },
        ];
    } else {
        items = [
            {
                label: <div className='btn-Dropdown-UserHeader'><span>My Account</span><CloseOutlined /></div>,
                key: '1',
            },
            {
                label: <div className='btn-Dropdown-UserLabel' >
                    <div style={{ width: "64px", paddingRight: "25px" }}><Image preview={false} src='/default-user-profile.png' ></Image></div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>{user?.Username}</span>
                        <span>{user?.Email}</span>
                    </div>
                </div>,
                key: '3',
            },
            {
                label: <a className='btn-Dropdown-Qa' ><span>My Pending Approvals</span></a>,
                key: '4',
            },
            {
                label: <a className='btn-Dropdown-Qa'><span>My Pending Request</span></a>,
                key: '5',
            },
            {
                label: <Link to={"/setting/system/employee"} className='btn-Dropdown-Qa'><span>My Profile</span></Link>,
                key: '6',
            },
            {
                label: <a className='btn-Dropdown-Qa'><span>My Account</span></a>,
                key: '7',
            },
            {
                label: <a onClick={handleLogout} className='btn-Dropdown-Qa'><span>Sign Out</span></a>,
                key: '8',
            },

        ];
    }
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const handleClickIcon = () => {
        setDropdownVisible(!dropdownVisible); // Xử lý sự kiện khi nhấn vào icon để mở hoặc đóng Dropdown
    };
    const CustomMenuHeader = (


        <Menu className='buttonDropdown' style={{ marginTop: "7px" }}>
            {isNo ? (
                <NotificationMenu notificationById={notificationById} />
            ) : (
                items.map(item => (
                    <Menu.Item key={item.key}>
                        {item.label}
                    </Menu.Item>
                ))
            )}
        </Menu>

    )
    const renderIcon = () => {
        if (isQ) {
            return <QuestionOutlined style={{ color: "#FFF" }} />;
        } else if (isNo) {
            // Xử lý cho trường hợp isNo
            return (<div className='NotificationIcon'>
                <BellOutlined className='BellNotification' />
                <div className='CountNotification'>23</div>
            </div>
            );
        } else {
            // Xử lý cho trường hợp còn lại
            return <Image preview={false} src='/default-user-profile.png' ></Image>;
        }
    };



    return (
        < Dropdown
            overlay={CustomMenuHeader}
            trigger={['click']}
            visible={dropdownVisible}
            onVisibleChange={visible => setDropdownVisible(visible)}
        >
            <a onClick={handleClickIcon}>
                <Space>
                    {renderIcon()}
                </Space>
            </a>
        </Dropdown >
    );
};

export default ButtonDropdown;
