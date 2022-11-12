import { useEffect, useState, useContext, ChangeEvent, useMemo } from 'react'
import { Card, Input } from 'antd';
import { FilmType } from '../types/film'
import axios from 'axios';
import { API_SHOWS, API_SEARCH } from '../api'
import { FilmContextType } from '../types/FilmContextType';
import { FilmContext } from '../сontext/FilmContext';
import { usePageContext } from '../сontext/PageContex';
import { useNavigate } from "react-router-dom"
import  useDebouncedFunction  from '../helpers/debounce';
import Pagination from '../components/Pagination';
import ErrorPage from './ErrorPage';

const SHOW_PER_PAGE = 12;

const Films = () => {
  const navigate = useNavigate();

  const { setSelectedItem } = useContext<FilmContextType>(FilmContext);
  const { setSelectedPageNumber, setSelectedInputValue, selectedPageNumber, selectedInputValue } = usePageContext();

  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<FilmType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1)


  const paginatedItems = useMemo(() => {
    const lastShowIndex = currentPage * SHOW_PER_PAGE;
    const firstShowIndex = lastShowIndex - SHOW_PER_PAGE;
    return data?.slice(firstShowIndex, lastShowIndex) ?? [];
  }, [data, currentPage])


  const getData = async (inputValue: string) => {
    const apiUrl = inputValue ? `${API_SEARCH}${inputValue}` : API_SHOWS;
    setLoading(true);
    const response = await axios.get(apiUrl);
    if (inputValue) {
      const list = response.data.map((el: any) => {
        return el.show;
      })
      setData(list);
    } else {
      setData(response.data);
    }
    setLoading(false);
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  }

  const onDebounce = useDebouncedFunction(getData, 500);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value)
    if (value && currentPage !== 1) {
      setCurrentPage(1);
    }
    onDebounce(value)
    setInputValue(value);
  }

  const onSelect = (event: any) => {
    const name = event.target.dataset.name;
    setSelectedItem(name);
    setSelectedPageNumber(currentPage);
    setSelectedInputValue(inputValue);
    navigate(`/${name}`);
  }



  useEffect(() => {
    setCurrentPage(selectedPageNumber);
    setInputValue(selectedInputValue);
    getData(selectedInputValue);
  }, [])

  if (!data?.length) {
    return <ErrorPage></ErrorPage>;
  }
  console.log(data)

  return (
    <div className="container" >
      <Input placeholder='Enter Show' className='input' value={inputValue} onChange={onChange} />
      <ul className="list" >
        {paginatedItems.map((el: FilmType, index: any) => {
          return <Card
            className='card'
            loading={loading}
            onClick={onSelect}
            data-name={el.id}
            key={index}
            hoverable
            style={{ width: 240 }}
            cover={<img alt={el.name} src={el?.image?.medium} data-name={el.id} />}>
            <div className='info'>
              <p data-name={el.id}>{el?.name}</p>
              <p data-name={el.id}>Rating = {el?.rating?.average}*</p>
            </div>
          </Card>
        })}
      </ul>
      <Pagination total={data.length} showPerPage={SHOW_PER_PAGE} currentPage={currentPage} onPageChange={onPageChange} />
    </div>
  )
}
export default Films










