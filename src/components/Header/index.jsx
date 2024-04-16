import './index.scss';
import React, { useState } from 'react';
import {
  MenuOutlined,
  MoreOutlined,
  SettingOutlined,
  BellOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Col, Row, Image, Menu, Drawer } from 'antd';

import logo from '../../assets/images/brand.png';
import user_default_image from '../../assets/images/default-user-profile.png';
import { Link } from 'react-router-dom';
import ButtonDropdown from '../ButtonDropdown';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false)

  const handleMobileHeaderClick = () => {
    setIsMobile(!isMobile); // Thay đổi trạng thái xoay
  };

  return (
    <div className='header'>
      <Row className='header-left '>
        <Col className='header-menu'>
          <MenuOutlined
            onClick={() => {
              setOpenMenu(true);
            }}
          />
        </Col>
        <Drawer
          placement='left'
          open={openMenu}
          onClose={() => {
            setOpenMenu(false);
          }}
        >
          <MenuHeader />
        </Drawer>

        <Link to={"/avn/documentapproval"} className={isMobile ? 'header-brandMobile' : 'header-brand'}>
          <Image width={200} src={logo} preview={false} />
        </Link>
        <Col className='header-span'>
          <span>eOffice</span>
        </Col>
      </Row>

      <Row className='header-right '>
        <Col className={isMobile ? 'icon-more' : 'icon-moreMobile'} onClick={handleMobileHeaderClick}>
          <MoreOutlined rotate={90} />
        </Col>

        <Col className={isMobile ? 'header-icon' : 'header-iconMobile'}>
          <ButtonDropdown isQ={true} />
        </Col>
        <Col className={isMobile ? 'header-icon' : 'header-iconMobile'}>
          <ButtonDropdown isNo={true} />
        </Col>
        <Col className={isMobile ? 'header-icon' : 'header-iconMobile'}>
          <SettingOutlined />
        </Col>
        <Col className='header-user'>

          <ButtonDropdown />

        </Col>
      </Row>
    </div>
  );
};

function MenuHeader() {
  return (
    <Menu
      style={{ fontSize: 15 }}
      items={[
        {
          label: 'Home',
          icon: <HomeOutlined />,
        },
        {
          label: 'Contact',
        },
        {
          label: 'About',
          key: 'about',
        },
      ]}
    ></Menu>
  );
}

export default Header;
