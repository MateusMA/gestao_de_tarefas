import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import dataSlice from './dataSlice';
import accessLevelSlice from './accessLevelSlice';
import nameSlice from './nameSlice';
import tokenSlice from './tokenSlice';

const store = configureStore({
    reducer: {
      authSlice: authSlice.reducer,
      dataSlice: dataSlice.reducer,
      nameSlice: nameSlice.reducer,
      tokenSlice: tokenSlice.reducer,
      accessLevelSlice: accessLevelSlice.reducer
    },
})

// store.dispatch(authSlice.actions.logout())
// store.dispatch(authSlice.actions.logged())
// console.log(store.dispatch(authSlice.actions.logged()))
// console.log(store.getState().authSlice.value)
export default store;