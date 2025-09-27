'use client'
import React, {useEffect, useRef, useState} from 'react';
import {Create, Get} from "@/utility/APIHelper";
import {ErrToast, IsEmpty, Successtoast, SuccSweetAlert} from "@/utility/FromHelper";
import {SweetAlert} from "@/utility/SweetAlert";
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
                res.data.length > 0 ? setHidden(false) : setHidden(true);
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
            setSubmit(false);
            return ErrToast("Title is required!!");
        }else if(IsEmpty(data.range)){
            setSubmit(false);
            return ErrToast("Range is required!!");
        }else{
            Create("/api/my-cv/skill/create",data)
                .then((res)=>{
                    if(res?.status === true){
                        getData();
                        SuccSweetAlert("Created Success")
                        setSubmit(false);
                        setHidden(false);
                    }}).catch(()=>{
                    setSubmit(false);
                    setHidden(false);
                    return ErrToast("Something went wrong");
            })
            titleRef.value = "";
            rangeRef.value = "";

        }}


    const DeleteSkill = (id) => {
        SweetAlert(`/api/my-cv/skill/delete?id=${id}`)
            .then(async (res)=>{
                if(res){
                     Get("/api/my-cv/skill/read-all").then((res)=>{
                            if(res?.status === true){
                                Successtoast("Delete Success")
                                setData(res?.data)
                            }})
                }})
    }
    return (
        <section className={hidden ? "py-10 mt-16 min-h-screen w-full bg-gray-50 bg-opacity-60":"py-10 mt-24 px-4 md:px-6 min-h-screen w-full "}>
            <div className="container mx-auto flex justify-start items-start flex-col gap-y-8 relative">
                <Toaster position="top-center" reverseOrder={false} />
                <div className={"flex flex-col gap-y-4 w-full"}>
                    <h2 className='font-bold text-center text-3xl text-blue-500 '>All Skills</h2>
                    <div className="grid grid-cols-1 gap-3 w-full">
                        {
                            data?.map((item,id)=>(
                                <div key={id} className="w-full flex flex-row justify-between gap-x-4 items-center py-3 px-4 rounded-xl border border-gray-200 bg-white/70 hover:bg-white shadow-sm hover:shadow-md transition group ">
                                    <h1 className="text-base md:text-lg font-semibold capitalize text-gray-800">{item?.title} </h1>
                                    <h1 className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs md:text-sm font-medium capitalize border border-blue-100">{item?.range} </h1>
                                    <div className=" ml-auto flex gap-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="text-red-500 hover:text-red-600" onClick={()=> DeleteSkill(item?.id)} >
                                            <MdDelete size={22} />
                                        </button>
                                        <Link href={`/my-cv/skill/update?id=${item?.id}`} className="text-blue-600 hover:text-blue-700">
                                            <FaRegEdit size={22}  />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className={hidden ?"hidden ":"flex justify-center mt-4"}>
                        <button className="btnBG mx-auto flex px-10 py-3 justify-center items-center rounded-lg" type="submit" onClick={()=> setHidden(true)}>
                            <MdAdd size={22} className="mr-2"/>
                            <span className="font-semibold">add new skill</span>
                        </button>
                    </div>
                </div>
                <div className={hidden ?"fixed inset-0 z-50 flex justify-center items-center p-4":"hidden "}>
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
                    <div className="relative z-10 overflow-hidden flex justify-center items-center flex-col gap-y-3.5 bg-white shadow-xl px-4 sm:px-6 md:px-8 py-8 w-full md:max-w-[520px] border border-sky-100 rounded-xl">
                    <h1 className={"mt-1 capitalize text-gray-900 text-2xl md:text-3xl mb-2 font-bold"}>Add new skill</h1>
                    <div className="w-full">
                        <label className="inputLabel ">Title Name</label>
                        <input type="text"
                               className="inputFiled capitalize"
                               placeholder="Enter Your Title Name"
                               ref={(input) => titleRef= input}


                        />
                    </div>
                    <div className="w-full">
                        <select className="range-option focus:border-blue-400 focus:text-blue-600 text-black outline-none border-gray-300 border text-base font-medium py-3 pl-4 pr-16 rounded-xl my-transition"
                                ref={(select)=> rangeRef = select}>
                            <option value=""  selected>Select Range</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                            <option value="Masterful">Masterful</option>
                        </select>
                    </div>
                    <div className="w-full mt-3 flex items-center justify-between gap-3 ">
                        <SubmitButton text={"Add new Skill"} submit={submit} onClick={skillSubmit} />
                        <button className={"btnBG px-5 md:px-8 "} onClick={()=> setHidden(false)}>Cancel</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-6">
                <NextStep value={"go to your CV"} href="/my-cv"  />
            </div>
        </section>
    );
};

export default SkillComponent;
