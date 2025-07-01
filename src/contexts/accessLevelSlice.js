import { createSlice } from '@reduxjs/toolkit';

const initialState = {value: 0}

const accessLevelSlice = createSlice({
  name: 'accessLevel',
  initialState: initialState,
  reducers: {
    setLevel: (state,actions) => {
        state.value = actions.payload
    }
 },
});

export const {setLevel} = accessLevelSlice.actions

export default accessLevelSlice;