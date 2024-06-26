import { Button, Menu } from 'antd';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTabview } from "../../redux/features/tabviewSlice"
import { ArrowLeftOutlined } from '@ant-design/icons';
import LanguageSwitcher from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';

library.add(fas, far, fab);

const Sidebar = ({
    isRotated,
    setIsRotated,
    href
}) => {
    const { t } = useTranslation();
    const [currentTabIndex, setCurrenTabIndex] = useState(null)
    const dispatch = useDispatch()

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

    const handleTableView = async (tabIndex, tabName) => {
        setCurrenTabIndex(tabIndex)
        if (tabIndex !== currentTabIndex) {
            dispatch(setTabview({
                tabIndex: tabIndex,
                tabName: tabName,
                filter: false,
                filterList: [],
                switchTable: true
            }))
        }
    };

    const items = [
        getItem(
            'Requests',
            'sub1',
            <FontAwesomeIcon icon={['fas', 'fa-folder-open']} />,
            'submenu',
            [<Link to={href} onClick={() => handleTableView(1, "all")}>{t('AllRequest')}</Link >,
            <Link to={href} onClick={() => handleTableView(2, "sendToMe")}>{t('SentToMe')}</Link >,
            <Link to={href} onClick={() => handleTableView(3, "sendByMe")}>{t('SentToOrthers')}</Link >,
            <Link to={href} onClick={() => handleTableView(4, "shareWithMe")}>{t('SharedWithMe')}</Link >,
            ],
            { paddingLeft: '70.5px' }
        ), // 4 mục con trong submenu
        getItem(
            'Status',
            'sub2',
            <FontAwesomeIcon icon='fa-solid fa-chart-column' />,
            'submenu',
            [
                <Link to={href} onClick={() => handleTableView(5, "status0")}>Draft</Link >,
                <Link to={href} onClick={() => handleTableView(6, "status1")}>Waiting for approval</Link >,
                <Link to={href} onClick={() => handleTableView(7, "status2")}>Approved</Link >,
                <Link to={href} onClick={() => handleTableView(8, "status3")}>Rejected</Link >,
                <Link to={href} onClick={() => handleTableView(9, "status4")}>Digitally Signed</Link >,
                <Link to={href} onClick={() => handleTableView(10, "status4")}>Signed</Link >,
            ],
            { paddingLeft: '70.5px' }
        ), // 2 mục con trong submenu
        getItem(
            'Report',
            'sub3',
            <FontAwesomeIcon icon='fa-solid fa-chart-column' />,
            'submenu',
            ['Chart'],
            { paddingLeft: '70.5px' }
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

    const handleArrowClick = () => {
        setIsRotated(!isRotated); // Thay đổi trạng thái xoay
    };

    return (
        <div className={isRotated ? 'sidebar-Rotate' : 'sidebar'}>
            <Menu
                className={isRotated ? 'list-menuRotate' : 'list-menu'}
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
            {/* <Button className='sidebar-on'>asdsadasd</Button> */}
            <div className={isRotated ? 'sidebar-off' : 'sidebar-on'} onClick={handleArrowClick}>
                <ArrowLeftOutlined style={{ transform: isRotated ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </div>
        </div>

    );
};

export default Sidebar;
