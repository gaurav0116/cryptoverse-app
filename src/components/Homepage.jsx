import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';     // import crypto api Hook(Redux)😀

const  { Title } = Typography;      // Distructure Title from Typography (obj distructurring)

const Homepage = () => {

    const { data, isFetching } = useGetCryptosQuery();   //  cryptoApi redux hook😀
    console.log(data);

    // if(isFetching) return 'Loading ...';😀

    return (
        <>
            <Title level={2} className='heading'>Global Crypto Stats</Title>
            <Row>
                <Col span={12} ><Statistic title='Total Cryptocurrencies' value="5" /></Col>
                <Col span={12} ><Statistic title='Total Exchanges' value="5" /></Col>
                <Col span={12} ><Statistic title='Total Market Cap' value="5" /></Col>
                <Col span={12} ><Statistic title='Total 24h Volume' value="5" /></Col>
                <Col span={12} ><Statistic title='Total Markets' value="5" /></Col>
            </Row>
        </>
    );
};

export default Homepage;