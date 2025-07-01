import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: [{ "id": "009", "trigger": "none" }] }

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    setData: (state, actions) => {
      state.value = actions.payload
    },
    voidData: (state) => {
      state.value = [{ "id": "009", "trigger": "ok" }]
    },
    initData: (state) => {
      state.value = [{ "id": "009", "trigger": "none" }]
    }
  }
});

export const { setData, voidData, initData } = dataSlice.actions;
export default dataSlice;