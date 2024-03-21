import { Menu } from 'antd';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import { useState } from 'react';

library.add(fas, far, fab);

const CustomMenu = () => {
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
      'Requests',
      'sub1',
      <FontAwesomeIcon icon={['fas', 'fa-folder-open']} />,
      'submenu',
      ['All requests', 'Send to me', 'Send to others', 'Shared with me'],
      { paddingLeft: '65.5px' }
    ), // 4 mục con trong submenu
    getItem(
      'Status',
      'sub2',
      <FontAwesomeIcon icon='fa-solid fa-chart-column' />,
      'submenu',
      [
        'Draft',
        'Waiting for approval',
        'Approved',
        'Rejected',
        'Digitally Signed',
        'Signed',
      ],
      { paddingLeft: '65.5px' }
    ), // 2 mục con trong submenu
    getItem(
      'Report',
      'sub3',
      <FontAwesomeIcon icon='fa-solid fa-chart-column' />,
      'submenu',
      ['Chart'],
      { paddingLeft: '65.5px' }
    ), // 3 mục con trong submenu
    // getItem('Budget Management', 'sub4',  <Icon icon="ion:md-wallet" />, 'submenu', ['Option 10', 'Option 11', 'Option 12']), // 3 mục con trong submenu
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
      className='list-menu'
      mode='inline'
      defaultSelectedKeys={['sub1-1']}
      defaultOpenKeys={['sub1']}
      inlineIndent={10}
      items={items}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    />
  );
};

export default CustomMenu;
