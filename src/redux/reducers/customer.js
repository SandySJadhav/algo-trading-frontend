import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  loaded: false,
  isAuth: false,
  details: null
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setUserLoading: (state, action) => {
      state.loading = action.payload;
      if (!action.payload) {
        state.loaded = true;
      }
    },
    setCustomer: (state, action) => {
      console.log('User set ---> ', action.payload);
      state.loading = false;
      state.loaded = true;
      state.details = action.payload;
      if (action.payload.accessToken) {
        state.isAuth = true;
      }
    }
  }
});

export const { setCustomer, setUserLoading } = customerSlice.actions;

export default customerSlice.reducer;
