'use client'
import React, {useEffect, useRef, useState} from 'react';
import {Create, Get} from "@/utility/APIHelper";
import {ErrToast, IsEmpty, SuccSweetAlert} from "@/utility/FromHelper";
import { SweetAlert} from "@/utility/SweetAlert";
import {Toaster} from "react-hot-toast";
import {MdAdd, MdDelete} from "react-icons/md";
import Link from "next/link";
import {FaRegEdit} from "react-icons/fa";
import SubmitButton from "@/components/ChildComponents/SubmitButton";
import NextStep from "@/components/ChildComponents/NextStep";

const SkillComponent = () => {
    const [data,setData] = useState([])
    const [hidden,setHidden] = useState(false)
    const [submit,setSubmit] = useState(false);
    let  titleRef, rangeRef  = useRef();

    const getData =async () => {
        Get("/api/my-cv/skill/read-all").then((res)=>{
            if(res?.status === true){
                setData(res?.data );
            }})
    }

    useEffect( ()=>{
        getData()
    },[])


    const skillSubmit =async () => {
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
            Create("/api/my-cv/skill/create",data)
                .then((res)=>{
                    if(res?.status === true){
                        getData();
                        SuccSweetAlert("Created Success")
                        setSubmit(false);
                        setHidden(false);
                        titleRef.value = "";
                        rangeRef.value = "";
                    }}
                ).catch((e)=>{
                    ErrToast("Something went wrong");
                    setSubmit(false);
                    setHidden(false);
            })


              }
    }


    const DeleteSkill = (id) => {
        SweetAlert(`/api/my-cv/skill/delete?id=${id}`)
            .then(async (res)=>{
                if(res){
                    await Get("/api/my-cv/skill/read-all").then((res)=>{
                            if(res?.status === true){
                                SuccSweetAlert("Delete Success")
                                setData(res?.data)
                            }})
                }})
    }
    return (
        <section className={hidden ? "py-10 h-screen w-screen bg-gray-50 z-0 bg-opacity-25":"py-10 px-6 h-screen w-screen "}>
            <div className="container flex justify-center items-center flex-col gap-y-10 relative -z-0">
                <Toaster position="top-center" reverseOrder={false} />
                <div className={"flex flex-col gap-y-4 "}>
                    <div className="flex flex-col gap-y-8 gap-x-8 md:flex-row md:flex-wrap">
                        {
                            data?.map((item,id)=>(
                                <div key={id} className="flex flex-col w-[400px] gap-y-2 p-2 sm:p-4 md:p-6 rounded-lg shadow py-3.5 border-[.2px] bg-sky-50 bg-opacity-35">
                                    <h1 className="text-xl font-medium capitalize">{item?.title} </h1>
                                    <h1 className="text-lg  font-medium capitalize">{item?.range} </h1>

                                    <div className="flex gap-x-2 mt-3">
                                        <button className="btn w-fit h-fit bg-red-500 hover:text-red-500 border-red-500 hover:bg-transparent  flex justify-center items-center"
                                                onClick={()=> DeleteSkill(item?.id)} >
                                            <MdDelete size={18} />
                                        </button>
                                        <Link href={`/my-cv/skill/update?id=${item?.id}`} className="btn w-fit h-fit p-3.5 flex justify-center items-center ml-8">
                                            <FaRegEdit size={15}  />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className={hidden ?"hidden ":"flex flex-col mt-2"}>
                        <button className="btnBG mx-auto flex px-16 justify-center items-center " type="submit" onClick={()=> setHidden(true)}>
                            <MdAdd size={25} className="mr-2"/>
                            add new skill
                        </button>
                    </div>
                </div>
                <div className={hidden ?"absolute top-[40%] left-center z-10 overflow-hidden flex justify-center items-center flex-col gap-y-3.5 bg-white shadow px-2 sm:px-6 md:px-8 py-8 w-full md:max-w-[500px] border-[.1px] border-sky-200 rounded-lg":"hidden "}>
                    <h1 className={"mt-3 capitalize text-black text-2xl md:text-3xl mb-2 font-bold"}>Add new skill</h1>
                    <div className="w-full">
                        <label className="inputLabel ">Title Name</label>
                        <input type="text"
                               className="inputFiled capitalize"
                               placeholder="Enter Your Title Name"
                               ref={(input) => titleRef= input}


                        />
                    </div>
                    <div className="w-full">
                        <select className="capitalize text-xl font-medium py-3 px-4 outline-none border-[1.3px] rounded-xl focus:border-blue-400 my-transition"
                                ref={(select)=> rangeRef = select}>
                            <option value="Beginner" selected>Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                            <option value="Masterful">Masterful</option>
                        </select>
                    </div>

                    <div className="w-full mt-4 flex justify-between ">
                        <SubmitButton text={"Add new Skill"} submit={submit} onClick={skillSubmit} />
                        <button className={"btnBG px-5 md:px-10 "} onClick={()=> setHidden(false)}>Cancel</button>
                    </div>
                </div>
            </div>
            <NextStep value={"go to your CV"} href="/my-cv"  />
        </section>
    );
};

export default SkillComponent;