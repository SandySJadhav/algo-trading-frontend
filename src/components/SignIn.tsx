"use client";

import { setCustomer, setSession } from "../redux/reducers/customer";
import { validateEmail } from "../utils";
import Button from "./Button";
import GoogleSignIn from "./GoogleSignIn";
import TextField from "./TextField";
import Firebase from "@services/GoogleApp";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const defaultValues = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const handleLogin = (data: any) => {
    setInvalidCredentials(false);
    const { email, password } = data;
    signInWithEmailAndPassword(Firebase.auth, email, password)
      .then(({ user }: any) => {
        router.push("/");
        console.log(user);
        // Signed up
        localStorage.setItem("accessToken", user.stsTokenManager.accessToken);
        localStorage.setItem("refreshToken", user.stsTokenManager.refreshToken);
        localStorage.setItem(
          "expirationTime",
          user.stsTokenManager.expirationTime
        );
        // set redux state
        dispatch(setCustomer(user));
        dispatch(setSession(user.stsTokenManager));
      })
      .catch((error: any) => {
        const errorCode = error.code;
        console.log(error);
        if (errorCode === "auth/invalid-credential") {
          setInvalidCredentials(true);
          reset(defaultValues);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="p-0">
      <div className="overflow-auto w-full min-h-screen grid grid-cols-1 place-content-center">
        <div className="rounded-lg bg-white md:w-[526px] sm:w-full justify-self-center shadow-master">
          <div className="relative flex p-10 flex-col space-6 my-10">
            <div className="flex flex-col md:mx-8">
              <GoogleSignIn variant="secondary" label="Sign in with" />
            </div>
            <div className="relative md:mx-8">
              <div className="custom_hr">
                <p>OR</p>
              </div>
            </div>
            <div className="flex justify-center form-title text-black text-2xl">
              <h1 className="font-extrabold text-3xl">Sign In</h1>
            </div>
            <div className="block mt-10 md:mx-8">
              <TextField
                error={errors?.["email"]?.message}
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Required",
                  validate: (v) => validateEmail(v) || "Invalid",
                })}
              />
            </div>
            <div className="block mt-6 md:mx-8">
              <TextField
                error={errors?.["password"]?.message}
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Required",
                })}
              />
            </div>
            {invalidCredentials && (
              <div className="block mt-6 md:mx-8 text-pink-500">
                Invalid credentials
              </div>
            )}
            <div className="block mt-6 md:mx-8">
              <Button type="submit" variant="primary" className="w-full">
                SIGN IN
              </Button>
            </div>
            <div className="block mt-6 md:mx-8">
              Don’t have an account?{" "}
              <Link href="/register" className="text-master-blue">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
