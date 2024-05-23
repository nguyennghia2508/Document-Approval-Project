import './index.scss';
import React, { useEffect, useState } from 'react';
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
import { Col, Image, Menu, Drawer, Row } from 'antd';

import logo from '../../assets/images/brand.png';
import user_default_image from '../../assets/images/default-user-profile.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ButtonDropdown from '../ButtonDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { hubConnection } from 'signalr-no-jquery';
import notificationApi from '../../api/notificationApi';

const { Item } = Menu;
const Header = () => {

  const navigate = useNavigate()
  const user = useSelector((state) => state.user.value)
  const isLogin = useSelector((state) => state.user.isLogin)

  const [openMenu, setOpenMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNotify, setIsNotify] = useState(false)

  const [notificationById, setNotificationById] = useState([])

  const dispatch = useDispatch()



  useEffect(() => {
    if (user && isLogin) {
      console.log("true")


      const connection = hubConnection("https://localhost:44389", {
        qs: { "userId": `${user.Id}` }
      });

      const hubProxy = connection.createHubProxy('SignalRHub');

      hubProxy.on("addNotification", (data) => {
        if (data) {
          setIsNotify(true)
          if (data.type === "WAITING_FOR_APPROVAL") {
            toast.success(`Request ${data.parameter.code} is waiting for your approval`)
          }
          if (data.type === "WAITING_FOR_SIGNATURE") {
            toast.success(`Request ${data.parameter.code} is waiting for your signature`)
          }
          if (data.type === "REJECTED") {
            toast.error(`Request ${data.parameter.code} is rejected`)
          }
        }
      })

      connection.start()
        .done(() => {
          console.log('SignalR connected');
        })
        .fail((error) => {
          console.error('SignalR connection error: ' + error);
        })
    }

  }, [isLogin]);

  useEffect(() => {
    if (user && isLogin) {
      const getNotificationById = async () => {
        const data = await notificationApi.getNotificationById(user?.Id)
        // const dataNotification = await notificationApi.getAll()
        if (data.state === "true") {
          setNotificationById(data.listNotificationsAll)
        }

      }
      getNotificationById()
    }
  }, [isLogin, isNotify])


  const handleMobileHeaderClick = () => {
    setIsMobile(!isMobile); // Thay đổi trạng thái xoay
  };

  return (
    <Col className='header'>
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
          <ButtonDropdown
            notificationById={notificationById}
            isNotify={isNotify}
            isNo={true} />
        </Col>
        <Col className={isMobile ? 'header-icon' : 'header-iconMobile'}>
          <SettingOutlined onClick={() => navigate("/setting")} />
        </Col>
        <Col className='header-user'>

          <ButtonDropdown />

        </Col>
      </Row>
    </Col>
  );
};




function MenuHeader() {

  return (
    <Menu>
      <Row className='header-DrawerLabel'>Apps</Row>
      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem' ><PullRequestOutlined /> <span className='header-DrawerItem-Content'> Approval</span></a>
        <a className='header-DrawerItem'><BarChartOutlined /> <span className='header-DrawerItem-Content'> Project</span></a>
      </Row >
      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem'><FolderOutlined /> <span className='header-DrawerItem-Content'> DMS</span></a>
        <a className='header-DrawerItem'><GlobalOutlined /> <span className='header-DrawerItem-Content'> Intranet Portal</span></a>
      </Row>

      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem'><ChromeOutlined /> <span className='header-DrawerItem-Content'> Helpdesk</span></a>
        <a className='header-DrawerItem'><SendOutlined /> <span className='header-DrawerItem-Content'> Leave</span></a>
      </Row>

      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem'><CreditCardOutlined /> <span className='header-DrawerItem-Content'> Payment</span></a>
        <a className='header-DrawerItem'><BankOutlined /> <span className='header-DrawerItem-Content'> Budget</span></a>
      </Row>

      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem'><FullscreenExitOutlined /> <span className='header-DrawerItem-Content'> CRM</span></a>
        <a className='header-DrawerItem'><SettingOutlined /> <span className='header-DrawerItem-Content'> Information</span></a>
      </Row>

      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem'><ShoppingCartOutlined /> <span className='header-DrawerItem-Content'> Elnvoice</span></a>
        <a className='header-DrawerItem'><ClockCircleOutlined /> <span className='header-DrawerItem-Content'> Attendance</span></a>
      </Row>

      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem'><UsergroupAddOutlined /> <span className='header-DrawerItem-Content'> Employee</span></a>
        <a className='header-DrawerItem'><TeamOutlined /> <span className='header-DrawerItem-Content'> Organization</span></a>
      </Row>

      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem'><UserOutlined /> <span className='header-DrawerItem-Content'> Partner Direction</span></a>
        <a className='header-DrawerItem'><CodeSandboxOutlined /> <span className='header-DrawerItem-Content'> Product Direction</span></a>
      </Row>

      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem'><DesktopOutlined /> <span className='header-DrawerItem-Content'> Assets Directory</span></a>
        <a className='header-DrawerItem'><LogoutOutlined /> <span className='header-DrawerItem-Content'> Employee Off</span></a>
      </Row>

      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem'><CarOutlined /> <span className='header-DrawerItem-Content'> Car Booking</span> </a>
        <a className='header-DrawerItem'><FolderOpenOutlined /> <span className='header-DrawerItem-Content'> Document Approval</span></a>
      </Row>

      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem'><GiftOutlined /> <span className='header-DrawerItem-Content'> Promotion</span></a>
        <a className='header-DrawerItem'><SolutionOutlined /> <span className='header-DrawerItem-Content'> Contact</span></a>
      </Row>

      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem'><ReloadOutlined />  <span className='header-DrawerItem-Content'> Assets in/</span></a>
        <a className='header-DrawerItem'><TagsOutlined /> <span className='header-DrawerItem-Content'> Capital Expen</span></a>
      </Row>

      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem'><PayCircleOutlined /> <span className='header-DrawerItem-Content'> Scheme</span></a>
        <a className='header-DrawerItem'><SwapOutlined /> <span className='header-DrawerItem-Content'> Assets tranfer</span></a>
      </Row>

      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem'><ToTopOutlined /> <span className='header-DrawerItem-Content'> SMOS</span></a>
        <a className='header-DrawerItem'><TagOutlined /> <span className='header-DrawerItem-Content'> Capex Disposal</span></a>
      </Row>

      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem'><CreditCardOutlined /> <span className='header-DrawerItem-Content'> Prepayment</span></a>
        <a className='header-DrawerItem'><FolderOpenOutlined /> <span className='header-DrawerItem-Content'> Re</span></a>
      </Row>

      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem'><FolderOpenOutlined /> <span className='header-DrawerItem-Content'> AVN Document</span></a>
        <a className='header-DrawerItem'><FolderOpenOutlined /> <span className='header-DrawerItem-Content'> AVN Proposal</span></a>
      </Row>
      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem'><UndoOutlined /> <span className='header-DrawerItem-Content'> eGoodsOut</span></a>
        <a className='header-DrawerItem'><PullRequestOutlined /> <span className='header-DrawerItem-Content'> Puchase Order</span></a>
      </Row>
      < Row className='header-DrawerMenu' >
        <a className='header-DrawerItem'><DropboxOutlined /> <span className='header-DrawerItem-Content'> eOrderSlip</span></a>
      </Row>
    </Menu>
  );
}

export default Header;
