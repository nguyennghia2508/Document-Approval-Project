import { Avatar, Menu } from 'antd';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import { useEffect, useState } from 'react';
import { Row, Col } from "antd";

library.add(fas, far, fab);

const NotificationMenu = ({
}) => {

  const [openKeys, setOpenKeys] = useState(['sub1']);
  const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];

  const getItem = (label, key, icon, type, childrenLabels, styles = []) => {

    const children = childrenLabels.map((childLabel, index) => {
      return {
        key: `${key}-${index + 1}`,
        label: childLabel,
        style: styles,
      };
    });
    return {

      key: key,
      icon: icon,
      children: children,
      label: label,
      type: type,
    };
  };



  const items = [
    getItem(
      'Project Task',
      'sub1',
      <FontAwesomeIcon icon={['fas', 'fa-folder-open']} />,
      'submenu',
      [<Row className='customMenu-Element'>
        <Col className='customMenu-ElementAvatar'>
          <Avatar src="/logo192.png"></Avatar>
        </Col>
        <Col className='customMenu-ElementContain'>
          <Row className='customMenu-ElementContain-item' >Nhan Nguyen Minh has commented on request 00007-eDoc-LMart-2004</Row>
          <Row className='customMenu-ElementContain-itemDate'>17/04/2024</Row>
        </Col>
      </Row >,
      ],
    ),
    getItem(
      'AVN Document Approval',
      'sub2',
      <FontAwesomeIcon icon='fa-solid fa-chart-column' />,
      'submenu',
      [<Row className='customMenu-Element'>
        <Col className='customMenu-ElementAvatar'>
          <Avatar src="/logo192.png"></Avatar>
        </Col>
        <Col className='customMenu-ElementContain'>
          <Row className='customMenu-ElementContain-item' >Nhan Nguyen Minh has commented on request 00007-eDoc-LMart-2004</Row>
          <Row className='customMenu-ElementContain-itemDate'>17/04/2024</Row>
        </Col>
      </Row >,
      <Row className='customMenu-Element'>
        <Col className='customMenu-ElementAvatar'>
          <Avatar src="/logo192.png"></Avatar>
        </Col>
        <Col className='customMenu-ElementContain'>
          <Row className='customMenu-ElementContain-item' >Nhan Nguyen Minh has commented on request 00007-eDoc-LMart-2004</Row>
          <Row className='customMenu-ElementContain-itemDate'>17/04/2024</Row>
        </Col>
      </Row >,
      ],

    ), // 2 mục con trong submenu

  ];

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };


  return (
    <Menu
      className='customMenu'
      mode='inline'
      style={{ borderInlineEnd: 'none' }}
      defaultSelectedKeys={['sub1-1']}
      defaultOpenKeys={['sub1']}
      inlineIndent={10}
      items={items}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    >
    </Menu>

  );
};

export default NotificationMenu;
