import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';    // Converts HTML string to JSX element.
import { useParams } from 'react-router-dom';   // Access currecy id parameter
import millify from 'millify';      // manage number system
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';   // coin details redux hook
import LineChart from './LineChart';
import Loader from './Loader';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState("7d");     // time period hook
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);      // Coin details redux hook
    const { data: coinHistory } = useGetCryptoHistoryQuery({coinId, timePeriod});   // Coin redux History Hook
    const cryptoDetails = data?.data?.coin;     // crypto details 
    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];    // time period array

    // coin stats
    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    // general status
    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

    if (isFetching) return <Loader />;

    return (

        <Col className="coin-detail-container">
            <Col className="coin-heading-container">
                <Title level={2} className="coin-name">
                    {cryptoDetails.name} ({cryptoDetails.symbol}) Price
                </Title>
                <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
            </Col>
            <Select
                defaultValue="7d"
                className='select-timeperiod'
                placeholder='Select Time Period'
                onChange={(value) => setTimePeriod(value)}
            >
                {time.map((time) => (
                    <Option key={time}>{time}</Option>
                ))}
            </Select>

            {/* ---------Line Chart------- */}
            <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>

            <Col className="stats-container">

                {/* ---------- Statistic ---------- */}
                <Col className="coin-value-statistics">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Title>
                        <p>An overview showing the statistics of {cryptoDetails.name}</p>
                    </Col>
                    {stats.map(({ icon, title, value }) => (
                        <Col className="coin-stats">
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>

                {/* ---------- Other statistic ---------- */}
                <Col className="other-stats-info">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">Other Statistics</Title>
                        <p>An overview showing the statistics of all Cryptocurrencies</p>
                    </Col>
                    {genericStats.map(({ icon, title, value }) => (
                        <Col className="coin-stats">
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>

            {/* ---------- About currency details ---------- */}
            <Col className="coin-desc-link">
                <Row className="coin-desc">
                    <Title level={2} class='coin-details-heading'>
                        <Title level={2}>What is {cryptoDetails.name}</Title>
                        {HTMLReactParser(cryptoDetails.description)     /* Its conver RoHTML to JSX */}
                    </Title>
                </Row>

                {/* --------- currency links ----------- */}
                <Col className="coin-links">
                    <Title level={3} className='coin-details-heading'>
                        {cryptoDetails.name} Links
                    </Title>
                    {cryptoDetails.links.map((link)=>(
                        <Row className='coin-link' key={link.name}>
                            <Title level={5} className="link-name">
                                {link.type}
                            </Title>
                            <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    );
};

export default CryptoDetails;