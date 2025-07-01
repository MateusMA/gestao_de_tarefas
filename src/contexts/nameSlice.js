import { createSlice } from '@reduxjs/toolkit';

const initialState = {value: ""}

const nameSlice = createSlice({
  name: 'userName',
  initialState: initialState,
  reducers: {
    setName: (state,actions) => {
        state.value = actions.payload
    }
 },
});

export const {setName} = nameSlice.actions

export default nameSlice;