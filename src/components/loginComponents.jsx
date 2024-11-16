'use client'
import React, {useEffect, useRef, useState} from 'react';
import SubmitButton from "@/components/ChildComponents/SubmitButton";
import { useRouter } from "next/navigation";
import { ErrorSweet, ErrToast, IsEmail, IsEmpty, SuccSweetAlert } from "@/utility/FromHelper";
import { Create } from "@/utility/APIHelper";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import cookies from "js-cookie";

const LoginComponents = () => {
    const router = useRouter();
    const [submit, setSubmit] = useState(false);
    let emailRef, passwordRef = useRef();

    useEffect(() => {
        const checkIfLoggedIn =() => {
            const token = cookies.get("token"); // Adjust based on your cookies library
            if (token) {
                  ErrorSweet("You are already logged in.")
                router.replace("/my-cv"); // Use replace to avoid adding a new history entry
            }
        };

        checkIfLoggedIn();
    }, [router]); // Dependency to avoid stale closure issues

    const handelSubmit = async () => {
        setSubmit(true);
        const data = {
            email: emailRef.value,
            password: passwordRef.value
        };

        if (IsEmpty(data.email)) {
            ErrToast("Email is Required!!");
            setSubmit(false);
        } else if (IsEmail(data.email)) {
            ErrToast("Invalid Email Format!!");
            setSubmit(false);
        } else if (IsEmpty(data.password)) {
            ErrToast("Password is Required!!");
            setSubmit(false);
        } else {
            Create("/api/user/login", data).then((res) => {
                if (res?.status === true) {
                    setSubmit(false);
                    SuccSweetAlert("Login Success")
                    window.location.href = "/my-cv";
                } else if (res?.status === false && res?.message === "User does not exist") {
                    setSubmit(false);
                    ErrorSweet(res.message || "User does not exist");
                    router.replace("/user/registetion")
                } else {
                    setSubmit(false);
                    ErrorSweet(res.message || "something went wrong")
                }
            })
        }
    }

    const handleTestUserLogin = () => {
        emailRef.value = "992khriad@gmail.com"; // Predefined test email
        passwordRef.value = "1111"; // Predefined test password
        handelSubmit(); // Call the submit handler
    }

    return (
        <section className="min-h-screen p-6 bg-gray-200 flex items-center justify-center">
            <div className="container h-screen w-screen flex items-center justify-center">
                <Toaster position="top-center" reverseOrder={false} />
                <div className="bg-white shadow-lg p-4 px-4 md:p-8 mb-6 lg:w-[80%] mx-auto -mt-10 rounded-2xl">
                    <div className="grid gap-x-4 gap-y-3 text-sm grid-cols-1 lg:grid-cols-3 py-12 ">
                        <div className="text-gray-700">
                            <h1 className="text-2xl font-bold text-center mb-6 text-blue-500">
                                Login Here
                            </h1>
                            <strong className="text- text-gray-500">
                                Please Provide Your Email and Password for Login
                            </strong>
                        </div>
                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-6 text-sm grid-cols-1 md:grid-cols-5">
                                <div className="md:col-span-5">
                                    <label>Email Address</label>
                                    <input className="inputFiled"
                                           placeholder="Your Email"
                                           type="email"
                                           ref={(input) => emailRef = input}
                                    />
                                </div>
                                <div className="md:col-span-5">
                                    <label>Password</label>
                                    <input className="inputFiled"
                                           placeholder="Password"
                                           type="password"
                                           ref={(input) => passwordRef = input}
                                    />
                                </div>
                                <div className="md:col-span-5">
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    <p className="text-base text-gray-500 mb-2"> Don't have an account ?
                                        <Link href={"/user/registetion"} className="ml-2 text-blue-500 hover:text-blue-800 border-b-[1px] border-b-transparent hover:border-b-blue-400 my-transition capitalize">create an account</Link>
                                    </p>

                                    <Link href={"/user/reset"} className="text-lg text-blue-500 hover:text-blue-800 my-transition block capitalize ">reset password </Link>
                                </div>
                                <div className="md:col-span-5">
                                    <button
                                        type="button"
                                        onClick={handleTestUserLogin}
                                        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all">
                                        Login as Test User
                                    </button>
                                </div>
                                <div className="">
                                    <SubmitButton
                                        type="submit"
                                        onClick={handelSubmit}
                                        text="Submit" submit={submit} />
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
