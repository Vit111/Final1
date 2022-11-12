import './App.less';
import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom'
import Films from './pages/Films'
import SingleFilm from './pages/SIngleFilm'
import { ProvideFilm } from './сontext/FilmContext'
import { ProvidePage } from './сontext/PageContex'
import ErrorBoundary from './components/ErrorBoundary'
import ErrorPage from './pages/ErrorPage';

function App() {
  const { Header, Content } = Layout
  return (
    <Layout>
      <Header className='header'>SHOWS</Header>
      <Content>
        <ProvideFilm>
          <ProvidePage>
          <ErrorBoundary>
              <Routes>
                <Route path='/' element={<Films />}></Route>
                <Route path='/:id' element={<SingleFilm />}></Route>
                <Route path='*' element={<ErrorPage />}></Route>
              </Routes>
            </ErrorBoundary>
          </ProvidePage>
        </ProvideFilm>
      </Content>
    </Layout>
  );
}

export default App;
