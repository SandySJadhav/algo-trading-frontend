import { configureStore } from '@reduxjs/toolkit';
import customerSlice from './reducers/customer';

const env = process.env.environment;
const store = configureStore({
  reducer: {
    customer: customerSlice
  },
  devTools: env === 'dev',
  //Redux logger middleware to log store states for dev env
  middleware: getDefaultMiddleware =>
    env === 'dev'
      ? getDefaultMiddleware().concat(require('redux-logger').logger)
      : getDefaultMiddleware()
});

export default store;
