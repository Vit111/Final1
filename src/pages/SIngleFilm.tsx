import { useEffect, useState, useContext } from 'react'
import { Card, Col, Row, Typography, Space } from 'antd';
import { FilmType } from '../types/film'
import axios from 'axios';
import { API_SHOWS } from '../api'
import { FilmContextType } from '../types/FilmContextType';
import { FilmContext } from '../сontext/FilmContext';
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

const SingleFilm = () => {
  const params = useParams();
  const [data, setData] = useState<FilmType | null>(null);
  const { selectedItem } = useContext<FilmContextType>(FilmContext);

  const getData = async (id: string | undefined) => {
    if (id) {
      const response = await axios.get(`${API_SHOWS}/${id}`);
      if (response.data) {
        setData({
          ...response.data,
        });
      }
    }
  }
  console.log(selectedItem)
  console.log(params)
  useEffect(() => {
    if (selectedItem) {
      getData(params.id)
    } else {
      const paramId = params.id ?? '';
      getData(paramId);
    }
  }, [selectedItem, params]);

  if (!data) {
    return null;
  }

  const { Title, Text } = Typography;
  const { name, image, language, premiered, ended, type, status, runtime, schedule, weight } = data;

  return (
    <div className='wrap'>
      {<Link className='link' to='/'><LeftOutlined /></Link>}
      <Card title={<Title className='title ' level={4}>{name}</Title>} className='singlecard'>
        <Row justify='center' gutter={[16, 16]}>
          <Col flex='300px'>
            <img alt={name} src={image?.medium} />
          </Col>
          <Col flex='auto' className="gutter-row">
            <Space direction="vertical" size="middle" >
              <Row gutter={8} className='indent'>
                <Col>
                  <Text strong>Type:</Text>
                </Col>
                <Col>
                  <Text code>{type}</Text>
                </Col>
              </Row>
              <Row gutter={8} className='indent'>
                <Col>
                  <Text strong>Language:</Text>
                </Col>
                <Col>
                  <Text code>{language}</Text>
                </Col>
              </Row>
              <Row gutter={8} className='indent'>
                <Col>
                  <Text strong>Status:</Text>
                </Col>
                <Col>
                  <Text code>{status}</Text>
                </Col>
              </Row>
              <Row gutter={8} className='indent'>
                <Col>
                  <Text strong>Premiered:</Text>
                </Col>
                <Col>
                  <Text code>{premiered}</Text>
                </Col>
              </Row>
              <Row gutter={8} className='indent'>
                <Col>
                  <Text strong>Ended:</Text>
                </Col>
                <Col>
                  <Text code>{ended}</Text>
                </Col>
              </Row>
              <Row gutter={8} className='indent'>
                <Col>
                  <Text strong>Runtime:</Text>
                </Col>
                <Col>
                  <Text code>{runtime}</Text>
                </Col>
              </Row>
              <Row gutter={8} className='indent'>
                <Col>
                  <Text strong>Weight:</Text>
                </Col>
                <Col>
                  <Text code>{weight}</Text>
                </Col>
              </Row>
              <Row gutter={8} className='indent'>
                <Col>
                  <Text strong>Schedule:</Text>
                </Col>
                <Col>
                  <Text code>{schedule.days}</Text>
                </Col>
              </Row>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default SingleFilm;