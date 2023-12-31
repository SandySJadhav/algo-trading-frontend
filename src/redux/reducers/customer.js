import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  details: {}
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {}
});

// export const { setCustomer } = customerSlice.actions;

export default customerSlice.reducer;
