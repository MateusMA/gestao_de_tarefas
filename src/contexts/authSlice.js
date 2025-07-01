import { createSlice } from '@reduxjs/toolkit';

const initialState = {value: false}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logged: state => {
        state.value = true
    },
    logout: state => {
        state.value = false
    }
 },
});

export const {logged, logout} = authSlice.actions

export default authSlice;
