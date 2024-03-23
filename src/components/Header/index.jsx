import './index.scss';
import React, { useState } from 'react';
import {
  MenuOutlined,
  MoreOutlined,
  SettingOutlined,
  BellOutlined,
  QuestionOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Col, Row, Image, Menu, Drawer } from 'antd';

import logo from '../../assets/images/brand.png';
import user_default_image from '../../assets/images/default-user-profile.png';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

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

        <Col className='header-brand'>
          <Image width={200} src={logo} />
        </Col>
        <Col className='header-span'>
          <span>eOffice</span>
        </Col>
      </Row>

      <Row className='header-right '>
        <Col className='icon-more'>
          <MoreOutlined rotate={90} />
        </Col>

        <Col className='header-icon'>
          <QuestionOutlined />
        </Col>
        <Col className='header-icon'>
          <BellOutlined />
        </Col>
        <Col className='header-icon'>
          <SettingOutlined />
        </Col>
        <Col className='header-user'>
          {' '}
          <Image src={user_default_image}></Image>{' '}
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
