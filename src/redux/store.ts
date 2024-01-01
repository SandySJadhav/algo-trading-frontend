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
      ? getDefaultMiddleware({ serializableCheck: false }).concat(require('redux-logger').logger)
      : getDefaultMiddleware({ serializableCheck: false })
});

export default store;
