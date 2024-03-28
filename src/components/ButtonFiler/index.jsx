
import React from 'react';
import { Dropdown, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './style.scss'
import { useState } from 'react';


const ButtonFilter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menu = (
        <Menu className="menu" mode="vertical" direction="rtl"> {/* Thiết lập direction là 'rtl' để chạy từ phải qua */}
            <div>
                <label>Filter</label>

            </div>
            <hr></hr>
            <div>

            </div>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item className="menu-animation" key="2">Option 2</Menu.Item>
            <Menu.Item className="menu-animation" key="3">Option 3</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} placement="bottomLeft" arrow trigger={['click']}>
            <Button onClick={() => setIsOpen(!isOpen)}>
                Dropdown <DownOutlined />
            </Button>
        </Dropdown>
    );
};

export default ButtonFilter;