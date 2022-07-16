import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';     // React router dom
import { Layout, Typography, Space } from 'antd';       // Ant design components
import './App.css';     // CSS file

import { Navbar, Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails } from './components';      // components

const App = () => {
    return (
        <div className='app'>
            <div className="navbar">
                <Navbar />
            </div>

            {/* ---------- Main ---------- */}
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Routes>
                            <Route exact path="/" element={<Homepage />} />
                            <Route exact path="/exchanges" element={<Exchanges />} />
                            <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />
                            <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
                            <Route exact path="/news" element={<News />} />
                        </Routes>
                    </div>
                </Layout>

                {/* ---------- Footer ---------- */}
                <div className="footer">
                    <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
                        Cryptoverse
                        <br />
                        All rights reserved by <span style={{color:'#0071bd'}}> Gaurav Dhandhukiya </span>
                    </Typography.Title>
                    <Space>
                        <Link to='/'> Home </Link>
                        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                        <Link to='/news'>News</Link>
                    </Space>
                </div>
            </div>
        </div>
    )
};

export default App;
