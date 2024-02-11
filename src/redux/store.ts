import customerSlice from './reducers/customer';
import strategiesSlice from './reducers/strategies';
import { configureStore } from '@reduxjs/toolkit';

const env = process.env.environment;
const store = configureStore({
  reducer: {
    customer: customerSlice,
    strategies: strategiesSlice
  },
  devTools: env === 'dev',
  //Redux logger middleware to log store states for dev env
  middleware: (getDefaultMiddleware) =>
    env === 'dev'
      ? getDefaultMiddleware({ serializableCheck: false }).concat(
          require('redux-logger').logger
        )
      : getDefaultMiddleware({ serializableCheck: false })
});

export default store;
