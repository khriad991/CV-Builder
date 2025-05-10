'use client'
import React, {useEffect, useRef, useState} from 'react';
import {Get, Update} from "@/utility/APIHelper";
import {ErrToast, IsEmpty} from "@/utility/FromHelper";
import {SuccessAlert} from "@/utility/SweetAlert";
import {Toaster} from "react-hot-toast";

import SubmitButton from "@/components/ChildComponents/SubmitButton";
import Link from "next/link";
import {useRouter} from "next/navigation";

const SkillUpdateComponent = ({id}) => {
    const router = useRouter();
    const [submit,setSubmit] = useState(false);

    const [data,setData] = useState([]);
    let  titleRef, rangeRef  = useRef();

    useEffect( ()=>{
        Get(`/api/my-cv/skill/read?id=${id}`)
            .then((res)=>{
                if(res?.status === true){
                    setData(res?.data);
                }})
    },[])

    const skillSubmit =async ()=> {
        setSubmit(true)
        const data= {
            title: titleRef.value,
            range: rangeRef.value,
        }
        if(IsEmpty(data.title)){
            ErrToast("Title is required");
            setSubmit(false);
        }else if(IsEmpty(data.range)){
            ErrToast("Range is required");
            setSubmit(false);
        }else{
            Update(`/api/my-cv/skill/update?id=${id}`,data)
                .then((res)=>{
                    if(res?.status === true){
                        SuccessAlert("Created Success")
                        router.back()
                        setSubmit(false);
                    }}
                ).catch((e)=>{
                ErrToast("Something went wrong");
                setSubmit(false);

            })
        }
    }

    return (
        <section className={"py-10 h-screen w-screen bg-gray-50 z-0 bg-opacity-25"}>
            <div className="container flex justify-center items-center flex-col gap-y-10">
                <Toaster position="top-center" reverseOrder={false} />
                <div className={"flex justify-center items-center flex-col gap-y-3.5 bg-white shadow px-2 sm:px-6 md:px-8 py-8 w-full md:max-w-[500px] border-[.1px] border-sky-200 rounded-lg"}>
                    <h1 className={"mt-3 capitalize text-black text-2xl md:text-3xl mb-2 font-bold"}>update your skill</h1>
                    <div className="w-full">
                        <label className="inputLabel ">Title Name</label>
                        <input type="text"
                               className="inputFiled capitalize"
                               placeholder="Enter Your Title Name"
                               ref={(input) => titleRef= input}
                               defaultValue={data?.title}
                        />
                    </div>
                    <div className="w-full">
                        <select className="capitalize text-xl font-medium py-2 px-3.5 mx-auto text-left pl-6 outline-none border-[1.3px] rounded-xl focus:border-blue-400 my-transition"
                                ref={(select)=> rangeRef = select}>
                            <option disabled defaultValue={data?.range} selected >{data?.range}</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                            <option value="Masterful">Masterful</option>
                        </select>
                    </div>

                    <div className="w-full mt-4 flex justify-between ">
                        <SubmitButton text={"update Skill"} submit={submit} onClick={skillSubmit} />
                        <Link href={"/my-cv/skill"} className={"btnBG px-5 md:px-10 "} >Cancel</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default SkillUpdateComponent;