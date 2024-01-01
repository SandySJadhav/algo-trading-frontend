"use client";

import { setCustomer } from "../redux/reducers/customer";
import Button from "./Button";
import Firebase from "@services/GoogleApp";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";

type Prop = {
  variant?: string;
  label?: string;
};

const GoogleSignIn = ({ variant, label }: Prop) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleOnClick = () => {
    setError("");
    signInWithPopup(Firebase.auth, Firebase.provider)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        router.push("/");
        // set redux state
        dispatch(setCustomer(result.user));
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className="flex justify-center">
      <Button
        type="button"
        variant={variant}
        onClick={handleOnClick}
        name="google"
        icon={<FcGoogle />}
        className="flex justify-center w-full"
      >
        {label}
      </Button>
      {error && <div className="block mt-6 md:mx-8 text-pink-500">{error}</div>}
    </div>
  );
};

export default GoogleSignIn;
