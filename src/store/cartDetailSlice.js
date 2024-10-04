import { configureStore, createSlice } from "@reduxjs/toolkit";

let cartDetail = createSlice({
    name : 'cartDetail',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        addCount(state, action) {
            let target = state.find(target => target.id == action.payload);
            if (target) {
                target.count += 1
            }
        },
        addCart(state, action) {
            console.log('이전 상태:', JSON.parse(JSON.stringify(state)));
            console.log('받은 액션:', action);

            let index = state.findIndex((i) => i.id == action.payload.id);
            if (index > -1) {
                state[index].count++;
            } else {
                state.push({
                    id:action.payload.id,
                    name:action.payload.title,
                    count:1
                })
            }

            console.log('새로운 상태:', JSON.parse(JSON.stringify(state)));
        },
        deleteCart(state, action) {
            let index = state.findIndex((i) => i.id == action.payload);
            if (index > -1) {
                if (state[index].count == 1) {
                    state.splice(index, 1);
                } else {
                    state[index].count--;
                }
            }
        }
    }
})

export const { addCount, addCart, deleteCart } = cartDetail.actions;
export default cartDetail;