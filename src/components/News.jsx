import React, {useState} from 'react';
import { Typography, Select, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';      // News Api hook
import { useGetCryptosQuery } from '../services/cryptoApi';     // Crypto Api Hook
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')      // news category hook
    const demoImage = 'https://www.quoteinspector.com/media/bitcoin/bitcoin-75365.jpg';     // Default crypto News img
    const count = simplified ? 6 : 12;    // if home page show 6 news otherwise 12
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count })
    const { data } = useGetCryptosQuery(100); 

    if (!cryptoNews?.value) return <Loader />;

    return (
        <Row gutter={[24, 24]}>
            
            {/* If Home page then Not show Search bar otherwise show - logic */}
            {!simplified &&(
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder='Select a Currency'
                        optionFilterProp='children'
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase()) >= 0}
                    >
                        <Option value='Cryptocurrency'>Cryptocurrency</Option>
                        {data?.data?.coins.map((coin)=> (<Option value={coin.name} >{coin.name}</Option> ))}
                    </Select>
                </Col>
            )}
            {
                cryptoNews?.value.map((news, index) => (
                    <Col xs={24} sm={12} lg={8} key={index}>
                        <Card hoverable className='news-card'>
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Title class="news-title" level={2}>{news.name}</Title>
                                    <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                                </div>
                                <p>
                                    {news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                                </p>
                                <div className="provider-container">
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                                        <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))
            }
        </Row>
    );
};

export default News;