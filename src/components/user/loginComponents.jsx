'use client'
import React, { useEffect, useState } from 'react';
import SubmitButton from "@/components/ChildComponents/SubmitButton";
import { useRouter } from "next/navigation";
import { ErrorSweet, ErrToast, IsEmail, IsEmpty } from "@/utility/FromHelper";
import { Create } from "@/utility/APIHelper";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import cookies from "js-cookie";
import {SuccessAlert} from "@/utility/SweetAlert";

const LoginComponents = () => {
    const router = useRouter();
    const [submit, setSubmit] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const checkIfLoggedIn = () => {
            const token = cookies.get("token");
            if (token) {
                SuccessAlert("You are already logged in.", "info");
                router.replace("/profile");
            }
        };

        checkIfLoggedIn();
    }, [router]);

   const handleSubmit = async () => {
        setSubmit(true);
        const data = { email, password };

        if (IsEmpty(data.email)) {
            ErrToast("Email is Required!!");
            setSubmit(false);
        } else if (!IsEmail(data.email)) {
            ErrToast("Invalid Email Format!!");
            setSubmit(false);
        } else if (IsEmpty(data.password)) {
            ErrToast("Password is Required!!");
            setSubmit(false);
        } else {
            Create("/api/user/login", data).then((res) => {
                if (res?.status === true) {
                    setSubmit(false);
                    SuccessAlert("Login Success");
                    window.location.href = "/my-cv";
                } else if (res?.status === false && res?.message === "User does not exist") {
                    setSubmit(false);
                    ErrorSweet("User does not exist");
                    router.replace("/user/registetion");
                } else {
                    setSubmit(false);
                    ErrorSweet(res.message || "Something went wrong");
                }
            });
        }
    }


    return (
        <section className="min-h-screen p-6 bg-gray-200 flex items-center justify-center">
            <div className="container h-screen w-screen flex items-center justify-center">
                <Toaster position="top-center" reverseOrder={false} />
                <div className="bg-white shadow-lg p-4 px-4 md:p-8 mb-6 lg:w-[80%] mx-auto -mt-10 rounded-2xl">
                    <div className="grid gap-x-4 gap-y-3 text-sm grid-cols-1 lg:grid-cols-3 py-12">
                        <div className="text-gray-700">
                            <h1 className="text-2xl font-bold text-center mb-6 text-blue-500">
                                Login Here
                            </h1>
                            <strong className="text-gray-500">
                                Please Provide Your Email and Password for Login
                            </strong>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-6 text-sm grid-cols-1 md:grid-cols-5">
                                <div className="md:col-span-5">
                                    <label>Email Address</label>
                                    <input
                                        className="inputFiled lowercase"
                                        placeholder="Your Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-5">
                                    <label>Password</label>
                                    <input
                                        className="inputFiled"
                                        placeholder="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-5">
                                    <p className="text-base text-gray-500 mb-2">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        Don't have an account?
                                        <Link
                                            href={"/user/registetion"}
                                            className="ml-2 text-blue-500 hover:text-blue-800 border-b-[1px] border-b-transparent hover:border-b-blue-400 my-transition capitalize">
                                            Create an account
                                        </Link>
                                    </p>
                                    <Link
                                        href={"/user/reset"}
                                        className="text-lg text-blue-500 hover:text-blue-800 my-transition block capitalize">
                                        Reset Password
                                    </Link>
                                </div>
                                <div>
                                    <SubmitButton
                                        type="submit"
                                        onClick={handleSubmit}
                                        text="Submit"
                                        submit={submit}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginComponents;
