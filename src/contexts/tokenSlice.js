import { createSlice } from '@reduxjs/toolkit';

const initialState = {value: ""}

const tokenSlice = createSlice({
  name: 'token',
  initialState: initialState,
  reducers: {
    setToken: (state,actions) => {
        state.value = actions.payload
    }
 },
});

export const {setToken} = tokenSlice.actions

export default tokenSlice;