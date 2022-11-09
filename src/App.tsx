import './App.less';
import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom'
import Films from './pages/Films'
import SingleFilm from './pages/SIngleFilm'
import ERROR from './pages/ERROR'
import { ProvideFilm } from './сontext/FilmContext'
import { ProvidePage } from './сontext/PageContex'
import { ProvideInput } from './сontext/InputContext'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  const { Header, Content } = Layout
  return (
    <Layout>
      <Header className='header'>SHOWS</Header>
      <Content>
        <ProvideFilm>
          <ProvidePage>
          <ProvideInput>
            <ErrorBoundary>
              <Routes>
                <Route path='/' element={<Films />}></Route>
                <Route path='/:id' element={<SingleFilm />}></Route>
                <Route path='*' element={<ERROR />}></Route>
              </Routes>
            </ErrorBoundary>
          </ProvideInput>
          </ProvidePage>
        </ProvideFilm>
      </Content>
    </Layout>
  );
}

export default App;
