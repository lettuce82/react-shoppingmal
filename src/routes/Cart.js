import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { addCount, deleteCart } from '../store/cartDetailSlice.js';
import { changeName, addAge } from '../store/userSlice.js';
import { Button } from 'react-bootstrap';

function Cart() {

    // let a = useSelector((state)=>{ return state })
    // let stock = useSelector((state)=>state.stock )
    let cartDetail = useSelector((state)=>state.cartDetail )
    let name = useSelector((state)=>state.user.name )
    let age = useSelector((state)=>state.user.age )
    let dispatch = useDispatch();

    return(
        <div>

          {name}의 장바구니(나이: {age}) 
          <br/>
          <Button onClick={()=>{dispatch(addAge(10))}}>나이 +</Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경하기</th>
                <th>삭제하기</th>
              </tr>
            </thead>
            <tbody>
              {
                cartDetail.map((cart, i) => 
                  <tr key={i}>
                    <td>{i}</td>
                    <td>{cart.name}</td>
                    <td>{cart.count}</td>
                    <td>
                      <button onClick={()=>{
                        dispatch(addCount(cart.id))
                      }}>
                      +</button>
                    </td>
                    <td>
                      <button onClick={()=>{
                        dispatch(deleteCart(cart.id))
                      }}>
                        -
                      </button>
                    </td>
                  </tr>
                )
              }
              
            </tbody>
          </Table>
        </div>
    )
}

export default Cart;