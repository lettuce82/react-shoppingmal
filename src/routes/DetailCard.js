import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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

  let [count, setCount] = useState(0);
  let {id} = useParams();
  const shoe = props.shoes.find(s=>s.id == id);
  let [sale, setSale] = useState(true);
  let [inputValue, setInputValue] = useState('');

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
      <div className='container'>
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
          <button className='btn btn-danger'>주문하기</button>
        </div>
      </div>
    )
  }

  export default DetailCard;