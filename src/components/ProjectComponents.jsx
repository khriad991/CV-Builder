"use client"
import React, {useEffect, useRef, useState} from 'react';
import SubmitButton from "@/components/ChildComponents/SubmitButton";
import {useRouter} from "next/navigation";
import {ErrToast, IsEmpty, SuccSweetAlert,} from "@/utility/FromHelper";
import {MdAdd, MdDelete, MdOutlineDevices} from "react-icons/md";
import {Create, Get, Update} from "@/utility/APIHelper";
import Link from "next/link";
import {FaCheckDouble, FaGithub, FaRegEdit} from "react-icons/fa";
import {Toaster} from "react-hot-toast";
import {SweetAlert,} from "@/utility/SweetAlert";
import NextStep from "@/components/ChildComponents/NextStep";



const ProjectComponents = ({project}) => {
    const router = useRouter();

    const [hidden,setHidden] = useState(false)
    const [submit,setSubmit] = useState(false);
    const [data,setData] = useState([])
    let nameRef, liveLinkRef, githubLinkRef, desRef = useRef()

    const getData =async () => {
        Get("/api/my-cv/project/read-all").then((res)=>{
            if(res?.data.length > 0){
                setData(res?.data);
            }else{
                setHidden(true)
            }
        })
 }

    useEffect(   ()=>{
        getData();

    },[])

    const ProjextSubmit =async () => {
        setSubmit(true)
        let data ={
                name:nameRef.value,
                live_link:liveLinkRef.value,
                github_link:githubLinkRef.value,
                des:desRef.value
            }

        if(IsEmpty(data.name)){
            ErrToast("Project name is required");
            setSubmit(false)
        }else if(IsEmpty(data.link)){
            ErrToast("Website link is required");
            setSubmit(false)
        }else if(IsEmpty(data.des)){
            ErrToast("Project description is required");
            setSubmit(false)
        }else {
            Create("/api/my-cv/project/create",data).then((res)=>{
                if(res?.status === true){
                    SuccSweetAlert("Project created success")
                    getData();
                    setSubmit(false)
                    setHidden(false)
                }})
            nameRef.value = "";
            liveLinkRef.value = "";
            githubLinkRef.value = "";
            desRef.value = "";
        }}


    const DeleteProject = (id) => {
        SweetAlert(`/api/my-cv/project/delete?id=${id}`).then(async (res)=>{
                if(res){
                    await Get('/api/my-cv/project/read-all').then((res)=>{
                        if(res?.status === true){
                            getData();
                            SuccSweetAlert("Project Delete Success");
                        }
                    })
                }
        })
    }

    const selectSubmit = (id,value) => {
        Update('/api/my-cv/project/update?id='+id,{approve:value}).then((res)=>{
            if(res?.status === true){
                getData();
                SuccSweetAlert("Project Approve Success");
            }
        }).catch(()=>{
            ErrToast("Something went wrong");
        })

    }
    return (
        <section className="py-10 px-6 flex flex-col gap-y-4 ">
            <div className="container flex justify-center items-center w-full flex-col gap-y-10 relative z-0">
                <Toaster position="top-center" reverseOrder={false} />

                <h1 className="text-2xl md:text-3xl rounded-b-xl w-full pb-5 font-medium text-black capitalize text-center block">All Work Project</h1>
                <div className={"flex flex-col gap-y-4"}>
                    {
                        data?.map((item,id)=>(
                            <div key={id} className={item?.approve ?"relative z-0 flex flex-col gap-y-2 border-gray-700 p-2 sm:p-4 md:p-6 w-full bg-sky-50 order-first rounded shadow py-3.5":"flex flex-col gap-y-2 border-gray-700 p-2 sm:p-4 md:p-6 w-full bg-gray-200 order-last rounded shadow py-3.5"}>
                                <div className={item?.approve ?"absolute z-40 right-4 top-4":"hidden"}>
                                    <FaCheckDouble size={25} className="text-blue-400" />
                                </div>
                                <h1 className="text-lg font-medium capitalize">{item?.name} </h1>
                                <div className={"flex gap-x-4"}>
                                    <label className="text-center text-blue-500 text-base"> {item?.append ? "Approve" : "Not Approve"} </label>
                                    <input type={"checkbox"}
                                           onChange={()=>selectSubmit(item?.id, !item?.approve)}
                                           defaultChecked={item?.approve} className="w-6 h-6 p-2 rounded-full outline-none border-none "  />
                                </div>

                                <div className="flex items-center gap-x-4">
                                    <Link target="_blank" href={`${item?.live_link}`}  className="flex justify-center items-center gap-x-3 text-base text-blue-500 hover:underline my-transition">
                                        <MdOutlineDevices size={20} className={"hover:text-black my-transition"} /> Live Link
                                    </Link>
                                    <Link target="_blank" href={`${item?.github_link}`}  className="flex justify-center items-center gap-x-3 text-base text-blue-500 hover:underline my-transition">
                                        <FaGithub size={20} className={"hover:text-black my-transition"} />Source Code
                                    </Link>
                                </div>
                                <p className="text-base text-gray-600  text-blac">{item?.des}</p>
                                <div className="flex gap-x-2 mt-3">
                                    <button className="btn w-fit h-fit bg-red-500 hover:text-red-500 border-red-500 hover:bg-transparent  flex justify-center items-center"
                                            onClick={()=> DeleteProject(item?.id)} >
                                        <MdDelete size={18} />
                                    </button>
                                    <Link href={`/my-cv/project/update?id=${item?.id}`} className="btn w-fit h-fit p-3.5 flex justify-center items-center">
                                        <FaRegEdit size={15}  />
                                    </Link>
                                </div>
                            </div>
                        ))
                    }

                </div>
                <div className={hidden ?"hidden ":"flex flex-col"}>
                    <button className="btnBG mx-auto flex px-16 justify-center items-center " type="submit" onClick={()=> setHidden(true)}>
                        <MdAdd size={25} className="mr-2"/>
                        Add new project
                    </button>
                </div>
                <div className={hidden ?"flex justify-center items-center flex-col gap-y-3.5 bg-white shadow  px-2 sm:px-6 md:px-8 py-8 w-full md:max-w-[700px] border-[.1px] border-sky-200 rounded-lg":"hidden "}>
                    <h1 className={"mt-3 capitalize text-black text-2xl md:text-3xl mb-4 font-bold"}>Add your projects</h1>
                    <div className="w-full">
                        <label className="inputLabel ">Project Name</label>
                        <input type="text"
                               className="inputFiled"
                               ref={(input) => nameRef = input}
                        />
                    </div>
                    <div className="w-full">
                        <label className="inputLabel ">website Link</label>
                        <input
                            type="text"
                            className="inputFiled"
                            ref={(input)=> liveLinkRef = input}
                        />
                    </div>
                    <div className="w-full">
                        <label className="inputLabel">Github Link (source code)</label>
                        <input
                            type="text"
                            className="inputFiled"
                            ref={(input)=> githubLinkRef = input}
                        />
                    </div>
                    <div className="w-full">
                        <label className="inputLabel ">Project Description</label>
                        <textarea
                            className="inputFiled resize-y"
                            rows={4}
                            cols={50}

                            ref={(input)=> desRef = input}
                        ></textarea>
                    </div>
                    <div className="w-full mt-4 flex justify-between ">
                        <SubmitButton text={"Add project"} submit={submit} onClick={ProjextSubmit} />
                        <button className={"btnBG px-5 md:px-10 "} onClick={()=> setHidden(false)}>Cancel</button>
                    </div>
                </div>
            </div>
            <NextStep href="/my-cv/work" value="go to add work experience" />

        </section>
    );
};

export default ProjectComponents;