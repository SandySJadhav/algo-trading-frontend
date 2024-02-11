import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  loaded: false
};

export const strategiesSlice = createSlice({
  name: 'strategies',
  initialState,
  reducers: {
    setStrategiesLoading: (state, action) => {
      state.loading = action.payload;
      if (!action.payload) {
        state.loaded = true;
      }
    }
  }
});

export const { setStrategiesLoading } = strategiesSlice.actions;

export default strategiesSlice.reducer;
