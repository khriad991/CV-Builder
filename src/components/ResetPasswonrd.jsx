
'use client'
import React, {useRef, useState} from 'react';
import SubmitButton from "@/components/ChildComponents/SubmitButton";
import {useRouter} from "next/navigation";
import {ErrToast, IsEmail, IsEmpty, Successtoast} from "@/utility/FromHelper";
import {Create} from "@/utility/APIHelper";
import {Toaster} from "react-hot-toast";
import Link from "next/link";

const ResetPasswonrd = () => {
    const router = useRouter();
    const [submit ,setSubmit] = useState(false);
    let fullNameRef, emailRef,mobileRef, passwordRef = useRef();
    const handelSubmit =async () => {
        setSubmit(true);
        const data = {
            full_name: fullNameRef.value,
            email:emailRef.value,
            mobile :mobileRef.value,
            password:passwordRef.value
        };
        if(IsEmpty(data.full_name)){
            ErrToast("Name Is Required!!");
            setSubmit(false);
        }
        else if(IsEmpty(data.email)){
            ErrToast("Email is Required!!");
            setSubmit(false);
        }
        else if(IsEmail(data.email)){
            ErrToast("Provide a valid Email!!");
            setSubmit(false);
        }else if(IsEmpty(data.mobile)){
            ErrToast("Mobile Is Required!!");
            setSubmit(false);
        }
        else if(IsEmpty(data.password)){
            ErrToast("Password Is Required!!");
            setSubmit(false);
        }else {
            Create("/api/user/registetion",data).then((res)=>{
                if(res?.status === true){
                    Successtoast("Registetion Success")
                    router.replace("/user/login")
                    setSubmit(false);
                }else {
                    ErrToast("Something went wrong")
                    setSubmit(false);
                }
            })
        }
    }
    return (
        <section className="min-h-screen p-6 bg-gray-200 flex items-center justify-center">
            <div className="container w-screen h-screen flex justify-center items-center">
                <Toaster position="top-center" reverseOrder={false} />
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 py-16 max-w-[700px]">
                        <div className="lg:col-span-2 text-gray-700">
                            <h1 className="text-2xl font-bold text-center mb-6 text-blue-500">
                                Reset Your Password
                            </h1>
                        </div>
                        <div className=" lg:col-span-2">
                            <div className="grid gap-4 gap-y-4 text-sm grid-cols-1 md:grid-cols-5">

                                <div className="md:col-span-5">
                                    <label className="inputLabel !mb-2">Email Address</label>
                                    <input className="inputFiled"
                                           placeholder="Your Email"
                                           type="email"
                                           ref={(input)=> emailRef = input}
                                    />
                                </div>

                                <div className="md:col-span-5">
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    <p className="text-base text-gray-500 mb-2"> Allready have an account ?
                                        <Link href={"/user/login"}
                                              className="ml-2 text-blue-500 hover:text-blue-800 my-transition capitalize">
                                            login here
                                        </Link>
                                    </p>

                                    <Link href={"/user/reset"} className="text-lg text-blue-500 hover:text-blue-800  my-transition mt-2 block capitalize ">reset password</Link>
                                    <div className="mt-4">
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
            </div>
        </section>
    );
};
export default ResetPasswonrd;