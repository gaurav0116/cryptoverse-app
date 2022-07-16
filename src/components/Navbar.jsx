import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';        // import Ant design components 
import { Link } from 'react-router-dom';    // Router dom
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons/lib/icons';
import icon from '../images/coin-img.png'

const Navbar = () => {

    const [activeMenu, setActiveMenu] = useState(true);     // Nav menu hook
    const [screenSize, setScreenSize] = useState(null);     // Screen size hook

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);    // windows resize then call eventlistener (handleResize) fun
        handleResize();
        return () => window.removeEventListener('resize', handleResize);     // Event listener remove
    }, []);

    /* ---------- its call when Screen size change ---------- */
    useEffect(() => {
        if (screenSize < 768) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true)
        }

    }, [screenSize]);

    return (
        <div>
            <div className="nav-container">
                <div className="logo-container">
                    <Avatar src={icon} size={64} />
                    <Typography.Title level={2} classname="logo">
                        <Link to="/" style={{ marginLeft: '10px' }} >Cryptoverse</Link>
                    </Typography.Title>
                </div>

                {/* ========== When menu is Active then show menu logic ========= */}
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu) }>
                    <MenuOutlined />
                </Button>
                {activeMenu && (
                    <Menu theme='dark'>
                        <Menu.Item icon={<HomeOutlined />}>
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item icon={<FundOutlined />}>
                            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                        </Menu.Item>

                        {/* <Menu.Item icon={<MoneyCollectOutlined />}>
                            <Link to="/exchanges">Exchanges</Link>
                        </Menu.Item> */}
                        
                        <Menu.Item icon={<BulbOutlined />}>
                            <Link to="/news">News</Link>
                        </Menu.Item>
                    </Menu>
                )}
            </div>
        </div>
    )
}

export default Navbar;
