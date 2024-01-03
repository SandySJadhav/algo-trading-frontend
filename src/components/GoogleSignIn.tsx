"use client";

import Button from "./Button";
import Firebase from "@services/GoogleApp";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

type Prop = {
  variant?: string;
  label?: string;
};

const GoogleSignIn = ({ variant, label }: Prop) => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleOnClick = () => {
    setError("");
    signInWithPopup(Firebase.auth, Firebase.provider)
      .then(() => {
        // The signed-in user info.
        router.push("/");
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
