'use client';

import { setUserLoading } from '../redux/reducers/customer';
import { validateEmail, validatePass } from '../utils';
import Button from './Button';
import GoogleSignIn from './GoogleSignIn';
import TextField from './TextField';
import Firebase from '@services/GoogleApp';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading: userLoading } = useSelector((state: any) => state.customer);

  const defaultValues = useMemo(
    () => ({
      email: '',
      password: ''
    }),
    []
  );

  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues
  });

  useEffect(() => {
    if (userLoading) {
      dispatch(setUserLoading(false));
    }
  }, []);

  const handleRegister = (data: any) => {
    setEmailAlreadyInUse(false);
    const { email, password } = data;
    createUserWithEmailAndPassword(Firebase.auth, email, password)
      .then(() => {
        router.push('/');
      })
      .catch((error: any) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          // someone is already using this email
          setEmailAlreadyInUse(true);
          reset(defaultValues);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="p-0">
      <div className="overflow-auto w-full min-h-screen grid grid-cols-1 place-content-center">
        <div className="rounded-lg bg-white md:w-[526px] w-full justify-self-center shadow-master">
          <div className="relative flex p-10 flex-col space-6 my-10">
            <div className="flex flex-col md:mx-8">
              <GoogleSignIn variant="secondary" label="Sign up with" />
            </div>
            <div className="relative md:mx-8">
              <div className="custom_hr">
                <p>OR</p>
              </div>
            </div>
            <div className="flex justify-center form-title text-black text-2xl">
              <h1 className="font-extrabold text-3xl">Sign Up</h1>
            </div>
            <div className="block mt-10 md:mx-8">
              <TextField
                id="email"
                error={errors?.['email']?.message}
                type="email"
                placeholder="Email"
                {...register('email', {
                  required: 'Required',
                  validate: (v) => validateEmail(v) || 'Invalid'
                })}
              />
            </div>
            <div className="block mt-6 md:mx-8">
              <TextField
                id="password"
                error={errors?.['password']?.message}
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: 'Required',
                  validate: (v) => validatePass(v) || 'Invalid'
                })}
              />
            </div>
            {emailAlreadyInUse && (
              <div className="block mt-6 md:mx-8 text-pink-500">
                Email is already in use
              </div>
            )}
            <div className="block mt-6 md:mx-8">
              <Button type="submit" variant="primary" className="w-full">
                SIGN UP
              </Button>
            </div>
            <div className="block mt-6 md:mx-8">
              Already have an account?{' '}
              <Link href="/login" className="text-master-blue">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
