import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name : 'user',
    initialState : { name : 'kim', age : 20 },
    reducers : {
        changeName(state){
            return 'john ' + state.name
        },
        addAge(state, action){
            state.age += action.payload
        }
    }
})

export let { changeName, addAge } = user.actions

export default user