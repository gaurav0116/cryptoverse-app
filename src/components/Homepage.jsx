import React from 'react';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';      // millify  module for manage Number system
import { useGetCryptosQuery } from '../services/cryptoApi';     // import crypto api Hook(Redux)😀
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';
const { Title } = Typography;      // Distructure Title from Typography (obj distructurring)

const Homepage = () => {

    const { data, isFetching } = useGetCryptosQuery(10);   //  cryptoApi redux hook😀
    const globalStats = data?.data?.stats;     // Crypto Stats

    if (isFetching) return <Loader/>;       // When fetching data will show Loding...

    return (
        <>
            <Title level={2} className='heading'>Global Crypto Stats</Title>
            <Row>
                <Col span={12} ><Statistic title='Total Cryptocurrencies' value={globalStats.total} /></Col>
                <Col span={12} ><Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)} /></Col>
                <Col span={12} ><Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap)} /></Col>
                <Col span={12} ><Statistic title='Total 24h Volume' value={millify(globalStats.total24hVolume)} /></Col>
                <Col span={12} ><Statistic title='Total Markets' value={millify(globalStats.totalMarkets)} /></Col>
            </Row>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Top 10 Cryptos In The World</Title>
                <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
            </div>
            <Cryptocurrencies simplified />
            <div className="home-heading-container">
                <Title level={2} className="home-title">Latest Crypto News</Title>
                <Title level={3} className="show-more"><Link to="/news">Show more</Link></Title>
            </div>
            <News simplified />
        </>
    );
};

export default Homepage;
