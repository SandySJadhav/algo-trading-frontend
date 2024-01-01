import SignUp from "@components/SignUp";
import StoreWrapper from "@components/StoreWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Algo - To the future",
  description: "Algo - To the future",
};

const Register = () => {
  return (
    <StoreWrapper>
      <SignUp />
    </StoreWrapper>
  );
};

export default Register;
