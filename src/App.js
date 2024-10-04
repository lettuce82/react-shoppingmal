import './App.css';
import bg from './KakaoTalk_20240930_170940755.jpg';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DetailCard from './routes/DetailCard.js';
import Cart from './routes/Cart.js';
import { createContext, useState } from 'react';
import { data } from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';

export let Context1 = createContext()

function App() {

  let [shoes, setShoes] = useState(data)
  let [재고] = useState([10, 11, 12])

  let navigate = useNavigate();
  const sortShoesByTitle = () => {
    const sortedShoes = [...shoes].sort((a, b) => 
      a.title.localeCompare(b.title, 'en-US')
    );
    setShoes(sortedShoes);
  };
  let [page, setPage] = useState(2);
  let [loading, setLoading] = useState(false);

  function Card(props) {
    return (
      <Col sm>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbRkfc_UtgEOa6MOOC2FzZdY0sSPyx0ee9yQ&s"></img>
        <h4>{props.shoe.title} </h4>
        <p> {props.shoe.content} </p>
      </Col>
    )
  }

  function About() {
    return (
      <div>
        <h4>회사정보임</h4>
        <Outlet></Outlet>
      </div>
    )
  }

  function Event() {
    return (
      <div>
        <h4>오늘의 이벤트</h4>
        <Outlet></Outlet>
      </div>
    )
  }

  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand  onClick={()=>{ navigate('/') }}>ShoeShop</Navbar.Brand>
          {/* <Link to={"/"} style={{marginRight : '10px', textDecoration : 'none'}}>홈</Link>
          <Link to={"/detail"}  style={{textDecoration : 'none'}}>상세페이지</Link> */}
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=> { navigate('/detail/0') }}>Detail</Nav.Link>
            <Nav.Link onClick={()=> { navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
          <Button onClick={sortShoesByTitle} className="mb-3">
            상품명 정렬
          </Button>
        </Container>
      </Navbar>
      
      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'  style={ {backgroundImage : 'url(' + bg + ')'}}></div>
              <Container>
                <Row>
                  {shoes.map((shoe, index) => (
                    <Col xs={12} md={4} className="mb-4">
                      <Card shoe={shoe} />
                    </Col>
                  ))}
                </Row>
              </Container>
              <button onClick={()=> { 
                setLoading(true);
                axios.get(`https://codingapple1.github.io/shop/data${page}.json`)
                .then((res)=>{ 
                  setShoes((shoes) => [...shoes, ...res.data]);
                  setPage((page) => page + 1);
                })
                .catch((error) => {
                  console.log('데이터 로딩 실패:', error);
                  if (page >= 3) {
                    alert("더 이상 상품이 없습니다!");
                  } else {
                    alert("데이터를 불러오는데 실패했습니다. 다시 시도해주세요.");
                  }
                })
                .finally(() => {
                  setLoading(false);
                });

                // Promise.all([axios.get('/url1'), axios.get('/url2')])
                // .then(()=>{

                // })
                
              }} disabled={loading}>
              {loading ? '로딩중...' : '더보기'}
              </button>
          </>
          }
        />
        
        <Route path='/detail/:id' element={
          <Context1.Provider value={ { 재고, shoes } }>
            <DetailCard shoes = {shoes}/>
          </Context1.Provider>
        }/>
        <Route path='/about' element={<About/>}>
          <Route path='member' element={<div>멤버임</div>}></Route>
        </Route>
        <Route path='/event' element={<Event/>}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>}></Route>
          <Route path='two' element={<div>생일기념 쿠폰받기</div>}></Route>
        </Route>
        <Route path='*' element={<div>없는 페이지</div>}></Route>
        <Route path='/cart' element={
          <Cart></Cart>
        }>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
