import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';   // API Hook
import Loader from './Loader';


const Cryptocurrencies = ({ simplified }) => {

    const count = simplified ? 10 : 100;     // set condition 
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);   // crypto data hook
    const [searchTerm, setSearchTerm] = useState('');    //Search Crypto Hook

    // when change values of cryptos & searchTerm then call useEffect
    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm));
        setCryptos(filteredData);
    }, [cryptosList, searchTerm]);

    if (isFetching) return <Loader/>;      // when data featching then show Loding...

    return (
        <>
            {/* If Home page the Not show Search bar - logic */}
            {!simplified &&
                (
                    <div className="search-crypto">
                        <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm((e.target.value.toLowerCase()))} />
                    </div>
                )
            }
            <Row gutter={[30, 30]} className="crypto-card-container">
                {
                    cryptos?.map((currency) => (
                        
                        <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid} >
                            <Link to={`/crypto/${currency.uuid}`}>
                                <Card
                                    title={`${currency.rank}. ${currency.name}`}
                                    extra={<img className='crypto-image' src={currency.iconUrl} />}
                                    hoverable
                                >
                                    <p>Price: {millify(currency.price)}</p>
                                    <p>Market cap: {millify(currency.marketCap)}</p>
                                    <p>Daily Change: {millify(currency.change)}%</p>
                                </Card>
                            </Link>
                        </Col>
                    )
                    )
                }
            </Row>
        </>
    );
};

export default Cryptocurrencies;