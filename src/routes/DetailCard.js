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

let NewBtn = styled.button(YellowBtn)`

`

let [sale, setSale] = useState(true);

function DetailCard(props) {

  useEffect(()=> {
    setTimeout(()=>{ setSale(!sale) }, 1000)
  })

  let [count, setCount] = useState(0);

  let {id} = useParams();
  const shoe = props.shoes.find(s=>s.id == id);

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
          <h4>{shoe.title} </h4>
          <p> {shoe.content} </p>
          <p> {shoe.price}원 </p>
          <button className='btn btn-danger'>주문하기</button>
        </div>
      </div>
    )
  }

  export default DetailCard;