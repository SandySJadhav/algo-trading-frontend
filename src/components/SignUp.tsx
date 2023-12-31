'use client';
import { useState } from "react";
import Link from "next/link";
import GoogleSignIn from "./GoogleSignIn";
import Button from "./Button";
import TextField from "./TextField";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return <div className="bg-pp overflow-auto w-full min-h-screen grid grid-cols-1 place-content-center">
        <div className="rounded-lg bg-white md:w-[526px] sm:w-full justify-self-center shadow-master">
            <div className="relative flex p-10 flex-col space-6 my-10">
                <div className="flex flex-col md:mx-8">
                    <GoogleSignIn variant="secondary" label="Sign up with" />
                </div>
                <div className="relative md:mx-8">
                    <div className="custom_hr">
                        <p>
                            OR
                        </p>
                    </div>
                </div>
                <div className="flex justify-center form-title text-black text-2xl">
                    <h1 className="font-extrabold text-3xl">Sign Up</h1>
                </div>
                <div className="block mt-10 md:mx-8">
                    <TextField
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={setEmail}
                    />
                </div>
                <div className="block mt-6 md:mx-8">
                    <TextField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={setPassword}
                    />
                </div>
                <div className="block mt-6 md:mx-8">
                    <Button variant="primary" className="w-full bg-pp">
                        SIGN UP
                    </Button>
                </div>
                <div className="block mt-6 md:mx-8">
                    Already have an account? <Link href="/login" className="text-master-blue">Sign In</Link>
                </div>
            </div>
        </div>
    </div>
}

export default SignUp;