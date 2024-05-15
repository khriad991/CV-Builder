"use client"
import React, {useEffect, useRef, useState} from 'react';
import SubmitButton from "@/components/ChildComponents/SubmitButton";
import Link from "next/link";
import {ErrToast, IsEmpty} from "@/utility/FromHelper";
import {Get, Update} from "@/utility/APIHelper";
import {useRouter} from "next/navigation";
import {Toaster} from "react-hot-toast";
import {ErrAlert, SuccessAlert} from "@/utility/SweetAlert";

const UpdateProjectComponent = ({id}) => {

    const router = useRouter();
    let nameRef, liveLinkRef, githubLinkRef, desRef = useRef();
    const [submit ,setSubmit] = useState(false)
    const [data,setData] = useState([])

    useEffect(()=>{
        Get(`/api/my-cv/project/read?id=${id}`).then((res)=>{
            if(res?.status === true){
                setData(res?.data)
            }
        })
    },[])
    const ProjectUpdateSubmit =async (e) => {
        e.preventDefault();
        setSubmit(true)
        let data ={
            name:nameRef.value,
            live_link:liveLinkRef.value,
            github_link:githubLinkRef.value,
            des:desRef.value
        }

        if(IsEmpty(data.name)){
            setSubmit(false)
           return ErrToast("Project name is required");
        }else if(IsEmpty(data.live_link)){
            setSubmit(false)
           return ErrToast("Website link is required");
        }else if(IsEmpty(data.github_link)){
            setSubmit(false)
            return ErrToast("Github is required");
        }else if(IsEmpty(data.des)){
            setSubmit(false)
            return ErrToast("Project description is required");
        }else {
            Update(`/api/my-cv/project/update?id=${id}`,data)
                .then((res)=>{
                    if(res?.status === true){
                        SuccessAlert("Project Updated success")
                        router.back()
                        setSubmit(false)
                    }})
                .catch((e)=>{
                    setSubmit(false)
                    return ErrAlert("Something Went Wrong")
                })
        }}
    return (
        <section className="bg-gray-50">
            <div className="container flex justify-center items-center my-12 py-8 rounded-xl  ">
                <Toaster position={"top-center"} />
                <div className={" flex flex-col gap-y-3.5 bg-white shadow-md px-6 py-8 w-full md:w-[700px] "}>
                    <h1 className={"capitalize text-black text-2xl md:text-3xl mb-6 font-bold"}>Add your projects</h1>
                    <div className="w-full">
                        <label className="inputLabel">Project Name</label>
                        <input type="text"
                               className="inputFiled"
                               defaultValue={data?.name}
                               ref={(input) => nameRef = input}
                        />
                    </div>
                    <div className="w-full">
                        <label className="inputLabel">website Link</label>
                        <input
                            type="text"
                            className="inputFiled"
                            defaultValue={data?.live_link}
                            ref={(input)=> liveLinkRef = input}
                        />
                    </div>
                    <div className="w-full">
                        <label className="inputLabel">Github Link (source code)</label>
                        <input
                            type="text"
                            className="inputFiled"
                            defaultValue={data?.github_link}
                            ref={(input)=> githubLinkRef = input}
                        />
                    </div>
                    <div className="w-full">
                        <label className="inputLabel">Project Description</label>
                        <textarea
                            className="inputFiled resize-none "
                            rows={6}
                            cols={50}
                            defaultValue={data?.des}
                            ref={(input)=> desRef = input}
                        ></textarea>
                    </div>
                    <div className="w-full mt-4 flex justify-between ">
                        <SubmitButton text={"Update project"} submit={submit} onClick={ProjectUpdateSubmit} />
                        <Link href={"/my-cv/project"} className={"btnBG px-10 "} >Cancel</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpdateProjectComponent;