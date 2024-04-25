'use client'
import React, {useRef, useState} from 'react';
import SubmitButton from "@/components/ChildComponents/SubmitButton";
import {useRouter} from "next/navigation";
import {ErrorSweet, ErrToast, IsEmail, IsEmpty, SuccSweetAlert} from "@/utility/FromHelper";
import {Create} from "@/utility/APIHelper";
import {Toaster} from "react-hot-toast";
import Link from "next/link";


const LoginComponents = () => {
    const router = useRouter();
    const [submit ,setSubmit] = useState(false);
    let  emailRef,passwordRef = useRef();

    const handelSubmit =async () => {
        setSubmit(true);
        const data = {
            email:emailRef.value,
            password:passwordRef.value
        };

        if(IsEmpty(data.email)){
            ErrToast("Email is Required!!");
            setSubmit(false);
        }else if(IsEmail(data.email)){
            ErrToast("Password is Required!!");
            setSubmit(false);
        } else if(IsEmpty(data.password)){
            ErrToast("Password is Required!!");
            setSubmit(false);
        } else {
            Create("/api/user/login",data).then((res)=>{
                if(res?.status === true){
                    setSubmit(false);
                    SuccSweetAlert("Login Success")
                    window.location.href="/my-cv/project";
                }else if(res?.user === null ){
                    setSubmit(false);
                    ErrorSweet(res?.message ?? "User Not Found")
                    router.replace("/user/registetion")
                }else {
                    setSubmit(false);
                    ErrorSweet("Something went wrong")
                }
            })
        }
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
                                           ref={(input)=> emailRef = input}
                                    />
                                </div>
                                <div className="md:col-span-5">
                                    <label>Email Password</label>
                                    <input className="inputFiled"
                                           placeholder="your Password"
                                           type="password"
                                           ref={(input) => passwordRef  = input}
                                    />
                                </div>
                                <div className="md:col-span-5">
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    <p className="text-base text-gray-500"> Don't have an account ?
                                        <Link href={"/user/login"} className="ml-2 text-blue-500 hover:text-blue-800 border-b-[1px] border-b-transparent hover:border-b-blue-400 my-transition capitalize">create an account</Link>
                                    </p>

                                    <Link href={"/user/registetion"} className="text-lg text-blue-500 hover:text-blue-800 my-transition block capitalize ">reset password </Link>

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