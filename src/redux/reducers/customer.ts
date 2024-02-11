import { createSlice } from '@reduxjs/toolkit';
import { setUserSession } from '@services/http.interceptor';

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
      state.loading = false;
      state.loaded = true;
      state.details = action.payload
      if (action.payload.accessToken) {
        state.isAuth = true;
        setUserSession(action.payload.accessToken);
      }
    }
  }
});

export const { setCustomer, setUserLoading } = customerSlice.actions;

export default customerSlice.reducer;
