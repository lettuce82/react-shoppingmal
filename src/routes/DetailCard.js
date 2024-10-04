import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from 'react-bootstrap/Nav';
import useFadeEffect from "../effect/useFadeEffect";
import {Context1} from './../App.js'
import { useDispatch } from "react-redux";
import { addCart } from '../store/cartDetailSlice.js';

// class Detail2 extends React.Component {
//   componentDidMount(){

//   }
//   componentDidUpdate(){

//   }
//   componentWillUnmount(){

//   }
// }

let YellowBtn = styled.button`
  background : ${ props => props.bg };
  color : ${ props => props.bg == 'blue' ? 'white' : 'black'};
  padding : 10px;
`

let NewBtn = styled(YellowBtn)`

`

function DetailCard(props) {

  let {재고, shoes} = useContext(Context1)

  let [count, setCount] = useState(0);
  let {id} = useParams();
  const shoe = props.shoes.find(s=>s.id == id);
  let [sale, setSale] = useState(true);
  let [inputValue, setInputValue] = useState('');
  let [탭, 탭변경] = useState(0);
  let fade = useFadeEffect(0);
  let dispatch = useDispatch();

  useEffect(()=> {
    let timer = setTimeout(()=>{ setSale(false) }, 2000)
    
    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(()=>{

    if (isNaN(inputValue) && inputValue !== '') {
      alert('숫자만 입력해 주세요!');
      setInputValue('');
    }

  }, [inputValue])

    return (
      <div className={`container start ${fade}`}>
        {
          sale ? <div className="alert alert-warning">2초이내 구매시 할인</div> : <></>
        }
        <button onClick={()=>{ setCount(count + 1)}}>버튼</button>
        <div className='row'>
          <div className='col-md-6'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbRkfc_UtgEOa6MOOC2FzZdY0sSPyx0ee9yQ&s"></img>
          </div>
        </div>
        <div>
          <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="숫자를 입력하세요."></input>
          <h4>{shoe.title} </h4>
          <p> {shoe.content} </p>
          <p> {shoe.price}원 </p>
          <button className='btn btn-danger' onClick={()=> {dispatch(addCart(shoe))}}>주문하기</button>
        </div>

        <Nav variant="tabs" defaultActiveKey={"link0"}>
          <Nav.Item>
            <Nav.Link eventKey="link0" onClick={()=>{탭변경(0)}}>Link0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link1" onClick={()=>{탭변경(1)}}>Link1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link2" onClick={()=>{탭변경(2)}}>Link2</Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent 탭 = {탭}/>

      </div>
    )
  }

  function TabContent({탭}) {
    // if(탭 == 0) {
    //   return <div> 내용 0 </div>
    // } else if(탭 == 1) {
    //   return <div> 내용 1 </div>
    // } else if(탭 == 2) {
    //   return <div> 내용 2 </div>
    // }
    let fade = useFadeEffect(탭);
    let {재고, shoes} = useContext(Context1)

    return <div className={`start ${fade}`}>
      {[<div> {재고} </div>, <div> 내용 1 </div>, <div> 내용 2 </div>][탭]}
    </div>
  }

  export default DetailCard;
  