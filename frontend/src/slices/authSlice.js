import {createSlice} from "@reduxjs/toolkit"

const initialState={
    signupData:null,
    token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
    loading:false,
    error:null,
};
const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.token=value.payload
        },
        setSignupData(state,value) {
            state.signupData=value.payload
        },
        setloading(state,value) {
            state.loading=value.payload
        },
        setError(state,value){
            state.error=value.payload
        }


    }
})
export const {setToken,setSignupData,setloading,setError}=authSlice.actions;
export default authSlice.reducer