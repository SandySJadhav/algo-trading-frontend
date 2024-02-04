import SignIn from '@components/SignIn';
import StoreWrapper from '@components/StoreWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Algo - To the future',
  description: 'Algo - To the future'
};

const Login = () => {
  return (
    <StoreWrapper>
      <SignIn />
    </StoreWrapper>
  );
};

export default Login;
