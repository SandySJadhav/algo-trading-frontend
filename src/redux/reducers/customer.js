import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  accessToken: null,
  expiresAt: null,
  details: null
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.details = action.payload;
    },
    setSession: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.expiresAt = action.payload.expirationTime;
      if (action.payload.accessToken) {
        state.isAuth = true;
      }
    }
  }
});

export const { setCustomer, setSession } = customerSlice.actions;

export default customerSlice.reducer;
