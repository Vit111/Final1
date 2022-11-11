import { useEffect, useState, useContext, ChangeEvent } from 'react'
import { Card, Input } from 'antd';
import { FilmType } from '../types/film'
import axios from 'axios';
import { API_SHOWS, API_SEARCH } from '../api'
import { FilmContextType } from '../types/FilmContextType';
import { PageContextType } from '../types/PageContextType';
import { InputContextType } from '../types/InputContextType';
import { FilmContext } from '../сontext/FilmContext';
import { PageContext } from '../сontext/PageContex';
import { InputContext } from '../сontext/InputContext';
import { useNavigate } from "react-router-dom"
import { debounce } from '../functionhelp/debounce';

function Films() {
  const [pageShow, setPageShow] = useState<any[]>([])
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<FilmType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { selectedItem, setSelectedItem } = useContext<FilmContextType>(FilmContext);
  const { setLastValue, setLastedItem } = useContext<PageContextType | any>(PageContext);
  const { setInputValues, setInputedItem } = useContext<InputContextType | any>(InputContext);
  const [currentPage, setCurrentPage] = useState<any>(1)
  const [showPerPage] = useState<any>(12)



  const lastShowIndex = currentPage * showPerPage;
  const firstShowIndex = lastShowIndex - showPerPage;
  const currentShow = data.slice(firstShowIndex, lastShowIndex)
  console.log(data)
  const totalShow = data.length
  const pagesOfSHow = totalShow / showPerPage
  const paginate = (event: any) => {
    setCurrentPage(event)
    setLastedItem(event)
  }

  const nextPage = () => setCurrentPage((prev: number) => prev + 1)
  const prevPage = () => setCurrentPage((prev: number) => prev - 1)

  function HomePage() {
    window.location.reload();
  }

  const Pages = () => {
    const pages = []
    for (let i = 1; i <= Math.ceil(pagesOfSHow); i++) {
      pages.push(i)
    }
    setPageShow(pages)
  }
  const getData = async (inputValue: string, setInputValues: string) => {

    if (setInputValues != null && selectedItem) {
      setLoading(true)
      const response = await axios.get(`${API_SEARCH}${setInputValues}`);
      if (response.data) {
        console.log(response.data)
        const list = response.data.map((el: any) => {
          return { ...el.show ?? [] }
        })
        setData(list)
      }
      setLoading(false)
    }
    else if (inputValue != '') {
      setLoading(true)
      const response = await axios.get(`${API_SEARCH}${inputValue}`);
      if (response.data) {
        const list = response.data.map((el: any) => {
          return { ...el.show ?? [] }
        })
        setData(list)
      }
      setLoading(false)
    }
    else {
      const response = await axios.get(API_SHOWS)
      if (response.data) {
        setData(response.data ?? [])
      }
      setLoading(false)
    }
  }

  const onDebounce = debounce(getData, 500);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    if (value && currentPage != 1 && setLastValue != '') {
      setCurrentPage(1)
    }
    setInputValue(value);
    onDebounce(value)
    setInputedItem(value)
  }

  function onSelect(event: any): void {
    const name = event.target.dataset.name
    setSelectedItem(name)
    navigate(`/${name}`);
  }

  useEffect(() => {
    Pages()
  }, [data])
  useEffect(() => {
    if (setInputValues && selectedItem && setLastValue != null && setLastValue != 1) {
      setInputValue(setInputValues)
      setCurrentPage(1)
    }
    else if (selectedItem && setLastValue != null && setLastValue != 1 && currentPage === 1) {
      setCurrentPage(setLastValue)
    }
    else if (setLastValue && selectedItem) {
      setCurrentPage(setLastValue)
    }
    else if (setLastValue === null && selectedItem && setInputValues) {
      setInputValue(setInputValues)
      getData(inputValue, setInputValues)
    }
    else if (setLastValue === null && selectedItem && setInputValues === '') {
      getData(inputValue, setInputValues)
    }

    else if (setInputValues && setLastValue && selectedItem && currentPage === 1) {
      getData(inputValue, setInputValues)
    }
    getData(inputValue, setInputValues)
  }, [])
  if (!data) {
    return null;
  }
  return (
    <div className="container" >
      <button className='home' onClick={HomePage}>HOME</button>
      <Input placeholder='Enter Show' className='input' value={inputValue} onChange={onChange} />
      <ul className="list" >
        {currentShow.map((el: FilmType, index: any) => {
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
              <p data-name={el.id}>{el.name}</p>
              <p data-name={el.id}>Rating = {el.rating.average}*</p>
            </div>
          </Card>
        })}
      </ul>
      <ul className='pagination'>
        {pageShow.map((number) => (
          <li className='pagenumber' key={number}>
            <a href="#" className='pagelink' onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        )
        )}
      </ul>
      <button className='Prev' onClick={prevPage}>Prev</button>
      <button className='Next' onClick={nextPage}>Next</button>
    </div>
  )
}
export default Films










