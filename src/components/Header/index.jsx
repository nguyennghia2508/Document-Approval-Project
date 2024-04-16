import './index.scss';
import React, { useState } from 'react';
import {
  MenuOutlined,
  MoreOutlined,
  PullRequestOutlined,
  BarChartOutlined,
  FolderOutlined,
  GlobalOutlined,
  ChromeOutlined,
  SendOutlined,
  CreditCardOutlined,
  BankOutlined,
  FullscreenExitOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
  UserOutlined,
  CodeSandboxOutlined,
  DesktopOutlined,
  LogoutOutlined,
  CarOutlined,
  GiftOutlined,
  SolutionOutlined,
  ReloadOutlined,
  TagsOutlined,
  PayCircleOutlined,
  SwapOutlined,
  ToTopOutlined,
  TagOutlined,
  FolderOpenOutlined,
  UndoOutlined,
  DropboxOutlined,
} from '@ant-design/icons';
import { Col, Row, Image, Menu, Drawer } from 'antd';

import logo from '../../assets/images/brand.png';
import user_default_image from '../../assets/images/default-user-profile.png';
import { Link } from 'react-router-dom';
import ButtonDropdown from '../ButtonDropdown';
const { Item } = Menu;
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
  let items;

  items =
    [
      {
        label: <>
          {/* <div style={{ display: "flex" }}> */}
          <Link to='google.com' style={{ width: "50%", fontSize: "16px", color: "#337ab7", fontWeight: "bold" }}><PullRequestOutlined style={{ fontSize: "24px" }} />Approval</Link>
          {/* </div> */}
        </>
        ,
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%", fontSize: "16px", color: "#337ab7", fontWeight: "bold" }}><PullRequestOutlined style={{ fontSize: "24px" }} />Approval</div>
            <div style={{ width: "50%" }}><BarChartOutlined />Project</div>
          </div>
      },
      {
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><FolderOutlined />DMS</div>
            <div style={{ width: "50%" }}><GlobalOutlined />Intranet Portal</div>
          </div>
      },
      {
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><ChromeOutlined />Helpdesk</div>
            <div style={{ width: "50%" }}><SendOutlined />Leave</div>
          </div>
      },
      {
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><CreditCardOutlined />Payment</div>
            <div style={{ width: "50%" }}><BankOutlined />Budget</div>
          </div>
      },
      {
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><FullscreenExitOutlined />CRM</div>
            <div style={{ width: "50%" }}><SettingOutlined />Information</div>
          </div>
      },
      {
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><ShoppingCartOutlined />Elnvoice</div>
            <div style={{ width: "50%" }}><ClockCircleOutlined />Attendance</div>
          </div>
      },
      {
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><UsergroupAddOutlined />Employee</div>
            <div style={{ width: "50%" }}><TeamOutlined />Organization</div>
          </div>
      },
      {
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><UserOutlined />Partner Direction</div>
            <div style={{ width: "50%" }}><CodeSandboxOutlined />Product Direction</div>
          </div>
      },
      {
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><DesktopOutlined />Assets Directory</div>
            <div style={{ width: "50%" }}><LogoutOutlined />Employee Off</div>
          </div>
      },
      {
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><CarOutlined />Car Booking</div>
            <div style={{ width: "50%" }}><FolderOpenOutlined />Document Approval</div>
          </div>
      },
      {
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><GiftOutlined />Promotion</div>
            <div style={{ width: "50%" }}><SolutionOutlined />Contact</div>
          </div>
      },
      {
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><ReloadOutlined /> Assets in/</div>
            <div style={{ width: "50%" }}><TagsOutlined />Capital Expen</div>
          </div>
      },
      {
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><PayCircleOutlined />Scheme</div>
            <div style={{ width: "50%" }}><SwapOutlined />Assets tranfer</div>
          </div>
      },
      {
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><ToTopOutlined />SMOS</div>
            <div style={{ width: "50%" }}><TagOutlined />Capex Disposal</div>
          </div>
      },
      {
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><CreditCardOutlined />Prepayment</div>
            <div style={{ width: "50%" }}><FolderOpenOutlined />Re</div>
          </div>
      },
      {
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><FolderOpenOutlined />AVN Document</div>
            <div style={{ width: "50%" }}><FolderOpenOutlined />AVN Proposal</div>
          </div>
      },

      {
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><UndoOutlined />eGoodsOut</div>
            <div style={{ width: "50%" }}><PullRequestOutlined />Puchase Order</div>
          </div>
      },
      {
        label:
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}><DropboxOutlined />eOrderSlip</div>
          </div>
      },
    ];
  return (
    <Menu
    >
      {
        items.map(item => (
          <Item key={item.key}>
            {item.label}
          </Item>
        ))
      }
    </Menu>
  );
}

export default Header;
