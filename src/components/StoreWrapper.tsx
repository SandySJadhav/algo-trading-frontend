'use client'
import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../redux/store';

type Prop = { children: ReactNode };

const StoreWrapper = ({ children }: Prop) => {
    return <ReduxProvider store={store}>{children}</ReduxProvider>
}

export default StoreWrapper;