'use client';
import Firebase from '@services/GoogleApp';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import Button from './Button';

type Prop = {
  variant?: string,
  label?: string
}

const GoogleSignIn = ({ variant, label }: Prop) => {
  const handleOnClick = () => {
    signInWithPopup(Firebase.auth, Firebase.provider)
      .then((result) => {
        console.log(result)
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
      }).catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  return <Button
    type='button'
    variant={variant}
    onClick={handleOnClick}
    name="google"
    icon={<FcGoogle />}
    className="flex justify-center"
  >
    {label}
  </Button>
}

export default GoogleSignIn;